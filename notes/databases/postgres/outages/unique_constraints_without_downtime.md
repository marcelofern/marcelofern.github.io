# UNIQUE Constraints Without Downtime

```
Created at: 2025-01-13
```

The following DDL is used to add a unique constraint on an existing table:

```sql
ALTER TABLE table ADD CONSTRAINT constraint UNIQUE (field);
```

Which has the following problems:

- It acquires an ACCESS EXCLUSIVE lock on the table that blocks reads and
  writes on the table. This can take a long time as the index that backs up
  the constraint is being built.
- In turn, it can also be blocked by a existing query. For example, a
  long-running transaction could block this query, which in turn will block
  other queries, creating a potential outage.
- It doesn't work with retries, as it doesn't check if the constraint already
  exists before attempting the ALTER TABLE.

Note: In Postgres, unique constraints are implemented as unique indexes. Unique
indexes already give the same constrictions as unique constraints.

## A safer approach

We use a UNIQUE index to build the constraint. This UNIQUE index can be created
without taking AccessExclusive locks via CREATE UNIQUE INDEX CONCURRENTLY.

```sql
-- Necessary to avoid lock timeouts. This is a safe operation as
-- CREATE UNIQUE INDEX CONCURRENTLY takes a weaker SHARE UPDATE EXCLUSIVE
-- lock.
SET lock_timeout = 0;

-- Check if an INVALID index already exists.
SELECT relname
FROM pg_class, pg_index
WHERE (
    pg_index.indisvalid = false
    AND pg_index.indexrelid = pg_class.oid
    AND relname = 'foo_unique_idx'
);

-- Remove the invalid index (only if the previous query returned one).
DROP INDEX CONCURRENTLY IF EXISTS foo_unique_idx;

-- Finally create the UNIQUE index
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS foo_unique_idx ON table;

-- Reset lock_timeout to its original value ("1s" as an example).
SET lock_timeout = '1s';

-- Perform the ALTER TABLE using the unique index just created.
-- This will run very fast as the index is enough proof that there aren't
-- violations in the table.
ALTER TABLE "table"
ADD CONSTRAINT "foo_unique"
UNIQUE USING INDEX "foo_unique_idx";
```

## USING syntax

```
ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    action [, ... ]

Where action is:

    ADD table_constraint_using_index

Where table_constraint_using_index is:

    [ CONSTRAINT constraint_name ]
    { UNIQUE | PRIMARY KEY } USING INDEX index_name
    [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]
```

By default, constraints are set as DEFERRABLE INITIALLY IMMEDIATE unless
specified.

Deferrability cheat-sheet:

- `DEFERRABLE`: the default deferrability can be changed in a transaction.
- `NOT DEFERRABLE`: the default deferrability **cannot** be changed in a
  transaction. Plus, will always be IMMEDIATE. Trying to set it otherwise will
  result in error:
  ERROR:  constraint declared INITIALLY DEFERRED must be DEFERRABLE
  LINE 4: NOT DEFERRABLE INITIALLY DEFERRED;
- `INITIALLY DEFERRED`: by default, wait until the end of the transaction to
  check the constraint.
- `INITIALLY IMMEDIATE`: by default, check the constraint immediately, that is,
  without waiting until the end of the transaction.

> Upon creation, a constraint is given one of three characteristics: DEFERRABLE
> INITIALLY DEFERRED, DEFERRABLE INITIALLY IMMEDIATE, or NOT DEFERRABLE. The
> third class is always IMMEDIATE and is not affected by the SET CONSTRAINTS
> command. The first two classes start every transaction in the indicated mode,
> but their behavior can be changed within a transaction by SET CONSTRAINTS.

## Sandbox Example

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (
  id SERIAL PRIMARY KEY,
  int_val INTEGER NOT NULL
);

INSERT INTO foo (int_val) SELECT generate_series(1, 10000);
SELECT count(*) FROM foo;

SET lock_timeout = 0;

DROP INDEX CONCURRENTLY IF EXISTS foo_unique_idx;
CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS foo_unique_idx ON foo (int_val);

ALTER TABLE foo
ADD CONSTRAINT foo_unique
UNIQUE USING INDEX foo_unique_idx;
```

```
                             Table "public.foo"
 Column  |  Type   | Collation | Nullable |             Default
---------+---------+-----------+----------+---------------------------------
 id      | integer |           | not null | nextval('foo_id_seq'::regclass)
 int_val | integer |           | not null |
Indexes:
    "foo_pkey" PRIMARY KEY, btree (id)
    "foo_unique" UNIQUE CONSTRAINT, btree (int_val)
```
