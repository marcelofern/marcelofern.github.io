# Evolution of a Function

You can print the diff that shows changes to a function across multiple
commits.

For that, you can use `git log -L`:


> -L<start>,<end>:<file>, -L:<funcname>:<file> Trace the evolution of the line
> range given by <start>,<end>, or by the function name regex <funcname>,
> within the <file>. You may not give any pathspec limiters. This is currently
> limited to a walk starting from a single revision, i.e., you may only give
> zero or one positive revision arguments, and <start> and <end> (or
> <funcname>) must exist in the starting revision. You can specify this option
> more than once. Implies --patch. Patch output can be suppressed using
> --no-patch, but other diff formats (namely --raw, --numstat, --shortstat,
> --dirstat, --summary, --name-only, --name-status, --check) are not currently
> implemented.

## Set up

Before using the feature, you'll have to tell git to use built-in Python regex
(or whatever language you use) for diff hunk headers, otherwise the above won't
work properly.

```
# at the root of the repo, in .gitattributes
*.py diff=python eol=lf
```

A more complete `.gitattributes` file may look like this:

```
*.py diff=python eol=lf
*.sh whitespace=indent,trail,space eol=lf
*.md diff=markdown
*.html diff=html
*.css diff=css
Dockerfile.* linguist-language=Dockerfile
*.pdf binary
requirements/*.in linguist-language=Pip-Requirements
requirements/*.txt linguist-language=Pip-Requirements
```

In vim, it's useful to do something like:

```
!git log -L :<funcname>:%
```

Using "%" to avoid having to type in the current file name.
