February 18th, 2024

# Introduction

These are the solutions for the problems in the book `xchg rax, rax`.

## 0x00

This code represents different ways of zero'ing registers:

```asm
xor eax, eax
lea rbx, [0]
loop $
mov rdx, 0
and esi, 0
sub edi, edi
push 0
pop rbp
```

The interesting trick here is:

```asm
loop $
```

The above creates an infinite loop until RCX reaches zero. The mark `$`
corresponds to the current location or address in the code. This means that
`loop` will loop back to itself.

## 0x01

rax and rdx are summed, where rax stores the value of the summation, and rdx
stores the old value of rax before the summation.

It can also compute the rcx'd element of the fibonnaci sequence assuming that
rax = 0 and rdx = 1.

```asm
.loop:
    xadd rax, rdx
    loop .loop
```

Note that `xadd` (Exchange and add) means:

> Exchanges the first operand (destination operand) with the second operand
> (source operand), then loads the sum of the two values into the destination
> operand. The destination operand can be a register or a memory location; the
> source operand is a register.

## 0x02

Returns 0 if rax is 0, returns 1 otherwise. Perhaps a boolean check.
The resulting value is stored in rax itself.

```asm
neg rax
sbb rax, rax
neg rax
```

Note that `sbb` (Subtraction with borrow) means:

> Adds the source operand (second operand) and the carry (CF) flag, and
> subtracts the result from the destination operand (first operand). The result
> of the subtraction is stored in the destination operand. The destination
> operand can be a register or a memory location; the source operand can be an
> immediate, a register, or a memory location.

And `neg` is a two's complement negation.

## 0x03

This returns the least of two numbers (rax or rdx):

```asm
sub rdx, rax
sbb rcx, rcx
and rcx, rdx
add rax, rcx
```

In other words:

```
if rdx > rax:
  return rax
else:
  return rdx
```

Note that `sbb` (Subtraction with borrow) means:

> Adds the source operand (second operand) and the carry (CF) flag, and
> subtracts the result from the destination operand (first operand). The result
> of the subtraction is stored in the destination operand. The destination
> operand can be a register or a memory location; the source operand can be an
> immediate, a register, or a memory location.

## 0x04

Toggles the case of a char (upper/lower)

```asm
xor al, 0x20
```

## 0x05

I had to look this one up online:

> Allows to branch depending on whether rax is in range [5,9] using only one
> jbe jump.

```asm
sub rax, 5
cmp rax, 4
```

## 0x06

This does nothing.

The `NOT` instruction is a logical negation. If you have 1010, it becomes 0101.
The `NEG` instruction is the two's complement negative.

The two's compliment algorithm is basically:

- Step 1: starting with the binary representation of the number, with the
  leading bit being a sign bit;
- Step 2: inverting (or flipping) all bits – changing every 0 to 1, and every 1
  to 0;
- Step 3: adding 1 to the entire inverted number, ignoring any overflow.
  Accounting for overflow will produce the wrong value for the result.

So negating and adding one, is the same thing as `NEG`. So we're basically
executing `NEG` twice, which give us the same result.

```asm
not rax
inc rax
neg rax
```

## 0x07

This also does nothing.

Say rax is 10.

1. inc rax == 11
2. neg rax == -11
3. inc rax == -10
4. neg rax == 10

```asm
inc rax
neg rax
inc rax
neg rax
```

## 0x08

`rcr` is like a shift to the right, which is effectively a division by two.

The below calculates the average between rax and rdx.

However, if there's some overflow, or for example if one operator is negative
and the other positive, the operation can fail.

Try setting rax to -20 and rdx to 30, for example.

```asm
add rax, rdx
rcr rax, 1
```

## 0x09

Calculates rax/8 and rounds it up to the near integer.

Try with:
- rax = 9
- rax = 7
- rax = 8
- rax = 15

```asm
shr rax, 3
adc rax, 0
```

## 0x0a

> Increments by one an arbitrarily long little-endian integer at rdi.

I had to look this one up.

```asm
add byte [rdi], 1
.loop:
    inc rdi
    adc byte [rdi], 0
    loop .loop
```

## 0x0b

My solution was: Negate `rdx` if `rax` == 0, do a `not` otherwise.

> Computes the negation of the 128-bit integer stored in the RDX:RAX registers
> (thanks Aviya Erenfeld!).

```asm
not rdx
neg rax
sbb rdx, -1
```
