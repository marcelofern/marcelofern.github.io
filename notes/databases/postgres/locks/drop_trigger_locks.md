# Drop trigger locks

```
Created at: 2025-03-12
```

Given the following set up:

```sql
DROP TABLE IF EXISTS foo;
CREATE TABLE foo (
    id SERIAL PRIMARY KEY,
    bar VARCHAR(1000)
);

DROP TABLE IF EXISTS foo_audit_log;
CREATE TABLE foo_audit_log (
    id SERIAL PRIMARY KEY,
    foo_id INT,
    old_value VARCHAR(1000),
    new_value VARCHAR(1000),
    changed_at TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION log_bar_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        INSERT INTO foo_audit_log (foo_id, old_value, new_value, changed_at)
        VALUES (NEW.id, OLD.bar, NEW.bar, NOW());
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO foo_audit_log (foo_id, old_value, new_value, changed_at)
        VALUES (OLD.id, OLD.bar, NULL, NOW());
    END IF;

    IF (TG_OP = 'DELETE') THEN
        RETURN NULL; -- For DELETE operation, row is already removed
    ELSE
        RETURN NEW; -- For INSERT or UPDATE, return the new row
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER foo_bar_changes
AFTER INSERT OR UPDATE OR DELETE ON foo
FOR EACH ROW
EXECUTE FUNCTION log_bar_changes();

INSERT INTO foo (bar) SELECT generate_series(1, 10000);
```

If we drop the trigger:

```sql
BEGIN;
DROP TRIGGER foo_bar_changes ON foo;
```

The following locks are hold

```
 locktype |        mode         | granted | relation | relname |                query                 |  lock_duration
----------+---------------------+---------+----------+---------+--------------------------------------+-----------------
 relation | AccessShareLock     | t       |  2491826 | foo     | DROP TRIGGER foo_bar_changes ON foo; | 00:07:01.223563
 relation | AccessExclusiveLock | t       |  2491826 | foo     | DROP TRIGGER foo_bar_changes ON foo; | 00:07:01.223563
```

And if we want to also drop the function, then we have an extra:
