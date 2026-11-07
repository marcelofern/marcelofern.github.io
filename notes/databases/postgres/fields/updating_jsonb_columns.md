# Updating JSONB columns

```
Created at: 2025-08-17
```

Postgres provides a helpful function to update a value in a jsonb column:

```
jsonb_set ( target jsonb, path text[], new_value jsonb [, create_if_missing boolean ] ) → jsonb
```
[source](https://www.postgresql.org/docs/17/functions-json.html)

## Example (no nested json fields)

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (
  id SERIAL PRIMARY KEY,
  bar JSONB
);
INSERT INTO foo (bar) VALUES
  (
    '{"hello": "world"}'
  ),
  (
    '{"hello": "friends"}'
  )
;

SELECT * FROM foo;
--  id |        bar
-- ----+--------------------
--   1 | {"hello": "world"}
--   2 | {"world": "hello"}
-- (2 rows)

UPDATE
  foo
SET
  bar = jsonb_set(bar, '{hello}', '"folks"', false)
WHERE
  bar->>'hello' = 'world'
;

SELECT * FROM foo;

--  id |         bar
-- ----+----------------------
--   1 | {"hello": "folks"}
--   2 | {"hello": "friends"}
```

## Example (nested json fields)

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (
  id SERIAL PRIMARY KEY,
  bar JSONB
);
INSERT INTO foo (bar) VALUES
  (
    '{"foo": {"bar" : "buzz"}}'
  ),
  (
    '{"buzz": {"bar": "foo"}}'
  )
;

SELECT * FROM foo;
--  id |           bar
-- ----+--------------------------
--   1 | {"foo": {"bar": "buzz"}}
--   2 | {"buzz": {"bar": "foo"}}

UPDATE
  foo
SET
  bar = jsonb_set(bar, '{foo,bar}', '"buzzbar"', false)
WHERE
  bar->'foo'->>'bar' = 'buzz'
;

SELECT * FROM foo;

--  id |             bar
-- ----+-----------------------------
--   2 | {"buzz": {"bar": "foo"}}
--   1 | {"foo": {"bar": "buzzbar"}}
```
