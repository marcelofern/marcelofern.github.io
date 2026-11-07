# Function Permissions

> EXECUTE

> Allows calling a function or procedure, including use of any operators that
> are implemented on top of the function. This is the only type of privilege
> that is applicable to functions and procedures.


Example:

```sql
CREATE USER sweet_user;

CREATE OR REPLACE FUNCTION public.add_numbers(a integer, b integer)
RETURNS integer
LANGUAGE sql
AS $$
    SELECT a + b;
$$;

-- Revoke all function privileges (for clarity), then grant only EXECUTE
REVOKE ALL ON FUNCTION public.add_numbers(integer, integer) FROM PUBLIC;

-- To make script idempotent
REVOKE ALL ON FUNCTION public.add_numbers(integer, integer) FROM sweet_user;

SELECT
  grantee,
  specific_name,
  routine_schema,
  routine_name,
  privilege_type
FROM
  information_schema.routine_privileges
WHERE
  routine_name = 'add_numbers'
  AND routine_schema = 'public';
--       grantee      |    specific_name    | routine_schema | routine_name | privilege_type
-- -------------------+---------------------+----------------+--------------+----------------
--  marcelo.fernandes | add_numbers_3716267 | public         | add_numbers  | EXECUTE

SET ROLE sweet_user;
SELECT public.add_numbers(2, 3);
-- ERROR:  permission denied for function add_numbers
SET ROLE "marcelo.fernandes";

GRANT EXECUTE ON FUNCTION public.add_numbers(integer, integer) TO sweet_user;
--       grantee      |    specific_name    | routine_schema | routine_name | privilege_type
-- -------------------+---------------------+----------------+--------------+----------------
--  marcelo.fernandes | add_numbers_3716267 | public         | add_numbers  | EXECUTE
--  sweet_user        | add_numbers_3716267 | public         | add_numbers  | EXECUTE

SET ROLE sweet_user;
SELECT public.add_numbers(2, 3);
SET ROLE "marcelo.fernandes";
```

## What if sweet_user wants to create their own functions?

They will need to have "CREATE" privilege in the schema.

```sql
SET ROLE "marcelo.fernandes";

GRANT CREATE ON SCHEMA "public" TO sweet_user;

SET ROLE sweet_user;

CREATE OR REPLACE FUNCTION public.new_add_numbers(a integer, b integer)
RETURNS integer
LANGUAGE sql
AS $$
    SELECT a + b;
$$;

SELECT public.add_numbers(2, 3);
SET ROLE "marcelo.fernandes";
```

## Tips

For testing permissions, you can always:

```sql
SET ROLE sweet_user;
-- test stuff here
SET ROLE "marcelo.fernandes";
```
