# const vs immutable variables

```
Created at: 2025-03-02
```

Variables in Rust are immutable by default. But, you can override an immutable
variable and turn it into a mutable variable. For example:

```rs
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    let mut x = 6;
    println!("The value of x is: {x}");
    x = 7;
    println!("The value of x is: {x}");
}
```

Prints:

```
The value of x is: 5
The value of x is: 6
The value of x is: 7
```

This is also considered a form of "shadowing", where consecutive declarations
of the same variable name "shadow" the first declaration. You have to be
careful here as inner scopes can't alter the value of outer scope declarations.
For example:

```rs
fn main() {
    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }
    println!("The value of x is: {x}");
}
```

Prints:

```
The value of x in the inner scope is: 12
The value of x is: 6
```

The first difference is that constants are **always** immutable and can't be
overridden. For example:

```rs
fn main() {
    const x: i64 = 5;
    println!("The value of x is: {x}");
    let mut x = 6;
    println!("The value of x is: {x}");
    x = 7;
    println!("The value of x is: {x}");
}
```

Prints:

```
 --> src/main.rs:4:13
  |
2 |     const x: i64 = 5;
  |     ----------------- the constant `x` is defined here
3 |     println!("The value of x is: {x}");
4 |     let mut x = 6;
  |             ^ cannot be named the same as a constant
```

Additionally, constants **always** have to have their types declared.

Constants can be used for global variables, but you can't use `let` to declare
global variables. You'd see the error below:

```
 --> src/main.rs:1:1
  |
1 | let y: i64 = 10;
  | ^^^
  | |
  | `let` cannot be used for global variables
  | help: consider using `static` or `const` instead of `let`
```

Trying to name a local variable the same as a constant will also fail:

```
const x: i64 = 42;

fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    let mut x = 6;
    println!("The value of x is: {x}");
    x = 7;
    println!("The value of x is: {x}");
}
```

```
 --> src/main.rs:7:13
  |
1 | const x: i64 = 42;
  | ------------------ the constant `x` is defined here
...
7 |     let mut x = 6;
  |             ^ cannot be named the same as a constant
```

Rust will also require you to capitalise constant declarations, for example:

```
const my_const: i64 = 42;

fn main() {
    println!("The value of my_const is: {my_const}");
}
```

Prints the warning:

```
warning: constant `my_const` should have an upper case name
 --> src/main.rs:1:7
  |
1 | const my_const: i64 = 42;
  |       ^^^^^^^^ help: convert the identifier to upper case: `MY_CONST`
  |
  = note: `#[warn(non_upper_case_globals)]` on by default

warning: `prj` (bin "prj") generated 1 warning
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/prj`
The value of my_const is: 42
```

## Differences from C

```c
#include <stdio.h>

int main() {
  const int x = 5;
  printf("The value of x is: %d", x);
  int x = 6;
  printf("The value of x is: %d", x);
  x = 7;
  printf("The value of x is: %d", x);
}
```

This won't compile because:

```
main.c:6:7: error: conflicting type qualifiers for ‘x’
    6 |   int x = 6;
      |       ^
main.c:4:13: note: previous definition of ‘x’ with type ‘int’
    4 |   const int x = 5;
      |             ^
```

But similarly to Rust, you can override a variable within a scope:

```c
#include <stdio.h>

int main() {
  const int x = 5;
  printf("The value of x is: %d\n", x);
  {
    int x = 6;
    printf("The value of x is: %d\n", x);
    x = 7;
    printf("The value of x is: %d\n", x);
  }
}
```

Prints:

```
The value of x is: 5
The value of x is: 6
The value of x is: 7
```
