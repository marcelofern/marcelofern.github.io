2024-04-25

In section 19 for the ATMega328p datasheet, you can find detailed information
about the USART functionality available in the microcontroller. It's
recommended to at least scan through that section to see what is available.

The following will break down and distil the information necessary to set up
a USART communication with baud rate of 9,600 and 8bit-long messages.

## Initialising

In section 19.5, there are instructions for initialising USART, along with
C and Assembly code snippets. The C code is pasted below as is:

```c
#define FOSC 1843200 // Clock Speed
#define BAUD 9600
// See table 19.1 on the datasheet for this equation.
#define MYUBRR FOSC/16/BAUD-1
void main(void)
{
    ...
    USART_Init(MYUBRR)
    ...
}
void USART_Init(unsigned int ubrr)
{
    /*Set baud rate */
    UBRR0H = (unsigned char)(ubrr>>8);
    UBRR0L = (unsigned char)ubrr;
    /* Enable receiver and transmitter */
    UCSR0B = (1<<RXEN0)|(1<<TXEN0);
    /* Set frame format: 8data, 2stop bit */
    UCSR0C = (1<<USBS0)|(3<<UCSZ00);
}
```

- `FOSC` is the System oscillator clock frequency. In ATMega328p, that will be
  16MHz and can be accessed via the macro definition F_CPU.
- `BAUD` is the baud rate in bits per second.
- `MYUBRR` is the baud rate register setting, which in Asynchronous normal mode
  is calculated by `(FOSC/(16*BAUD)) - 1`. This value will end up between (0,
  4095).
- `UBRR0H` and `UBRR0L` are the registers where the UBRR value will be put
  into. Given that the value is between 0 and 4095, it needs two 8bit registers
  to fit.
- `UCSR0B` is the USART control and status register B. You can read more about
  it on section 19.10.3.
- `TXENn` is a bit that represents "Transmitter enable n".
- `UCSR0C` is the USART control and status register C.
- The UCSZn1:0 bits combined with the UCSZn2 bit in UCSRnB sets the number of
  data bits (character size) in a frame the receiver and transmitter use.

For more information on where that equation came from, visit the table 19.1 on
the ATMega328p datasheet.

## Calculating the UBRR value for ATMega328p

- `FOSC` in ATMega328p is 16MHz.
- `BAUD` will be the same, we'll keep it at 9600 bits per second.

Thus we have:

```c
#define BAUD 9600
// F_CPU is passed in during compilation -DF_CPU=16000000UL
#define UBRR_VALUE = (F_CPU/(16UL * BAUD)) - 1
```

The `UBRR_VALUE` is split between registers `UBRR0H` and `UBRR0L`, and
they can be set with like this:

```c
// Our ubrr in decimal is 103, which in binary is 00000000 01100111.
// In this case the high bits will be 00000000.
// The low bits will be 01100111.
UBRR0H = (unsigned char)(ubrr >> 8);
UBRR0L = (unsigned char)(ubrr);
```

In our case, the ATMega328p will only be transmitting, and not receiving,
so we'll set up the UCSR0B with TXEN0:

```c
UCSR0B = 1 << TXEN0;
```

And we will be transmitting 8bit messages, so we'll set up UCSR0C with
UCSZ00:

```c
UCSR0C = 3 << UCSZ00;
```

The whole code for this bit is:

```c
void usart_init(uint16_t ubrr) {
  /* Initialises USART communication.
   *
   * - Use Asynchronous normal mode.
   * - Enable transmitter only.
   * - Use 8-bit characters for communication.
   *
   * More details are in section 19 of the ATMega328p datasheet.
   *
   */
  UBRR0H = (unsigned char)(ubrr >> 8);
  UBRR0L = (unsigned char)(ubrr);
  UCSR0B = 1 << TXEN0;
  UCSR0C = 3 << UCSZ00;
}
```

## Sending data to the terminal

From section 19.6.1 in the datasheet:

> A data transmission is initiated by loading the transmit buffer with the data
> to be transmitted. The CPU can load the transmit buffer by writing to the
> UDRn I/O location. The buffered data in the transmit buffer will be moved to
> the shift register when the shift register is ready to send a new frame. The
> shift register is loaded with new data if it is in idle state (no ongoing
> transmission) or immediately after the last stop bit of the previous frame is
> transmitted. When the shift register is loaded with new data, it will
> transfer one complete frame at the rate given by the baud register, U2Xn bit
> or by XCKn depending on mode of operation.

The following C code example is provided:

```c
void USART_Transmit(unsigned char data)
{
    /* Wait for empty transmit buffer */
    while (!(UCSRnA & (1<<UDREn)));
    /* Put data into buffer, sends the data */
    UDRn = data;
}
```

- `UCSRnA` is the USART control and status register A.
- `UDREn` is a bit flag that indicates if the transmit buffer (UDRn) is ready
  to receive new data. If UDREn is one, the buffer is empty and ready to be
  written.
- `UDRn` is the transmit buffer.

We will use that same function, just changing n to 0:

```c
void usart_transmit(unsigned char data) {
    /* Transmit 8bit data via USART
     *
     * Waits until UCSR0A is ready to receive data,
     * and then pushes to register UDR0.
     *
     * More details are in section 19.6.1 of the ATmega328p datasheet.
     */
    while (!(UCSR0A & (1<<UDRE0)));
    UDR0 = data;
}
```

## Setting up the data stream

We want the USART message to be print to the linux terminal of the machine we
are using the ATMega328p with.

We need to tell our program, that the output of `stdio` functions must be
redirected to a stream of our choice. This stream will be the USART
transmitter function we built in the previous step (`usart_transmit`)

This can be achieved as follows:

```c
static FILE uartout = FDEV_SETUP_STREAM(usart_transmit, NULL, _FDEV_SETUP_WRITE);
```

However, we need to change the `usart_transmit` function signature to suit
the protocol.

```diff
- void usart_transmit(unsigned char data) {
+ int usart_transmit(char data, struct __file* stream) {
   /* Transmit 8bit data via USART.
    *
    * Waits until UCSR0A is ready to receive data,
    * and then pushes to register UDR0.
    *
    * More details are in section 19.6.1 of the ATmega328p datasheet.
    */
   while (!(UCSR0A & (1<<UDRE0)));
   UDR0 = data;
+  return 0;
}
```

## The code

The following script can be compiled using the script in my other note:

- [ATMega328P on vim](embedded_development/atmega328p/atmega328p_on_vim.md)

```c
#include <avr/io.h>
#include <stdint.h>
#include <stdio.h>
#include <util/delay.h>

#define BAUD 9600
#define UBRR_VALUE ((F_CPU / (16UL * BAUD)) - 1)

int usart_transmit(char data, struct __file *stream) {
  /* Transmit 8bit data via USART.
   *
   * Waits until UCSR0A is ready to receive data,
   * and then pushes to register UDR0.
   *
   * More details are in section 19.6.1 of the ATmega328p datasheet.
   */
  while (!(UCSR0A & (1 << UDRE0)))
    ;
  UDR0 = data;
  return 0;
}
static FILE uartout =
    FDEV_SETUP_STREAM(usart_transmit, NULL, _FDEV_SETUP_WRITE);

void usart_init(uint16_t ubrr) {
  /* Initialises USART communication.
   *
   * - Use Asynchronous normal mode.
   * - Enable transmitter only.
   * - Use 8-bit characters for communication.
   *
   * More details are in section 19 of the ATMega328p datasheet.
   *
   */
  UBRR0H = (unsigned char)(ubrr >> 8);
  UBRR0L = (unsigned char)(ubrr);
  UCSR0B = 1 << TXEN0;
  UCSR0C = 3 << UCSZ00;
}

int main(void) {
  usart_init(UBRR_VALUE);
  stdout = &uartout;
  int times = 0;
  while(1) {
    printf("Hello folks! %d\r\n", times);
    _delay_ms(2000);
    times += 1;
  }
  return 0;
}

```

## Checking the output

You will have to use picocom to verify what has been pushed to your terminal
via USART:

```sh
picocom -b9600 /dev/ttyUSB0
```

Where `/dev/ttyUSB0` is the port your device is connected to, which can be
found via:

```sh
ls /dev/tty*
```

## Useful resources

- [source](http://web.archive.org/web/20231001155615/https://www.gridbugs.org/programming-an-arduino-the-hard-way/)
