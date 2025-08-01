# Basics of Replication

```
Created at: 2025-05-25
```

Source:
https://www.highgo.ca/2023/04/03/setting-up-a-postgresql-replica-server-locally/

## Physical Replication With Streaming

1. Log onto psql with an admin user.
2. Create a replication user and a table to play with.
   ```sql
   CREATE ROLE rep_user WITH REPLICATION LOGIN PASSWORD 'rep_pass';
   CREATE TABLE t1(a INT, b INT);
   INSERT INTO t1 VALUES (1,2);
   ```
3. Update the `build/data/postgresql.conf` by adding this line:
   ```
   listen_addresses = 'localhost'
   ```
4. Update the `build/data/pg_hba.conf` by adding this line:
   ```
   host  replication   rep_user  localhost   md5
   ```
5. Run `pg_basebackup` to create a `rep/` folder with the replica data.
   ```
   build/bin/pg_basebackup -h localhost \
                           -U rep_user \
                           -X stream \
                           -C \
                           -S replica_1 \
                           -v \
                           -R \
                           -W \
                           -D build/rep
   ```
6. Update `build/rep/postgresql.conf` and set the port number to something
   different than the main server.
   ```
   port = 5454
   ```
7. Still in `build/rep/postgresql.conf` set primary_conninfo to (change the
   user accordingly):
   ```
   primary_conninfo = 'dbname=postgres user=postgres host=localhost port=5432 sslmode=disable'
   ```
8. Create the `sandby.signal` file:
   ```
   touch build/rep/standby.signal
   ```
9. Restart the primary Postgres server.
10. In a second terminal, start the replica.
    ```
    build/bin/pg_ctl -D build/rep start
    ```
11. Log onto the replica with:
    ```
    build/bin/psql --port=5454 --dbname=postgres
    ```
12. Stop the replica with:
    ```
    build/bin/pg_ctl -D build/rep stop
    ```
