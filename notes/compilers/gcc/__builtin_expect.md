# `__builtin_expect`

```
Created at: 2024-10-26
```

The built-in function `__builtin_expect` is used to help the hardware with
branch prediction.

It has the following declaration:

```c
long __builtin_expect (long exp, long c)
```

From the documentation:

> You may use __builtin_expect to provide the compiler with branch prediction
> information. In general, you should prefer to use actual profile feedback for
> this (-fprofile-arcs), as programmers are notoriously bad at predicting how
> their programs actually perform. However, there are applications in which
> this data is hard to collect.

> The return value is the value of exp, which should be an integral expression.
> The semantics of the built-in are that it is expected that exp == c. For
> example:

```c
if (__builtin_expect (x, 0))
  foo ();
```

> indicates that we do not expect to call foo, since we expect x to be zero.

## Example

Take for example this code:

```c
#include <stdbool.h>

extern bool foo();
extern void foo_is_false(void);
extern void foo_is_true(void);

int main() {
  if (foo()) {
    foo_is_true();
  } else {
    foo_is_false();
  }
  return 0;
}
```

Compiling with `gcc -03` you get this assembly:

```asm
main:
  sub  rsp, 8
  xor  eax, eax
  call  foo@PLT
  test  al, al
  je  .L2
  call  foo_is_true@PLT
.L3:
  xor  eax, eax
  add  rsp, 8
  ret
.L2:
  call  foo_is_false@PLT
  jmp  .L3
```

Note how we jump to "foo_is_false" after the test.
Now let's switch that line for:

```c
  if (__builtin_expect(foo(), true)) {
```

We get:

```asm
main:
  sub  rsp, 8
  xor  eax, eax
  call  foo@PLT
  test  al, al
  jne  .L6
  call  foo_is_false@PLT
.L3:
  xor  eax, eax
  add  rsp, 8
  ret
.L6:
  call  foo_is_true@PLT
  jmp  .L3
```

The difference is subtle, but see how the `foo_is_true` and `foo_is_false`
calls have swapped places.

## `__builtin_expect_with_probability`

This is another built in that helps with branch prediction. However, it takes
a "probability" argument taking a float value from 0 to 1.

```c
long __builtin_expect_with_probability(long exp, long c, double probability)
```

If we change the if conditional to:

```c
// Expects it to be true
if (__builtin_expect_with_probability(foo(), false, 0.4)) {

// Expects it to be false
if (__builtin_expect_with_probability(foo(), false, 0.6)) {
```
