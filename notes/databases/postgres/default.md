# DEFAULT

Since Postgres 11:

> From PostgreSQL 11, adding a column with a constant default value no longer
> means that each row of the table needs to be updated when the ALTER TABLE
> statement is executed. Instead, the default value will be returned the next
> time the row is accessed, and applied when the table is rewritten, making the
> ALTER TABLE very fast even on large tables.

> However, if the default value is volatile (e.g., clock_timestamp()) each row
> will need to be updated with the value calculated at the time ALTER TABLE is
> executed. To avoid a potentially lengthy update operation, particularly if
> you intend to fill the column with mostly nondefault values anyway, it may be
> preferable to add the column with no default, insert the correct values using
> UPDATE, and then add any desired default as described below.

No table rewrites are needed for either NOT NULL columns or nullable columns.

This can be shown by the following script:

```sql
SET client_min_messages=debug1;

\timing on

CREATE TABLE t1 AS SELECT a FROM generate_Series(1,1000000)a;
ALTER TABLE t1 ADD COLUMN b int NULL;
ALTER TABLE t1 ADD COLUMN c int NOT NULL DEFAULT 1234;

-- Only adding this column will require a rewrite. That's
-- because the default expression isn't mutable.
ALTER TABLE t1 ADD column d int not NULL DEFAULT (random() * 10000)::int;
-- DEBUG:  rewriting table "t1"
```

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL PRIMARY KEY);
```

You can find where the `rewriting table` string comes from `ATRewriteTable`. If
you are profiling that function, you can drop a breakpoint where it sends this
debug information to check if your operation rewrites the table.

## Event Triggers

Another way of checking this is by running an event trigger:

```sql
CREATE OR REPLACE FUNCTION log_rewrite() RETURNS event_trigger
LANGUAGE plpgsql as
$func$
declare
   this_schema text;
begin
    RAISE NOTICE 'rewriting table % for reason %',
        pg_event_trigger_table_rewrite_oid()::regclass,
        pg_event_trigger_table_rewrite_reason();
end;
$func$;
CREATE EVENT TRIGGER has_rewrite
ON table_rewrite EXECUTE PROCEDURE log_rewrite();
```

So every time a rewrite happens, it will raise the following:

```
DEBUG:  EventTriggerInvoke 16396
NOTICE:  rewriting table t1 for reason 2
DEBUG:  rewriting table "t1"
```

The reason code is release dependent. There has been discussion about adding
these values recently [source](https://www.postgresql.org/message-id/CAKAnmmL+Z6j-C8dAx1tVrnBmZJu+BSoc68WSg3sR+CVNjBCqbw@mail.gmail.com):

> Returns a code explaining the reason(s) for rewriting. The value is a bitmap
> built from the following values: 1 (the table has changed persistence), 2 (a
> column has changed a default value), 4 (a column has a new data type), and 8
> (the table access method has changed).

## Sources

- I have asked [this
  question](https://www.postgresql.org/message-id/CAM2F1VNAP2bKEtxymaX%3Dj%2BaV3hTfcZjH7p2jyCDGc_329rUiPQ%40mail.gmail.com)
  on the docs mailing list. The replies are a good read.
