# Linux Performance Analysis in 60 Seconds

This is a snippet from Brendan Gregg's Systems Performance (Enterprise and the
Cloud) book.

These are commands aimed to help in the first 60 seconds of an
performance-related incident.

## uptime

```
$ uptime
 19:13:24 up  9:41,  2 users,  load average: 0.67, 1.52, 1.82
```

This command not only tells you how long the system has been running for, it
also tells you how many users are logged on, and the system load averages for
the past 1, 5, and 15 minutes.

From this information you can tell if the load in the system has increased over
time.

From the man page:

> System load averages is the average number of processes that are either in a
> runnable or uninterruptible state.  A process in a runnable state is either
> using the CPU or waiting to use the CPU.  A process in uninterruptible state
> is waiting for some I/O access, eg waiting for disk.  The averages are taken
> over the three time intervals.  Load averages are not normalized for the
> number of CPUs in a system, so a load average of 1 means a single CPU system
> is loaded all the time while on a 4 CPU system it means it was idle 75% of
> the time.

## dmesg -T | tail

This command shows kernel errors (including OOM events).
The `-T` flag means "print time stamps in human-readable format.

```
$ dmesg -T | tail
[Mon Oct 14 11:16:53 2024] firefox[112390]: segfault at 0 ip 00005894f819b3b5 sp 00007fff95682d90 error 6 in firefox[5894f817c000+c1000] likely on CPU 7 (core 3, socket 0)
[Mon Oct 14 11:40:50 2024] perf: interrupt took too long (2508 > 2500), lowering kernel.perf_event_max_sample_rate to 79500
[Mon Oct 14 16:53:09 2024] usb 3-6.3: New USB device strings: Mfr=1, Product=2, SerialNumber=0
```

## vmstat -SM 1

System-wide statistics (even though it is named after virtual memory)

```
$ vmstat -SM 1
procs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
 3  0     27   4238    432   5893    0    0   201   517 2772   12  7  2 91  0  0  0
```

`-SM` means to print memory in mebibytes.
`1` is the delay in which to keep probing the system.

Here is what each field means:

```
Procs
    r: The number of runnable processes (running or waiting for run time).
    b: The number of processes blocked waiting for I/O to complete.

Memory
    These are affected by the --unit option.
    swpd: the amount of swap memory used.
    free: the amount of idle memory.
    buff: the amount of memory used as buffers.
    cache: the amount of memory used as cache.
    inact: the amount of inactive memory.  (-a option)
    active: the amount of active memory.  (-a option)

Swap
    These are affected by the --unit option.
    si: Amount of memory swapped in from disk (/s).
    so: Amount of memory swapped to disk (/s).

IO
    bi: Kibibyte received from a block device (KiB/s).
    bo: Kibibyte sent to a block device (KiB/s).

System
    in: The number of interrupts per second, including the clock.
    cs: The number of context switches per second.

CPU
    These are percentages of total CPU time.
    us: Time spent running non-kernel code.  (user time, including nice time)
    sy: Time spent running kernel code.  (system time)
    id: Time spent idle.  Prior to Linux 2.5.41, this includes IO-wait time.
    wa: Time spent waiting for IO.  Prior to Linux 2.5.41, included in idle.
    st: Time stolen from a virtual machine.  Prior to Linux 2.6.11, unknown.
    gu: Time spent running KVM guest code (guest time, including guest nice).
```


## mpstat -P ALL 1

Shows per-cpu balance. A single busy CPU can indicate poor thread scalling

```
$ mpstat -P ALL 1
Linux 6.6.52-1-lts (archlinux)  10/14/2024      _x86_64_        (8 CPU)

07:35:57 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
07:35:58 PM  all    0.38    0.00    0.50    0.13    0.25    0.25    0.00    0.00    0.00   98.50
07:35:58 PM    0    1.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00
07:35:58 PM    1    0.00    0.00    1.98    0.00    0.99    0.99    0.00    0.00    0.00   96.04
07:35:58 PM    2    0.00    0.00    0.00    0.00    1.00    0.00    0.00    0.00    0.00   99.00
07:35:58 PM    3    1.00    0.00    1.00    0.00    0.00    0.00    0.00    0.00    0.00   98.00
07:35:58 PM    4    0.00    0.00    1.01    1.01    0.00    0.00    0.00    0.00    0.00   97.98
07:35:58 PM    5    0.00    0.00    0.00    0.00    0.00    1.00    0.00    0.00    0.00   99.00
07:35:58 PM    6    1.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00
07:35:58 PM    7    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
```

`-P ALL` means show statistics for all processors.
`1` means to re-query every 1 second.mp

## pidstat 1

Per-process CPU usage. Used to identify unexpected CPU consumers, and
user/system CPU time for each process.

```
Linux 6.6.52-1-lts (archlinux)  10/14/2024      _x86_64_        (8 CPU)

07:38:39 PM   UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
07:38:40 PM     0       679    0.99    0.99    0.00    0.00    1.98     1  falcon-sensor-b
07:38:40 PM     0       995    0.99    0.00    0.00    0.00    0.99     1  osqueryd
07:38:40 PM  1000      2455    1.98    0.00    0.00    0.00    1.98     0  Xorg
07:38:40 PM  1000    212098    0.99    0.99    0.00    0.00    1.98     6  pidstat
```

## iostat -sxz 1

Displays disk I/O stats. IOPS (IO operations per second) and throughput,
average wait time, % busy.

```
$ iostat -sxz 1
Linux 6.6.52-1-lts (archlinux)  10/14/2024      _x86_64_        (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           6.75    0.00    1.98    0.17    0.00   91.10

Device             tps      kB/s    rqm/s   await  areq-sz  aqu-sz  %util
dm-0              0.27      1.96     0.00    0.07     7.20    0.00   0.00
dm-1              0.05      1.27     0.00    0.22    26.59    0.00   0.00
dm-2             52.30    696.23     0.00    1.27    13.31    0.07   0.45
dm-3             52.29    696.20     0.00    3.43    13.31    0.18   0.49
dm-4              0.04      1.13     0.00    0.31    30.40    0.00   0.00
dm-5              0.26      1.81     0.00    0.09     6.92    0.00   0.00
nvme0n1          31.54    701.71    21.16    0.68    22.25    0.02   0.43
```


- `-s` Displays a short (narrow) version of the report that should fit in 80
  characters wide screens.
- `-x` Displays extended statistics.
- `-z` Tells iostat to omit output for any devices for which there was no
  activity during the sample period. You can omit this for a more static view.

## free -m

Memory usage including the file system cache.

```
$ free -m
free: Multiple unit options don't make sense.
$ free
               total        used        free      shared  buff/cache   available
Mem:           15717        6331        4121         738        6341        9385
Swap:            511          27         484
Total:         16229        6358        4606
```

## sar -n DEV 1

Network device I/O: packets and throughput.

```
$ sar -n DEV 1
Linux 6.6.52-1-lts (archlinux)  10/14/2024      _x86_64_        (8 CPU)

07:49:29 PM     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
07:49:30 PM        lo      3.00      3.00      0.37      0.37      0.00      0.00      0.00      0.00
07:49:30 PM enp0s31f6      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM    wlp9s0      2.00      0.00      0.23      0.00      0.00      0.00      0.00      0.00
07:49:30 PM br-a439ca0c3456      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM br-e87f15dcaf19      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM br-27f5b3424143      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM   docker0      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM veth3ff7a22      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM vethad7636c      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM vethf69bdb3      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM veth950bf0a      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
07:49:30 PM enp0s13f0u3u1      0.00      2.00      0.00      0.22      0.00      0.00      0.00      0.00
07:49:30 PM   zcctun0      1.00      1.00      0.04      0.05      0.00      0.00      0.00      0.00
```

## sar -n TCP,ETCP 1

TCP statistics: connection rates, retransmits.

```
[tmp] sar -n TCP,ETCP 1
Linux 6.6.52-1-lts (archlinux)  10/14/2024      _x86_64_        (8 CPU)

07:50:31 PM  active/s passive/s    iseg/s    oseg/s
07:50:32 PM      1.00      0.00     25.00     31.00

07:50:31 PM  atmptf/s  estres/s retrseg/s isegerr/s   orsts/s
07:50:32 PM      0.00      0.00      0.00      0.00      0.00

07:50:32 PM  active/s passive/s    iseg/s    oseg/s
07:50:33 PM      2.00      0.00     73.00     81.00

07:50:32 PM  atmptf/s  estres/s retrseg/s isegerr/s   orsts/s
07:50:33 PM      0.00      0.00      0.00      0.00      0.00

07:50:33 PM  active/s passive/s    iseg/s    oseg/s
07:50:34 PM      1.00      0.00    588.00    329.00

07:50:33 PM  atmptf/s  estres/s retrseg/s isegerr/s   orsts/s
07:50:34 PM      0.00      0.00      0.00      0.00      0.00

07:50:34 PM  active/s passive/s    iseg/s    oseg/s
07:50:35 PM      2.00      0.00   1057.00    467.00
```

## top

You already know it ;-)
System overview.
