## Postgres

### Constraints

- [SET CONSTRAINTS](databases/postgres/constraints/set_constraints.md)
- [SET NOT NULL](databases/postgres/constraints/set_not_null.md)
- [EXCLUDE USING](databases/postgres/constraints/exclude_using.md)
- [Composite Primary Keys](databases/postgres/constraints/composite_primary_keys.md)

### Outages

- [FKs Without Downtime](databases/postgres/outages/fks_without_downtime.md)
- [Long Transactions](databases/postgres/outages/long_transactions.md)
- [DEFAULT](databases/postgres/outages/default.md)
- [Drop Column With Index](databases/postgres/outages/drop_column_with_index.md)
- [CHECK Constraints Without Downtime](databases/postgres/outages/check_constraints_without_downtime.md)
- [UNIQUE Constraints Without Downtime](databases/postgres/outages/unique_constraints_without_downtime.md)
- [Is This DDL Going To Rewrite The Table?](databases/postgres/outages/is_this_ddl_going_to_rewrite_the_table.md)
- [Renaming A Table Using VIEW](databases/postgres/outages/renaming_a_table_using_view.md)

### Indexing

- [Indexing for LIKE](databases/postgres/indexing/indexing_for_like.md)
- [Concurrent index during vacuum](databases/postgres/indexing/concurrent_index_during_vacuum.md)
- [Postgres BRIN index](databases/postgres/indexing/postgres_brin_index.md)
- [No Automatic Index on FKs](databases/postgres/indexing/no_automatic_index_on_fks.md)
- [DROP INDEX CONCURRENTLY](databases/postgres/indexing/drop_index_concurrently.md)
- [Composed index vs denormalised column index](databases/postgres/indexing/composed_index_vs_denormalised_column_index.md)
- [REINDEX CONCURRENTLY](databases/postgres/indexing/reindex_concurrently.md)
- [Visualising a btree index](databases/postgres/indexing/visualising_a_btree_index.md)
- [NULLS NOT DISTINCT](databases/postgres/indexing/nulls_not_distinct.md)

### Planning

- [A PSQL Planner Primer](databases/postgres/planning/a-psql-planner-primmer.md)

### Locks

- [`lock_timeout`](databases/postgres/locks/lock_timeout.md)
- [Locks cheatsheet](databases/postgres/locks/locks_cheatsheet.md)
- [Print lock for query](databases/postgres/locks/print_lock_for_query.md)
- [Deadlock Demonstration](databases/postgres/locks/deadlock_demonstration.md)
- [Advisory Lock](databases/postgres/locks/advisory_lock.md)
- [Drop trigger locks](databases/postgres/locks/drop_trigger_locks.md)

### Testing

- [Postgres Docker Container](databases/postgres/testing/postgres_docker_container.md)

### Performance

- [OR queries](databases/postgres/performance/or_queries.md)
- [JSON filtering vs text casting](databases/postgres/performance/json_filtering_vs_text_casting.md)
- [Table bloat](databases/postgres/performance/table_bloat.md)
- [Slow ORDER BY and LIMIT](databases/postgres/performance/slow_order_by_and_limit.md)
- [Fastest way to find if table is empty](databases/postgres/performance/fastest_way_to_find_if_table_is_empty.md)
- [UUID vs ID](databases/postgres/performance/uuids_vs_id.md)

### Internals

- [Building From Source](databases/postgres/internals/building_from_source.md)
- [Profiling Postgres On Linux](databases/postgres/internals/profiling_postgres_on_linux.md)
- [Profiling Postgres On Mac](databases/postgres/internals/profiling_postgres_on_mac.md)
- [Debugging Postgres](databases/postgres/internals/debugging_postgres.md)
- [How Postgres Implements Foreign Keys](databases/postgres/internals/how_postgres_implements_foreign_keys.md)
- [Swapping a Table With its Copy](databases/postgres/internals/swapping_a_table_with_its_copy.md)

### Disk

- [How table data is stored in disk](databases/postgres/disk/how_table_data_is_stored_in_disk.md)

### Extensions

- [pg_repack](databases/postgres/extensions/pg_repack.md)
- [pgcrypto](databases/postgres/extensions/pgcrypto.md)
- [how extensions are created](databases/postgres/extensions/how_extensions_are_created.md)

### Third Party Packages

- [pgroll](databases/postgres/third_party_packages/pgroll.md)

### Transactions

- [Transaction Isolation](databases/postgres/transactions/transaction_isolation.md)

### PSQL

- [A Basic psql Workflow](databases/postgres/psql/a_basic_psql_workflow.md)

### Vacuum

- [VACUUM Phases](databases/postgres/vacuum/vacuum_phases.md)
- [Replication slots blocking VACUUM](databases/postgres/vacuum/replication_slots_blocking_vacuum.md)

### Documentation

- [Postgres Documentation Syntax](databases/postgres/documentation/postgres_documentation_syntax.md)

### Fields

- [Choosing between varchar and varchar(n)](databases/postgres/fields/choosing_between_varchar_and_varchar_n.md)
- [Identity columns](databases/postgres/fields/identity_columns.md)

### WAL

- [WAL basics](databases/postgres/wal/basics.md)

## SQL

- [Mozilla SQL Style Guide](databases/sql/style_guides/mozilla.md)
