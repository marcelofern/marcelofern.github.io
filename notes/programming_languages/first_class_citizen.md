2024-05-24

# First-class citizen

> In a given programming language design, a first-class citizen[a] is an entity
> which supports all the operations generally available to other entities.

[source](http://web.archive.org/web/20240515144017/https://en.wikipedia.org/wiki/First-class_citizen)

From the SICP book:

> Elements with the fewest restrictions are said to have first-class status.
> Some of the "rights and privileges" of first-class elements are:

> - They may be named by variables.
> - They may be passed as arguments to procedures.
> - They may be returned as the results of procedures.
> - They may be included in data structures.

Further from wikipedia:

> In many older languages, arrays and strings are not first-class: they cannot
> be assigned as objects or passed as parameters to a subroutine. For example,
> neither Fortran IV nor C supports array assignment, and when they are passed
> as parameters, only the position of their first element is actually
> passed—their size is lost. C appears to support assignment of array pointers,
> but in fact these are simply pointers to the array's first element, and again
> do not carry the array's size.

[source](http://web.archive.org/web/20240515144017/https://en.wikipedia.org/wiki/First-class_citizen)

```
| first-class function     | closures and anonymous functions | Smalltalk; Dart; Scheme; ML; Haskell; F#; Kotlin; Scala; Swift; Perl; PHP; Python; Raku; JavaScript; Delphi; Rust |
| first-class control      | continuations                    | Scheme; ML; F#                                                                                                    |
| first-class type         | dependent types                  | Coq; Idris; Agda                                                                                                  |
| first-class data type    |                                  | Generic Haskell; C++11                                                                                            |
| first-class polymorphism | impredicative polymorphism       |                                                                                                                   |
| first-class message      | dynamic messages (method calls)  | Smalltalk; Objective-C; Common Lisp                                                                               |
| first-class class        | metaclass and metaobject         | Smalltalk; Objective-C; Ruby; Python; Delphi; Common Lisp                                                         |
| first-class proofs       | proof object                     | Coq; Agda                                                                                                         |
```
