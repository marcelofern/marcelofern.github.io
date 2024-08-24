# The Dumbest Compiler Imaginable

```
Created at: 2024-08-20
```

> Python is about having the simplest, dumbest compiler imaginable, and the
> official runtime semantics actively discourage cleverness in the compiler
> like parallelizing loops or turning recursions into loops.

− Guido van Rossum (creator of Python). [source](https://books.google.co.nz/books?id=bIxWAgAAQBAJ&pg=PA26&lpg=PA26&dq=%22Python+is+about+having+the+simplest,+dumbest+compiler+imaginable.%22&source=bl&ots=2OfDoWX321&sig=ACfU3U32jKZBE3VkJ0gvkKbxRRgD0bnoRg&hl=en&sa=X&redir_esc=y#v=onepage&q=%22Python%20is%20about%20having%20the%20simplest%2C%20dumbest%20compiler%20imaginable.%22&f=false)

---

This might be a shocking statement to read for someone used to languages that
compile to machine code directly like C, C++, Zig, Rust, etc.

The compiler is, usually, a major source of optimisation for human-written
code, being capable of lexically analysing code and removing unnecessary
computation.

This basically allows developers to write whatever code they think is the most
readable and expressive, while handing over the work of optimising the actual
code to the compiler.

A classic example in C is:

```c
int foo() {
  int bar1 = 42; // Unused variable.
  int bar2 = 100;
  return bar2;
}
```

Which when compiled with the most basic level of optimisation via `gcc -O1`
produces the following assembly code:


```asm
foo:
  mov  eax, 100
  ret
```

The function just returns the value 100. There is no use of the stack to
store values, no load operation to fetch variables, and no other form of
allocations. The compiler is able to reason that the code returns 100 and
thus creates the machine code to do just that.

Compare this with the Python function below:

```python
def foo():
    bar1 = 42
    bar2 = 100
    return bar2
```

Which returns the following bytecode via `dis.dis(foo)`.

```
LOAD_CONST               1 (42)
STORE_FAST               0 (bar1)
LOAD_CONST               2 (100)
STORE_FAST               1 (bar2)
LOAD_FAST                1 (bar2)
RETURN_VALUE
```

The `bar1` variable hasn't been discarded, even though it hasn't been used by
the code. A full description of Python opcodes is provided in the official
documentation
[(source)](http://web.archive.org/web/20240820032050/https://docs.python.org/3/library/dis.html),
but basically the instructions above do:

- **LOAD_CONST**: Pushes the value 42 onto the stack. The big switch case in
  CPython uses this underlying C code:
  ```c
          TARGET(LOAD_CONST) {
              frame->instr_ptr = next_instr;
              next_instr += 1;
              INSTRUCTION_STATS(LOAD_CONST);
              _PyStackRef value;
              value = PyStackRef_FromPyObjectNew(GETITEM(FRAME_CO_CONSTS, oparg));
              stack_pointer[0] = value;
              stack_pointer += 1;
              assert(WITHIN_STACK_BOUNDS());
              DISPATCH();
          }
  ```
- **STORE_FAST**: Pops the last value of the stack (42) into the local variable
  (bar1).
  ```c
        TARGET(STORE_FAST) {
            frame->instr_ptr = next_instr;
            next_instr += 1;
            INSTRUCTION_STATS(STORE_FAST);
            _PyStackRef value;
            value = stack_pointer[-1];
            SETLOCAL(oparg, value);
            stack_pointer += -1;
            assert(WITHIN_STACK_BOUNDS());
            DISPATCH();
        }
  ```
- **LOAD_FAST**: Pushes a reference to bar2 onto the stack.
  ```c
        TARGET(LOAD_FAST) {
            frame->instr_ptr = next_instr;
            next_instr += 1;
            INSTRUCTION_STATS(LOAD_FAST);
            _PyStackRef value;
            assert(!PyStackRef_IsNull(GETLOCAL(oparg)));
            value = PyStackRef_DUP(GETLOCAL(oparg));
            stack_pointer[0] = value;
            stack_pointer += 1;
            assert(WITHIN_STACK_BOUNDS());
            DISPATCH();
        }
  ```
- **RETURN_VALUE**: pops the stack, returning the value (bar2) back to the
  caller. (C code is too long to add here).

Note that those operations aren't light on CPU time nor on store/loads. But,
that is Python, so there's no much we can do there.

As comparison, this is what a function returning 100 would do:

```python
def foo():
    return 100
```

```
RETURN_CONST             1 (100)
```

In theory, a bytecode optimiser could generate the disassembled version of our
code above once it analysed the function to always return the same constant
value. This type of optimisation is called [Peephole
Optimisation](http://web.archive.org/web/20240820050751/https://en.wikipedia.org/wiki/Peephole_optimization),
a term coined back in 1965.

The problem of optimising the snippet above seems simple, but one immediate
problem is Python's dynamic-typed nature. It isn't trivial to know whether an
operation has been overloaded or not, but if we could tell the compiler
"I haven't overloaded anything for these classes" we could possibly have some
nice optimisations.

An [interesting paper](https://legacy.python.org/workshops/1998-11/proceedings/papers/montanaro/montanaro.html) from 1998 has a lot to say about optimising Python bytecode.

For example, one snippet provided in the paper above talks about a common
unpacking pattern:

```python
a,b,c = 1,2,3
```

Which in current versions of Python generates the bytecode:

```
LOAD_CONST               0 ((1, 2, 3))
UNPACK_SEQUENCE          3
STORE_NAME               0 (a)
STORE_NAME               1 (b)
STORE_NAME               2 (c)
RETURN_CONST             1 (None)
```

Which is less desirable than the code:

```python
a = 1
b = 2
c = 3
```

Which skips the tuple allocation and unpacking overhead, dealing with variables
directly stored in the stack:

```
LOAD_CONST               0 (1)
STORE_NAME               0 (a)
LOAD_CONST               1 (2)
STORE_NAME               1 (b)
LOAD_CONST               2 (3)
STORE_NAME               2 (c)
```

Interestingly, Python tuples are immutable, and thus can be loaded as
constants. That's why the LOAD_CONST opcode managed to load the three values
in one chunk.

There are several other examples of optimisation opportunities, but the key
question is: *Why isn't CPython already doing those*?

Guido's quote provided at the top of this post isn't sufficient to elucidate
what perks we are getting from having an unoptimised bytecode compiler. One
obvious one is maintainability. A dumb compiler is way easier to maintain and
change than a smart compiler that optimises a lot.

I know that compiler experts will say that provided the right compiler
architecture, pattern-matching optimisation becomes easy as such optimisations
can be injected as "plugins". Since I am not a compiler expert I have no
way to validate this idea. All I have is Guido's quote.

I am not particularly found on having simplicity on the compiler at the expense
of all Python programs being slowed down because of it. But maybe if Python had
an optimiser for bytecode, Python wouldn't have existed in the first place.

It seems like the tides have been changing though as Python 3.13 will get a
[JIT](http://web.archive.org/web/20240718182110/https://tonybaloney.github.io/posts/python-gets-a-jit.html).

Another perk from a dumb compiler is debugging. Written Python code directly
translates into bytecode, and thus we can do this:

```python
def foo():
    a = 10
    breakpoint()
    b = 20
    return b
```

In the process of debugging we know that the variable `a` is there and won't
be optimised away. However... This is a bit of a straw man argument as we
could generate the bytecode with different levels of optimisation as in
`gcc`'s -O1, -O2, and -O3, thus using a lower level of optimisation when
debugging.

---

## Pypy

Pypy only has a couple of special bytecodes on top of what CPython already has,
and Pypy in general doesn't perform a lot of bytecode optimisations either.

But there are two interesting opcodes that make a significant difference on a
program's performance. For the following code:

```py
class Foo:
    def bar(self, x: int, y: int) -> int:
        return x + y


foo = Foo()
x = 1
y = 2
```

Running this function call on the CPython interpreter:

```python
# Runs foo.bar(x, y) bytecode.
dis.dis(lambda: foo.bar(x, y))
```

Gives me the bytecode:

```
LOAD_GLOBAL              0 (foo)
LOAD_ATTR                3 (NULL|self + bar)
LOAD_GLOBAL              4 (x)
LOAD_GLOBAL              6 (y)
CALL                     2
RETURN_VALUE
```


Whereas in Pypy we have:

```
LOAD_GLOBAL              0 (foo)
LOAD_METHOD              1 (bar)
LOAD_GLOBAL              2 (x)
LOAD_GLOBAL              3 (y)
CALL_METHOD              2
RETURN_VALUE
```

Both have 6 bytecode instructions each, but the first difference is that Pypy
uses its special `LOAD_METHOD` opcode instead of a `LOAD_ATTR` instruction.

The `LOAD_METHOD` pushes two values to the stack instead of one. It passes the
unbounded Python function object (Foo.bar) and the object itself (foo).

The `CALL_METHOD` (which received a parameter of N = 2) will pop the two
variables from the stack (x, y) as well as the "self" argument for the
unbounded function ("foo") and call `Foo.bar(self, x, y)`.

To understand why this optimises the underlying code one must understand
the difference between bound and unbound methods in Python.

```python
# Using the object.
print(foo.bar)
>> <bound method Foo.bar of <__main__.Foo object at 0x7646b4648bf0>>

# Using the class.
print(Foo.bar)
>> <function Foo.bar at 0x7646b46972e0>
```

The first case where the function `bar` comes from an instantiated object is
called "bounded", because that function is linked to the object and thus has a
"self" variable bounded to it.

The second case, where we use the `Foo` class, the function `bar` is not
bounded as it didn't come from an instantiated object and thus does not have a
`self` object. Trying to call it will result in error:

```python
>>> Foo.bar(x=1, y=2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Foo.bar() missing 1 required positional argument: 'self'
```

However, you can do this:

```python
>>> Foo.bar(self=foo, x=1, y=2)
3
```

So **why is the original LOAD_ATTR** instruction a problem?

The problem comes from the performance penalty imposed by creating bounded
methods and calling them.

CPython creates bounded methods on demand. I.e., every time the bounded method
is needed for the first time, it is initialised and allocated in memory right
there.

```
>>> obj_1 = Foo()
>>> obj_2 = Foo()
>>>
>>> obj_1.bar is obj_2.bar
False
>>> obj_1.bar == obj_2.bar
False
>>> obj_1.bar
<bound method Foo.bar of <__main__.Foo object at 0x7646b49ebf80>>
>>> obj_2.bar
<bound method Foo.bar of <__main__.Foo object at 0x7646b49e8320>>
```

Note how the addresses of `obj_1.bar` and `obj_2.bar` are different. CPython
will create instances of those bound methods for each object before it can call
the bounded `.bar` function (allocation on demand). However, Pypy will use the
stack to cache the unbounded method, and call it with the "self" object that is
stored in the stack already, so that there is no overhead of allocation and
creation of bounded methods when an object function needs to be called. It
operates similarly to `Foo.bar(self=obj, x=1, y=2)`.

This strategy provides a considerable performance improvement for heavily OOP
programs. According to Pypy:

> Another optimization, or rather set of optimizations, that has a uniformly
> good effect are the two ‘method optimizations’, i.e. the method cache and the
> LOOKUP_METHOD and CALL_METHOD opcodes. On a heavily object-oriented benchmark
> (richards) they combine to give a speed-up of nearly 50%, and even on the
> extremely un-object-oriented pystone benchmark, the improvement is over 20%.

[source](http://web.archive.org/web/20240222082516/https://doc.pypy.org/en/latest/interpreter-optimizations.html)

## Outro

It is important to note that there have been many attempts to make Python
faster, many of which have failed [[1](https://peps.python.org/pep-3146/)]
[[2](https://github.com/pyston/pyston)].

As much as it would be nice to have another Python interpreter fully JIT'ed and
full of bytecode optimisations, in reality it is really hard to compete against
CPython. Many 3rd-party libraries use CPython's C-extensions directly, which
aren't necessarily available in other Python interpreters (excluding some
forks), rendering such libraries unusable.

It might be too far to say that Python is a mono-implementation language, but
it does feel like it. If a fork is successful it may be merged up-stream
instead of remaining a fork. If the interpreter itself is built without
CPython's C-extensions in mind, it will not provide a rich ecosystem for all
the performance-dependent 3rd-party libs out there and will thus probably be
less used.
