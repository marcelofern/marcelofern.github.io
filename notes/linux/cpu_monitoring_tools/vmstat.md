# vmstat

```
Created at: 2024-11-12
```

vmstat(8): Reports inofmration about processes, memory, pagin, block IO, traps,
disks and cpu activity.

The first report produced gives averages since the last reboot.  Additional
reports give information on a sampling period of length delay.  The process and
memory reports are instantaneous in either case.

Although this command is called "virtual memory statistics", it prints
system-wide CPU averages in the last columns, along with a count of runnable
threads in the first column (Gregg).

```
vmstat 1
procs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
 1  0      0 6025620  56216 721664    0    0   365    28  902    3  1  1 98  0  0  0
 0  0      0 6025620  56216 721700    0    0     0     0  662 2147  0  1 99  0  0  0
[...]
 ```

 The relevant columns for CPU monitoring are:

 - `r`: Run-queue length. The total number of runnable threads.
 - `us`: User-time percent.
 - `sy`: System-time percent (kernel).
 - `id`: Idle percent.
 - `wa`: Wait I/O percent, which measures CPU idle when threads are blocked on
   disk I/O.
- `st`: Stolen percent, which for virtualised envs shows CPU time spent
  servicing other tenants.

With the exception of `r`, all these values are systme-wide averages across all
CPUs.
