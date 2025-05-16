# Fillfactor

```
Created at: 2025-04-27
```

The fill factor of a table indicates the % of the table space that will be
filled with data. By default this value is 100%. The value can be altered on
a table basis, but it cannot be lower than 10%.

```sql
DROP TABLE IF EXISTS foo CASCADE;
CREATE TABLE foo (id SERIAL PRIMARY KEY);
INSERT INTO foo SELECT generate_series(1, 10000);

-- Verify the custom fillfactor from the table.
-- In this case it does not return anything, because there is no custom
-- fillfactor and the table is using the default.
SELECT reloptions
FROM pg_class
WHERE relname = 'foo';

ALTER TABLE foo SET (fillfactor = 30);

SELECT reloptions
FROM pg_class
WHERE relname = 'foo';
-- Now we've got the value.
--
--   reloptions
-------------------
-- {fillfactor=30}
```

## Limits

The fillfactor value cannot be under 10%:

```sql
ALTER TABLE foo SET (fillfactor = 5);

-- ERROR:  value 5 out of bounds for option "fillfactor"
-- DETAIL:  Valid values are between "10" and "100".
```

## Using lower values

When an INSERT operation tries to add a new row, it will only add it to a page
that is filled less than the fillfactor %. The rest of the space is kept for
UPDATE operations (no such space is reserved by default, when fillfactor is
100%).

This means that an update row is more likely to be inserted into the same page
as the old one - which is more efficient.

## Changing The Default For the Whole DB

As of now, I don't think the default can be changed.

I have looked at the `data/postgresql.conf` file - and also the
`share/postgresql.conf.sample` file, and couldn't see anything.

I've asked in the mailing list
[here](https://www.postgresql.org/message-id/flat/CAM2F1VMu747bv5X3wTvhzLQUWRaJzREdaS%3DcoVz%2BWjxkBjzvng%40mail.gmail.com)
