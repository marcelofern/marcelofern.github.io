# Printing file names as YYYY/MM/DD/filename.ext

```
Created at: 2025-09-14
```

```sh
find . -type f -exec stat --format="%y %n" {} \; | awk '{split($1, date, "-"); sub(/^\.\//, "", $4); print date[1] "/" date[2] "/" date[3] "/" $4}'
```


