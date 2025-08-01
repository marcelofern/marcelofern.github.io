# Conditional And Expression Unique Constraints

```
Created at: 2025-06-29
```

Postgres doesn't support conditional nor expression-based unique constraints.

```sql
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

ALTER TABLE users
ADD CONSTRAINT unique_email
UNIQUE (email)
WHERE username = 'bob';
-- ERROR:  syntax error at or near "WHERE"
-- LINE 4: WHERE username = 'bob';

ALTER TABLE users
ADD CONSTRAINT unique_with_expression UNIQUE (username)
(
    (LEAST("email", "username")),
    (GREATEST("username", "email"))
);
-- ERROR:  syntax error at or near "("
```
