February 18th, 2024

# Introduction

Save these code sandboxes in a file, and run the commands at the top from
neovim.

## Using `gcc`

```asm
; Build using:
; !nasm -f elf64 -g -F dwarf -o /tmp/a.o % && gcc /tmp/a.o -o /tmp/a.out -no-pie


section .data
  Snippet db "KANGAROO"
  QuadArray dq 1,2,4,5,76,8,8,88888

section .bss

section .text

global main

main:
  ; prolog
  push rbp
  mov rbp, rsp
  nop
  ; EXPERIMENT CODE STARTS
  mov rax, 0xFFFF
  and al, 0x00
  mov rdx, 2
  ; EXPERIMENT CODE ENDS
  nop
  ; epilog
  pop rbp
  ret
```

## Using `ld`

```asm
; Build using:
; !nasm -f elf64 -g -F stabs -o /tmp/a.o % && ld -o /tmp/a.out /tmp/a.o


section .data
  Snippet db "KANGAROO"
  QuadArray dq 1,2,4,5,76,8,8,88888

section .text

global _start

_start:
  mov rbp, rsp ; Save stack pointer for debugger
  nop
  ; EXPERIMENT CODE STARTS
  mov rax, 0xFFFF
  and al, 0x00

  mov rdx, 2
  ; EXPERIMENT CODE ENDS
  nop
  jmp _exit

_exit:
  mov rax, 60 ; Code for the exit syscall
  mov rdi, 0 ; 0 means success
  syscall

section .bss
```
