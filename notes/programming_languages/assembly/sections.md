February 18th, 2024

# Introduction

I have only tested sections in Intel x64. After a bit of Googling I checked
they work with other architectures, but syntax differences may be present.

## .data

Contains data definitions of initialised data items. Those have a value before
the program begins:

```asm
SECTION .data
    MyByte db 0x7
    MyWord dw 0xFFFF
    MyDoubleWord dd 0x12345678
    MyQuadWord dq 0xFFFFFFFFFFFFFFFF
    QuadWordArray dq "21,15,16,7,888,851"

    ; Strings are interesting as their value points to the first byte
    ; in memory where the string lives. Also, strings can be concatenated by
    ; using a comma ",". Thus, the number 10 is being concatenated to the
    ; string below. 10 == EOL (or new line) in Linux (a.k.a 0xA).
    EatMsg: db "Eat at Joe's!", 10
    ; equ = equate. Use to associate a value with a label. Every time the
    ; assembler finds this label, it swaps by the result of the equation.
    ; Similar to C's macros. When NASM reaches the label EatLen, the value of
    ; $ is the location immediately after the last character of EatMsg. We
    ; take this value and "-" subtract it from the location at the beginning of
    ; the EatMsg string. End - Beginning = Length
    EatLen: equ $-EatMsg
```

Data items defined in this section increase the size of the executable file.

## .bss (Block Start Symbol)

In this section you allocate blocks of memory to be used later during
execution.

Data items defined in this section **do not** increase the size of the
executable file. This is because of the way Linux brings the program into
memory, by allocating space in memory for data items in the `.bss` section when
fetching the executable from disk.

```asm
; somewhere in the code
lea rcx, [some_memory] ; Load effective address of memory location

; then
section .bss
    some_memory resq 1 ; Reserve 1 quadword (64 bits)
```

### resb / restw / restd/ resq

Reserve bytes instruction, where N is the number of bytes to reserve:

```asm
section .bss
    Buff resb 42 ; reserves 42 bytes for Buff
```

### equ

Stands for equate.

Use to associate a value with a label. Every time the assembler finds this
label, it swaps by the result of the equation. Similar to C's macros.

```asm
sections .bss
    BUFFLEN equ 128
```

## .text

This section stores the machine instructions that make up the program.

All global labels need to be declared in this section, otherwise they cannot be
seen outside of the program.
