# FKs Without Downtime

```
Created at: 2024-10-29
```

In order to create a foreign key in an existing table without downtime, a few
extra operations are necessary to ensure no application downtime will be
caused.

## Setting up the environment

We need a schema and a table with some rows:

```sql
CREATE DATABASE fk_test_db;
-- If using psql, connect to that db:
-- \c fk_test_db

DROP TABLE IF EXISTS foo;
CREATE TABLE foo (
    id SERIAL PRIMARY KEY,
    int_field INT NOT NULL
);
INSERT INTO foo (int_field)
SELECT generate_series(1, 1000000) AS int_field;

DROP TABLE IF EXISTS bar;
CREATE TABLE bar (
    id SERIAL PRIMARY KEY,
    int_field INT NOT NULL
);
INSERT INTO bar (int_field)
SELECT generate_series(1, 1000000) AS int_field;

VACUUM ANALYZE foo;
VACUUM ANALYZE bar;
```

## 1. Add the field

Assume we want to add a foreign key in `foo` that points to a row in `bar`.

```sql
ALTER TABLE foo ADD COLUMN bar_id BIGINT NULL;
```

## 2. Add an index for lookup

Before we can add the constraint, we need an index to lookup the bar_id field.

```sql
SET lock_timeout TO '0';
CREATE INDEX CONCURRENTLY IF NOT EXISTS foo_bar_fk ON foo (bar_id);
```

This is important because as soon as the constraint is created, any deletion
on the `bar` table will need to look into `foo` to verify what to do next, like
cascading deletions.

I've debugged postgres source code, and the `RI_Fkey_restrict_del` trigger
ultimately calls `ri_restrict` which triggers the following query to check
that `foo` has a FK to the soon-to-be-deleted bar

```sql
-- x is my local user
SELECT 1 FROM ONLY "public"."foo" x
WHERE $1 OPERATOR(pg_catalog.=) "bar_id"
FOR KEY SHARE OF x
```

The same happens when trying to change the `id` of an existing `bar` row.

## 3. Add the constraint in INVALID mode.

This will make the constraint only act on new inserts and updates on the table.
Existing rows (potentially violated by containing fks of rows that don't exist
any more in the referenced table), won't be checked unless they're being
updated.

```sql
ALTER TABLE foo
ADD CONSTRAINT fk_bar FOREIGN KEY (bar_id)
REFERENCES bar (id)
DEFERRABLE INITIALLY DEFERRED
NOT VALID;
```

Postgres implementation calls `ATController` (alter table controller) which
skips the operation `ATRewriteTables` and will only call `ATRewriteCatalogs`.
This means that `RI_Initial_Check` is never called:

```c
/*
 * RI_Initial_Check -
 *
 * Check an entire table for non-matching values using a single query.
 * This is not a trigger procedure, but is called during ALTER TABLE
 * ADD FOREIGN KEY to validate the initial table contents.
 */
```

Note:
 - DEFERRED INITIALLY DEFERRED means the constraint won't be checked until the
   end of the transaction. If necessary, This behaviour can be changed on an
   transaction-per-transaction basis (via `SET CONSTRAINTS`).

Note: `ON DELETE RESTRICT` can be used here, otherwise `NO ACTION` is the
default.

> Restricting and cascading deletes are the two most common options. RESTRICT
> prevents deletion of a referenced row. NO ACTION means that if any
> referencing rows still exist when the constraint is checked, an error is
> raised; this is the default behavior if you do not specify anything. (The
> essential difference between these two choices is that NO ACTION allows the
> check to be deferred until later in the transaction, whereas RESTRICT does
> not.)

That means if you do this:

```sql
INSERT INTO foo (int_field, bar_id) values (1, 42);
DELETE FROM bar WHERE id = 42;
```

You'll get:

```
ERROR:  update or delete on table "bar" violates foreign key constraint "fk_bar" on table "foo"
DETAIL:  Key (id)=(42) is still referenced from table "foo".
```

## Validate The Constraint

Provided there are no invalid entries in foo, i.e., no rows in foo point to
fks in bar that don't exist, you can validate the constraint:

```sql
ALTER TABLE foo VALIDATE CONSTRAINT fk_bar;
```

This will call `RI_Initial_Check`, but with a weaker lock (share update excl)
called from `validateForeignKeyConstraint`.
