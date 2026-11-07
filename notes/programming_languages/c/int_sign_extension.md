Take the following byte:

```
00000011
```

This byte represents the numeral `3`.
If we want to turn this number into `-3` we have to perform the Two's
Complement operation.

1. Write the absolute value of a number in binary.
2. Flip all the bits (0 becomes 1, and 1 becomes 0).
3. Add 1 to the result.

So it follows that the numeral `-3` is represented in a byte by:

```
11111101
```

However, in certain cases we want to cast this byte (`int8_t`) to a larger
quantity, say for example a (`int16_t`).

For that to happen, we need to perform a sign extension.

## Signed extension

The procedure is as follow:

1. Grab the value of the sign bit (highmost bit).
2. Extend the binary number by filling the high bits with the sign bit.

For the numeral 3 we have:
```
00000000 00000011
```

And for the numeral -3 we have:
```
11111111 11111101
```

The numeral -3 has been extended, and it is still the Two's Complement of 3.

## In C

C will automatically sign extend the numbers when casting an integer with more
storage space.

I am not entirely sure right now if this is implementation dependent or if it
is a defined behaviour expected by the language.

```c
#include <stdint.h>

int main() {
  int8_t num = -3;
  // (gdb) p /t num
  // > 11111101

  int16_t num16 = num;
  // (gdb) p /t num16
  // > 11111111 11111101

  // (gdb) p /t num32
  // > 11111111 11111111 11111111 11111101
  int num32 = num;

  // (gdb) p /t num64
  // > 11111111 11111111 11111111 11111111 11111111 1111111 11111111 111111101
  long long num64 = num;
}
```
