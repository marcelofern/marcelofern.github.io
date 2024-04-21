2024-04-20

Information about AVR assembly is in my notes:
- [avr instruction set](programming_languages/assembly/avr_instruction_set.md)

And information about the delay routine and how it works is in:
- [avr_sandbox](programming_languages/assembly/avr_sandbox.md)


```asm
#include <avr/io.h>
.section .data

.section .bss

.section .text
  .org 0x00
  ldi r16, (1<<PB5)
  ldi r17, (1<<PB5)
  out _SFR_IO_ADDR (DDRB), r16
loop:
  out _SFR_IO_ADDR (PORTB), r16
  rcall delay_1s
  eor r16, r17
  rjmp loop
delay_1s:
  ldi r20, 64
delay1:
  ldi r21, 250
delay2:
  ldi r22, 250
delay3:
  dec r22
  nop
  brne delay3
  dec r21
  brne delay2
  dec r20
  brne delay1
  ret
```
