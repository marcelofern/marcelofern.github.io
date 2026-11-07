# Visualising a btree index

## THIS IS UNDER DEVELOPMENT...

```
Created at: 2025-03-12
```

Let's create a simple btree index.

```sql
-- For bt_metap
CREATE EXTENSION IF NOT EXISTS pageinspect;

-- Set up a table with the index "foo_bar" and 10,000 rows.
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL PRIMARY KEY, bar varchar(255));
CREATE INDEX foo_bar ON foo (bar);

-- Insert 10,000 random 5-character strings
DO $$
BEGIN
    FOR i IN 1..10000 LOOP
        INSERT INTO foo (bar)
        VALUES (
            -- Generate a 10-character string with only letters (A-Z, a-z)
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int) ||
            chr(65 + floor(random() * 26)::int)
        );
    END LOOP;
END $$;
```

## Installing pageinspect_inspector

```sh
git clone https://github.com/marcelofern/pageinspect_inspector.git
cd pageinspect_inspector
python setup.py develop
```

To run it:

```sh
python inspector/command.py --host localhost --port 5415 --db index_view --user x --index foo_bar --path /tmp/btree.html && $BROWSER /tmp/btree.html
```

## READ

- http://www.louisemeta.com/drafts/indexes-btree/
- https://github.com/uds5501/postgres-page-inspector
