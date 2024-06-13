2024-05-29

# Arch Linux Installation

## Uploading a .iso to a USB drive

Identify the usb drive with the `lsblk` command:

```sh
lsblk
```

Ensure the USB drive is unmounted and using vfat:

```sh
sudo umount /dev/sdX1
sudo mkfs.vfat -F 32 /dev/sdX
```

You can use the archlinux tutorial from here, or keep following the
instructions below (up to you).
[Arch wiki](http://web.archive.org/web/20240516115931/https://wiki.archlinux.org/title/USB_flash_installation_medium)

Find the name of the USB drive:

```sh
ls -l /dev/disk/by-id/usb-*
```

NOTE: Do not pick any of the names with `part-X` as suffix. Select only the
"main" one that is not a partition.

```sh
sudo dd if=path/to/your.iso of=/dev/sdX1 bs=4M status=progress
sudo dd bs=4M if=path/to/archlinux-version-x86_64.iso of=/dev/disk/by-id/usb-My_flash_drive conv=fsync oflag=direct status=progress

# Notes:
# if = The input file.
# of = The output file.
# bs = sets the block size to 4 megabytes.
# status = shows the operation progress.
```

Run `sync` to ensure all data is written to the USB drive.

```sh
sync
```

## Booting from USB drive

In a thinkpad, you can press F12 during device startup to go to the boot menu.
You can also try pressing `Esc` if your boot mode is set to "quick" in the
BIOS.

If your computer is running windows you can also:

1. Go to the `Settings` app, and search for `Windows Update`.
2. Click on `Advanced Options`.
3. Click on `Recovery`.
4. Click on `Advanced startup` and then `Restart now`.
5. The options menu will pop up, click on `Troubleshoot`.
6. Select `Advanced options`.
7. Select `UEFI Firmware Settings` and click `Restart`.
8. Press the necessary key to enter the BIOS (enter) followed by the option in
   the menu.

## Installing the OS

You'll need internet connection. If using wifi, run:

```sh
iwctl

# list device names
[iwd] device list
# turn on (if not on already)
[iwd] device name set-property Powered on
[iwd] adapter adapter set-property Powered on
# scan networks (this won't output anything)
[iwd] station name scan
# see available networks
[iwd] station name get-networks
# connect to a network
[iwd] station name connect SSID
```

Finally run `archinstall`.

```sh
archinstall
```

Notes:
0. Remove your USB disk to not interfere with lsbk during install.
1. Use `us` keyboard layout and locale to avoid dmenu errors.
2. Use ext4 filesystem for stability.
3. Do not create a separate partition for `/home`.
4. Make sure to copy wifi config to installation.
5. Repeat a few times if the installation failed (yeah...)
