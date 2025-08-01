# Speeding up git

```
Created at: 2025-06-30
```

## Working Tree Speed Ups

### feature.manyFiles

```sh
# Tell git that it's dealing with a repo with lots of files.
git config feature.manyFiles true
```

Along with this, update the index file to version 4

```sh
git update-index --index-version 4
```

### core.fsmonitor

Enables the file system monitor daemon.

```sh
git config core.fsmonitor true
```

Then check if it's on

```sh
git fsmonitor--daemon status
```

### core.untrackercache
This feature adds an extension to the index that remembers the results of the
untracked search.

```sh
git config core.untrackedcache true
```

### git gc

It's a good idea to run `git gc` now and then to garbage collect old stuff.

## History Speed ups

## core.commitgraph

use a commit history cache to improve speed of history operations (like `log`).

```sh
git config core.commitgraph true
````

## fetch.writeCommitGraph
Tells `git gc` to update the commit-graph file during non-trivial garbage
collection.

```sh
git config fetch.writeCommitGraph true
```
