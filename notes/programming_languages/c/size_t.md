According to P.J. Plauger

> Its origins lie in the old `<std.h>` header we developed at Whitesmiths, Ltd.
> in the late 1970s. We used the typedef BYTES as the type of sizeof, to be
> sure we could count all the bytes in the largest declarable (or allocatable)
> object. X3J11 chose `size_t` to follow the `*_t` convention that had begun to
> creep up in Posix.

[source](http://web.archive.org/web/20220818070526/https://bytes.com/topic/c/answers/221996-origin-size_t-curious)

Essentially, C needed a portable way to represent the sizes of objects
in memory. Before the `size_t` came about, it was common practice to use
`unsigned int` instead. K&R C book has a reference to `size_t` on the Appendix
A (page 204).

From the man page, `size_t` is defined as:

```
Used  for  a  count of bytes.  It is the result of the sizeof() operator.
It is an unsigned integer type capable of storing values in the range [0,
SIZE_MAX].
```

The `SIZE_MAX` value is defined as:

```c
/* Limit of `size_t' type.  */
# if __WORDSIZE == 64
#  define SIZE_MAX		(18446744073709551615UL)
# else
#  if __WORDSIZE32_SIZE_ULONG
#   define SIZE_MAX		(4294967295UL)
#  else
#   define SIZE_MAX		(4294967295U)
#  endif
# endif
```

In my machine I'm getting the value of `4294967295l` from the script below:

```c
#include <stdint.h>
#include <stdio.h>

int main() {
  printf("sizemax is: %ul", SIZE_MAX);
}
```

## Common use

Apart from functions that deal with memory (alloc and company), the `size_t`
type is also used for array indexing.

Given that `size_t` is a portable type, and it is unsigned by virtue, it is
a natural type for array indexing.

Besides that, `size_t` is typically large enough to represent the maximum size
of an array that can be allocated in memory.

In other words, it is capable of holding the size of the largest object you can
allocate. It is useful for indexing because this means it can index into the
largest array you can allocate.

Some standard library function implementations use `size_t` internally:

- `strcpy` [source](https://elixir.bootlin.com/glibc/glibc-2.17/source/string/strncpy.c)
- `strcat` [source](https://elixir.bootlin.com/glibc/glibc-2.17/source/string/strncat.c)

Also, using `int` (as an alternative) for the index can cause an extra ASM
instruction on x86-64:

```c
// ; zero-extending idx (in edx) is "free" by simply using rsi.
// get_index:
//   movzx  eax, BYTE PTR [rdi+rsi]
//   ret
char get_index(char *ptr, size_t idx)
{
   return ptr[idx];
}

// ; sign extending idx from 32 bits to 64 bits with movsx here.
// get_index:
//   movsx  rsi, esi
//   movzx  eax, BYTE PTR [rdi+rsi]
//   ret
char get_index(char *ptr, int idx)
{
   return ptr[idx];
}
```

## Do not do these

1. Remember that `size_t` is **unsigned**. Do not mingle arithmetic operations
   between `size_t` and other signed types. For example,
```c
#include <stdio.h>

int main() {
  size_t foo = 10;
  int bar = -20;
  size_t foo_bar = foo + bar;

  // This prints: "foo_bar is 18446744073709551606"
  printf("foo_bar is %lu", foo_bar);
}
```
2. Make sure that arithmetic doesn't overflow:
```c
#include <stdio.h>
#include <stdint.h>

int main() {
  size_t foo = (SIZE_MAX - 10);
  int bar = 11;
  size_t foo_bar = foo + bar;

  // This prints: "foo_bar is 0"
  printf("foo_bar is %lu", foo_bar);
}
```
