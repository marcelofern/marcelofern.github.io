# Calling C Functions

```
Created at: 2024-10-20
```

## TLDR

The order of arguments to the C function is passed in the following registers:

1. rdi
2. rsi
3. rdx
4. rcx
5. r8
6. r9

If the C function takes more than 6 arguments, the remaining ones
will be on $rsp+8. This is because $rsp+0 stores the value of rip that
will be returning to the assembly code after the `return` instruction.

The following registers are callee-saved, meaning that callee functions should
not have altered the content of these registers at the point in which they
return back to the caller. It is fine to change them and reset them to the
original value though:

- rbx
- rbp
- r12
- r13
- r14
- r15

All other registers except the stack pointer rsp are classified as caller-saved
registers. This means that any function can modify them. If those registers
mean anything to the assembly caller, they must be saved. Otherwise, the callee
is free to change them and so a bug may happen.

## Code

Given the following C function:

```c
// gcc -c foo.c -o foo.o
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
  return a-b+c-d+e-f+g-h+i-j+k-l+m;
}
```

And the following assembly code:

```asm
; nasm -f elf64 call_foo.asm -o call_foo.o

section .data
section .text
    global main         ; Entry point for the program
    extern foo            ; Declare the C function

main:
    ; Prepare arguments for foo
    mov rdi, 1           ; a = 1
    mov rsi, 2           ; b = 2
    mov rdx, 3           ; c = 3
    mov rcx, 4           ; d = 4
    mov r8, 5            ; e = 5
    mov r9, 6            ; f = 6
    ; Remaining arguments (g to m) go on the stack
    push 7               ; g = 7
    push 8               ; h = 8
    push 9               ; i = 9
    push 10              ; j = 10
    push 11              ; k = 11
    push 12              ; l = 12
    push 13              ; m = 13

    ; Call the foo function
    call foo

    ; Cleanup stack (13 arguments total)
    add rsp, 104         ; Clean up 13 * 8 bytes (for 64-bit architecture)

    ; Exit the program
    mov rax, 60          ; syscall: exit
    xor rdi, rdi         ; status: 0
    syscall
```

Now we compile both files into an executable:

```sh
gcc -Og -O0 call_foo.o foo.o -o call_foo
```

We can then run gdb against the executable, the value of rax is **7**.
This is what we expected: `1-2+3-4+5-6+7-8+9-10+11-12+13 == 7`.

Checking the `foo` function in assembly we have:

```asm
foo:
  push  rbp
  mov  rbp, rsp
  mov  DWORD PTR -4[rbp], edi
  mov  DWORD PTR -8[rbp], esi
  mov  DWORD PTR -12[rbp], edx
  mov  DWORD PTR -16[rbp], ecx
  mov  DWORD PTR -20[rbp], r8d
  mov  DWORD PTR -24[rbp], r9d
  mov  eax, DWORD PTR -4[rbp]
  sub  eax, DWORD PTR -8[rbp]
  mov  edx, eax
  mov  eax, DWORD PTR -12[rbp]
  add  eax, edx
  sub  eax, DWORD PTR -16[rbp]
  mov  edx, eax
  mov  eax, DWORD PTR -20[rbp]
  add  eax, edx
  sub  eax, DWORD PTR -24[rbp]
  mov  edx, eax
  mov  eax, DWORD PTR 16[rbp]
  add  eax, edx
  sub  eax, DWORD PTR 24[rbp]
  mov  edx, eax
  mov  eax, DWORD PTR 32[rbp]
  add  eax, edx
  sub  eax, DWORD PTR 40[rbp]
  mov  edx, eax
  mov  eax, DWORD PTR 48[rbp]
  add  eax, edx
  sub  eax, DWORD PTR 56[rbp]
  mov  edx, eax
  mov  eax, DWORD PTR 64[rbp]
  add  eax, edx
  pop  rbp
  ret
```
