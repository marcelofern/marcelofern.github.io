# Table Permissions

```
Created at: 2025-05-09
```

## Basics

- When an object is created, it is assigned an owner.
- The owner is normally the role that executed the creation statement.
- For most kinds of objects, the initial state is that only the owner (or a
  superuser) can do anything with the object.
- The privileges applicable to a particular object vary depending on the
  object's type (table, function, etc.).
- The right to modify or destroy an object is inherent in being the object's
  owner, and cannot be granted or revoked in itself.

## Ownership

- An object can be assigned to a new owner with an ALTER command of the
  appropriate kind for the object, for example:
  ```sql
  CREATE USER sweet_user;

  DROP TABLE IF EXISTS public.foo;
  CREATE TABLE public.foo (id SERIAL PRIMARY KEY);
  INSERT INTO public.foo SELECT generate_series(1, 1000);

  SELECT
    grantee,
    table_schema AS schema,
    table_name,
    privilege_type AS privilege,
    grantor
  FROM
    information_schema.table_privileges
  WHERE
    table_name = 'foo'
    AND table_schema = 'public';
  -- (0 rows)
  --      grantee      | schema | table_name | privilege  |      grantor
  ---------------------+--------+------------+------------+-------------------
  -- marcelo.fernandes | public | foo        | INSERT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | SELECT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | UPDATE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | DELETE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRUNCATE   | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | REFERENCES | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRIGGER    | marcelo.fernandes

  -- Remember: The right to modify or destroy an object is inherent in being
  -- the object's owner
  ALTER TABLE public.foo OWNER TO sweet_user;
  --  grantee   | schema | table_name | privilege  |  grantor
  --------------+--------+------------+------------+------------
  -- sweet_user | public | foo        | INSERT     | sweet_user
  -- sweet_user | public | foo        | SELECT     | sweet_user
  -- sweet_user | public | foo        | UPDATE     | sweet_user
  -- sweet_user | public | foo        | DELETE     | sweet_user
  -- sweet_user | public | foo        | TRUNCATE   | sweet_user
  -- sweet_user | public | foo        | REFERENCES | sweet_user
  -- sweet_user | public | foo        | TRIGGER    | sweet_user

  -- Current user has is an admin, so can still see the table.
  SELECT count(*) FROM public.foo;
  -- (count 1,000)

  -- And can grab ownership again.
  ALTER TABLE public.foo OWNER TO "marcelo.fernandes";
  ```

## Granting Specific Privileges

- To assign privileges, the GRANT command is used.
  ```sql
  GRANT SELECT ON public.foo TO sweet_user;
  GRANT INSERT ON public.foo TO sweet_user;
  GRANT UPDATE ON public.foo TO sweet_user;
  GRANT DELETE ON public.foo TO sweet_user;
  GRANT TRUNCATE ON public.foo TO sweet_user;
  GRANT REFERENCES ON public.foo TO sweet_user;  -- can create fks on the table
  GRANT TRIGGER ON public.foo TO sweet_user;
  -- Short:
  -- GRANT ALL ON TABLE public.foo TO sweet_user;

  SELECT
    grantee,
    table_schema AS schema,
    table_name,
    privilege_type AS privilege,
    grantor
  FROM
    information_schema.table_privileges
  WHERE
    table_name = 'foo'
    AND table_schema = 'public';
  --      grantee      | schema | table_name | privilege  |      grantor
  ---------------------+--------+------------+------------+-------------------
  -- marcelo.fernandes | public | foo        | INSERT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | SELECT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | UPDATE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | DELETE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRUNCATE   | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | REFERENCES | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRIGGER    | marcelo.fernandes
  -- sweet_user        | public | foo        | INSERT     | marcelo.fernandes
  -- sweet_user        | public | foo        | SELECT     | marcelo.fernandes
  -- sweet_user        | public | foo        | UPDATE     | marcelo.fernandes
  -- sweet_user        | public | foo        | DELETE     | marcelo.fernandes
  -- sweet_user        | public | foo        | TRUNCATE   | marcelo.fernandes
  -- sweet_user        | public | foo        | REFERENCES | marcelo.fernandes
  -- sweet_user        | public | foo        | TRIGGER    | marcelo.fernandes
  ```

- You can use `ALL` to grant or revoke ALL privileges.
  ```sql
  REVOKE ALL ON public.foo FROM sweet_user;
  --      grantee      | schema | table_name | privilege  |      grantor
  ---------------------+--------+------------+------------+-------------------
  -- marcelo.fernandes | public | foo        | INSERT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | SELECT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | UPDATE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | DELETE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRUNCATE   | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | REFERENCES | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRIGGER    | marcelo.fernandes

  GRANT ALL ON public.foo TO sweet_user;
  --      grantee      | schema | table_name | privilege  |      grantor
  ---------------------+--------+------------+------------+-------------------
  -- marcelo.fernandes | public | foo        | INSERT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | SELECT     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | UPDATE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | DELETE     | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRUNCATE   | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | REFERENCES | marcelo.fernandes
  -- marcelo.fernandes | public | foo        | TRIGGER    | marcelo.fernandes
  -- sweet_user        | public | foo        | INSERT     | marcelo.fernandes
  -- sweet_user        | public | foo        | SELECT     | marcelo.fernandes
  -- sweet_user        | public | foo        | UPDATE     | marcelo.fernandes
  -- sweet_user        | public | foo        | DELETE     | marcelo.fernandes
  -- sweet_user        | public | foo        | TRUNCATE   | marcelo.fernandes
  -- sweet_user        | public | foo        | REFERENCES | marcelo.fernandes
  -- sweet_user        | public | foo        | TRIGGER    | marcelo.fernandes
  ```

## Table Privileges

The full list of privileges can be seen here:
https://www.postgresql.org/docs/current/ddl-priv.html

But the interesting bits are:

- You can grant SELECT to specific columns:
```sql
  REVOKE ALL ON public.foo FROM sweet_user;
  ALTER TABLE public.foo ADD COLUMN bar INTEGER DEFAULT 42;

  GRANT SELECT (bar) ON public.foo TO sweet_user;

  -- The user doesn't show up here because it does not have TABLE privileges.
  SELECT
    grantee,
    table_schema AS schema,
    table_name,
    privilege_type AS privilege,
    grantor
  FROM
    information_schema.table_privileges
  WHERE
    table_name = 'foo'
    AND table_schema = 'public';

  -- But it does show up here as they now have COLUMN privileges.
  SELECT
    grantee,
    table_schema,
    table_name,
    column_name,
    privilege_type
  FROM
    information_schema.column_privileges
  WHERE privilege_type = 'SELECT'
    AND table_name = 'foo'
    AND table_schema = 'public';
  --      grantee      | table_schema | table_name | column_name | privilege_type
  ---------------------+--------------+------------+-------------+----------------
  -- marcelo.fernandes | public       | foo        | bar         | SELECT
  -- marcelo.fernandes | public       | foo        | id          | SELECT
  -- sweet_user        | public       | foo        | bar         | SELECT
  ```

- You can do the same as above for the INSERT and UPDATE

## Can the user be blocked from querying a table even when they have CREATE
## permission in the schema?

```sql
CREATE USER user1;
CREATE USER user2;

DROP TABLE IF EXISTS public.foo;
CREATE TABLE public.foo (id SERIAL PRIMARY KEY);
INSERT INTO public.foo SELECT generate_series(1, 1000);

SET ROLE user1;
SELECT * FROM public.foo;
-- ERROR:  permission denied for table foo

SET ROLE user2;
SELECT * FROM public.foo;
-- ERROR:  permission denied for table foo

SET ROLE "marcelo.fernandes";

-- User 1 has permission to the table
GRANT SELECT ON public.foo TO user1;
-- User 2 has permission to the schema
GRANT CREATE ON SCHEMA public TO user2;

SET ROLE user1;
SELECT count(*) FROM public.foo; -- 1,000
SET ROLE "marcelo.fernandes";

-- Still permission denied!
SET ROLE user2;
SELECT count(*) FROM public.foo;
-- ERROR:  permission denied for table foo
SET ROLE "marcelo.fernandes";
```

## Tips

For testing permissions, you can always:

```sql
SET ROLE sweet_user;
-- test stuff here
SET ROLE "marcelo.fernandes";
```
