# How Postgres Implements Foreign Keys

```
Created at: 2025-01-10
```

In order to implement foreign keys, Postgres creates 2 triggers in the
referring table and 2 triggers in the referenced table

## Referring Table Triggers

- `AFTER INSERT` and `AFTER UPDATE` row-level triggers. Such triggers verify
  the new row containing non-null foreign key field in the referring table
  points to an existing row in the referenced table.

## Referred Table Triggers

- `AFTER UPDATE` and `AFTER DELETE` row-level triggers. Such triggers verify
  that UPDATEs and DELETEs don't culminate in invalid links in the referring
  table. If "CASCADING" it will also delete the orphaned row in the referring
  table.

## Seeing The Code For The Triggers

Psql doesn't show them. But we can find them through the `pg_trigger` table.

```sql
SELECT tgname AS trigger_name,
       tgisinternal AS internal,
       CASE WHEN tgtype & 2 = 2 THEN 'BEFORE ' ELSE 'AFTER ' END ||
       CASE tgtype & 60
          WHEN 4  THEN 'INSERT'
          WHEN 8  THEN 'DELETE'
          WHEN 16 THEN 'UPDATE'
          ELSE '?'
       END ||
       ' FOR EACH ' ||
       CASE WHEN tgtype & 1 = 1 THEN 'ROW' ELSE 'STATEMENT' END
          AS firing_conditions
FROM pg_trigger
WHERE tgrelid = '<table_name>'::regclass;
```

The result should show the trigger names and their firing conditions:

```
          trigger_name          | internal |     firing_conditions
--------------------------------+----------+---------------------------
 RI_ConstraintTrigger_a_2044997 | t        | AFTER DELETE FOR EACH ROW
 RI_ConstraintTrigger_a_2044998 | t        | AFTER UPDATE FOR EACH ROW
 RI_ConstraintTrigger_c_2044999 | t        | AFTER INSERT FOR EACH ROW
 RI_ConstraintTrigger_c_2045000 | t        | AFTER UPDATE FOR EACH ROW
```

The `_a_` stands for action constraints, which are created in the referred
table. [source code](https://github.com/postgres/postgres/blob/bebe9040388bb2292585eab712fe4d29a71843fb/src/backend/commands/tablecmds.c#L12692)

The `_c_` stands for the "check" constraints, which are created in the
referring table. [source
code](https://github.com/postgres/postgres/blob/bebe9040388bb2292585eab712fe4d29a71843fb/src/backend/commands/tablecmds.c#L12629)

## Side note about using cascade to drop the column

If you try to drop a column that is used as foreign key by another table,
you'll see an error when not using CASCADE (default is RESTRICT):

```sql
BEGIN;

DROP TABLE IF EXISTS refered CASCADE;
CREATE TABLE refered (id serial, int_field int unique);

DROP TABLE IF EXISTS referencing CASCADE;
CREATE TABLE referencing (id serial);

INSERT INTO refered (int_field) SELECT generate_series(1, 10000);

ALTER TABLE "referencing" ADD COLUMN "refered_int_field" int NULL
CONSTRAINT "delete_this_soon"
REFERENCES "refered"("int_field")
DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE refered DROP COLUMN int_field RESTRICT;

ROLLBACK;
```

```
ERROR:  cannot drop column int_field of table refered because other objects
depend on it.

DETAIL:  constraint delete_this_soon on table referencing depends on column
int_field of table refered

HINT:  Use DROP ... CASCADE to drop the dependent objects too.
```

## Locks

Here are the locks involved in adding the FK:

```
 locktype |         mode          | granted | relation |   relname   |                               query                               |  lock_duration  
----------+-----------------------+---------+----------+-------------+-------------------------------------------------------------------+-----------------
 relation | AccessShareLock       | t       |  2673969 | referencing | ALTER TABLE "referencing" ADD COLUMN "refered_int_field" int NULL+| 00:00:22.996175
          |                       |         |          |             | CONSTRAINT "delete_this_soon"                                    +| 
          |                       |         |          |             | REFERENCES "refered"("int_field")                                +| 
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED;                                    | 
 relation | ShareRowExclusiveLock | t       |  2673969 | referencing | ALTER TABLE "referencing" ADD COLUMN "refered_int_field" int NULL+| 00:00:22.996175
          |                       |         |          |             | CONSTRAINT "delete_this_soon"                                    +| 
          |                       |         |          |             | REFERENCES "refered"("int_field")                                +| 
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED;                                    | 
 relation | AccessExclusiveLock   | t       |  2673969 | referencing | ALTER TABLE "referencing" ADD COLUMN "refered_int_field" int NULL+| 00:00:22.996175
          |                       |         |          |             | CONSTRAINT "delete_this_soon"                                    +| 
          |                       |         |          |             | REFERENCES "refered"("int_field")                                +| 
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED;                                    | 
 relation | AccessShareLock       | t       |  2673962 | refered     | ALTER TABLE "referencing" ADD COLUMN "refered_int_field" int NULL+| 00:00:22.996175
          |                       |         |          |             | CONSTRAINT "delete_this_soon"                                    +| 
          |                       |         |          |             | REFERENCES "refered"("int_field")                                +| 
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED;                                    | 
 relation | ShareRowExclusiveLock | t       |  2673962 | refered     | ALTER TABLE "referencing" ADD COLUMN "refered_int_field" int NULL+| 00:00:22.996175
          |                       |         |          |             | CONSTRAINT "delete_this_soon"                                    +| 
          |                       |         |          |             | REFERENCES "refered"("int_field")                                +| 
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED;                                    | 
(5 rows)
```
