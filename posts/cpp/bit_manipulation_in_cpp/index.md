---
title: Bit Manipulation In C++
author: Marcelo Fernandes
date: April 05, 2023
---

## Bit shifting

Bit shifting involves moving bits of a binary number to either the left or the
right. Most programming languages use the characters `<<` to indicate a left
bit shift, and `<<` to indicate a right bit shift.

There are a few common operations that can be performed through. These are:

1. Multiplication by 2
```cpp
int main() {
  int twenty_three = 0b10111;
  int ninety_two = twenty_three << 2;
  std::cout << ninety_two;
}
```
2. Division by 2
```cpp
int main() {
  int twenty_two = 0b10110;
  int eleven = twenty_two >> 1;
  std::cout << eleven;
}
```
3. Extracting bits
```cpp
int main() {
  // Extract the forth less-significant bit.
  int binary_number = 0b01110;
  int bit_value = binary_number >> 3 & 0b1;
  std::cout << bit_value;
}
```
4. Inserting bits
```cpp
int main() {
  int binary_number = 0b001001;
  int one = 1;
  // set the 3rd bit to 0
  int result = binary_number | (one << 2);
  std::cout << result;  // 0b001101
}
```

## Masking

A bit masking is a binary number used to enable or disable specific bits
of another binary number. In the examples above we have already used bit
masking.

In our insertion example above, we could have just used a masking number and
the `|` or bit operator instead:

```cpp
int main() {
  int binary_number = 0b000001;
  int mask = 0b000100;
  std::cout << (binary_number | mask); // 5
}
```

## Shifting and masking in assembly.

Here's a simple code to set the second bit from right to left using a mask and
the `|` operator:

```cpp
int bit_number = 0b00100;
int mask = 0b00010;
int result = bit_number | mask;
```

And the assembly code:

```assembly
bit_number:
        .long   4
mask:
        .long   2
result:
        .zero   4
__static_initialization_and_destruction_0(int, int):
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-4], edi
        mov     DWORD PTR [rbp-8], esi
        cmp     DWORD PTR [rbp-4], 1
        jne     .L3
        cmp     DWORD PTR [rbp-8], 65535
        jne     .L3
        mov     edx, DWORD PTR bit_number[rip]
        mov     eax, DWORD PTR mask[rip]
        or      eax, edx
        mov     DWORD PTR result[rip], eax
.L3:
        nop
        pop     rbp
        ret
_GLOBAL__sub_I_bit_number:
        push    rbp
        mov     rbp, rsp
        mov     esi, 65535
        mov     edi, 1
        call    __static_initialization_and_destruction_0(int, int)
        pop     rbp
        ret
```

This assembly code defines a function called
`"__static_initialization_and_destruction_0"` that takes two integer arguments
and initializes a global variable called "result" based on their values.

The code starts by reserving space on the stack for the function's local
variables using the "push" and "mov" instructions. It then stores the function
arguments in the stack at [rbp-4] and [rbp-8].

Next, the code checks if the first argument ([rbp-4]) is equal to 1 using the
"cmp" instruction, and jumps to label ".L3" if it is not equal. It then checks
if the second argument ([rbp-8]) is equal to 65535 using the "cmp" instruction,
and also jumps to label ".L3" if it is not equal.

If both conditions are met, the code loads the value of the global variable
`"bit_number"` into the register edx using the "mov" instruction with a
RIP-relative addressing mode. It then loads the value of the global variable
"mask" into the register eax, and performs a bitwise OR operation between eax
and edx using the "or" instruction. The resulting value is then stored in the
global variable "result" using a RIP-relative addressing mode.

Finally, the code executes a "nop" instruction, pops the stack to restore the
previous stack pointer using the "pop" instruction, and returns from the
function using the "ret" instruction.

There is also another function called `"_GLOBAL__sub_I_bit_number"` that
initializes the global variables "edi" and "esi" with the values 1 and 65535
respectively, and then calls the `"__static_initialization_and_destruction_0"`
function with these values. This function is likely called automatically by the
compiler during program startup to initialize the global variables before
main() is called.

This looks a bit more convoluted than you would expect because the compiler
adds the overhead of using `1` and `65535` as "magic numbers" to initialise
those variables. I still don't know for sure why this needs to happen.

Now let's try to achieve the same result using shifting to see the code
difference:

```cpp
int bit_number = 0b00100;
int mask = 0b00001;

int result = bit_number | (mask << 3);
```

The assembly code looks like this:

```assembly
bit_number:
        .long   4
mask:
        .long   1
result:
        .zero   4
__static_initialization_and_destruction_0(int, int):
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-4], edi
        mov     DWORD PTR [rbp-8], esi
        cmp     DWORD PTR [rbp-4], 1
        jne     .L3
        cmp     DWORD PTR [rbp-8], 65535
        jne     .L3
        mov     eax, DWORD PTR mask[rip]
        lea     edx, [0+rax*8]
        mov     eax, DWORD PTR bit_number[rip]
        or      eax, edx
        mov     DWORD PTR result[rip], eax
.L3:
        nop
        pop     rbp
        ret
_GLOBAL__sub_I_bit_number:
        push    rbp
        mov     rbp, rsp
        mov     esi, 65535
        mov     edi, 1
        call    __static_initialization_and_destruction_0(int, int)
        pop     rbp
        ret
```

The only difference lies on how the bit shifting happens:
`lea edx, [0+rax*8]`

The instruction `lea edx, [0+rax*8]` performs a "load effective address"
operation, which computes the memory address that corresponds to a given memory
operand and stores it in the destination register. In this case, the
instruction is calculating an address based on the value of rax, which was
previously loaded with the value of the mask variable.

The `[0+rax*8]` memory operand specifies a scaled indexed addressing mode, where
the value of rax is multiplied by the scale factor of 8 (i.e., each element of
the array is 8 bytes wide), and then added to the base address of 0. Since the
base address is 0, the instruction is effectively multiplying rax by 8.

The reason that the `lea edx, [0+rax*8]` instruction is using the lea (load
effective address) instruction instead of the mul (multiply) instruction is
that lea is a more efficient way of performing simple arithmetic operations
that involve multiplication by a power of two.

In this case, the mul instruction would not be appropriate because we are not
multiplying rax by an arbitrary value, but rather by a power of two (i.e., 8).
Since multiplication by a power of two is equivalent to shifting the binary
representation of the number to the left by a certain number of bits, the lea
instruction can be used to accomplish the same thing as the mul instruction,
but more efficiently.

Specifically, the lea instruction can be used to compute an address that is a
scaled version of a register value, where the scale factor can be 1, 2, 4, or 8.
If we needed to multiply by a number greater than 8, we wouldn't be using this
instruction any more.
