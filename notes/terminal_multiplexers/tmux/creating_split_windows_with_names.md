# Creating split windows with names

```
Created at: 2025-07-25
```

```sh
# Creating a virtual pane
# -v = vertical split
# -d = don't switch to the new pane after it's been created
# -P = print information about the new window after it has been created.
       such as #{session_name}:#{window_index}
tmux split-window -v -d -P
```
