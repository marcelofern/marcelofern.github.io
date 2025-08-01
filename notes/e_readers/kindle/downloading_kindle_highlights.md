# Downloading Kindle Highlights In Linux

```
Created at: 2024-09-04
```

## Summary

```sh
DEVICE=/dev/sda
sudo rm -rf /mnt/kindle
sudo mkdir /mnt/kindle
sudo mount $DEVICE /mnt/kindle
cd /mnt/kindle/documents
cp 'My Clippings.txt' ~/Downloads/my_clippings.txt
cd ~
sudo umount /mnt/kindle
sudo rm -rf /mnt/kindle
```

## Step by step

1. After pluging Kindle via USB, verify the name of the disk partition:
   ```sh
   sudo fdisk -l
   ```
2. Hold onto that name. It should be something like /dev/sda. Use the name to
   mount it as a regular usb driver.
   ```sh
   sudo mkdir /mnt/kindle
   sudo mount /dev/sda /mnt/kindle
   ```
3. Your highlights should be in the documents folder. The name of the file that
   contains your highlights is called "My Clippings.txt". Copy it to your
   Downloads folder.
   ```sh
   cd /mnt/kindle/documents
   cp 'My Clippings.txt' ~/Downloads/my_clippings.txt
   ```
4. Unmount the disk and remove the mounted folder.
   ```sh
   # Make sure you aren't in the mounted folder first.
   cd ~
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```

