# Drop Column With Index

```
Created at: 2024-12-03
```

Droping a column will also drop any indexes relating to that column, including
composite indexes.

The ALTER TABLE ... DROP COLUMN operation is safe, however, and it should take
very little time, even though it'll also drop the related indexes.

The indexes will be dropped as part of the ALTER TABLE ... DROP COLUMN command
according to this profile trace:

```
1.80 ms  72.0%	0 s	                   ATRewriteCatalogs
1.80 ms  72.0%	0 s	                    ATExecCmd
1.80 ms  72.0%	0 s	                     ATExecDropColumn
1.70 ms  68.0%	0 s	                      performMultipleDeletions
1.30 ms  52.0%	0 s	                       deleteObjectsInList
1.30 ms  52.0%	0 s	                        deleteOneObject
700.00 µs  28.0%	0 s	                         doDeletion
500.00 µs  20.0%	0 s	                          index_drop
```

The `index_drop` is the exact same function that is called by the DROP INDEX
ddl.

You can test this using the following script:

```sql
\timing

DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL, foo int, bar int);

INSERT INTO foo (foo, bar)
SELECT gs, gs
FROM generate_series(1, 10000000) gs;

CREATE INDEX foo_idx ON foo (foo);
CREATE INDEX bar_foo_idx ON foo (bar, foo);

CREATE INDEX foo_idx2 ON foo (foo);
DROP INDEX foo_idx2;

\d foo
--                             Table "public.foo"
--  Column |  Type   | Collation | Nullable |             Default
-- --------+---------+-----------+----------+---------------------------------
--  id     | integer |           | not null | nextval('foo_id_seq'::regclass)
--  foo    | integer |           |          |
--  bar    | integer |           |          |
-- Indexes:
--     "bar_foo_idx" btree (bar, foo)
--     "foo_idx" btree (foo)

ALTER TABLE foo DROP COLUMN foo;

\d foo
--                             Table "public.foo"
--  Column |  Type   | Collation | Nullable |             Default
-- --------+---------+-----------+----------+---------------------------------
--  id     | integer |           | not null | nextval('foo_id_seq'::regclass)
--  bar    | integer |           |          |
```
