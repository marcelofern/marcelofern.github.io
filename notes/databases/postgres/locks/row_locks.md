# Row locks

```
Created at: 2026-01-14
```

Despite Postgres documentation having _some_ information on row locks, you
usually can't see them in the catalog table `pg_locks`:

> Although tuples are a lockable type of object, information about row-level
> locks is stored on disk, not in memory, and therefore row-level locks
> normally do not appear in this view. If a process is waiting for a row-level
> lock, it will usually appear in the view as waiting for the permanent
> transaction ID of the current holder of that row lock.

As per the above, row-level lock is stored on disk. This information is stored
in the xmax field - which serves two purposes:

1. Store the transation id (xid) of the transaction that deleted the tuple.
   I.e., either a delete or an update operation.
2. Or store row locks.

What happens if both need to be stored at the same time? Well, This never
happens. A tuple can't be deleted and locked at the same time.

The advantage of storing these locks on disk is that the pg_locks underlying
table won't go past its size limit. But at the same time they increase I/O
load since we are effectivaly dirtying the buffer for this row and it needs to
be written to disk during the next checkpoint.
[More information, including what happens when multiple locks on the same row](https://www.cybertec-postgresql.com/en/whats-in-an-xmax/#the-two-meanings-of-xmax)

## Row lock Cheatsheet

```
|                   | FOR KEY SHARE | FOR SHARE | FOR NO KEY UPDATE | FOR UPDATE |
|-------------------|---------------|-----------|-------------------|------------|
| FOR KEY SHARE     |               |           |                   |      X     |
| FOR SHARE         |               |           |         X         |      X     |
| FOR NO KEY UPDATE |               |     X     |         X         |      X     |
| FOR UPDATE        |       X       |     X     |         X         |      X     |
```

> Row-level locks do not affect data querying; they block only writers and
> lockers to the same row. Row-level locks are released at transaction end or
> during savepoint rollback, just like table-level locks.

## When to use SELECT ... FOR UPDATE

Most people use `SELECT ... FOR UPDATE` but it can cause problems.
This lock should only be taken when you are DELETING the row, or updating a
unique key column or a primary key column (basically a column that can be used
as FK on another table). In other words, an UPDATE statement that modifies a
column that is part of a non-partial non-expression unique index.

If that is not the case, use `SELECT ... FOR NO KEY UPDATE`.
This ensures you are not blocking inserts into other tables that refer the
table being updated. [More info](https://www.cybertec-postgresql.com/en/row-locks-in-postgresql/)

Avoid using this against a row in a table referenced by a foreign key as you will
block all INSERTs from other tables that also reference this row. [More info](https://www.cybertec-postgresql.com/en/select-for-update-considered-harmful-postgresql/)

## When to use SELECT ... FOR NO KEY UPDATE

Any time when you are updating a non-primary key column and a non-unique key
column.

## When to use SELECT ... FOR KEY SHARE

I have never seen a usecase for this.

In fact, Postgres uses this level of lock internally. Whenever an INSERT
happens in a table with a foreign key, this lock will be taken in the
referenced table.

This prevents a race condition in which another transaction might delete the
referenced row before the INSERT finishes.

## When to use SELECT ... FOR SHARE

I have never seen a usecase for this. Postgres also does not use this lock
internally.
