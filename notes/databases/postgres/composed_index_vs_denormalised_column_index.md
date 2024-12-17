# Composed Index vs Denormalised Column Index

```
Created at: 2024-12-02
```

Sometimes it may sound like a good idea to denormalise a couple of columns so
that an index lookup can be performed faster.

But does it actually?

## Tables

Imagine the following table:

```sql
CREATE TABLE normalised (
    id SERIAL PRIMARY KEY,
    foo varchar,
    bar varchar
);
CREATE INDEX idx_foo_bar ON normalised (foo, bar);
```

And its denormalised version, where `foo` and `bar` are stored in foobar as
`foo:bar`.

```sql
CREATE TABLE denormalised (
    id SERIAL PRIMARY KEY,
    foo varchar,
    bar varchar,
    foobar varchar
);
CREATE INDEX idx_foobar ON denormalised (foobar);
```

The normalised version is actually faster for queries like:

```sql
SELECT foo, bar FROM normalised where foo='{foo}' and bar ='{bar}';
```

Instead of the denormalised version

```sql
SELECT foobar FROM denormalised where foobar='{foo}:{bar}';
```

The normalised version has to read less buffers for performing the lookups and
is a tidy bit faster.

I built a benchmark script for testing this scenario against a table with 10
million rows:

```py
import time
import re
import random
import psycopg2

# Change these before running locally.
DB_NAME = "composed_idx"
USER = "marcelo.fernandes"
PASSWORD = ""
HOST = "localhost"
PORT = 5415
NUM_OF_ROWS = 10_000_000
INSERT_ROWS_PER_BATCH = 1000_000
NUM_OF_QUERIES = 30_000

# Uncomment these on local dev for tests to run fast.
# NUM_OF_ROWS = 10_000
# INSERT_ROWS_PER_BATCH = 1000
# NUM_OF_QUERIES = 1


def get_cursor_and_connection():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
    )
    conn.autocommit = True
    return conn.cursor(), conn


def create_normalised_table(cursor):
    print("- Creating normalised table...")
    cursor.execute("""
        -- Idempotency for convenience.
        DROP TABLE IF EXISTS normalised;
        CREATE TABLE normalised (
            id SERIAL PRIMARY KEY,
            foo varchar,
            bar varchar
        );
        -- Disable autovacuum to not interfere with results.
        ALTER TABLE normalised SET (autovacuum_enabled = false);

        CREATE INDEX idx_foo_bar ON normalised (foo, bar);
    """)


def create_denormalised_table(cursor):
    print("- Creating denormalised table...")
    cursor.execute("""
        -- Idempotency for convenience.
        DROP TABLE IF EXISTS denormalised;
        CREATE TABLE denormalised (
            id SERIAL PRIMARY KEY,
            foo varchar,
            bar varchar,
            foobar varchar UNIQUE
        );
        -- Disable autovacuum to not interfere with results.
        ALTER TABLE denormalised SET (autovacuum_enabled = false);

        CREATE INDEX idx_foobar ON denormalised (foobar);
    """)


def vacuum_tables(cursor):
    print("- Vacuuming normalised table...")
    start_time = time.time()
    cursor.execute("VACUUM ANALYZE normalised;")
    duration = time.time() - start_time
    print(f"- Vacuum (normalised) took: {duration:.2f} seconds.")

    print("- Vacuuming denormalised table...")
    start_time = time.time()
    cursor.execute("VACUUM ANALYZE denormalised;")
    duration = time.time() - start_time
    print(f"- Vacuum (denormalised) took: {duration:.2f} seconds.")


def populate_normalised_table(cursor):
    print("- Populating (normalised) table...")
    start_time = time.time()
    for batch in range(int(NUM_OF_ROWS / INSERT_ROWS_PER_BATCH)):
        rows = []
        for i in range(INSERT_ROWS_PER_BATCH):
            val = i + (batch*INSERT_ROWS_PER_BATCH)
            rows.append(f"('{val}', '{val}')")

        values = ", ".join(rows)
        cursor.execute(f"INSERT INTO normalised (foo, bar) VALUES {values};")
    duration = time.time() - start_time
    print(f"- Populating (normalised) took: {duration:.2f} seconds.")


def populate_denormalised_table(cursor):
    print("- Populating (denormalised) table...")
    start_time = time.time()
    for batch in range(int(NUM_OF_ROWS / INSERT_ROWS_PER_BATCH)):
        rows = []
        for i in range(INSERT_ROWS_PER_BATCH):
            val = i + (batch*INSERT_ROWS_PER_BATCH)
            rows.append(f"('{val}', '{val}', '{val}:{val}')")

        values = ", ".join(rows)
        cursor.execute(f"INSERT INTO denormalised (foo, bar, foobar) VALUES {values};")
    duration = time.time() - start_time
    print(f"- Populating (denormalised) took: {duration:.2f} seconds.")


def benchmark_normalised_queries(cursor, values):
    print(f"- Benchmarking {NUM_OF_QUERIES:,} queries against normalised table...")
    explain_outputs = []

    for i in range(NUM_OF_QUERIES):
        foo = bar = values[i]
        query = f"SELECT foo, bar FROM normalised where foo='{foo}' and bar ='{bar}';"
        cursor.execute(f"EXPLAIN (ANALYSE, BUFFERS, costs off, summary off) {query}")
        explain_outputs.append(cursor.fetchall())
    print_explain_info(explain_outputs)

def benchmark_denormalised_queries(cursor, values):
    print(f"- Benchmarking {NUM_OF_QUERIES:,} queries against denormalised table...")
    explain_outputs = []

    for i in range(NUM_OF_QUERIES):
        foo = bar = values[i]
        query = f"SELECT foobar FROM denormalised where foobar='{foo}:{bar}';"
        cursor.execute(f"EXPLAIN (ANALYSE, BUFFERS, costs off, summary) {query}")
        explain_outputs.append(cursor.fetchall())
    print_explain_info(explain_outputs)

def benchmark_normalised_queries_foo_only(cursor, values):
    print(f"- Benchmarking {NUM_OF_QUERIES:,} foo-only queries against normalised table...")
    explain_outputs = []

    for i in range(NUM_OF_QUERIES):
        foo = bar = values[i]
        query = f"SELECT foo, bar FROM normalised where foo='{foo}';"
        cursor.execute(f"EXPLAIN (ANALYSE, BUFFERS, costs off, summary off) {query}")
        explain_outputs.append(cursor.fetchall())
    print_explain_info(explain_outputs)

def benchmark_denormalised_queries_foo_only(cursor, values):
    print(f"- Benchmarking {NUM_OF_QUERIES:,} foo-only queries against denormalised table...")
    explain_outputs = []

    for i in range(NUM_OF_QUERIES):
        foo = bar = values[i]
        query = f"SELECT foobar FROM denormalised where foobar LIKE '{foo}:%';"
        cursor.execute(f"EXPLAIN (ANALYSE, BUFFERS, costs off, summary) {query}")
        explain_outputs.append(cursor.fetchall())
    print_explain_info(explain_outputs)


def print_explain_info(explain_outputs):
    shared_hit = 0
    shared_read = 0
    shared_written = 0
    total_timing = (0, 0)

    for explain_output in explain_outputs:
        found_buffers = False
        for line in explain_output:
            line = line[0]
            if line.startswith("  Buffers:") and found_buffers is False:
                found_buffers = True
                # Look for buffer stats in the output using regular expressions
                match = re.search(r"shared hit=(\d+)", line)
                if match:
                    shared_hit += int(match.group(1))
                match = re.search(r"read=(\d+)", line)
                if match:
                    shared_read += int(match.group(1))
                match = re.search(r"written=(\d+)", line)
                if match:
                    shared_written += int(match.group(1))

        timing = explain_output[0][0].split("actual time=")[1].split(" ")[0].split("..")
        total_timing = (total_timing[0] + float(timing[0]), total_timing[1] + float(timing[1]))

    size = len(explain_outputs)
    print(f"  - average timing = {total_timing[0]/size}..{total_timing[1]/size}")
    print(f"  - average buffers hit {shared_hit/size}")
    print(f"  - average buffers read {shared_read/size}")
    print(f"  - average buffers written {shared_written/size}")

def run_tests():
    results = {}
    print(
        f"\nReport details:\n"
        f"  - rows in each table: {NUM_OF_ROWS:,}\n"
        f"  - number of queries to benchmark: {NUM_OF_QUERIES:,}\n"
    )
    cursor, conn = get_cursor_and_connection()

    create_normalised_table(cursor)
    populate_normalised_table(cursor)

    create_denormalised_table(cursor)
    populate_denormalised_table(cursor)

    vacuum_tables(cursor)

    query_values = [random.randint(0, NUM_OF_ROWS) for _ in range(NUM_OF_QUERIES)]
    for i in range(2):
        # For a fair measurement, we need to run a second time to see how
        # caching would affect the results.
        benchmark_normalised_queries(cursor, query_values)
        benchmark_denormalised_queries(cursor, query_values)
        benchmark_normalised_queries_foo_only(cursor, query_values)
        benchmark_denormalised_queries_foo_only(cursor, query_values)

    cursor.close()
    conn.close()


if __name__ == "__main__":
    run_tests()
```

Here is the result for the report:

```
Report details:
  - rows in each table: 10,000,000
  - number of queries to benchmark: 30,000

- Creating normalised table...
- Populating (normalised) table...
- Populating (normalised) took: 136.66 seconds.
- Creating denormalised table...
- Populating (denormalised) table...
- Populating (denormalised) took: 256.72 seconds.
- Vacuuming normalised table...
- Vacuum (normalised) took: 1.37 seconds.
- Vacuuming denormalised table...
- Vacuum (denormalised) took: 1.61 seconds.
- Benchmarking 30,000 queries against normalised table...
  - average timing = 0.08297973333333454..0.08315866666666841
  - average buffers hit 3.1326666666666667
  - average buffers read 0.8673333333333333
  - average buffers written 0.3596
- Benchmarking 30,000 queries against denormalised table...
  - average timing = 0.09937203333333515..0.09953386666666716
  - average buffers hit 4.157966666666667
  - average buffers read 0.8420333333333333
  - average buffers written 0.03643333333333333
- Benchmarking 30,000 foo-only queries against normalised table...
  - average timing = 0.031196766666643467..0.03136039999997724
  - average buffers hit 3.1750333333333334
  - average buffers read 0.8249666666666666
  - average buffers written 0.0
- Benchmarking 30,000 foo-only queries against denormalised table...
  - average timing = 373.48803086666567..448.2494357000009
  - average buffers hit 16117.526433333333
  - average buffers read 66226.47356666667
  - average buffers written 0.0
- Benchmarking 30,000 queries against normalised table...
  - average timing = 0.04304369999998034..0.04320683333331343
  - average buffers hit 3.1661
  - average buffers read 0.8339
  - average buffers written 0.0
- Benchmarking 30,000 queries against denormalised table...
  - average timing = 0.08817753333332631..0.08833266666665922
  - average buffers hit 4.155433333333334
  - average buffers read 0.8445666666666667
  - average buffers written 0.0
- Benchmarking 30,000 foo-only queries against normalised table...
  - average timing = 0.018202833333331735..0.018360799999997398
  - average buffers hit 3.1735333333333333
  - average buffers read 0.8264666666666667
  - average buffers written 0.0
- Benchmarking 30,000 foo-only queries against denormalised table...
  - average timing = 350.0887793666639..421.00194770000036
  - average buffers hit 16121.111933333334
  - average buffers read 66222.88806666667
  - average buffers written 0.0
```

As you can see, the denormalised version performs better in every case.
