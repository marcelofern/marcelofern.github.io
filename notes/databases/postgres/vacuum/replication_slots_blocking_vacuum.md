# Replication Slots Blocking VACUUM

```
Created at: 2025-01-14
```

## What Are Replication Slots

> Replication slots provide an automated way to ensure that the master does not
> remove WAL segments until they have been received by all standbys, and that
> the master does not remove rows which could cause a recovery conflict even
> when the standby is disconnected.
[source](https://www.postgresql.org/docs/9.4/warm-standby.html#STREAMING-REPLICATION-SLOTS)

In other words, replication slots keep WAL logs even when replicas (standbys)
get disconnected from master. This implies the master knows when replicas go
offline and holds onto the necessary WAL logs.

Once the replicas come back online, the WAL files are decoded and sent to the
replicas.

This feature was introduced in Postgres v9.4 to better enhance replication.
In previous versions, the `wal_keep_segment` had to be set to a high enough
value to keep the replica from lagging behind the master too much.

Setting this value to the correct number was tricky. Pick a value that is too
high and you have storage space problems in the `pg_wal` directory, pick a low
value and if insufficient you'd see an error like this instead:

> ERROR: requested WAL segment 005004430000129A00020041 has already been removed

## Why Can This Affect VACUUM

In another part of the documentation, this note is written:

> Note: Replication slots persist across crashes and know nothing about the
> state of their consumer(s). They will prevent removal of required resources
> even when there is no connection using them. This consumes storage because
> neither required WAL nor required rows from the system catalogs can be
> removed by VACUUM as long as they are required by a replication slot. So if a
> slot is no longer required it should be dropped.

This means that a replication slot will block vacuums, potentially for a long
time.

## Finding Replication Slots

Query the pg_replication_slots table.

```
select * from pg_replication_slots ;
 slot_name |   plugin    | slot_type | datoid |database| temporary | active | active_pid | xmin | catalog_xmin | restart_lsn | confirmed_flush_lsn | wal_status | safe_wal_size | two_phase
1234123444 | db_decoding | logical   |  16403 | my_db  | f         | f      |            |      |   1058047009 | A4/105C418  | A4/1190DE8          | lost       |               | f
1235999999 | db_decoding | logical   |  16403 | my_db  | f         | f      |            |      |   1157663725 | B9/206BB508 | B9/2070B0F0         | lost       |               | f
```

## Dropping Replication Slots

After dropping a replication slot, VACUUM should resume:

```sql
select pg_drop_replication_slot(‘ocean’);
```

## Creating Replication Slots

```sql
select pg_create_physical_replication_slot(‘ocean’);
```

## Outro

Useful links:

- https://hevodata.com/learn/postgresql-replication-slots/
