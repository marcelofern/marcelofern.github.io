## Postgres

### Constraints

- [SET CONSTRAINTS](notes/databases/postgres/constraints/set_constraints.md)
- [SET NOT NULL](notes/databases/postgres/constraints/set_not_null.md)
- [EXCLUDE USING](notes/databases/postgres/constraints/exclude_using.md)
- [Composite Primary Keys](notes/databases/postgres/constraints/composite_primary_keys.md)
- [Conditional and expression unique constraints](notes/databases/postgres/constraints/conditional_and_expression_unique_constraints.md)
- [Unique set of columns](notes/databases/postgres/constraints/unique_set_of_columns.md)

### Outages

- [FKs Without Downtime](notes/databases/postgres/outages/fks_without_downtime.md)
- [Long Transactions](notes/databases/postgres/outages/long_transactions.md)
- [DEFAULT](notes/databases/postgres/outages/default.md)
- [Drop Column With Index](notes/databases/postgres/outages/drop_column_with_index.md)
- [CHECK Constraints Without Downtime](notes/databases/postgres/outages/check_constraints_without_downtime.md)
- [UNIQUE Constraints Without Downtime](notes/databases/postgres/outages/unique_constraints_without_downtime.md)
- [Is This DDL Going To Rewrite The Table?](notes/databases/postgres/outages/is_this_ddl_going_to_rewrite_the_table.md)
- [Renaming A Table Using VIEW](notes/databases/postgres/outages/renaming_a_table_using_view.md)
- [Changing the precision of a field without downtime](notes/databases/postgres/outages/changing_the_precision_of_a_field_without_downtime.md)
- [Changing SERIAL column to IDENTITY Without Downtime](notes/databases/postgres/outages/changing_serial_column_to_identity_without_downtime.md)

### Indexing

- [Indexing for LIKE](notes/databases/postgres/indexing/indexing_for_like.md)
- [Concurrent index during vacuum](notes/databases/postgres/indexing/concurrent_index_during_vacuum.md)
- [Postgres BRIN index](notes/databases/postgres/indexing/postgres_brin_index.md)
- [No Automatic Index on FKs](notes/databases/postgres/indexing/no_automatic_index_on_fks.md)
- [DROP INDEX CONCURRENTLY](notes/databases/postgres/indexing/drop_index_concurrently.md)
- [Composed index vs denormalised column index](notes/databases/postgres/indexing/composed_index_vs_denormalised_column_index.md)
- [REINDEX CONCURRENTLY](notes/databases/postgres/indexing/reindex_concurrently.md)
- [Visualising a btree index](notes/databases/postgres/indexing/visualising_a_btree_index.md)
- [NULLS NOT DISTINCT](notes/databases/postgres/indexing/nulls_not_distinct.md)

### Planning

- [A PSQL Planner Primer](notes/databases/postgres/planning/a-psql-planner-primmer.md)

### Locks

- [lock_timeout](notes/databases/postgres/locks/lock_timeout.md)
- [Locks cheatsheet](notes/databases/postgres/locks/locks_cheatsheet.md)
- [Print lock for query](notes/databases/postgres/locks/print_lock_for_query.md)
- [Deadlock Demonstration](notes/databases/postgres/locks/deadlock_demonstration.md)
- [Advisory Lock](notes/databases/postgres/locks/advisory_lock.md)
- [Drop trigger locks](notes/databases/postgres/locks/drop_trigger_locks.md)
- [Row locks](notes/databases/postgres/locks/row_locks.md)

### Triggers

- [Get definition of a trigger](notes/databases/postgres/triggers/get_definition_of_a_trigger.md)

### Testing

- [Postgres Docker Container](notes/databases/postgres/testing/postgres_docker_container.md)

### Performance

- [OR queries](notes/databases/postgres/performance/or_queries.md)
- [JSON filtering vs text casting](notes/databases/postgres/performance/json_filtering_vs_text_casting.md)
- [Table bloat](notes/databases/postgres/performance/table_bloat.md)
- [Slow ORDER BY and LIMIT](notes/databases/postgres/performance/slow_order_by_and_limit.md)
- [Fastest way to find if table is empty](notes/databases/postgres/performance/fastest_way_to_find_if_table_is_empty.md)
- [UUID vs ID](notes/databases/postgres/performance/uuids_vs_id.md)
- [Unlogged Tables](notes/databases/postgres/performance/unlogged_tables.md)

### Internals

- [Building From Source](notes/databases/postgres/internals/building_from_source.md)
- [Profiling Postgres On Linux](notes/databases/postgres/internals/profiling_postgres_on_linux.md)
- [Profiling Postgres On Mac](notes/databases/postgres/internals/profiling_postgres_on_mac.md)
- [Debugging Postgres](notes/databases/postgres/internals/debugging_postgres.md)
- [How Postgres Implements Foreign Keys](notes/databases/postgres/internals/how_postgres_implements_foreign_keys.md)
- [Swapping a Table With its Copy](notes/databases/postgres/internals/swapping_a_table_with_its_copy.md)
- [Page Pruning](notes/databases/postgres/internals/page_pruning.md)
- [Fillfactor](notes/databases/postgres/internals/fillfactor.md)

### Disk

- [How table data is stored in disk](notes/databases/postgres/disk/how_table_data_is_stored_in_disk.md)

### Extensions

- [pg_repack](notes/databases/postgres/extensions/pg_repack.md)
- [pgcrypto](notes/databases/postgres/extensions/pgcrypto.md)
- [how extensions are created](notes/databases/postgres/extensions/how_extensions_are_created.md)

### Third Party Packages

- [pgroll](notes/databases/postgres/third_party_packages/pgroll.md)

### Transactions

- [Transaction Isolation](notes/databases/postgres/transactions/transaction_isolation.md)
- [Read only transactions](notes/databases/postgres/transactions/read_only_transactions.md)

### PSQL

- [A Basic psql Workflow](notes/databases/postgres/psql/a_basic_psql_workflow.md)

### Vacuum

- [VACUUM Phases](notes/databases/postgres/vacuum/vacuum_phases.md)
- [Replication slots blocking VACUUM](notes/databases/postgres/vacuum/replication_slots_blocking_vacuum.md)
- [Faster autovacuum](notes/databases/postgres/vacuum/faster_autovacuum.md)

### Replication

- [Replication basics](notes/databases/postgres/replication/basics.md)

### Documentation

- [Postgres Documentation Syntax](notes/databases/postgres/documentation/postgres_documentation_syntax.md)

### Fields

- [Choosing between varchar and varchar(n)](notes/databases/postgres/fields/choosing_between_varchar_and_varchar_n.md)
- [Identity columns](notes/databases/postgres/fields/identity_columns.md)
- [Updating jsonb columns](notes/databases/postgres/fields/updating_jsonb_columns.md)

### WAL

- [WAL basics](notes/databases/postgres/wal/basics.md)

### Sequences

- [ALTER SEQUENCE OWNED BY](notes/databases/postgres/sequences/alter_sequence_owned_by.md)
- [ALTER SEQUENCE CYCLE](notes/databases/postgres/sequences/alter_sequence_cycle.md)
- [Querying sequence information](notes/databases/postgres/sequences/querying_sequence_information.md)

### Functions

- [Get definition of a function](notes/databases/postgres/functions/get_definition_of_a_function.md)

### Isolation

- [Temporary tables](notes/databases/postgres/isolation/temporary_tables.md)

### Statistics

- [table statistics](notes/databases/postgres/statistics/table_statistics.md)

### Schemas

- [schemas basics](notes/databases/postgres/schemas/basics.md)

### Varchar

- [when does varchar schema changes become risky](notes/databases/postgres/varchar/when_does_varchar_schema_changes_become_risky.md)

### Permissions

- [schemas](notes/databases/postgres/permissions/schemas.md)
- [tables](notes/databases/postgres/permissions/tables.md)
- [functions](notes/databases/postgres/permissions/functions.md)
- [roles](notes/databases/postgres/permissions/roles.md)

## SQL

- [Mozilla SQL Style Guide](notes/databases/sql/style_guides/mozilla.md)
