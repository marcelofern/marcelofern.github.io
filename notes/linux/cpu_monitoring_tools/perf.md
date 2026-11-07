# perf

```
Created at: 2024-11-12
```

perf(1): Performance analysis tools for Linux

## One liners

First make sure you have this set:

```sh
# Allow use of almost all events by all users.
# This will be reset if you reboot your computer.
sudo sysctl -w kernel.perf_event_paranoid=-1
```

### Recording

```sh
# Sample on-CPU functions for the specified command, at 99 Hertz:
perf record -F 99 command

# Sample CPU stack traces (via frame pointers) system-wide for 10 seconds:
perf record -F 99 -a -g -- sleep 10

# Sample CPU stack traces for the PID, using dwarf (dbg info) to unwind stacks:
perf record -F 99 -p PID --call-graph dwarf -- sleep 10

# Record new process events via exec (might need sudo):
perf record -e sched:sched_process_exec -a

# Record context switch events for 10 seconds with stack traces:
perf record -e sched:sched_switch -a -g -- sleep 10

# Sample CPU migrations for 10 seconds:
perf record -e migrations -a -- sleep 10

# Record all CPU migrations for 10 seconds:
perf record -e migrations -a -c 1 -- sleep 10

# Show perf.data as a text report, with data coalesced and counts and
# percentages:
perf report -n --stdio

# List all perf.data events, with data header (recommended):
perf script --header

# Show PMC statistics for the entire system, for 5 seconds:
perf stat -a -- sleep 5

# Show PMC stats for the command
perf stat command

# Show CPU last level cache (LLC) statistics for the command:
perf stat -e LLC-loads,LLC-load-misses,LLC-stores,LLC-prefetches command

# Show memory bus throughput system-wide every second:
perf stat -e uncore_imc/data_reads/,uncore_imc/data_writes/ -a -I 1000

# Show the rate of context switches per-second:
perf stat -e sched:sched_switch -a -I 1000

# Show the rate of involuntary context switches per-second (previous state was
# TASK_RUNNING):
perf stat -e sched:sched_switch --filter 'prev_state == 0' -a -I 1000

# Show the rate of mode switches and context switches per second:
perf stat -e cpu_clk_unhalted.ring0_trans,cs -a -I 1000

# Record a scheduler profile for 10 seconds:
perf sched record -- sleep 10

# Show per-process scheduler latency from a scheduler profile:
perf sched latency

# List per-event scheduler latency from a scheduler profile:
perf sched timehist
```

## Flame graphs

(added in Linux 5.8)

```sh
perf record -F 99 -a -g -- sleep 10
perf script report flamegraph
$BROWSER flamegraph.html

# Also available as a single command
perf script flamegraph -a -F 99 sleep 10 && $BROWSER flamegraph.html
```

## Hardware Event Selection

To see a list of available hardware events that can be printed:

```sh
perf list

  branch-instructions OR branches                    [Hardware event]
  branch-misses                                      [Hardware event]
  bus-cycles                                         [Hardware event]
  cache-misses                                       [Hardware event]
  cache-references                                   [Hardware event]
  [...]
  cpu:
    L1-dcache-loads OR cpu/L1-dcache-loads/
    L1-dcache-load-misses OR cpu/L1-dcache-load-misses/
    L1-dcache-stores OR cpu/L1-dcache-stores/
    L1-icache-load-misses OR cpu/L1-icache-load-misses/
    LLC-loads OR cpu/LLC-loads/
  [...]
```

You can select some and use it with `perf stats -e <command>`. The flag `e`
needs to be selected to list the *events* you are choosing.

```sh
EVENTS="instructions,cycles,branch-instructions,branch-misses,LLC-loads"
perf stat -e $EVENTS man echo

 Performance counter stats for 'man echo':

     1,124,851,601      instructions:u                   #    1.39  insn per cycle
       808,224,561      cycles:u
       247,251,658      branch-instructions:u
         4,341,929      branch-misses:u                  #    1.76% of all branches
         1,905,146      LLC-loads:u

       1.615330906 seconds time elapsed

       0.221092000 seconds user
       0.090197000 seconds sys
```

Some interesting events are:

- `L1-dcache-load-misses`: Level 1 data cache load misses. This gives you a
  measure of the memory load caused by the application, after some loads have
  been returned from the Level 1 cache. It can be compared with other L1 event
  counters to determine cache hit ratio.
- `LLC-load-misses`: Last level cache load misses. After the last level, this
  accesses main memory, and so this is a measure of main memory load. The
  difference between this and `L1-dcache-load-misses` gives an idea of the
  effectiveness of the CPU caches beyond Level 1, but other counters are needed
  for completeness.
- `dTLB-load-misses`: Data translation lookaside buffer misses. This shows the
  effectiveness of the MMU to cache page mappings for the workload, and can
  measure the size of the memory workload (working set).
