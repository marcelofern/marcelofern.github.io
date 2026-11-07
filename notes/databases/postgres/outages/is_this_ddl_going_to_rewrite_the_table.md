# Is This DDL Going To Rewrite The Table

```
Created at: 2024-12-09
```

There are two ways of finding this out. The first one is via:

```sql
SET client_min_messages=debug1;
```

And the second one is

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

Prefer the second if all you want is to focus on table rewrites and not all
the other logs that come from `debug1`.
