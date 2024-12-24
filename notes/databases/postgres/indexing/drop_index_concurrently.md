# DROP INDEX CONCURRENTLY

The drop index concurrently happens on stages.

[The original suggestion for
implementation](http://web.archive.org/web/20240822023238/https://postgrespro.com/list/thread-id/1788181)
raised the following:

> 1) set an index as "invalid", to ensure no backend will use it in planning.

> 2) wait for the xmin horizon to advance to ensure no open snapshots that may
> not see the invalidation of the index are gone (is there a way to tighten
> that up? although even this conservative version would be 80-90% of the value
> for us...).

> 3) then use performDeletions without taking a lock on the parent table,
> similar to what's in tablecmds.c already.

> A DROP INDEX CONCURRENTLY may leave an invalid index if aborted instead of
> waiting for statement confirmation, just like CREATE INDEX CONCURRENTLY.

The following is a sandbox that will touch on the final note above regarding
leaving the index as INVALID when the DROP INDEX operation is aborted.

```sql
-- 1. Create a Test Database and Connect
CREATE DATABASE test_db;
\c test_db;

-- 2. Create a Test Table
CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    data VARCHAR(100)
);

-- 3. Insert Sample Data
INSERT INTO test_table (data)
SELECT md5(random()::text)
FROM generate_series(1, 100000);

-- 4. Create an Index on the 'data' column
CREATE INDEX test_index ON test_table(data);

-- 5. Raise the lock_timeout to a very low value (e.g., 1 second)
SET lock_timeout = '100ms';

-- 6. [SESSION 2] Open another session to hold a lock on the table
-- (Simulate a long-running transaction) Run this in a separate psql session or
-- as a different transaction block:
BEGIN;
SELECT * FROM test_table FOR UPDATE limit 5;

-- 7. [ORIGINAL SESSION] Attempt to Drop the Index (This should time out due to
-- the lock)
DROP INDEX CONCURRENTLY IF EXISTS test_index;

-- 8. [SESSION 2] End the Transaction in the other session
COMMIT;
```

This was the main patch provided in the original discussion that implemented
the DROP INDEX CONCURRENTLY operation:

```diff
+	 * Drop Index concurrently is similar in many ways to creating an
+	 * index concurrently, so some actions are similar to DefineIndex()
+	 */
+	if (concurrent)
+	{
+		/*
+		 * Mark index invalid by updating its pg_index entry
+		 *
+		 * Don't Assert(indexForm->indisvalid) because we may be trying to
+		 * clear up after an error when trying to create an index which left
+		 * the index invalid
+		 */
+		indexRelation = heap_open(IndexRelationId, RowExclusiveLock);
+
+		tuple = SearchSysCacheCopy1(INDEXRELID,
+										 ObjectIdGetDatum(indexId));
+		if (!HeapTupleIsValid(tuple))
+			elog(ERROR, "cache lookup failed for index %u", indexId);
+		indexForm = (Form_pg_index) GETSTRUCT(tuple);
+
+		indexForm->indisvalid = false;	/* make unusable for queries */
+		indexForm->indisready = false;	/* make invisible to changes */
+
+		simple_heap_update(indexRelation, &tuple->t_self, tuple);
+		CatalogUpdateIndexes(indexRelation, tuple);
+
+		heap_close(indexRelation, RowExclusiveLock);
+
+		/*
+		 * Invalidate the relcache for the table, so that after this
+		 * transaction we will refresh the index list. Forgetting just the
+		 * index is not enough.
+		 */
+		CacheInvalidateRelcache(userHeapRelation);
+
+		/* save lockrelid and locktag for below, then close but keep locks */
+		heaprelid = userHeapRelation->rd_lockInfo.lockRelId;
+		SET_LOCKTAG_RELATION(heaplocktag, heaprelid.dbId, heaprelid.relId);
+		heap_close(userHeapRelation, NoLock);
+
+		indexrelid = userIndexRelation->rd_lockInfo.lockRelId;
+		SET_LOCKTAG_RELATION(indexlocktag, indexrelid.dbId, indexrelid.relId);
+		index_close(userIndexRelation, NoLock);
+
+		/*
+		 * For a concurrent drop, it's important to make the catalog entries
+		 * visible to other transactions before we drop the index. The index
+		 * will be marked not indisvalid, so that no one else tries to either
+		 * insert into it or use it for queries.
+		 *
+		 * We must commit our current transaction so that the index update becomes
+		 * visible; then start another.  Note that all the data structures we just
+		 * built are lost in the commit.  The only data we keep past here are the
+		 * relation IDs.
+		 *
+		 * Before committing, get a session-level lock on the table, to ensure
+		 * that neither it nor the index can be dropped before we finish. This
+		 * cannot block, even if someone else is waiting for access, because we
+		 * already have the same lock within our transaction.
+		 */
+		LockRelationIdForSession(&heaprelid, ShareUpdateExclusiveLock);
+		LockRelationIdForSession(&indexrelid, ShareUpdateExclusiveLock);
+
+		PopActiveSnapshot();
+		CommitTransactionCommand();
+		StartTransactionCommand();
+
+		/*
+		 * Now we must wait until no running transaction could have the table open
+		 * with the old list of indexes.  To do this, inquire which xacts
+		 * currently would conflict with AccessExclusiveLock on the table -- ie,
+		 * which ones have a lock of any kind on the table.	Then wait for each of
+		 * these xacts to commit or abort.	Note we do not need to worry about
+		 * xacts that open the table for writing after this point; they will see
+		 * the index as invalid when they open the relation.
+		 *
+		 * Note: the reason we use actual lock acquisition here, rather than just
+		 * checking the ProcArray and sleeping, is that deadlock is possible if
+		 * one of the transactions in question is blocked trying to acquire an
+		 * exclusive lock on our table.  The lock code will detect deadlock and
+		 * error out properly.
+		 *
+		 * Note: GetLockConflicts() never reports our own xid, hence we need not
+		 * check for that.	Also, prepared xacts are not reported, which is fine
+		 * since they certainly aren't going to do anything more.
+		 */
+		old_lockholders = GetLockConflicts(&heaplocktag, AccessExclusiveLock);
+
+		while (VirtualTransactionIdIsValid(*old_lockholders))
+		{
+			VirtualXactLock(*old_lockholders, true);
+			old_lockholders++;
+		}
+
+		/*
+		 * Re-open relations to allow us to complete our actions.
+		 *
+		 * At this point, nothing should be accessing the index, but lets
+		 * leave nothing to chance and grab AccessExclusiveLock on the index
+		 * before the physical deletion.
+		 */
+		userHeapRelation = heap_open(heapId, ShareUpdateExclusiveLock);
+		userIndexRelation = index_open(indexId, AccessExclusiveLock);
+	}
+
+	/*
 	 * All predicate locks on the index are about to be made invalid. Promote
 	 * them to relation locks on the heap.
 	 */
@@ -1378,6 +1496,15 @@ index_drop(Oid indexId)
 	 * Close owning rel, but keep lock
 	 */
 	heap_close(userHeapRelation, NoLock);
+
+	/*
+	 * Release the session locks before we go.
+	 */
+	if (concurrent)
+	{
+		UnlockRelationIdForSession(&heaprelid, ShareUpdateExclusiveLock);
+		UnlockRelationIdForSession(&indexrelid, ShareUpdateExclusiveLock);
+	}
```
