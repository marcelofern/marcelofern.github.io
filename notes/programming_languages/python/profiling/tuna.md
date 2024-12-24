2024-03-25

I am using `tuna` for import-time profiling in Python. This isn't the only
use case for `tuna`, it can also print profilers for runtime.

The Python `-X` flag sets an implementation-specific option. Setting `-X`
with the option `importtime` returns how long each import takes.

For example:

```python
python -X importtime -c 'import asyncio'
```

When using a Django application, this is the command I use:

```python
python -X importtime ./manage.py check > /tmp/importtime_output
```

And then:

```sh
tuna /tmp/importtime_output
```
