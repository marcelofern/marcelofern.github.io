# /proc

```
Created at: 2024-10-21
```

The `/proc` folder is a file-system interface for kernel statistics.

Some monitoring tools like `top` extract the statistics from these files in
order to show an overview of what processes are consuming what.

```
$ ls /proc
1/    180/  2233/  3203/  44561/  534758/  568383/  603/    83/  key-users
100/  181/  2250/  3216/  44625/  54/      568575/  604/    830/ kmsg
```

Each folder above represents a process.

```
$ ls /proc/162
arch_status         cwd@               map_files/  oom_score_adj  stack
attr/               environ            maps        pagemap        stat
autogroup           exe@               mem         personality    statm
auxv                fd/                mountinfo   projid_map     status
cgroup              fdinfo/            mounts      root@          syscall
clear_refs          gid_map            mountstats  sched          task/
cmdline             io                 net/        schedstat      timens_offsets
comm                ksm_merging_pages  ns/         sessionid      timers
coredump_filter     ksm_stat           numa_maps   setgroups      timerslack_ns
cpu_resctrl_groups  limits             oom_adj     smaps          uid_map
cpuset              loginuid           oom_score   smaps_rollup   wchan
```

- cmdline - arguments used to start program.
- stat - process statistics (used by top).
- cwd - current working directory for the process.
- environ - environment variables inside the process (zero-delimited).
- fd/ - directory containing open file descriptors for the process.
- exe - symbolic link to process executable.
- maps - memory mapping of the process.
- mem - virtual memory of the process.

The list of files available will depend on the kernel version and CONFIG
options.

The `/proc` folder also provides general statistics about the kernel.
For example:

- /proc/cpuinfo - informations about CPU
- /proc/meminfo - information about the physical memory
- /proc/vmstat - information about the virtual memory
- ...

These can be found with: `cd /proc; ls -Fd [a-z]*`

```
$ cd /proc; ls -Fd [a-z]*
acpi/       dma             keys         mtrr          sysrq-trigger
asound/     driver/         key-users    net@          sysvipc/
bootconfig  dynamic_debug/  kmsg         pagetypeinfo  thread-self@
buddyinfo   execdomains     kpagecgroup  partitions    timer_list
bus/        fb              kpagecount   pressure/     tty/
cgroups     filesystems     kpageflags   schedstat     uptime
cmdline     fs/             loadavg      scsi/         version
config.gz   interrupts      locks        self@         vmallocinfo
consoles    iomem           meminfo      slabinfo      vmstat
cpuinfo     ioports         misc         softirqs      zoneinfo
crypto      irq/            modules      stat
devices     kallsyms        mounts@      swaps
diskstats   kcore           mtd          sys/
```

You can also write to certain `/proc` files to change kernel variables.

## References

- proc(5) man page.
- [linux official docs on /proc](https://docs.kernel.org/filesystems/proc.html)
