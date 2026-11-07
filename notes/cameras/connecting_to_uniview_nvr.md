# Connecting to Uniview NVR

```
Created at: 2024-14-12
```

## Install arp-scan

```sh
yay arp-scan
```

## Find the interface if ip addr

```sh
ip addr

# 1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
#     link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
#     inet 127.0.0.1/8 scope host lo
#        valid_lft forever preferred_lft forever
#     inet6 ::1/128 scope host noprefixroute
#        valid_lft forever preferred_lft forever
# 2: enp0s31f6: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
#     link/ether 98:fa:9b:5d:3b:fb brd ff:ff:ff:ff:ff:ff
# 4: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
#     link/ether d4:d2:52:38:50:2c brd ff:ff:ff:ff:ff:ff
#     inet 192.168.68.110/24 brd 192.168.68.255 scope global dynamic noprefixroute wlan0
#        valid_lft 6525sec preferred_lft 6525sec
#     inet6 fe80::282f:1538:8c5d:adc/64 scope link noprefixroute
#        valid_lft forever preferred_lft forever
```

## Run arp-scan

```sh
sudo arp-scan --interface=wlan0 --localnet
# 192.168.68.103  48:ea:63:9d:ed:59       Zhejiang Uniview Technologies Co., Ltd.
```

## Open your browser with that ip address

1. The browser version only works on Windows.
2. If it's the first time you're connecting, the user/pass will be the
   default. Google the name of your device and "default user"
