2024-04-21

Install the following packages:

1. `avr-gcc`
2. `avr-binutils` (should already come with avr-gcc)
3. `avr-libc`
4. `libserialport`
5. `avrdude`

**Assumptions**:

- The file you want to compile is called `main.S`.
- You have an assembly file. If you don't, use the one I provide at the end of
  this note.

## Compiling to elf:

```sh
avr-gcc -DF_CPU=16000000UL -mmcu=atmega328p main.S -o main
```

- `DF_CPU` adds the macro F_CPU which evaluates to 16MHz (the CPU freq).
- `-mmcu` specifies the architecture
  pre-processed source code.
- `-o` output

## (Optional) compiling without stdlib

For small scripts you may not need the stdlib, so you can pass the argument
`nostdlib` to the compiler. The default is to include the stdlib.

```sh
avr-gcc -DF_CPU=16000000UL -nostdlib -mmcu=atmega328p main.S -o main
```

If you check the size of the compiled file, it should have less bytes now.

```sh
avr-size --format=avr --mcu=atmega328p main
```

In my current version of avr-gcc, this has saved me 132 bytes.

## Transform the file into a hex file

When avrdude pushes the compiled code to the arduino, it requires a hex file
that can be produced by running the following command:

```sh
avr-objcopy -O ihex main main.hex
```

- `-O` write the output file using the object format bfdname (ihex for intel
  hex)

## Find the usb the arduino is connected to

Connect your arduino and run

```sh
ls /dev/tty*
```

If it's not obvious to you which port it is using, disconnect the arduino and
run the command again. Check which port disappeared, that is your port!

## Run avrdude

This is the one that will differ depending on what programmer you are using.
I'm just using the Arduino bootloader, so I can run avrdude like this:

```sh
avrdude -v -p atmega328p -c arduino -P /dev/ttyUSB0 -b 115200 -U flash:w:main.hex:i
```

**NOTE**: Sometimes you have to play with the bound rate to get it to push
properly. I have had success with higher bound rates.

## My script

This script turns a LED on/off every 3 seconds.

```asm
#include <avr/io.h>
.section .data

.section .bss

.section .text

.global main

main:
  .org 0x00
  ldi r16, (1<<PB5)
  ldi r17, (1<<PB5)
  out _SFR_IO_ADDR (DDRB), r16
loop:
  out _SFR_IO_ADDR (PORTB), r16
  rcall delay_1s
  rcall delay_1s
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
