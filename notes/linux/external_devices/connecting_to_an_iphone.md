# Connecting to an iphone

```
Created at: 2025-09-15
```

```sh
# Install the libimobiledevice, usbmuxd, and ifuse packages.
yay libimobiledevice
yay usbmuxd
yay ifuse

# Unplug and plug your iphone device. It should now ask you: Trust this device?
# You can verify the status of your service - it should be active.
systemctl status usbmuxd.service

# Create a mounting point:
mkdir /tmp/iphone

# Mount the iphone media system
ifuse /tmp/iphone

# You should now have a DCIM folder
cd /tmp/iphone/DCIM

# After you're done, unmount the filesystem:
fusermount -u /tmp/iphone
```

## Troubleshooting

```sh
# If you do not see the popup, you can start the pairing process manually.
# Connect the device, unlock the screen and run:
idevicepair pair

# You can verify the pairing has succeeded by running:
idevicepair validate
```
