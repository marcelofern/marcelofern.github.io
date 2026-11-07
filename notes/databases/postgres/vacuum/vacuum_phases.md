# VACUUM Phases

```
Created at: 2025-01-08
```

1. **INITIALIZING**: VACUUM is preparing to begin scanning the heap. This phase
  is expected to be very brief.

2. **SCANNING HEAP**: VACUUM is currently scanning the heap. It will prune and
  defragment each page if required, and possibly perform freezing activity. The
  heap_blks_scanned column can be used to monitor the progress of the scan.

3. **VACUUMING INDEXES**: VACUUM is currently vacuuming the indexes. If a table
  has any indexes, this will happen at least once per vacuum, after the heap
  has been completely scanned. It may happen multiple times per vacuum if
  maintenance_work_mem (or, in the case of autovacuum, autovacuum_work_mem if
  set) is insufficient to store the number of dead tuples found.

4. **VACUUMING HEAP**: VACUUM is currently vacuuming the heap. Vacuuming the
  heap is distinct from scanning the heap, and occurs after each instance of
  vacuuming indexes. If heap_blks_scanned is less than heap_blks_total (see
  notes below), the system will return to scanning the heap after this phase is
  completed; otherwise, it will begin cleaning up indexes after this phase is
  completed.

5. **CLEANING UP INDEXES**: VACUUM is currently cleaning up indexes. This
   occurs after the heap has been completely scanned and all vacuuming of the
   indexes and the heap has been completed.

6. **TRUNCATING HEAP**: VACUUM is currently truncating the heap so as to return
  empty pages at the end of the relation to the operating system. This occurs
  after cleaning up indexes.

7. **PERFORMING FINAL CLEANUP**: VACUUM is performing final cleanup. During this
  phase, VACUUM will vacuum the free space map, update statistics in pg_class,
  and report statistics to the cumulative statistics system. When this phase is
  completed, VACUUM will end.

Notes:

- heap_blks_total: Total number of heap blocks in the table. This number is
  reported as of the beginning of the scan; blocks added later will not be (and
  need not be) visited by this VACUUM.

[source](https://www.postgresql.org/docs/current/progress-reporting.html#VACUUM-PHASES)

## Progress Reporting

> Whenever VACUUM is running, the pg_stat_progress_vacuum view will contain one
> row for each backend (including autovacuum worker processes) that is
> currently vacuuming. The tables below describe the information that will be
> reported and provide information about how to interpret it. Progress for
> VACUUM FULL commands is reported via pg_stat_progress_cluster because both
> VACUUM FULL and CLUSTER rewrite the table, while regular VACUUM only modifies
> it in place.

`pg_stat_progress_vacuum` View

pid integer:
> Process ID of backend.

datid oid:
> OID of the database to which this backend is connected.

datname name:
> Name of the database to which this backend is connected.

relid oid:
> OID of the table being vacuumed.

phase text:
> Current processing phase of vacuum. See Table 27.46.

heap_blks_total bigint
> Total number of heap blocks in the table. This number is reported as of the
> beginning of the scan; blocks added later will not be (and need not be)
> visited by this VACUUM.

heap_blks_scanned bigint:
> Number of heap blocks scanned. Because the visibility map is used to optimize
> scans, some blocks will be skipped without inspection; skipped blocks are
> included in this total, so that this number will eventually become equal to
> heap_blks_total when the vacuum is complete. This counter only advances when
> the phase is scanning heap.

heap_blks_vacuumed bigint:
> Number of heap blocks vacuumed. Unless the table has no indexes, this counter
> only advances when the phase is vacuuming heap. Blocks that contain no dead
> tuples are skipped, so the counter may sometimes skip forward in large
> increments.

index_vacuum_count bigint:
> Number of completed index vacuum cycles.

max_dead_tuple_bytes bigint:
> Amount of dead tuple data that we can store before needing to perform an
> index vacuum cycle, based on maintenance_work_mem.

dead_tuple_bytes bigint:
> Amount of dead tuple data collected since the last index vacuum cycle.

num_dead_item_ids bigint:
> Number of dead item identifiers collected since the last index vacuum cycle.

indexes_total bigint:
> Total number of indexes that will be vacuumed or cleaned up. This number is
> reported at the beginning of the vacuuming indexes phase or the cleaning up
> indexes phase.

indexes_processed bigint:
> Number of indexes processed. This counter only advances when the phase is
> vacuuming indexes or cleaning up indexes.

## Useful Queries

```sql
SELECT
  p.pid,
  now() - a.xact_start AS duration,
  coalesce(wait_event_type ||'.'|| wait_event, 'f') AS waiting,
  CASE
    WHEN a.query ~*'^autovacuum.*to prevent wraparound' THEN 'wraparound'
    WHEN a.query ~*'^vacuum' THEN 'user'
  ELSE
    'regular'
  END AS mode,
  p.datname AS database,
  p.relid::regclass AS table,
  p.phase,
  pg_size_pretty(p.heap_blks_total * current_setting('block_size')::int) AS table_size,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  pg_size_pretty(p.heap_blks_scanned * current_setting('block_size')::int) AS scanned,
  pg_size_pretty(p.heap_blks_vacuumed * current_setting('block_size')::int) AS vacuumed,
  round(100.0 * p.heap_blks_scanned / p.heap_blks_total, 1) AS scanned_pct,
  round(100.0 * p.heap_blks_vacuumed / p.heap_blks_total, 1) AS vacuumed_pct,
  p.index_vacuum_count,
  round(100.0 * p.num_dead_tuples / p.max_dead_tuples,1) AS dead_pct
FROM pg_stat_progress_vacuum p
JOIN pg_stat_activity a using (pid)
ORDER BY now() - a.xact_start DESC;
```

Or simpler:

```sql
SELECT * FROM pg_stat_progress_vacuum
WHERE oid = 'my_sweet_table'::regclass;
```
