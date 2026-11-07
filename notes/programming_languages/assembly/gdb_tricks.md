February 18th, 2024

# Introduction

A collection of notes about making Assembly work more pleasurable with GDB
debugging.

## Basics

Read these before expanding to the next sections.

1. Set the layout `layout src` (or `ctrl + x + a`).
2. Use `ni` and `si` (next instruction / step instruction).
3. use `i r rax` (info register rax) to inspect a register.
4. flag register is available as `i r eflags`
5. run `set disassembly-flavor intel` so MOV instructions aren't in reverse.
6. use `x 0x402000` to print value starting in memory block 0x402000
7. use `x/xg 0x402000` to do the same but print 64bit in hex decimal.
8. You can normally use `p` for printing .data (casting them in C first!)
9. Use `p /t $rax` to print contents of rax in binary.

## Layout

Layout allows you to have your code and the line being debugged side-by-side on
the GDB terminal user interface.

You can have the following window configurations:

- source
- assembly
- source and assembly
- source and registers
- assembly and registers

To change the layout you can type `layout` followed by a configuration.

```sh
(gdb) layout src
```

Helpful shortcuts:

**ctrl + x + 1**: Use the TUI with only 1 window configuration.
**ctrl + x + 2**: Use the TUI with at least 2 windows.

On the command terminal window, you can type `focus` + name of the window so
that your keyboard arrows work within the specified window:

```sh
(gdb) focus src
```

## Printing memory addresses

You can use `p` followed by a C-casting command to find what the byte stored
in a memory address is. For example:

```sh
(gdb) p (char*)0x402000
```

## Disassemble

Disassembles a specified section of memory. Can be useful for determining
the assembly code in a routine.

```sh
(gdb) disassemble main // print all instructions of main.
(gdb) disassemble /s main // also adds the source code.
```
