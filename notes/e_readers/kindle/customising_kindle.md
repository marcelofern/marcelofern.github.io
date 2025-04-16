# Customising Kindle

```
Created at: 2025-04-10
```

## Kindle paperwhite 11th generation

Note: Most of this information is available in `https://kindlemodding.org/`.

1. The nickname for the kindle is `PW5`.
2. The recommended jailbreak is `WinterBreak < 5.18.1`.
3. The Kindle must have been connected to wifi and have a saved wifi.
4. Download the WinterBreak patch.
5. Extract it: `tar xf WinterBreak.tar.gz`.
6. Note that there are hidden files (.github).
7. Turn airplane mode on.
8. Reboot the Kindle (hold the power button for a while and choose Restart).
9. Connect the Kindle to your PC.
10. Run the following script to mount the Kindle and copy the relevant files.
   ```sh
   WINTER_BREAK_FOLDER=~/Downloads
   DEVICE=/dev/sda
   sudo mkdir /mnt/kindle
   sudo mount $DEVICE /mnt/kindle

   cd $WINTER_BREAK_FOLDER
   sudo cp -r .active_content_sandbox /mnt/kindle
   sudo cp -r apps /mnt/kindle
   sudo cp jb.sh /mnt/kindle
   sudo cp -r mesquito /mnt/kindle
   sudo cp patchedUks.sqsh /mnt/kindle
   ```
11. Eject the kindle from the PC, and then umount it:
   ```sh
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```
12. Open the Kindle Store (cart icon in the home screen).
13. When prompted to turn off airplane mode, tap yes.
14. Click on the WinterBreak icon when it loads.
15. Wait for the jailbreak to finish (it is very fast).
16. Turn airplane mode on again.
17. Download the hotfix `.bin` in the website.
18. Plug the kindle onto the PC.
19. Move the hotfix to the Kindle root directory.
    ```sh
    HOTFIX_FOLDER=~/Downloads
    DEVICE=/dev/sda
    sudo mkdir /mnt/kindle
    sudo mount $DEVICE /mnt/kindle

    cd $HOTFIX_FOLDER
    sudo cp Update_hotfix_universal.bin /mnt/kindle
    ```
20. Eject the kindle from the PC, and then umount it:
   ```sh
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```
21. Tap the three dots, and go to settings.
22. Tap the three dots again and select "Update Your Kindle".
23. Tap "Update".
24. Once the hotfix is installed, you have to run it.
25. Select the hotfix from the home library (Run Hotfix or Run Bridge). NOTE:
    You will need to run the hotfix booklet after every OTA update.
26. You will need to install KUAL (Kindle Unified Application Launcher) and
    MRPI (MobileRead Package Installer) to run homebrew on your Kindle.
27. Download MRPI from the website.
28. `tar xf kual-mrinstaller-khf.tar.xz`
29. Download Kual (Coplate)
30. Connect your kindle to your pc and copy the relevant files to your kindle
    ```sh
    FILES_FOLDER=~/Downloads
    DEVICE=/dev/sda
    sudo mkdir /mnt/kindle
    sudo mount $DEVICE /mnt/kindle

    cd $FILES_FOLDER
    sudo cp -r extensions /mnt/kindle
    sudo cp -r mrpackages /mnt/kindle
    sudo cp -r Update_KUALBooklet_ALLDEVICES_KS2_install.bin /mnt/kindle/mrpackages
    ```
31. Eject the kindle from the PC, and then umount it:
   ```sh
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```
32. On the Kindle search bar, type: `;log mrpi` and hit enter.
33. It didn't work, so download KUAL again, but put it in the root directory
    ```sh
    FILES_FOLDER=~/Downloads
    DEVICE=/dev/sda
    sudo mkdir /mnt/kindle
    sudo mount $DEVICE /mnt/kindle

    cd $FILES_FOLDER
    sudo cp -r Update_KUALBooklet_ALLDEVICES_KS2_install.bin /mnt/kindle/
    ```
34. Eject the kindle from the PC, and then umount it:
   ```sh
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```
35. Go to settings -> update kindle. Wait a bit
36. Now tap the KUAL file, you can see your extensions there.
37. Disable OTA updates so that once you enable wifi amazon doesn't try to
    remove the jailbreak. Follow on next steps.
38. Find the firmware version: Home → Menu → Settings → Menu → Device Info
39. In my case: Kindle 5.17.1.0.3 (4351900007) - 70971
40. Download the `renameotabin` extension.
41. Plug kindle to the PC and Copy the renameotabin folder from the zip to the
    `extensions/` folder on your Kindle.
    ```sh
    FILES_FOLDER=~/Downloads
    DEVICE=/dev/sda
    sudo mkdir /mnt/kindle
    sudo mount $DEVICE /mnt/kindle

    cd $FILES_FOLDER
    sudo cp -r renameotabin /mnt/kindle/extensions
    ```
42. Eject the kindle from the PC, and then umount it:
   ```sh
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```
43. Open the KUAL application launcher
44. Tap "Rename OTA binaries"
45. Select "Rename" and wait for the Kindle to reboot.
46. You can now safely turn off Airplane Mode and re-enable WiFi. Your Kindle
    will connect to the internet but will not download or install OTA updates.
47. Download KOReader (https://github.com/koreader/koreader/releases) for my
    firmware that meant the `kindlehf` version.
48. Plug kindle to the PC and Copy the `extensions` and `koreader` to the root
    ```sh
    FILES_FOLDER=~/Downloads
    DEVICE=/dev/sda
    sudo mkdir /mnt/kindle
    sudo mount $DEVICE /mnt/kindle

    cd $FILES_FOLDER
    sudo cp -r extensions/koreader /mnt/kindle/extensions
    sudo cp -r koreader /mnt/kindle/
    ```
49. Eject the kindle from the PC, and then umount it:
   ```sh
   sudo umount /mnt/kindle
   sudo rm -rf /mnt/kindle
   ```
   Notes:
   - Start KOReader: The designed way to start KOReader
   - Start KOReader (no framework): Temporarily "kills" the Kindle UI to
     allocate more resources to KOReader.
   - Start KOReader (ASAP): Skips a couple of checks and starts KOReader as
     soon as possible 

## Resetting

If you want to factory reset, downgrade or update your Kindle, you will need to
restore the binary by opening KUAL, selecting Rename OTA Binaries and then
selecting Restore instead of rename.
