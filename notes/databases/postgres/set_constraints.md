February 29, 2024

SET CONSTRAINTS — set constraint check timing for the current transaction

[Source](http://web.archive.org/web/20240127151138/https://www.postgresql.org/docs/current/sql-set-constraints.html)

## What it does

> SET CONSTRAINTS sets the behavior of constraint checking within the current
> transaction. IMMEDIATE constraints are checked at the end of each statement.
> DEFERRED constraints are not checked until transaction commit. Each
> constraint has its own IMMEDIATE or DEFERRED mode.

> Upon creation, a constraint is given one of three characteristics: DEFERRABLE
> INITIALLY DEFERRED, DEFERRABLE INITIALLY IMMEDIATE, or NOT DEFERRABLE. The
> third class is always IMMEDIATE and is not affected by the SET CONSTRAINTS
> command. The first two classes start every transaction in the indicated mode,
> but their behavior can be changed within a transaction by SET CONSTRAINTS.

## Surprise!

> When SET CONSTRAINTS changes the mode of a constraint from DEFERRED to
> IMMEDIATE, the new mode takes effect retroactively: any outstanding data
> modifications that would have been checked at the end of the transaction are
> instead checked during the execution of the SET CONSTRAINTS command. If any
> such constraint is violated, the SET CONSTRAINTS fails (and does not change
> the constraint mode). Thus, SET CONSTRAINTS can be used to force checking of
> constraints to occur at a specific point in a transaction.

## But...

> Currently, only UNIQUE, PRIMARY KEY, REFERENCES (foreign key), and EXCLUDE
> constraints are affected by this setting. NOT NULL and CHECK constraints are
> always checked immediately when a row is inserted or modified (not at the end
> of the statement). Uniqueness and exclusion constraints that have not been
> declared DEFERRABLE are also checked immediately.
