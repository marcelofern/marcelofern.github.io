February 2, 2024

# Introduction

A colleague asked in a code review whether or not we should change a list
membership-lookup to a set membership-lookup for performance reasons.

The original code looked something like this:

```python
foo_objects: list[Foo]
bars: list[Bar]

result = [foo for foo in foo_objects if foo.bar in bars]
```

Knowing that a set membership-lookup is O(1 + C) a.k.a O(1), and that a list
membership-lookup is O(N + C2) a.k.a O(N), it sounded like using a set was
going to be a no-brainer.

The proposed change would be something like this:

```python
foos: list[Foo]
bars: list[Bar]

# Convert bars to a set
bars = set(bars)

result = [foo for foo in foos if foo.bar in bars]
```

Before the changes, we had a direct list membership evaluation.
After the changes, we convert the list into a set, and then perform the lookup.

For reasons beyond the scope of this post, it was not possible to initialise
`bars` as a set directly, to avoid converting it from a `list` in the first
place.

This is because the function applying this change does not own the code that
generates `foos` nor `bars`.

## First try with a bad benchmark

My first try at trying to measure the performance differences for this problem
was far from ideal.

I started with a list of primitive integers:

```python
import timeit

sample_size = 1000
lookup_size = 10

my_list_primitives = list(range(sample_size))
primitives_lookup = [i for i in range(lookup_size)]

def list_primitive_lookup():
    return [i for i in primitives_lookup if i in my_list_primitives]

def set_primitive_lookup():
    set_of_primitives = set(my_list_primitives)
    return [i for i in primitives_lookup if i in set_of_primitives]

# Measure time for list primitive lookup
list_time = timeit.timeit(list_primitive_lookup, number=10000)
print(f"List Primitive Lookup Time: {list_time:.6f} seconds")

# Measure time for set primitive lookup
set_time = timeit.timeit(set_primitive_lookup, number=10000)
print(f"Set Primitive Lookup Time: {set_time:.6f} seconds")

# Compare the two times
if set_time < list_time:
    print("Set Primitive lookup is faster.\n")
else:
    print("List Primitive lookup is faster.\n")
```

The result was:

```txt
List Primitive Lookup Time: 0.005507 seconds
Set Primitive Lookup Time: 0.077754 seconds
List Primitive lookup is faster.
```

**Why was this benchmark bad?**

We can start with the fact that all the integers being looked-up are in the
list. We also know that the worst case scenario, is when *none* of the look-ups
is in the list, given that we'd need to traverse the whole list first.

If I changed the following line:

```diff
- primitives_lookup = [i for i in range(lookup_size)]
+ primitives_lookup = [i+2000 for i in range(lookup_size)]
```

I get the following results for the worst-case scenario:

```diff
List Primitive Lookup Time: 0.422299 seconds
Set Primitive Lookup Time: 0.074659 seconds
Set Primitive lookup is faster.
```

But we know from the real application where this code sits, that at least some
of the `Foo.bar's` being looked-up will be in the `bars` list.

We'll make a decision here and say that 50% of the `Foo.bars` will be in the
list and 50% will not.

The ones in the list, will be randomly distributed.


```diff
- primitives_lookup = [i+2000 for i in range(lookup_size)]
+ primitives_lookup = (
+     [random.randint(0, sample_size-1) for i in range(int(lookup_size/2))]
+     +
+     [sample_size + 1 for i in range(int(lookup_size/2))]
+ )
```

We get this result, which is a bit better than previously, but not good enough
to justify a list lookup yet.

```text
List Primitive Lookup Time: 0.319727 seconds
Set Primitive Lookup Time: 0.075953 seconds
Set Primitive lookup is faster.
```

Note that at this point, even with a small value of `sample_size` and
`lookup_size`, the set beats the list.

## Second try, using custom classes

Instead of primitives, I tried to run the same test but using custom Python
classes:

You can see the full code here:

```python
import timeit
import random

sample_size = 1000
lookup_size = 10

my_list_primitives = list(range(sample_size))
primitives_lookup = (
    [random.randint(0, sample_size-1) for i in range(int(lookup_size/2))]
    +
    [sample_size + 1 for i in range(int(lookup_size/2))]
)

class Bar:
    id: int

    def __init__(self, i):
        self.id = i

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)

class Foo:
    bar: Bar

    def __init__(self, i):
        self.bar = Bar(i)

    def __eq__(self, other):
        return self.bar == other.bar

    def __hash__(self):
        return hash(self.bar.id)


my_list_foo = [Foo(i) for i in range(1000, 1000+sample_size)]
foo_lookup = [Foo(i) for i in range(1000, 1000+lookup_size)]
foo_lookup = (
    [Foo(random.randint(0, sample_size-1)) for i in range(int(lookup_size/2))]
    +
    [Foo(sample_size + 1) for i in range(int(lookup_size/2))]
)

def list_primitive_lookup():
    return [
        i for i in primitives_lookup if i in my_list_primitives
    ]

def set_primitive_lookup():
    set_of_primitives = set(my_list_primitives)
    return [
        i for i in primitives_lookup if i in set_of_primitives
    ]

def list_foo_lookup():
    return [
        i for i in foo_lookup if i in my_list_foo
    ]

def set_foo_lookup():
    set_of_foo = set(my_list_foo)
    return [
        i for i in foo_lookup if i in set_of_foo
    ]

assert list_primitive_lookup() == set_primitive_lookup()
assert list_foo_lookup() == set_foo_lookup()


# Measure time for list primitive lookup
list_time = timeit.timeit(list_primitive_lookup, number=10000)
print(f"List Primitive Lookup Time: {list_time:.6f} seconds")

# Measure time for set primitive lookup
set_time = timeit.timeit(set_primitive_lookup, number=10000)
print(f"Set Primitive Lookup Time: {set_time:.6f} seconds")

# Compare the two times
if set_time < list_time:
    print("Set Primitive lookup is faster.\n")
else:
    print("List Primitive lookup is faster.\n")

# Measure time for list foo lookup
list_time = timeit.timeit(list_foo_lookup, number=10000)
print(f"List Foo Lookup Time: {list_time:.6f} seconds")

# Measure time for set foo lookup
set_time = timeit.timeit(set_foo_lookup, number=10000)
print(f"Set Foo Lookup Time: {set_time:.6f} seconds")

# Compare the two times
if set_time < list_time:
    print("Set Foo lookup is faster.")
else:
    print("List Foo lookup is faster.")
```

And results:

```text
List Primitive Lookup Time: 0.328242 seconds
Set Primitive Lookup Time: 0.073281 seconds
Set Primitive lookup is faster.

List Foo Lookup Time: 4.221350 seconds
Set Foo Lookup Time: 1.050486 seconds
Set Foo lookup is faster.
```

The non-primitive types, as expected, are much slower.

I haven't got to the bottom of *why* exactly it is much slower, but I will
come and update this note as soon as I find out.

## Conclusion

1. Ensure you know the size of your containers before benchmarking.
2. Ensure you know the proportion of objects in the list and out of the list.
3. Figure out why primitives are so much faster and tell me!
