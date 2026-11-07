# Roles

```
Created at: 2025-07-01
```

CREATE USER and CREATE GROUP which are both aliases for CREATE ROLE.
In postgres, roles, groups, and users have all been merged to the same concept.

In practice nothing changes. Roles can inherit from other roles, be used to
create tables, to login, etc.

```sql
-- Roles and users are effectively the same thing in modern Postgres versions.
-- Roles can log in, inherit other roles, access db objects, etc.
CREATE ROLE sweet_role;
CREATE USER sweet_user;
GRANT sweet_role TO sweet_user;
SELECT
  rolname,
  rolinherit
FROM
  pg_roles
WHERE
  rolname = 'sweet_role';
--   rolname   | rolinherit
-- ------------+------------
--  sweet_role | t


-- The default is to have INHERIT, but we add it for clarification.
CREATE ROLE inherited_sweet_role WITH INHERIT;
GRANT sweet_role TO inherited_sweet_role;
SELECT
  rolname,
  rolinherit
FROM
  pg_roles
WHERE
  rolname = 'inherited_sweet_role';
--   rolname   | rolinherit
-- ------------+------------
--  inherited_sweet_role | t

-- Create a table and grant ownership to sweet_role.
DROP TABLE IF EXISTS public.foo;
CREATE TABLE public.foo (id SERIAL PRIMARY KEY);
ALTER TABLE public.foo OWNER TO "sweet_role";

-- The inherited role does not show up on this query.
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
--   grantee   | schema | table_name | privilege  |  grantor
-- ------------+--------+------------+------------+------------
--  sweet_role | public | foo        | INSERT     | sweet_role
--  sweet_role | public | foo        | SELECT     | sweet_role
--  sweet_role | public | foo        | UPDATE     | sweet_role
--  sweet_role | public | foo        | DELETE     | sweet_role
--  sweet_role | public | foo        | TRUNCATE   | sweet_role
--  sweet_role | public | foo        | REFERENCES | sweet_role
--  sweet_role | public | foo        | TRIGGER    | sweet_role

-- But you can check membership as such:
-- pg_has_role ( [ user name or oid, ] role text or oid, privilege text )
--
-- Allowable privilege types are MEMBER, USAGE, and SET. MEMBER denotes direct
-- or indirect membership in the role without regard to what specific privileges
-- may be conferred. USAGE denotes whether the privileges of the role are
-- immediately available without doing SET ROLE, while SET denotes whether it is
-- possible to change to the role using the SET ROLE command. SELECT
SELECT pg_has_role('inherited_sweet_role', 'sweet_role', 'MEMBER');
-- pg_has_role
-------------
-- t

-- The ultimate proof:
SET ROLE TO 'inherited_sweet_role';
SELECT * FROM public.foo;
INSERT INTO foo (id) VALUES (1);

SET ROLE TO 'marcelo.fernandes'; -- admin user
CREATE ROLE role_without_ownership;
SET ROLE TO role_without_ownership;

SELECT * FROM public.foo;
-- ERROR:  permission denied for table foo
```
