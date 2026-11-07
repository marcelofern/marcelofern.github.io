February 22, 2024

## Support Reading

[pep-0661](https://web.archive.org/web/20231222001234/https://peps.python.org/pep-0661/)

## Definition

If you have a dictionary in Python and you perform:

```python
my_dict.get("my_key")
```

You will get `None` if either the `my_key` doesn't exist, or if it exists and
the value of that key is `None`.

This is cause for ambiguity because `None` means two things at the same time.

Function arguments can suffer from the same problem:

```python
def is_it_bed_time(hour_to_go_to_bed: int | None = None) -> bool:
    if hour_to_go_to_bed is None:
        print("I don't have a time to go to bed mom!")
    if datetime.now().hour > hour_to_go_to_bed:
        print("Go to sleep!")
    else:
        print("Don't go to sleep yet!)
```

What happens if you want `None` to be a possible value, but also you'd like
to have a default if the caller didn't pass in the argument?

This is what sentinels are for.

```python
class NotProvided:
    pass

DEFAULT_HOUR = 23

def is_it_bed_time(
    hour_to_go_to_bed: int | None | NotProvided = NotProvided
) -> bool:
    # We have a default when the value is not passed.
    if hour_to_go_to_bed is NotProvided:
        hour_to_go_to_bed = DEFAULT_HOUR
    # But `None` means something different:
    elif hour_to_go_to_bed is None:
        print("I don't have a time to go to bed mom!")
        return False

    if datetime.now().hour > hour_to_go_to_bed:
        print("Go to sleep!")
        return True
    else:
        print("Don't go to sleep yet!")
        return False
```

## Initial problem

The version above is rather simple, but it does not work well with mypy.

Suppose you have this:

```python
class NotProvided:
    """
    A sentinel for when an argument to a function is not provided.
    """
    pass


def foo(bar: int | None | NotProvided = NotProvided) -> int:
    if bar is NotProvided:
        bar = 0
    elif bar is None:
        bar = 42

    reveal_type(bar)

    return bar + 10
```

When running mypy, we get the following errors:

```
!mypy /tmp/test_type.py

/tmp/test_type.py:11: note: Revealed type is "Union[builtins.int, Type[test_type.NotProvided]]"
/tmp/test_type.py:13: error: Unsupported operand types for + ("Type[NotProvided]" and "int")  [operator]
/tmp/test_type.py:13: note: Left operand is of type "Union[int, Type[NotProvided]]"
Found 1 error in 1 file (checked 1 source file)
```

Even though you know that when we hit the return bar is an integer, the type
narrowing cannot infer that.

These are some ways to narrow a type according to mypy, and `is` doesn't get
a reference:

- `isinstance()` like in `isinstance(obj, float)` will narrow obj to have float
  type
- `issubclass()` like in `issubclass(cls, MyClass)` will narrow cls to be
  `Type[MyClass]`.
- `type` like in `type(obj)` is int will narrow obj to have int type
- `callable()` like in `callable(obj)` will narrow object to callable type
- `obj is not None` will narrow object to its non-optional form

[Source](https://mypy.readthedocs.io/en/stable/type_narrowing.html)

## Overcoming the typing limitation

The list above says that `isinstance` would type narrow the sentinel value.

```python
class NotProvidedType(type):
    pass

class NotProvided(metaclass=NotProvidedType):
    pass


def foo(bar: int | None | NotProvidedType = NotProvided) -> int:
    if isinstance(bar, NotProvidedType):
        bar = 0
    elif bar is None:
        bar = 42

    reveal_type(bar)

    return bar + 10
```

```
/tmp/test_type.py:14: note: Revealed type is "builtins.int"
```

This works, but having to resort to `isinstance` isn't always the best.

## Using a singleton type

A colleague at work investigated this issue and came up with a clever idea:

```python
import typing
import enum

@enum.unique
class Sentinel(enum.Enum):
    NotProvided = enum.auto()

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.__repr__()


NotProvidedType = typing.Literal[Sentinel.NotProvided]
NotProvided: typing.Final = Sentinel.NotProvided


def foo(bar: int | None | NotProvidedType = NotProvided) -> int:
    if bar is NotProvided:
        bar = 0
    elif bar is None:
        bar = 42

    reveal_type(bar)

    return bar + 10
```

```
!mypy %
/tmp/test_type.py:25: note: Revealed type is "builtins.int"
```

### Breaking it down

#### `@enum.unique`

Ensures the enumeration only has unique member values. If you have more
sentinels this is just generally good to have


```python
import enum

@enum.unique
class Sentinel(enum.Enum):
    value_1 = "test"
    value_2 = "test"
```

```
:!python %
Traceback (most recent call last):
  File "/tmp/kaoekoea.py", line 4, in <module>
    class Sentinel(enum.Enum):
  File "/home/x/.pyenv/versions/3.10.6/lib/python3.10/enum.py", line 1022, in unique
    raise ValueError('duplicate values found in %r: %s' %
ValueError: duplicate values found in <enum 'Sentinel'>: value_2 -> value_1
```

#### `enum.auto()`

Gives a nice initial value for the fields:


```python
import enum

@enum.unique
class Sentinel(enum.Enum):
    value_1 = enum.auto()
    value_2 = "test"
    value_3 = enum.auto()

import ipdb; ipdb.set_trace(); from pprint import pprint as p
```

```
ipdb> Sentinel.value_1
<Sentinel.value_1: 1>
ipdb> Sentinel.value_2
<Sentinel.value_2: 'test'>
ipdb> Sentinel.value_3
<Sentinel.value_3: 2>
```

#### `typing.Literal`

```
NotProvidedType = typing.Literal[Sentinel.NotProvided]
```

This form can be used to indicate to type checkers that the corresponding
variable or function parameter has a value equivalent to the provided
literal (or one of several literals):

```python
def validate_simple(data: Any) -> Literal[True]:  # always returns True
  ...

MODE = Literal['r', 'rb', 'w', 'wb']
def open_helper(file: str, mode: MODE) -> str:
```

#### `typing.Final`

```
NotProvided: typing.Final = Sentinel.NotProvided
```

Special typing construct to indicate final names to type checkers.
A final name cannot be re-assigned or overridden in a subclass. For example:

```python
MAX_SIZE: Final = 9000
MAX_SIZE += 1  # Error reported by type checker

class Connection:
  TIMEOUT: Final[int] = 10

class FastConnector(Connection):
  TIMEOUT = 1  # Error reported by type checker
```
