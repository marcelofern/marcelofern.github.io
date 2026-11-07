# Temporary Tables

```
Created at: 2025-04-22
```

Temporary tables only live for the length of that session (or transaction when
insite a BEGIN/COMMIT block).

They can be created with the `TEMPORARY` or `TEMP` keyword:

```sql
CREATE TEMP TABLE table_name(
   ...
);
```

Because temporary tables are session/transaction-only, multiple sessions can
create a temporary table with the same name.

This means that temporary tables can be used programatically to store the
results of some complex calculation pertaining to the session or transaction.
