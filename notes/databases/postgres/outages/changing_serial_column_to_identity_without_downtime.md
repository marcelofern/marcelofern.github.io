# Changing SERIAL column to IDENTITY without downtime

```
Created at: 2025-11-17
```

Tested on Postgres 15.

```sql
-- Make the script idempotent
DROP TABLE IF EXISTS foo;

-- Add a table with a SERIAL PK
CREATE TABLE foo (id SERIAL PRIMARY KEY);

-- Seed it with some rows
DO $$
BEGIN
    FOR i IN 1..100 LOOP
        INSERT INTO foo DEFAULT VALUES;
    END LOOP;
END $$;

SET client_min_messages=debug1;

-- Use an anonymous code block with DO to store the value of the
-- original sequence before dropping it.
DO $$
DECLARE
    seq_name text;
    last_value bigint;
    restart_value bigint;
BEGIN
    LOCK TABLE foo IN ACCESS EXCLUSIVE MODE;

    seq_name := pg_get_serial_sequence('foo', 'id');
    RAISE NOTICE 'The sequence name is: %', seq_name;

    -- Retrieve the last value of the sequence
    -- EXECUTE format('SELECT last_value FROM %I', seq_name) INTO last_value;
    EXECUTE 'SELECT last_value FROM ' || seq_name INTO last_value;
    RAISE NOTICE 'The last value of the sequence is: %', last_value;

    -- Drop the field default, else we'd get the error:
    -- column "id" of relation "foo" already has a default value.
    ALTER TABLE foo ALTER COLUMN id DROP DEFAULT;

    -- Set the column to be GENERATED ALWAYS AS IDENTITY with the restart value
    -- as last_value + 1
    restart_value := last_value + 1;
    RAISE NOTICE 'The next value of the new sequence will be: %', restart_value;
    ALTER TABLE foo ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
    EXECUTE format('ALTER TABLE foo ALTER COLUMN id RESTART WITH %s', restart_value);
COMMIT;
END $$;

-- Insert data into foo to validate there's no duplicated id conflict.
INSERT INTO foo DEFAULT VALUES;
```
