# default on Model Field

```
Created at: 2024-11-28
```

Django allows a model field to be created with a "default" value:

```py
my_field = models.IntegerField(default=42, null=False)
```

But when you create the migration and check what SQL is produced, it will
output the following:

```sql
-- NOTE: This is for Postgres only, other dbs might trigger
-- different ddls.
ALTER TABLE "foo" ADD COLUMN "my_field" integer DEFAULT 42 NOT NULL;
ALTER TABLE "foo" ALTER COLUMN "my_field" DROP DEFAULT;
```

The same is true if we used `null=True`.

```sql
ALTER TABLE "foo" ADD COLUMN "my_field" integer DEFAULT 42 NULL;
ALTER TABLE "foo" ALTER COLUMN "my_field" DROP DEFAULT;
```

So why does Django drop the default?

## Context

Django allows `default` to be a Python callable.

In certain cases, it is impossible to translate the Python callable into a
Postgres callable. This means that a translation from Django's `default` to
Postgres `DEFAULT` can be unfeasible.

Effectively, this means that the `default` argument on a models.Field, will
only be enforced on the application level.

However, this does not explain why Django creates the field with the DEFAULT
and then immediately drops it.

The explanation is because in Postgres you can't add a field on an existing
table that is NOT NULL without setting a default.

If you try:

```sql
ALTER TABLE "foo" ADD COLUMN "bar" integer NOT NULL;
```

You will get the error:

```
ERROR:  column "bar" of relation "foo" contains null values
```

This is not true for the case of `null=True`, but still, Django performs the
same ddl. Perhaps for consistency.

I don't find Django's behaviour very useful, as most times what I really want
is for the default to be set on the database level.

## Fix

If you are using Django > 5.0 you can use the new `db_default` argument when
initialising the model field.

If you aren't and you want a database DEFAULT for data-integrity purposes, you
will have to use `SeparateDatabaseAndState`.

## Outro: Table Rewrites

Adding the column with a DEFAULT and then dropping the DEFAULT does not execute
a table rewrite.

All the existing rows will be set with the DEFAULT, and new rows will be
required to pass a value.

## Outro: Callable Defaults

This is legal:

```py
def my_default():
    return random.randint(0, 42)

class Foo(models.Model):
    my_field = models.IntegerField(default=my_default, null=False)
```

And the migration looks like this:

```sql
ALTER TABLE "foo" ADD COLUMN "my_field" integer DEFAULT 36 NOT NULL;
ALTER TABLE "foo" ALTER COLUMN "my_field" DROP DEFAULT;
COMMIT;
```

Except that every time I call "sqlmigrate" the DEFAULT value is different.
