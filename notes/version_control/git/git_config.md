# git config

```
Created at: 2025-03-08
```

A few notes on having better settings for git.

## Listing Branches

The default way sorting branches for display via `git branch` is alphanumeric.

```sh
git config --global branch.sort -committerdate
```

## Listing Tags

Listing semver tags using alphanumeric ordering can be messy. For example:

```sh
# 101 shouldn't come after 1000
$ git tag
nightly/0.5.100
nightly/0.5.1000
nightly/0.5.1001
nightly/0.5.101
nightly/0.5.1010
```

```sh
git config --global tag.sort version:refname
```

## Pick a Default Branch

It doesn't need to be `main`, but just pick one so that git won't display the
annoying message:

```
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
```

```sh
git config --global init.defaultBranch main
```

## Update The Diff Algorithm

By default git uses the "myers" algorithm. But there are better alternatives.
The "histogram" algorithm is often a better choice.

```sh
git config --global diff.algorithm histogram
```

## Make the diff output for moved code better

When moving code from one place to another, the default is to display the code
as added. But you can colour-code it so that moved code appears different than
new code. For that, you use colorMoved

`diff.colorMoved`: If set to either a valid <mode> or a true value, moved lines
in a diff are colored differently. For details of valid modes see --color-moved
in git-diff(1). If simply set to true the default color mode will be used. When
set to false, moved lines are not colored.

```sh
git config --global diff.colorMoved plain
```

`plain`: Any line that is added in one location and was removed in another
location will be colored with `color.diff.newMoved`. Similarly
`color.diff.oldMoved` will be used for removed lines that are added somewhere
else in the diff. This mode picks up any moved line, but it is not very useful
in a review to determine if a block of code was moved without permutation.

## Better diffs with file renames

`diff.renames`: Whether and how Git detects renames. If set to false, rename
detection is disabled. If set to true, basic rename detection is enabled. If
set to copies or copy, Git will detect copies, as well. Defaults to true. Note
that this affects only git diff Porcelain like git-diff(1) and git-log(1), and
not lower level commands such as git-diff-files(1).

```sh
git config --global diff.renames true
```

## Better diff headers

```sh
git config --global diff.mnemonicPrefix true
```

Instead of showing `a/ b/` in the changes header, it shows `i/ w/` where "i"
is the local index, and "w" is the work tree.

## Better push settings

```sh
# When pushing, push to the current branch with the same name on the remote.
git config --global push.default simple

# If the branch trying to be pushed to doesn't exist in the remote, create it.
git config --global push.autoSetupRemote true
```

## Better "typo" correction

If you typed the wrong git command, git may try to correct it for you by asking
you to prompt `Y/n`:

```sh
git config --global help.autocorrect prompt
```

## Better git commit tips

When running `git commit`, you usually see a "commented out" information about
the files you are including and what they've changed. This change will also
show you the "diff" in that window:

```sh
git config --global commit.verbose true
```

## Outro

Readings:
    - [how git core devs configure git](https://blog.gitbutler.com/how-git-core-devs-configure-git/)
