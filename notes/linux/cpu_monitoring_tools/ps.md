# ps

```
Created at: 2024-11-12
```

ps(1): displays information about a selection of the active processes.  If you
want a repetitive update of the selection and the displayed information, use
top instead.

This command is often used with "aux" which shows every process in the system
using the BSD syntax

```sh
$ ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.1  0.1  20912 12332 ?        Ss   18:32   0:00 /sbin/init
root           2  0.0  0.0      0     0 ?        S    18:32   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        S    18:32   0:00 [pool_workqueue_release]
root           4  0.0  0.0      0     0 ?        I<   18:32   0:00 [kworker/R-rcu_g]
root           5  0.0  0.0      0     0 ?        I<   18:32   0:00 [kworker/R-rcu_p]
root           6  0.0  0.0      0     0 ?        I<   18:32   0:00 [kworker/R-slub_]
root           7  0.0  0.0      0     0 ?        I<   18:32   0:00 [kworker/R-netns]
```

Keep an eye on TIME and CPU. The TIME column shows the total time the process
has taken (usr + sys) since it started (hours:minutes:seconds)

On Linux, the %CPU column shows the average CPU utilization over the lifetime
of the process, summed across all CPUs. A single-threaded process that has
always been CPU-bound will report 100%. A two-thread CPU-bound process will
report 200%.

I also like to see the process tree, with the "axjf" flags

```sh
$ ps axjf
[...]
   1234    1249    1234    1188 tty1        1234 S+    1000   0:00          \_ xinit /home/x/.xinitrc -- /etc/X11/xinit/xserverrc :0 vt1 -keeptty -auth /tmp/serverauth.EsSj52Gm3D
   1249    1250    1250    1188 tty1        1234 Sl    1000   1:00              \_ /usr/lib/Xorg -nolisten tcp :0 vt1 -keeptty -auth /tmp/serverauth.EsSj52Gm3D
   1250    1254    1250    1188 tty1        1234 S        0   0:00              |   \_ xf86-video-intel-backlight-helper intel_backlight
   1249    1260    1260    1188 tty1        1234 S     1000   0:00              \_ i3 -a --restart /run/user/1000/i3/restart-state.1260
   1260    1272    1272    1272 ?             -1 Ssl   1000   0:00                  \_ alacritty -t scratchpad_terminal
   1272    1326    1326    1326 pts/0       1326 Ss+   1000   0:00                  |   \_ /usr/bin/bash
   1260    1359    1359    1359 ?             -1 Ssl   1000   0:00                  \_ alacritty -t scratchpad_terminal
   1359    1395    1395    1395 pts/1       1395 Ss+   1000   0:00                  |   \_ /usr/bin/bash
[...]
```

