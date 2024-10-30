January 30, 2024

# Definition

How long to wait until the lock is acquired before cancelling the statement.

Note: Emphasis on the fact that the `lock_timeout` setting doesn't affect how
long the lock is held, only how long it's allowed to take to acquire it.

```sql
// sets the lock for the whole session
SET lock_timeout = '1s';

// sets the lock for the current transaction
SET LOCAL lock_timeout = 1000;

ALTER TABLE accounts DROP COLUMN amount;
// ERROR: canceling statement due to lock timeout
```

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
