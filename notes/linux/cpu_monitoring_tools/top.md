# top

```
Created at: 2024-11-12
```

top(1): The top program provides a dynamic real-time view of a running system.
It can display system summary information as well as a list of processes or
threads currently being managed by the Linux kernel.  The types of system
summary information shown and the types, order and size of information
displayed for processes are all user configurable and that configuration can be
made persistent across restarts.

```sh
$ top
top - 18:55:46 up 22 min,  2 users,  load average: 1.20, 1.29, 1.00
Tasks: 244 total,   1 running, 243 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.4 us,  0.1 sy,  0.0 ni, 99.3 id,  0.0 wa,  0.1 hi,  0.1 si,  0.0 st
MiB Mem :   7134.8 total,   4292.8 free,   2186.2 used,   1261.8 buff/cache
MiB Swap:   3567.0 total,   3567.0 free,      0.0 used.   4948.6 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1250 x         20   0  746304 121280 104584 S   4.9   1.7   1:31.97 Xorg
   1282 x         20   0   13608   3628   3072 S   2.9   0.0   0:41.66 picom
   5034 x         20   0    9824   5376   3200 R   1.9   0.1   0:00.05 top
    979 root     -51   0       0      0      0 S   1.0   0.0   0:00.11 irq/136-iwlwifi
   1366 x         20   0  921100  22120  15232 S   1.0   0.3   0:07.21 polybar
   2223 x         20   0  990252  87424  55844 S   1.0   1.2   0:17.58 alacritty
      1 root      20   0   20912  12332   9336 S   0.0   0.2   0:00.98 systemd
```

By default the processes consuming the most CPU time will be at the top.

CPU usage is shown by the TIME and %CPU columns. TIME is the total CPU time
consumed by the process at a resolution of hundredths of a second. For example,
“1:36.53” means 1 minute and 36.53 seconds of on-CPU time in total. Some
versions of top(1) provide an optional “cumulative time” mode, which includes
the CPU time from child processes that have exited.

The %CPU column shows the total CPU utilization for the current screen update
interval. On Linux, this is not normalized by the CPU count, and so a
two-thread CPU-bound process will report 200%. top(1) calls this “Irix mode,”
after its behavior on IRIX. This can be switched to “Solaris mode” (by pressing
I to toggle the modes), which divides the CPU usage by the CPU count. In that
case, the two-thread process on a 16-CPU server would report CPU as 12.5%

Source (Gregg's Performance book).
