# x86 Assembly For Advent Of Code 2024

```
Created at: 2024-10-20
```

For last year's Advent Of Code I decided to take the challenge to a new level
by using x86 Assembly to complete the problems.

That was for educational purposes more than anything, but it taught me a great
deal about the Linux ABI, performing syscalls from Assembly, and calling C code
via libraries.

## Basics

Problems in Advent of Code usually involve reading and parsing a dataset in
text format and analysing it to calculate the result for the problem.

The bare minimum our assembly program needs is a set of routines that can load
and read a text file.

I will create three Assembly routines:

- `open_file`: Takes a file name and returns the file descriptor for that
  file.
- `read_line`: Takes the file descriptor and read it to extract one line and
  return.
- `close_file`: Takes a file descriptor and closes it.

I have no interest in reimplementing the C Standard Library, so I will use some
of the functions already available for it and wrap them in Assembly code. I
will limit myself to C99.

- `fopen`: will be used by `open_file`.
- `fgets`: will be used by `read_line`.
- `fclose`: will be used by `close_file`.

Before I proceed to show the code that implements these Assembly procedures,
first we need to go through a refresher on Linux ABI because we'll be using
external C libraries.

## ABI Function Call Conventions

When calling a C function from Assembly, the order of arguments passed into
the C function is mapped to the following registers:

1. rdi
2. rsi
3. rdx
4. rcx
5. r8
6. r9

If the C function takes more than 6 arguments, the remaining ones
need to be on $rsp+8. This is because $rsp+0 stores the value of rip that
will be returning to the assembly code after the `return` instruction.

The following registers are callee-saved, meaning that callee functions should
not have altered the content of these registers at the point in which they
return back to the caller. It is fine to change them and reset them to the
original value, though:

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

## Introducing file.asm

With this information, we now know how to code our routines that deal with a
file descriptor.

Let's start with the easy ones, `open_file` and `close_file`.

### open_file

As discussed, we'll use the `fopen` function from the C standard library.
For C99, the function declaration is as follows [source](http://web.archive.org/web/20240930191632/https://en.cppreference.com/w/c/io/fopen):

```c
FILE *fopen( const char *restrict filename, const char *restrict mode );
```

This means that before calling the function our assembly code must:

1. Have a pointer to the filename stored in `rdi`.
2. Have another pointer to the mode. For our case, it will always be `'r'` for
   "read". This should be stored in `rsi`.
3. The returned value will be a pointer to a `FILE` stored in `rax`.

Putting it all together, we have the following code:

```asm
global open_file

extern exit
extern fopen
extern fprintf
extern stderr

OPEN_FILE_ERROR_MSG db "Could not open the file.", 0x0A, 0
OPEN_FILE_ERROR_CODE equ 200

; ROUTINE `open_file`
;  opens a file pointed by RDI with mode option pointed by RSI.
;  stores the file descriptor pointer in the address at RAX.
;  on error: prints a message to stderr and exits.
open_file:
  ;prolog
  push rbp
  mov rbp, rsp

  call fopen
  cmp rax, 0
  jz .error

  ;epilog
  pop rbp
  ret
.error:
  ; send a nice message to stderr
  mov rdi, [stderr]
  mov rsi, OPEN_FILE_ERROR_MSG
  call fprintf
  ; and exit
  mov rdi, OPEN_FILE_ERROR_CODE
  call exit
```

TODO: ADD MORE INFO

```asm
global close_file
global open_file
global read_line

extern exit
extern fclose
extern fgets
extern fopen
extern fprintf
extern stderr

OPEN_FILE_ERROR_MSG db "Could not open the file.", 0x0A, 0
OPEN_FILE_ERROR_CODE equ 200

CLOSE_FILE_ERROR_MSG db "Could not close the file.", 0x0A, 0
CLOSE_FILE_ERROR_CODE equ 201

; ROUTINE `open_file`
;  opens a file pointed by RDI with mode option pointed by RSI.
;  stores the file descriptor pointer in the address at RAX.
;  on error: prints a message to stderr and exits.
open_file:
  ;prolog
  push rbp
  mov rbp, rsp

  call fopen
  cmp rax, 0
  jz .error

  ;epilog
  pop rbp
  ret
.error:
  ; send a nice message to stderr
  mov rdi, [stderr]
  mov rsi, OPEN_FILE_ERROR_MSG
  call fprintf
  ; and exit
  mov rdi, OPEN_FILE_ERROR_CODE
  call exit

; ROUTINE `close_file`
;  closes a file descriptor integer on RDI.
;  on error: prints a message to stderr and exits.
close_file:
  ;prolog
  push rbp
  mov rbp, rsp

  call fclose
  cmp rax, 0
  jnz .error

  ;epilog
  pop rbp
  ret
.error:
  ; send a nice message to stderr
  mov rdi, [stderr]
  mov rsi, CLOSE_FILE_ERROR_MSG
  call fprintf
  ; and exit
  mov rdi, CLOSE_FILE_ERROR_CODE
  call exit

; ROUTINE `read_line`
;  reads at most RSI characters - 1 from the stream pointed by RDX, into a
;  buffer pointed by RDI. Stops reading once a new line is hit. A terminating
;  '\0' char is stored after the last character in the buffer.
;
;  RAX will contain a pointer to the stream upon success, or a NULL on error
;  or when EOF occurs. Good look finding which is which!
read_line:
  push rbp
  mov rbp, rsp

  call fgets
  ; todo: handle errors.

  pop rbp
  ret
```
