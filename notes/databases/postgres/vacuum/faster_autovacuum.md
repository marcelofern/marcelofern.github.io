# Faster autovacuum

```
Created at: 2025-04-30
```

In order to speed up autovacuum, you can disable `vacuum_index_cleanup`.

```sql
alter table foo set (vacuum_index_cleanup off);
```

## Index Cleanup

From the docs:

> Normally, VACUUM will skip index vacuuming when there are very few dead
> tuples in the table. The cost of processing all of the table's indexes is
> expected to greatly exceed the benefit of removing dead index tuples when
> this happens. This option can be used to force VACUUM to process indexes when
> there are more than zero dead tuples. The default is AUTO, which allows
> VACUUM to skip index vacuuming when appropriate. If INDEX_CLEANUP is set to
> ON, VACUUM will conservatively remove all dead tuples from indexes. This may
> be useful for backwards compatibility with earlier releases of PostgreSQL
> where this was the standard behavior.

> INDEX_CLEANUP can also be set to OFF to force VACUUM to always skip index
> vacuuming, even when there are many dead tuples in the table. This may be
> useful when it is necessary to make VACUUM run as quickly as possible to
> avoid imminent transaction ID wraparound (see Section 24.1.5). However, the
> wraparound failsafe mechanism controlled by vacuum_failsafe_age will
> generally trigger automatically to avoid transaction ID wraparound failure,
> and should be preferred. If index cleanup is not performed regularly,
> performance may suffer, because as the table is modified indexes will
> accumulate dead tuples and the table itself will accumulate dead line
> pointers that cannot be removed until index cleanup is completed.

> This option has no effect for tables that have no index and is ignored if the
> FULL option is used. It also has no effect on the transaction ID wraparound
> failsafe mechanism. When triggered it will skip index vacuuming, even when
> INDEX_CLEANUP is set to ON.

## What to do after

You will need to `REINDEX` the indexes that weren't vacuumed.
