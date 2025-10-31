# When does varchar schema changes become risky

Increasing a varchar is just a catalog operation. It locks the table but only
for a short period as the operation runs very fast.

Decreasing, however, is risky as it **rewrites** the table.

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (bar VARCHAR(4));
INSERT INTO foo (bar) SELECT generate_series(1, 1000);

-- Get debugging messages
SET client_min_messages=debug1;

ALTER TABLE foo ALTER COLUMN bar TYPE VARCHAR(5);
-- No DEBUG logs on rescaning/rewriting

ALTER TABLE foo ALTER COLUMN bar TYPE VARCHAR(4);
-- DEBUG:  rewriting table "foo"
```
