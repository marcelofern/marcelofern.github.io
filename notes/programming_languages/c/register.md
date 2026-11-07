`2024-04-01`

## From wikipedia

`register` is a reserved keyword, type modifier, storage class, and hint.

The keyword hints the compiler to use a register to store a particular variable
rather than using random-access memory (RAM).

In C the location of a variable declared with register cannot be accessed, but
the sizeof operator can be applied.

Aside from this limitation, register is essentially meaningless in modern
compilers due to optimization which will place variables in a register if
appropriate regardless of whether the hint is given.

For programming of embedded systems register may still be significant; for
example the Microchip MPLAB XC32 compiler allows the programmer to specify a
particular register with the keyword; however, this is discouraged in favor of
the compiler's optimizations. When used, register is typically for loop
counters, or possibly for other very frequently used variables in the code.

Syntax:

```c
/* store integer variable "i" in RAM, register, or other location as compiler sees fit */
int i;

/* suggests storing integer variable "i" in a CPU register or other fast location */
register int i;
```

[source](https://web.archive.org/web/20221105122749/https://en.wikipedia.org/wiki/Register_(keyword))

## Limitations

- The register keyword can only be applied to variables declared within a
  function (local variables). It cannot be used with global variables.
- You cannot take the address of a register variable because it doesn't have a
  memory location.
- It's also not possible to apply the register keyword to structure or union
  members.
- In practice, it's rare to see significant performance gains from using
  register, and its use is largely considered unnecessary in modern C
  programming.

## Background

The "register" keyword tends to be ignored by modern compilers, because it
messes with the compilers' optimized register assignment algorithms (which
algorithms didn't exist in 1972, when the keyword was created).

## Other uses

You can use the C register keyword to make sure your variable will not be
accessed by address and changed outside of the scope that you expect.

For example:

```c
#include <stdio.h>

int main()
{
    register int number = 1;
    scanf("%d", &number);
    printf("%d", number);

    return 0;
}
```

Compiles into an error:

```
/tmp/main.c:6:5: error: address of register variable ‘number’ requested.
```

Exception: If you're using a C++ compiler, it won't result in an error because
C++ allows access to the address of register variables.
