# ALTER SEQUENCE ... CYCLE

```
Created at: 2025-08-19
```

The CYCLE keyword means:

> The optional CYCLE key word can be used to enable the sequence to wrap around
> when the maxvalue or minvalue has been reached by an ascending or descending
> sequence respectively. If the limit is reached, the next number generated
> will be the minvalue or maxvalue, respectively.

Setting this value will update the `seqcycle` column in the `pg_sequence`
catalog table.

## Example

```sql
DROP TABLE IF EXISTS foo CASCADE;
CREATE SEQUENCE seq;
CREATE TABLE foo (id INTEGER);
ALTER TABLE foo ALTER COLUMN id SET DEFAULT nextval('seq');

ALTER SEQUENCE seq MINVALUE -2147483647 MAXVALUE 2147483647 CYCLE;
```

## SYNTAX for ALTER SEQUENCE

Syntax for ALTER SEQUENCE:
```
#> \h ALTER SEQUENCE
Command:     ALTER SEQUENCE
Description: change the definition of a sequence generator
Syntax:
ALTER SEQUENCE [ IF EXISTS ] name
    [ AS data_type ]
    [ INCREMENT [ BY ] increment ]
    [ MINVALUE minvalue | NO MINVALUE ] [ MAXVALUE maxvalue | NO MAXVALUE ]
    [ START [ WITH ] start ]
    [ RESTART [ [ WITH ] restart ] ]
    [ CACHE cache ] [ [ NO ] CYCLE ]
    [ OWNED BY { table_name.column_name | NONE } ]
ALTER SEQUENCE [ IF EXISTS ] name SET { LOGGED | UNLOGGED }
ALTER SEQUENCE [ IF EXISTS ] name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SEQUENCE [ IF EXISTS ] name RENAME TO new_name
ALTER SEQUENCE [ IF EXISTS ] name SET SCHEMA new_schema

URL: https://www.postgresql.org/docs/15/sql-altersequence.html
```
