February 2, 2024

# Introduction

Suppose you have the following code:

```python
def foo():
    print("writing data to a temp file")
    # write data here
    # ...

    print("doing some other stuff that raises an exception")
    # ...
    raise ValueError

def remove_temp_file():
    print("removing temp file")
    # do removal here
    # ...

try:
    foo()
    remove_temp_file()
except ValueError:
    print("doing some logging")
    # do some logging here
    # ...
    remove_temp_file()
    raise
```

Note that regardless of succeeding or not, you want the temp file to be
cleaned up (removed).

## `finally`

We can remove some of this duplication by using `finally`

```python
def foo():
    print("writing data to a temp file")
    # write data here
    # ...

    print("doing some other stuff that raises an exception")
    # ...
    raise ValueError

def remove_temp_file():
    print("removing temp file")
    # do removal here
    # ...

try:
    foo()
except ValueError:
    print("doing some logging")
    # do some logging here
    # ...
    raise
finally:
    remove_temp_file()
```

The `finally` block will run no matter what. However, it has some special
properties. According to the documentation:


> If finally is present, it specifies a ‘cleanup’ handler. The try clause is
> executed, including any except and else clauses. If an exception occurs in
> any of the clauses and is not handled, the exception is temporarily saved.
> The finally clause is executed. If there is a saved exception it is re-raised
> at the end of the finally clause. If the finally clause raises another
> exception, the saved exception is set as the context of the new exception. If
> the finally clause executes a return, break or continue statement, the saved
> exception is discarded.

[Docs](https://web.archive.org/web/20240216014110/https://docs.python.org/3/reference/compound_stmts.html)


The catch here is that the code block under `finally`, will run before the
`raise` exception in the `except` block runs, but after the code inside the
`except` block.

If we run the code above, we have the following print output:

```
writing data to a temp file
doing some other stuff that raises an exception
doing some logging
removing temp file
```

Note that if the `finally` block raised an exception, that exception would
take precedence over `ValueError` being re-raised:

```python
try:
    foo()
except ValueError:
    print("doing some logging")
    # do some logging here
    # ...
    raise
finally:
    remove_temp_file()
    raise TypeError("error in finally block")
```

```
> TypeError: error in finally block
```

Also note that using `break` or `return` will cause the `ValueError` exception
to **not be re-raised**. This can come as a shock, but it is helpful if you
are looping through a lot of try/catch/finally and you don't want any
exception to affect your loop.

```
def bar():
    try:
        foo()
    except ValueError:
        print("doing some logging")
        # do some logging here
        # ...
        raise
    finally:
        remove_temp_file()
        return

# No exceptions raised
bar()
```
