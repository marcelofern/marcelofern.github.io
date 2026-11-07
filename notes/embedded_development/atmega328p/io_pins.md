2024-04-22

The ATMega328p MCU has some special function registers, and a subset of those
are the I/O registers, which can also be called I/O ports.

Changing the value in those registers triggers a change in the state of a
corresponding physical pin.

Thinking about the _physical pins_, such pins require 3 bits to completely
manage their state.

- 1 bit for changing between INPUT/OUTPUT.
- 1 bit for switching between HIGH/LOW.
- 1 bit for storing pin state when set as INPUT.

## Example

Say you want to set the arduino built-in LED to be ON and OFF every second.
In the arduino board that LED is pin number 13, but in the microcontroller that
is pin number 19. See the mapping below:

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

Therefore you want to set port 19 as **output**. And according to our
schematics above, that is PB5. You also want to toggle between HIGH and LOW
every second so that the led can blink.

That is the equivalent of saying:

> I want to set the data direction bit for port PB5 to OUT=1 via DDRB.
> I want to set the data register port to 1 via PORTB for 1 second.
> I want to set the data register port to 0 via PORTB for 1 second.
> I want to loop infinitely between these two states above.

## What if I want to **read** the value (INPUT)

Independently of the setting of data direction bit DDxn, the port pin can be
read through the PINxn register bit.

## Cheat sheet table

```
| DDxn | PORTxn | PUD(in MCUCR) | I/O    | pull-up | Comment                                     |
|------|--------|---------------|--------|---------|---------------------------------------------|
| 0    | 0      | X             | Input  | No      | Tri-state (Hi-Z)                            |
| 0    | 1      | 0             | Input  | Yes     | Pxn will source current if ext. pulled low. |
| 0    | 1      | 1             | Input  | No      | Tri-state (Hi-Z)                            |
| 1    | 0      | X             | Output | No      | Output low (sink)                           |
| 1    | 1      | X             | Output | No      | Output high(source)                         |
```

## The authority

The ATMega328P datasheet is the authority when it comes down to explaining what
each IO port does:

> The DDxn bit in the DDRx register selects the direction of this pin. If DDxn
> is written logic one, Pxn is configured as an output pin.

> If DDxn is written logic zero, Pxn is configured as an input pin.

> If PORTxn is written logic one when the pin is configured as an input pin,
> the pull-up resistor is activated. To switch the pull-up resistor off, PORTxn
> has to be written logic zero or the pin has to be configured as an output
> pin.

> The port pins are tri-stated ({DDxn, PORTxn} = 0b00) when reset condition
> becomes active, even if no clocks are running.

> If PORTxn is written logic one when the pin is configured as an output pin,
> the port pin is driven high (one).

> If PORTxn is written logic zero when the pin is configured as an output pin,
> the port pin is driven low (zero)

> Writing a logic one to PINxn toggles the value of PORTxn, independent on the
> value of DDRxn. Note that the SBI instruction can be used to toggle one
> single bit in a port.

[source](http://web.archive.org/web/20240328200801/https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf)

## Example

The documentation provides two examples:

**Assembly**:
```asm
...
; Define pull-ups and set outputs high
; Define directions for port pins
ldi r16,(1<<PB7)|(1<<PB6)|(1<<PB1)|(1<<PB0)
ldi r17,(1<<DDB3)|(1<<DDB2)|(1<<DDB1)|(1<<DDB0)
out PORTB,r16
out DDRB,r17
; Insert nop for synchronization
nop
; Read port pins
in r16,PINB
...
```

- PB0 = output, starts with HIGH.
- PB1 = output, starts with HIGH.
- PB2 = output, starts with LOW.
- PB3 = output, starts with LOW.
- PB6 = input, starts with pull-up resistor.
- PB7 = input, starts with pull-up resistor.

Note that PB4 and PB5 aren't in there, which means they are inputs by default,
and don't have the pull-up resistor setup.

And equivalent **C** code:
```c
unsigned char i;
...
/* Define pull-ups and set outputs high */
/* Define directions for port pins */
PORTB = (1<<PB7)|(1<<PB6)|(1<<PB1)|(1<<PB0);
DDRB = (1<<DDB3)|(1<<DDB2)|(1<<DDB1)|(1<<DDB0);
/* Insert nop for synchronization*/
__no_operation();
/* Read port pins */
i = PINB;
...
```

You can also set/unset a pin like this:

```c
#include <avr/io.h>
#include <util/delay.h>

int main(void) {
  DDRB |= (1 << DDB5); // Set PB5 as output
  while (1) {
    PORTB |= (1 << PB5); // Set PB5 high (LED ON)
    _delay_ms(1000);     // Delay for 1000 milliseconds (1 second)

    PORTB &= ~(1 << PB5); // Set PB5 low (LED OFF)
    _delay_ms(1000);      // Delay for 1000 milliseconds (1 second)
  }
  return 0;
}
```
