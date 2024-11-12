# uptime

```
Created at: 2024-11-12
```

```
$ uptime
 15:37:23 up 12 min,  2 users,  load average: 1.02, 1.01, 0.67
```

uptime(1): Tell how long the system has been running.

This is a simple tool that returns a one-liner with the following information:

- The current time.
- How long the system has been running for.
- The number of users currently logged on.
- **The system load averages for the past 1, 5, and 15 minutes**.

The explanation for load averages is as follows:

> System load averages is the average number of processes that are either in a
> runnable or uninterruptable state.  A process in a runnable state is either
> using the CPU or waiting to use the CPU.  A process in uninterruptable state
> is waiting for some I/O access, eg waiting for disk.  The averages are taken
> over the three time intervals.  Load averages are not normalized for the
> number of CPUs in a system, so a load average of 1 means a single CPU system
> is loaded all the time while on a 4 CPU system it means it was idle 75% of
> the time.

Analogously, if the load average is 10 for a system with 2 CPUs, it means that
2 processes are running while 8 are waiting (on average).

Analogy from the Performance book (Gregg):

> Imagine a car toll plaza: you could measure the load at various points during
> the day by counting how many cars were being serviced (utilisation) plus how
> many cars were queued (saturation).

## What can uptime be used for

If the load is increasing over time, it is an indication that a problem
affecting CPU performance is scaling.

If it is decreasing, it might mean that you missed the performance bottleneck
event!
