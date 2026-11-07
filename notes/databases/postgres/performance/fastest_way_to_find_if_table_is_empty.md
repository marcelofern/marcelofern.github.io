# Fastest Way To Find If Table Is Empty

```
Created at: 2025-03-24
```

Using Postgres 15 as a base:

```sql
\timing on

DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL PRIMARY KEY);

INSERT INTO foo (id) SELECT generate_series(1, 1000000);

-- Sequential Scan [443 buffers read].
-- ~30ms
SELECT COUNT(*) FROM foo;

-- Index-only Scan (using implicit pkey index) [3 buffers read].
-- ~1.5ms
-- EXPLAIN (ANALYZE ON, BUFFERS ON, COSTS OFF)
SELECT MIN(id) FROM foo;

-- Sequential Scan [1 buffer read].
-- ~1.15ms
-- EXPLAIN (ANALYZE ON, BUFFERS ON, COSTS OFF)
SELECT EXISTS (SELECT 1 FROM foo LIMIT 1);
```

The difference between the last two queries is small. But the `SELECT EXISTS`
is a little bit faster in all cases. It will also work better for cases where
there the table has no primary key index available.

I also ended up asking this question in the Postgres mailing list, and people
seem to agree with the EXISTS approach: [link](https://www.postgresql.org/message-id/flat/CAM2F1VMbOEubpXk44B5KaWKX0OSVrA8-9xqidhJMNtDprhTSTg%40mail.gmail.com)

