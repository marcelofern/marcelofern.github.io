# Table Bloat

```
Created at: 2024-12-19
```

A table is bloated when it's actual size on disk is higher than the actual
size of the data.

Any UPDATEs and DELETEs will create "dead tuples" on the tables where these
operations are performed.

Dead tuples are tuples that can't be seen in the current database table version
but are still stored in disk.

Due to Postgres' MVCC architecture (Multiversion Concurrency Control), tuples
aren't necessarily deleted or updated on disk as soon as they are affected by
an operation.

Such tuples have the problem of occupying space on disk. This space may be
reclaimed by a VACUUM. In certain situations, not even a VACUUM can reclaim
these dead tuples. This is the case when active transactions holding those
dead tuples exist and the xmin horizon is behind - think about long-running
transactions here.

## Performance Implications Of Bloated Tables

1. The same query needs to read through more buffers to satisfy its results,
   because tuples are sparsely allocated on disk.
2. These tuples take more room in memory, thus not allowing efficient caching
   of pages.

## Vacuuming

While VACUUM may reclaim dead rows, it won't fix fragmented pages.
That is, VACUUM won't reorder the tuples in their stored pages to defragment
them, nor will it delete pages that aren't used by the table.

This is only achieved when `VACUUM FULL` is performed. This operation will
effectively copy all tables and create new ones with a compact size on disk.

It's rare the database that can afford a `VACUUM FULL` these days, as it takes
an AccessExclusive lock. Instead, there are alternatives like `pg_repack` to
be used instead.

Indexes can also become defragmented for the same reasons. The
`pgstattuple.pgstatindex` function is useful for checking index fragmentation.
Focus on the `avg_leaf_density` value, anything below 20% isn't great.
[source](https://dba.stackexchange.com/questions/331052/what-is-acceptable-level-of-btree-index-fragmentation-in-postgres).

## Bloat

To find the bloat of a table, Postgres' wiki recommends:

> To obtain more accurate information about database bloat, please refer to the
> pgstattuple or pg_freespacemap contrib modules.
> [source](https://wiki.postgresql.org/wiki/Show_database_bloat)

## Example

```sql
CREATE DATABASE bloat_test;

CREATE EXTENSION IF NOT EXISTS pgstattuple;

DROP TABLE IF EXISTS not_bloated;
CREATE TABLE not_bloated (id SERIAL PRIMARY KEY, val INT);
CREATE INDEX not_bloated_idx on not_bloated (val);
INSERT INTO not_bloated (val) SELECT generate_series(1, 100000);

DROP TABLE IF EXISTS bloated;
CREATE TABLE bloated (id SERIAL PRIMARY KEY, val INT);
CREATE INDEX bloated_idx on bloated (val);
INSERT INTO bloated (val) SELECT generate_series(1, 100000);

VACUUM FULL;

DELETE FROM bloated WHERE val >= 50000;

SELECT * FROM pgstattuple('not_bloated');
-- table_len          | 3629056 (in bytes)
-- tuple_count        | 100000
-- tuple_len          | 3200000
-- tuple_percent      | 88.18
-- dead_tuple_count   | 0
-- dead_tuple_len     | 0
-- dead_tuple_percent | 0
-- free_space         | 16652
-- free_percent       | 0.46

SELECT * FROM pgstattuple('bloated');
-- table_len          | 3629056 (in bytes)
-- tuple_count        | 49999
-- tuple_len          | 1599968
-- tuple_percent      | 44.09
-- dead_tuple_count   | 50001
-- dead_tuple_len     | 1600032
-- dead_tuple_percent | 44.09
-- free_space         | 16652
-- free_percent       | 0.46

SELECT * FROM pgstatindex('not_bloated_idx');
-- version            | 4
-- tree_level         | 1
-- index_size         | 2260992
-- root_block_no      | 3
-- internal_pages     | 1
-- leaf_pages         | 274
-- empty_pages        | 0
-- deleted_pages      | 0
-- avg_leaf_density   | 89.83
-- leaf_fragmentation | 0
SELECT * FROM pgstatindex('bloated_idx');
-- version            | 4
-- tree_level         | 1
-- index_size         | 2260992
-- root_block_no      | 3
-- internal_pages     | 1
-- leaf_pages         | 274
-- empty_pages        | 0
-- deleted_pages      | 0
-- avg_leaf_density   | 89.83
-- leaf_fragmentation | 0
```

Note from the Postgres documentation:

> The table_len will always be greater than the sum of the tuple_len,
> dead_tuple_len and free_space. The difference is accounted for by fixed page
> overhead, the per-page table of pointers to tuples, and padding to ensure
> that tuples are correctly aligned.

We can define table bloat as:

```
table_bloat = (bloat_size / table_size) * 100
```

Where

```
bloat_size = table_len - tuple_len
table_size = table_len
```

For our example, table bloat in the `bloated` table is ~56%.

## Find The Top 10 Bloated Tables in The Database

```sql
SELECT relname, (pgstattuple(oid)).*
FROM pg_class WHERE relkind = 'r'
ORDER BY dead_tuple_percent DESC
LIMIT 10;
```

## Sources

- [bloat estimation blog post](https://www.cybertec-postgresql.com/en/detecting-table-bloat/)
- [bloat estimation blog post 2](https://www.timescale.com/learn/how-to-reduce-bloat-in-large-postgresql-tables)
- [bloat estimation queries](https://github.com/marcelofern/pgsql-bloat-estimation)

## Outro

Since I am using DataDog at the moment, it's worth mentioning that DataDog
calculates index bloat using a special query created based on:

- [postgres wiki on bloat](https://wiki.postgresql.org/wiki/Show_database_bloat)
- [burcardo's check postgres](https://github.com/bucardo/check_postgres/)

The actual query can be found [here](https://github.com/DataDog/integrations-core/blob/8c575d73d669c67fd154da6d32e5dad9448b2091/postgres/datadog_checks/postgres/relationsmanager.py#L323)

The same is true for table bloat, but the query is slightly different [source](https://github.com/DataDog/integrations-core/blob/8c575d73d669c67fd154da6d32e5dad9448b2091/postgres/datadog_checks/postgres/relationsmanager.py#L269).
