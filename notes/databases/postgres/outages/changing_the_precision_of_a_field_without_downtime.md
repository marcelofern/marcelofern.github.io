# Changing the precision of a field without downtime

The numeric type is defined as `NUMERIC(precision, scale)`

- The **precision** is how many significant digits there are in the number,
before or after the comma.
- The **scale** is the count of decimal digits in the fractional part.


```sql
CREATE DATABASE test_precision_field;
-- \c test_precision_field

SET client_min_messages=debug1;

DROP TABLE IF EXISTS foo;

CREATE TABLE foo (id SERIAL PRIMARY KEY, bar NUMERIC(10, 2));

INSERT INTO foo (bar) SELECT generate_series(1, 1000);

-- Only increase precision but keep the scale:
-- This is safe, it does not rewrite the table
ALTER TABLE foo ALTER COLUMN bar TYPE numeric(20, 2);

-- Only decrease the precision but keep the scale:
-- This is not safe and it rewrites the table.
ALTER TABLE foo ALTER COLUMN bar TYPE numeric(10, 2);
-- DEBUG:  rewriting table "foo"
-- DEBUG:  building index "foo_pkey" on table "foo" serially
-- DEBUG:  index "foo_pkey" can safely use deduplication

-- Only increase the scale, but keep the precision:
-- This is not safe and it rewrites the table.
ALTER TABLE foo ALTER COLUMN bar TYPE numeric(10, 4);
-- DEBUG:  rewriting table "foo"
-- DEBUG:  building index "foo_pkey" on table "foo" serially
-- DEBUG:  index "foo_pkey" can safely use deduplication

-- Only decrease the scale, but keep the precision:
-- This is not safe and it rewrites the table.
ALTER TABLE foo ALTER COLUMN bar TYPE numeric(10, 2);
-- DEBUG:  rewriting table "foo"
-- DEBUG:  building index "foo_pkey" on table "foo" serially
-- DEBUG:  index "foo_pkey" can safely use deduplication
```

## Details

The first few hundred lines of comments in the following source file provide a
lot of important information:

- https://github.com/postgres/postgres/blob/c4067383cb2c155c4cfea2351036709e2ebb3535/src/backend/utils/adt/numeric.c

More precisely:
- https://github.com/postgres/postgres/blob/c4067383cb2c155c4cfea2351036709e2ebb3535/src/backend/utils/adt/numeric.c#L1213
  `numeric_support` is used to defined whether the ALTER TABLE needs to rewrite the table or not.
