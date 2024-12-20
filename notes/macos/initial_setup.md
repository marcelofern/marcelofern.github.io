# Initial Setup

```
Created at: 2024-11-05
```

Problems:
- Brew doesn't automatically add applications to the PATH. It needs to be
  manually added. This is because MacOs "protects" many useful folders like
  `/bin`, `/usr/bin`, and `/usr/local/bin`.
- This protections are silly, and mostly get in your way as a dev. For example,
  I can't create a file in `/usr/local/bin`. If I want to run programs from the
  terminal I need to keep modifying PATH.
- Apple keeps an old version of `bash` and does not update it any more due to
  changes in licensing. I have to install the new one via brew and symlink it
  so that I can use it as default (minor, but it took me too long till I found
  this out).
- Executables and apps are slow the first time they run. You can make them open
  much much faster by disabling SIP (which I can't for work). When the app is
  first loaded it is scanned by the syspolicyd process. This is part of Apple's
  Anti-Malware protection. It caches what's been checked, so the second run
  goes faster.
- Macos has also a very old version of openssl, which is incompatible with
  newer versions of other libraries (like Python), further enhancing the
  problem of having a brew dependency mismatching a system dependency.

## Swap Command key for Ctrl key (maybe, I'm not doing it now.)
Go to:

- System settings
- Keyboard
- Keyboard Shortcuts
- Modifier Keys

And swap ctrl for cmd.

## Get rid of the annoying Dock

On the terminal:

```sh
defaults write com.apple.dock autohide -bool true && killall Dock
defaults write com.apple.dock autohide-delay -float 1000 && killall Dock
defaults write com.apple.dock no-bouncing -bool TRUE && killall Dock
```

## Install Alacritty

1. Go to the website and install it.
2. Go to the terminal app, press "cmd + ," to open settings.
3. Change "shells open with" to use /bin/bash.

## Install brew

Go to the website and install it.

## Install dev tools

```sh
brew install \
    neovim \
    git \
    tree \
    font-liberation-nerd-font \
    fd \
    rg \
    ripgrep \
    firefox \
    terminal-notifier \
    fzf \
    python \
    bear \
    ctags

brew install --cask nikitabobko/tap/aerospace
brew install --cask betterdisplay
```

Notes:
 1. Allow terminal-notifier to send notifications (type notifications in the
 system settings page). Also set the config to not group!

## Install My dotfiles

```sh
~/workspace/scripts/dotfiles.sh install
```

Note: Change the `open_github_file.lua` plugin to include the prefix to
exclude.

## Change default shell to bash

MacOs comes with zsh by default, which isn't a great shell.
The bash version it comes with is outdated, so we download a new one with
brew

```sh
brew install bash
chsh -s /opt/homebrew/bin/bash

# Symlink .bashrc to .bash_profile
ln -s ~/.bashrc ~/.bash_profile

# Just reboot and you'll get the new shell
sudo reboot now
```

Also change from zsh to bash in:

- System Settings
- Users & Groups
- Right click your user
- Advanced Options

## Install Plug (neovim package manager)

Just follow the website instructions.

## Basic nice things

Go to Settings - Keyboard and configure:

```sh
# Increase key-repeat
defaults write -g KeyRepeat -int 2
defaults write -g InitialKeyRepeat -int 15

# Remove font smoothing
defaults -currentHost write -g AppleFontSmoothing -int 0

# Disable the sound effects on boot
sudo nvram SystemAudioVolume=" "

# Disable automatic termination of inactive apps
defaults write NSGlobalDomain NSDisableAutomaticTermination -bool true

sudo reboot now
```

## Download HomeRow

Change the shortcuts for:

- cmd+shift+o (find link)
- cmd+shift+j (start scrolling)

## Adjust monitor (if needed)

On better display, follow this guide:

https://github.com/waydabber/BetterDisplay/wiki/Fully-scalable-HiDPI-desktop

I have to set my home monitor to ~70% resolution.

## Vimum

Add this mapper rule:

```
map q removeTab
```

## Set up shortucts for firefox

Sadly because I have to use `cmd` instead of `ctrl`, I have to change Firefox's
shortcuts.

System Settings -> Keyboard -> Shortcuts -> App shortcuts

Add an entry for Firefox with these settings:

Reload This Page -> ctrl+r
New Tab -> ctrl+t
Close Tab -> ctrl+w
Reopen Closed tab -> ctrl+shiftT

Optional (I'm not using this currently):
Get an app (free and OS) Called CheatSheet, and with that you can see all the
shortcuts used by the app, and if you make a rule in the
Settings->Keyboard->Shortcuts using the exact text given in CheatSheet it will
change it to what you select..
