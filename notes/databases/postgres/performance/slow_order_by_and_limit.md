# Slow ORDER BY and LIMIT

```
Created at: 2025-01-14
```

Interesting problem at work. Given the following query:

```sql
EXPLAIN ANALYSE
SELECT posted_date FROM foo
WHERE bar_id IN (1258296)
ORDER BY posted_date ASC
LIMIT 1;
```

This table has an index on `bar_id` and another one on `posted_date`

The output showed a very interesting plan:
```
 Limit  (cost=0.57..2348.08 rows=1 width=4) (actual time=328296.674..328296.675 rows=1 loops=1)
   ->  Index Scan using posted_date_idx on foo  (cost=0.57..56941182.70 rows=24256 width=4) (actual time=328296.673..328296.673 rows=1 loops=1)
         Filter: (bar_id = 1258296)
         Rows Removed by Filter: 57895884
 Planning Time: 0.145 ms
 Execution Time: 328296.702 ms
```

It actually looked at the "posted_date" index first, which is huge (57 million
rows filtered out), instead of looking at the bar_id_index and filtering out
the results, getting the first.

Removing the `LIMIT 1` actually made the query run faster, because the selected
plan was better:

```
 Sort  (cost=25927.45..25988.09 rows=24256 width=4) (actual time=63.582..65.982 rows=38677 loops=1)
   Sort Key: posted_date
   Sort Method: quicksort  Memory: 3349kB
   ->  Index Scan using bar_id_idx on foo  (cost=0.57..24160.88 rows=24256 width=4) (actual time=8.653..57.713 rows=38677 loops=1)
         Index Cond: (bar_id = 1258296)
 Planning Time: 0.984 ms
 Execution Time: 68.305 ms
 ```

## Why did this happen?

Even though the first query (the bad one) had a smaller cost (2348 vs 25988),
it performed badly due to how Postgres decided to plan that query.

In this case, Postgres decided to traverse the `posted_date_idx` from the
bottom up, fetching every row and verifying if the `bar_id` value matched. If
so, the query is done. No sorting required as the first match represents the
last posted_date for that bar_id.

The alternative (without LIMIT 1), means that Postgres has to go through the
`bar_id_idx` instead, fetch all the matching `bar_id` rows, performs a quick
sort, and returns the first result.

Postgres thinks that this would be more _costly_ than the alternative - even
though in real terms it isn't.

## How to fix this?

One possibility is to add a composite index, with the `bar_id` first, and the
`posted_date` last. In that case, Postgres just has to look at the first
`bar_id` entry in the index, which would have the highest `posted_date` value
and be done.
