`2024-30-03`

The `static` keyword in C has double meaning. If a variable or a function at
the top level of a module is declared `static`, it means that it is a local
variable (or function) instead of a global one, and thus cannot be used in
other files.

Other than that, the `static` keyword is used to allocate static storage. Those
are called "static variables". This use is more nuanced, and is described
below with additional details.

> A static variable is a variable that has been allocated "statically", meaning
> that its lifetime (or "extent") is the entire run of the program

Those variables are allocated at compiling time. For example:

```c
void func() {
  static int my_var = 0;
  // |my_var| is initialized by the compiler.
  // The final value of |my_var| will be 5.
  my_var++;
}

int main() {
  func();  // my_var = 1
  func();  // my_var = 2
  func();  // my_var = 3
  func();  // my_var = 4
  func();  // my_var = 5

  return 0;
}
```

The `func` above yields the following Assembly:

```asm
func:
  add  DWORD PTR my_var.0[rip], 1
  ret
  .local  my_var.0
  .comm  my_var.0,4,4
```

The `.local` directive simply points out that the variable `my_var.0` is only
visible within the current file or block.

The `.comm` defines a common block, which is a memory area that is shared among
multiple source files or object files. It's often used for declaring global
variables or shared memory.

The first 4 is the size of the memory area being reserved for `my_var.0`. The
second 4 is the alignment of the memory area. I.e., aligned on a 4-byte
boundary.

The suffix `.0` helps disambiguating when we have two static variables with the
same name:

```asm
void func() {
  static int my_var = 0;
  my_var++;
}

void func2() {
  static int my_var = 0;
  my_var--;
}
```

Yields:

```asm
func:
  add  DWORD PTR my_var.1[rip], 1
  ret
func2:
  sub  DWORD PTR my_var.0[rip], 1
  ret
  .local  my_var.0
  .comm  my_var.0,4,4
  .local  my_var.1
  .comm  my_var.1,4,4
```

## Trying an array

```c
void func(int i, int v) {
  static char my_arr[777];
  my_arr[i] = v;
}
```

Yields:

```asm
func:
  ; some omitted code
  ret
  .size  func, .-func
  .local  my_arr.0
  .comm  my_arr.0,777,32
```

I am not sure why the alignment is set to 32 bytes here! Different array types
such as `int`, `float`, `long long` are all yielding 32 bytes.

## What about threads

In a multi-threaded environment, local static variables are shared across all
threads. This may cause race conditions. For example:

```c
#include <pthread.h>
#include <stdio.h>

void fun() {
  static int my_var = 0;
  my_var++;
  printf("my_var: %d, tid: %lu\n", my_var, pthread_self());
}

void *thread_func(void *arg) {
  fun();
  fun();
  return NULL;
}

int main() {
  const int num_threads = 5;
  pthread_t threads[num_threads];
  for (int i = 0; i < num_threads; i++) {
    pthread_create(&threads[i], NULL, thread_func, NULL);
  }
  for (int i = 0; i < num_threads; i++) {
    pthread_join(threads[i], NULL);
  }
  return 0;
}
```

Output:

```sh
my_var: 1, tid: 127454730593984
my_var: 4, tid: 127454730593984
my_var: 2, tid: 127454738986688
my_var: 5, tid: 127454738986688
my_var: 3, tid: 127454722201280
my_var: 6, tid: 127454722201280
my_var: 7, tid: 127454755772096
my_var: 8, tid: 127454755772096
my_var: 9, tid: 127454747379392
my_var: 10, tid: 127454747379392
```

## What about forks

Differently from threads, forks *do not share* local static variables.

```c
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

void fun() {
  static int my_var = 0;
  my_var++;
  printf("my_var: %d, pid: %d\n", my_var, getpid());
}

int main() {
  const int num_processes = 5;
  pid_t pids[num_processes];

  for (int i = 0; i < num_processes; i++) {
    pids[i] = fork();

    if (pids[i] == -1) {
      // Error occurred
      perror("fork");
      return 1;
    } else if (pids[i] == 0) {
      // Child process
      fun();
      fun();
      return 0; // Exit child process
    }
  }

  // Parent process waits for all child processes to finish
  for (int i = 0; i < num_processes; i++) {
    waitpid(pids[i], NULL, 0);
  }

  return 0;
}
```

Output:

```sh
my_var: 1, pid: 38252
my_var: 2, pid: 38252
my_var: 1, pid: 38250
my_var: 2, pid: 38250
my_var: 1, pid: 38253
my_var: 2, pid: 38253
my_var: 1, pid: 38251
my_var: 2, pid: 38251
my_var: 1, pid: 38249
my_var: 2, pid: 38249
```
