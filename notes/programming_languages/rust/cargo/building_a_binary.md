# Building a Binary

```
Created at: 2025-02-27
```

Inside a project created with cargo (Cargo.toml), run:

```sh
cargo build
```

This will create a binary in `target/debug/<bin_name>`. Also:

> Running cargo build for the first time also causes Cargo to create a new file
> at the top level: Cargo.lock. This file keeps track of the exact versions of
> dependencies in your project. This project doesn’t have dependencies, so the
> file is a bit sparse. You won’t ever need to change this file manually; Cargo
> manages its contents for you.

## Profile

You can change the profile in which you want to generate the binary.
For example:

```sh
cargo build --profile=release
```

This will create a binary in `target/release/<bin_name>`. The `release` command
will have run with the following settings:

```
[profile.release]
opt-level = 3  # similar to gcc -O3
debug = false  # no debug info at all
# Platform-specific. controls whether debug information, if generated, is
# either placed in the executable itself or adjacent to it.
split-debuginfo = '...' 
strip = "none"  # Whether to strip symbols or debuginfo from binary
debug-assertions = false  # enables the debug_assert! macro. Not for prod.
overflow-checks = false
lto = false  # longer linker time at the expense of more optimisation
panic = 'unwind'
incremental = false  # incremental compilation. Makes compilation faster
codegen-units = 16
rpath = false
```

## check

Sometimes, building the binary can take a lot of time.
If all you want to do is to check that the code would compile, you can run:

```sh
cargo check
# cargo check --profile=release
```
