# SET NOT NULL

```
Created at: 2024-07-29
```

Since Postgres 12 (inclusive), the operation `ALTER TABLE .. UPDATE COLUMN ...
SET NOT NULL` can be managed safely, that is, without locking reads and writes.

In prior versions of Postgres, this operation would need to scan the whole
table, and thus, could take a long time.

According to this
[source](http://web.archive.org/web/20240521033839/https://dba.stackexchange.com/questions/267947/how-can-i-set-a-column-to-not-null-without-locking-the-table-during-a-table-scan),
Postgres can now prove the correctness of NOT NULL simply by checking an
existing constraint.

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (bar INTEGER);
INSERT INTO foo (bar) SELECT generate_series(1, 1000);
-- The below still requires ACCESS EXCLUSIVE lock, but doesn't require a full
-- table scan.
-- This check will only be applied to new or modified rows, existing rows
-- won't be validated because of the NOT VALID clause.
ALTER TABLE foo
ADD CONSTRAINT foo_not_null
CHECK (bar IS NOT NULL) NOT VALID;

-- The below performs a sequential scan, but without an exclusive lock.
-- Concurrent sessions can read/write.
-- The operation will require a SHARE UPDATE EXCLUSIVE lock, which will block
-- only other schema changes and the VACUUM operation.
-- This may take a long time, but the operation is idempotent once the
--  constraint is marked as valid.
ALTER TABLE foo VALIDATE CONSTRAINT foo_not_null;

-- Requires ACCESS EXCLUSIVE LOCK, but foo_not_null proves that there is no
-- NULL in this column and a full table scan is not required. Therefore, the
-- ALTER TABLE command should be fast.
-- If you are not on Postgres >=12, you should skip this as it will take a lot
-- of time, and the current CHECK constraint might be good enough.
ALTER TABLE foo ALTER COLUMN bar SET NOT NULL;

-- The CHECK constraint has fulfilled its obligation and can now departure.
-- This takes an ACCESS EXCLUSIVE lock, but should run very fast.
ALTER TABLE foo DROP CONSTRAINT foo_not_null;
```
