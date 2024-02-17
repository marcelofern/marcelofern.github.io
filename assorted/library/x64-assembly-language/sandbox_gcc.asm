; Build using:
; !nasm -f elf64 -g -F dwarf -o /tmp/a.o % && gcc /tmp/a.o -o /tmp/a.out -no-pie


section .data
  Snippet db "KANGAROO"
  QuadArray dq 1,2,4,5,76,8,8,88888

section .bss

section .text

global main

main:
  push rbp
  mov rbp, rsp
  nop
  ; EXPERIMENT CODE STARTS
  mov rax, 0xFFFF
  and al, 0x00
  mov rdx, 2
  ; EXPERIMENT CODE ENDS
  nop
  pop rbp
  ret
