2024-04-19

On the arduino board, the LED is marked as pin number 13. However, in the
microcontroller, the equivalent pin is number 19.

The below is how you'd set the pin 19 using asm.

For a refresher of AVR assembly language see:
[avr instructions](programming_languages/assembly/avr_instruction_set.md)

```asm
ldi r16, (1<<PB5)
out _SFR_IO_ADDR (DDRB), r16
```

Note that:

- `PB5` is a macro that evaluates to 5.
- 1<<5 = 0b10000.
- `ldi` only works for registers 16 to 31.
- `out` copies the value of r16 to an IO port or SFR.
- `DDRB` is a macro that evaluates to the address of DDRB.
- `_SFR_IO_ADDR` is a macro that conver the absolute address of DDRB to the
  relative address in the special function registers (SFRs). This is because
  `out` is optimised to only use relative addresses.
