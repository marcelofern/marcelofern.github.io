2024-05-22

# Scopes

The scope of a name binding (the name that corresponds to a variable, a
function, class, etc.) is the part/area/block of the program where the name
biding is valid.

Scopes can be used to prevent name collisions, as the same name for a variable
might bind to different objects depending on the scope where the variable is
used or assigned.

## Lexical vs Dynamic Scope

In most programming languages, the "part/area/block" of the program where the
scope applies is a portion of the code as seen from the text editor, and is
referred to as "lexical scope" or "static scope".

In other languages, however, the "part/area/block" of the program where the
scope applies is a portion of the run time and is known as "dynamic scope".

When using lexical scope, a name binding is resolved by looking at the local
lexical context, and if that fails, looking at the outer lexical context, so
on so forth.

In dynamic scope, the name binding is resolved by looking at the local
execution context, and if that fails, looking at the outer execution context,
so on so forth.

Lexical context can be known at compile time, and thus can be called "early
binding", whereas the execution context can only be known at runtime and thus
can be called "late binding".

Lexical scope can be easier to reason about than dynamic scope, as a look at
the code from the text editor provides all that is needed, whereas in dynamic
scope, one needs to reason about all the different contexts a piece of code
may be run.

> With dynamic scope, a name refers to execution context. In technical terms,
> this means that each name has a global stack of bindings. Introducing a local
> variable with name x pushes a binding onto the global x stack (which may have
> been empty), which is popped off when the control flow leaves the scope.
> Evaluating x in any context always yields the top binding. Note that this
> cannot be done at compile-time because the binding stack only exists at
> run-time, which is why this type of scope is called dynamic scope.

> (...) Examples of languages that use dynamic scope include Logo, Emacs Lisp,
> LaTeX and the shell languages bash, dash, and PowerShell.

> (...) Dynamic scope is fairly easy to implement. To find an name's value, the
> program could traverse the runtime stack, checking each activation record
> (each function's stack frame) for a value for the name. In practice, this is
> made more efficient via the use of an association list, which is a stack of
> name/value pairs.

[source](http://web.archive.org/web/20240519152822/https://en.wikipedia.org/wiki/Scope_(computer_science))

## Example from the the C standard

The below is from C99 revised in 2007.

> An identifier can denote an object; a function; a tag or a member of a
> structure, union, or enumeration; a typedef name; a label name; a macro name;
> or a macro parameter. The same identifier can denote different entities at
> different points in the program. [...] For each different entity that an
> identifier designates, the identifier is visible (i.e., can be used) only
> within a region of program text called its scope.

