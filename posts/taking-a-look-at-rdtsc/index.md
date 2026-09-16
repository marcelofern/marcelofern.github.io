# Taking a look at RDTSC

```
Created at: 2026-09-14
```

I have recently come across the assemlby instruction `RDTSC` (Read Time-Stamp Counter)
when studying ways to get the number of elapsed clock cycles directly from the
CPU.

The reason this is important is that it allows you to be very specific about
the time it takes to execute certain assembly instructions. For example:

```asm
RDTSC ; Read the time-stamp counter into EDX:EAX
SHL RDX, 32 ; Shift EDX left by 32 bits to make space for EAX
OR RAX, RDX ; Combine EAX and EDX into a single 64-bit value in RAX
MOV R8, RAX ; Move the combined value into R8 for later use

; This is the actual code I want to check
MOV ECX, EDX
ADD ECX, 50

RDTSC ; Read the time-stamp counter again into EDX:EAX
SHL EDX, 32
OR RAX, EDX ; Combine EAX and EDX into a single 64-bit

; Finally, the elapsed cycles:
SUB RAX, R8
```

Note: the RDTSC instruction was added before 64 bit registers were introduced,
so in order to keep the 8 bytes in a single register (r8, then rax), we need to
do that akward left shift into RDX and then combine it back with RAX.

So far so good, but...

## How does RDTSC work?

When the Pentium processors were released, they came with a new 64 bit register
called the Time Stamp Counter (TSC).

All this register does is to count the number of elapsed clock cycles. It is a
64 bit number that only goes up and resets to 0 when the CPU is powered on.

So you can call this instruction, perform your code, call it again, and then
subtract the two values to get the number of elapsed cycles.

Easy?

## The problem with RDTSC

Modern CPUs may parallelise multiple instructions. This means that the CPU may
execute instructions out of order, and the number of elapsed cycles may not be
accurate. For example, if you have a `MOV` instruction that takes 1 cycle, and
an `ADD` instruction that takes 2 cycles, the CPU may execute the `ADD`
instruction before the `MOV` instruction to enable parallelism, and the number
of elapsed cycles may be 2 instead of 3.

To fix our code above, we can use the lfence instruction to make sure that all
previous instructions have been executed before we read the TSC value. So a
better way to call rdtsc is to do the following:

```asm
LFENCE
RDTSC
SHL RDX, 32
OR RAX, RDX
MOV R8, RAX
```

Note: Alternatively you can use the `CPUID` instruction, which is stronger than
`LFENCE` as the latter only prevents load reordering. But it comes with the
cost of thrashing EAX/EBX/ECX/EDX.

Also... Modern CPUs also have multiple cores. There is no guarantee that
TSC registers are synchronized across cores. This means that if you call RDTSC
on one core, and then your code gets scheduled on another core, the TSC value
you read may not be accurate.

Also, cores don't even have to have the same frequency. Their frequency may
change dynamically based on the workload, and the TSC value may not, again, be
accurate.

## The change

Between the Pentium and the time this article was written, Intel has changed
the way the TSC works. Now, the TSC is a an "invariant TSC". This means that
the TSC ticks at a constant rate, which is usually the "nominal" frequency of
the CPU. This doesn't get affected by turbo or power saving states.

In practice, this means that the TSC is now a counter of time (like a wall
clock), instead of a counter of cycles.

While this isn't as good as a cycle counter, it is still useful for measuring
elapsed time, and if you cross reference that value across different cores, you
can understand what each core was doing when. Which is great for profiling.

On top of that, the `RDTSC` is almost always available to you (as the
programmer), meaning the OS won't try to stop/block you from using it and it is
available in many CPUs. Some other instructions like (RDPMC) which read the
performance monitoring counter directly may require a kernel privilege and
others like RDPRU are only available in very few processors.

But in order for you to make sense of the number provided by `RDTSC`, you need
to know the frequency of the CPU. This is because the TSC is now a time
counter, and you need to convert the number of ticks into time.

Enter the `CPUID` instruction (again). This instruction allows you to query the
CPU for its features, including the nominal frequency. You can use this to convert
the TSC value into time. For example:

```asm
MOV     EAX, 15h
XOR     ECX, ECX
CPUID
; EAX = denominator of TSC/crystal ratio
; EBX = numerator   of TSC/crystal ratio
; ECX = core crystal clock frequency in Hz (0 if not enumerated)
; EDX = 0 (reserved)
```

But again, the problem is that this instruction is not available in all CPUs.

## Using a timer to time the timer

Given that `CPUID` is not available on all CPUs, and that the TSC counts time
based on the nominal frequency of the CPU, which is not always known, we can
use the system timer to time the timer.

This means that we can use the system timer to measure the time it takes to
execute a piece of code, and then use that to calibrate the TSC. Yes, this is
bizarre.

To call the system timer we can use `gettimeofday` on Unix.

```c
/* For gettimeofday() */
#include <sys/time.h>

/* For printf() */
#include <stdio.h>

int main(void) {
  struct timeval tp;

  /* gettimeofday() returns 0 on success, and modifies tp */
  gettimeofday(&tp, NULL);
  printf("gettimeofday() returned: %d\n", tp.tv_usec);
  printf("gettimeofday() returned: %ld\n", tp.tv_sec);

}
```

Which returns the timestamp since 1970-01-01. Example:

```
gettimeofday() returned: 166123
gettimeofday() returned: 1789450708
```

Most often we probably want to get the value in miliseconds, and wrap it in a useful function:

```c
/* For gettimeofday() */
#include <sys/time.h>

/* For printf() */
#include <stdio.h>

/* For integer types */
#include <stdint.h>

uint64_t get_time_in_microseconds() {
  struct timeval tp;
  gettimeofday(&tp, NULL);
  return (uint64_t)tp.tv_sec * 1000000 + (uint64_t)tp.tv_usec;
}

int main(void) {
  /* get_time_in_microseconds() returned: 1789451031621605 */
  printf("get_time_in_microseconds() returned: %llu\n", get_time_in_microseconds());
}
```

Finally, we need a way of running RDTSC. This can be simply achieved by using
the intrinsic `__rdtsc()` provided by GCC.

```c
/* For printf() */
#include <stdio.h>

/* For __rdtsc */
#include <x86intrin.h>

uint64_t get_cpu_timer() {
  return __rdtsc();
}

int main(void) {
  /* get_cpu_timer() returned: xxxxxxxxxxx */
  printf("get_cpu_timer() returned: %llu\n", get_cpu_timer());
}
```

Given that you might be following this on a MAC, the equivalent of the TSC in
mac is the CNTVCT register (Counter-timer Virtual Count register). But the
difference is that this register always clocks at the same frequency (1GHz in my system).
So it is not very helpful for counting CPU clocks.

```c
/* For printf() */
#include <stdio.h>

/* For integer types */
#include <stdint.h>

uint64_t get_cpu_timer() {
  return __builtin_arm_rsr64("cntvct_el0");
}

int main(void) {
  /* get_cpu_timer() returned: xxxxxxxxxxx */
  printf("get_cpu_timer() returned: %llu\n", get_cpu_timer());
}
```

Now back to linux and using a combination of system clock and the CPU clock, we
can measure the time it takes to execute a piece of code, and then use that to
calibrate the TSC.

If you want to find the clock frequency of the CPU, you can use the following code:

```c
/* For gettimeofday() */
#include <sys/time.h>

/* For __rdtsc */
#include <x86intrin.h>

/* For printf() */
#include <stdio.h>

/* For integer types */
#include <stdint.h>

uint64_t get_cpu_timer() {
  return __rdtsc();
}

uint64_t get_time_in_microseconds() {
  struct timeval tp;
  gettimeofday(&tp, NULL);
  return (uint64_t)tp.tv_sec * 1000000 + (uint64_t)tp.tv_usec;
}

int main(void) {
    uint64_t start_time, end_time, time_difference, start_cycles, end_cycles;
    uint64_t elapsed_time, elapsed_cycles;
    uint64_t cpu_frequency;

    start_time = get_time_in_microseconds();
    start_cycles = get_cpu_timer();


    /* Sleep for 1 second */
    time_difference = 0;
    while (time_difference < 100000) {
        end_time = get_time_in_microseconds();
        time_difference = end_time - start_time;
    }
    end_cycles = get_cpu_timer();

    /* in microseconds */
    elapsed_time = end_time - start_time;
    elapsed_cycles = end_cycles - start_cycles;

    /* cycles per microsecond */
    cpu_frequency = elapsed_cycles / elapsed_time;

    printf("CPU Frequency: %lld MHz\n", cpu_frequency);
}
```

This is basically it. With just the OS clock and the CPU clock we can do some
pretty decent instrumentation-based profiling analysis of our code.
