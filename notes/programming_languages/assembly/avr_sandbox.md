2024-04-18

## Basic program

```asm
; C/C++ preprocessor directives are available.
#include <avr/io.h>

.section .data

.section .bss

.section .text
    ; org sets the address in which the assembler starts chucking instructions
    .org 0x00 ;
```

## Delay routine

```asm
    ; Load an immediate value into r20 that will
    ; create the expected delay in seconds.
    ; This instruction will take 1 cycle, but
    ; this cycle is ignored in this case.
    ldi r20, 255

delay:
    ; This instruction takes 1 CPU cycle,
    dec r20

    ; This instruction takes 1 CPU cycle.
    nop

    ; this instruction takes 2 cycles if r20 != 0
    ; and 1 cycle if r20 == 0.
    brne delay

; The delay body took 255*4 - 1 = 1019 instructions,
; plus 1 cycle to set up the loop, totalling 1020
; instructions.

; For a clock of 16MHz like in the ATMega328p:
; 16,000,000 instructions per second.
; Our delay takes 63.7 micro seconds.
```

This is too small and barely observable.

We can't increase the value from 255 because that is as much as we can store in
an 8bit register.

We can't add more nop operations because there would be too many of them to fit
in the flash.

The next idea is to add nested loops.

```asm
delay_1s:
    ; This instruction takes 1 cycle.
    ldi r20, 64
.delay1:
    ; This instruction takes 1 cycle.
    ; The total cycles spent here are 64 cycles.
    ldi r21, 250
.delay2:
    ; This instruction takes 1 cycle.
    ; The total cycles spent here are 16,000 cycles
    ; 16,000 comes from 64*250 (r20 * r21)
    ldi r22, 250
.delay3:
    ; This instruction takes 1 cycle.
    ; The total cycles spent here are 4(10**6)
    ; 4(10**6) comes from (r20 *r21 * r22).
    dec r22
    ; This instruction takes 1 cycle.
    ; The total cycles spent here are 4(10**6)
    nop
    ; This instruction takes 2 cycles.
    ; The total cycles spent here are 8(10**6)
    ; However when r22 reaches zero it only
    ; spends 1 cycle.
    ; - 1 cycle * 16,000 = -16,000 cycles.
    brne delay3
    ; This instruction takes 1 cycle.
    ; The total cycles spent here are 16,000
    dec r21
    ; This instruction takes 2 cycles.
    ; The total cycles spent here are 32,000 cycles
    ; However when r21 reaches zero it only
    ; spends 1 cycle.
    ; - 1 cycle * 64 = -64 cycles.
    brne delay2

    ; This instruction takes 1 cycle.
    ; The total cycles spent here are 64 cycles
    dec r20

    ; This instruction takes 2 cycles.
    ; The total cycles spent here are 128 cycles
    ; However when r20 reaches 0 it takes 1 cycle
    ; -1 cycle * 64 = - 64 cycles
    brne delay1
    ; Ret takes 4 cycles.
    ret
```

Summing all of the above we get:

```py
total = (
    1 + 64 + 16000 + 4_000_000 + 4_000_000
    + 8_000_000 + 16_000 + 16_000
    + 32_000 - 64 + 64 -64 + 4
)
print(total)
>> 16080005
```

This is pretty close to 16MHz, it is about 1.005 seconds.
This might be a tolerable number depending on your use case.

If you want to get more accurate, you should use timers and interrupts.
