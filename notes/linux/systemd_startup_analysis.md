# Systemd Startup Analysis

```
Created at: 2024-10-20
```

In general there are many options to analyse systemd startup time.
It is useful to read the man page of the system-analyze command itself:

```sh
man systemd-analyze
```

## Analysing startup time:

```
[~] systemd-analyze
Startup finished in 8.986s (firmware) + 5.000s (loader) + 1min 39.128s (kernel) + 10.669s (userspace) = 2min 3.785s
graphical.target reached after 10.669s in userspace.
```

## Critical-chain

```
[~] systemd-analyze critical-chain
The time when unit became active or started is printed after the "@" character.
The time the unit took to start is printed after the "+" character.

graphical.target @10.669s
└─multi-user.target @10.669s
  └─docker.service @8.888s +1.780s
    └─network-online.target @8.886s
      └─NetworkManager-wait-online.service @3.461s +5.423s
        └─NetworkManager.service @2.415s +1.044s
          └─basic.target @2.414s
            └─dbus-broker.service @2.386s +26ms
              └─dbus.socket @2.355s
                └─sysinit.target @2.353s
                  └─systemd-resolved.service @2.279s +74ms
                    └─run-credentials-systemd\x2dresolved.service.mount @2.742s
```
