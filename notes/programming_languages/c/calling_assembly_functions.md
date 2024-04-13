February 24th, 2024

## TLDR

The order of arguments is passed as such:

1. rdi
2. rsi
3. rdx
4. rcx
5. r8
6. r9

If the assembly function takes more than 6 arguments, the remaining ones
will be on $rsp+8. This is because $rsp+0 stores the value of rip that will
will be returning to the C code after the `ret` instruction.

7. rsp+8
8. rsp+8*2
9. `...`

## The sandbox

First off, when you call an assembly function from C, you need to know
which registers will contain the arguments of the function call.

We are going to do so by experimentation. First we'll compile the function
`foo` in assembly.

The function does absolutely nothing, and just returns.

```asm
section .text

global foo

foo:
    ret
```

We will compile it as such:

```
!nasm -f elf64 -g -F dwarf -o /tmp/foo.o %
```

Now we will make our C code call `foo`, and pretend it has a bunch of
parameters. We will also put an asm label "b:" so that we can put another
breakpoint and inspect the `result` variable.

```c
extern int foo(
    int a,
    int b,
    int c,
    int d,
    int e,
    int f,
    int g,
    int h,
    int i,
    int j,
    int k,
    int l,
    int m
);

int main() {
    int result = foo(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
    asm("b: nop");
}
```

We'll compile our C code with gcc:

```
!gcc -g -no-pie -o /tmp/a.out % /tmp/foo.o
```

And we will inspect the result with gdb:

```
gdb /tmp/final_program

# add a break point on foo and on b
(gdb) b foo
(gdb) b b

# run the program so it hit the first break point
(gdb) run

# print the information about registers
(gdb) i r

# this is the result:
# rax            0x401106            4198662
# rbx            0x7fffffffe548      140737488348488
# rcx            0x4                 4
# rdx            0x3                 3
# rsi            0x2                 2
# rdi            0x1                 1
# rbp            0x7fffffffe430      0x7fffffffe430
# rsp            0x7fffffffe3d8      0x7fffffffe3d8
# r8             0x5                 5
# r9             0x6                 6
# r10            0x7fffffffe160      140737488347488
# r11            0x202               514
# r12            0x0                 0
# r13            0x7fffffffe558      140737488348504
# r14            0x7ffff7ffd000      140737354125312
# r15            0x403e30            4210224
# rip            0x401160            0x401160 <foo>
# eflags         0x216               [ PF AF IF ]

# Looking at the table above, we have so that the order is:

1. rdi
2. rsi
3. rdx
4. rcx
5. r8
6. r9

# We are missing, 7-13. They should be in the stack. Starting at the position
# $rsp+8. They don't start at 0. In the position 0, you will have the `rip`,
# so that the `ret` function knows where to go back to.

(gdb) x/qx $rsp
0x7fffffffe3d8: 0x00401145
(gdb) x/qx $rsp+8
0x7fffffffe3e0: 0x00000007
(gdb) x/qx $rsp+8*2
0x7fffffffe3e8: 0x00000008
(gdb) x/qx $rsp+8*3
0x7fffffffe3f0: 0x00000009
(gdb) x/qx $rsp+8*4
0x7fffffffe3f8: 0x0000000a
(gdb) x/qx $rsp+8*5
0x7fffffffe400: 0x0000000b
(gdb) x/qx $rsp+8*6
0x7fffffffe408: 0x0000000c
(gdb) x/qx $rsp+8*7
0x7fffffffe410: 0x0000000d
(gdb) x/qx $rsp+8*8

# Continue to the next breakpoint
(gdb) c

# Print the value of the result variable
(gdb) result
$5 = 4198662

# Result contains the value that was stored in rax.
```

## Another way


Another way of seeing this is by compiling this C code and inspecting the
assembly:

```c
int foo(
    int a,
    int b,
    int c,
    int d,
    int e,
    int f,
    int g,
    int h,
    int i,
    int j,
    int k,
    int l,
    int m
) {
  return a+b+c+d+e+f+g+h+i+j+k+l+m;
}

int main() {
    int result = foo(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
}
```

In this example, the variables will start at $rsp+16 because $rsp has the
$rip, and $rsp+8 has $rbp that was pushed at the beginning of the function.

```asm
  .file  "c_to_assembly.c"
  .intel_syntax noprefix
  .text
  .globl  foo
  .type  foo, @function
foo:
  push  rbp
  mov  rbp, rsp
  mov  DWORD PTR -4[rbp], edi
  mov  DWORD PTR -8[rbp], esi
  mov  DWORD PTR -12[rbp], edx
  mov  DWORD PTR -16[rbp], ecx
  mov  DWORD PTR -20[rbp], r8d
  mov  DWORD PTR -24[rbp], r9d
  mov  edx, DWORD PTR -4[rbp]
  mov  eax, DWORD PTR -8[rbp]
  add  edx, eax
  mov  eax, DWORD PTR -12[rbp]
  add  edx, eax
  mov  eax, DWORD PTR -16[rbp]
  add  edx, eax
  mov  eax, DWORD PTR -20[rbp]
  add  edx, eax
  mov  eax, DWORD PTR -24[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 16[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 24[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 32[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 40[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 48[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 56[rbp]
  add  edx, eax
  mov  eax, DWORD PTR 64[rbp]
  add  eax, edx
  pop  rbp
  ret
  .size  foo, .-foo
  .globl  main
  .type  main, @function
main:
  push  rbp
  mov  rbp, rsp
  sub  rsp, 16
  push  13
  push  12
  push  11
  push  10
  push  9
  push  8
  push  7
  mov  r9d, 6
  mov  r8d, 5
  mov  ecx, 4
  mov  edx, 3
  mov  esi, 2
  mov  edi, 1
  call  foo
  add  rsp, 56
  mov  DWORD PTR -4[rbp], eax
  mov  eax, 0
  leave
  ret
  .size  main, .-main
  .ident  "GCC: (GNU) 13.2.1 20230801"
  .section  .note.GNU-stack,"",@progbits
```
