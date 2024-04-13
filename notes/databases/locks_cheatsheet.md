January 30, 2024

# Table

What types of locks can impact each other:

```
|                   | ACCESS SHARE | ROW SHARE | ROW EXCL | SHARE UPDATE EXCL | SHARE | SHARE ROW EXCL | EXCL | ACCESS EXCL | QUERY                                                |
|-------------------|--------------|-----------|----------|-------------------|-------|----------------|------|-------------|------------------------------------------------------|
| ACCESS SHARE      |              |           |          |                   |       |                |      | X           | SELECT                                               |
| ROW SHARE         |              |           |          |                   |       |                | X    | X           | SELECT FOR UPDATE/SHARE                              |
| ROW EXCL          |              |           |          |                   | X     | X              | X    | X           | INSERT/UPDATE/DELETE                                 |
| SHARE UPDATE EXCL |              |           |          | X                 | X     | X              | X    | X           | VACUUM/CREATE INDEX CONCURRENTLY                     |
| SHARE             |              |           | X        | X                 |       | X              | X    | X           | CREATE INDEX                                         |
| SHARE ROW EXCL    |              |           | X        | X                 | X     | X              | X    | X           | CREATE TRIGGER/ADD FOREIGN KEY                       |
| EXCL              |              | X         | X        | X                 | X     | X              | X    | X           | REFRESH MATVIEW CONCURRENTLY                         |
| ACCESS EXCL       | X            | X         | X        | X                 | X     | X              | X    | X           | DROP/TRUNCATE/VACUUM FULL/LOCK TABLE/REFRESH MATVIEW |
```
