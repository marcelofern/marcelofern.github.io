2024-05-01

## Running **all** tests

```sh
cd tests
./runtests.py
```

## Running **postgress** tests

Install the dependencies for running postgres tests if you haven't already:

```sh
cd tests
pip install -r requirements/postgres.txt
```

You will then need a settings configuration. I usually create a temporary one
in the `tests` folder in the Django repo with these settings:

```py
# Save at /path/to/Django/tests/test_postgres.py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "django_repo_test",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": "5432",
    },
    "other": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "django_repo_test_other",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": "5432",
    },
}

SECRET_KEY = "django_tests_secret_key"

# Use a fast hasher to speed up tests.
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

USE_TZ = False
```

Now you can run the tests.

```sh
DJANGO_SETTINGS_MODULE=test_postgres ./runtests.py --parallel=1 postgres_tests
```

The flag `--parallel=1` is only necessary if you have breakpoints and you want
to step through them. Otherwise, you'd have a failure when running multiple
processes at the same time.

You can also run just one particular test like this:

```sh
DJANGO_SETTINGS_MODULE=test_postgres ./runtests.py --debug-sql --parallel=1 postgres_tests.test_indexes.SchemaTests.test_trigram_op_class_gin_index

DJANGO_SETTINGS_MODULE=test_postgres ./runtests.py --debug-sql --parallel=1 schema.tests.SchemaTests.test_unique
```

The `debug-sql` is usually helpful too.
