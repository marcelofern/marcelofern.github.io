# sar

```
Created at: 2024-11-12
```

sar(1): The sar command writes to standard output the contents of selected
cumulative activity counters in the operating system.

The `sar` command can be used to archive (and report) historical statistics.

```sh
$ sar -P ALL

Average:        CPU     %user     %nice   %system   %iowait    %steal     %idle
Average:        all      1.14      0.00      1.58      0.01      0.00     97.26
Average:          0      0.89      0.00      1.00      0.00      0.00     98.11
Average:          1      0.22      0.00      1.00      0.00      0.00     98.78
Average:          2      1.96      0.00      3.91      0.11      0.00     94.02
Average:          3      0.88      0.00      1.99      0.00      0.00     97.13
Average:          4      0.00      0.00      0.33      0.00      0.00     99.67
Average:          5      0.88      0.00      1.87      0.00      0.00     97.26
Average:          6      4.08      0.00      2.25      0.00      0.00     93.67
Average:          7      0.11      0.00      0.22      0.00      0.00     99.67
[...]
```

- `%user`: User-time, excluding %nice.
- `%nice`: User-time for processes with nice'd priority.
- `%system`: System-time (kernel).
- `%iowait`: I/O wait.
- `%steal`: Time spent servicing other tenants.
- `%idle`: Idle

The sum of the variables must equal 100%.
