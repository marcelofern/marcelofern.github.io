February 22, 2024

## The problem

Note: check the `Solution` section at the end.

When a migration is run with the `atomic` argument set to `False`, it is meant
that the migration itself won't run inside a transaction (at least in theory).

Say you have this migration:

```python
from django.db import migrations


class Migration(migrations.Migration):
    atomic = False
    dependencies = [
        (
            "my_sweet_app",
            "0001_initial",
        ),
    ]

    create_index = """
        SET lock_timeout = 10000;
        SET statement_timeout = 20000;
        CREATE INDEX CONCURRENTLY if NOT EXISTS my_sweet_index
        ON public."my_sweet_app_table"
        USING gist (field_one, field_two, field_three);
    """
    drop_index = """
        DROP INDEX CONCURRENTLY if EXISTS my_sweet_index;
    """

    operations = [
        migrations.RunSQL(sql=create_index, reverse_sql=drop_index),
    ]
```

This looks all normal:

1. If the CREATE INDEX CONCURRENTLY instruction waits for longer than 10s to
   acquire a lock, it times out.
2. If the CREATE INDEX CONCURRENTLY query itself takes longer than 20s to
   complete, it times out.

However:

> If a statement must be executed outside a transaction (such as CREATE
> DATABASE), it cannot be executed in batch with other statements, even if the
> connection is in autocommit mode:

```python
>>> conn.autocommit = True
>>> conn.execute("CREATE DATABASE foo; SELECT 1")

Traceback (most recent call last):
...
psycopg.errors.ActiveSqlTransaction: CREATE DATABASE cannot run inside a transaction block
```

> This happens because PostgreSQL itself will wrap multiple statements in a
> transaction. Note that you will experience a different behaviour in psql
> (psql will split the queries on semicolons and send them to the server
> separately).

The problem is the same for CREATE INDEX CONCURRENTLY.

```
CREATE INDEX CONCURRENTLY cannot run inside a transaction block
```

Source: [psycopg](https://www.psycopg.org/psycopg3/docs/basic/from_pg2.html#multiple-statements-in-the-same-query)

## Solution

1. Don't run multiple statements inside a `atomic = False` migration.
2. Set sane timeouts directly in the psql user that runs migrations.
