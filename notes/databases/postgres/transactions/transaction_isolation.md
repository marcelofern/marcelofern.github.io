# Transaction Isolation

```
Created at: 2024-11-14
```

Postgres only implements three out of the four transaction isolation levels
from the SQL standard. PostgreSQL's Read Uncommitted mode behaves like Read
Committed. Note that read committed is the default.

The different levels mean to restrict the existence of the following issues:

- dirty read: A transaction reads data written by a concurrent uncommitted
  transaction.

- nonrepeatable read: A transaction re-reads the same row twice and finds that
  data has been modified by another transaction (that committed since the
  initial read) and thus the first transaction has different results between
  each query.

- phantom read: A transaction re-executes a query returning a set of rows that
  satisfy a search condition and finds that the set of rows satisfying the
  condition has changed due to another recently-committed transaction.

- serialization anomaly: The result of successfully committing a group of
  transactions is inconsistent with all possible orderings of running those
  transactions one at a time.

A summary table is provided:

  Isolation Level    Dirty Read     Nonrepeatable Read   Phantom Read   Serialization Anomaly
  ------------------ -------------- -------------------- -------------- ---------------------
  Read uncommitted   Allowed        but not in PG        Possible       Possible
  Read committed     Not possible   Possible             Possible       Possible
  Repeatable read    Not possible   Not possible         Allowed        but not in PG
  Serializable       Not possible   Not possible         Not possible   Not possible

## Important note

Some PostgreSQL data types and functions have special rules regarding
transactional behavior. In particular, changes made to a sequence (and
therefore the counter of a column declared using serial) are immediately
visible to all other transactions and are not rolled back if the transaction
that made the changes aborts.
[1](https://www.postgresql.org/docs/current/transaction-iso.html).

## Changing the transaction isolation with SET TRANSACTION

```
marcelo.fernandes=# \help SET TRANSACTION
Command:     SET TRANSACTION
Description: set the characteristics of the current transaction
Syntax:
SET TRANSACTION transaction_mode [, ...]
SET TRANSACTION SNAPSHOT snapshot_id
SET SESSION CHARACTERISTICS AS TRANSACTION transaction_mode [, ...]

where transaction_mode is one of:

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE

URL: https://www.postgresql.org/docs/15/sql-set-transaction.html
```

NOTE:
> The transaction isolation level cannot be changed after the first query or
> data-modification statement (SELECT, INSERT, DELETE, UPDATE, MERGE, FETCH, or
> COPY) of a transaction has been executed.
