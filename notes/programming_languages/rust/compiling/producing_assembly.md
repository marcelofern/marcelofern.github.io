# Producing Assembly

```
Created at: 2025-02-28
```

## Using rustc

```sh
# The following generates a "main.s" file in the same directory.
rustc --emit=asm main.rs

# Useful flags
# -O (optimisation level = 2)
# -g (debuginfo = 2)
rustc --emit=asm -O main.rs
rustc --emit=asm -g main.rs
# If you want to pick opt-level=2
rustc -C opt-level=3 --emit=asm main.rs

# If you want LLVM intermediate representation
# instead of assembly (this will create a .ll file):
rustc --emit=llvm-ir main.rs
```

## Using cargo (in a cargo project)

```sh
# This will create a `.s` file in
# $ROOT/target/release/deps/
cargo rustc --release -- --emit=asm

# Or just to run as "debug"
cargo rustc -- --emit=asm

# The same flags from rustc are available here
cargo rustc --release -- -C opt-level=3 --emit=asm
```

## Using cargo asm
Using cargo-asm to Generate Assembly from Rust Code

`cargo-asm` is a more interactive and user-friendly tool for inspecting
the assembly of Rust functions. It allows you to view assembly output
for specific functions rather than the entire binary.

```sh
# it needs to be installed first:
cargo install --force cargo-show-asm

# now you can inspect a specific function:
cargo asm prj::foo

# in debug (dev) mode
cargo asm --dev prj::foo

# If you're using a library:
cargo asm prj::foo::bar

# If you want to see the underlying rust code:
cargo asm prj::foo --rust

# If you want to "simplify" the output for readibility:
cargo asm prj::foo --simplify
```

Example code to test:

```
use std::io;

#[inline(never)]
fn foo(x: i64, y: i64) -> i64 {
    return x + y;
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap(); // Read user input
    let x: i64 = input.trim().parse().unwrap(); // Convert to i64
    let result = foo(x, x);
    println!("{}", result)
}
```
