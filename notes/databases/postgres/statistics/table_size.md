# Table Size

```
Created at: 2026-01-23
```

## Table size (including toast)

```sql
SELECT
  pg_size_pretty(pg_relation_size(c.oid))                 AS table_size,
  pg_size_pretty(pg_indexes_size(c.oid))                  AS index_size,
  pg_size_pretty(pg_total_relation_size(c.reltoastrelid)) AS toast_size,
  pg_size_pretty(pg_total_relation_size(c.oid))           AS total_size
FROM
  pg_class c
JOIN
  pg_namespace n
  ON n.oid = c.relnamespace
WHERE
  n.nspname = 'public'
  AND c.relname = 'events_externalevent'
;
```

## Top 100 heaviest tables

```sql
SELECT
  relname AS table,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM
  pg_catalog.pg_statio_user_tables
WHERE
  schemaname = 'public'
ORDER BY
  pg_total_relation_size(relid) DESC
LIMIT
  100
;
```
