# Using Vale To Write Prose

```
Created at: 28-08-2024
```

According to GitHub, [Vale](https://github.com/errata-ai/vale) is a
command-line tool that brings code-like linting to prose.

Installation can happen in the following steps:

```sh
function install_vale() {
    mkdir -p /tmp/vale
    cd /tmp/vale
    wget https://github.com/errata-ai/vale/releases/download/v3.7.1/vale_3.7.1_Linux_64-bit.tar.gz
    mkdir bin && tar -xvzf vale_3.7.1_Linux_64-bit.tar.gz -C bin
    sudo mv -f bin/vale /usr/bin/vale
}

install_vale
```

After that, call:

```sh
vale sync
```

This will look up my dotfiles for vale and install my required styles.
