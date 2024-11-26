# bpftrace

```
Created at: 2024-11-17
```

bpftrace(8):

bpftrace is a high-level tracing language and runtime for Linux based on eBPF.
It supports static and dynamic tracing for both the kernel and user-space.

## One liners

```sh
# Trace new processes with arguments:
bpftrace -e 'tracepoint:syscalls:sys_enter_execve { join(args->argv); }'

# Count syscalls by process:
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[pid, comm] = count(); }'

# Count syscalls by syscall probe name:
bpftrace -e 'tracepoint:syscalls:sys_enter_* { @[probe] = count(); }'

# Sample running process names at 99 Hertz:
bpftrace -e 'profile:hz:99 { @[comm] = count(); }'

# Sample user and kernel stacks at 49 Hertz, system wide, with the process
# name:
bpftrace -e 'profile:hz:49 { @[kstack, ustack, comm] = count(); }'

# Sample user-level stacks at 49 Hertz, for PID 189:
bpftrace -e 'profile:hz:49 /pid == 189/ { @[ustack] = count(); }'

# Sample user-level stacks 5 frames deep at 49 Hertz, for PID 5216:
bpftrace -e 'profile:hz:49 /pid == 5216/ { @[ustack(5)] = count(); }'

# Sample user-level stacks at 49 Hertz, for processes named “mysqld”:
bpftrace -e 'profile:hz:49 /comm == "mysqld"/ { @[ustack] = count(); }'
```
