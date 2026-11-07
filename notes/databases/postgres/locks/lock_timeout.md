January 30, 2024

# Definition

How long to wait until the lock is acquired before cancelling the statement.

Note: Emphasis on the fact that the `lock_timeout` setting doesn't affect how
long the lock is held, only how long the transaction is allowed wait in order
to acquire it.

Note 2: The timeout counter starts when the transaction joins the queue of
locks. So if there are 3 transactions waiting to acquire the same lock, the
4th one wouldn't wait until all 3 transactions are completed before the lock
timeout counter starts.

```sql
// sets the lock for the whole session
SET lock_timeout = '1s';

// sets the lock for the current transaction
SET LOCAL lock_timeout = 1000;

ALTER TABLE accounts DROP COLUMN amount;
// ERROR: canceling statement due to lock timeout
```

## RESET Gotchas

Warning: the `RESET lock_timeout;` operation will reset the SESSION timeout,
even if it is performed inside a transaction. See below:

```sql
-- This is the default lock_timeout (0s)
SHOW lock_timeout;

-- Set the SESSION lock timeout (42s)
SET lock_timeout = '42s';
SHOW lock_timeout;

BEGIN;

-- WARNING: This will set a new value for the SESSION lock_timeout from within
-- the transaction because it is missing the LOCAL key word!
SET lock_timeout = '10s';
SHOW lock_timeout;

-- Set it again but this time only for the transaction. This value will not
-- affect the session lock_timeout.
SET LOCAL lock_timeout = '9s';
SHOW lock_timeout;

-- Reset BOTH the SESSION and Transaction lock_timeout (both go back to 0, the
-- default).
RESET lock_timeout;
SHOW lock_timeout;

COMMIT;

-- Should now be 0s because it was reset inside the transaction.
SHOW lock_timeout;
```

Alternative: Inside a transaction, use `SET LOCAL lock_timeout TO DEFAULT;`
instead.

Further discussions [here](https://www.postgresql.org/message-id/flat/CAM2F1VM86387XCtNgbTbVQO6PfYBjCHg74XLsfavWJ-o-OZE%2BQ%40mail.gmail.com)

## Behaviour inside and outside a transaction

Basics: `SET lock_timeout 100ms`  sets the timeout for the whole session,
whereas `SET LOCAL lock_timeout 100ms` sets the timeout for the current
transactions.

If SET (or equivalently SET SESSION) is issued within a transaction that is
later aborted, the effects of the SET command disappear when the transaction is
rolled back. Once the surrounding transaction is committed, the effects will
persist until the end of the session, unless overridden by another SET.

The effects of SET LOCAL last only till the end of the current transaction,
whether committed or not. A special case is SET followed by SET LOCAL within a
single transaction: the SET LOCAL value will be seen until the end of the
transaction, but afterwards (if the transaction is committed) the SET value
will take effect.

The effects of SET or SET LOCAL are also cancelled by rolling back to a
savepoint that is earlier than the command.

Source: https://www.postgresql.org/docs/16/runtime-config-client.html

## When used together with `statement_timeout`

Note: If `lock_timeout` is set to the same value of `statement_timeout`, the
`lock_timeout` value becomes redundant, as `statement_timeout` trumps the lock.

> Unlike `statement_timeout`, this timeout can only occur while waiting for
> locks. Note that if `statement_timeout` is nonzero, it is rather pointless to
> set `lock_timeout` to the same or larger value, since the statement timeout
> would always trigger first. If `log_min_error_statement` is set to ERROR or
> lower, the statement that timed out will be logged.

Source: https://www.postgresql.org/docs/16/sql-set.html
