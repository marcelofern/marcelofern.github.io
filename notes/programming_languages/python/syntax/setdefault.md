March, 19th 2024

The `setdefault` feature is available for Python dictionaries.

Consider you have a dictionary typed as such:

```python
mydict: dict[str, list[int]] = {}

# mydict can look like this:
# >>> {"A": [1,2,3], "B": [4,5,6]}
```

And you have a routine that will populate this dictionary as such:

```python
if my_dict.get(key) is None:
    my_dict[key] = [value]
else:
    my_dict[key].append(value)
```

One way to make it all in the same line of code is by using `setdefault`:

```python
my_dict.setdefault(key, []).append(value)
```
