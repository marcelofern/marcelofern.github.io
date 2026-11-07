# Read only transaction

```
Created at: 2025-07-14
```

## Simply:

```sql
BEGIN TRANSACTION;
SET TRANSACTION READ ONLY;

-- or you can also:
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY
```
