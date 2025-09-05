# Get definition of a trigger

```
Created at: 2025-09-01
```

```sql
SELECT
    tgname AS trigger_name,
    pg_get_triggerdef(oid) AS trigger_definition
FROM
    pg_trigger
WHERE
    tgname = 'your_trigger_name';
```
