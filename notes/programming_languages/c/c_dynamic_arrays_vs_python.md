September 30, 2023

## The C code

The code is very short, and is pasted here as is:

```c
#include <stdlib.h>
#include <stdio.h>
#include <err.h>
#include <string.h>

#define INITIAL_SIZE 256

typedef struct DynamicArray {
  // pointer to a pointer, so that I can free it!
  void** items;
  int len;
  int capacity;
  size_t item_size;
} DynamicArray;


DynamicArray* init_darray() {
  void* items = malloc(sizeof(void*) * INITIAL_SIZE);
  if (items == NULL) {
    err(EXIT_FAILURE, "DynamicArray->items initialisation");
  }
  DynamicArray* array = (DynamicArray*) malloc(sizeof(DynamicArray));
  if (array == NULL) {
    err(EXIT_FAILURE, "DynamicArray initialisation");
  }
  array->items = items;
  array->len = 0;
  array->capacity = INITIAL_SIZE;
  return array;
};


void insert_darray(DynamicArray* darray, void* item) {
  if ((darray->len + 1) >= darray->capacity) {
    int current_capacity = darray->capacity;
    int new_capacity = current_capacity * 2;
    void* tmp;
    tmp = realloc(darray->items, sizeof(void*) * new_capacity);
    if (tmp == NULL) {
      err(EXIT_FAILURE, "DynamicArray item insertion");
    }
    darray->items = tmp;
    darray->capacity = new_capacity;
  }
  darray->items[darray->len] = item;
  darray->len += 1;
};


void free_darray(DynamicArray* darray) {
  if (darray == NULL) {
    return;
  }
  for (int i = 0; i < darray->len; i++) {
    free(darray->items[i]);
  }
  free(darray->items);
  free(darray);
};
```

In order to initialise an array of one's, we can do the following:

```c
// insert 1,000 ints with value `1` in the array.
for (int i = 0; i < 1000000000; i++) {
  int* item = (int*) malloc(sizeof(int));
  *item = 1;
  insert_darray(int_array, item);
}
free_darray(int_array);
```

## The equivalent Python code

Python is bolted-on with many syntax sugary things:


```python
int_array = [1 for i in range(1_000_000_000)]
```

## The performance comparison

I've just fired a very cheeky test to compute an array of a billion integers:

```sh
time python array.py
>> 18.01s user 1.06s system 99% cpu 19.167 total
```

We only care about the `user` time, because that's the time the actual CPU
spent running the script. Now the C code:

```sh
time ./a.out
>>> 4.04s user 2.96s system 99% cpu 7.042 total
```

To be honest, this doesn't look like a huge difference for an array of a
billion elements in a test like this. But we think about economy of scale,
this compounds a lot.

## What about an array of user-defined types?

We were using `int` objects. This can be a bit of a cheat, specially because
Python can have many optimisations in place for pure int objects.

Let's create a class and see how it performs instead:

```python
class MySweetClass:
    field_a: int
    field_b: int
    field_c: int

    def __init__(self, a, b, c):
        self.field_a = a
        self.field_b = b
        self.field_c = c

int_array = [MySweetClass(1,1,1) for i in range(10_000_000)]
```


Note: I had to change the range to 10 million, because anything more than that
blew up my laptop.

This gives us:

```sh
time python array.py
>>> 6.14s user 0.29s system 99% cpu 6.438 total
```

As for our C code:

```c
typedef struct MySweetType {
  int field_a;
  int field_b;
  int field_c;
} MySweetType;

int main() {
  DynamicArray* array = init_darray();

  for (int i = 0; i < 10000000; i++) {
    MySweetType* item = (MySweetType*) malloc(sizeof(MySweetType));
    item->field_a = 1;
    item->field_b = 1;
    item->field_c = 1;
    insert_darray(array, item);
  }
  free_darray(array);
}
```

We've got:

```sh
a.out  0.18s user 0.11s system 99% cpu 0.292 total
```

In fact, I can still run 1 billion entries for about the same time penalty
Python would've ran only 10 million.

```sh
a.out  6.19s user 3.37s system 98% cpu 9.744 total
```

## Bonus: How about C++ vectors?

Here's the C++ code:

```cpp
#include <vector>
#include <memory>

class MySweetClass {
public:
  int field_a;
  int field_b;
  int field_c;

  MySweetClass(int a, int b, int c) {
    field_a = a;
    field_b = b;
    field_c = c;
  }
};

int main() {
  std::vector<std::unique_ptr<MySweetClass>> array;

  for (int i = 0; i < 100000000; i++) {
    std::unique_ptr<MySweetClass> my_class = std::make_unique<MySweetClass>(1, 1, 1);
    array.push_back(std::move(my_class));
  }
}
```

Yields these results for a billion entries:

```sh
/tmp/a.out  4.97s user 3.30s system 97% cpu 8.510 total
```

This is faster than the C code. At this point I'm not exactly sure why. My
guess is that the <vector> and the <unique_ptr> are highly optimised for
this kind of use case.

## What I need to try further

- I imagine that the C code will be doing less load operations from memory than
  the Python code. A further step would be to try and figure out this number as
  the load-from-memory operations would be taking a good chunk of time.
- Check if I could use 128bit registers for doing the arithmetics in C, this
  would further enhance performance of the C code.
- The Python docs has a page on the `array` feature and expresses it as a
  efficient way of doing arrays for numeric values. This can perhaps better
  enhance the performance of our Python code.

## Conclusion (for now)

Don't use Python (joking).
But the truth is, as soon as you need an array of something that is not an int
in Python, the performance does go downhill.
