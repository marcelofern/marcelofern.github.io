# LLDB Basics

```
Created at: 2025-01-30
```

## Start a Program

```sh
lldb <name_of_the_program>
```

Then

```
(lldb) run <program args here. Same as if running the program normally>
```

## Getting help

Just type in `help` in lldb

```
(lldb) help
```

## Useful commands

```
# Sets a breakpoint on the label "foo"
(lldb) b foo

# See the backtrace (i.e., where you came from)
(lldb) bt

# Show more code (downwards)
(lldb) l

# Show more code (upwards)
(lldb) l -

# Show back the code where you were after using `l` too much:
(lldb) f

# Finish the current stack frame. This goes to the end of the function.
(lldb) finish

# Step through the code, and into calls.
(lldb) s

# Source-level single step, skips calls.
(lldb) n

# Run a shell command on the host
(lldb) shell ls

# Show the variables within the current stack frame.
(lldb) var

# Show the history of commands in the session.
# Good for ctrl+c/ctrl+v purposes.
(lldb) history

# Print a variable or expression
(lldb) p (char*)foo

# Call anything from the existing thread
(lldb) call foo(1,2);
```
