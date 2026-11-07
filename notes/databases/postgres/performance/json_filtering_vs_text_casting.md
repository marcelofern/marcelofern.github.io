# JSON Filtering Versus Text Casting

```
Created at: 2024-12-06
```

Which is faster:

```sql
SELECT *
FROM json_table
WHERE params->>'unique_id' = '0000000001';
```

Or:

```sql
SELECT *
FROM json_table
WHERE params::text like '%0000000001%';
```

Let's benchmark it.

## Create the database

```sql
CREATE DATABASE json_test;
```

## Run this python script

```py
import time
import re
import random
import psycopg2

# Change these before running locally.
DB_NAME = "json_test"
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


def create_table(cursor):
    print("- Creating normalised table...")
    cursor.execute("""
        -- Idempotency for convenience.
        DROP TABLE IF EXISTS json_test;
        CREATE TABLE json_test (
            id SERIAL PRIMARY KEY,
            params jsonb
        );
        -- Disable autovacuum to not interfere with results.
        ALTER TABLE json_test SET (autovacuum_enabled = false);
    """)


def vacuum_table(cursor):
    print("- Vacuuming table...")
    start_time = time.time()
    cursor.execute("VACUUM ANALYZE json_test;")
    duration = time.time() - start_time
    print(f"- Vacuum took: {duration:.2f} seconds.")


def populate_table(cursor):
    print("- Populating table...")
    start_time = time.time()
    for batch in range(int(NUM_OF_ROWS / INSERT_ROWS_PER_BATCH)):
        rows = []
        for i in range(INSERT_ROWS_PER_BATCH):
            val = i + (batch * INSERT_ROWS_PER_BATCH)
            json_val = str({"unique_id": str(val).zfill(10)})
            json_val = json_val.replace("'", '"')
            rows.append(f"('{json_val}')")

        values = ", ".join(rows)
        cursor.execute(f"INSERT INTO json_test (params) VALUES {values};")
    duration = time.time() - start_time
    print(f"- Populating took: {duration:.2f} seconds.")


def benchmark_json_queries(cursor, values):
    print(
        f"- Benchmarking {NUM_OF_QUERIES:,} filtered queries against json_test table..."
    )
    explain_outputs = []

    for i in range(NUM_OF_QUERIES):
        val = str(values[i]).zfill(10)
        query = f"SELECT params FROM json_test where params->>'unique_id' = '{val}' AND id={values[i]} LIMIT 1;"
        cursor.execute(f"EXPLAIN (ANALYSE, BUFFERS, costs off, summary off) {query}")
        explain_outputs.append(cursor.fetchall())
    print_explain_info(explain_outputs)


def benchmark_cast_queries(cursor, values):
    print(
        f"- Benchmarking {NUM_OF_QUERIES:,} casted queries against json_test table..."
    )
    explain_outputs = []

    for i in range(NUM_OF_QUERIES):
        val = str(values[i]).zfill(10)
        query = f"SELECT params FROM json_test where params::text like '%{val}%' and id={values[i]} LIMIT 1;"
        cursor.execute(f"EXPLAIN (ANALYSE, BUFFERS, costs off, summary off) {query}")
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
        total_timing = (
            total_timing[0] + float(timing[0]),
            total_timing[1] + float(timing[1]),
        )

    size = len(explain_outputs)
    print(f"  - average timing = {total_timing[0]/size}..{total_timing[1]/size}")
    print(f"  - average buffers hit {shared_hit/size}")
    print(f"  - average buffers read {shared_read/size}")
    print(f"  - average buffers written {shared_written/size}")


def run_tests():
    print(
        f"\nReport details:\n"
        f"  - rows in each table: {NUM_OF_ROWS:,}\n"
        f"  - number of queries to benchmark: {NUM_OF_QUERIES:,}\n"
    )
    cursor, conn = get_cursor_and_connection()

    create_table(cursor)
    populate_table(cursor)
    vacuum_table(cursor)

    query_values = [random.randint(0, NUM_OF_ROWS) for _ in range(NUM_OF_QUERIES)]
    # Run a first time just to warm the cache
    benchmark_json_queries(cursor, query_values)
    # Then run both twice to see if results approximate
    benchmark_json_queries(cursor, query_values)
    benchmark_json_queries(cursor, query_values)
    benchmark_cast_queries(cursor, query_values)
    benchmark_cast_queries(cursor, query_values)

    cursor.close()
    conn.close()


if __name__ == "__main__":
    run_tests()
```

My results on a Mac M3 were:

```
Report details:
  - rows in each table: 10,000,000
  - number of queries to benchmark: 30,000

- Creating normalised table...
- Populating table...
- Populating took: 65.19 seconds.
- Vacuuming table...
- Vacuum took: 1.11 seconds.
- Benchmarking 30,000 filtered queries against json_test table...
  - average timing = 0.0612612333333632..0.061360566666695864
  - average buffers hit 2.366033333333333
  - average buffers read 1.6339666666666666
  - average buffers written 0.47733333333333333
- Benchmarking 30,000 filtered queries against json_test table...
  - average timing = 0.006311566666667494..0.006429833333334426
  - average buffers hit 2.3832666666666666
  - average buffers read 1.6167333333333334
  - average buffers written 0.0
- Benchmarking 30,000 filtered queries against json_test table...
  - average timing = 0.006281566666667511..0.006394300000001098
  - average buffers hit 2.3860333333333332
  - average buffers read 1.6139666666666668
  - average buffers written 0.0
- Benchmarking 30,000 casted queries against json_test table...
  - average timing = 0.006742533333335034..0.006844266666668509
  - average buffers hit 2.3859666666666666
  - average buffers read 1.6140333333333334
  - average buffers written 0.0
- Benchmarking 30,000 casted queries against json_test table...
  - average timing = 0.006723433333335083..0.0068289666666686245
  - average buffers hit 2.3852333333333333
  - average buffers read 1.6147666666666667
  - average buffers written 0.0
```

## Profiling

```sql
SELECT * FROM json_test
WHERE id=10000000 AND params->>'unique_id' = '0009999999' LIMIT 1;
```

Versus

```sql
SELECT * FROM json_test
WHERE id=10000000 AND params::text like '%0009999999%' LIMIT 1;
```

I couldn't find any significant differences.
