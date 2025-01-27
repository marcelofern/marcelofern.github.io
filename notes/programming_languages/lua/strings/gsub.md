# gsub

```
Created at: 2025-01-27
```

Official docs: [https://www.lua.org/pil/20.1.html](https://www.lua.org/pil/20.1.html).

## Gotchas

```lua
-- Remember to escape the patterns before using it with gsub if you want to
-- perform something closer to a literal string replacement.
prefix_to_ignore = prefix_to_ignore:gsub("([%.%-%/%_])", "%%%1")
```
