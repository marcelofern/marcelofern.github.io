# Unlogged Tables

```
Created at: 2025-04-22
```

An unlogged table can be created with the UNLOGGED keyword:

```sql
CREATE UNLOGGED TABLE foo (id int);
```

You can also change existing tables to unlogged

```sql
-- This can run very quickly!
ALTER TABLE foo SET UNLOGGED;

-- This can run very slowly!
-- All the table records will be written to the WAL.
ALTER TABLE foo SET LOGGED;
```

## Why use unlogged tables?

1. More speed of writes per second, since unlogged table changes aren't written
   to the WAL.
2. Less vacuum impact as vacuum are also writes that are logged in the WAL.
3. General benefits from having a smaller WAL (smaller backups for example).

But, it comes with a price:

1. Tables are truncated (all data is deleted) when a crash happens.
2. Such tables can only be accessed on primaries and not on replicas.
3. Unlogged tables can't be used in logical replication or physical backups.

## Resources

- https://www.crunchydata.com/blog/postgresl-unlogged-tables
