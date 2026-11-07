The C standard #46th undefined behaviour has the following description:

> Addition or subtraction of a pointer into, or just beyond, an array object
> and an integer type produces a result that does not point into, or just
> beyond, the same array object.

Problematic code:

```c
enum { TABLESIZE = 100 };
static int table[TABLESIZE];

int *f(int index) {
    if (index < TABLESIZE) {
        return table + index;
    }
    return NULL;
}
```

The `index` argument value may be negative, given that `int` is signed. That
would cause undefined behaviour.

Better code:

```c
enum { TABLESIZE = 100 };
static int table[TABLESIZE];

int *f(int index) {
    if (index >= 0 && index < TABLESIZE) {
        return table + index;
    }
    return NULL;
}
```

An even better code would use a type that cannot be negative, such as `size_t`:

```c
#include <stddef.h>
enum { TABLESIZE = 100 };
static int table[TABLESIZE];
int *f(size_t index) {
    if (index < TABLESIZE) {
        return table + index;
    }
    return NULL;
}
```
