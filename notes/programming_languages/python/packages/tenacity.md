February 26th, 2024

Tenacity is a library that allows you to retry just about anything.

[source](http://web.archive.org/web/20240206022100/https://tenacity.readthedocs.io/en/latest/)

## Retry something until it works

```python
import random
import tenacity

@tenacity.retry
def do_something_unreliable():
    if random.randint(0, 10) > 1:
        print("Sorry, I have failed!")
        raise IOError("Broken sauce, everything is hosed!!!111one")
    else:
        return "Awesome sauce!"

print(do_something_unreliable())
```

## Stopping after some retries

```python
@retry(stop=tenacity.stop_after_attempt(7))
def stop_after_7_attempts():
    print("Stopping after 7 attempts")
    raise Exception
```

## Waiting with exponential backoff

```python
@tenacity.retry(
    wait=tenacity.wait_exponential(multiplier=1, min=4, max=10)
)
def wait_exponential_1():
    print(
        "Wait 2^x * 1 second between each retry starting with 4 seconds, "
        "then up to 10 seconds, then 10 seconds afterwards"
    )
    raise Exception
```

## Retrying based on exception

```python
@tenacity.retry(retry=tenacity.retry_if_exception_type(IOError))
def might_io_error():
    print("Retry forever with no wait if an IOError occurs, raise any other errors")
    raise Exception
```

## Retrying code block

Tenacity allows you to retry a code block without the need to wraps it in an
isolated function. This makes it easy to isolate failing block while sharing
context. The trick is to combine a for loop and a context manager.


```python
from tenacity import Retrying, RetryError, stop_after_attempt

try:
    for attempt in Retrying(stop=stop_after_attempt(3)):
        with attempt:
            raise Exception('My code is failing!')
except RetryError:
    pass
```
