2024-06-01

# Avoid `char` with `getc`

Using a `char` to represent the output of `getc` (get char) might sound like
the right way to do it, but it is not.

Let's show an example. First, create a binary file with the following content:

```
10101010 00000000 11111111 01010101 00001111 11000011
# or in hex:
AA00FF550FC3
```

This can be done in bash:

```sh
echo "AA00FF550FC3" | xxd -r -p > /tmp/file.bin
```

You can confirm the content by using xxd:

```sh
xxd -b /tmp/file.bin
```

And a dumb code that will:

- Read one byte using `getc`.
- Print the byte.

```c
#include <stdio.h>

int main() {
  FILE* fp = fopen("/tmp/file.bin", "rb");

  char byte;
  while ((byte = getc(fp)) != EOF) {
    printf("byte: %x\n", byte);
  };

  fclose(fp);
}
```

The expected result should have been:

```
byte: aa
byte: 00
byte: ff
byte: 55
byte: 0f
byte: c3
```

But instead you'll get:

```
byte: aa
byte: 00
```

This happens because the byte `11111111` equals `EOF` which is a macro that
returns -1. This evaluation breaks the while loop.

Instead, one should use either `int` or `uint8_t` to get the correct result.

Note: The same is valid for `ungetc`!
