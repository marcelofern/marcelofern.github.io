# CHECK constraints without downtime

```
Created at: 2024-12-09
```

The following ddl is used to add a check constraint on an existing table:

```sql
ALTER TABLE foo ADD CONSTRAINT bar_not_negative CHECK (bar >= 0);
```

However, this operation can be dangerous and create an outage on your app.

For example, imagine the following schema:

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL, bar int);

-- Add a bit of data
INSERT INTO foo (bar) SELECT generate_series(1, 10000);
```

Now in a transaction, add the following CHECK constraint:

```sql
-- Get debug information
SET client_min_messages=debug1;
BEGIN;
ALTER TABLE foo ADD CONSTRAINT bar_not_negative CHECK (bar >= 0);

-- Just leave the transaction open for now.
```

Now let's see which locks this transaction is holding by opening another psql
shell and executing:

```sql
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
    -- change it to the pid of the psql shell executing the ALTER TABLE.
    -- a.pid = 21665;
    a.pid != pg_backend_pid();
```

```
 locktype |        mode         | granted | relation | relname |
----------+---------------------+---------+----------+---------+
 relation | AccessExclusiveLock | t       |  2007262 | foo     |
 ```

An AccessExclusiveLock will block all reads and writes on the table while the
constraint is being added. It's the highest level of locking in Postgres.

You'll also see that Postgres printed:

```
DEBUG:  verifying table "foo"
```

This means that Postgres is going through the whole table to check for any
existing violation of the CHECK constraint. And it does that while holding an
Access Exclusive lock.

## A better way

First create a NOT VALID constraint

```sql
BEGIN;
ALTER TABLE foo ADD CONSTRAINT bar_not_negative CHECK (bar >= 0) NOT VALID;
```

You'll notice that postgres didn't print `verifying table "foo"`. That is
because it doesn't have too. The constraint will only be enforced for new
writes.

Note that this operation still holds an AccessExclusiveLock, but because it
doesn't need to verify the whole table, it runs very fast.

Then, you can validate the constraint in a separated step:

```sql
ALTER TABLE foo VALIDATE CONSTRAINT bar_not_negative;
```

This time Postgres will print `verifying table "foo"`, but it will only acquire
a ShareUpdateExclusiveLock in this case, which won't block any reads or writes
on that table.
