2024-04-19

On the arduino board, the LED is marked as pin number 13. However, in the
microcontroller, the equivalent pin is number 19.

```
                 +-\/-+
           PC6  1|    |28  PC5 (AI 5)
     (D 0) PD0  2|    |27  PC4 (AI 4)
     (D 1) PD1  3|    |26  PC3 (AI 3)
     (D 2) PD2  4|    |25  PC2 (AI 2)
PWM+ (D 3) PD3  5|    |24  PC1 (AI 1)
     (D 4) PD4  6|    |23  PC0 (AI 0)
           VCC  7|    |22  GND
           GND  8|    |21  AREF
           PB6  9|    |20  AVCC
           PB7 10|    |19  PB5 (D 13)
PWM+ (D 5) PD5 11|    |18  PB4 (D 12)
PWM+ (D 6) PD6 12|    |17  PB3 (D 11) PWM
     (D 7) PD7 13|    |16  PB2 (D 10) PWM
     (D 8) PB0 14|    |15  PB1 (D 9) PWM
                 +----+
```

The below is how you'd set the pin 19 using asm.

For more detailed information about setting atmega328p pins see:
- [io pins](embedded_development/atmega328p/io_pins.md)

For a refresher of AVR assembly language see:
- [avr instructions](programming_languages/assembly/avr_instruction_set.md)

The example below is similar to the one in the I/O ports documentation in the
ATMega328p datasheet.

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
