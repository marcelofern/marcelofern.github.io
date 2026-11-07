# Unique set of columns

A composite unique index doesn't quite cut when you want the set of two columns
to be unique, irrespective of "column ordering".

Use a unique index with an expression instead:

```sql
DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message (
  id SERIAL PRIMARY KEY
);

DROP TABLE IF EXISTS message_comparison CASCADE;
CREATE TABLE message_comparison (
  message_a INT,
  message_b INT,
  FOREIGN KEY (message_a) REFERENCES message(id),
  FOREIGN KEY (message_b) REFERENCES message(id)
);

CREATE UNIQUE INDEX "comparison_a_b_must_be_uniq"
ON message_comparison (
  (LEAST("message_a", "message_b")),
  (GREATEST("message_a", "message_b"))
);

-- Add 10 rows to the message table to use by the comparison table.
INSERT INTO message SELECT generate_series(1, 10);

-- Add pairs of comparisons to attest unique constraint
INSERT INTO message_comparison (message_a, message_b) VALUES
  (1, 2),
  (3, 4),
  (5, 6),
  (7, 8),
  (9, 10);


INSERT INTO message_comparison (message_a, message_b) VALUES
  (2, 1);

-- ERROR:  duplicate key value violates unique constraint "comparison_a_b_must_be_uniq"
-- DETAIL:  Key (LEAST(message_a, message_b), GREATEST(message_a, message_b))=(1, 2) already exists.
```
