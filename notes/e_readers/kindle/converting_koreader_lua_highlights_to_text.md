# Converting koreader lua highlights to text

```lua
-- The below is the ONLY variable that needs to change.
-- Ensure this is the full path to the book highlights directory.
highlights_dir = "/mnt/kindle/books/fiction/The Green Mile - Stephen King.sdr"

highlights = dofile(highlights_dir .. "/metadata.epub.lua")

for i, annotation in ipairs(highlights.annotations) do
    print("> " .. annotation.text)
    print("") -- print an empty line
end
```
