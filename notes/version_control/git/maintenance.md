# Maintenance

This command provides a way to add cronjobs that run daily, hourly and weekly
maintenance tasks on your git repositories.

This will update the `.git/config` file in the repository with the following
configuration:

```
[maintenance]
	auto = false
	strategy = incremental
```

According to the `man` page:

```
The incremental strategy uses the following schedule for each maintenance task:

   •   gc: disabled.

   •   commit-graph: hourly.

   •   prefetch: hourly.

   •   loose-objects: daily.

   •   incremental-repack: daily.
```

Each task will do something to make git faster in the repo. Further explanation
for these tasks (gc, commit-graph, etc.) can be found in the `man` page.

## Why is gc disabled?

> gc: Clean up unnecessary files and optimize the local repository. "GC" stands
> for "garbage collection," but this task performs many smaller tasks. This
> task can be expensive for large repositories, as it repacks all Git objects
> into a single pack-file. It can also be disruptive in some situations, as it
> deletes stale data. See git-gc(1) for more details on garbage collection in
> Git.
