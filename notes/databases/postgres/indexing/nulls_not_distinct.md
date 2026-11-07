# NULLS NOT DISTINCT

```
Created at: 2025-04-09
```

By default, NULL values are treated as distinct values. This means that when
making comparisons, `NULL != NULL`. Instead, NULL is considered "unkown".

This means that the index above won't do what you expect:

```sql
CREATE UNIQUE INDEX
  foo_idx
ON
  bar (my_column)
WHERE
  my_column IS NULL;
```

You might have thought that "there can be one row in the `bar` table where
my_column is NULL", but that is not correct.

## Constraints

The same is valid for constraints:

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL PRIMARY KEY, val INTEGER);

INSERT INTO foo (id) SELECT generate_series(1, 10000);

-- Should be zero
SELECT count(*) FROM foo WHERE val IS NOT NULL;

-- This works
ALTER TABLE foo ADD CONSTRAINT unique_val UNIQUE (val);
```

## Postgres 15

In Postgres 15+ the feature `NULLS NOT DISTINCT` is available when creating
unique indexes. The correct way of creating the index above would be:

```sql
CREATE UNIQUE INDEX
  foo_idx
ON
  bar (my_column)
NULLS NOT DISTINCT
WHERE
  my_column IS NULL;
```

## Older Versions

There is a workaround for older Postgres versions. You can use "COALESCE" to
store an actual value in the index when the entry is set to NULL.

Supposing `my_column` is a time stamp:

```sql
CREATE UNIQUE INDEX
  foo_idx
ON
  bar (COALESCE(my_column, '1970-01-01 00:00:00'))
WHERE
  my_column IS NULL;
```

Make sure to pick a sentinel value (in this case 1970-01-01 midnight) that no
other entry in the table would likely obtain.

It looks funky, but remember that this is the value stored in the index; the
table still stores the NULL value against that column.
