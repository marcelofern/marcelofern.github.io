# pgroll

```
Created at: 2025-02-13
```

## Some problems

### Schema changes happen in place

For example, making a `user`'s table `description` field non-nullable involves
this migration:

```json
{
  "name": "02_user_description_set_nullable",
  "operations": [
    {
      "alter_column": {
        "table": "users",
        "column": "description",
        "nullable": false,
        "up": "(SELECT CASE WHEN description IS NULL THEN 'description for ' || name ELSE description END)",
        "down": "description"
      }
    }
  ]
}
```

Which during schema changes inserts a new column and updates data such as:

```sql
SELECT * FROM users ORDER BY id LIMIT 10
+-----+----------+-------------------------+--------------------------+
| id  | name     | description             | _pgroll_new_description  |
+-----+----------+-------------------------+--------------------------+
| 1   | user_1   | <null>                  | description for user_1   |
| 2   | user_2   | description for user_2  | description for user_2   |
| 3   | user_3   | <null>                  | description for user_3   |
| 4   | user_4   | description for user_4  | description for user_4   |
| 5   | user_5   | <null>                  | description for user_5   |
| 6   | user_6   | description for user_6  | description for user_6   |
| 7   | user_7   | <null>                  | description for user_7   |
| 8   | user_8   | <null>                  | description for user_8   |
| 9   | user_9   | description for user_9  | description for user_9   |
| 10  | user_10  | description for user_10 | description for user_10  |
```

This might generate a lot of deadrows and trigger `vacuum analyse` many times
depending on the size of the table.

## How it works

https://pgroll.com/blog/inside-pgroll-how-it-works-under-the-hood
