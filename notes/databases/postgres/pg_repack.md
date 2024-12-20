# pg_repack

```
Created at: 2024-11-04
```

This extension helps with removing bloat from tables and indexes. It can also
optionally restore the physical order of clustered indexes.

Differently from VACUUM FULL, and CLUSTER this works without an exclusive lock
on the table. This extension claims to perform as well as CLUSTER itself.

Here is what it is capable of doing:

- CLUSTER without exclusive lock (ordered by cluster index).
- Ordered by specified columns.
- VACUUM FULL without exclusive lock (packing rows only).
- Rebuild or relocate only the indexes of a table.

## Why rebuild a table (and/or indexes)?

> VACUUM is one of the key maintenance operations in PostgreSQL, responsible
> for cleaning up dead tuples from the table pages, thereby freeing up space.
> This space can either be re-used for future insertions and updates or remain
> unused and lead to fragmentation. With massive data purge operations
> involving deletion of a significant percentage of data from a table, the
> amount of fragmentation may be significantly larger. Eventually, these
> fragmented pages increase the size of the table and utilize more disk space
> than required. Such fragmentation might distribute tuples across an
> unnecessarily large number of pages, creating performance bottlenecks.
> [source](https://hexacluster.ai/postgresql/rebuilding-tables-online-using-pg_repack-in-postgresql/)

The problem with VACUUM FULL is that it blocks reads and writes.

An article worth reading is Amazon's "Reducing bloat in tables and indexes with
pg_repac [source](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.pg_repack.html)

## Requirements

- To ensure efficient performance, the target table should possess either a
  primary key or at least a unique index covering a non-null column.
- Executing a complete table repack necessitates available disk space roughly
  twice the size of the target table(s) and their associated indexes.
- pg_repack will not work on postgresql catalog tables.
- Only table owners and superusers can use pg_repack to rebuild the table.

## Example

This is how you'd rebuild a table using pg_repack

```sh
# Perform a dry-run pass to see whether we can rebuild the table online
$ pg_repack --table foo -d my_db --dry-run

# To execute the rebuild
$ pg_repack --table foo -d my_db
INFO: repacking table "public.foo"

# It may throw this warning if the table doesn't have a PK or unique index
# non-nullable column:
WARNING: relation "public.foo" must have a primary key or not-null unique keys
```

Useful flags:

- -e: gives more verbose information
- --wait-timeout: adds sensible lock timeout values. Defaults to 60s.
- --no-kill-backend: do not kill queries blocking pg_repack.
- --jobs: for parallelism. Add if you have spare CPUs.

A useful flag is `-e`, it will give more verbose information back to the
caller.

There are 7 steps performed by pg_repack here:

1. **Create a log table**: This table will log inserts, updates, and deletes to
   the old table.
2. **Add triggers**: The trigger will capture inserts, updates, and deletes and
   insert them into the log table created before.
3. **Create new table**: Create the new table.
4. **Add indexes in the new table**: Add index on the PK for query performance.
5. **Apply changes from log table**: For synchronisation.
6. **Swaps the tables**: And inform the catalogue.
7. **Drop old table**.

## Important use case

Sometimes you need to rebuild an old table, creating a new table, and swap it
by the new one.

One such case I've come across in production is that someone wanted to add an
EXCLUSION constraint to a table with over 100 million rows and a lot of access
across the codebase. EXCLUSION constraints can't be created without blocking
reads and writes. In this case, a new table needed to be created, with the new
exclusion constraint, and swapped with the old one.

## Installing from source

I prefer to build things from source whenever I can.
If you built postgres from source, you'll have to also install pg_repack from
source as well.

```sh
POSTGRES_DIR=$HOME/workspace/postgres15
REPACK_VERSION=1.5.1

cd $POSTGRES_DIR
# I use the "build" folder for building artifacts:
cd build/

git clone git@github.com:reorg/pg_repack.git
cd pg_repack
git checkout tags/ver_$REPACK_VERSION

# PG repack needs to know where `pg_config` is.
PG_CONFIG=$POSTGRES_DIR/build/bin/pg_config make
PG_CONFIG=$POSTGRES_DIR/build/bin/pg_config make install

# To use the binary (command line) copy it to the postgres directory so that
# all binaries are in the same place.
cp bin/pg_repack $POSTGRES_DIR/build/bin
```

Now hop on `psql` and create the extension in the database of choice:

```sql
CREATE EXTENSION pg_repack;
```

## If you prefer docker

Here's some instructions to run it via docker.

- [pg-repack-docker](https://github.com/hartmut-co-uk/pg-repack-docker)

## Testing

Create tables and data:

Note: The bellow requires the `btree_gist` extension to be installed.

```sql
CREATE TABLE table_for_repack (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT value_check CHECK (value >= 0),
    CONSTRAINT name_unique UNIQUE (name)
);

CREATE INDEX idx_value ON table_for_repack (value);
CREATE INDEX idx_created_at ON table_for_repack (created_at);

-- Insert 1000 rows
DO $$
DECLARE
    i INT;
BEGIN
    FOR i IN 1..1000 LOOP
        INSERT INTO table_for_repack (name, value)
        VALUES (
            'item_' || i,
            (i % 100) + 1
        );
    END LOOP;
END $$;

VACUUM ANALYZE table_for_repack;
```

Now let's run pg_repack in and print the statements:

```sh
POSTGRES_DIR=$HOME/workspace/postgres15
PG_REPACK_BIN=$POSTGRES_DIR/build/bin/pg_repack

TABLE=table_for_repack
DB_NAME=test

$PG_REPACK_BIN --table $TABLE -d $DB_NAME --echo
```

This is what I get in return:

```
LOG: (query) SET search_path TO pg_catalog, pg_temp, public
LOG: (query) SET search_path TO pg_catalog, pg_temp, public
LOG: (query) select repack.version(), repack.version_sql()
LOG: (query) SET statement_timeout = 0
LOG: (query) SET search_path = pg_catalog, pg_temp, public
LOG: (query) SET client_min_messages = warning
LOG: (query) SELECT r FROM (VALUES ($1, 'r')) AS given_t(r,kind) WHERE NOT EXISTS(  SELECT FROM repack.tables WHERE relid=to_regclass(given_t.r)) AND NOT EXISTS(  SELECT FROM pg_catalog.pg_class c WHERE c.oid=to_regclass(given_t.r) AND c.relkind = given_t.kind AND given_t.kind = 'p')
LOG:    (param:0) = table_for_repack
LOG: (query) SELECT t.*, coalesce(v.tablespace, t.tablespace_orig) as tablespace_dest FROM repack.tables t,  (VALUES ($1::text)) as v (tablespace) WHERE (relid = $2::regclass) ORDER BY t.relname, t.schemaname
LOG:    (param:0) = (null)
LOG:    (param:1) = table_for_repack
INFO: repacking table "public.table_for_repack"
LOG: (query) SELECT pg_try_advisory_lock($1, CAST(-2147483648 + $2::bigint AS integer))
LOG:    (param:0) = 16185446
LOG:    (param:1) = 17176
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT pg_get_indexdef(indexrelid) FROM pg_index WHERE indrelid = $1 AND NOT indisvalid
LOG:    (param:0) = 17176
LOG: (query) SELECT indexrelid, repack.repack_indexdef(indexrelid, indrelid, $2, FALSE)  FROM pg_index WHERE indrelid = $1 AND indisvalid
LOG:    (param:0) = 17176
LOG:    (param:1) = (null)
LOG: (query) SELECT repack.conflicted_triggers($1)
LOG:    (param:0) = 17176
LOG: (query) SELECT repack.create_index_type(17182,17176)
LOG: (query) SELECT repack.create_log_table(17176)
LOG: (query) CREATE TRIGGER repack_trigger AFTER INSERT OR DELETE OR UPDATE ON public.table_for_repack FOR EACH ROW EXECUTE PROCEDURE repack.repack_trigger('id')
LOG: (query) ALTER TABLE public.table_for_repack ENABLE ALWAYS TRIGGER repack_trigger
LOG: (query) SELECT repack.disable_autovacuum('repack.log_17176')
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) SELECT pg_backend_pid()
LOG: (query) SELECT pid FROM pg_locks WHERE locktype = 'relation' AND granted = false AND relation = 17176 AND mode = 'AccessExclusiveLock' AND pid <> pg_backend_pid()
LOG: (query) COMMIT
LOG: (query) BEGIN ISOLATION LEVEL SERIALIZABLE
LOG: (query) SELECT set_config('work_mem', current_setting('maintenance_work_mem'), true)
LOG: (query) SELECT coalesce(array_agg(l.virtualtransaction), '{}')   FROM pg_locks AS l   LEFT JOIN pg_stat_activity AS a     ON l.pid = a.pid   LEFT JOIN pg_database AS d     ON a.datid = d.oid   WHERE l.locktype = 'virtualxid'   AND l.pid NOT IN (pg_backend_pid(), $1)   AND (l.virtualxid, l.virtualtransaction) <> ('1/1', '-1/0')   AND (a.application_name IS NULL OR a.application_name <> $2)  AND a.query !~* E'^\\s*vacuum\\s+'   AND a.query !~ E'^autovacuum: '   AND ((d.datname IS NULL OR d.datname = current_database()) OR l.database = 0)
LOG:    (param:0) = 23826
LOG:    (param:1) = pg_repack
LOG: (query) DELETE FROM repack.log_17176
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SELECT pid FROM pg_locks WHERE locktype = 'relation' AND granted = false AND relation = 17176 AND mode = 'AccessExclusiveLock' AND pid <> pg_backend_pid()
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS SHARE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT repack.create_table($1, $2)
LOG:    (param:0) = 17176
LOG:    (param:1) = pg_default
LOG: (query) INSERT INTO repack.table_17176 SELECT id,name,value,created_at FROM ONLY public.table_for_repack
LOG: (query) SELECT repack.disable_autovacuum('repack.table_17176')
LOG: (query) COMMIT
LOG: (query) SELECT 'repack.table_17176'::regclass::oid
LOG: (query) CREATE UNIQUE INDEX index_17182 ON repack.table_17176 USING btree (id)
LOG: (query) CREATE UNIQUE INDEX index_17184 ON repack.table_17176 USING btree (name)
LOG: (query) CREATE INDEX index_17186 ON repack.table_17176 USING btree (value)
LOG: (query) CREATE INDEX index_17187 ON repack.table_17176 USING btree (created_at)
LOG: (query) SELECT repack.repack_apply($1, $2, $3, $4, $5, $6)
LOG:    (param:0) = SELECT * FROM repack.log_17176 ORDER BY id LIMIT $1
LOG:    (param:1) = INSERT INTO repack.table_17176 VALUES ($1.*)
LOG:    (param:2) = DELETE FROM repack.table_17176 WHERE (id) = ($1.id)
LOG:    (param:3) = UPDATE repack.table_17176 SET (id, name, value, created_at) = ($2.id, $2.name, $2.value, $2.created_at) WHERE (id) = ($1.id)
LOG:    (param:4) = DELETE FROM repack.log_17176 WHERE id IN (
LOG:    (param:5) = 1000
LOG: (query) SELECT pid FROM pg_locks WHERE locktype = 'virtualxid' AND pid <> pg_backend_pid() AND virtualtransaction = ANY($1)
LOG:    (param:0) = {}
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE repack.table_17176 IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT repack.repack_apply($1, $2, $3, $4, $5, $6)
LOG:    (param:0) = SELECT * FROM repack.log_17176 ORDER BY id LIMIT $1
LOG:    (param:1) = INSERT INTO repack.table_17176 VALUES ($1.*)
LOG:    (param:2) = DELETE FROM repack.table_17176 WHERE (id) = ($1.id)
LOG:    (param:3) = UPDATE repack.table_17176 SET (id, name, value, created_at) = ($2.id, $2.name, $2.value, $2.created_at) WHERE (id) = ($1.id)
LOG:    (param:4) = DELETE FROM repack.log_17176 WHERE id IN (
LOG:    (param:5) = 0
LOG: (query) SELECT repack.repack_swap($1)
LOG:    (param:0) = 17176
LOG: (query) COMMIT
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT repack.repack_drop($1, $2)
LOG:    (param:0) = 17176
LOG:    (param:1) = 4
LOG: (query) COMMIT
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) ANALYZE public.table_for_repack
LOG: (query) COMMIT
LOG: (query) SELECT pg_advisory_unlock($1, CAST(-2147483648 + $2::bigint AS integer))
LOG:    (param:0) = 16185446
LOG:    (param:1) = 17176
```
