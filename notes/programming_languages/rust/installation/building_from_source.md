# Building From Source

```
Created at: 2025-02-26
```

## 0. Get cargo and rustc

The unfortunate thing about Rust is that Rust requirest Rust to install Rust.
Does that make sense? So you will need to have some version of Rust installed
so that you can compile the project.

## 1. Find the correct tar ball

I'll usually go for the "stable" version you can find
[here](https://forge.rust-lang.org/infra/other-installation-methods.html).

Or simply extend the script below:

```sh
VERSION=1.85.0
DIR=$HOME/.rust_bin/rust-$VERSION
rm -rf $DIR
mkdir -p $DIR
cd $DIR
curl -O https://static.rust-lang.org/dist/rustc-$VERSION-src.tar.xz
tar -xvf rustc-$VERSION-src.tar.xz
cd rustc-$VERSION-src
```

## 2. Configure the build

Rust uses a .toml file to configure the build. A full config file is located at
the root folder in the source code.

I use this config:

```sh
echo "[llvm]
download-ci-llvm = true
ninja = false

[build]
cargo = \"$(which cargo)\"
rustc = \"$(which rustc)\"
docs = true
jobs = 4
extended = true  # Enables building Cargo, Rustfmt, Clippy, etc.
" > config.toml
```

## 3. Build

```sh
./x.py build
```

That's it! Building rust takes a **long** time. My `build` directory ended
up being 5.8GB for rust 1.85.0.
