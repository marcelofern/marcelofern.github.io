Function declaration:

```c
void pinMode(uint8_t pin, uint8_t mode);
```

## uint8_t pin

The pin variables are declared in the `pins_arduino.h` header.
[source](http://web.archive.org/web/20231021145458/https://github.com/arduino/ArduinoCore-avr/blob/master/variants/standard/pins_arduino.h)

These are the pins from my ATMEGA328p mapping:

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

For example, the LED_BUILTIN pin and the analog pins are defined as:


```c
#define LED_BUILTIN 13

#define PIN_A0   (14)
#define PIN_A1   (15)
#define PIN_A2   (16)
#define PIN_A3   (17)
#define PIN_A4   (18)
#define PIN_A5   (19)
#define PIN_A6   (20)
#define PIN_A7   (21)
```

The digital pins can be called just with their immediate integer numbers, as in

```c
pinMode(10, OUTPUT);
```

## uint8_t mode

These are defined as hexadecimal numbers in the `Arduino.h` header.
[source](http://web.archive.org/web/20240216191208/https://github.com/arduino/ArduinoCore-avr/blob/master/cores/arduino/Arduino.h)

```c
#define INPUT 0x0
#define OUTPUT 0x1
#define INPUT_PULLUP 0x2
```

One interesting value is INPUT_PULLUP.

> There are 20K pullup resistors built into the Atmega chip that can be
> accessed from software. These built-in pullup resistors are accessed by
> setting the pinMode() as INPUT_PULLUP. This effectively inverts the behavior
> of the INPUT mode, where HIGH means the sensor is off, and LOW means the
> sensor is on.

> The value of this pullup depends on the microcontroller used. On most
> AVR-based boards, the value is guaranteed to be between 20kΩ and 50kΩ. On the
> Arduino Due, it is between 50kΩ and 150kΩ. For the exact value, consult the
> datasheet of the microcontroller on your board.

> When connecting a sensor to a pin configured with INPUT_PULLUP, the other end
> should be connected to ground. In the case of a simple switch, this causes
> the pin to read HIGH when the switch is open, and LOW when the switch is
> pressed.

> The pullup resistors provide enough current to dimly light an LED connected
> to a pin that has been configured as an input. If LEDs in a project seem to
> be working, but very dimly, this is likely what is going on.

## pinMode function logic

This is the function definition in `wiring_digital.c`
[source](http://web.archive.org/web/20240308164206/https://github.com/arduino/ArduinoCore-avr/blob/master/cores/arduino/wiring_digital.c)

```c
void pinMode(uint8_t pin, uint8_t mode)
{
  uint8_t bit = digitalPinToBitMask(pin);
  uint8_t port = digitalPinToPort(pin);
  volatile uint8_t *reg, *out;

  if (port == NOT_A_PIN) return;

  // JWS: can I let the optimizer do this?
  reg = portModeRegister(port);
  out = portOutputRegister(port);

  if (mode == INPUT) {
    uint8_t oldSREG = SREG;
                cli();
    *reg &= ~bit;
    *out &= ~bit;
    SREG = oldSREG;
  } else if (mode == INPUT_PULLUP) {
    uint8_t oldSREG = SREG;
                cli();
    *reg &= ~bit;
    *out |= bit;
    SREG = oldSREG;
  } else {
    uint8_t oldSREG = SREG;
                cli();
    *reg |= bit;
    SREG = oldSREG;
  }
}
```

There are a few macros to take note:

```c
#define digitalPinToBitMask(P) ( pgm_read_byte( digital_pin_to_bit_mask_PGM + (P) ) )
#define digitalPinToPort(P) ( pgm_read_byte( digital_pin_to_port_PGM + (P) ) )
#define portModeRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_mode_PGM + (P))) )
#define portOutputRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_output_PGM + (P))) )
```

But before we get into their details, we need to find out what the `pgm`
macro does:

### pgm_read_byte

This macro is actually defined in `avr/pgmspace.h` from avr-libc
[source](https://github.com/Patapom/Arduino/blob/master/Libraries/AVR%20Libc/avr-libc-2.0.0/include/avr/pgmspace.h)

```c
#define pgm_read_byte(address_short)    pgm_read_byte_near(address_short)

// From:
#define pgm_read_byte_near(address_short) __LPM((uint16_t)(address_short))

// From:
#define __LPM(addr)         __LPM_enhanced__(addr)

// From:
#define __LPM_enhanced__(addr)  \
(__extension__({                \
    uint16_t __addr16 = (uint16_t)(addr); \
    uint8_t __result;           \
    __asm__ __volatile__        \
    (                           \
        "lpm %0, Z" "\n\t"      \
        : "=r" (__result)       \
        : "z" (__addr16)        \
    );                          \
    __result;                   \
}))
```

- `"lpm %0, Z"`: This is the assembly instruction to perform the Load Program
  Memory (LPM) operation. It loads a byte from the program memory into a
  register (%0) using the Z register as a pointer.

- `: "=r" (__result)`: This is the output operand constraint for the inline
  assembly. It specifies that the result of the LPM operation will be stored in
  the variable __result. "=r" means that the operand will be an output register
  variable.

- `: "z" (__addr16)`: This is the input operand constraint for the inline
  assembly. It specifies that the address __addr16 will be used as the Z
  register pointer operand for the LPM operation. "z" means that the operand
  will be a register variable containing an address suitable for use with the Z
  register.

In summary, this macro performs an enhanced version of the Load Program Memory
(LPM) operation to read a byte from flash memory. It takes an address as input,
reads the byte from that address in flash memory, and returns the byte as the
result. This macro is often used in AVR microcontroller programming,
particularly in Arduino sketches, to access data stored in the PROGMEM (PROGram
MEMory) section.

The macro `pgm_read_word` is similar, but reads a word (2 bytes) instead of
just one :-)

### digitalPinToPort

```c
#define digitalPinToPort(p) pgm_read_byte( digital_pin_to_port_PGM + (P) ) )

// From
const uint8_t PROGMEM digital_pin_to_port_PGM[] = {
  PD, /* 0 */
  PD,
  PD,
  PD,
  PD,
  PD,
  PD,
  PD,
  PB, /* 8 */
  PB,
  PB,
  PB,
  PB,
  PB,
  PC, /* 14 */
  PC,
  PC,
  PC,
  PC,
  PC,
};

// From `Arduino.h`
#ifdef ARDUINO_MAIN
#define PA 1
#define PB 2
#define PC 3
#define PD 4
#define PE 5
#define PF 6
#define PG 7
#define PH 8
#define PJ 10
#define PK 11
#define PL 12
#endif

// From
//                  +-\/-+
//            PC6  1|    |28  PC5 (AI 5)
//      (D 0) PD0  2|    |27  PC4 (AI 4)
//      (D 1) PD1  3|    |26  PC3 (AI 3)
//      (D 2) PD2  4|    |25  PC2 (AI 2)
// PWM+ (D 3) PD3  5|    |24  PC1 (AI 1)
//      (D 4) PD4  6|    |23  PC0 (AI 0)
//            VCC  7|    |22  GND
//            GND  8|    |21  AREF
//            PB6  9|    |20  AVCC
//            PB7 10|    |19  PB5 (D 13)
// PWM+ (D 5) PD5 11|    |18  PB4 (D 12)
// PWM+ (D 6) PD6 12|    |17  PB3 (D 11) PWM
//      (D 7) PD7 13|    |16  PB2 (D 10) PWM
//      (D 8) PB0 14|    |15  PB1 (D 9) PWM
//                  +----+
```

Note that PROGMEM is a keyword from avr-libc to declare a variable that should
live in the flash memory.

Essentially this is walking through an array and finding if the pin is linked
to port PB (2), PC (3), or PD (4).

### digitalPinToBitMask

```c
#define digitalPinToBitMask(P) ( pgm_read_byte( digital_pin_to_bit_mask_PGM + (P) ) )

// from
const uint8_t PROGMEM digital_pin_to_bit_mask_PGM[] = {
  _BV(0), /* 0, port D */
  _BV(1),
  _BV(2),
  _BV(3),
  _BV(4),
  _BV(5),
  _BV(6),
  _BV(7),
  _BV(0), /* 8, port B */
  _BV(1),
  _BV(2),
  _BV(3),
  _BV(4),
  _BV(5),
  _BV(0), /* 14, port C */
  _BV(1),
  _BV(2),
  _BV(3),
  _BV(4),
  _BV(5),
};

// from (avr code)
#ifndef _BV(bit)
  // 2**(bit) - two to the power of bit
  #define _BV(bit) (1 << (bit))
#endif
```

### Putting two and two together

You will notice that each port has a bit mask that corresponds to a particular
pin, that is why we need those two mappings.

For example, calling `pinMode(LED_BUILTIN, OUTPUT)`, same as `pinMode(13, 1)`
will give us:

- bit == 0b00100000
- port == PB == 2


### portModeRegister

```c
#define portModeRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_mode_PGM + (P))) )

// from
const uint16_t PROGMEM port_to_mode_PGM[] = {
  NOT_A_PORT,
  NOT_A_PORT,
  (uint16_t) &DDRB,
  (uint16_t) &DDRC,
  (uint16_t) &DDRD,
};

// from AVR
// note each MC has a different definition
#define DDRB  _SFR_IO8(0x04)

// from
#define _SFR_IO8(io_addr) ((io_addr) + __SFR_OFFSET)

// from
define __SFR_OFFSET 0x20
```

In this case we have the address of DDRB

DDRB is the Data Direction register for port “B”. This means that if you set
this register to 0xFF (by running DDRB |= 0xFF ), all ports or pins in the “B”
I/O port act as outputs. If you set DDRB to 0x00 (it’s initialized to 0x00 by
default), then ports or pins in the “B” I/O port act as inputs.

### portOutputRegister

```c
#define portOutputRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_output_PGM + (P))) )

// From
const uint16_t PROGMEM port_to_output_PGM[] = {
  NOT_A_PORT,
  NOT_A_PORT,
  (uint16_t) &PORTB,
  (uint16_t) &PORTC,
  (uint16_t) &PORTD,
};
```

In this case we have the address of PORTB, also defined by avr lib.

### INPUT mode

Now we have that:

- bit == 0b00100000
- port == PB == 2
- reg == &DDRB (register for port B)
- port == &PORTB

The input routine is this:

```c
  if (mode == INPUT) {
    uint8_t oldSREG = SREG;
                cli();
    *reg &= ~bit;
    *out &= ~bit;
    SREG = oldSREG;
  }
```

The Status Register (SREG) contains various status flags that reflect the
outcome of arithmetic and logic operations, as well as control flags for
interrupt handling and other system-level operations.

The older registers is kept so that it can be reset after the register value
is updated.

`cli();`: This macro is used to disable interrupts. When cli() is called, it
clears the global interrupt flag (the I-bit) in the Status Register (SREG),
which effectively disables interrupts.

While temporarily disabling interrupts to ensure atomicity. Disabling
interrupts prevents interrupt service routines from being executed while the
bits in the registers are being manipulated, which helps maintain data
integrity in certain scenarios, particularly in multi-threaded or
interrupt-driven environments.

This is a possible reference for cli:

```c
#define cli() __asm__ __volatile__ ("cli" ::: "memory")
```

I am not sure why interruptions aren't re-enabled via `sei()` later on the
function.

## Conclusion

In a nutshell, this is all the code does.
It's setting the value of the DDRB register for port B with the bitmask for
the particular pin and setting it as output or output.
