2024-05-13

My old way of creating virtual environments in Python was:

```sh
virtualenv env_my_sweet_env
source env_my_sweet_env/bin/activate
```

But virtualenv stopped working in a new version of Arch.
I am using `venv` now:

```sh
python -m venv env_my_sweet_env
source env_my_sweet_env/bin/activate
```
