# Virtualbox Installation

```
Created at: 2025-05-18
```
Before starting the installation, make sure that your BIOS is set up to allow
for virtualisation.

You just have to go to the BIOS panel, security, and tick all the
virtualisation features.

## Download the host package

Find wheter you are using the LTS linux kernel or not:
```sh
uname -r
# 6.12.27-1-lts
```

Install the first package above if you are using `lts`, else the second one.

- virtualbox-host-modules-lts
- virtualbox-host-modules-arch

## Check if CONFIG_MODULE_SIG_FORCE is set

```sh
zgrep CONFIG_MODULE_SIG_FORCE /proc/config.gz
```

If it is, follow the instructions in:
[here](https://wiki.archlinux.org/title/VirtualBox).

Else, skip it (I have skipped in my installation as I don't set that variable).

## Guest Additions

> It is also recommended to install the virtualbox-guest-iso package on the
> host running VirtualBox. This package will act as a disc image that can be
> used to install the guest additions onto guest systems other than Arch Linux.
> The .iso file will be located at
> /usr/lib/virtualbox/additions/VBoxGuestAdditions.iso, and may have to be
> mounted manually inside the virtual machine. Once mounted, you can run the
> guest additions installer inside the guest.

```sh
yay virtualbox-guest-iso
```

## Get the extension pack

(only free for personal use)
```sh
yay virtualbox-ext-oracle
```

## Front ends

VirtualBox comes with four front-ends:

- If you want to use VirtualBox with the regular GUI, use `VirtualBox`.
- If you want to launch and manage your virtual machines from the command-line,
  use the `VBoxSDL` command, which only provides a plain window for the virtual
  machine without any overlays.
- If you want to use VirtualBox without running any GUI (e.g. on a server), use
  the `VBoxHeadless` command. With the VRDP extension you can still remotely
  access the displays of your virtual machines.
- If you want to remotely manage virtual machines, the VirtualBox web service
  (vboxwebsrv) provides the server side backend. It can be used with RemoteBox
  (GUI) or phpVirtualBox (WebUI).
