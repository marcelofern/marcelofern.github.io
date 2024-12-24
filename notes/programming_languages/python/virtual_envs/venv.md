2024-05-13

My old way of creating virtual environments in Python was:

```sh
virtualenv env_my_sweet_env
source env_my_sweet_env/bin/activate
```

But since Python 3.3+, the `python` bin comes with the `venv` module, making
`virtualenv` unnecessary for me. `virtualenv` is still my preferred way if I
were to use an older version of Python without `venv` support.

```sh
python -m venv env_my_sweet_env
source env_my_sweet_env/bin/activate
```
