2024-04-24

Pre-requisites:

- `avr-gcc` (compiler).
- `clangd` (language server protocol for neovim).
- `bear` (for generating the compile_commands.json file).
- `avrdude` (tool to upload the code to the MCU).

## The Makefile

Whenever start a C project from scratch, I use the following folder structure:

NOTE: to find the port to push the script to, run this:

```sh
ls /dev/tty*
```

If it's not obvious to you which port it is using, disconnect the board and
run the command again. Check which port disappeared, that is your port!

```
.
├── include (where header files exist - if any)
├── src (where the .c files exist)
└── tests (if you run any tests)
```

This means that I can just drop my `Makefile` at the project root:

```make
# Compiler
CC = avr-gcc

# Microcontroller expected by avr-gcc -mmcu flag. (see `man avr-gcc`).
MCU ?= atmega328p

# CPU frequency (in hertz). Must be an unsigned long.
F_CPU ?= 16000000UL

# Arduino USB port (ls /dev/tty*).
USB_PORT ?= /dev/ttyUSB0

# Compiler flags.
CFLAGS = -std=c99 -DF_CPU=$(F_CPU) -mmcu=$(MCU) -Wall -O3 --param=min-pagesize=0

# Source files.
SRC_DIR = src
SRC_SRCS := $(shell find $(SRC_DIR) -name '*.c')
SRC_OBJS := $(patsubst $(SRC_DIR)/%.c, build/src/%.o, $(SRC_SRCS))

# Test source files.
TEST_DIR = tests
TEST_SRCS := $(shell find $(TEST_DIR) -name '*.c')
TEST_OBJS := $(patsubst $(TEST_DIR)/%.c, build/tests/%.o, $(TEST_SRCS))

# Binary executable.
SRC_BIN = build/src/exe.elf
TEST_BIN = build/tests/test_runner

# Compile object files for src.
build/src/%.o: $(SRC_DIR)/%.c
	mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

# Compile object files for tests.
build/tests/%.o: $(TEST_DIR)/%.c
	mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

# Link object files to create binary executable for src.
$(SRC_BIN): $(SRC_OBJS)
	$(CC) $(CFLAGS) $(SRC_OBJS) -o $(SRC_BIN)

# Link object files to create test binary executable for tests.
$(TEST_BIN): $(TEST_OBJS)
	$(CC) $(CFLAGS) $(TEST_OBJS) -o $(TEST_BIN)

# Default target.
all: $(SRC_BIN)

# Upload to board using the arduino bootloader.
upload: $(SRC_BIN)
	avrdude -v -p $(MCU) -c arduino -P $(USB_PORT) -b 115200 -U flash:w:$(SRC_BIN)

# Tests target
tests: $(TEST_BIN)
	$(TEST_BIN)

.PHONY: compile_commands.json clean clean_src clean_tests

# Necessary if using clangd as a Language Server Protocol.
compile_commands.json: clean
	bear --output src/compile_commands.json -- make
	# Tests are skipped because there ain't any at the moment!
	# bear --output tests/compile_commands.json -- make tests

clean:
	rm -rf build
```

Notes:

1. The reason the flag `--param=min-pagesize=0` is set is because of a current
   bug in avr-gcc:
   [source](http://web.archive.org/web/20230730125739/https://gcc.gnu.org/bugzilla/show_bug.cgi?id=105523)
2. The linker also needs to get the same compiler flags, specially the -mmcu
   one.

## Makefile commands

```sh
# Compile the binary.
make

# Compile and upload to MCU
make upload

# Run tests if any.
make tests

# Compile the file for clangd operation.
make compile_commands.json
```

And voilà! Now you can simply use clangd normally as it will pick up the
freshly compile compile_commands.json!
