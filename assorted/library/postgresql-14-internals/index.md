January 5, 2024

## Introduction

### Catalog

Metadata for cluster objects such as tables, indexes, data types, or functions,
is stored in tables that live in the system catalog. These tables are regular
tables, they can be dropped, inserted in, and messed up in general ways.

The command `CREATE DATABASE` inserts a row into the `pg_database` catalog,
and actually creates the database on disk.

- https://www.postgresql.org/docs/current/catalogs.html
- https://www.postgresql.org/docs/current/catalog-pg-database.html

All system catalog tables begin with the `pg_` prefix, like we saw above.

Trivia: In all system catalog tables, PK column is called oid (object
identifier).

### Schemas

Schemas are namespaces for storing all objects of a db.

- **public**: default schema for user objects (unless overwritten)
- **pg_catalog**: system catalog tables
- **information_schema**: alternative view of the system catalog (SQL standard)

- https://www.postgresql.org/docs/current/ddl-schemas.html

### Tablespaces

Tablespaces define physical data layout. It is a directory in a file system.
Data can be distributed in such a way so that archive data is stored on slow
disks whilst data actively updated goes to fast disks.

### Relations

Tables and indexes both consist of rows. This is true for B-tree nodes as well.
Sequences and materialised views also follow this structure.

In PostgreSQL all those objects are referred by the generic term _relation_,
which can be a bit confusing due to relational theory terminology.

### Files and Forks

All information relating to a table is stored in several different forks:

- https://www.postgresql.org/docs/current/storage-file-layout.html

Once a file (fork) grows over 1GB, another file of this fork is created (
sometimes these are called segments). The sequence number of the segment is
added to the end of its filename.

The limit of 1GB is historically established to support file systems that
couldn't handle large files. This can be changed when building Postgres via
`./configure --with-segsize`

Checking the file path where a table is stored:

```sql
SELECT pg_relation_filepath('accounts_account');
```
```
 pg_relation_filepath
----------------------
 base/16384/19623
```

And check the size of the file
```sql
SELECT size FROM pg_stat_file('base/16384/19623');
```
```
 size
------
 8192
```

There are 3 categories of forks:
- Main fork: Where the data for the table and indexes live
- Free Space Map: Keeps track of free space within pages. Used to quickly find
  a page that can accommodate new inserted data.
- Visibility map: For showing whether the page needs to be vacuumed or frozen.

### Pages

Files are split into pages (also known as blocks). These are the minimum
amount of data that can be read or written. The size of a page is usually 8kb.
This can be changed during build time, but no many people do this.

### TOAST (The Oversized Attributes Storage Technique)

Each row of a table must fit a single page. No row can continue in the next
page. To store long rows, TOAST is used.

There're many techniques involved in this. You can slice long attribute values
into a separate service table, or compress a long value so that it fits the
page, or you can do both.

For index, TOAST only uses compression. This limits the size of the key that
can be indexed.

To check the TOAST strategy for a table, you can perform this query:

```sql
SELECT
    attname,
    atttypid::regtype,
    CASE attstorage
        WHEN 'p' THEN 'plain'
        WHEN 'e' THEN 'external'
        WHEN 'm' THEN 'main'
        WHEN 'x' THEN 'extended'
    END AS storage
FROM pg_attribute
WHERE attrelid = 'accounts_account'::regclass AND attnum > 0;
```

- plain: TOAST is not used.
- main: Attributes are compressed first, and moved to the TOAST table if
  compression didn't help.
- external: Stored in the TOAST table without compression.
- extended: Compressed and stored in the TOAST table.

Sometimes it's useful to change the default strategy for some columns. If the
column stores a JPEG image, for example, you can set the external strategy
for this column to avoid unnecessarily compression to the data. You can change
it like this:

```sql
ALTER TABLE t ALTER COLUMN d SET STORAGE external;
```

To find the TOAST table you can perform:

```sql
SELECT relnamespace::regnamespace, relname
FROM pg_class
WHERE oid = (
    SELECT reltoastrelid
    FROM pg_class WHERE relname = 'accounts_account'
);
```

```
 relnamespace |    relname
--------------+----------------
 pg_toast     | pg_toast_16453
 ```

```sh
\d+ pg_toast.pg_toast_16453
```

```
   Column   |  Type   | Storage
------------+---------+---------
 chunk_id   | oid     | plain
 chunk_seq  | integer | plain
 chunk_data | bytea   | plain
```

You can also check the index associated with the TOAST table

```sql
SELECT indexrelid::regclass FROM pg_index
WHERE indrelid = (
    SELECT oid
    FROM pg_class WHERE relname = 'pg_toast_16453'
);
```

A TOAST table increases the min number of fork files used by the table up to
eight: three for the main table, three for the TOAST table, and two for the
TOAST index.

**TIP**: If long attributes do not participate in the query, the TOAST table
will not be read at all. It is one of the reasons why you should avoid using
the asterisk `(SELECT *)` in production solutions.

**TIP**: It's not a good idea to keep bulky data in Postgres, specially if
the data is being actively used and does not require transactional logic
(like pdfs). This is because compression and slicing require a lot of
resources.

### Processes and Memory

Upon initialisation, postgres launches the postgres process, also known as
postmaster. It creates all the other processes via `fork`, and monitors them,
restarting these children processes if they fail.

The postmaster allocates shared memory that is available to all processes.
Buffer cache takes the greater part of the shared memory, which is often stored
in RAM for speed.

In the event of a power outage or OS crash, postgres keeps a write-ahead log
(WAL), which makes it possible to repeat lost operations when necessary.

The postmaster also listen for incoming connections, creating a separate
backend process. This poses a few problems:

- Each process needs RAM for caching.
- If connections are frequent (and short), their cost is unreasonably high.
- Performance declines as the number of clients grows.

## Isolation

### Isolation Levels and Anomalies

The SQL standard has four isolation levels. These are defined by the anomalies
that may or may not occur in concurrent transaction execution.

#### Lost Update

Occurs when two transactions read the same table row, then one of the
transactions updates the row, and then, the second transaction also updates
the same row without considering any changes made by the first transaction.
Thus, the first transaction update is lost. This anomaly is forbidden from the
standard.

Example: Transaction one wants to add $100 to the account balance of $1000,
and transaction B wants to add $200. The total after the transactions kick in
should be $1300, but somehow the first transaction update is ignored and the
balance ends up as $1200.

#### Dirty Read and Read Uncommitted

Dirty read happens when one transaction reads the uncommitted reads from
another transaction. The standard allows dirty reads at the Read Uncommitted
level. These are forbidden in Postgres by design.

#### Non-Repeatable Reads and Read Committed

Non-repeatable read anomaly happens when a transaction needs to read from the
same row twice, and another transaction has updated or deleted the data in the
meanwhile. The standard allows this anomaly at the Read Uncommitted and Read
Committed levels. Note that the Read Commited isolation level is the default.

#### Phantom Reads and Repeatable Read

Occurs when the same transaction executes two identical queries, while another
transaction adds more rows (or removes) from that would satisfy the query.

The standard allows phantom reads at the Read Uncommitted, Read Committed, and
Repeatable Read isolation levels.

## Pages and Tuples

### Page structure

#### Page Header

Located at the lowest addresses of a page, and has a fixed size.

```sql
CREATE EXTENSION pageinspect;

select lower, upper, special, pagesize
from page_header(get_raw_page('accounts_account', 0));
```

```txt
| lower | upper | special | pagesize |
|-------|-------|---------|----------|
| 152   | 6904  | 8192    | 8192     |
```

#### Special Space

Located at the highest addresses of a page. It is used by some indexes to store
auxiliary info.

#### Tuples

Rows that contain the actual data stored in the db and some metadata. Located
just before the special space.

#### Item Pointers

An array of pointers to tuples. Located after the header.

### Savepoints

SQL supports canceling operations within a transaction without aborting
the transaction as a whole.

```sql
SAVEPOINT my_save_point;
// Do stuff that will be rolled back.
ROLLBACK TO my_save_point;
```

## Snapshots

### Definition

A data page can contain several versions of the same row. Each transaction must
see at most 1 of such versions. Visible versions of all different rows
constitute a Snapshot.

## Locks

### Relation-level locks

What types of locks can work together:

```
| LOCK                   | AS  | RS  | RE  | SUE | S   | SRE | E   | AE | QUERY                                                  |
|------------------------|-----|-----|-----|-----|-----|-----|-----|-----|-------------------------------------------------------|
| Access Share           |     |     |     |     |     |     |     |  X  | SELECT                                                |
| Row Share              |     |     |     |     |     |     |  X  |  X  | SELECT FOR UPDATE/SHARE                               |
| Row Exclusive          |     |     |     |     |  X  |  X  |  X  |  X  | INSERT/UPDATE/DELETE                                  |
| Share Update Exclusive |     |     |     |  X  |  X  |  X  |  X  |  X  | VACUUM/CREATE INDEX CONCURRENTLY                      |
| Share                  |     |     |  X  |  X  |     |  X  |  X  |  X  | CREATE INDEX                                          |
| Exclusive              |     |  X  |  X  |  X  |  X  |  X  |  X  |  X  | REFRESH MAT.VIEW CONCURRENTLY                         |
| Access Exclusive       |  X  |  X  |  X  |  X  |  X  |  X  |  X  |  X  | DROP/TRUNCATE/VACUUM FULL/LOCK TABLE/REFRESH MAT.VIEW |
```

The first 4 modes allow concurrent modifications, the other four do not.
