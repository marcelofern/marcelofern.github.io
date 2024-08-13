2024-07-14

# Loading an USB stick

```sh
# make a mounting directory
sudo mkdir /mnt/usb

# find the name of the driver
sudo fdisk -l

# mount the disk [in this case /dev/sda]
sudo mount /dev/sda /mnt/usb

# access the files via
cd /mnt/usb

# then umount the disk
sudo umount /mnt/usb

# and remove the file
sudo rm -rf /mnt/usb
```
