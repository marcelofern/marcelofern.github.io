March 1st, 2024

> Austin is a Python frame stack sampler for CPython written in pure C. Samples
> are collected by reading the CPython interpreter virtual memory space to
> retrieve information about the currently running threads along with the stack
> of the frames that are being executed. Hence, one can use Austin to easily
> make powerful statistical profilers that have minimal impact on the target
> application and that don't require any instrumentation.

[Source](https://web.archive.org/web/20240221112118/https://github.com/P403n1x87/austin)

Note: Austin will generate extremely huge output files if you are running it
against a 5 million LOC Django codebase like I am.


## With Django Runserver

```sh
austin ./manage.py runserver > /tmp/austin
```

Throw the `/tmp/austin` file in: https://www.speedscope.app/

## Attaching to a running process

```sh
austin -p $PROCESS_NUMBER > /tmp/austin
```
