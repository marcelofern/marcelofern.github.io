2024-04-18

# Introduction

This list does not include all of the instructions, only the ones I have used
most frequently.

The main list of instructions can be seen in the AVR manual:
[source](http://web.archive.org/web/20240205161134/http://ww1.microchip.com/downloads/en/devicedoc/atmel-0856-avr-instruction-set-manual.pdf)

## Instructions

### ADD

Adds two registers without the C Flag and places the result in the destination
register Rd.

```asm
add r1,r2 ; Add r2 to r1 (r1=r1+r2)
add r28,r28 ; Add r28 to itself (r28=r28+r28)
```

Words 1 (2 bytes)
Cycles 1

### ANDI

(And with immediate)

Performs the logical AND between the contents of register Rd and a constant,
and places the result in the destination register Rd

```asm
andi r17,$0F ; Clear upper nibble of r17
andi r18,$10 ; Isolate bit 4 in r18
andi r19,$AA ; Clear odd bits of r19
```

Words 1 (2 bytes)
Cycles 1

### BRNE

Conditional relative branch. Tests the Zero Flag (Z) and branches relatively to
PC if Z is cleared. If the instruction is executed immediately after any of the
instructions CP, CPI, SUB, or SUBI, the branch will occur if and only if, the
unsigned or signed binary number represented in Rd was not equal to the
unsigned or signed binary number represented in Rr. This instruction branches
relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
Parameter k is the offset from PC and is represented in two’s complement form.
(Equivalent to instruction BRBC 1,k.)

This instruction is very useful for loop decrements.

```asm
    eor r27,r27 ; Clear r27
loop:
    inc r27 ; Increase r27
    ...
    cpi r27,5 ; Compare r27 to 5
    brne loop ; Branch if r27<>5
    nop ; Loop exit (do nothing)
```

Words 1 (2 bytes)
Cycles 1 if condition is false
2 if condition is true

### CALL

Long call to a sub-routine.

Calls to a subroutine within the entire Program memory. The return address (to
the instruction after the CALL) will be stored onto the Stack. (See also
RCALL). The Stack Pointer uses a post-decrement
scheme during CALL.

This instruction is not available in all devices.

- Use RCALL when you want to optimize for code size, have memory constraints,
  and the target subroutine is located nearby.

- Use CALL when you need the flexibility to call subroutines located anywhere
  in the program memory or working with a larger codebase where readability and
  maintenance are important.

```asm
    mov r16,r0 ; Copy r0 to r16
    call check ; Call subroutine
    nop ; Continue (do nothing)
    ...
check:
    cpi r16,$42 ; Check if r16 has a special value
    breq error ; Branch if equal
    ret ; Return from subroutine
...
error:
    rjmp error ; Infinite loop
```

Words 2 (4 bytes)
Cycles 4 devices with 16-bit PC

### DEC

Subtracts one -1- from the contents of register Rd and places the result in the
destination register Rd. The C Flag in SREG is not affected by the operation,
thus allowing the DEC instruction to be used on a loop counter in
multiple-precision computations.

When operating on unsigned values, only BREQ and BRNE branches can be expected
to perform consistently. When operating on two’s complement values, all signed
branches are available.

```asm
ldi r17, $10 ; Load constant in r17
loop:
    add r1,r2 ; Add r2 to r1
    dec r17 ; Decrement r17
    brne loop ; Branch if r17<>0
    nop ; Continue (do nothing
```

Words 1 (2 bytes)
Cycles 1

### EOR

Exclusive OR, a.k.a XOR.

Performs the logical EOR between the contents of register Rd and register Rr
and places the result in the destination register Rd.

```asm
eor r4, r4 ; Clear r4
eor r0, r22 ; Bitwise exclusive or between r0 and r22
```

Words 1 (2 bytes)
Cycles 1

### LDI

Loads an 8-bit constant (immediate) directly to register 16 to 31.
Constant values can only be loaded into the last 16 registers in AVR.

```asm
clr r31 ; Clear Z high byte
ldi r30,$F0 ; Set Z low byte to $F0
lpm ; Load constant from Program
; memory pointed to by Z
```

Words 1 (2 bytes)
Cycles 1

### NOP

This instruction performs a single cycle No Operation.

```asm
nop
```

Words 1 (2 bytes)
Cycles 1

### OUT

Stores data from register Rr in the Register File to I/O Space (Ports, Timers,
Configuration Registers, etc.)

```asm
clr r16 ; Clear r16
ser r17 ; Set r17
out $18,r16 ; Write zeros to Port B
nop ; Wait (do nothing)
out $18,r17 ; Write ones to Port B

; out _SFR_IO_ADDR (PORB), r16 ; write out the value of R16 to port B
```

### RET

Returns from subroutine. The return address is loaded from the STACK. The Stack
Pointer uses a pre- increment scheme during RET.

```asm
call routine
...
routine:
    push r14 ; Save r14 on the Stack
    pop r14 ; Restore r14
    ret ; Return from subroutine
```

Words 1 (2 bytes)
Cycles 4 devices with 16-bit PC
5 devices with 22-bit PC

### RCALL

Relative call to an address within Program Counter (PC) - 2K + 1 and PC + 2K
(words). The return address (the instruction after the RCALL) is stored onto
the Stack. See also CALL. For AVR microcontrollers with Program memory not
exceeding 4K words (8KB) this instruction can address the entire memory from
every address location. The Stack Pointer uses a post-decrement scheme during
RCALL.

The RCALL instruction uses relative addressing, which means the target address
is calculated relative to the current instruction pointer. This allows for more
compact code, as you only need to specify the offset to the target subroutine.

This is particularly useful when the subroutine is located nearby in memory.

- Use RCALL when you want to optimize for code size, have memory constraints,
  and the target subroutine is located nearby.

- Use CALL when you need the flexibility to call subroutines located anywhere
  in the program memory or working with a larger codebase where readability and
  maintenance are important.

```asm
    rcall routine ; Call subroutine
...
routine:
    push r14 ; Save r14 on the Stack
    ...
    pop r14 ; Restore r14
    ret ; Return from subroutine
```

Words 1 (2 bytes)
Cycles
- 3 devices with 16-bit PC
- 4 devices with 22-bit PC
- Cycles XMEGA 2 devices with 16-bit PC
- 3 devices with 22-bit PC

Compare with CALL:
Words 2 (4 bytes)
Cycles 4 devices with 16-bit PC

### RJMP

Relative Jump.

For AVR microcontrollers with Program memory not exceeding 4K words (8KB) this
instruction can address the entire memory from every address location

The JMP instruction accepts absolute addresses but it is also two times as slow.
JMP also takes twice the space, and is only required when the jump offset is
greater than 2K.

For small loops, RJMP is perfect.

```asm
cpi r16,$42 ; Compare r16 to $42
brne error ; Branch if r16 <> $42
rjmp ok ; Unconditional branch
error:
    add r16,r17 ; Add r17 to r16
    inc r16 ; Increment r16
ok:
    nop ; Destination for rjmp (do nothing)
```

Words 1 (2 bytes)
Cycles 2

### SBI

Sets a specified bit in an I/O Register. This instruction operates on the lower
32 I/O Registers – addresses 0-31

```asm
out $1E,r0 ; Write EEPROM address
sbi $1C,0 ; Set read bit in EECR
in r1,$1D ; Read EEPROM data

sbi _SFR_IO_ADDR (DDRB), 1 ; put pin 1 on port b in output mode
```

Words 1 (2 bytes)
Cycles 2
Cycles XMEGA 1
Cycles Reduced Core tinyAVR 1
