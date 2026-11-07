February 18th, 2024

# Introduction

This list does not include all of the instructions, only the ones I have used
most frequently.

## Instructions

### ADC

ADD with Carry Flag.

Adds the destination operand (first operand), the source operand (second
operand), and the carry (CF) flag and stores the result in the destination
operand. The destination operand can be a register or a memory location; the
source operand can be an immediate, a register, or a memory location. (However,
two memory operands cannot be used in one instruction.) The state of the CF
flag represents a carry from a previous addition. When an immediate value is
used as an operand, it is sign-extended to the length of the destination
operand format.

The ADC instruction does not distinguish between signed or unsigned operands.
Instead, the processor evaluates the result for both data types and sets the OF
and CF flags to indicate a carry in the signed or unsigned result,
respectively. The SF flag indicates the sign of the signed result.

The ADC instruction is usually executed as part of a multibyte or multiword
addition in which an ADD instruction is followed by an ADC instruction.

```asm
shr rax, 3
adc rax, 0
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

### LEAVE

Releases the stack frame set up by an earlier ENTER instruction.

It is the equivalent of an epilogue.

```asm
; same as
mov rsp, rbp
pop rbp
```

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

Insteresting trick:

```asm
loop $
```

The above creates an infinite loop until RCX reaches zero. The mark `$`
corresponds to the current location or address in the code. This means that
`loop` will loop back to itself.

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

The two's compliment algorithm is basically:

- Step 1: starting with the binary representation of the number, with the
  leading bit being a sign bit;
- Step 2: inverting (or flipping) all bits – changing every 0 to 1, and every 1
  to 0;
- Step 3: adding 1 to the entire inverted number, ignoring any overflow.
  Accounting for overflow will produce the wrong value for the result.

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

### RCR

Rotate carry right.

The right rotate instruction shifts all bits in the register or memory operand
specified. The carry flag (CF) is included in the rotation. The least
significant bit is rotated to the carry flag, the carry flag is rotated to the
most significant bit position, all other bits are shifted to the right. The
result includes the original value of the carry flag.

The first operand value indicates how many times the rotate takes place. The
value is either the contents of the CL register or an immediate number. For a
single rotate, where the first operand is one, the overflow flag (OF) is
defined. For all other cases, OF is undefined. After the shift, the carry flag
bit is XORed with the two most significant result bits.

```asm
rcr rax, 1
```

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

### SBB

Adds the source operand (second operand) and the carry (CF) flag, and subtracts
the result from the destination operand (first operand). The result of the
subtraction is stored in the destination operand. The destination operand can
be a register or a memory location; the source operand can be an immediate, a
register, or a memory location.

```asm
not rdx
neg rax
sbb rdx, -1
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

Note: Prefer `BT` instead! `[Citation Needed]`.

Useful for mask testing. It does the same job as `AND`, but without changing
the value of the destination.

If the ZF (zero flag) is set to 0, it means that the mask worked. If it's
set to 1, the mask didn't work. It sounds a bit counter-intuitive.

Special use: It can be used to check if the value of a register is zero,
positive, or negative (signed flag/zero flag/carry flag).

```asm
  ; jump to L4 if esi is zero
  test  esi, esi
  je  .L4
```

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
