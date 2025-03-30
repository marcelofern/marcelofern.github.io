# Logging

```
Created at: 2025-03-26
```

> The key benefit of having the logging API provided by a standard library
> module is that all Python modules can participate in logging, so your
> application log can include your own messages integrated with messages from
> third-party modules.

## How To Use

At the top of your Python file, have this:

```py
import logging
logger = logging.getLogger(__name__)
```

You may choose a specific value instead of `__name__`, but at first, try to
start with that. If you choose a specific value, use `.` to denote hierarchy
between loggers.  For example, given a logger with a name of `foo`, loggers
with names of `foo.bar`, `foo.bar.baz`, and `foo.bam` are all descendants of
`foo`.

For logging to be useful, it needs to be configured: setting the levels and
destinations for each logger, potentially changing how specific modules log,
often based on command-line arguments or application configuration. In most
cases, like the one above, only the root logger needs to be so configured,
since all the lower level loggers at module level eventually forward their
messages to its handlers. `logging.basicConfig()` provides a quick way to
configure the root logger that handles many use cases.


# Configure the logger to write to stdout

```python
logging.basicConfig(
    stream=sys.stdout,  # Direct logs to stdout
    level=logging.DEBUG,  # Set the log level to DEBUG
    format='%(asctime)s - %(levelname)s - %(message)s')
)
```


## Sources

- https://docs.python.org/3/library/logging.html
