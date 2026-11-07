# Swapping a Table With its Copy

```
Created at: 2025-02-14
```

NOTE: THIS IS A WORK IN PROGRESS. THE FOLLOWING SCRIPT DOES NOT FULLY WORK YET.

Current discussions are happening in the Postgres mailing list [here](https://www.postgresql.org/message-id/flat/CAM2F1VONo8M9gcybhmf8-CdmRUC2QrFGZkZLYF-%2BuLZuhRKaxQ%40mail.gmail.com#52fb0644ea84c647e3521bd04476e566)

## Why Would You Need To Swap a Table With its Copy?

Some Postgres schema changes can't be performed without acquiring an access
exclusive lock while the whole table is being scanned.

One example of such schema change is adding exclusion constraints. Different
from check constraints (that can be created as NOT VALID and validated later)
and unique constraints (that can be created from an index), exclusion
constraints will need to scan the whole table and add an underlying index to
service the constraint while holding an access exclusive lock.

This is cost prohibitive in large and frequently-used tables.

One alternative is to create a copy (clone) of the original table, add the
constraint on the copy, keep both tables in sync, and then swap them when you
are ready!

## Example

```sql
-- Create the original table that will be later swapped by its copy.
DROP TABLE IF EXISTS original CASCADE;
CREATE TABLE original (
    id SERIAL PRIMARY KEY,
    name VARCHAR(5000) NOT NULL, -- necessary for the TOAST table.
    value INTEGER NOT NULL,
    field_with_default INTEGER DEFAULT 42
);
-- Insert 10_000 rows into it.
INSERT INTO original (name, value)
SELECT
    'item_' || generate_series(1, 10000) AS name,
    (generate_series(1, 10000) % 10000) + 1 AS value;

-- Create the copy table, this table will be swapped for the original table
-- later. Do not copy the indexes and constraints here to make batch insertion
-- faster (in a real production scenario).
DROP TABLE IF EXISTS copy;
CREATE TABLE copy (LIKE original INCLUDING DEFAULTS);
-- Pull all the data from the original table into the copy table.
INSERT INTO copy SELECT id, name, value FROM ONLY original;

-- Create a table with a foreign key to the original table to verify if the
-- swap addresses the foreign key table.
DROP TABLE IF EXISTS table_with_fk;
CREATE TABLE table_with_fk (
    id SERIAL PRIMARY KEY,
    original_id INTEGER NOT NULL,
    CONSTRAINT fk_original FOREIGN KEY (original_id)
        REFERENCES original(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
-- Insert 10_000 rows into it.
INSERT INTO table_with_fk (original_id)
SELECT generate_series(1, 10000);

-- Analogously, create a table with a NOT VALID foreign key.
DROP TABLE IF EXISTS table_with_not_valid_fk;
CREATE TABLE table_with_not_valid_fk (
    id SERIAL PRIMARY KEY,
    original_id INTEGER NOT NULL,
    CONSTRAINT not_valid_fk_original FOREIGN KEY (original_id)
        REFERENCES original(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
        NOT VALID
);
-- Insert 10_000 rows
INSERT INTO table_with_not_valid_fk (original_id)
SELECT generate_series(1, 10000);

-- All tables must have 10_000 rows in them.
SELECT count(*) FROM original;
SELECT count(*) FROM copy;
SELECT count(*) FROM table_with_fk;
SELECT count(*) FROM table_with_not_valid_fk;

-- See relation info for the tables and their TOASTs.
SELECT
    X.relname,
    X.reltablespace,
    X.oid,
    X.reltoastrelid,
    X.relowner,
    X.relkind,
    X.relfrozenxid,
    X.relminmxid,
    X.relpages,
    X.reltuples,
    X.relallvisible,
    X.relfilenode,
    TOAST_X.indexrelid as toast_indexrelid
FROM pg_catalog.pg_class X
LEFT JOIN
  pg_catalog.pg_index TOAST_X ON X.reltoastrelid = TOAST_X.indrelid AND TOAST_X.indisvalid
WHERE X.oid IN (('original')::regclass, ('copy')::regclass)
ORDER BY X.relname;
-- -[ RECORD 1 ]----+---------
-- relname          | copy
-- reltablespace    | 0
-- oid              | 2134315
-- reltoastrelid    | 2134318
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 127003
-- relminmxid       | 1
-- relpages         | 0
-- reltuples        | -1
-- relallvisible    | 0
-- relfilenode      | 2134315
-- toast_indexrelid | 2134319
-- -[ RECORD 2 ]----+---------
-- relname          | original
-- reltablespace    | 0
-- oid              | 2134306
-- reltoastrelid    | 2134311
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 127000
-- relminmxid       | 1
-- relpages         | 0
-- reltuples        | -1
-- relallvisible    | 0
-- relfilenode      | 2134306
-- toast_indexrelid | 2134312

-- Take note of the dependencies to compare later.
-- These are the objs the original and copy table depend on.
SELECT
    d1.refobjid AS original_refobjid,
    d2.refobjid AS copy_refobjid
FROM pg_depend d1, pg_depend d2
WHERE d1.objid = ('original'::regclass) AND d2.objid = ('copy'::regclass);
-- -[ RECORD 1 ]-----+-----
-- original_refobjid | 2200
-- copy_refobjid     | 2200
-- Here '2200' is just the standard public schema:

-- The only dependency these tables have is the standard public schema.
SELECT *
FROM pg_description
WHERE objoid = 2200;
-- -[ RECORD 1 ]-----------------------
-- objoid      | 2200
-- classoid    | 2615
-- objsubid    | 0
-- description | standard public schema

-- Take note of the dependencies that depend on our two tables.
-- This should include toast tables and sequences.
SELECT
    dep.objid AS dependant_oid,
    c1.relname AS dependant_relname,
    dep.refobjid AS source_oid,
    c2.relname AS source_relname
FROM pg_depend dep
LEFT JOIN pg_class c1 ON (c1.oid = dep.objid)
LEFT JOIN pg_class c2 ON (c2.oid = dep.refobjid)
WHERE dep.refobjid in (('original'::regclass), ('copy'::regclass));
-- Long list of dependencies omitted.

-- Start table swap inside a transaction.
BEGIN;
LOCK TABLE original, copy IN ACCESS EXCLUSIVE MODE;

SELECT * FROM pg_class
WHERE relname in ('original', 'copy')
FOR UPDATE;

WITH swapped AS (
    SELECT
        c1.oid AS original_oid, c2.oid AS copy_oid,
        c1.relfilenode AS original_filenode, c2.relfilenode AS copy_filenode,
        c1.reltablespace AS original_tablespace, c2.reltablespace AS copy_tablespace,
        c1.reltoastrelid AS original_toast, c2.reltoastrelid AS copy_toast,
        c1.relfrozenxid AS original_frozenxid, c2.relfrozenxid AS copy_frozenxid,
        c1.relminmxid as original_relminmxid, c2.relminmxid AS copy_relminmxid,
        c1.relpages AS original_pages, c2.relpages AS copy_pages,
        c1.reltuples AS original_tuples, c2.reltuples AS copy_tuples,
        c1.relallvisible AS original_allvisible, c2.relallvisible AS copy_allvisible
    FROM pg_class c1, pg_class c2
    WHERE c1.relname = 'original'
      AND c2.relname = 'copy'
)

UPDATE pg_class
SET relfilenode = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_filenode FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_filenode FROM swapped)
END,
reltablespace = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_tablespace FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_tablespace FROM swapped)
END,
reltoastrelid = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_toast FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_toast FROM swapped)
END,
relfrozenxid = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_frozenxid FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_frozenxid FROM swapped)
END,
relminmxid = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_relminmxid FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_relminmxid FROM swapped)
END,
relpages = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_pages FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_pages FROM swapped)
END,
reltuples = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_tuples FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_tuples FROM swapped)
END,
relallvisible = CASE
    WHEN oid = (SELECT original_oid FROM swapped) THEN (SELECT copy_allvisible FROM swapped)
    WHEN oid = (SELECT copy_oid FROM swapped) THEN (SELECT original_allvisible FROM swapped)
END
WHERE oid IN (SELECT original_oid FROM swapped UNION SELECT copy_oid FROM swapped);

-- See that relevant fields have been swapped
SELECT
    X.relname,
    X.reltablespace,
    X.oid,
    X.reltoastrelid,
    X.relowner,
    X.relkind,
    X.relfrozenxid,
    X.relminmxid,
    X.relpages,
    X.reltuples,
    X.relallvisible,
    X.relfilenode,
    TOAST_X.indexrelid as toast_indexrelid
FROM pg_catalog.pg_class X
LEFT JOIN
  pg_catalog.pg_index TOAST_X ON X.reltoastrelid = TOAST_X.indrelid AND TOAST_X.indisvalid
WHERE X.oid IN (('original')::regclass, ('copy')::regclass)
ORDER BY X.relname;
-- -[ RECORD 1 ]----+---------
-- relname          | copy
-- reltablespace    | 0
-- oid              | 2134315
-- reltoastrelid    | 2134311
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 127001
-- relminmxid       | 1
-- relpages         | 64
-- reltuples        | 10000
-- relallvisible    | 64
-- relfilenode      | 2134306
-- toast_indexrelid | 2134312
-- -[ RECORD 2 ]----+---------
-- relname          | original
-- reltablespace    | 0
-- oid              | 2134306
-- reltoastrelid    | 2134318
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 127004
-- relminmxid       | 1
-- relpages         | 64
-- reltuples        | 10000
-- relallvisible    | 64
-- relfilenode      | 2134315
-- toast_indexrelid | 2134319

-- Lock the pg_depend rows where 'original' and 'copy' depend on something else
-- Only look for the "normal" and "internal" (toast) relationships.
SELECT 1 FROM pg_depend
WHERE objid IN (('original')::regclass, ('copy')::regclass)
FOR UPDATE;

UPDATE pg_depend
SET objid = ('original')::regclass
WHERE objid = ('copy')::regclass and deptype IN ('n', 'i');

UPDATE pg_depend
SET objid = ('copy')::regclass
WHERE objid = ('original')::regclass and deptype IN ('n', 'i');

-- Lock the pg_depend rows where 'original' and 'copy' are dependent upon by
-- something else
SELECT 1 FROM pg_depend
WHERE refobjid IN (('original')::regclass, ('copy')::regclass)
FOR UPDATE;

UPDATE pg_depend
SET refobjid = ('original')::regclass
WHERE refobjid = ('copy')::regclass and deptype IN ('n', 'i');

UPDATE pg_depend
SET refobjid = ('copy')::regclass
WHERE refobjid = ('original')::regclass and deptype IN ('n', 'i');

-- Renames!
ALTER TABLE original RENAME TO temp_original;
ALTER TABLE copy RENAME TO original;
ALTER TABLE temp_original RENAME TO copy;
-- DROP TABLE copy CASCADE;

-- Insert a couple of rows in the new "original" to verify it works
INSERT INTO original (id, name, value) values (10001, 'my_new_row', 10);
SELECT * from original order by id DESC;

-- TODO (minor): Index names for pks and its seq have not been renamed.

-- TODO (major): The FKs on the related tables weren't updated to use the new
-- table
-- \d table_with_fk
--                                Table "public.table_with_fk"
--    Column    |  Type   | Collation | Nullable |                  Default
-- -------------+---------+-----------+----------+-------------------------------------------
--  id          | integer |           | not null | nextval('table_with_fk_id_seq'::regclass)
--  original_id | integer |           | not null |
-- Indexes:
--     "table_with_fk_pkey" PRIMARY KEY, btree (id)
-- 
-- \d table_with_not_valid_fk
--                                Table "public.table_with_not_valid_fk"
--    Column    |  Type   | Collation | Nullable |                       Default
-- -------------+---------+-----------+----------+-----------------------------------------------------
--  id          | integer |           | not null | nextval('table_with_not_valid_fk_id_seq'::regclass)
--  original_id | integer |           | not null |
-- Indexes:
--     "table_with_not_valid_fk_pkey" PRIMARY KEY, btree (id)

-- Roll this back so that your postgres db doesn't get potentially messed up.
ROLLBACK;
```
