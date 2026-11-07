2024-05-31

# Disabling Suspended Mode

I usually swap between both my work laptop and my personal laptop using an USB
hub. That means that both computers remain with their lids closed at all times.

The problem is that when I disconnect my USB hub to plug it into the other
laptop, the now-disconnected laptop goes on sleep mode. This means that when I
come again to reconnect it, I have to manually open the lid so that the usb hub
gets recognised.

## Disabling Suspend

```bash
# Create a new folder
sudo mkdir /etc/systemd/sleep.conf.d/
# And the new file
sudo touch /etc/systemd/sleep.conf.d/disable-sleep.conf
```

Update that file to include the contents of:

```conf
[Sleep]
AllowSuspend=no
AllowHibernation=no
AllowHybridSleep=no
AllowSuspendThenHibernate=no
```

```sh
# Reload the systemd daemon
sudo systemctl daemon-reload
```
