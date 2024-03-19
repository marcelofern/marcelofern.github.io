July 04, 2023

## Electric/Digital Pianos

In the past week I have been thinking about buying a digital piano.
I've watched a lot of Youtube videos to find the perfect one. The problem is
that anything half decent costs about $1,500 NZD.

No way I'm going to pay that much.

This is when I remembered I have an Alesis MIDI keyboard and a couple of
Raspberry Pi's lying around. After some Googling, I've figured I could
transform a Raspeberry Pi into a sound module, connect it to my speaker, and
play it away.

The below is a step-by-step manual of how I managed to get this setup working.

## Raspberry Pi OS

We will use the `rpi-imager` package to build our OS image. You can find
official support for Ubuntu, Mac, or Windows. The package is also ported to
other OS by users (Arch linux, for example).

The app gives you a feel options to build your OS. Here is what you have to
input:

1. Make sure you select the `Raspberry Pi OS Lite` version. This version
does not include the desktop environment, which we don't need. We want as less
things running in our OS as possible since audio processing is really sensitive
to lags. The `Raspberry Pi OS Lite` comes in two flavours: 32-bit or 64-bit. We
will prefer the **64-bit** as it runs faster (at the expense of more memory
use). You have to check whether your Raspberry Pi device supports 64-bit first.
If not, it is still fine to go with a 32-bit OS. If you end up finding any
performance issues, come back to this instruction and try running a 64-bit Pi
instead (realistically, you should be fine with 32-bit).

2. Enable ssh. This option is behind the cog icon. We will use ssh as our main
interface to connect to our Raspberry Pi. Make sure to set a user and a
password. For this tutorial I will be using the user `admin`.

3. Configure wireless LAN. This option is also behind the cog icon.

4. Set the hostname to something sensible like
"`raspberrypisoundmodule.local`". This is particularly useful if you have
other Raspberries in your network and you don't want hostnames to mingle.

## SSH connection

To connect to your Raspberry Pi, invoke the ssh command with the argument
`<user>@<hostname>`. In my case this will be:

```sh
ssh admin@raspberrypisoundmodule.local
```

## Audio configuration

Make sure your Raspberry Pi is set to work with high quality analogue audio.
Edit your `/boot/config.txt` file to include the following line at the top:

```
audio_pwm_mode=2
```

Note that a modern Raspberry Pi will have this option enabled by default.

## User configuration

We will add the user `admin` to the `audio` group so that this user is allowed
to access and interact with audio-related resources. This user should already
be linked to this group, but we will do so anyway in case you are using a
version of Pi OS that doesn't do so.

```sh
sudo usermod -a -G audio admin
```

You should now see the link between the user and the group when you run:

```sh
getent group
```

## Setting audio resource limits

Now we are going to edit `/etc/security/limits.d/audio.conf`.
This file is used to set resource limits for processes related to audio. By
doing this, we will be able to control and allocate system resources for
audio applications like CPU usage, memory, and more.

We will add the following two lines to the top of the file:

```sh
@audio - rtprio 80
@audio - memlock unlimited
```

The first line will set the real-time priority (rtprio) for audio applications
to 80. This will help the OS to prioritise our audio. Values here range from
1 to 99 (the value of 100 is reserved for the highest priority processes like
the kernel itself and essential system components). We won't be setting max
priority here because it could impact the system's stability and
responsiveness, 80 should be plenty.

The second line sets the memory lock (memlock) limit for audio processes.
This memory lock will prevent specific memory regions from being swapped out
to disk, making sure the OS has fast access to critical data. In this case,
audio processes will be able to set `unlimited` amount of memory lock.

These two lines together will make sure we have sufficient resources (and
priority) for a smooth audio operation on our Pi.


## Identifying the sound card

To verify what sound card you will be using, type the following command:

```sh
aplay -l
```

Analyse the output, and find what the proper card id is. In my case, I will
use card 0.

```
**** List of PLAYBACK Hardware Devices ****
card 0: Headphones [bcm2835 Headphones], device 0: bcm2835 Headphones [bcm2835 Headphones]
  Subdevices: 8/8
...
```

## Update the alsa config file

Open the file `/usr/share/alsa/alsa.conf` and search for the following lines

```
defaults.ctl.card 0
defaults.pcm.card 0
```

Again, my card id is **0**. If you have a different card id, make sure change
the number 0 by whatever card id you have.

Once you have done that, run the `alsamixer` command to check if you can play
with the playback output volume.

## Testing that the speaker works

Once you've connected your speaker (or headphones), you can run the following
command to output whitenoise to your device:

```
speaker-test -c2
```

You can also test with a wav file, which should have been included in your OS
installation:

```
speaker-test -c2 --test=wav -w /usr/share/sounds/alsa/Front_Center.wav
```

If this doesn't work immediately, it might have been because you've changed
the default configurations in the previous steps. Try performing a
`sudo reboot` to restart the raspberry pi.

## Install FluidSynth

FluidSynth is going to be the application that will convert our MIDI into a
synthesiser.

```
sudo apt-get update && sudo apt-get install fluidsynth
```

## Download sound fonts [optional]
If you don't want to download fonts, you can use the default that comes with
fluidsynth which is a very basic piano located at:
`/usr/share/sounds/sf2/FluidR3_GM.sf2`

Otherwise, there are many free sound fonts in the internet. I will give no
guarantee that the link below will still be working when you read this article,
but you can download some fonts using this command.

```sh
curl -o fonts.sf2 https://musical-artifacts.com/artifacts/1390/alex_gm.sf2
sudo mv fonts.sf2 /usr/share/sounds/sf2
```

## Create the sound configuration file

In your home directory, create a folder `inst` and add a file named `keyboard`
with the following content:

```
echo "loading soundfont"

gain 3

load "/usr/share/sounds/sf2/FluidR3_GM.sf2"

select 0 1 0 0

echo "loaded"
```

Change the `load` command to point to the location of the file you have
downloaded.

## Script for configuring FluidSynth

Create a script called `synth.sh` in your home directory with this content:

```sh
#!/bin/bash

# Deactivate stuff for performance gains
sudo service ntp stop
sudo service triggerhappy stop
sudo service dbus stop

# Kill all instances of fluidsynth before starting it again.
killall fluidsynth


INSTRUMENT_FILE=~/inst/keyboard

# Find this by running `acconnect -o` and swapping the string variables.
KEYBOARD_NAME="V61"

# -si: Enables the software MIDI interface. This option allows FluidSynth to
# receive MIDI messages from external sources.
#
# -p "fluid": Specifies the name of the MIDI port or client. In this case, it
# is set to "fluid".
#
# -C0: Sets the MIDI channel offset to 0. This means that the MIDI channel
# numbers will start from 0 instead of the default 1.
#
# -R0: Disables reverb. The value 0 indicates that no reverb effect will be
# applied.
#
# -r48000: Sets the sample rate to 48000 Hz. This determines the number of
# audio samples processed per second.
#
# -c2: Sets the number of audio channels to 2. This means stereo output will
# be produced.
#
# -z1024: Sets the audio buffer size to 1024 samples. This affects the
# latency and performance of the audio output.
#
# -f inst/$CONFIG: Specifies the SoundFont file to be used by FluidSynth. The
# variable $CONFIG should be replaced with the actual name of the SoundFont
# file.
#
# -a alsa: Sets the audio driver to ALSA (Advanced Linux Sound Architecture).
# ALSA will be used for audio output.
#
# -m alsa_seq: Sets the MIDI driver to ALSA sequencer. This allows FluidSynth
# to connect to MIDI devices and software via the ALSA sequencer interface.

fluidsynth -si -p "fluid" -C0 -R0 -r48000 -c2 -z1024 -f $INSTRUMENT_FILE -a alsa -m alsa_seq &

sleep 3


IS_MIDI_CONNECTED=$(aconnect -o | grep "$KEYBOARD_NAME")

if [[ $IS_MIDI_CONNECTED ]]
then
    aconnect $KEYBOARD_NAME:0 fluid:0
    echo $KEYBOARD_NAME connected
fi

exit 0
```

Make sure the file is executable:

```
chmod +x synth.sh
```

## Edit your bashrc to initialise the script automatically

Put this line at the end of your `.bashrc` file (don't forget to `cd ~` first):
```
./synth.sh
```

## Auto login

Run `sudo raspi-config`

1. Go to "System Options"
2. Go to "Boot / Auto Login"
3. Select "Console auto login"

Now once your raspberry pi boots, it will automatically run the script to
activate the midi keyboard.
