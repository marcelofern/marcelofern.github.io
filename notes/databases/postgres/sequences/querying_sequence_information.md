# Querying Sequence Information

```
Created at: 2025-09-01
```

Simply check the `pg_sequences` view.

```sql
SELECT * FROM pg_sequences WHERE sequencename = 'your_sequence_name';
```
