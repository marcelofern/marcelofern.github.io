2024-06-05

# Printf Evaluation Order

Suppose you have a "HEY" file:

```sh
echo "HEY" > /tmp/hey.txt
```

And the following code:

```c
#include "stdio.h"

int main() {
  FILE *fp = fopen("/tmp/hey.txt", "r");
  printf("%c %c %c", getc(fp), getc(fp), getc(fp));
  fclose(fp);
}
```

If you expected the result to be `H E Y`, you are wrong. You'll actually get
`Y E H` instead.

The order of evaluation of "printf" is not defined in the C standard, and thus
the compiler is free to evaluate the arguments in whatever order it sees fit.

In my case, gcc decided to evaluate last-to-first.

Avoid calling printf with arguments that have side effects like getc. Do this
instead:

```c
char c1 = getc(fp);
char c2 = getc(fp);
char c3 = getc(fp);

printf("%c %c %c\n", c1, c2, c3);
```
