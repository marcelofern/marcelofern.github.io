> In microcontroller-based systems, Erasable Programmable Read-Only Memory, or
> EEPROM, is also part of its ROM; actually, Flash memory is a type of EEPROM.
> The main difference between Flash memory and EEPROM is how they are managed;
> EEPROM can be managed at the byte level (write or erased) while Flash can be
> managed at the block level.

[source](http://web.archive.org/web/20240414220510/https://docs.arduino.cc/learn/programming/memory-guide/)

> To be pedantic, FLASH memory is merely a form of EEPROM: There is a marketing
> / branding aspect here. Typically, the distinction used today is that EEPROMS
> are single-byte (or storage word) erasable / rewritable, while FLASH is
> block-based for erase/write operations.

> Relevant to the question:
> - EEPROMs continue to be popular due to maximum erase/write cycle ratings
>   being an order of magnitude or two better than FLASH
> - Due to investments in design typically having been amortized over time, as
>   with any mature technology, the cost of production and testing reduces
>   compared to a newer technology.

---

> The number of write cycles most EEPROMs can handle generally far exceeds the
> number of write cycles most flash memory can handle.

> EEPROMS can generally handle ~100,000-1,000,000 writes per cell. Flash is
> generally rated to ~1,000-100,000 writes (it varies heavily depending on the
> type of flash).

[source](http://web.archive.org/web/20230625055210/https://electronics.stackexchange.com/questions/65503/why-would-one-still-use-normal-eeprom-instead-of-flash)


Main differences between EEPROM and Flash:

## EEPROM

- Erase Mechanism: EEPROM allows individual bytes or words to be erased and
  rewritten electrically.
- Write Mechanism: EEPROM can be written byte-by-byte, offering more
  flexibility for small changes compared to Flash.
- Speed: EEPROM generally has slower write and erase speeds compared to Flash
  memory.
- Endurance: EEPROM typically has a higher endurance compared to Flash memory,
  with tens of thousands to millions of erase/write cycles.
- Usage: EEPROM is often used in applications requiring frequent and small data
  updates, such as in embedded systems for storing configuration data or
  firmware updates.
- Cost: EEPROM tends to be more expensive on a per-bit basis compared to Flash
  memory due to its lower storage density.

## Flash

- Erase Mechanism: Flash memory erases data in blocks, which means larger
  sections of memory are erased at once. It is organized into blocks, pages,
  and sectors.
- Write Mechanism: Flash memory requires data to be written in pages, which are
  larger than the typical byte-sized writes in EEPROM.
- Speed: Flash memory generally offers faster write and erase speeds compared
  to EEPROM.
- Endurance: Flash memory typically has a limited number of erase/write cycles,
  which can be a few thousand to hundreds of thousands depending on the type
  and quality.
- Usage: Flash memory is commonly used in mass storage devices like USB drives,
  memory cards, and solid-state drives (SSDs) due to its higher storage
  capacity and faster access times.
- Cost: Flash memory is generally more cost-effective for larger storage
  capacities compared to EEPROM.

## AVR example

Here's how to declare a variable in the EEPROM memory, and how to read/write
to it.

```c
#include <avr/eeprom.h>

// Use the EEMEM macro.
uint8_t EEMEM my_variable = 0x12;

// Read data using eeprom_read_byte.
uint8_t value = eeprom_read_byte(&my_variable);

uint8_t new_value = 0xAB;
// Write data using eeprom_write_byte.
eeprom_write_byte(&my_variable, new_value);

printf("my_variable: %d", value);
// my_variable: 171
```
