# Page Pruning

```
Created at: 2025-04-27
```

When a page is being read or updated, Postgres can perform some quick clean up
on that page. Pruning happens when:

- The previous UPDATE did not find enough space to place a new tuple into the
  same page. The page header will have an entry about this.

- The page has more data than allowed by the fillfactor storage parameter.
  **Note**: the fillfactor parameter is a percentage between 10% and 100%
  (default) that dictates how much space in the page will be used to store
  data. For more, see my note on fillfactor.

Page pruning will remove the tuples that cannot be visible any longer. That is,
the tuples that are beyond the database horizon and therefore can't be seen by
any transactions.

Pruning never goes beyond a single page, and thus can be carried through very
fast. Pointers to pruned tuples remain in place, however, since they may be
referenced by an index - which will be in a separated page.

## Writes during reads

Since page pruning can happen during SELECT statements, these statements can
modify data in the page.
