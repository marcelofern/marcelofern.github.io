February 28, 2024

## The problem

When Django queries are evaluated, they cache the whole result in the QuerySet
object. For example:

```python
qs = Account.objects.only("id", "created_at", "number")[:10]
assert qs._result_cache is None

result = list(qs)

# Try to evaluate again, this doesn't trigger another SQL statement because
# the query has already been evaluated.
result_again = list(qs)

# This is where the result is stored.
qs._result_cache
```

Triggering the following query

```sql
SELECT "account"."id",
       "account"."created_at"
       "account"."number"
  FROM "account"
 ORDER BY "accounts_account"."created_at" DESC
 LIMIT 10
```

This is fine if your query is not returning an extremely high number of
objects.

## Verifying memory use of querysets


```python
# use pympler because sys.asizeof doesn't follow references memory use!
from pympler import asizeof

ten_accounts = list(Account.objects.all()[:10])

asizeof.asizeof(ten_accounts)

# or fancy results
print(asizeof.asized(ten_accounts, detail=1).format())
```

## Using iterator

Iterator can help us reduce the memory overhead of queries as they only
pull data from the database as needed.

```python
from pympler import asizeof

qs = Account.objects.iterator(chunk_size=2)
for i in qs:
    print(asizeof.asizeof(qs))
```

## Caveats

If you use an iterator in a transaction, it will hold locks until all the
Python code is processed.

Run this in one shell:

```python
import time
from django.db import transaction


with transaction.atomic():
    for account in Account.objects.iterator():
        time.sleep(1)
```

And this in another:

```python
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute(
        """
        LOCK TABLE accounts_account IN ACCESS EXCLUSIVE MODE;
        SELECT pg_sleep(1);
        """,
    )
```

You will be locked. But this is true if you are not using `iterator()` as well.
