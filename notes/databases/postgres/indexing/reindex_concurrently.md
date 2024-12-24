# REINDEX CONCURRENTLY

```
Created at: 2024-12-20
```

Reindexing is a good strategy to address [index bloat](databases/postgres/performance/table_bloat.md).

This operation will create a fresh new index from scratch.


## Sandbox

In shell 1:

```sql
CREATE DATABASE reindex_concurrently;

DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL PRIMARY KEY, bar INTEGER);
CREATE INDEX bar_idx ON foo (bar);

INSERT INTO foo (bar) SELECT generate_series(1, 10000);
```

In shell 2:

```sql
INSERT INTO foo (bar) VALUES (1);
```

Back in Shell 1:

```sql
REINDEX INDEX CONCURRENTLY bar_idx;
```

This will hang because shell 2 has an open transaction.
If you cancel the REINDEX operation, you will see the following index:

```
                            Table "public.foo"
 Column |  Type   | Collation | Nullable |             Default
--------+---------+-----------+----------+---------------------------------
 id     | integer |           | not null | nextval('foo_id_seq'::regclass)
 bar    | integer |           |          |
Indexes:
    "foo_pkey" PRIMARY KEY, btree (id)
    "bar_idx" btree (bar)
    "bar_idx_ccnew" btree (bar) INVALID
```

The more concurrent reindexes fail, the more `ccnew` indexes will show up:

```
    "bar_idx_ccnew" btree (bar) INVALID
    "bar_idx_ccnew1" btree (bar) INVALID
    "bar_idx_ccnew2" btree (bar) INVALID
    "bar_idx_ccnew3" btree (bar) INVALID
```

Postgres internally calls the function `ReindexRelationConcurrently` that has
this following explanation:

```
 * ReindexRelationConcurrently - process REINDEX CONCURRENTLY for given
 * relation OID
 *
 * 'relationOid' can either belong to an index, a table or a materialized
 * view.  For tables and materialized views, all its indexes will be rebuilt,
 * excluding invalid indexes and any indexes used in exclusion constraints,
 * but including its associated toast table indexes.  For indexes, the index
 * itself will be rebuilt.
```

The index creation and replacement happens in 6 steps (comment extracted from
the code after all the indexes for the operation are found).

```
	/*-----
	 * Now we have all the indexes we want to process in indexIds.
	 *
	 * The phases now are:
	 *
	 * 1. create new indexes in the catalog
	 * 2. build new indexes
	 * 3. let new indexes catch up with tuples inserted in the meantime
	 * 4. swap index names
	 * 5. mark old indexes as dead
	 * 6. drop old indexes
	 *
	 * We process each phase for all indexes before moving to the next phase,
	 * for efficiency.
	 */

	/*
	 * Phase 1 of REINDEX CONCURRENTLY
	 *
	 * Create a new index with the same properties as the old one, but it is
	 * only registered in catalogs and will be built later.  Then get session
	 * locks on all involved tables.  See analogous code in DefineIndex() for
	 * more detailed comments.
	 */
```

Now on shell 2:

```sql
ROLLBACK;
```

And back on shell 1, finally reindex again:

```sql
REINDEX INDEX CONCURRENTLY bar_idx;
```

**Important**: None of the `ccnew` indexes will be removed, you have to do that
manually!
