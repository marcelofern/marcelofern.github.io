# Table Statistics

```
Created at: 2025-04-26
```

The table `pg_stat_all_tables` can be queried to collect statistics about a
particular table. The `pg_stat_user_tables` and `pg_stat_sys_tables` views
contain the same information, but filtered to only show user and system tables
respectively.

See:
https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ALL-TABLES-VIEW

## Query

```sql
SELECT
  *,
  pg_size_pretty(pg_total_relation_size(relid)) AS table_size
FROM
  pg_stat_all_tables
WHERE
  relname = 'foo';
```

## Example

```sql
-- Create a basic table with 10,000 rows.
DROP TABLE IF EXISTS foo CASCADE;

CREATE TABLE
  foo (id SERIAL PRIMARY KEY)
WITH (autovacuum_enabled = false);

INSERT INTO foo SELECT generate_series(1, 10000);
ANALYZE foo;

-- This will create dead rows.
DELETE FROM foo WHERE id % 2 = 0;
DELETE FROM foo WHERE id % 27 = 0;
ANALYZE foo;

-- Verify stats.
SELECT
  *,
  pg_size_pretty(pg_total_relation_size(relid)) AS table_size
FROM
  pg_stat_all_tables
WHERE
  relname = 'foo';

-- relid               | 22997
-- schemaname          | public
-- relname             | foo
-- seq_scan            | 2
-- seq_tup_read        | 10000
-- idx_scan            | 0
-- idx_tup_fetch       | 0
-- n_tup_ins           | 10000
-- n_tup_upd           | 0
-- n_tup_del           | 5000
-- n_tup_hot_upd       | 0
-- n_live_tup          | 5000
-- n_dead_tup          | 5000
-- n_mod_since_analyze | 15000
-- n_ins_since_vacuum  | 10000
-- last_vacuum         | 2025-04-27 15:19:18.210339+12
-- last_autovacuum     |
-- last_analyze        |
-- last_autoanalyze    |
-- vacuum_count        | 1
-- autovacuum_count    | 0
-- analyze_count       | 0
-- autoanalyze_count   | 0
```

## Resetting statistics

> pg_stat_reset () → void (SELECT pg_stat_reset();)
> Resets all statistics counters for the current database to zero.
> This function is restricted to superusers by default, but other users can be
> granted EXECUTE to run the function.
