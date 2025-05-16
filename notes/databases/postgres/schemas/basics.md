# Schema Basics

```
Created at: 2025-05-05
```

## Creation And Deletion

```sql
CREATE SCHEMA myschema;
-- With authorisation for a user
CREATE SCHEMA schema_name AUTHORIZATION user_name;

-- Might have to use CASCADE if the schema isn't empty
DROP SCHEMA myschema;
DROP SCHEMA myschema CASCADE;
```

## Search Path

> Qualified names are tedious to write, and it's often best not to wire a
> particular schema name into applications anyway. Therefore tables are often
> referred to by unqualified names, which consist of just the table name. The
> system determines which table is meant by following a search path, which is a
> list of schemas to look in. The first matching table in the search path is
> taken to be the one wanted. If there is no match in the search path, an error
> is reported, even if matching table names exist in other schemas in the
> database.

```sql
SHOW search_path;
--  search_path
-- --------------
--  "$user", public


-- Allow querying tables without the `myschema.` prefix.
-- Warning, paths are selected in order, so if both myschema and public have a
-- table of the same name, myschema will return its table when selecting
-- without the schema prefix.
SET search_path TO myschema, public;
```

## Sequences Are Schema Aware

```sql
CREATE SCHEMA IF NOT EXISTS schema1;
CREATE SCHEMA IF NOT EXISTS schema2;

-- Create sequences with the same name in different schemas
CREATE SEQUENCE schema1.my_sequence;
CREATE SEQUENCE schema2.my_sequence;

-- Test that both sequences can exist and be used independently
SELECT nextval('schema1.my_sequence') AS schema1_seq;
SELECT nextval('schema2.my_sequence') AS schema2_seq;
```

## Functions Are Schema Aware

```sql
-- Create schemas
CREATE SCHEMA IF NOT EXISTS schema1;
CREATE SCHEMA IF NOT EXISTS schema2;

-- Create functions with the same name in different schemas
CREATE FUNCTION schema1.my_function() RETURNS text AS $$
BEGIN
    RETURN 'Function from schema1';
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION schema2.my_function() RETURNS text AS $$
BEGIN
    RETURN 'Function from schema2';
END;
$$ LANGUAGE plpgsql;

-- Test calling both functions
SELECT schema1.my_function() AS result_schema1;
SELECT schema2.my_function() AS result_schema2;
```

## Indexes Are Schema Aware

```sql
-- Create schemas
CREATE SCHEMA IF NOT EXISTS schema1;
CREATE SCHEMA IF NOT EXISTS schema2;

-- Create tables with the same name in different schemas
DROP TABLE IF EXISTS schema1.my_table CASCADE;
CREATE TABLE schema1.my_table (id serial PRIMARY KEY, name text);

DROP TABLE IF EXISTS schema2.my_table CASCADE;
CREATE TABLE schema2.my_table (id serial PRIMARY KEY, name text);

-- Create indexes on both tables
CREATE INDEX same_name_idx ON schema1.my_table(name);
CREATE INDEX same_name_idx ON schema2.my_table(name);

-- Test the existence of indexes
SELECT * FROM pg_indexes WHERE tablename = 'my_table' AND schemaname = 'schema1';
SELECT * FROM pg_indexes WHERE tablename = 'my_table' AND schemaname = 'schema2';
```

## A table from one schema can ref a table from another

```sql
-- Create two schemas
CREATE SCHEMA IF NOT EXISTS schema1;
CREATE SCHEMA IF NOT EXISTS schema2;

-- In schema1, create a referenced table
DROP TABLE IF EXISTS schema1.users CASCADE;
CREATE TABLE schema1.users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL
);
DO $$
BEGIN
    FOR i IN 1..100 LOOP
        INSERT INTO schema1.users (username)
        VALUES ('user_' || i);
    END LOOP;
END $$;

-- In schema2, create a table that references schema1.users
DROP TABLE IF EXISTS schema2.orders CASCADE;
CREATE TABLE schema2.orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES schema1.users(id)
);
DO $$
BEGIN
    FOR i IN 1..100 LOOP
        INSERT INTO schema2.orders (user_id)
        VALUES (FLOOR(RANDOM() * 100 + 1)::INT);
    END LOOP;
END $$;
```
