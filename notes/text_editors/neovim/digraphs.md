# Digraphs

```
Created at: 2025-01-12
```

## Inserting a digraph

A digraph can be written when in INSERT mode by pressing `CTRL+K` followed by
the sequence of characters that produce the digraph.

Examples:

```
Command: CTRL+K 2 2
Result:  ²

Command: CTRL+K a e
Result:  æ

Command: CTRL+K 1 2
Result:  ½
```

## Displaying currently defined digraphs

Prefer `dig!` as it shows headers for better readability.
Otherwise `dig` displays a more cluttered result.

## Help

For general help:

```
:help digraph
:help CTRL-K

:help digraph-table
```
