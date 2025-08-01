# Windows 7

Microsoft does not provide Windows 7 any more.
Try to find a pre-activated version instead.

## VirtualBox Installation Options

Make sure to enable **Guest Additions** so that you can share folders.

Once the virtual machine is up, go to:

- Devices -> "Insert Guest Additions CD Image"

Then go to "my computer" and
- double click on the CD icons.
- also run the floppy disk.

## Screen Adjusment

Use "Auto-resize guest display".

## Adding A Shared Folder

Create a folder in your **host** that will be the shared folder. Like
`mkdir ~/Documents/vm_shared`. Move the .exe there.

Now in Virtualbox, in the Windows window, go to:

-> Devices -> Shared Folders

Add that folder, make it auto-mount and permanent.

> In a Windows guest, shared folders are browseable and therefore visible in
> Windows Explorer. So, to attach the host's shared folder to your Windows
> guest, open Windows Explorer and look for it under "My Networking Places" ->
> "Entire Network" -> "VirtualBox Shared Folders". By right-clicking on a
> shared folder and selecting "Map network drive" from the menu that pops up,
> you can assign a drive letter to that shared folder.

But in windows 7, it will instead be at "My Computer".
You may need to reset the VM.
