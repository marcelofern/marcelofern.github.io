# Switch

```
Created at: 2025-04-09
```

## Can we think of Python Switch as a C switch?

Source: https://github.com/kraken-tech/psycopack/pull/4#discussion_r2030547248

Perhaps that discussion cares further scrutinity?

After evaluating the PEP and the official Python docs, it's clearer to me that
what this code above does is already structural pattern matching. E.g., I am
not comparing the exact value (like C switch statements), I am comparing an
object type, shape, and value.

To further strengthen that position, there's this example from "matching
objects" in the canonical pep tutorial for `switch` statements.
[Reference](https://peps.python.org/pep-0636/#adding-a-ui-matching-objects)

Also, there is a clear example in the tutorial that is an accurate match our
situation:

> Patterns may use named constants. These must be dotted names to prevent them
> from being interpreted as capture variable:

```python
from enum import Enum
class Color(Enum):
    RED = 0
    GREEN = 1
    BLUE = 2

match color:
    case Color.RED:
        print("I see red!")
    case Color.GREEN:
        print("Grass is green")
    case Color.BLUE:
        print("I'm feeling the blues :(")
```

I wouldn't say that you'd be wrong by transferring a C-style thinking into
Python `match` statements, given that the former is just a "simpler" use case
of Python object matching. That is, given that in Python
everything-is-an-object`*`

`*`: not everything, keywords are not objects - but this is a common falacy!
