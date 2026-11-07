# CSAPP

I have started this book somewhere around June 2024. It is thick, and it is
full of information and homework.

I am trying to not be too ambitious so I will not commit to reading the whole
book, though it wouldn't be a tragedy if I end up doing so. The chapters that I
have chosen to read are already plenty to go through, and they have been
selected based on where I believe most of my knowledge gaps are:

- Chapter 3: Machine-Level Representation of Programs
- Chapter 4: Processor Architecture
- Chapter 5: Optimising Program Performance
- Chapter 7: Linking
- Chapter 9: Virtual Memory

I'll also skim through the following chapters, but likely not going to dive too
deep:

- Chapter 6: The Memory Hierarchy
- Chapter 8: Exceptional Control Flow

## Tools

For assembly code, I much prefer Intel syntax over AT&T. It is annoying that
`gcc` and `objdump` defaults use AT&T, so we need to set the appropriate flags
in many commands below.

### Compiling and running `.c` binaries
```sh
gcc -Og /tmp/main.c -o /tmp/a.o && /tmp/a.o
```

### Compiling `.c` to `.asm`
```sh
gcc -S -masm=intel -fno-asynchronous-unwind-tables <options> -o /tmp/main.asm
```
I've translated the above to a vim command "CToAssembly" for convenience.

### Showing the compiled bytes for function

```sh
gdb /tmp/a.o
# Display the first 14 hex of the function my_sweet_function.
# However note that using a disassembler is best! See section below.
(gdb) x/14xb my_sweet_function
```

### Disassembling

```sh
objdump -d --disassembler-options=intel /tmp/a.o
```

Analogously, I've translated the above to a vim command "Disassembler" for
convenience.

## Pertinent notes

Calling convention between C and assembly for function calls.
The order of arguments is:

1. rdi
2. rsi
3. rdx
4. rcx
5. r8
6. r9
