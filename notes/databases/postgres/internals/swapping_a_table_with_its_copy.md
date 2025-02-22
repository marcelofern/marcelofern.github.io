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
    value INTEGER NOT NULL
);
-- Insert 10_000 rows into it.
INSERT INTO original (name, value)
SELECT
    'item_' || generate_series(1, 10000) AS name,
    (generate_series(1, 10000) % 10000) + 1 AS value;

-- Create the copy table, this table will be swapped for the original table
-- later
DROP TABLE IF EXISTS copy;
CREATE TABLE copy (
    id SERIAL PRIMARY KEY,
    name VARCHAR(5000) NOT NULL,
    value INTEGER NOT NULL
);
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
-- oid              | 22522
-- reltoastrelid    | 22526
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 2068
-- relminmxid       | 1
-- relpages         | 64
-- reltuples        | 10000
-- relallvisible    | 64
-- relfilenode      | 22522
-- toast_indexrelid | 22527
-- -[ RECORD 2 ]----+---------
-- relname          | original
-- reltablespace    | 0
-- oid              | 22513
-- reltoastrelid    | 22517
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 2065
-- relminmxid       | 1
-- relpages         | 64
-- reltuples        | 10000
-- relallvisible    | 64
-- relfilenode      | 22513
-- toast_indexrelid | 22518

-- Take note of the dependencies for the toast table to compare later.
SELECT
    d1.objid AS original_objid,
    d2.objid AS copy_objid
FROM pg_depend d1, pg_depend d2
WHERE d1.objid = ('original'::regclass) AND d2.objid = ('copy'::regclass);
-- -[ RECORD 1 ]--+------
-- original_objid | 22513
-- copy_objid     | 22522

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
-- oid              | 22522
-- reltoastrelid    | 22517
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 2065
-- relminmxid       | 1
-- relpages         | 64
-- reltuples        | 10000
-- relallvisible    | 64
-- relfilenode      | 22513
-- toast_indexrelid | 22518
-- -[ RECORD 2 ]----+---------
-- relname          | original
-- reltablespace    | 0
-- oid              | 22513
-- reltoastrelid    | 22526
-- relowner         | 10
-- relkind          | r
-- relfrozenxid     | 2068
-- relminmxid       | 1
-- relpages         | 64
-- reltuples        | 10000
-- relallvisible    | 64
-- relfilenode      | 22522
-- toast_indexrelid | 22527

-- Lock the pg_depend rows that correspond to 'original' and 'copy'
SELECT * FROM pg_depend
WHERE objid IN (('original')::regclass, ('copy')::regclass)
FOR UPDATE;

-- Swap the objid values for the two dependencies
WITH swapped_dep AS (
    SELECT
        d1.objid AS original_objid, d2.objid AS copy_objid
    FROM pg_depend d1, pg_depend d2
    WHERE d1.objid = ('original'::regclass)
      AND d2.objid = ('copy'::regclass)
)
-- TODO: this update is not working, maybe it needs to be deleted and then
-- inserted again? A delete-followed-by create is what pg_repack seems to do.
UPDATE pg_depend
SET objid = CASE
    WHEN objid = (SELECT original_objid FROM swapped_dep) THEN (SELECT copy_objid FROM swapped_dep)
    WHEN objid = (SELECT copy_objid FROM swapped_dep) THEN (SELECT original_objid FROM swapped_dep)
END
WHERE objid IN (SELECT original_objid FROM swapped_dep UNION SELECT copy_objid FROM swapped_dep);

-- Verify the dependencies have been swapped.
SELECT
    d1.objid AS original_objid,
    d2.objid AS copy_objid
FROM pg_depend d1, pg_depend d2
WHERE d1.objid = ('original'::regclass) AND d2.objid = ('copy'::regclass);
---[ RECORD 1 ]--+------
--original_objid | 22513
--copy_objid     | 22522

-- Renames!
ALTER TABLE original RENAME TO temp_original;
ALTER TABLE copy RENAME TO original;
ALTER TABLE temp_original RENAME TO copy;
DROP TABLE copy CASCADE;

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
