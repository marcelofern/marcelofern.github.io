Vaccuming and Concurrent index creation conflict with each other in postgres:


```
|                   | ACCESS SHARE | ROW SHARE | ROW EXCL | SHARE UPDATE EXCL | SHARE | SHARE ROW EXCL | EXCL | ACCESS EXCL | QUERY                                                |
|-------------------|--------------|-----------|----------|-------------------|-------|----------------|------|-------------|------------------------------------------------------|
| ACCESS SHARE      |              |           |          |                   |       |                |      | X           | SELECT                                               |
| ROW SHARE         |              |           |          |                   |       |                | X    | X           | SELECT FOR UPDATE/SHARE                              |
| ROW EXCL          |              |           |          |                   | X     | X              | X    | X           | INSERT/UPDATE/DELETE                                 |
| SHARE UPDATE EXCL |              |           |          | X                 | X     | X              | X    | X           | VACUUM/CREATE INDEX CONCURRENTLY                     |
| SHARE             |              |           | X        | X                 |       | X              | X    | X           | CREATE INDEX                                         |
| SHARE ROW EXCL    |              |           | X        | X                 | X     | X              | X    | X           | CREATE TRIGGER/ADD FOREIGN KEY                       |
| EXCL              |              | X         | X        | X                 | X     | X              | X    | X           | REFRESH MATVIEW CONCURRENTLY                         |
| ACCESS EXCL       | X            | X         | X        | X                 | X     | X              | X    | X           | DROP/TRUNCATE/VACUUM FULL/LOCK TABLE/REFRESH MATVIEW |
```

So there is a problem if you are running a `CREATE INDEX CONCURRENTLY`
operation with a `SET lock_timeout` value.

If the VACCUM operation started _before_ the index creation, the index
operation will just time-out nicely and the index won't be created.

However, problems arise when the VACUUM operation starts _in the middle_ of
index creation.

Here is a sandbox to try it out:


```sql
DROP DATABASE IF EXISTS test777;
CREATE DATABASE test777;
\c test777

-- Create a new table
CREATE TABLE big_table (
    id SERIAL PRIMARY KEY,
    data VARCHAR(100)
);

-- Insert some mock data in the table (optional)
INSERT INTO big_table (data)
SELECT md5(random()::text)
FROM generate_series(1, 10000000);
```

Now you need to open two `psql` instances. One will run the SHARE UPDATE
EXCLUSIVE lock that is run when a vacuum on the table is happening.

You will have to be fast, because you need to run the index creation, and while
it is executing, you will need to lock the table. You might add more entries in
the `generate_series` command to make the index generation slower.

So on the first psql instance:

```sql
SET lock_timeout TO '1s';
-- Try to create an index on the table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_data ON big_table (data);
```

And very quickly, run this on a second instance:

```sql
VACUUM FULL big_table;
```

You should see a:

```
ERROR:  canceling statement due to lock timeout
```

It is also possible to trigger this error after the index started by using:

```sql
begin;
LOCK TABLE big_table IN ROW EXCLUSIVE MODE;
-- commit; when you finished.
```

Or a simple update:

```sql
begin;
UPDATE big_table SET data = 'New data' WHERE id = 10;
-- commit; when you finished
```

In other cases, where you have a deadlock, it will do this:
I don't know how I triggered this, but it happens mysteriously during my
tests.

```
ERROR: deadlock detected
DETAIL: Process 59567 waits for ShareLock on virtual transaction 6/3006;
blocked by process 59554.

Process 59554 waits for ShareUpdateExclusiveLock on relation 13338055 of
database 8649321; blocked by process 59567
```

So the lock is blocking the index creation, and the index creation is blocking
the lock = deadlock.

You can now verify that the index isn't valid:

```sql
SELECT relname
FROM pg_class, pg_index
WHERE pg_index.indisvalid = false AND pg_index.indexrelid = pg_class.oid;
```
