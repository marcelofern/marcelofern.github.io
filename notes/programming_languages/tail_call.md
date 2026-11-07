2024-05-22

# Tail call

If in the body of a function the last step is to call another function, this
last function call is called *tail call*.

If the tail call function is the same as the function that called it, then
the function is a tail-recursive function.

It is possible to optimise a tail-call to keep using the same stack frame
instead of creating a new one for each tail call (some small modifications
might be needed). This process is called "tail-call elimination" or "tail-call
optimisation" and is often used in functional programming languages.

> Tail-call elimination often reduces asymptotic stack space requirements from
> linear, or O(n), to constant, or O(1)

[source](http://web.archive.org/web/20240515122603/https://en.wikipedia.org/wiki/Tail_call)
