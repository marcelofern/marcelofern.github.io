February 18th, 2024

## Cheatsheet

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

## FLAGS register (eflags)

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

### Relevant flags

- `SF`: Sign Flag. Set when the result of an operation forces the operand to
  become negative.
- `ZF`: Zero Flag. Set when the result of an operation become zero (conditional
  jumps).
- `OF`: Overflow Flag. Set when the result of an arithmetic operation on a
  signed integer is too large to fit.
- `CF`: Carry Flag. Used in unsigned arithmetic expressions.
- `IF`: Interrupt flag: Usually active when debugging (step through code).
