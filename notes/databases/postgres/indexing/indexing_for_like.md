February 1, 2024

# Introduction

When working in a Django application, an index can be created for a field
using the `db_index` argument, or the `Meta.indexes` attribute.

```python
class MyModel(models.Model):
    my_field = models.CharField(
        max_length=255,
        null=True,
        default=None,
        db_index=True,
    )

    # OR instead of using db_index=True:
    class Meta:
        indexes = [
            models.Index(fields=["my_field"]),
            models.Index(
                fields=["my_field"],
                name="my_field_idx_like",
                opclasses=["varchar_pattern_ops"],
            ),
        ]
```

As of Django 4.1.12, the migration will generate the following indexes:

```sql
BEGIN;
--
-- Add field my_field to my_model
--
ALTER TABLE "app_mymodel" ADD COLUMN "my_field" varchar(255) NULL;
CREATE INDEX "app_mymodel_my_field_0ad260d5" ON "mymodel" ("my_field");
CREATE INDEX "app_mymodel_my_field_0ad260d5_like" ON "mymodel" ("my_field" varchar_pattern_ops);
COMMIT;
```

The second index is allegedly the one we should use for LIKE filtering.
But only *some* LIKE filters, not *all*.

## Creating a test schema with mock data
### Create a mock database using psql

```sql
CREATE DATABASE like_experiments;

\c like_experiments
```

### Create the table and indexes

```sql
CREATE TABLE mymodel (
    id SERIAL PRIMARY KEY,
    my_field VARCHAR(255) NULL DEFAULT NULL
);

-- Create default B-tree index on my_field
CREATE INDEX mymodel_my_field_idx ON mymodel (my_field);

-- Create index with varchar_pattern_ops on my_field
CREATE INDEX mymodel_my_field_idx_like ON mymodel USING btree (my_field varchar_pattern_ops);
```

### Create 100,000 rows

```sql
BEGIN;
DO $$
DECLARE
    i INT := 1;
BEGIN
    WHILE i <= 100000 LOOP
        INSERT INTO mymodel (my_field) VALUES ('Value_' || i);
        i := i + 1;
    END LOOP;
END $$;
COMMIT;
```

## Three variations of anchor filtering

### Anchor in the middle:

```sql
explain analyse select * from mymodel where my_field like 'wat%r';

                                                             QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------------------
 Index Scan using mymodel_my_field_idx_like on mymodel  (cost=0.42..8.44 rows=10 width=15) (actual time=0.041..0.041 rows=0 loops=1)
   Index Cond: (((my_field)::text ~>=~ 'wat'::text) AND ((my_field)::text ~<~ 'wau'::text))
   Filter: ((my_field)::text ~~ 'wat%r'::text)
 Planning Time: 0.394 ms
 Execution Time: 0.082 ms
```

- `~>=~`: checks for results that start with `wat`.
- `~<~`: checks for results that less (unicode-wise) than `wau`.

Note that the "r" character after the anchor is not used in the Index Cond.

### Anchor in the end:

```sql
explain analyse select * from mymodel where my_field like 'wat%r';

                                                             QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------------------
 Index Scan using mymodel_my_field_idx_like on mymodel  (cost=0.42..8.44 rows=10 width=15) (actual time=0.020..0.021 rows=0 loops=1)
   Index Cond: (((my_field)::text ~>=~ 'wate'::text) AND ((my_field)::text ~<~ 'watf'::text))
   Filter: ((my_field)::text ~~ 'wate%'::text)
 Planning Time: 0.245 ms
 Execution Time: 0.040 ms
```

No much difference from the previous query plan.

### Anchor in the front:

```sql
explain analyse select * from mymodel where my_field like '%ater';

                                              QUERY PLAN
------------------------------------------------------------------------------------------------------
 Seq Scan on mymodel  (cost=0.00..1791.00 rows=10 width=15) (actual time=8.214..8.214 rows=0 loops=1)
   Filter: ((my_field)::text ~~ '%ater'::text)
   Rows Removed by Filter: 100000
 Planning Time: 0.088 ms
 Execution Time: 8.226 ms
```

The index is not used at all, as Postgres is not able to traverse the B-tree
index based on a suffix alone.

## Using a GIN Trigram index

```sql
CREATE EXTENSION pg_trgm;

CREATE INDEX "mymodel_my_field_idx_gin_like" ON "mymodel" USING gin ("my_field" gin_trgm_ops);
```

From the Postgres documentation:

> The `pg_trgm` module provides functions and operators for determining the
> similarity of alphanumeric text based on trigram matching, as well as index
> operator classes that support fast searching for similar strings.

And what is "trigram matching"?

Trigram matching is a technique used in text search and pattern matching to
find similarities between strings based on sequences of three consecutive
characters, known as trigrams. A trigram is a three-character substring
extracted from a longer string.

For example, given the string "hello," the trigrams would be "hel," "ell," and
"llo." The idea is to compare these trigrams between two strings to measure
their similarity or match.

If we rerun our query starting with the anchor, we now have:

```sql
explain analyse select * from mymodel where my_field like '%ater';

                                                               QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on mymodel  (cost=28.08..64.12 rows=10 width=15) (actual time=0.009..0.010 rows=0 loops=1)
   Recheck Cond: ((my_field)::text ~~ '%ater'::text)
   ->  Bitmap Index Scan on mymodel_my_field_idx_gin_like  (cost=0.00..28.07 rows=10 width=0) (actual time=0.008..0.008 rows=0 loops=1)
         Index Cond: ((my_field)::text ~~ '%ater'::text)
 Planning Time: 0.136 ms
 Execution Time: 0.040 ms
```

The index was picked up, and the cost went down from 1791 in the Seq Scan case
to 64.12. Not too bad.

Note that this index is only chosen by the planner when the query is
left-anchored. Otherwise, it will still pick the B-tree index.

If we drop the B-tree index, the new index will be picked up:

```sql
explain analyse select * from mymodel where my_field like 'wate%';

                                                               QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on mymodel  (cost=36.08..72.12 rows=10 width=15) (actual time=0.018..0.019 rows=0 loops=1)
   Recheck Cond: ((my_field)::text ~~ 'wate%'::text)
   ->  Bitmap Index Scan on mymodel_my_field_idx_gin_like  (cost=0.00..36.08 rows=10 width=0) (actual time=0.017..0.017 rows=0 loops=1)
         Index Cond: ((my_field)::text ~~ 'wate%'::text)
 Planning Time: 0.114 ms
 Execution Time: 0.049 ms
```

However, as you can see, the cost is higher (from 8.44 to 72.12). Whether or
not the bump in the cost is not high enough to justify having a whole B-tree
index is not in my knowledge yet.

## Limitations of the trigram index

The index will only be picked up if there're more than 3 characters in the
filter.

```sql
explain analyse select * from mymodel where my_field like '%w';

                                              QUERY PLAN
------------------------------------------------------------------------------------------------------
 Seq Scan on mymodel  (cost=0.00..1791.00 rows=10 width=15) (actual time=7.281..7.282 rows=0 loops=1)
   Filter: ((my_field)::text ~~ '%w'::text)
   Rows Removed by Filter: 100000
 Planning Time: 0.070 ms
 Execution Time: 7.293 ms


explain analyse select * from mymodel where my_field like '%wa';
                                                               QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on mymodel  (cost=12.08..48.12 rows=10 width=15) (actual time=0.022..0.023 rows=0 loops=1)
   Recheck Cond: ((my_field)::text ~~ '%wa'::text)
   ->  Bitmap Index Scan on mymodel_my_field_idx_gin_like  (cost=0.00..12.07 rows=10 width=0) (actual time=0.020..0.020 rows=0 loops=1)
         Index Cond: ((my_field)::text ~~ '%wa'::text)
 Planning Time: 0.088 ms
 Execution Time: 0.063 ms
```
