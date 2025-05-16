# Schema Permissions

```
Created at: 2025-05-09
```

- By default, users cannot access any objects in schemas they do not own
- To allow that, the owner of the schema must grant the USAGE privilege on the
  schema.
  ```sql
  CREATE SCHEMA IF NOT EXISTS sweet_schema;
  CREATE USER sweet_user;

  GRANT USAGE ON SCHEMA sweet_schema TO sweet_user;

  -- USAGE: accessing objects in the schema.
  -- CREATE: creating objects in the schema.
  SELECT
    has_schema_privilege('sweet_user', 'sweet_schema', 'USAGE') as usage_privilege,
    has_schema_privilege('sweet_user', 'sweet_schema', 'CREATE') as create_privilege;
  -- usage_privilege  | t
  -- create_privilege | f
  ```
- By default, every user has USAGE privilege in the "public" schema.
  ```sql
  SELECT
    has_schema_privilege('sweet_user', 'public', 'USAGE') as usage_privilege,
    has_schema_privilege('sweet_user', 'public', 'CREATE') as create_privilege;
  -- usage_privilege  | t
  -- create_privilege | f
  ```
- To allow users to make use of the objects in a schema, additional privileges
  might need to be granted, as appropriate for the object.
  ```sql
  DROP TABLE IF EXISTS sweet_schema.foo;
  CREATE TABLE sweet_schema.foo (id SERIAL PRIMARY KEY);
  INSERT INTO sweet_schema.foo SELECT generate_series(1, 1000);

  SELECT
    grantee,
    table_schema AS schema,
    table_name,
    privilege_type AS privilege,
    grantor
  FROM
    information_schema.table_privileges
  WHERE
    grantee = 'sweet_user';
  -- (0 rows)

  GRANT SELECT ON sweet_schema.foo TO sweet_user;
  GRANT INSERT ON sweet_schema.foo TO sweet_user;
  GRANT UPDATE ON sweet_schema.foo TO sweet_user;
  GRANT DELETE ON sweet_schema.foo TO sweet_user;
  GRANT TRUNCATE ON sweet_schema.foo TO sweet_user;
  GRANT REFERENCES ON sweet_schema.foo TO sweet_user;
  GRANT TRIGGER ON sweet_schema.foo TO sweet_user;
  --  grantee   |    schema    | table_name | privilege  |      grantor
  --------------+--------------+------------+------------+-------------------
  -- sweet_user | sweet_schema | foo        | INSERT     | marcelo.fernandes
  -- sweet_user | sweet_schema | foo        | SELECT     | marcelo.fernandes
  -- sweet_user | sweet_schema | foo        | UPDATE     | marcelo.fernandes
  -- sweet_user | sweet_schema | foo        | DELETE     | marcelo.fernandes
  -- sweet_user | sweet_schema | foo        | TRUNCATE   | marcelo.fernandes
  -- sweet_user | sweet_schema | foo        | REFERENCES | marcelo.fernandes
  -- sweet_user | sweet_schema | foo        | TRIGGER    | marcelo.fernandes
  ```

## Tips

For testing permissions, you can always:

```sql
SET ROLE sweet_user;
-- test stuff here
SET ROLE "marcelo.fernandes";
```

> In databases upgraded from PostgreSQL 14 or earlier, everyone has that
> privilege on the schema public. Some usage patterns call for revoking that
> privilege:

```sql
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
```
