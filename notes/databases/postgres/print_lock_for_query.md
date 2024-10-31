# Print Lock For Query

To find which lock is being used by a particular query, first grab the process
id that is running that query

```sql
SELECT pid, query, state, backend_start FROM pg_stat_activity WHERE state = 'active';
```

Or alternatively, in psql you can `SELECT pg_backend_pid();` if you have
access to that process before you run the query.

Then, with that PID, run the following query:

```sql
SELECT
    l.locktype,
    l.mode,
    l.granted,
    l.relation,
    c.relname,
    a.query,
    now() - a.backend_start AS lock_duration
FROM
    pg_locks l
JOIN
    pg_stat_activity a ON l.pid = a.pid
JOIN
    pg_class c ON c.oid = l.relation
WHERE
    a.pid = 182644;
```

That will give you a result like this:

```
 locktype |         mode          | granted | relation |   relname   |                         query                         |  lock_duration
----------+-----------------------+---------+----------+-------------+-------------------------------------------------------+-----------------
 relation | ShareRowExclusiveLock | t       |    24711 | blog_author | ALTER TABLE blog_post                                +| 03:21:38.903972
          |                       |         |          |             | ADD CONSTRAINT fk_post_author FOREIGN KEY (author_id)+|
          |                       |         |          |             | REFERENCES blog_author (id)                          +|
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED                        +|
          |                       |         |          |             | NOT VALID;                                            |
 relation | AccessShareLock       | t       |    24711 | blog_author | ALTER TABLE blog_post                                +| 03:21:38.903972
          |                       |         |          |             | ADD CONSTRAINT fk_post_author FOREIGN KEY (author_id)+|
          |                       |         |          |             | REFERENCES blog_author (id)                          +|
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED                        +|
          |                       |         |          |             | NOT VALID;                                            |
 relation | ShareRowExclusiveLock | t       |    24725 | blog_post   | ALTER TABLE blog_post                                +| 03:21:38.903972
          |                       |         |          |             | ADD CONSTRAINT fk_post_author FOREIGN KEY (author_id)+|
          |                       |         |          |             | REFERENCES blog_author (id)                          +|
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED                        +|
          |                       |         |          |             | NOT VALID;                                            |
 relation | AccessShareLock       | t       |    24725 | blog_post   | ALTER TABLE blog_post                                +| 03:21:38.903972
          |                       |         |          |             | ADD CONSTRAINT fk_post_author FOREIGN KEY (author_id)+|
          |                       |         |          |             | REFERENCES blog_author (id)                          +|
          |                       |         |          |             | DEFERRABLE INITIALLY DEFERRED                        +|
          |                       |         |          |             | NOT VALID;                                            |
```

## GOTCHA's

Make sure to see which **relation** the lock is taking. Some operations might
take locks in different relations. The CREATE INDEX operation, for example,
takes a lock onto itself. In this case there will be a relation id but not
a relname.
