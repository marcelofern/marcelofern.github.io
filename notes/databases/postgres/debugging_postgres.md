# Debugging Postgres

```
Created at: 2024-10-28
```

To debug Postgres you must've first built it from source. I have a TBD note
about it.

You also need to build it with debug symbols, otherwise you won't be able to
debug through gdb. I recommend building with the `ggdb` flag.

## Example: Index Creation

```sql
CREATE DATABASE debug_index_creation;
```

Then \c into that database and create the following table and data:

```sql
DROP TABLE IF EXISTS example_table;
CREATE TABLE example_table (
    id SERIAL PRIMARY KEY,
    int_field INT NOT NULL
);

-- Add some rows.
INSERT INTO example_table (int_field)
SELECT generate_series(1, 100000) AS int_field;

VACUUM ANALYZE example_table;
```

Grab the PID for the session:

```sql
select pg_backend_pid();
-- 209878
```

In a separated shell, attach gdb to the process:

```sh
sudo gdb
(gdb) attach 209878

# Alternatively:
sudo gdb -p 209878
```

Now add a breakpoint in the `index_create` function:

```
(gdb) b index_create
Breakpoint 1 at 0x5611109f40a8: file index.c, line 721.
```

Now back in the psql shell, create the index:

```sh
CREATE UNIQUE INDEX unique_int_field ON example_table (int_field);
```

Now trace at the GDB (press n and/or c so you can hit the breakpoint).

Done!
