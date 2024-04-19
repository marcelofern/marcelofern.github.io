> In microcontroller-based systems, Erasable Programmable Read-Only Memory, or
> EEPROM, is also part of its ROM; actually, Flash memory is a type of EEPROM.
> The main difference between Flash memory and EEPROM is how they are managed;
> EEPROM can be managed at the byte level (write or erased) while Flash can be
> managed at the block level.

[source](http://web.archive.org/web/20240414220510/https://docs.arduino.cc/learn/programming/memory-guide/)

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
