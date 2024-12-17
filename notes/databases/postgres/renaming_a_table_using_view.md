# Renaming A Table Using View

```
Created at: 2024-12-11
```

Modern applications usually run schema changes *before* they deploy the code
that uses the new schema changes.

In a situation where blue/green deployment is happening, you might need to
keep both names for a time-window while the schema changes and deploys are
happening.

You can use an updatable VIEW for this. So for example:

```sql
BEGIN;

ALTER TABLE foo RENAME TO new_foo;

CREATE VIEW foo AS SELECT * FROM new_foo;

COMMIT;
```

## Note 1: This works for both reads and writes

> Simple views are automatically updatable: the system will allow INSERT,
> UPDATE and DELETE statements to be used on the view in the same way as on a
> regular table. A view is automatically updatable if it satisfies all of the
> following conditions:
> (...)
> - All columns in the view's select list must be simple references to columns
>   of the underlying relation. They cannot be expressions, literals or
>   functions. System columns cannot be referenced, either.

It doesn't matter if the table:

- has a trigger
- has a constraint

It will all work properly. For example:

```sql
DROP VIEW IF EXISTS foo_view;
DROP TABLE IF EXISTS foo;
DROP TABLE IF EXISTS foo_log;

CREATE TABLE foo (id SERIAL, bar INT);
CREATE VIEW foo_view AS SELECT * FROM foo;
CREATE TABLE foo_log (
    id SERIAL,
    foo_id INT,
    action TEXT,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add a trigger function.
CREATE OR REPLACE FUNCTION log_foo_insert() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO foo_log(foo_id, action) 
    VALUES (NEW.id, 'INSERT');
    RETURN NEW;
END;
$$
 LANGUAGE plpgsql;

-- And a trigger itself.
CREATE TRIGGER after_insert_foo
AFTER INSERT ON foo
FOR EACH ROW
EXECUTE FUNCTION log_foo_insert();

-- Create a constraint
ALTER TABLE foo ADD CONSTRAINT bar_is_positive CHECK (bar >= 0);

-- Insert data into foo
INSERT INTO foo (bar) SELECT generate_series(1, 10000);

-- Test an insert that goes through normally.
-- Also verify that both the table and the view return the same row.
-- Also verify that the log table 
INSERT INTO foo (bar) VALUES (42);
INSERT INTO foo_view (bar) VALUES (43);
SELECT * FROM foo ORDER BY id DESC limit 2;
SELECT * FROM foo_view ORDER BY id DESC limit 2;
SELECT * FROM foo_log ORDER BY id DESC limit 2;
-- Test an insert that fails due to a constraint check.
INSERT INTO foo (bar) VALUES (-1);
INSERT INTO foo_view (bar) VALUES (-1);
--> ERROR:  new row for relation "foo" violates check constraint "bar_is_positive"
--> DETAIL:  Failing row contains (10003, -1).

-- Test an update that goes through normally.
UPDATE foo SET bar = 777 WHERE bar = 42;
UPDATE foo_view SET bar = 7777777 WHERE bar = 43;
SELECT * FROM foo ORDER BY id DESC limit 2;
SELECT * FROM foo_view ORDER BY id DESC limit 2;
SELECT * FROM foo_log ORDER BY id DESC limit 2;
-- Test an update that fails due to a constraint check.
UPDATE foo SET bar = -1 WHERE bar = 777;
UPDATE foo SET bar = -1 WHERE bar = 7777777;
ERROR:  new row for relation "foo" violates check constraint "bar_is_positive"
DETAIL:  Failing row contains (43, -1).

-- Test a delete that goes through.
DELETE FROM foo WHERE bar = 777;
DELETE FROM foo_view WHERE bar = 7777777;
SELECT * FROM foo ORDER BY id DESC limit 2;
SELECT * FROM foo_view ORDER BY id DESC limit 2;
SELECT * FROM foo_log ORDER BY id DESC limit 2;

-- Create an index to verify that both plans for the view and table
-- are updated to use it.
CREATE INDEX bar_idx ON foo (bar);
EXPLAIN (analyze, timing off, costs off) SELECT bar FROM foo WHERE bar = 10000;
--                           QUERY PLAN
-- --------------------------------------------------------------
--  Index Only Scan using bar_idx on foo (actual rows=1 loops=1)
--    Index Cond: (bar = 10000)
--    Heap Fetches: 1
--  Planning Time: 0.278 ms
--  Execution Time: 0.528 ms
-- (5 rows)
EXPLAIN (analyze, timing off, costs off) SELECT bar FROM foo_view WHERE bar = 10000;
--                           QUERY PLAN
-- --------------------------------------------------------------
--  Index Only Scan using bar_idx on foo (actual rows=1 loops=1)
--    Index Cond: (bar = 10000)
--    Heap Fetches: 1
--  Planning Time: 0.266 ms
--  Execution Time: 0.068 ms
-- (5 rows)

-- Adding a column messes up with the assumptions.
-- The view can't see this new column.
ALTER TABLE foo ADD COLUMN baz INT DEFAULT 42;
SELECT * FROM foo ORDER BY id DESC limit 2;
-- The baz column can't be seen from this view.
SELECT * FROM foo_view ORDER BY id DESC limit 2;
-- Inserting won't work
INSERT INTO foo_view (bar, baz) VALUES (42, 24);
-- ERROR:  column "baz" of relation "foo_view" does not exist
-- LINE 1: INSERT INTO foo_view (bar, baz) VALUES (42, 24);
--
-- However, inserting just bar is fine, as the underlying table
-- has a default value
INSERT INTO foo_view (bar) VALUES (42);

-- If the table had a new field without default, you'd be stuck:
ALTER TABLE foo ALTER COLUMN baz DROP DEFAULT;
ALTER TABLE foo ALTER COLUMN baz SET NOT NULL;
INSERT INTO foo_view (bar) VALUES (42);
-- ERROR:  null value in column "baz" of relation "foo" violates not-null constraint
-- DETAIL:  Failing row contains (10006, 42, null).
```




## Note 2: The transaction does not scan the table while holding an AccessExclusive lock

The `CREATE VIEW foo AS SELECT * FROM new_foo;` command is super fast no matter
the size of the table.

For example, inject some data in that table:

```sql
SET client_min_messages=debug1;

DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL, val int);

INSERT INTO foo (val) SELECT generate_series(1, 100000);
```

Now open a transaction to perform the alterations

```sql
BEGIN;

-- Takes an AccessExclusiveLock
ALTER TABLE foo RENAME TO new_foo;

-- Takes an AccessShareLock
CREATE VIEW foo AS SELECT * FROM new_foo;

-- Query to check the locks held from a separated psql shell
SELECT
    l.locktype,
    l.mode,
    l.granted,
    l.relation,
    c.relname,
    a.query,
    now() - a.backend_start AS lock_duration
FROM
    pg_locks l
JOIN
    pg_stat_activity a ON l.pid = a.pid
JOIN
    pg_class c ON c.oid = l.relation
WHERE
    a.pid != pg_backend_pid();

ROLLBACK;
```

You'll see both the AccessExclusiveLock and AccessShareLock being acquired.

Finally, this script below performs a basic benchmark to see how well this
performs as the size of tables increase:

```python
import time
import psycopg2

# Change these before running locally.
DB_NAME = "rename_view"
USER = "marcelo.fernandes"
PASSWORD = ""
HOST = "localhost"
PORT = 5415
NUM_OF_ROWS = [
    1_000,
    100_000,
    1_000_000,
    10_000_000,
]


def get_cursor_and_connection():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
    )
    conn.autocommit = True
    return conn.cursor(), conn


def create_table(cursor):
    print("- Creating table...")
    cursor.execute("""
        DROP VIEW IF EXISTS foo_view;
        DROP TABLE IF EXISTS foo;
        DROP TABLE IF EXISTS new_foo;
        CREATE TABLE foo (
            id SERIAL PRIMARY KEY,
            bar int
        );
        -- Disable autovacuum to not interfere with results.
        ALTER TABLE foo SET (autovacuum_enabled = false);

        CREATE INDEX foo_bar_idx ON foo (bar);
    """)


def vacuum_tables(cursor):
    print("- Vacuuming foo table...")
    start_time = time.time()
    cursor.execute("VACUUM ANALYZE foo;")
    duration = time.time() - start_time
    print(f"- Vacuum (foo) took: {duration:.2f} seconds.")


def populate_table(cursor, num_of_rows):
    print("- Populating (foo) table...")
    start_time = time.time()
    cursor.execute(f"INSERT INTO foo (bar) SELECT generate_series(1, {num_of_rows});")
    duration = time.time() - start_time
    print(f"- Populating (foo) took: {duration:.2f} seconds.")


def benchmark_rename(cursor):
    print("- Benchmarking rename...")
    start_time = time.time()
    cursor.execute("begin;")
    cursor.execute("alter table foo rename to new_foo;")
    cursor.execute("create view foo_view as select * from new_foo;")
    cursor.execute("commit;")
    duration = time.time() - start_time
    print(f"- benchmarking took: {duration:.2f} seconds.")


def run_tests():
    print("\nReport details:\n")
    cursor, conn = get_cursor_and_connection()

    for num_of_rows in NUM_OF_ROWS:
        print(f"\n- **Bench mark for {num_of_rows} rows**")
        print("---------------------------------------")
        create_table(cursor)
        populate_table(cursor, num_of_rows)
        vacuum_tables(cursor)
        benchmark_rename(cursor)

    cursor.close()
    conn.close()


if __name__ == "__main__":
    run_tests()
```

The results are:

```
Report details:


- **Bench mark for 1000 rows**
---------------------------------------
- Creating table...
- Populating (foo) table...
- Populating (foo) took: 0.01 seconds.
- Vacuuming foo table...
- Vacuum (foo) took: 0.00 seconds.
- Benchmarking rename...
- benchmarking took: 0.00 seconds.

- **Bench mark for 100000 rows**
---------------------------------------
- Creating table...
- Populating (foo) table...
- Populating (foo) took: 0.57 seconds.
- Vacuuming foo table...
- Vacuum (foo) took: 0.02 seconds.
- Benchmarking rename...
- benchmarking took: 0.00 seconds.

- **Bench mark for 1000000 rows**
---------------------------------------
- Creating table...
- Populating (foo) table...
- Populating (foo) took: 5.10 seconds.
- Vacuuming foo table...
- Vacuum (foo) took: 0.11 seconds.
- Benchmarking rename...
- benchmarking took: 0.00 seconds.

- **Bench mark for 10000000 rows**
---------------------------------------
- Creating table...
- Populating (foo) table...
- Populating (foo) took: 50.87 seconds.
- Vacuuming foo table...
- Vacuum (foo) took: 1.04 seconds.
- Benchmarking rename...
- benchmarking took: 0.00 seconds.
```

## Outro

- [extra resource](https://brandur.org/fragments/postgres-table-rename)
