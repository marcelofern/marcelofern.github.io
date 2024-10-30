# OR queries

```
Created at: 2024-10-24
```

There are simple ways to make a query inneficient by using an `OR` conditional.

Let's start with some example tables:

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (
    id SERIAL PRIMARY KEY,
    int_field INT
);

DROP TABLE IF EXISTS bar;
CREATE TABLE bar (
    id SERIAL PRIMARY KEY,
    int_field INT
);

INSERT INTO foo (int_field)
SELECT s
FROM (
    SELECT generate_series(1, 100000) AS s
    ORDER BY RANDOM()
) AS shuffled;

INSERT INTO bar (int_field)
SELECT s
FROM (
    SELECT generate_series(1, 100000) AS s
    ORDER BY RANDOM()
) AS shuffled;

CREATE INDEX foo_int_field ON foo(int_field);
CREATE INDEX bar_int_field ON bar(int_field);

VACUUM FULL;
```

We now have two tables that have an indexed `int` field and 100,000 rows.

## When is it ok to perform an OR?

If the `OR` condition is not used to filter-out rows of a query, it should be
fine. For example, when using a `CASE` expression.

## When it is not ok to perform an OR

Take for example this query:

```sql
EXPLAIN (ANALYZE on, COSTS off)
SELECT id from foo
WHERE id = 777 OR id = 123;
```
```
 Bitmap Heap Scan on foo
   Recheck Cond: ((id = 777) OR (id = 123))
   Heap Blocks: exact=2
   ->  BitmapOr
         ->  Bitmap Index Scan on foo_pkey
               Index Cond: (id = 777)
         ->  Bitmap Index Scan on foo_pkey
               Index Cond: (id = 123)
 Planning Time: 0.153 ms
 Execution Time: 0.249 ms
```

Note how the same index was scanned twice. For each scan a bitmap was created
(CPU time + RAM usage to keep the bitmap) before it could be OR'ed.

Bitmaps require CPU time to be built, and RAM to be stored. An index-only query
is much faster:

```sql
EXPLAIN (ANALYZE on, COSTS off)
SELECT id from foo
WHERE id in (777, 123);
```
```
 Index Only Scan using foo_pkey on foo
   Index Cond: (id = ANY ('{777,123}'::integer[]))
   Heap Fetches: 0
```

What if the `OR` spans across different tables:

```sql
EXPLAIN (ANALYSE on, COSTS off)
SELECT id, foo.int_field, bar.int_field
FROM foo JOIN bar USING (id)
WHERE foo.id = 777 OR bar.id = 777;
```
```
 Hash Join (actual time=29.256..49.156 rows=1 loops=1)
   Hash Cond: (foo.id = bar.id)
   Join Filter: ((foo.id = 777) OR (bar.id = 777))
   Rows Removed by Join Filter: 99999
   ->  Seq Scan on foo (actual time=0.007..3.537 rows=100000 loops=1)
   ->  Hash (actual time=28.200..28.201 rows=100000 loops=1)
         Buckets: 131072  Batches: 1  Memory Usage: 4931kB
         ->  Seq Scan on bar (actual time=0.015..9.202 rows=100000 loops=1)
```

We joined the whole two tables to only discard 99,999 rows.
In this case we need to resort to a union.

```sql
EXPLAIN (ANALYSE on, COSTS off)
   SELECT id, foo.int_field, bar.int_field
   FROM foo JOIN bar USING (id)
   WHERE foo.id = 777
UNION
   SELECT id, foo.int_field, bar.int_field
   FROM foo JOIN bar USING (id)
   WHERE bar.id = 777;
```
