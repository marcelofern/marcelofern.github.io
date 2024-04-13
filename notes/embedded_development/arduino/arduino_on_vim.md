`2024-04-05`

The first step is to install the arduino-cli.

```sh
sudo pacman -S arduino-cli
```

Create a local configuration file. This is not necessary, but it does help
making commands less lengthy.

```sh
arduino-cli config init
# Config file written to: /home/x/.arduino15/arduino-cli.yaml
```

The initial file looks like this:

```yaml
board_manager:
    additional_urls: []
build_cache:
    compilations_before_purge: 10
    ttl: 720h0m0s
daemon:
    port: "50051"
directories:
    data: /home/x/.arduino15
    downloads: /home/x/.arduino15/staging
    user: /home/x/Arduino
library:
    enable_unsafe_install: false
logging:
    file: ""
    format: text
    level: info
metrics:
    addr: :9090
    enabled: true
output:
    no_color: false
sketch:
    always_export_binaries: false
updater:
    enable_notification: true
```

Don't worry about the file now, explanations and updates will happen in due
course.

## Create a sketch

I prefer to work from my `$HOME/workspace/` directory.

```sh
mkdir -p ~/workspace/arduino_sketches
cd ~/workspace/arduino_sketches

arduino-cli sketch new hello_world
# Sketch created in: /home/x/workspace/arduino_sketches/hello_world

cat hello_world/hello_world.ino
```

```sh
void setup() {
}

void loop() {
}
```

## Simple code

We'll stick to the example on the documentation for now. Change
`hello_world.ino` to:

```c
void setup() {
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);
    delay(1000);
}
```

## Update packages:

```sh
arduino-cli core update-index
```

This will download a bunch of files to your hidden `.arduino15` folder.

## Finding the arduino

After connecting the arduino to your computer:

```sh
arduino-cli board list
```

If you are lucky you will get the board info, otherwise, you might get nothing
like I did. You can use this command to find the name of your board and which
core to install.

```sh
arduino-cli board search
```

I have an old arduino with an atmega328p microcontroller. Which links to the
`arduino:avr:uno` core. The next step is to download that core:

```sh
arduino-cli core install arduino:avr:uno

# Check the core has been installed via:
arduino-cli core list
```

Note, if you are using 3rd-party cores, you'll need to follow the steps on this
documentation: [Adding 3rd party cores](http://web.archive.org/web/20240226230704/https://arduino.github.io/arduino-cli/0.35/getting-started/)

## Compiling the sketch

Using the info from `arduino-cli board search`, run this command:
Note that my board FQBN is `arduino:avr:uno`

```sh
arduino-cli compile --fqbn arduino:avr:uno hello_world
```

In my case the command immediately complained I didn't have `arduino:avr` even
though that was not listed in the `arduino-cli board search` as my FQBN. I
installed it nonetheless and then it compiled successfully.

## Uploading the sketch

Run this command to find your usb port:

```sh
arduino-cli board list
```

Then run:

```sh
arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:uno hello_world
```

If you don't have permission to upload to that port, do this:

```sh
stat /dev/ttyUSB0
```

This is the bit that matters:

```sh
Gid: (  986/    uucp)
```

Some people have other value rather than `uucp`, just change that value in the
next command to whatever group your system is using:

```sh
sudo usermod -a -G uucp $USER
```

You'll have to reboot after that. It's important that you do so that the
language server part is working properly.

## Getting setting up with arduino language server

```sh
sudo pacman -S arduino-language-server
```

Create a `sketch.yaml` file so that the LSP understands the configuration
for the project.

```sh
cd ~/workspace/arduino_sketches/hello_world

arduino-cli board attach -p /dev/ttyUSB0 -b arduino:avr:uno hello_world.ino

cat sketch.yaml
```

```
default_fqbn: arduino:avr:uno
default_port: /dev/ttyUSB0
```

The file structure should now look like this:

```
.
├── hello_world.ino
└── sketch.yaml
```

That's all, now you can get by with whatever lsp library you use.
In my case, I use nvim-lspconfig and my configuration looks like this:

```lua
local servers = {'jedi_language_server', 'clangd', 'arduino_language_server'}
for _, lsp in pairs(servers) do
  require('lspconfig')[lsp].setup {
    on_attach = on_attach,
    flags = {
      -- This will be the default in neovim 0.7+
      debounce_text_changes = 150,
    }
  }
end
```

## Adding user commands in neovim

Usage:

```
:ArduinoCompile
:ArduinoCompileWithUpload
:ArduinoUpload
:ArduinoMonitor
```

```lua
local function arduino_compile(opts)
  local cmd = table.concat({
    "!arduino-cli compile",
    opts.args,
  }, " ")
  vim.cmd(cmd)
end

local function arduino_compile_with_upload(opts)
  local cmd = table.concat({
    "!arduino-cli compile --upload",
    opts.args,
  }, " ")
  vim.cmd(cmd)
end

local function arduino_upload(opts)
  local cmd = table.concat({
    "!arduino-cli upload",
    opts.args,
  }, " ")
  vim.cmd(cmd)
end

vim.api.nvim_create_user_command("ArduinoCompile", arduino_compile, {
  -- Zero or one arguments are accepted
  nargs="?",
  -- Can't be used in visual mode.
  range=false,
})

vim.api.nvim_create_user_command("ArduinoCompileWithUpload", arduino_compile_with_upload, {
  -- Zero or one arguments are accepted
  nargs="?",
  -- Can't be used in visual mode.
  range=false,
})

vim.api.nvim_create_user_command("ArduinoUpload", arduino_upload, {
  -- Zero or one arguments are accepted
  nargs="?",
  -- Can't be used in visual mode.
  range=false,
})
```
