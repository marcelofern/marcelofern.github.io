# WAL Basics

```
Created at: 2025-04-16
```

## What is the WAL and why is it needed?

The database may fail due to:

- A power outage
- An Operating System crash
- A database server crash

In such cases, all the RAM content will be lost.

To prevent data inconsistencies when the server is brought up again, Postgres
uses a logging utility. Postgres will **log** each change that happens in RAM.
These log entries will contain all the essencial information required to repeat
the RAM operations if the need arises.

Such log entries must be written to disk **ahead** of the modified underlying
page. That's why the logging utility is called Write-**Ahead** Log. This will
guarantee that should the server fail, Postgres can read the entries from the
WAL and replay them.

## WAL is written to disk, isn't that slow?

Writting to disk is slow, and that's why Postgres uses RAM to cache data. So
why does Postgres rely on the WAL, that is written to disk, if writting to disk
is slow?

The catch is that writting to the WAL is faster than writing to *random* disk
pages. Additionally, WAL entries are often smaller than the page size, and are
also a continuous stream of data, which can be handled even by HDDs (as opposed
to SSDs).

## What is recorded in the WAL?

- Page modifications performed in the buffer cache. The buffer cache is the
  area where data pages are stored temporarily (RAM) to improve db performance.
  Those are deferred writes (writes that are performed in RAM, not in Disk).

- Transaction commits (and rollbacks). Status change happens in CLOG (Commit
  Log) buffers and does not make it to disk right away. The CLOG is a structure
  for tracking the commit status of transactions in Postgres, and its entries
  maintain a record indicating whether each transaction is still in progress,
  has commited, or has been rolled back. These entries are stored in memory,
  and therefore need to be tracked on the WAL. In the cases of rollbacks, they
  also need to be tracked in the WAL because any modifications made by that
  transaction that made to the buffer cache should not be considered permanent.

- File operations that happen when files and directores are created/deleted
  during table addition/deletion.

## What is NOT recorded in the WAL?

- Operations on UNLOGGED tables. See `CREATE UNLOGGED TABLE ...`. Note that
  these tables perform faster (because they don't need to replicate entries to
  the WAL), but they are not immune to server crashes. They will be TRUNCATED
  when a crash happens.

- Operations on temporary tables as their lifetime is limited by the session
  that creates them. See `CREATE TEMPORARY TABLE ...`

## Logical Structure

The WAL is a stream of log entries of *variable* length.
Each entry contains a header followed by some data. The header is standard, and
has some information about the entry, including:

- The entry's transaction id.
- The resource manager (PG_RMGR) used to interpret the entry. See this file:
  src/include/access/rmgrlist.h
  This resource manager is reponsible for knowing how to replay the entry.
- A checksum to detect data corruption.
- The length of the entry
- A reference to the previous WAL entry.

## Where are WAL files?

WAL files take up special buffers in the server's shared memory. The size of
the cache is defined by `wal_buffers` parameter. It's, by default, 1/32 the
total buffer cache size. If WAL cache is too small, more disk synchronisations
will happen, thus slowing things down.

This means that if the server crashes, entries in the WAL that haven't been
flushed to disk yet are lost.

## How are WAL files flushed to disk?

The WAL cache has a head and a tail. The head is where new WAL entries are
logged, and the tail is where the part where entries are going to be sent to be
stored to disk.

Under low load, the insert position (the head) is almost always the same as the
position of entries that have already been saved to disk (in the tail).

```sql
SELECT pg_current_wal_lsn(), pg_current_wal_insert_lsn();

-- They are the same on my local db, because I'm not using it for anything!

--  pg_current_wal_lsn | pg_current_wal_insert_lsn
-- --------------------+---------------------------
--  12/791E05E0        | 12/791E05E0
```

What does `lsn` mean? LSN is the Log Sequence Number. That is how Postgres
refers to a particular entry in the WAL.

The LSN represents a 64bit offset in bytes from the start of the WAL to an
entry. The 64bit number is represented as two 32bit numbers separated by a
slash. For the example above:

```python
int('12791E05E0', base=16)
# 79,341,422,048
```

## Understanding the WAL throught SQL queries

```sql
CREATE EXTENSION IF NOT EXISTS pageinspect;
DROP TABLE IF EXISTS foo CASCADE;
CREATE TABLE foo (id INTEGER);
INSERT INTO foo (id) VALUES (1);

-- Start a transaction and note the LSN of the foo insert position:

BEGIN;
SELECT pg_current_wal_insert_lsn();
--  pg_current_foo_insert_lsn
-- --------------------------
--  12/79295EB0

-- Now run an arbitrary command that will update a row. This change will be
-- stored in the buffer cache (RAM). The change will also be logged to the WAL.
UPDATE foo SET id = 42;

-- Check the new insert LSN
SELECT pg_current_wal_insert_lsn();
--  pg_current_wal_insert_lsn
-- ---------------------------
--  12/79295EF8

-- In python
-- >>> int("79295EF8", base=16) - int("79295EB0", base=16)
-- 72

-- To ensure the modified data page is flushed to disk only after the
-- corresponding WAL entry, the page header stores the LSN of the latest WAL
-- entry related to this page:
SELECT lsn FROM page_header(get_raw_page('foo', 0));
--      lsn
-- -------------
--  12/79295EF8

-- The commit operation is also logged, and the insert LSN changes.
COMMIT;
SELECT pg_current_wal_insert_lsn();
--  pg_current_wal_insert_lsn
-- ---------------------------
--  12/79296090

-- You can calculate the size of WAL entries for two LSN positions.
-- This information is useful if you want to know the volume of WAL entries
-- generated by a particular workload per unit of time.
SELECT '12/79296090'::pg_lsn - '12/79295EF8'::pg_lsn;
----------
--    408 (bytes)
```

## Physical Structure

You can see the wal entries in disk under the `PGDATA/pg_wal` directory.
Based on the way I install Postgres locally, I have this:

```sh
pwd
# ~/workspace/postgres15/build/data/pg_wal`

tree
# .
# ├── 000000010000001200000079
# ├── 00000001000000120000007A
# ├── 00000001000000120000007B
# ├── 00000001000000120000007C
# ├── 00000001000000120000007D
# └── archive_status
```

You can try and `cat` the files above, but it looks very weird.

You can also see some information about these files directly from SQL:

```sql
SELECT
  *
FROM
  pg_ls_waldir();

--            name           |   size   |      modification
-- --------------------------+----------+------------------------
--  000000010000001200000079 | 16777216 | 2025-04-16 12:08:50+12
--  00000001000000120000007A | 16777216 | 2025-04-15 11:40:49+12
--  00000001000000120000007D | 16777216 | 2025-04-15 13:15:34+12
--  00000001000000120000007C | 16777216 | 2025-04-15 13:15:33+12
--  00000001000000120000007B | 16777216 | 2025-04-15 13:14:51+12
```

The name of each file consists of two parts. The highest eight hexadecimal
digits define the "timeline" used for recovery from a backup. The rest
represents the highest LSN bits.

It is possible to learn which file a particular entry is located, and at what
offset from the start of the file.

```sql
SELECT
  file_name,
  upper(to_hex(file_offset)) file_offset
FROM
  pg_walfile_name_offset('12/79296090');
--        file_name         | file_offset
----------------------------+-------------
-- 000000010000001200000079 | 296090
```

You can use the tool `pg_waldump`, which is included in the Postgres
installation, to verify wal entries. It takes either a LSN range, or a
transaction ID.

`build/bin/pg_waldump -p build/data/pg_wal -s 12/79295EB0`

```
rmgr: Heap        len (rec/tot):     69/    69, tx:    1176066, lsn: 12/79295EB0, prev 12/79295E78, desc: HOT_UPDATE off 1 xmax 1176066 flags 0x40 ; new off 2 xmax 0, blkref #0: rel 1663/2519535/2979572 blk 0
rmgr: Standby     len (rec/tot):     54/    54, tx:          0, lsn: 12/79295EF8, prev 12/79295EB0, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176065 oldestRunningXid 1176066; 1 xacts: 1176066
rmgr: Transaction len (rec/tot):     34/    34, tx:    1176066, lsn: 12/79295F30, prev 12/79295EF8, desc: COMMIT 2025-04-16 11:22:01.565301 NZST
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79295F58, prev 12/79295F30, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79295F90, prev 12/79295F58, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: XLOG        len (rec/tot):    114/   114, tx:          0, lsn: 12/79295FC8, prev 12/79295F90, desc: CHECKPOINT_ONLINE redo 12/79295F90; tli 1; prev tli 1; fpw true; xid 0:1176067; oid 2987119; multi 2642; offset 5283; oldest xid 716 in DB 5; oldest multi 1 in DB 16384; oldest/newest commit timestamp xid: 0/0; oldest running xid 1176067; online
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79296058, prev 12/79295FC8, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: Heap2       len (rec/tot):     59/  7803, tx:          0, lsn: 12/79296090, prev 12/79296058, desc: PRUNE latestRemovedXid 0 nredirected 0 ndead 1, blkref #0: rel 1663/2519535/1255 blk 61 FPW
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79297F10, prev 12/79296090, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79297F48, prev 12/79297F10, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: XLOG        len (rec/tot):    114/   114, tx:          0, lsn: 12/79297F80, prev 12/79297F48, desc: CHECKPOINT_ONLINE redo 12/79297F48; tli 1; prev tli 1; fpw true; xid 0:1176067; oid 2987119; multi 2642; offset 5283; oldest xid 716 in DB 5; oldest multi 1 in DB 16384; oldest/newest commit timestamp xid: 0/0; oldest running xid 1176067; online
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79297FF8, prev 12/79297F80, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: Heap2       len (rec/tot):     59/  7731, tx:          0, lsn: 12/79298048, prev 12/79297FF8, desc: PRUNE latestRemovedXid 0 nredirected 0 ndead 1, blkref #0: rel 1663/2519535/1255 blk 25 FPW
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79299E80, prev 12/79298048, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79299EB8, prev 12/79299E80, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
rmgr: XLOG        len (rec/tot):    114/   114, tx:          0, lsn: 12/79299EF0, prev 12/79299EB8, desc: CHECKPOINT_ONLINE redo 12/79299EB8; tli 1; prev tli 1; fpw true; xid 0:1176067; oid 2987119; multi 2642; offset 5283; oldest xid 716 in DB 5; oldest multi 1 in DB 16384; oldest/newest commit timestamp xid: 0/0; oldest running xid 1176067; online
rmgr: Standby     len (rec/tot):     50/    50, tx:          0, lsn: 12/79299F68, prev 12/79299EF0, desc: RUNNING_XACTS nextXid 1176067 latestCompletedXid 1176066 oldestRunningXid 1176067
```

The first line contains the `HOT_UPDATE` handled by the "Heap" resource
manager:

```
rmgr: Heap        len (rec/tot):     69/    69, tx:    1176066, lsn: 12/79295EB0, prev 12/79295E78, desc: HOT_UPDATE off 1 xmax 1176066 flags 0x40 ; new off 2 xmax 0, blkref #0: rel 1663/2519535/2979572 blk 0
```
The `blkref #0` has the filename and page id of the updated heap page, in this
case `1663/2519535/2979572`. You can try and see this file, which is just a
bunch of binary data:

`cat build/data/base/2519535/2979572`

You can confirm that this is indeed the `foo` table by:

```sql
SELECT pg_relation_filepath('foo');
-- base/2519535/2979572
```

## Checkpoint

When a crash happens, Postgres needs to use the WAL record to recover from it.
It does so by comparing the LSN stored on disk to the LSN of the WAL entry and
playing it back from that point.

To know where the process of replaying needs to resume, Postgres has a special
background process called `checkpointer`.

- **Start**: The checkpointer process flushes to disk all the data that can be
  written instantaneously. This includes CLOG transaction status,
  subtransactions' metadata, and some other structures.

- **Execution**: Most of the execution time for the checkpoint is spent on
  flushing dirty pages to disk.

  A special tag is set in the headers of all buffers that were dirty at the
  checkpoint start. No I/O operations are involved, so this is fairly fast.
  The checkpoint will then traverse all the buffers and will write the tagged
  ones to disk. Their pages are not yet evicted from the cache, they are simply
  written down, so usage and pin counts are ignored.

  Pages are processed in their ID order to avoid random writing.

  Backends can also write tagged buffers to disk (if they get to them first).

- **Completion**: When all the dirty buffers *at the start* of the checkpoint
  are written, the checkpoint is complete. From now on, this checkpoint can be
  used as a starting point for recovery, and all the WAL entries from before
  this point aren't required any more.
