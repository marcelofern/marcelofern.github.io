# Composite Primary Keys

```
Created at: 2025-04-14
```

## Examples

```sql
CREATE TABLE course_grades (
    quarter_id INTEGER,
    course_id TEXT,
    student_id INTEGER,
    grade INTEGER,
    PRIMARY KEY(quarter_id, course_id, student_id)
);
```

## Resources

https://kb.objectrocket.com/postgresql/postgresql-composite-primary-keys-629
