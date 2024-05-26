# Set Ordering

Python sets do not have an order.
However, a developer may be confused by this:

```python
>>> list({"1", "2", "3", "4"})
['2', '4', '1', '3']

# Repeat the line above and get the same ordering:
>>> list({"1", "2", "3", "4"})
['2', '4', '1', '3']

# You can repeat forever and it will always have
# The same ordering.
```

**Why does this happen?**

The Python hashing algorithm relies on a seed value that is computed when the
interpreter process starts.

The hashing algorithm uses this initial seed to create the hashing function
that will be used for the rest of the life-time of the python process.

So in the example above, the ordering of the set-converted-list will always be
the same, but as soon as a different process is initialised, the ordering of
the result will likely be different:

```
$ python
Python 3.12.3 (main, Apr 23 2024, 09:16:07) [GCC 13.2.1 20240417] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> list({"1", "2", "3", "4"})
['2', '4', '3', '1']
>>> exit()
$ python
Python 3.12.3 (main, Apr 23 2024, 09:16:07) [GCC 13.2.1 20240417] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> list({"1", "2", "3", "4"})
['4', '1', '2', '3']
>>> exit()
$ python
Python 3.12.3 (main, Apr 23 2024, 09:16:07) [GCC 13.2.1 20240417] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> list({"1", "2", "3", "4"})
['1', '4', '2', '3']
```
