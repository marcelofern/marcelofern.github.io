January 08, 2023

## The problem

Yesterday I was trying to play with a Windows VM. For that to work, I needed to
pass a flag into the Linux kernel, as my 11th generation Intel processor had a
little glitch that needed patching.

I followed the Arch Linux wiki, and added the parameter to the grub
initialisation, and... Of course, grub stopped working.

Not only that, I couldn't get into my OS at all. So I had to go onto recovery
mode.

## Getting into recovery mode

The first step is to put your Linux .iso in a flash drive. Let's assume you've
done that already.

You'll boot your flash card system up, and the first thing you'll do is:

```sh
$ fdisk -l  # or lsblk
```

If you have a hard-drive like mine, you'll have a drive like **/dev/nvmeXnY**.
Usually under that drive you have 3 partitions. One for **/boot**, another for
**/home**, and a final one for **/** (root). But sometimes home and root
partitions live under the same partition, so beware.

You'll then need to mount that partition. In my case, I wanted to start with
my joint home and root partition like this:

```sh
$ mount /dev/nvme0n1p2 /mnt
```

## Unknown filesystem type "LVM2_member".

If you didn't see this error, go to the next section!

> unknown filesystem type "LVM2_member".

So I need to find what the name of the lv driver is mapped to:

```sh
$ lvdisplay
```

Now you have a name that looks something like **/dev/lvm/lvroot**. Let's mount
that.

```sh
mount /dev/lvm/lvroot /mnt
```

## Unknown filesystem type 'crypto_LUKS'

If you didn't see the below error, skip to the next section!

> unknown filesystem type 'crypto_LUKS'

Of course, my hard-drive is encrypted. So let's map the encrypted drive...

```sh
# If you had the error above (LVM2_member), it will be:
$ cryptsetup luksOpen /dev/lvm/lvroot mydata
# Otherwise it will be
$ cryptsetup luksOpen /dev/nvme0n1p2 mydata
```

It will ask you for a password.

## Mount your system

Now you can finally mount it:

```sh
# If you had the errors above it will be:
$ mount /dev/mapper/mydata /mnt

# Otherwise you can mount directly:
$ mount /dev/nvme0n1p2 /mnt
```

If you have a boot partition, mount that as well now:

```sh
$ mount /dev/nvme0n1p1 /mnt/boot
```

(Optional) You might need to mount some other necessary stuff such as:

```sh
 for i in /sys /proc /run /dev; do sudo mount --rbind "$i" "/mnt$i"; done
 ```

## Get into the system

Now you can get into the system and debug it:

```sh
$ arch-chroot /mnt
```

Good luck!

## Optional: Fixing Grub

I've broken grub for the first time today after 7 years of arch linux
(2024-07-14), once a `yay` upgrade crashed midway through.

```sh
# call
grub-mkconfig -o /boot/grub/grub.cfg
```

I wasn't able to go further than this given that recovering a luks
encrypted hard drive via grub isn't something standard.
