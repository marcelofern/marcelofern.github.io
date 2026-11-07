# How Extensions Are Created

```
Created at: 2025-01-28
```

## Basics

To start a new extension you need at least:

- A script file to create the objects necessary for the extension.
- A control file specifying some properties of the extension.

If the extensions has C code:

- A shared library file into which the C code has been built.

## Benefits Of Extension vs Loose Scripts

1. Postgres understands extensions. So, for example, you can drop all objects
   related to an extension by having a `DROP EXTENSION`. This avoids having to
   maintain a separated "uninstall" script.

2. `pg_dump` knows to not dump individual member objects of the extension. It
   will just include a `CREATE EXTENSION` command in dumps. This simplifies
   migration to a new version of the extension that may contain different
   objects than the old version.

3. Postgres does not let individual objects of extensions to be dropped unless
   the whole extension (and therefore all objects) are dropped.

4. When upgrading an extension from version X to version Y, if the only changes
   were that an object was created and another has been modified, the extension
   author can provide an update script that just performs these alterations.
   The `ALTER EXTENSION UPDATE` command can then be used to apply these changes
   and track which version of the extension is actually installed in a given
   database.

## Control file

The control file must:

- be named as the extension plus the suffix `.control`.
- be placed in the `SHAREDIR/extension` directory inside the local Postgres
  installation. `pg_config --sharedir` will tell you what the SHAREDIR is. For
  example:
  ```
  [postgres15] build/bin/pg_config --sharedir
  /Users/marcelo.fernandes/workspace/postgres15/build/share
  ```

For example, this is the contents of the `pg_repack.control` file:

```
# pg_repack extension
comment = 'Reorganize tables in PostgreSQL databases with minimal locks'
default_version = '1.5.1'
module_pathname = '$libdir/pg_repack'
relocatable = false
```

- `module_pathname`: The value of this parameter will be substituted for each
  occurrence of `MODULE_PATHNAME` in the script file(s). If it is not set, no
  substitution is made. Typically, this is set to `$libdir/shared_library_name`
  and then MODULE_PATHNAME is used in CREATE FUNCTION commands for C-language
  functions, so that the script files do not need to hard-wire the name of the
  shared library. The `$libdir` variable can be obtained via `pg_config --libdir`.
  In my case it returns:
  `/Users/marcelo.fernandes/workspace/postgres15/build/lib`

- `relocatable`: An extension is relocatable if it is possible to move its
  contained objects into a different schema after initial creation of the
  extension. The default is false, i.e., the extension is not relocatable.

A list of available keys for the control file is available
[here](https://www.postgresql.org/docs/current/extend-extensions.html). There
aren't many, only 11.


## Script File

The script file:

- must follow the naming pattern `extension--version.sql` (for example,
  `bar--1.0.sql` for version 1.0 of extension bar)
- must by default, be placed on the `SHAREDIR/extension` directory of the local
  build. In my case `build/share/extension`. The control file might decide to
  specify a different location for the script file though.
- can contain any SQL commands. Except the transaction control ones
  (BEGIN/COMMIT) and commands that can't be executed inside a transaction block
  like VACUUM. This is because script files are implicitly executed within a
  transaction.

For example, this is the script file for `pg_repac--1.5.1.sql`:


```sql
CREATE SCHEMA repack;

CREATE FUNCTION repack.version() RETURNS text AS
'MODULE_PATHNAME', 'repack_version'
LANGUAGE C IMMUTABLE STRICT;

CREATE FUNCTION repack.version_sql() RETURNS text AS
$$SELECT 'pg_repack 1.5.1'::text$$
LANGUAGE SQL IMMUTABLE STRICT;

-- omitted ~300 lines
```

## Gotchas

> Also, while you can change the definition of an extension member object (for
> example, via CREATE OR REPLACE FUNCTION for a function), bear in mind that
> the modified definition will not be dumped by pg_dump. Such a change is
> usually only sensible if you concurrently make the same change in the
> extension's script file. (But there are special provisions for tables
> containing configuration data; see Section 36.17.3.) In production
> situations, it's generally better to create an extension update script to
> perform changes to extension member objects.

## Resources

- [https://www.postgresql.org/docs/current/extend-extensions.html](https://www.postgresql.org/docs/current/extend-extensions.html)

- [https://www.postgresql.org/docs/current/extend-pgxs.html](https://www.postgresql.org/docs/current/extend-pgxs.html)

- [https://github.com/IshaanAdarsh/Postgres-extension-tutorial/blob/main/SGML/intro_and_toc.md](https://github.com/IshaanAdarsh/Postgres-extension-tutorial/blob/main/SGML/intro_and_toc.md)
