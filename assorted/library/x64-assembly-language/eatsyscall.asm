; Build using:
; !nasm -f elf64 -g -F stabs -o /tmp/eatsyscall.o %
; !ld -o /tmp/a.out /tmp/eatsyscall.o

; Section containing initialised data
SECTION .data
  EatMsg: db "Eat at Joe's!",10
  EatLen: equ $-EatMsg
; Section containing uninitialised data
SECTION .bss
; Section containing code
SECTION .text
global  .start; linker needs this to find the entry point.
start:
  mov rbp, rsp ; for correct debugging
  nop ; this no-op keeps gdb happy
  mov rax, 1 ; 1 = sys_write for syscall
  mov rdi, 1 ; 1= fd for stdout
  mov rsi, EatMsg ; put address of the message string in rsi
  mov rdx, EatLen ; length of string to be written in rdx
  syscall ; make the system call
  mov rax, 60 ; 60 sys_exit = exit the program
  mov rdi, 0 ; return value in rdi 0 = nothing to return
  syscall ; Call syscall to exit
