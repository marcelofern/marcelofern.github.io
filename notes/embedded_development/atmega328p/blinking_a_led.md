2024-04-25

This example blinks the LED in the arduino UNO board that uses ATMega328p.
It can be compiled using the script in my other notes:

- [ATMega328P on vim](embedded_development/atmega328p/atmega328p_on_vim.md)

```c
#include <avr/io.h>
#include <util/delay.h>

int main(void) {
  DDRB |= (1 << DDB5);
  while (1) {
    PORTB |= (1 << PB5);
    _delay_ms(1000);

    PORTB &= ~(1 << PB5);
    _delay_ms(1000);
  }
}
```
