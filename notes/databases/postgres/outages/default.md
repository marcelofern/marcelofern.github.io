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

CREATE TABLE foo AS SELECT a FROM generate_Series(1,1000000)a;
ALTER TABLE foo ADD COLUMN b int NULL;
ALTER TABLE foo ADD COLUMN c int NOT NULL DEFAULT 1234;

-- Only adding this column will require a rewrite. That's
-- because the default expression isn't mutable.
ALTER TABLE foo ADD COLUMN d int NOT NULL DEFAULT (random() * 10000)::int;
-- DEBUG:  rewriting table "foo"
```

You can find where the `rewriting table` string comes from `ATRewriteTable`. If
you are profiling that function, you can drop a breakpoint where it sends this
debug information to check if your operation rewrites the table.

## What happens when the default is dropped?

```sql
SET client_min_messages=debug1;

DROP TABLE IF EXISTS foo CASCADE;
CREATE TABLE foo (id SERIAL PRIMARY KEY);

INSERT INTO foo (id) SELECT generate_series(1, 10000);

ALTER TABLE foo ADD COLUMN bar varchar(255) NOT NULL DEFAULT 'default';
ALTER TABLE foo ALTER COLUMN bar DROP DEFAULT;

SELECT * from foo order by id desc limit 5;
--   id   |   bar
-- -------+---------
--  10000 | default
--   9999 | default
--   9998 | default
--   9997 | default
--   9996 | default

ALTER TABLE foo ALTER COLUMN bar SET DEFAULT 'new_default';
INSERT INTO foo (id) VALUES (100001);
ALTER TABLE foo ALTER COLUMN bar DROP DEFAULT;

SELECT * from foo order by id desc limit 5;
--    id   |     bar
-- --------+-------------
--  100001 | new_default
--   10000 | default
--    9999 | default
--    9998 | default
--    9997 | default
```

How does Postgres know where to pull the value `default` from?

```sql
SELECT attmissingval
FROM pg_attribute
WHERE attrelid = 'foo'::regclass AND attname = 'bar';
--  attmissingval
-- ---------------
--  {default}
```

From the docs:

> atthasmissing bool
>
> This column has a value which is used where the column is entirely missing
> from the row, as happens when a column is added with a non-volatile DEFAULT
> value after the row is created. The actual value used is stored in the
> attmissingval column.

And

> attmissingval anyarray
>
> This column has a one element array containing the value used when the column
> is entirely missing from the row, as happens when the column is added with a
> non-volatile DEFAULT value after the row is created. The value is only used
> when atthasmissing is true. If there is no value the column is null.

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
NOTICE:  rewriting table foo for reason 2
DEBUG:  rewriting table "foo"
```

The reason code is release dependent. There has been discussion about adding
these values recently [source](https://www.postgresql.org/message-id/CAKAnmmL+Z6j-C8dAx1tVrnBmZJu+BSoc68WSg3sR+CVNjBCqbw@mail.gmail.com):

> Returns a code explaining the reason(s) for rewriting. The value is a bitmap
> built from the following values: 1 (the table has changed persistence), 2 (a
> column has changed a default value), 4 (a column has a new data type), and 8
> (the table access method has changed).

## Sources

- I have asked [this question](https://www.postgresql.org/message-id/CAM2F1VNAP2bKEtxymaX%3Dj%2BaV3hTfcZjH7p2jyCDGc_329rUiPQ%40mail.gmail.com)
  on the docs mailing list. The replies are a good read.
