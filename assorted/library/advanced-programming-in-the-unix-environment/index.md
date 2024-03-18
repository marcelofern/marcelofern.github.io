---
title: Advanced Programming in the Unix Environment
author: Marcelo Fernandes
date: December 18th, 2023
---

## Unix System Overview

### Log in

When a user logs into unix, the system looks for an entry in the password
file at `/etc/passwd`.

```
Marcelo:x:1000:1000:Marcelo Fernandes:/home/Marcelo:/usr/bin/zsh
```

The format is based on a 7-value colon separated string:

```
<login name>:<encrypted password>:<id>:<group id>:<comment field>:<home dir>:<shell bin>
```

Note that the password itself is stored in another file.

### Files and Directories

Two filenames are created when a new directory is created.
The `.` (dot) file, and the `..` (dot dot) file. This means that directories
in Linux are like doubly linked lists, as you can navigate up and down from
any nested directory.

An implementation of `ls`:

```c
#include <dirent.h>
#include <err.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

  DIR *dp;
  struct dirent *dirp;

  if (argc != 2) {
    err(EXIT_FAILURE, "usage: ls directory_name\n");
  }

  if ((dp = opendir(argv[1])) == NULL)
    err(EXIT_FAILURE, "can't open %s\n", argv[1]);

  while ((dirp = readdir(dp)) != NULL)
    printf("%s\n", dirp->d_name);

  closedir(dp);
  exit(0);
}
```

### Input and Output

File descriptors are small non-negative ints representing files. By convention,
all shells open three descriptors: standard input (fd = 0), standard output (fd
= 1), and standard error (fd = 2).


Most shells provide a way to redirect the result of commands
to another file:

```sh
ls > file.list
```

### Programs and Processes

Every program has a process ID:

```c
#include <stdio.h>
#include <unistd.h>

int main() {
  printf("Here's my process id: %d\n", getpid());
}
```

### Error Handling

When one of the functions in the UNIX system errs, the integer `errno` is
usually set to a value that tells you why.

```c
#include <errno.h>
```

A good way of printing the errno, is via `perror`:

```c
#include <errno.h>
#include <stdio.h>

int main() {
    errno = 1;
    perror("Oh my god!");
}
```

Which prints:

> Oh my god!: Operation not permitted

The bit that says "Operation not permitted" can also be fetched via:

```c
#include <string.h>

char *strerror(int errnum);
```

### Time Values


When measuring the execution time of a process, a UNIX system maintains three
values:

1. Clock time: Amount of time the process takes to run, in total.
2. User CPU time: CPU time attributed to user instructions.
3. System CPU time: CPU time attributed to the kernel executing in behalf of
   the user.



