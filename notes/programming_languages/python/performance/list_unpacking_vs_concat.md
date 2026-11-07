# List unpacking via `*` versus concatenation via `+`

Here is the question, which method is faster?

```python
array_1 = ["one", "two", "three"]
array_2 = ["four", "five", "six"]

def method1():
    return [*array_1, *array_2]

def method2():
    return array_1 + array_2
```

## Dis

For method one:

```
  5           0 RESUME                   0

  6           2 BUILD_LIST               0
              4 LOAD_GLOBAL              0 (array_1)
             14 LIST_EXTEND              1
             16 LOAD_GLOBAL              2 (array_2)
             26 LIST_EXTEND              1
             28 RETURN_VALUE
```

For method two:

```
  8           0 RESUME                   0

  9           2 LOAD_GLOBAL              0 (array_1)
             12 LOAD_GLOBAL              2 (array_2)
             22 BINARY_OP                0 (+)
             26 RETURN_VALUE
```

## The benchmark

```python
array_1 = [0] * 32000
array_2 = [0] * 32000
import sys
print(f"array size: {sys.getsizeof(array_1)}") # approx 256kb...

def method1():
    new_array = [*array_1, *array_2]

def method2():
    new_array = array_1 + array_2

import timeit
import tracemalloc

tracemalloc.start()
method1_time = timeit.timeit(method1, number=10000)
method1_snapshot = tracemalloc.take_snapshot()
tracemalloc.stop()

tracemalloc.start()
method2_time = timeit.timeit(method2, number=10000)
method2_snapshot = tracemalloc.take_snapshot()
tracemalloc.stop()

print("Method 1 (Unpacking):", method1_time)
print("Method 2 (List +):", method2_time)

print("\nMemory allocation statistics for Method 1:")
for stat in method1_snapshot.statistics('traceback'):
    print(stat)

print("\nMemory allocation statistics for Method 2:")
for stat in method2_snapshot.statistics('traceback'):
    print(stat)
```

The result varies, but both methods return similar results for an array of
256kb. Note that the value of 256kb was used because this is the size of a
memory arena in Python.

```
array size: 256056
Method 1 (Unpacking): 0.5150032740202732
Method 2 (List +): 0.5120943429938052

Memory allocation statistics for Method 1:
/usr/lib/python3.12/timeit.py:113: size=218 KiB, count=1478, average=151 B
/usr/lib/python3.12/timeit.py:135: size=1934 B, count=33, average=59 B
/usr/lib/python3.12/timeit.py:176: size=56 B, count=1, average=56 B

Memory allocation statistics for Method 2:
/usr/lib/python3.12/timeit.py:135: size=168 B, count=3, average=56 B
/usr/lib/python3.12/timeit.py:237: size=72 B, count=1, average=72 B
```

I've tried increasing the size of the array, but the output remains consistent
and both seem to run at the same speed.

Looking at the python source for Cpython, the only difference I see between the
[list concat](https://github.com/python/cpython/blob/d065edfb66470bbf06367b3570661d0346aa6707/Objects/listobject.c#L726)
function and the [list extend](https://github.com/python/cpython/blob/d065edfb66470bbf06367b3570661d0346aa6707/Objects/listobject.c#L1161)
function is that the concatenation does a malloc to begin with, and the second
one does a calloc + memset.

## TLDR

It doesn't seem to be any significant difference that I can note at present
between these two ways of doing the same thing.
