# ALTER SEQUENCE ONWED BY

```
Created at: 2025-04-22
```

When a user creates a table and sets the primary key of that table to follow
a default from a sequence, the DDL changes can look like this:

```sql
DROP TABLE IF EXISTS foo CASCADE;
CREATE SEQUENCE seq;
CREATE TABLE foo (id INTEGER);
ALTER TABLE foo ALTER COLUMN id SET DEFAULT nextval('seq');
```

Once this table is out in the wild, you might have reason to figure out the
name of the sequence being used by foo.id:

```sql
SELECT pg_get_serial_sequence('foo', 'id');
-- returns no results
```

However, this returns no results. `pg_get_serial_sequence` looks for
`pg_depend` entries, and in this case there isn't one.

This can be changed:

```sql
ALTER SEQUENCE seq OWNED BY foo.id;
```

And now you get results:

```
 pg_get_serial_sequence
------------------------
 public.seq
```

## SERIAL fields

If using a `SERIAL` field, Postgres will do that for you for free.
This:

```sql
CREATE TABLE tablename (
    colname SERIAL
);
```

Is the equivalent of:

```sql
CREATE SEQUENCE tablename_colname_seq AS integer;
CREATE TABLE tablename (
    colname integer NOT NULL DEFAULT nextval('tablename_colname_seq')
);
ALTER SEQUENCE tablename_colname_seq OWNED BY tablename.colname;
```

The
[docs](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL)
says:

> Lastly, the sequence is marked as “owned by” the column, so that it will be
> dropped if the column or table is dropped.

## Gotcha of SERIAL columns

> Because smallserial, serial and bigserial are implemented using sequences,
> there may be "holes" or gaps in the sequence of values which appears in the
> column, even if no rows are ever deleted. A value allocated from the sequence
> is still "used up" even if a row containing that value is never successfully
> inserted into the table column. This may happen, for example, if the
> inserting transaction rolls back. See nextval() in Section 9.17 for details.
