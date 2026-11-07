

When declaring a function that *takes no parameters* one should use this syntax:

```c
void foo(void);
```

Instead of:

```c
void foo();
```

The nuance is that the second form declares that the function takes a number of
arguments, but doesn't specifies their types nor the count of arguments.

This implies that the caller needs to know the arguments and the types
beforehand, otherwise they risk side-effects like corrupting the stack, or some
other kind of bug.

The form `foo(void)` **explicitly** states that the function takes no
arguments.

Note that this is only the case in C, and not in C++, where both forms mean
the same (no arguments).

## Standards

If you attempt to do this:

```
int f();
int f(int a) {
  return a+42;
}
```

It will compile in standards < c2x. But you will get the following warning from
gcc:

> A function declaration without a prototype is deprecated in all versions of C
> and is not supported in C2x.

## Examples

The main function is a good example, as it is always called with the number
of arguments (at least 1) and the arguments themselves (the name of the
executable for instance), and it is often defined as `int main()`.
