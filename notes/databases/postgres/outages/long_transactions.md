# Long Transactions

## Definition

> "Long-running" is a relative term, and, of course, its meaning depends on
> particular situation. Usually, in heavily-loaded systems – say ~10^5 TPS
> including RO queries and ~10^3 of XID-consuming TPS (writes) – we consider
> transactions running longer than 30-60 seconds to be long. This can be
> translated to 30-60k dead tuples accumulated in a table in the worst case –
> in the case when all transactions during that time frame produced 1 dead
> tuple. Of course, this is a very, very rough assumption, but this can give an
> idea about the scale and helps define "threshold" to support the meaning of
> the "long-running transaction" term. [source](https://github.com/postgres-ai/postgres-howtos/blob/main/0030_how_to_deal_with_long-running_transactions_oltp.md)

## Why are they bad

In the context of a web application, long-running transactions can be dangerous
for two reasons:

- Blocking: A lock acquired during a transaction will only be released when
  the transaction finishes. This can be dangerous even in cases where the lock
  acquired is the weakest one possible: AccessShareLock. This is the case when
  a DDL is blocked by this lock, and in turn blocks other queries that need to
  run.
- Autovacuum: Dead tuples that have been created after the long-running
  transaction started cannot be reclaimed by autovacuum. A high number of
  dead tuples in a table can seriously affect the performance of queries
  against that table.


## How to prevent them

When using Postgres 17 or higher, you can se the transaction_timeout value:

```sql
SET transaction_timeout TO '30s';
```

Otherwise, you can achieve something close to that with two parameters:

1. `statement_timeout`: If you have a web application and pages that take more
   than 30s to load time out, 30s might be a good value for this parameter. You
   might need to have a higher value for batch tasks, which can be controlled
   via user roles.
2. `idle_in_transaction_session_timeout`: Terminate any session that has been
   idle (that is, waiting for a client query) within an open transaction for
   longer than the specified amount of time. This should also be set to a low
   value like 15-30 seconds for a web application.

Note that even with these two parameters, it's not a guarantee that no
long-running queries will show up. The following could happen:

- The value of `statement_timeou` is set to 30s, and
  `idle_in_transaction_session_timeout` is set to 15s.
- A transaction is opened.
- A query runs and takes 29 seconds.
- It is idle for 14s.
- Another query runs and takes 29 seconds.
- It is idle for 14s.
- ... so on so forth.

Other alternatives include:

- A cronjob that runs a long-running transaction "killer".
- Add the limit in the application side if you can.

## Showing low-running transactions:

```sql
select clock_timestamp() - xact_start, *
from pg_stat_activity
where clock_timestamp() - xact_start > interval '1 minute'
order by clock_timestamp() - xact_start desc;
```

You can also sample the queries for this long-running transaction to show what
they were doing:

```sh
while sleep 1; do
  psql -XAtc "
      copy (
        with samples as (
          select
            clock_timestamp(),
            clock_timestamp() - xact_start as xact_duration,
            *
          from pg_stat_activity
        )
        select *
        from samples
        where xact_duration > interval '1 minute'
        order by xact_duration desc
      ) to stdout delimiter ',' csv
    " 2>&1 \
  | tee -a long_tx_$(date +%Y%m%d).log.csv
done
```
