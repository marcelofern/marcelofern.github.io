# Deadlock Demonstration

```
Created at: 2024-12-05
```

Given the following table:

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (id SERIAL, val integer UNIQUE);

INSERT INTO foo (val) SELECT generate_series(1, 1000);
```

Open two psql shells, let's call them A and B.

on A perform:

```sql
BEGIN;
SELECT * FROM foo WHERE val = 1 FOR UPDATE;
```

And on B perform:

```sql
BEGIN;
SELECT * FROM foo WHERE val = 2 FOR UPDATE;
```

Go back to A and perform:

```sql
UPDATE foo SET val = 42 WHERE val = 2
```

And go back to B and perform:

```sql
UPDATE foo SET val = 777 WHERE val = 1
```

You should see an error like:

```
ERROR:  deadlock detected
DETAIL:  Process 49152 waits for ShareLock on transaction 74166; blocked by process 51444.
Process 51444 waits for ShareLock on transaction 74165; blocked by process 49152.
```
