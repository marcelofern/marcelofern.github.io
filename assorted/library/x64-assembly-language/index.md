January 13, 2024

## Notes about GDB

1. Set the layout `layout asm`.
2. Use `ni` and `si` (next instruction / step instruction).
3. use `i r rax` (info register rax) to inspect a register.
4. run `set disassembly-flavor intel` so MOV instructions aren't in reverse.
5. use `x 0x402000` to print value starting in memory block 0x402000
6. use `x/xg 0x402000` to do the same but print 64bit in hex decimal.
7. flag register is available as `i r eflags`
8. You can normally use `p` for printing .data (casting them in C!)

## Registers

### Cheatsheet

```
| 64 bits | 32 bits | 16 bits | 8 bits |
| rax     |  eax    | ax      | al     |
| rbx     |  ebx    | bx      | bl     |
| rcx     |  ecx    | cx      | cl     |
| rdx     |  edx    | dx      | dl     |
| rsi     |  esi    | si      | sil    |
| rdi     |  edi    | di      | dil    |
| rbp     |  ebp    | bp      | bpl    |
| rsp     |  esp    | sp      | spl    |
| r8      |  r8d    | r8w     | r8b    |
| r9      |  r9d    | r9w     | r9b    |
| r10     |  r10d   | r10w    | r10b   |
| r11     |  r11d   | r11w    | r11b   |
| r12     |  r12d   | r12w    | r12b   |
| r13     |  r13d   | r13w    | r13b   |
| r14     |  r14d   | r14w    | r14b   |
| r15     |  r15d   | r15w    | r15b   |
```

### FLAGS register (eflags)

- `Bit: 0, Label: CF, Description`: Carry Flag: Set by arithmetic instructions
  which generate either a carry or borrow. Set when an operation generates a
  carry to or a borrow from a destination operand.

- `Bit: 2, Label: PF, Description`: Parity flag: Set by most CPU instructions
  if the least significant (aka the low-order bits) of the destination operand
  contain an even number of 1's.

- `Bit: 4, Label: AF, Description`: Auxiliary Carry Flag: Set if there is a
  carry or borrow involving bit 4 of EAX. Set when a CPU instruction generates
  a carry to or a borrow from the low-order 4 bits of an operand. This flag is
  used for binary coded decimal (BCD) arithmetic.
- `Bit: 6, Label: ZF, Description`: Zero Flag: Set by most instructions if the
  result an operation is binary zero.
- `Bit: 7, Label: SF, Description`: Sign Flag: Most operations set this bit the
  same as the most significant bit (aka high-order bit) of the result. 0 is
  positive, 1 is negative.
- `Bit: 8, Label: TF, Description`: Trap Flag: (sometimes named a Trace Flag.)
  Permits single stepping of programs. After executing a single instruction,
  the processor generates an internal exception 1. When Trap Flag is set by a
  program, the processor generates a single-step interrupt after each
  instruction. A debugging program can use this feature to execute a program
  one instruction at a time.
- `Bit: 9, Label: IF, Description`: Interrupt Enable Flag: when set, the
  processor recognizes external interrupts on the INTR pin. When set,
  interrupts are recognized and acted on as they are received. The bit can be
  cleared to turn off interrupt processing temporarily.
- `Bit:10, Label: DF, Description`: Direction Flag: Set and cleared using the
  STD and CLD instructions. It is used in string processing. When set to 1,
  string operations process down from high addresses to low addresses. If
  cleared, string operations process up from low addresses to high addresses.
- `Bit:11, Label: OF, Description`: Overflow Flag: Most arithmetic instructions
  set this bit, indicating that the result was too large to fit in the
  destination. When set, it indicates that the result of an operation is too
  large or too small to fit in the destination operand.
- `Bit:12-13, Label: IOPL , Description`: Input/Output privilege level flags:
  Used in protected mode to generate four levels of security.
- `Bit:14, Label: NT, Description`: Nested Task Flag: Used in protected mode.
  When set, it indicates that one system task has invoked another via a CALL
  Instruction, rather than a JMP.
- `Bit:16, Label: RF, Description`: Resume Flag: Used by the debug registers
  DR6 and DR7. It enables you to turn off certain exceptions while debugging
  code.
- `Bit:17, Label: VM, Description`: Virtual 8086 Mode flag: Permits 80386 to
  behave like a high speed 8086. 

#### Relevant flags

- `SF`: Sign Flag. Set when the result of an operation forces the operand to
  become negative.
- `ZF`: Zero Flag. Set when the result of an operation become zero (conditional
  jumps).
- `OF`: Overflow Flag. Set when the result of an arithmetic operation on a
  signed integer is too large to fit.
- `CF`: Carry Flag. Used in unsigned arithmetic expressions.
- `IF`: Interrupt flag: Usually active when debugging (step through code).


## Instructions

### ADD

ADD adds the source operand to the destination operand, and after the
operation, the result replaces the destination operand. The add operation is an
arithmetic add and does not take the Carry flag into account. (To add using the
Carry flag, use the ADC Add with Carry instruction.) All affected flags are set
according to the operation. Most importantly, if the result does not fit into
the destination operand, the Carry flag is set to 1.

```asm
  mov rax, 0x23456
  mov rbx, 0x54321
  add rax, rbx
```

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  *  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### AND

Bit-by-bit binary operation. Useful for masking.

```asm
  and rax, rbx
```

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  ?  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

AND performs the AND logical operation on its two operands. Once the opera-
tion is complete, the result replaces the destination operand. AND is performed
on a bit-by-bit basis

Note that the operation makes the Auxiliary carry flag unde- fined. CF and OF
are cleared to 0, and the other affected flags are set according to the
operation’s results.

### BT

Bit test.

It takes two operands, the destination that needs to be tested, and the
source operand, which is the ordinal number bit that you want to test
**starting from 0** (if you want to test the fourth bit from the right, the
source = 3).

BT copies a single specified bit from the left operand to the Carry flag, where
it can be tested or fed back into a quantity using one of the shift/rotate
instruc- tions. Which bit is copied is specified by the right operand. Neither
operand is altered by BT

```asm
bt rax, 4 ; test bit 4 of rax -> 10000b
jnc quit  ; we're done if bit 4 = 0 (not carry).
```

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |  *  |     |     |     |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### CALL

Calls a routine. Before transferring control, CALL pushes the address of the
instruction immediately after itself onto the stack. This allows a RET
instruction (see also) to pop the return address into RIP and thus return
control to the instruction immediately after the CALL instruction

```asm
call MyOtherRoutine
```

Note: The procedure `MyOtherRoutine` must have at least one RET instruction.
Note: Can also be called with a register address

```asm
mov r13, myLabel
call r13
```


Flags affected (none in this case):
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |     |     |     |     |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### CLD

Clear Direction Flag. This is relevant for string instruction work. It defines
what direction in memory that a string operation takes.

A clear flag usually means you want to go up-hill on memory. I.e., from the
lowest address to the highest. If you want the opposite, use the STD
instruction instead.

### CMP

Compares two values. The destination operand is not affected.

The operation itself is identical to arithmetic subtraction of the source from
the destination without borrow (SUB), save that the result does not replace the
destination.

```asm
cmp rax, rbx ; sets OF, SF, ZF, AF, PF, and CF
jne SomeWhere
cmp byte [Buffer], 0xFF
jng SomeWhereElse
```

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  *  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### DIV

Warning: contains implicit operand.

```asm
div rbx
```

Divides `edx:eax` by `rbx`. The result (quotient) is in EAX and the remainder
in EDX. Works similarly for AX, EAX, RAX.

DIV divides the implicit dividend by the explicit divisor specified as DIV’s
single operand. For dividing by 8-bit quantities, the dividend is assumed to be
in AX. For dividing by 16-bit, 32-bit, and 64-bit quantities, the dividend is
assumed to be in two registers, allowing a much greater range of calculation.
The least significant portion of the dividend is placed in the “A” register (AX
/ EAX / RAX), and the most significant portion of the dividend is placed in the
“D” register (DX / EDX / RDX). Note that even when there is no “high” portion
of the dividend, the “D” register is cleared to 0 by DIV and cannot be used to
hold independent values while a DIV instruction is executed. 

DIV leaves no information in the flags. Note, however, that OF, SF, ZF, AF, PF,
and CF become undefined after a DIV instruction.

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  ?  |  ?  |     |     |  ?  |  ?  |  ?  |     |  ?  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```


### INC and DEC

Increment or decrement the value by one.

INC adds 1 to its single operand and does not affect the Carry flag CF. Be
care- ful about that; it’s a common error to try to use CF after an INC
instruction as though it were ADD instead. INC acting on memory data forms must
be used with a data size specifier such as BYTE, WORD, DWORD, and QWORD.

DEC subtracts 1 from its single operand and does not affect the Carry flag CF.
Be careful about that; it’s a common error to try to use CF after a DEC
instruction as though it were SUB instead. DEC acting on memory data forms must
be used with a data size specifier such as BYTE, WORD, DWORD, and QWORD.

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  *  |     |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### JA, JAE, JNA, JNAE

Note: unsigned comparison.
Jump if above (equal/not equal). In this case, if the value in rax was higher
than rbx.

```asm
cmp rax, rbx
ja Somewhere
```

### JB, JBE, JNB, JNBE

Note: unsigned comparison.
Jump if below (equal/not equal). In this case, if the value in rax was lower
than rbx.

```asm
cmp rax, rbx
jb Somewhere
```

### JC, JNC

Jump if the carry flag is set/not set.

### JE, JNE

Jump if equal/not equal.

```asm
cmp rax, rbx
je Somewhere
```

### JG, JGE, JNG, JNGE

Note: signed comparison.
Jump if greater (equal/not equal).

### JL, JLE, JNL, JNLE

Note: signed comparison.
Jump if less (equal/not equal).

### JZ, JNZ

Jump if zero (if ZF flag == 0) or not zero.

```
  mov rax, 2
DoMore:
  dec rax
  jz SomewhereElse
  jmp DoMore
```

### LEA

Load effective address.

Allows you to calculate the effective address of any element in a table and
drop that address in a register.

LEA derives the address of the source operand and loads that offset into the
destination operand. The destination operand must be a register and cannot be
memory. The source operand must be a memory operand, but it can be any size.

The address stored in the destination operand is the address of the first byte
of the source in memory, and the size of the source in memory is unimportant.
This is a good, clean way to place the address of a variable into a register
prior to a procedure call or a system call. See SYSCALL.

LEA can also be used to perform register math, since the address specified in
the second operand is calculated but not accessed. The address can thus be an
address for which your program does not have permission to access. Any math
that can be expressed as a valid address calculation may be done with LEA.

This is one of the few places where NASM does not require a size specifier
before an operand providing a memory address, again because LEA calculates the
address but moves no data to or from that address.

```asm
SomeVariable: dd 0, 25, 50, 75, 100

lea rbx, [SomeVariable+rcx*4]

lea rdx, [rdx*2+rdx] ; multiplies rdx by 3
```

This is often faster than using shifts + adds to multiply a value.

### LOOP

The LOOP instruction assumes that the RCX register contains the loop count.
When the loop instruction is executed, the RCX register is decremented and the
control jumps to the target label, until the RCX register value, i.e., the
counter reaches the value zero.

LOOP is a combination decrement counter, test, and jump instruction. It uses CX
as the counter in 16-bit modes, ECX in 32-bit modes, or RCX in 64-bit modes.
The operation of LOOP is logistically identical in all three modes, and I use
64-bit coding as an example here.

LOOP simplifies code by acting as a DEC RCX instruction, a CMP RCX,0
instruction, and JZ instruction in one, executed in that order. A loop repeat
count must be initially loaded into RCX. When the LOOP instruction is executed,
it first decre- ments RCX. Then it tests to see if RCX = 0. If RCX is not 0,
LOOP transfers control to the 8- bit displacement specified as its operand:

```asm
mov ECX,10
l1:
<loop body>
loop l1
```

> Looking at the "8086/8088 User's Manual: Programmer's and Hardware Reference"
> (Intel 1989) confirms that LOOP is marginally faster than the combination DEC
> CX; JNZ. DEC takes 3 clock cycles, JNZ takes 4 (not taken) or 16 (taken)
> cycles. So the combination requires 7 or 19 cycles. LOOP on the other hand
> requires 5 cycles (not taken) or 17 cycles (taken), for a saving of 2 cycles.

Flags affected (none):
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |     |     |     |     |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### MOV

- `mov rax, 0x42`: rax now stores the value 42h directly.
- `mov rbx, rax`: rbx and rax now both store 42h directly.
- `mov [rcx], rbx`: address stored in rcx now holds 42h.
- `mov rdx, [rbx]`: rdx now holds value of address stored in rbx.

Note: If you need to move a signed value use `MOVSX` instead.


Flags affected (none):
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |     |     |     |     |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### MOVSB, MOVSW, MOVSD, MOVSQ

The gist of this instruction is this:

1. RSI stores the source of the address in memory.
2. RDI stores the destination address.
3. The number of bytes to be moved is placed in the RCX register.
4. RCX decrements by one after each byte is copied.

 Don’t forget that RCX counts operations (the number of times a data item is
 copied from source to destination) and not bytes!

The DF (direction flag) affects this instruction. It is only important to
set or not set the flag when the memory in RSI and RDI overlap, otherwise it
shouldn't matter. The Direction flag DF thus determines whether your copy
operation moves up-memory if DF is cleared (0) and down-memory if DF is set
(1).

The MOVSB can operate automatically (via `REP`) or semi-automatically, by
manually decrementing RCX.


Flags affected (none):
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |     |     |     |     |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### MOVSX

"Move with signed extension" used when moving values that are negative. Note
that this instruction allows operands of different sizes!

MOVSX operates like MOV but copies values from source operand to the destina-
tion operand with sign extension. That is, it carries the sign bit of the
smaller source operand to the sign bit of the larger destination operand. This
way, for example, a 16-bit signed value in AX will still be a signed value when
copied into 32-bit register EDX or 64-bit register RDX. Without sign extension,
the sign bit of AX would simply become another bit in the binary value copied
into RDX, and the value in RDX would bear no resemblance to the supposedly
identical value in AX.

```
xor rax, rax
mov ax, -42
movsx rbx,ax
```

Flags affected (none):
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |     |     |     |     |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### MUL

Warning: contains implicit operand.

```asm
mul rbx
```

MUL multiplies its single operand by AL, AX, EAX, or RAX, and the result is
placed in AX, in DX:AX, in EDX:EAX, or in RDX:RAX. If MUL is given an 8-bit
operand (either an 8- bit register or an 8-bit memory operand), the results
will be placed in AX. This means that AH will be affected, even if the results
will fit entirely in AL

The above multiplies the value of RBX x RAX. The result would be stored in
two registers, `RDX:RAX`.

It always multiplies the explicit operand by one of `AX,EAX,RAX`. And if it
needs to store more than the size of the register, it uses `DX,EDX,RDX` to
store the high-order portion.

Not every multiplication will need the high-order register. If not, the
carry flag CF will be set to 0.

Note: It’s easy to assume that IMUL is identical to MUL save for IMUL’s ability
to operate on signed values. Not so: IMUL has more legal instruction forms and
is considerably more complex than MU

The Carry and Overflow flags are cleared to 0 if the result value is 0; other-
wise, both are set to 1. Remember that SF, ZF, AF, and PF become undefined
after MUL.

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  ?  |  *  |     |     |  *  |  ?  |  ?  |     |  ?  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### NEG

Turns the value to its equivalent two's complement negative. Use this instead
of trying to manually set the negative bit on.

```asm
  mov rax, 0x42
  neg rax
  add rax, 0x42
```


Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  *  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### OR

Bit-by-bit OR binary operation

```asm
  or rax, rbx
```

Note that the OR instruction makes the Auxiliary Carry flag undefined. CF and
OF are cleared to 0, and the other affected flags are set according to the
operation’s result.

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  ?  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### POP

Pops an item of data off the stack.

```asm
pop rax ; pops 64bits from the stack
pop [ebx]; pops 32bits from the stack onto the memory pointed by ebx
```

As with `PUSH`, it only works with 16bits or 64bits at the time.

No flags are affected.

### POPFQ

Pops 64 bits off the stack onto rflags

### PUSH

Pushes a 16bit or 64bit register or memory value onto the stack. It doesn't
work for 8bit or 32bit registers.

```asm
push rax
push [rbx]
```

In Intel x64, where the stack grows downwards, if we push a 64bit register to
the stack, the RSP (register stack pointer) will be decremented by 64bits and
whatever that needs to be stored is saved at that memory address pointed by
RSP. The "empty" 64bits space is now filled with the value that was pushed.

No flags are affected.

### PUSHFQ

Similar to `PUSH`, but pushes the rflags register. It takes no operands.

### REP

Repeat string-operation until tested-condition 

Use the rep (repeat while equal), repnz (repeat while nonzero) or repz (repeat
while zero) prefixes in conjunction with string operations. Each prefix causes
the associated string instruction to repeat until the count register (CX) or
the zero flag (ZF) matches a tested condition. 

### ROL / ROR

ROL: Similar to a shift left instruction, but the left-most bit is moved down
to the right-most bit instead of going to the carry flag.


ROR: Similar to a shift right instruction, but the right-most bit is moved down
to the left-most bit instead of going to the carry flag.

```asm
  rol <register/memory>, <count>
```

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|     |  *  |     |     |  *  |     |     |     |     |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### SHL / SHR

"Shift left" and "shift right"

```asm
  shl <register/memory>, <count>
  shr <register/memory>, <count>
```

The number of bit positions shifted may be specified either as an 8-bit
immediate value or by the value in CL—not CX/ECX/RCX. (The 8086 and 8088 are
limited to the immediate value 1.) 

With SHL, the leftmost bit of the operand is shifted into CF; the rightmost bit
is cleared to 0. With SHR, the rightmost bit is shifted into CF; the leftmost
bit is cleared to 0. The Auxiliary Carry flag AF becomes undefined after both
SHL and SHR. OF is modified only by the shift-by-one forms. After any of the
shift-by-CL forms, OF becomes undefined.


Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  ?  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### STOSB, STOSW, STOSD, STOSQ

STOre String by Byte.

- RDI must be loaded with the address of the destination string. Think R`DI`
  for destination index.
- AL must be loaded with the 8-bit value to be stored in the string.
- RCX must be loaded with the number of times the value in AL is to be stored
  in the string. No matter if you CLD or STD beforehand RCX will *decrement*.
- The Direction flag (DF) must be set or cleared, depending on whether you want
  the search to be up-memory (cleared; use CLD) or down memory (set; use STD).

You must decrement RCX unless you use `rep stosb` instead.

```asm
cld ; clear DF so we're counting up-memory.
mov al, FILLCHR ; put the buffer filler char in AL.
mov rdi,VidBuff ; point the destination index at buffer.
mov rcx, COLS*ROWS ; put the count of chars stored into RCX.
rep stosb ; blast chars at the buffer.
```

Does not affect flags.

### SUB

SUB performs a subtraction without borrow, where the source operand is
subtracted from the destination operand, and the result replaces the
destination operand. If the result is negative, the Carry flag CF is set.

```asm
SUB AX,DX
SUB AL,DL
SUB EBP,17
SUB RAX,0FFFBH
```

Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  *  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

### SYSCALL

A way to call Linux syscalls from assembly.

The available syscalls can be found here: `/usr/include/asm/unistd_64.h`.
To see the register order for the architecture (e.g x86-64) visit the man
page at `man syscall`

```
The second table shows the registers used to pass the system call arguments.
Arch/ABI      arg1  arg2  arg3  arg4  arg5  arg6  arg7  Notes
──────────────────────────────────────────────────────────────
i386          ebx   ecx   edx   esi   edi   ebp   -
x86-64        rdi   rsi   rdx   r10   r8    r9    -
x32           rdi   rsi   rdx   r10   r8    r9    -
```

Arguments for each POSIX syscall can be found by typing `man 2 exit` note the
"2" argument to man which will link you to the system calls documentation.

Note: syscall uses RAX, RCX, and R11 internally, so you can't assume that their
values will remain the same after the call do `syscall`

Note 2: whether or not a register (like R9, say) is used to pass a parameter to
a system call, that register i not preserved. Only seven registers are
preserved by Linux across a system call: r12, r13, r14, r15, rbx, rsp, and rbp.

Useful reference: https://hackeradam.com/x86-64-linux-syscalls/
Useful google term: "system call table x64"

No flags are affected.

### TEST

Note: Prefer `BT` instead!

Useful for mask testing. It does the same job as `AND`, but without changing
the value of the destination.

If the ZF (zero flag) is set to 0, it means that the mask worked. If it's
set to 1, the mask didn't work. It sounds a bit counter-intuitive.

Caveat: TEST is only useful for finding 1 bit. If you need to find 0 bits,
you need to flip each bit with the NOT instruction first.

Caveat 2: TEST only works with a single bit. If you need to check if more than
one bit is set to 1, it won't work.

```asm
test <operand>, <bit mask>

test rax,0x8 ; checks if bit 3 is up.
```

### XCHG

Exchange the value of two variables (swap them)

```asm
xchg cl,ch
```

No flags are affected.

### XLAT

The xlat instruction in x86 assembly language stands for "translate byte at
`DS:[(E)BX]` and store result in AL." It is used to perform a simple byte lookup
and load the result into the AL register.

- The contents of the EBX register (or BX if in 16-bit mode) are treated as an
  offset address in the DS (Data Segment) segment.
- The byte at the calculated memory address (DS:[(E)BX]) is fetched.
- The fetched byte is then moved into the AL register.

This instruction is often used in conjunction with string operations or table
lookups, where EBX holds an offset or index into a data table, and xlat is used
to retrieve a byte from that table.

```asm
section .data
    str_table db '0123456789ABCDEF'  ; Hexadecimal digits lookup table

section .text
    global _start

_start:
    mov ebx, 10; Index 10 in the table corresponds to the hexadecimal digit 'A'
    xlat       ; AL now contains 'A'

    ; Continue with further instructions...
```

No flags are affected.

### XOR

This is a nice trick, xor'ing something against itself yields zero. So if you
want to zero a register, it's faster to do:

```asm
xor rax, rax
; instead of
mov rax, 0
```

Because we don't have to go out to memory to load the immediate value 0.

The XOR operation yields a 1 if the operands are different and a 0 if the
operands are the same. Note that the XOR instruction makes the Auxiliary Carry
flag AF undefined. CF and OF are cleared to 0, and the other affected flags
are set according to the operation’s results.


Flags affected:
```
| AF  | CF  | DF  | IF  | OF  | PF  | SF  | TF  | ZF  |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|  ?  |  *  |     |     |  *  |  *  |  *  |     |  *  |

AF: Aux carry flag
CF: Carry flag
DF: Direction flag
IF: Interrupt flag
OF: Overflow flag
PF: Parity flag
SF: Sign flag
TF: Trap flag
ZF: Zero flag
```

## Sections

### .data

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

### .bss (Block Start Symbol)

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

#### resb / restw / restd/ resq

Reserve bytes instruction, where N is the number of bytes to reserve:

```asm
section .bss
    Buff resb 42 ; reserves 42 bytes for Buff
```

#### equ

Stands for equate.

Use to associate a value with a label. Every time the assembler finds this
label, it swaps by the result of the equation. Similar to C's macros.

```asm
sections .bss
    BUFFLEN equ 128
```

### .text

This section stores the machine instructions that make up the program.

All global labels need to be declared in this section, otherwise they cannot be
seen outside of the program.

## Labels

Labels can be global or local:

```asm
; global label
MyLabel:

; local label
.MyLocalLabel:

; You can globally jump to a local variable like this (not often needed)
jmp MyLabel.MyLocalLabel
```

Notes:
- The local label will be local to the global label that precedes it.
- A local label cannot be "seen" by any other global label except the preceding
  one. This is relevant when a global procedure has another global procedure
  inside of it. A local label declared after those procedures can only be seen
  by the latest global procedure.
- It can be useful to define global labels that are never referenced, simply to
  provide ownership of local labels.



## x64 Memory Addressing

```
[ BASE + (INDEX x SCALE) + DISP ]
```

- BASE: any general purpose register. Only 32-bit or 64-bit.
- INDEX: any general purpose register. Only 32-bit or 64-bit.
- SCALE: must be one of the values: 1, 2, 4, or 8.
- DISP: displacement may be any 32-bit constant (legacy reasons).

Note 1: 32bit and 64bit register can't be mingled together.
Note 2: All of the elements are optional. Almost any permutation works.
Note 3: The DISP value is usually some variable defined in `.data` or `.bss`.

```
| Scheme                        | Example             | Description                      |
|-------------------------------|---------------------|----------------------------------|
| [BASE]                        | [rdx]               | Base only                        |
| [DISP]                        | [0F3h]              | Either literal or named constant |
| [BASE + DISP]                 | [rcx + 033x]        | Base plus displacement           |
| [INDEX x SCALE]               | [rax * 4]           | Index times scale                |
| [BASE + INDEX]                | [rax + rbx]         | Base plus index                  |
| [BASE + INDEX x SCALE]        | [rsp + rdi * 2]     | Base plus index times scale      |
| [BASE + INDEX x SCALE + DISP] | [rdx + rax*2 + 20]  | ...                              |
```

## Directives

### EXTERN

Used to inform that a particular procedure has been declared outside of the
module. Potentially, by another module.

Useful at the top of their section, given that any external procedures must
be declared with `EXTERN` before being used.

```asm
SECTION .text
EXTERN MyProc, AnotherProc
; ...

SECTION .data
EXTERN DotDataVar, anotherDotDataVar
; ...
```

### GLOBAL

Used to inform that a particular procedure can be used by other modules.
Items declared with GLOBAL **must** be declared before they are defined.

Practically, this means declaring them at the top of the `.text` section or the
`.data` section, whichever the item belongs to.

```asm
GLOBAL MyProc
GLOBAL MyDotDataVar
```

### %INCLUDE

Allows you to include a file into another file during assembly operations.
Only source code text files can be used. No binaries of any kind are accepted.

```asm
%INCLUDE "textlibgcc.asm
```

Differently than C, the included file is not inserted into the main file.

When NASM encouters an `%INCLUDE`, it stops assembling the main file and begins
assembling the included file.

Once this is done, NASM picks up right where it left in the main file.

### %MACRO and %ENDMACRO

Similar to how C macros work. During assembler, they are "copy-pasted" onto the
code before it is compiled. Every macro must have a parameter count, even if
it is 0 like below.

```asm
%macro MyMacro 0
    mov rax, rbx
    syscall
%endmacro

; later... just place the name of the macro in your code.
MyMacro

; this macro can be in another file:
%include "mymacro.mac"

MyMacro
```

Macros can also have parameters (like in C). In this case, you need to note on
the macro definition, how many parameters it takes.

```asm
%macro WriteCtr 3 ; %1 = row; %2 = string address; %3 = string length.
    push rbx
    push rdx
    mov rdx, %3 ; <--- that's how you use the input.
    xor rbx,rbx
    ; etc...
```

Macro arguments can be literal constants, registers, .text and .bss variables,
etc. They can also have local lables, though they are defined differently:

```asm
%macro MacroWithInternalLabel 0
    ; do stuff
%%MyInternalLabel:
    ; do stuff
    jb %%MyInternalLabel
%endmacro
```

NASM will give a unique name for each time the macro is expanded into the
soruce code. It prefixes the macro label with `..@` plus 4 digits, like:
`..@0001.MyInternallabel`


## Linux Specifics

### Command line arguments

#### Stack (generic Linux-way)

At start-up:

- RSP (top of the stack) has a 64-bit number, giving the count of command-line
  arguments present on the stack. This value is always greater or equal to one.
- The next 64-bit item up-memory from RSP is the address of the invocation text
  that runs the executable. (./my-program)
- Remaining command-line arguments, if provided, have their 64-bit addresses
  stored up-memory from RSP, with the address of the first (leftmost) argument
  followed by the second, and so on.
- The list of command-line addresses is terminated by a null pointer, which is
  jargon for 64 bits of binary 0.

The stack at start time looks like this:

```
|                     THE STACK                      |
|----------------------------------------------------|
| **64-bit null point (8 bytes of binary 0)**        |
|----------------------------------------------------|
| Full pathname of executable                        |
|----------------------------------------------------|
| Actual env variables (null-terminated strings)     |
|----------------------------------------------------|
| Actual command-line args (null-terminated strings) |
|----------------------------------------------------|
| Actual executable invocation text                  |
|----------------------------------------------------|
| `(System oddments and empty space)`                |
|----------------------------------------------------|
| **64-bit null pointer (8 bytes of binary 0)**      |
|----------------------------------------------------|
| Address of last environment variable               |
|----------------------------------------------------|
| ...(more environment variables)...                 |
|----------------------------------------------------|
| Address of environment variable 3                  |
|----------------------------------------------------|
| Address of environment variable 2                  |
|----------------------------------------------------|
| Address of environment variable 1                  |
|----------------------------------------------------|
| **64-bit null pointer (8 bytes of binary 0)**      |
|----------------------------------------------------|
| Address of last argument                           |
|----------------------------------------------------|
| Address of argument 2                              |
|----------------------------------------------------|
| Address of argument 1                              |
|----------------------------------------------------|
| Address of executable invocation text              |
|----------------------------------------------------|
| Count of arguments (always at least 1)             | <---- RSP: Top of stack
|----------------------------------------------------|
```

#### GCC-specific

Upon program initiation, the register `RDI` contains a value greater or equal
to one.

The value indicates how many command-line arguments have been passed to the
executable command.

The register `RSI` contains the address of a table of addresses, starting at
the first item in the list of command-line arguments. In Linux, it will always
be the name of the program itself.

Each element in the table of addresses, points to another address. This address
needs to be read, and the string inside of it will be terminated by a binary 0.

The value of this string can be obtained via the instructions `SCASB` (Scan
String by Byte).

```asm
mov rcx, 0000FFFFh ; Limit search to 65535 bytes max.
cld ; search direction is set to up-memory.
repne scasb ; search ofr null (0) in string at RDI.
jnz Error ; Jump to error if null not found.

; later
mov byte [rdi-1], 10 ; Store an EOL where the 0 used to be.
```

## C calling convention (64bit)

### Entrypoint

Instead of `_start`, glibc will require the entrypoint to be called `main`.

### Function Arguments

Passing the first six parameters is done via registers. Any remaining
parameters must be passed on the stack.

The order of arguments is as follows, it differs from the `syscall` convention.

1. RDI
2. RSI
3. RDX
4. RCX
5. R8
6. R9

### Register Clobber

Which registers can a function use internally and thus change?
The following registers **cannot be clobbered**. They are also called
**nonvolatile**:

#### Non-volatile registers

1. RSP
2. RBP
3. RBX
4. R12
5. R13
6. R14
7. R15

#### Volatile registers

1. RAX
2. RCX
3. RDX
4. RSI
5. RDI
6. R8
7. R9
8. R10
9. R11

### Stack Frame

A stack frame is a location on the stack marked as belonging to a particular
function.

Compilers depend on stack frames to create local variables in functions.

It can be thought as the region between the addresses contained in two
registers: The base pointer RBP and stack pointer RSP.

A stack frame is created by pushing a copy of RBP on the stack, and then coping
the stack pointer RSP into register RBP.

This is why the two first instructions in an assembly program that honours the
C calling convention must be:

#### Prolog

```asm
; usually called the program's prolog. Unless it's present,
; gdb will not operate correctly.

push rbp
mov rbp, rsp
```

#### A view of the stack

```
| The Stack | content                                  |
|-----------|------------------------------------------|
| RBP+32    | up-memory                                |
| RBP+24    | up-memory                                |
| RBP+16    | up-memory                                |
| RBP+8     | up-memory                                |
|  ...      |  ...                                     |
| RBP+0     | stays here until stack frame destruction |
| RBP-8     | other callee-saved registers             |
| RBP-16    | other callee-saved registers             |
|  ...      |  ...                                     |
| RBP-24    | temporary storage for function           |
| RBP-32    | temporary storage for function           |
| RBP-40    | temporary storage for function           |
|  ...      |  ...                                     |
| RBP-72    | temporary storage RSP points here        |
```

#### Epilog

Used to undo the logic for creating the stack frame.

```asm
pop rbp
ret
```

#### Stack Alignment

Why are prologs and epilogs important?

A new requirement in x64 is that the stack must be aligned on a 16 byte
boundary.

What this means is that when you return from a function (like `main:`), the
stack pointer must be pointing at an address evenly divisible by 16.

> *TIP*: Aligned to 16 bytes means that the stack pointer is dividable by 16.
> If you read it in hexadecimal, it means that the last digit is a zero.

Why is this an issue?

When a procedure is called, the caller pushes the return address onto the
stack. A return address is 8 bytes in size (64 bits). But if you access the
stack after adding 8 bytes to it (rather than 16 bytes), bad things may happen.
Keeping the stack aligned on 16-byte boundaries at all times makes code simpler
for a number of things, including the use of SSE vectors when they are stored
on the stack.

When the prolog pushes RBP onto the stack, we now have the return address with
8 bytes, and the content of RBP, 8 bytes totalling 16 bytes.

The symmetry is repeated when returning from the function, as RBP is popped
(8 bytes), and the return instruction also pops the return address back to the
stack pointer (8 bytes).

`glibc` would have already aligned the stack for you when `main` took control.

Ideally, your own procedures should start with the prolog and end with the
epilog. If your procedures are simple and don't do much to the stack, you can
get away with not using pro/epilog.

##### Addendum to not-glibc programs

If you are not using `glibc`, you still have to align the stack:

```asm
push rbp
mov rbp, rsp

; and the last 4 bits (zeroes)
and rsp, -16
```

The epilog becomes then:

```asm
mov rsp, rbp
pop rbp
```

Another difference when not using `glibc` is that when returning to Linux, you
can't use the `ret` instruction. You must use the Exit service (60) via
SYSCALL.
