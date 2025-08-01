# Windows XP

```
Created at: 2025-05-18
```

Microsoft does not offer Windows XP any more. You might have to find other ways
of getting it. Through a physical CD or a web link (somewhere).

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

Now in Virtualbox, in the windows XP window, go to:

-> Devices -> Shared Folders

Add that folder, make it auto-mount and permanent.

> In a Windows guest, shared folders are browseable and therefore visible in
> Windows Explorer. So, to attach the host's shared folder to your Windows
> guest, open Windows Explorer and look for it under "My Networking Places" ->
> "Entire Network" -> "VirtualBox Shared Folders". By right-clicking on a
> shared folder and selecting "Map network drive" from the menu that pops up,
> you can assign a drive letter to that shared folder.

But in windows XP, it will instead be at "My Computer".
You may need to reset the VM.

## Internet (in progress)

The default internet explorer is Microsfot Explorer, which isn't supported by
a lot of websites. Latest Chrome and Firefox don't support windows XP.

Download Firefox in the **host** machine by finding the
latest version in the ftp server, for example:

- https://ftp.mozilla.org/pub/firefox/releases/138.0/win32/en-US/

## Display

Drag the window to make it bigger, the VM will auto adjust. Else:
Change the dimensions from inside Windows, in the control panel.

## Tips

- When installing the virtual box, do not select more than 3GB memory as it
  won't work.
