# 2024-06-12

## Declaration

One of the most confusing aspects of a function pointer is its declaration.

Take for example this silly function:

```c
long foo(int a, short b, float c) {
    return a + b + c;
}
```

The simplest way of declaring a function pointer to this function is by taking
its signature:

```c
long foo(int, short, float);
```

And swapping the function name by `(*)`

```c
long (*)(int, short, float);
```

Now after the `*` you pick the variable name that will hold that pointer:

```c
int main() {
    long (*my_pointer)(int, short, float) = foo;
    // This also works, the assembly is the same.
    // long (*my_pointer)(int, short, float) = &foo;
}
```

And you can do the same when declarying a type for this function:

```c
typedef long (*my_type)(int, short, float);

my_type f = foo;
```
