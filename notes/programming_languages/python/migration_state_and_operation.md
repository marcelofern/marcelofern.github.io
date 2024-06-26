`last update: 2024-03-15`

Sometimes it is necessary to perform changes on a Django model that cannot, or
should not, be reflected in the database.

A few examples of when that needs to happen:

1. another program has changed the database, and now models need change to keep
   the consistency with the database. Changing the models, should not trigger
   further migrations that would duplicate (and fail) the database changes.
2. removing a previous index concurrently and updating the `db_index` property.

More on the second item now.

When a `CharField` in Django is created with `db_index=True` Django will create
two indexes: one for exact match, and another for text index
(`varchar_pattern_ops`).

```py
# Field in the model "Table"
field = CharField(db_index=True)
```

```sql
// Generated migration sql as seen from `sqlmigrate`
CREATE INDEX "app_table_field_9878d9_idx" ON "app_table" ("field");
CREATE INDEX "app_table_field_9878d9_idx_like" ON "app_table" ("field", varchar_pattern_ops);
```

The second index is almost always **not** what you want. Specially if the
CharField is a choice field. But also, this kind of index only works for
prefixed anchored search (`LIKE 'pre%'), it does not work for postfixed
anchored search (`LIKE '%post') as it will do a table scan.

If your changes are already in production, you now have to create a new
migration that has state changes and operations split up. You can do so by
using `SeparateDatabaseAndState`.

From the docs:

> A highly specialized operation that lets you mix and match the database
> (schema-changing) and state (autodetector-powering) aspects of operations.

> It accepts two lists of operations. When asked to apply state, it will use
> the `state_operations` list (this is a generalized version of RunSQL’s
> `state_operations` argument). When asked to apply changes to the database, it
> will use the `database_operations` list.

To create a migration that removes that index, for example, start with an empty
canvas:

```sh
./manage.py makemigrations --empty myapp --name remove_my_sweet_index
```

You will get this:

```py
# Generated by Django 4.1.12 on 2024-03-12 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_myapp_previous_migration'),
    ]

    operations = [
    ]
```

Make sure the migration is not atomic, and that the index is removed
concurrently:

```diff
  class Migration(migrations.Migration):
+     atomic = False

      dependencies = [
          ("events", "0005_externalevent_account_user_id"),
      ]

      operations = [
+        migrations.SeparateDatabaseAndState(
+            database_operations=[
+                # This index is being removed because it is not being used by the
+                # application.
+                migrations.operations.RunSQL(
+                    sql="DROP INDEX CONCURRENTLY IF EXISTS app_table_field_9878d9_idx_like;",
+                    reverse_sql=migrations.operations.RunSQL.noop,
+                ),
+            ],
+            state_operations=[
+                # This is only here so that we can remove the `db_index=True` from the
+                # Django model without resorting to extra migrations.
+                migrations.AlterField(
+                    model_name="table",
+                    name="field",
+                    # note that db_index=True was removed.
+                    field=models.CharField(max_length=256),
+                ),
+                # This was added from adding the index to the Meta class.
+                migrations.AddIndex(
+                    model_name="table",
+                    index=models.Index(
+                        fields=["field"], name="app_table_field_9878d9_idx"
+                    ),
+                ),
+            ],
+        )
      ]
```

And also make sure to update the models:

```python
    field = CharField()

    class Meta:
        # Now that the db_index=False, we just put the exact-match index
        # in here.
        models.Index(fields=["field"], name="app_table_field_9878d9_idx"),
```
