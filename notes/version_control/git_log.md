# git log

```
Created at: 2024-11-24
```

Most of the below is taken from gittutorial man page:


Many Git commands also take sets of commits, which can be specified in a number
of ways. Here are some examples with git log:

```sh
$ git log v2.5..v2.6            # commits between v2.5 and v2.6
$ git log v2.5..                # commits since v2.5
$ git log --since="2 weeks ago" # commits from the last 2 weeks
$ git log v2.5.. Makefile       # commits since v2.5 which modify
                                # Makefile
$ git log v4.7..v4.8 tests/     # commits between v4.7 and v4.8
                                # which modify the tests/ folder
```

You can also give git log a "range" of commits where the first is not
necessarily an ancestor of the second; for example, if the tips of the branches
stable and master diverged from a common commit some time ago, then

```sh
$ git log stable..master
```

will list commits made in the master branch but not in the stable branch, while

```
$ git log master..stable
```

will show the list of commits made on the stable branch but not the master
branch.

