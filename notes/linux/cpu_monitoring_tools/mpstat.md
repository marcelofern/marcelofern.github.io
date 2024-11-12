# mpstat

```
Created at: 2024-11-12
```

mpstat(8): The mpstat command writes to standard output activities for each
available processor, processor 0 being the first one.  Global average
activities among all processors are also reported.

```
mpstat -P ALL 1

04:01:38 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
04:01:39 PM  all    0.51    0.00    0.25    0.00    0.00    0.00    0.00    0.00    0.00   99.24
04:01:39 PM    0    1.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00
04:01:39 PM    1    1.02    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00   98.98
04:01:39 PM    2    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:39 PM    3    1.03    0.00    1.03    0.00    0.00    0.00    0.00    0.00    0.00   97.94
04:01:39 PM    4    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:39 PM    5    1.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00
04:01:39 PM    6    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:39 PM    7    0.00    0.00    1.03    0.00    0.00    0.00    0.00    0.00    0.00   98.97

04:01:39 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
04:01:40 PM  all    0.00    0.00    0.38    0.00    0.13    0.00    0.00    0.00    0.00   99.49
04:01:40 PM    0    0.00    0.00    1.01    0.00    0.00    0.00    0.00    0.00    0.00   98.99
04:01:40 PM    1    0.00    0.00    0.98    0.00    0.98    0.00    0.00    0.00    0.00   98.04
04:01:40 PM    2    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:40 PM    3    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:40 PM    4    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:40 PM    5    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
04:01:40 PM    6    0.00    0.00    1.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00
04:01:40 PM    7    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
[...]
```

The `-P` flag is used to print the per-CPU report.

The most important coluns are usr, sys, and idle. If usr+sys are 100% on just
one CPU, it can due to a single-threaded intense process running.

- `%usr`: User-time, excluding %nice.
- `%nice`: User-time for processes with nice'd priority.
- `%sys`: System-time (kernel).
- `%iowait`: I/O wait.
- `%irq`: Hardware interrupt CPU usage.
- `%soft`: Software interrupt CPU usage.
- `%steal`: Time spent servicing other tenants.
- `%guest`: CPU Time spent in guest virtual machines.
- `%gnice`: Same as nice but for guest machines.
- `%idle`: Idle
