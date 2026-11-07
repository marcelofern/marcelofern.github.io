# A PostgreSQL Planner Primer

```
Created at: 2024-07-25
```

A planner's job is to simply find the fastest way to fetch data from the
database for a particular query.

There are many paths (a.k.a plans) a planner might have to choose from. Just in
terms of joins here are some query executor implementations for illustration:

- hash join - [src/backend/executor/nodeHashjoin.c](https://github.com/postgres/postgres/blob/d01ce180d9b5f0656d499840e138ab9ae9f8bf76/src/backend/executor/nodeHashjoin.c)
- nest loop join - [src/backend/executor/nodeNestloop.c](https://github.com/postgres/postgres/blob/d01ce180d9b5f0656d499840e138ab9ae9f8bf76/src/backend/executor/nodeNestloop.c)
- node merge join - [src/backend/executor/nodeMergejoin.c](https://github.com/postgres/postgres/blob/d01ce180d9b5f0656d499840e138ab9ae9f8bf76/src/backend/executor/nodeMergejoin.c)
- ...

## Selecting a plan

Generally speaking, the plan with the lowest "cost" is the one picked by the
planner. But how can we see the different plans available, out of curiosity?

I couldn't find a way to log "discarded" plans after much searching. But on a
sidetrack, I ended up finding some useful log variables that I think are good
to set anyway when you are debugging things locally:

```sql
LOAD 'auto_explain';
-- minimum statement execution time, in milliseconds
-- that will cause the statement's plan to be logged.
-- Setting this to 0 logs all plans.
SET auto_explain.log_min_duration = 0;
-- causes EXPLAIN ANALYZE output, rather than just
-- EXPLAIN output
SET auto_explain.log_analyze = true;
-- whether buffer usage statistics are printed when an
-- execution plan is logged; it's equivalent to the
-- BUFFERS option of EXPLAIN.
SET auto_explain.log_buffers = true;
-- causes nested statements (statements executed inside
-- a function) to be considered for logging.
SET auto_explain.log_nested_statements = true;
-- whether verbose details are printed when an execution
-- plan is logged; it's equivalent to the VERBOSE option
-- of EXPLAIN.
SET auto_explain.log_verbose = true;

-- For each query, output performance statistics of the
-- respective module to the server log. We will omit the
-- parser stats for now.
SET log_executor_stats = on;
SET log_planner_stats = on;
-- SET log_parser_stats = on;

-- These parameters enable various debugging outputs
-- to be emitted. When set, they print the resulting
-- parse tree, the query rewriter output, or the
-- execution plan for each executed query.
-- To avoid being overwhelmed, we'll only do the
-- planner.
SET debug_print_plan = on;
-- SET debug_print_parse = on;
-- SET debug_print_rewritten = on;
```

This will automatically log the query plan selected by the executor for all
queries you have performed, which might be handy if you are analysing
historical queries. So when you run the following query:


```sql
SELECT count(*)
FROM pg_class, pg_index
WHERE oid = indrelid AND indisunique;
```

You get the following logs (PS: if you use docker you can simply run
`docker logs <container_id>` to see the logs).

```
2024-07-25 02:36:46.362 UTC [34] LOG:  duration: 0.161 ms  plan:
	Query Text: SELECT count(*)
	FROM pg_class, pg_index
	WHERE oid = indrelid AND indisunique;
	Aggregate  (cost=29.61..29.62 rows=1 width=8) (actual time=0.156..0.157 rows=1 loops=1)
	  Output: count(*)
	  Buffers: shared hit=14 read=4
	  ->  Hash Join  (cost=23.23..29.24 rows=149 width=0) (actual time=0.115..0.148 rows=149 loops=1)
	        Inner Unique: true
	        Hash Cond: (pg_index.indrelid = pg_class.oid)
	        Buffers: shared hit=14 read=4
	        ->  Seq Scan on pg_catalog.pg_index  (cost=0.00..5.62 rows=149 width=4) (actual time=0.005..0.021 rows=149 loops=1)
	              Output: pg_index.indexrelid, ..., etc.
	              Filter: pg_index.indisunique
	              Rows Removed by Filter: 13
	              Buffers: shared hit=4
	        ->  Hash  (cost=18.10..18.10 rows=410 width=4) (actual time=0.100..0.100 rows=410 loops=1)
	              Output: pg_class.oid
	              Buckets: 1024  Batches: 1  Memory Usage: 23kB
	              Buffers: shared hit=10 read=4
	              ->  Seq Scan on pg_catalog.pg_class  (cost=0.00..18.10 rows=410 width=4) (actual time=0.002..0.055 rows=410 loops=1)
	                    Output: pg_class.oid
	                    Buffers: shared hit=10 read=4
```

There are many other logs that were triggered as a result of the variables
above, but I'll skip them here for brevity. You should explore which ones you
find most valuable for your case.

You must have realised that earlier on I've said:

> **Generally** speaking, the plan with the lowest "cost" is the one picked by
> the planner.

Why generally and not **always**? One exception occurs when the query has
numerous joins. In such cases the number of possible plans grows exponentially
and the planner cannot take all of them into account in a timely manner.
Instead, the planner uses a selection algorithm that tries to find a good
compromise that yields a tolerable solution.

## Reading the Planner Output

Given this query:

```sql
EXPLAIN ANALYSE SELECT schemaname, tablename
FROM pg_tables
WHERE tableowner = 'postgres'
ORDER BY tablename;
```

The planner result is:

```
                                                      QUERY PLAN
----------------------------------------------------------------------------------------------------------------------
 Sort  (cost=22.28..22.30 rows=1 width=128) (actual time=0.164..0.168 rows=68 loops=1)
   Sort Key: c.relname
   Sort Method: quicksort  Memory: 36kB
   ->  Nested Loop Left Join  (cost=0.00..22.27 rows=1 width=128) (actual time=0.011..0.122 rows=68 loops=1)
         Join Filter: (n.oid = c.relnamespace)
         Rows Removed by Join Filter: 76
         ->  Seq Scan on pg_class c  (cost=0.00..21.18 rows=1 width=72) (actual time=0.008..0.078 rows=68 loops=1)
               Filter: ((relkind = ANY ('{r,p}'::"char"[])) AND (pg_get_userbyid(relowner) = 'postgres'::name))
               Rows Removed by Filter: 342
         ->  Seq Scan on pg_namespace n  (cost=0.00..1.04 rows=4 width=68) (actual time=0.000..0.000 rows=2 loops=68)
 Planning Time: 3.128 ms
 Execution Time: 0.456 ms
```

On the first row, we have the entry `cost=22.28..22.30`.
The first number (22.28) represents the start-up cost to prepare the process
for execution, i.e., before the first row can be returned,  whereas (22.30) is
the total cost of retrieving all rows.

But what unit does "cost" represent? According to Postgres 15 documentation:

> The most critical part of the display is the estimated statement execution
> cost, which is the planner's guess at how long it will take to run the
> statement (measured in cost units that are arbitrary, but conventionally mean
> disk page fetches)

Since the query was triggered with the `ANALYSE` keyword, the query fetched the
results for real, and the runtime statics were also added.

The entry `actual time=0.164..0.168` represents the start-up time and the
total time in milliseconds. It also gives us the number of rows returned (68).

Note that since there are two costs (start-up and total), the planner might
decide to optimise for one over another. For example, when a query is tagged
with `LIMIT 1` or `EXISTS`, it only needs to fetch one row, and it makes more
sense to optimise by start-up cost than total cost.

## Buffers

Another useful parameter to `EXPLAIN` is `BUFFERS`.

A buffer is a virtual representation of data that is stored in disk.
According to the docs, `BUFFERS` will:

> Include information on buffer usage. Specifically, include the number of
> shared blocks hit, read, dirtied, and written, the number of local blocks
> hit, read, dirtied, and written, the number of temp blocks read and written,
> and the time spent reading and writing data file blocks, local blocks and
> temporary file blocks (in milliseconds) if track_io_timing is enabled. A hit
> means that a read was avoided because the block was found already in cache
> when needed. Shared blocks contain data from regular tables and indexes;
> local blocks contain data from temporary tables and indexes; while temporary
> blocks contain short-term working data used in sorts, hashes, Materialize
> plan nodes, and similar cases. The number of blocks dirtied indicates the
> number of previously unmodified blocks that were changed by this query; while
> the number of blocks written indicates the number of previously-dirtied
> blocks evicted from cache by this backend during query processing. The number
> of blocks shown for an upper-level node includes those used by all its child
> nodes. In text format, only non-zero values are printed. This parameter
> defaults to FALSE.

This parameter will allows us to have an idea of how much IO work Postgres will
do. Each buffers has, usually, 8KiB of data.

[Here's](http://web.archive.org/web/20240229223746/https://postgres.ai/blog/20220106-explain-analyze-needs-buffers-to-improve-the-postgres-query-optimization-process)
a good post about the BUFFERS option


## Caveats

Planning relies heavily on the pg_statistic table. This table needs to be
updated for the planner to select the right plan. This can be arranged by
enabling the autovacuum daemon.

Note that if the table changed a lot in a short period of time, in a way that
changes haven't been acknowledged via autovacuum, you'll need to manually
vacuum the table to address the potential dead tuples.

## "Hinting" the planner to chose a specific plan

TODO: Check the pg_hint_plan extension
