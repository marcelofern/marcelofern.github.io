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
pg_repack [source](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.pg_repack.html)

## Requirements

- To ensure efficient performance, the target table should have either a
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
   The table looks like this (when it has data in it):
   ```
    id |    pk    |                          row
   ----+----------+--------------------------------------------------------
     1 |          | (100012,my_name001,42,"2025-02-04 18:14:53.780287+13")
     2 |          | (100013,my_name003,42,"2025-02-04 18:14:53.785157+13")
     3 | (100013) | (100013,my_name003,43,"2025-02-04 18:14:53.785157+13")
     4 | (100012) |
     5 | (100013) |
   ```
   The above means that rows 100012 and 100013 were inserted and then deleted
   (empty data in the row) after being updated (row 3).
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

# PG repack needs to know where `pg_config` is. Remove the "bear" part if you
# don't want a compile_commands.json file at the end.
PG_CONFIG=$POSTGRES_DIR/build/bin/pg_config bear --output compile_commands.json -- make
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
DROP TABLE IF EXISTS table_for_repack CASCADE;
CREATE TABLE table_for_repack (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value INTEGER NOT NULL,
    excluded INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT value_check CHECK (value >= 0),
    CONSTRAINT name_unique UNIQUE (name),
    EXCLUDE USING BTREE (excluded WITH =)  -- Excludes identical values in the value field
);

CREATE INDEX idx_value ON table_for_repack (value);
CREATE INDEX idx_created_at ON table_for_repack (created_at);

DROP TABLE IF EXISTS table_with_fk CASCADE;
CREATE TABLE table_with_fk (
    id SERIAL PRIMARY KEY,
    table_for_repack_id INTEGER NOT NULL,
    CONSTRAINT fk_table_for_repack FOREIGN KEY (table_for_repack_id)
        REFERENCES table_for_repack(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert 100_000 rows
INSERT INTO table_for_repack (name, value, excluded)
SELECT
    'item_' || generate_series(1, 100000) AS name,
    (generate_series(1, 100000) % 100000) + 1 AS value,
    (generate_series(1, 100000) % 100000) + 1 AS excluded;

INSERT INTO table_with_fk (table_for_repack_id)
SELECT generate_series(1, 100000);
```

Now let's run pg_repack in and print the statements:

```sh
POSTGRES_DIR=$HOME/workspace/postgres15
PG_REPACK_BIN=$POSTGRES_DIR/build/bin/pg_repack

TABLE=table_for_repack
DB_NAME=repack_test

$PG_REPACK_BIN --table $TABLE -d $DB_NAME --echo --elevel=DEBUG
```

This is what I get in return:

```
$PG_REPACK_BIN --table $TABLE -d $DB_NAME --echo --elevel=DEBUG
DEBUG: No workers to disconnect.
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
DEBUG: ---- repack_one_table ----
DEBUG: target_name       : public.table_for_repack
DEBUG: target_oid        : 2815040
DEBUG: target_toast      : 0
DEBUG: target_tidx       : 0
DEBUG: pkid              : 2815046
DEBUG: ckid              : 0
DEBUG: create_pktype     : SELECT repack.create_index_type(2815046,2815040)
DEBUG: create_log        : SELECT repack.create_log_table(2815040)
DEBUG: create_trigger    : CREATE TRIGGER repack_trigger AFTER INSERT OR DELETE OR UPDATE ON public.table_for_repack FOR EACH ROW EXECUTE PROCEDURE repack.repack_trigger('id')
DEBUG: enable_trigger    : ALTER TABLE public.table_for_repack ENABLE ALWAYS TRIGGER repack_trigger
DEBUG: create_table      : SELECT repack.create_table($1, $2)
DEBUG: dest_tablespace   : pg_default
DEBUG: copy_data         : INSERT INTO repack.table_2815040 SELECT id,name,value,excluded,created_at FROM ONLY public.table_for_repack
DEBUG: alter_col_storage : (skipped)
DEBUG: drop_columns      : (skipped)
DEBUG: delete_log        : DELETE FROM repack.log_2815040
DEBUG: lock_table        : LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
DEBUG: sql_peek          : SELECT * FROM repack.log_2815040 ORDER BY id LIMIT $1
DEBUG: sql_insert        : INSERT INTO repack.table_2815040 VALUES ($1.*)
DEBUG: sql_delete        : DELETE FROM repack.table_2815040 WHERE (id) = ($1.id)
DEBUG: sql_update        : UPDATE repack.table_2815040 SET (id, name, value, excluded, created_at) = ($2.id, $2.name, $2.value, $2.excluded, $2.created_at) WHERE (id) = ($1.id)
DEBUG: sql_pop           : DELETE FROM repack.log_2815040 WHERE id IN (
DEBUG: ---- setup ----
LOG: (query) SELECT pg_try_advisory_lock($1, CAST(-2147483648 + $2::bigint AS integer))
LOG:    (param:0) = 16185446
LOG:    (param:1) = 2815040
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT pg_get_indexdef(indexrelid) FROM pg_index WHERE indrelid = $1 AND NOT indisvalid
LOG:    (param:0) = 2815040
LOG: (query) SELECT indexrelid, repack.repack_indexdef(indexrelid, indrelid, $2, FALSE)  FROM pg_index WHERE indrelid = $1 AND indisvalid
LOG:    (param:0) = 2815040
LOG:    (param:1) = (null)
DEBUG: index[0].target_oid      : 2815046
DEBUG: index[0].create_index    : CREATE UNIQUE INDEX index_2815046 ON repack.table_2815040 USING btree (id)
DEBUG: index[1].target_oid      : 2815048
DEBUG: index[1].create_index    : CREATE UNIQUE INDEX index_2815048 ON repack.table_2815040 USING btree (name)
DEBUG: index[2].target_oid      : 2815050
DEBUG: index[2].create_index    : CREATE INDEX index_2815050 ON repack.table_2815040 USING btree (excluded)
DEBUG: index[3].target_oid      : 2815052
DEBUG: index[3].create_index    : CREATE INDEX index_2815052 ON repack.table_2815040 USING btree (value)
DEBUG: index[4].target_oid      : 2815053
DEBUG: index[4].create_index    : CREATE INDEX index_2815053 ON repack.table_2815040 USING btree (created_at)
LOG: (query) SELECT repack.conflicted_triggers($1)
LOG:    (param:0) = 2815040
LOG: (query) SELECT repack.create_index_type(2815046,2815040)
LOG: (query) SELECT repack.create_log_table(2815040)
LOG: (query) CREATE TRIGGER repack_trigger AFTER INSERT OR DELETE OR UPDATE ON public.table_for_repack FOR EACH ROW EXECUTE PROCEDURE repack.repack_trigger('id')
LOG: (query) ALTER TABLE public.table_for_repack ENABLE ALWAYS TRIGGER repack_trigger
LOG: (query) SELECT repack.disable_autovacuum('repack.log_2815040')
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) SELECT pg_backend_pid()
DEBUG: LOCK TABLE public.table_for_repack IN ACCESS SHARE MODE
LOG: (query) SELECT pid FROM pg_locks WHERE locktype = 'relation' AND granted = false AND relation = 2815040 AND mode = 'AccessExclusiveLock' AND pid <> pg_backend_pid()
DEBUG: No competing DDL to cancel.
LOG: (query) COMMIT
DEBUG: Waiting on ACCESS SHARE lock...
DEBUG: ---- copy tuples ----
LOG: (query) BEGIN ISOLATION LEVEL SERIALIZABLE
LOG: (query) SELECT set_config('work_mem', current_setting('maintenance_work_mem'), true)
LOG: (query) SELECT coalesce(array_agg(l.virtualtransaction), '{}')   FROM pg_locks AS l   LEFT JOIN pg_stat_activity AS a     ON l.pid = a.pid   LEFT JOIN pg_database AS d     ON a.datid = d.oid   WHERE l.locktype = 'virtualxid'   AND l.pid NOT IN (pg_backend_pid(), $1)   AND (l.virtualxid, l.virtualtransaction) <> ('1/1', '-1/0')   AND (a.application_name IS NULL OR a.application_name <> $2)  AND a.query !~* E'^\\s*vacuum\\s+'   AND a.query !~ E'^autovacuum: '   AND ((d.datname IS NULL OR d.datname = current_database()) OR l.database = 0)
LOG:    (param:0) = 90920
LOG:    (param:1) = pg_repack
LOG: (query) DELETE FROM repack.log_2815040
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SELECT pid FROM pg_locks WHERE locktype = 'relation' AND granted = false AND relation = 2815040 AND mode = 'AccessExclusiveLock' AND pid <> pg_backend_pid()
DEBUG: No competing DDL to cancel.
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS SHARE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT repack.create_table($1, $2)
LOG:    (param:0) = 2815040
LOG:    (param:1) = pg_default
LOG: (query) INSERT INTO repack.table_2815040 SELECT id,name,value,excluded,created_at FROM ONLY public.table_for_repack
LOG: (query) SELECT repack.disable_autovacuum('repack.table_2815040')
LOG: (query) COMMIT
LOG: (query) SELECT 'repack.table_2815040'::regclass::oid
DEBUG: ---- create indexes ----
DEBUG: Have 5 indexes and num_workers=0
DEBUG: set up index_jobs [0]
DEBUG: target_oid   : 2815046
DEBUG: create_index : CREATE UNIQUE INDEX index_2815046 ON repack.table_2815040 USING btree (id)
LOG: (query) CREATE UNIQUE INDEX index_2815046 ON repack.table_2815040 USING btree (id)
DEBUG: set up index_jobs [1]
DEBUG: target_oid   : 2815048
DEBUG: create_index : CREATE UNIQUE INDEX index_2815048 ON repack.table_2815040 USING btree (name)
LOG: (query) CREATE UNIQUE INDEX index_2815048 ON repack.table_2815040 USING btree (name)
DEBUG: set up index_jobs [2]
DEBUG: target_oid   : 2815050
DEBUG: create_index : CREATE INDEX index_2815050 ON repack.table_2815040 USING btree (excluded)
LOG: (query) CREATE INDEX index_2815050 ON repack.table_2815040 USING btree (excluded)
DEBUG: set up index_jobs [3]
DEBUG: target_oid   : 2815052
DEBUG: create_index : CREATE INDEX index_2815052 ON repack.table_2815040 USING btree (value)
LOG: (query) CREATE INDEX index_2815052 ON repack.table_2815040 USING btree (value)
DEBUG: set up index_jobs [4]
DEBUG: target_oid   : 2815053
DEBUG: create_index : CREATE INDEX index_2815053 ON repack.table_2815040 USING btree (created_at)
LOG: (query) CREATE INDEX index_2815053 ON repack.table_2815040 USING btree (created_at)
LOG: (query) SELECT repack.repack_apply($1, $2, $3, $4, $5, $6)
LOG:    (param:0) = SELECT * FROM repack.log_2815040 ORDER BY id LIMIT $1
LOG:    (param:1) = INSERT INTO repack.table_2815040 VALUES ($1.*)
LOG:    (param:2) = DELETE FROM repack.table_2815040 WHERE (id) = ($1.id)
LOG:    (param:3) = UPDATE repack.table_2815040 SET (id, name, value, excluded, created_at) = ($2.id, $2.name, $2.value, $2.excluded, $2.created_at) WHERE (id) = ($1.id)
LOG:    (param:4) = DELETE FROM repack.log_2815040 WHERE id IN (
LOG:    (param:5) = 1000
LOG: (query) SELECT pid FROM pg_locks WHERE locktype = 'virtualxid' AND pid <> pg_backend_pid() AND virtualtransaction = ANY($1)
LOG:    (param:0) = {}
DEBUG: ---- swap ----
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE repack.table_2815040 IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT repack.repack_apply($1, $2, $3, $4, $5, $6)
LOG:    (param:0) = SELECT * FROM repack.log_2815040 ORDER BY id LIMIT $1
LOG:    (param:1) = INSERT INTO repack.table_2815040 VALUES ($1.*)
LOG:    (param:2) = DELETE FROM repack.table_2815040 WHERE (id) = ($1.id)
LOG:    (param:3) = UPDATE repack.table_2815040 SET (id, name, value, excluded, created_at) = ($2.id, $2.name, $2.value, $2.excluded, $2.created_at) WHERE (id) = ($1.id)
LOG:    (param:4) = DELETE FROM repack.log_2815040 WHERE id IN (
LOG:    (param:5) = 0
LOG: (query) SELECT repack.repack_swap($1)
LOG:    (param:0) = 2815040
LOG: (query) COMMIT
DEBUG: ---- drop ----
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) SAVEPOINT repack_sp1
LOG: (query) SET LOCAL lock_timeout = 100
LOG: (query) LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
LOG: (query) RESET lock_timeout
LOG: (query) SELECT repack.repack_drop($1, $2)
LOG:    (param:0) = 2815040
LOG:    (param:1) = 4
LOG: (query) COMMIT
DEBUG: ---- analyze ----
LOG: (query) BEGIN ISOLATION LEVEL READ COMMITTED
LOG: (query) ANALYZE public.table_for_repack
LOG: (query) COMMIT
LOG: (query) SELECT pg_advisory_unlock($1, CAST(-2147483648 + $2::bigint AS integer))
LOG:    (param:0) = 16185446
LOG:    (param:1) = 2815040
DEBUG: No workers to disconnect.
```

TODO: Check log of all queries on postgres side

## Going deeper, what does the pg_repack binary actually do?

The best way to understand this is by reading through the code of the `main`
function that gets executed when the binary runs. The code can be accessed
[here](https://github.com/reorg/pg_repack/blob/a4b9b33e488a2e1585b26c9425824ada88c84a2f/bin/pg_repack.c#L300-L300).

Straight away, this function uses the `pgut` library a lot. This library
is present also in `pg_reorg`. The commit that added it into `pg_repack`
(574b6dc2) only states "Support PGXS".

In summary:

1. Initialise `pgut` with the command line arguments (via `pgut_getopt`). This
   will set the program name to `pg_repack`, set the postgres locally for the
   command so that it can run from the scripts folder, and set up interruption
   handlers so that pgut disconnects at the end.
2. Check for errors in the command line arguments provided.
3. Check if the tablespace requested existed (a location on disk where data
   files will be stored). Potentially controlled via the command line argument
   `--tablespace=TBLSPC`. Performs this query:
    ```sql
    select spcname from pg_tablespace where spcname = $1;
    ```
4. Verify if should order by a particular column (`orderby`).
5. Finally call `repack_one_database` or `repack_all_databases`.

## Repacking "one database" (repack_one_database)

This is just a wrapper for repacking a table.
It will collate a few bits of info:

- Number of parent tables to handle.
- Number of tables to handle.
- Number of extensions to exclude (tables belonging to extensions).

And then will try to do a few things:

- Set up multiple workers in case concurrent index rebuild is required. Or when
  repacking many tables at a time.
- Perform sanity checks before beginning work. 
  - Making sure pg_repack is installed in the db and versions match.
  - the user is a superuser (available from the connection is_superuser
    details),
  - `SET statement_timeout = 0;`
  - `SET search_path = pg_catalog, pg_temp, public;`
  - `SET client_min_messages = warning;` (gets rid of annoying "create
    implicit..." messages)
- Check if the relations to be repacked exist and if the repack tables are
  already there:
  ```sql
  --  creates a temporary table with two columns: r and kind.
  -- $1 is a placeholder for a parameter that will be provided when the
  -- query is executed. In this case, it's the table name "table_for_repack".
  -- AS given_t(r, kind) renames the columns of the temporary values table to r
  -- and kind.
  -- given_t is the alias of the temporary table.
  -- 
  SELECT r FROM (VALUES ($1, 'r')) AS given_t(r,kind)
  WHERE NOT EXISTS (
      SELECT FROM repack.tables
      WHERE relid=to_regclass(given_t.r)
  ) AND NOT EXISTS (
      SELECT FROM pg_catalog.pg_class c
      WHERE c.oid=to_regclass(given_t.r)
      AND c.relkind = given_t.kind
      -- Check if the kind is 'p' (which stands for partitioned tables in
      -- PostgreSQL). So, this is filtering for partitioned tables only.
      -- Partitioned tables aren't supported.
      AND given_t.kind = 'p'
  )
  ```
  ```sql
  SELECT t.*, coalesce(v.tablespace, t.tablespace_orig) as tablespace_dest
  FROM repack.tables t,
  (VALUES ($1::text)) as v (tablespace)
  WHERE (relid = $2::regclass) ORDER BY t.relname, t.schemaname
  ```
- It requires the relation must have a primary key or not-null unique key (for
  the batch lookup).
- It then builds the "table" variable of type `repack_table`. This is an
  example of what it holds in our sandbox case:
  ```
  (repack_table) {
    target_name = 0x00000001398087d8 "public.table_for_repack"
    target_oid = 2093608
    target_toast = 0
    target_tidx = 0
    pkid = 2093614
    ckid = 0
    temp_oid = 0
    create_pktype = 0x000000013980880b "SELECT repack.create_index_type(2093614,2093608)"
    create_log = 0x000000013980883c "SELECT repack.create_log_table(2093608)"
    create_trigger = 0x0000000139808864 "CREATE TRIGGER repack_trigger AFTER INSERT OR DELETE OR UPDATE ON public.table_for_repack FOR EACH ROW EXECUTE PROCEDURE repack.repack_trigger('id')"
    enable_trigger = 0x00000001398088f9 "ALTER TABLE public.table_for_repack ENABLE ALWAYS TRIGGER repack_trigger"
    create_table = 0x0000000139808942 "SELECT repack.create_table($1, $2)"
    dest_tablespace = 0x0000000139808b8b "pg_default"
    copy_data = 0x0000000139808970 "INSERT INTO repack.table_2093608 SELECT id,name,value,created_at FROM ONLY public.table_for_repack"
    alter_col_storage = 0x0000000000000000
    drop_columns = 0x0000000000000000
    delete_log = 0x00000001398089d3 "DELETE FROM repack.log_2093608"
    lock_table = 0x0000000139808a08 "LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE"
    sql_peek = 0x0000000139808a44 "SELECT * FROM repack.log_2093608 ORDER BY id LIMIT $1"
    sql_insert = 0x0000000139808a7a "INSERT INTO repack.table_2093608 VALUES ($1.*)"
    sql_delete = 0x0000000139808aa9 "DELETE FROM repack.table_2093608 WHERE (id) = ($1.id)"
    sql_update = 0x0000000139808adf "UPDATE repack.table_2093608 SET (id, name, value, created_at) = ($2.id, $2.name, $2.value, $2.created_at) WHERE (id) = ($1.id)"
    sql_pop = 0x0000000139808b5e "DELETE FROM repack.log_2093608 WHERE id IN ("
    n_indexes = 0
    indexes = NULL
  }
  ```
- Then finally calls `repack_one_table`.

## Repacking "one table" (repack_one_table)

This function effectivelly performs the repacking.
During its set up, it will print the following under DEBUG mode:

```
INFO: repacking table "public.table_for_repack"
DEBUG: ---- repack_one_table ----
DEBUG: target_name       : public.table_for_repack
DEBUG: target_oid        : 2093608
DEBUG: target_toast      : 0
DEBUG: target_tidx       : 0
DEBUG: pkid              : 2093614
DEBUG: ckid              : 0
DEBUG: create_pktype     : SELECT repack.create_index_type(2093614,2093608)
DEBUG: create_log        : SELECT repack.create_log_table(2093608)
DEBUG: create_trigger    : CREATE TRIGGER repack_trigger AFTER INSERT OR DELETE OR UPDATE ON public.table_for_repack FOR EACH ROW EXECUTE PROCEDURE repack.repack_trigger('id')
DEBUG: enable_trigger    : ALTER TABLE public.table_for_repack ENABLE ALWAYS TRIGGER repack_trigger
DEBUG: create_table      : SELECT repack.create_table($1, $2)
DEBUG: dest_tablespace   : pg_default
DEBUG: copy_data         : INSERT INTO repack.table_2093608 SELECT id,name,value,created_at FROM ONLY public.table_for_repack
DEBUG: alter_col_storage : (skipped)
DEBUG: drop_columns      : (skipped)
DEBUG: delete_log        : DELETE FROM repack.log_2093608
DEBUG: lock_table        : LOCK TABLE public.table_for_repack IN ACCESS EXCLUSIVE MODE
DEBUG: sql_peek          : SELECT * FROM repack.log_2093608 ORDER BY id LIMIT $1
DEBUG: sql_insert        : INSERT INTO repack.table_2093608 VALUES ($1.*)
DEBUG: sql_delete        : DELETE FROM repack.table_2093608 WHERE (id) = ($1.id)
DEBUG: sql_update        : UPDATE repack.table_2093608 SET (id, name, value, created_at) = ($2.id, $2.name, $2.value, $2.created_at) WHERE (id) = ($1.id)
DEBUG: sql_pop           : DELETE FROM repack.log_2093608 WHERE id IN (
```
Then:

1. It will try to acquire an advisory lock to forbid multiple runs of
   `pg_repack` of happening on the same table.
2. It will lock the `table_for_repack` in access exclusive mode. This helps
   with doing `pg_get_indexdef` calls (which require an access share lock
   anyway) and making sure they won't be blocked.
   ```sql
   SELECT pg_get_indexdef(indexrelid)
   FROM pg_index WHERE indrelid = $1 AND NOT indisvalid
    -- LOG: (query) SELECT pg_get_indexdef(indexrelid) FROM pg_index
    -- WHERE indrelid = $1 AND NOT indisvalid
    -- LOG: (param:0) = 2093608
   ```
   This query checks if there's any invalid index present on the table, and
   raises an error if `--error-on-invalid-index` is not set.
3. Now check for the valid indexes...
   ```sql
   SELECT indexrelid, repack.repack_indexdef(indexrelid, indrelid, $2, FALSE)
   FROM pg_index WHERE indrelid = $1 AND indisvalid
   -- LOG:    (param:0) = 2093608
   ```
   This query will store the `indexrelid` information, and the
   `repack_indexdef` function figures out what the definition of that index has
   to be for the table to be repacked.
4. It will try to clean up the "repack trigger" on the table if a previous
   attempt at repacking has failed and needs clean up. A cool thing about
   extensions is that if you perform DROP EXTENSION, it will automatically
   delete these triggers and clean up everything nicely. And then you can just
   CREATE EXTENSION again and you're all set to retry.
5. Create the pktype (index)
   `SELECT repack.create_index_type(2093614,2093608)`.
   This is the index used for the repacking process.
6. Create the log table: `SELECT repack.create_log_table(2093608)`.
7. Create the trigger
   ```sql
   CREATE TRIGGER repack_trigger AFTER INSERT OR DELETE OR UPDATE ON
   public.table_for_repack
   FOR EACH ROW EXECUTE PROCEDURE repack.repack_trigger('id')
   ```
8. Enable the trigger `ALTER TABLE public.table_for_repack ENABLE ALWAYS TRIGGER repack_trigger`.
9. Disable autovacuum: `SELECT repack.disable_autovacuum('repack.log_2093608')`
   I'm not sure why this is needed. Worth checking history of this (see
   bin/pg_repack.c:1389). Guess: Maybe becuase it's append/delete only?
10. Ask for another connection (async) to lock the `table_for_repack` in
    AccessShare mode to avoid DDLs trying to change that table of running
    before we repack. That would affect our repacking process. DDLs are killed
    if that's the case.
    `LOCK TABLE public.table_for_repack IN ACCESS SHARE MODE`.
11. Now, we need to kill other ddls (except that by conn2 that just acquired
    the lock above), so that they don't acquire the lock before conn2 can!
12. Finally close that transaction from early on with ACCESS EXCLUSIVE mode,
    now the second connection will keep holding the AccessShare lock.

Now the process of starting to backfill starts

1. BEGIN ISOLATION LEVEL SERIALIZABLE (this is used to avoid race condition
   between the create_table statement (which pulls in all existing rows from
   the source table) and rows subsequently being added to the log table) -
   NOTE: this is from a comment in the source code.
2. `SET work_mem = maintanence_work_mem`
   `SELECT set_config('work_mem', current_setting('maintenance_work_mem'), true)", 0, NULL);`
3. Fetch all active transaction virtual ids (see SQL_XID_SNAPSHOT_90200 for query).
4. Delete any existing entries in the log table since CREATE TABLE ... AS
   SELECT hasn't run yet. `DELETE FROM repack.log_2093608`. This truncates the
   table.
5. Obtain access share lock on the target table for the create_table command to
   go through. It's possible another DDL is in the lock queue now after conn2,
   so kill that first if so!
6. Before copying data, it changes the column storage type if its storage type
   has been changed from the type `default`. (Not sure when this happens).
7. Table is created as `SELECT repack.create_table($1, $2)`
   ```
   LOG: (query) SELECT repack.create_table($1, $2)
   LOG:    (param:0) = 2093608
   LOG:    (param:1) = pg_default
   ```
8. And then data is copied:
   ```sql
   INSERT INTO repack.table_2093608 SELECT id,name,value,created_at
   FROM ONLY public.table_for_repack
   ```
9. Disables autovacuum on the table, not sure why yet!
   `SELECT repack.disable_autovacuum('repack.table_2093608')`
10. Grab oid of the existing table
    `SELECT 'repack.table_2093608'::regclass::oid`
11. Creates the indexes on the destination table
12. Keeps running `apply_log` on an ethernal loop which runs
    ```
    LOG: (query) SELECT repack.repack_apply($1, $2, $3, $4, $5, $6)
    LOG:    (param:0) = SELECT * FROM repack.log_2093608 ORDER BY id LIMIT $1
    LOG:    (param:1) = INSERT INTO repack.table_2093608 VALUES ($1.*)
    LOG:    (param:2) = DELETE FROM repack.table_2093608 WHERE (id) = ($1.id)
    LOG:    (param:3) = UPDATE repack.table_2093608 SET (id, name, value, created_at) = ($2.id, $2.name, $2.value, $2.created_at) WHERE (id) = ($1.id)
    LOG:    (param:4) = DELETE FROM repack.log_2093608 WHERE id IN (
    LOG:    (param:5) = 1000
    ```
    TODO: Learn about `apply_log`.
13. Swaps the tables using conn2 since it already has the AcessShare lock. It
    uses repack_swap.
14. Analyses the table `ANALYZE public.table_for_repack` (why?)
15. Calls `repack_drop`

## repack_apply

The function has 6 arguments and returns the number of performed operations.

```
* @param	sql_peek	SQL to pop tuple from log table.
* @param	sql_insert	SQL to insert into temp table.
* @param	sql_delete	SQL to delete from temp table.
* @param	sql_update	SQL to update temp table.
* @param	sql_pop	SQL to bulk-delete tuples from log table.
* @param	count		Max number of operations, or no count iff <=0.
* @retval				Number of performed operations.
```

In my example:

```
sql_peek: SELECT * FROM repack.log_2093608 ORDER BY id LIMIT $1
sql_insert: INSERT INTO repack.table_2093608 VALUES ($1.*)
sql_delete: DELETE FROM repack.table_2093608 WHERE (id) = ($1.id)
sql_update: UPDATE repack.table_2093608 SET (id, name, value, created_at) = (
                $2.id, $2.name, $2.value, $2.created_at
            ) WHERE (id) = ($1.id)
sql_pop: DELETE FROM repack.log_2093608 WHERE id IN (
count: 1000
```

The `repack_prepare` function parses and prepares the SQL to be executed, but
doesn't run it. It's the job of `execute_plan` to do so.


## Debugging

I've used this script to quickly recompile `pg_repack`:

```
run_lldb() {
    POSTGRES_DIR=$HOME/workspace/postgres15
    REPACK_VERSION=1.5.1

    cd $POSTGRES_DIR
    cd build/
    cd pg_repack

    PG_CONFIG=$POSTGRES_DIR/build/bin/pg_config make
    PG_CONFIG=$POSTGRES_DIR/build/bin/pg_config make install

    cp bin/pg_repack $POSTGRES_DIR/build/bin

    PG_REPACK_BIN=$POSTGRES_DIR/build/bin/pg_repack

    TABLE=table_for_repack
    DB_NAME=repack_test

    lldb -- $PG_REPACK_BIN
}
run_lldb

(lldb) b b
(lldb) run --table table_for_repack -d repack_test --echo --elevel=DEBUG
```

Additionally, some of the queries triggered from inside the extension don't
really show up on the logs. I had to manually hack the places where I wanted
to debug with `elog` calls such as:

```c
	elog(LOG, "[REPACK_TEST] SPI_execute: %s", sql);
```

For this to take effect, remember to recompile the C project and then:

```sql
DROP EXTENSION pg_repack CASCADE; CREATE EXTENSION pg_repack;
```

Also, to pause the program I dropped some `sleep()` calls, this was helpful
when I wanted to throw some more data in the table_to_repack while the repack
apply process was running.

```sql
INSERT INTO table_for_repack (name, value) VALUES ('my_name000', 42);
INSERT INTO table_for_repack (name, value) VALUES ('my_name001', 42);
INSERT INTO table_for_repack (name, value) VALUES ('my_name003', 42);
UPDATE table_for_repack SET value = 43 WHERE name = 'my_name003';
DELETE FROM table_for_repack WHERE name = 'my_name001';
DELETE FROM table_for_repack WHERE name = 'my_name002';
DELETE FROM table_for_repack WHERE name = 'my_name003';
-- This has to be run very fast after these update queries!
SELECT * FROM repack.log_2094620;
--
-- id |    pk    |                          row
------+----------+--------------------------------------------------------
--  1 |          | (100012,my_name001,42,"2025-02-04 18:14:53.780287+13")
--  2 |          | (100013,my_name003,42,"2025-02-04 18:14:53.785157+13")
--  3 | (100013) | (100013,my_name003,43,"2025-02-04 18:14:53.785157+13")
--  4 | (100012) |
--  5 | (100013) |
```
