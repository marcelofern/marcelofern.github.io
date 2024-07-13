# A Critique of SOLID

```
Created: 2023-04-15
Updated: 2024-07-06
```

## Introduction

SOLID is an acronym coined by Robert C. Martin (also known as uncle Bob),
particularly focused at making Object Oriented Programming designs easier to
understand, maintain, and adapt.

The [original paper (archived)](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf)
introducing the term in 2000 is a quick read worth checking, even if only for
historical context.

Before the paper starts to talk about SOLID, it mentions the 4 symptoms of
"rotting software" (a very popular term between 1998-2006 according to
google ngram). Those 4 symptoms are: **rigidity**, **fragility**,
**immobility** and **viscosity**.

It is important to know what those terms mean, because they are the reason that
SOLID principles exist in the first place. Here is a brief summary:

- Rigidity: How difficult it is to change the code.
- Fragility: How easy it is to break the code.
- Immobility: How hard it is to reuse existing code.
- Viscosity: How hard it is to preserve the existing design of code when
  developing new changes.

The general expectation set by Robert C. Martin is that if you follow the SOLID
principles your code will experience less software rot.

## SOLID

The 5 principles of object oriented **class** design (as called by the paper),
are:

- **S**ingle responsibility principle.
- **O**pen-closed principle.
- **L**iskov substitution principle.
- **I**nterface segregation principle.
- **D**ependency inversion principle.

My plan is to analyse each of them critically, understanding their weaknesses
and providing evidence to counter their adoption.

### The Open Closed Principle (OPC)

According to Martin this is the most important principle, and we will start
with it. Here is its definition:

> A module should be open for extension but closed for modification.

This sounds simple and reasonable. Perfect code that addresses a particular
problem is only needed to be written once. To address further problems, this
perfect code doesn't need to change, but only be *extended*.

When developers keep this in mind, they try to produce perfect code that can be
extended whilst keeping its original elegance and efficiency. If that's
materialised, the developer can be said to be following the OPC principle.

You probably can see where this is going by my wording ("perfect code",
whatever that actually means). But let's not diverge from the theme just yet,
we will go through an example of code provided by Martin that violates the OPC
principle:

```cpp
struct Modem {
    enum Type {hayes, courrier, ernie) type;
};

struct Hayes {
    Modem::Type type;
    // Hayes related stuff
};

struct Courrier {
    Modem::Type type;
    // Courrier related stuff
};

struct Ernie
{
    Modem::Type type;
    // Ernie related stuff
};

void LogOn(Modem& m, string& pno, string& user, string& pw) {
    if (m.type == Modem::hayes)
        DialHayes((Hayes&)m, pno);
    else if (m.type == Modem::courrier)
        DialCourrier((Courrier&)m, pno);
    else if (m.type == Modem::ernie)
        DialErnie((Ernie&)m, pno)
    // ...you get the idea
}
```

The `LogOn` function violates Martin's OPC because its inner code needs to
change every time a new modem is added. Moreover, every modem type depends on
the `struct Modem`. Therefore if we need to add a new type of modem to that
struct, all the existing modems need to be recompiled.

So how do we make this code better? According to Martin:

> Abstraction is the key to the OCP

There're a few possible abstraction techniques that conform to OPC. Let's
follow the first one Martin provides, **Dynamic Polymorphism**.

#### Dynamic Polymorphism

In Object Oriented Programming this means we will have an abstract class with
abstract methods (virtual functions), and concrete child classes implementing
the actual code for each method.

Here the word "Dynamic" means that the form (concrete class implementation) is
found during run time. Putting it all together and rewriting the code above, we
end up with something like the example provided in Martin's paper:

```cpp
class Modem {
public:
    virtual void Dial(const string& pno) = 0;
    // other virtual methods here, you get the idea.
};

void LogOn(Modem& m, string& pno, string& user, string& pw) {
    m.Dial(pno);
    // you get the idea.
}
```

Now the class `Modem` is closed for modification when we need to add new types
of modems. To use the LogOn function, you need code like this:

```cpp
class Hayes : public Modem {
public:
    virtual void Dial(const std::string& pno) {
        // do something...
    }
};


int main() {
    Hayes hayes = Hayes();
    string pno = "1";
    LogOn(hayes, pno);
}
```

Now that we see the whole picture we can tell that the function `LogOn` calls
the method `Dial` on the child instance. This child instance is only
available at runtime. Note that Martin omits this initialisation code in his
original paper. He also does not discuss the downsides of this approach.

However, I don't think we should toss this example away too quickly.

We know for a fact that when types are only resolved at runtime our code
becomes slower. But why? For each class that inherits virtual functions the
compiler creates a `vtable`. A `vtable` is essentially a table of function
pointers. When an object is created at runtime, a pointer to its vtable is
added to its memory layout, and when a virtual function is called on this
object, the code looks at the appropriate function pointer on the object vtable
and then calls the function through that pointer.

This all means that by using **Dynamic polymorphism** our code requires
an additional level of indirection for *each* virtual function call, and the
memory footprint of objects will increase program memory usage too.

Furthermore, the given example is a simplistic one. In cases where dynamic
polymorphism is overused, the code may have convoluted inheritance
hierarchies. Such complexity impairs compiler optimization as virtual function
calls aren't assignable until runtime.

You might be thinking that the code above looks clean and that there's no
reason to not do it. After all, reduced performance and more memory usage is
a fair price to pay for cleaner code,  right? Well. What if we didn't have
to pay this price and still have "clean code"?

We will get there, but to keep things fair we need to go through another
abstraction example given by Martin.

#### Static Polymorphism

What if there was a way to have something similar to Dynamic Polymorphism but
without the runtime overhead, with more compiler optimisation, and more
control over object types? Here is where static polymorphism comes handy.

**Static** here means that the child type will be defined at compile time. But
how? The answer is by using generic programming templates.

```cpp
template <typename MODEM>
void LogOn(MODEM& m, string& pno, string& user, string& pw) {
    m.Dial(pno);
    // you get the idea.
}
```

This looks alright, but is this a real improvement? What is the trade off?

Each time a template is instantiated a new copy of the code is created. This
is how compilers make generic programming type-safe at compiling time. The more
instantiations your code has, the larger your executable becomes, and the
longer compilation takes.

This all means that we are trading runtime performance for compile time
performance. It might be OK to do so in certain applications, but what if we
didn't have to?

#### Addressing the open-closed principle

Martin's original argument stressed the following:

1. The dependency between the Modem struct and its implementation structs is
   bad.

My problem with this assertion is that it sounds like a straw man fallacy. You
absolutely don't need to create one struct for each type of modem. Let's fix
the example:

```cpp
enum ModemType { HAYES, COURRIER, ERNIE };

struct Modem {
    ModemType type;
    // other attributes, you get the idea.
};

void LogOn(Modem& m, string& pno) {
    switch (m.type) {
        case ModemType.HAYES:
            // do something with hayes
        case ModemType.COURRIER:
            // do something with courrier
        // ...you get the idea
    }
}
```

1. Now the compiler knows all the code paths the code goes through at compiling
   time. Code can easily be optimised.
2. No layers of indirection and thus no performance costs at runtime.
3. No memory overhead.
4. No executable size overhead.
5. Less lines of code.

Is the code above objectively bad? Is it difficult to read? I could argue that
any CS student could make sense of this code in a very short amount of time.

The idea behind polymorphism is that it makes code flexible and easier to read.
However, the flexibility of using virtual functions can be costly as we have
seen. If you don't know whether you need that flexibility yet, you will be
imagining future use cases that *may* use your code. If this flexibility ends
up not being needed, the programmer has fundamentally over-scoped their own
code and caused unnecessary memory and CPU degradation to their program with no
added benefit.

Here is where the trade-off lies. Imagine that you need to add a new type of
modem. Using the `switch` above you'd have to change the LogOn function and
recompile it. You will also need to recompile everything that depends on the
LogOn function, and that can be a lot. If you were using polymorphism, you just
needed to add a new type (potentially in a new file), and you would need to
only compile one single file plus the place where it is instantiated (and
everything that depends on that).

But what if you need to add new functionality in the abstract class? In the
polymorphism case you'd need to add a new function for every single type, and
that would induce a lot of recompilation across the project for a fairly use
piece of code.

Differently, in the `switch` case, you could add a new function (potentially in
a new file) and you only need to compile that one single file.

Someone might argue that a potential downside from the `switch` approach is
that when a new type of Modem is added, you need to track all the functions
that have a `switch (m.type)` to change their code, and this can induce human
error.

I would tend to agree. However, compiler warnings will let you know of all
these use cases that are missing a switch handle. For example:

```c
#include <stdio.h>

enum ModemType { HAYES, COURRIER, ERNIE };

struct Modem {
    enum ModemType type;
};

void LogOn(struct Modem* m) {
  switch (m->type) {
    // Note how we are only handling HAYES and
    // forgot to handle COURRIER and ERNIE.
    case HAYES:
      printf("LogOn HAYES");
      break;
  }
}

int main() {
  struct Modem m = {HAYES};
  LogOn(&m);
  return 0;
}
```

If I try to run this code with:

```sh
gcc -Wall <file_name> -o /tmp/a.o
```

I get the following error:

```c
/tmp/main.c: In function ‘LogOn’:
/tmp/main.c:10:3: warning: enumeration value ‘COURRIER’ not handled in switch [-Wswitch]
   10 |   switch (m->type) {
      |   ^~~~~~
/tmp/main.c:10:3: warning: enumeration value ‘ERNIE’ not handled in switch [-Wswitch]
```

In other words, the compile catches this mistake for us.

In conclusion, this design choice will determine what will be easier and what
will be harder for your program. Ask yourself the question: "Do I want it to be
easier to add more functionality to my program, or do I prioritise adding more
types?". The answer will dictate what is best for your situation.

Polymorphism isn't a silver bullet that will always make your code OPC
compliant. In fact, the more functional your code looks like, the greater the
penalty of using polymorphism.

In my professional experience, I spend much more time adding new functionality
to existing software than I spend adding new types. So for me, it would be
inadequate to prefer an architecture that focuses on types.

### The Liskov Substitution Principle (LSP)

This principle states that an object (such as an abstract class), may be
replaced by a sub-object (such as a child class) without breaking the program.

This means that if we have a function `foo(Parent bar)`, we should also be
able to call foo as `foo(Child bar)` without altering the correctness of the
program.

Martin uses an example of a parent class called `Ellipse` and a child class
called `Circle`. As every circle is an ellipse with a very particular
configuration, this sounds about right. However, Martin only uses this example
to stress that it is an inheritance *bad* practice.

```cpp
void f(Ellipse& e) {
    Point a(-1,0);
    Point b(1,0);
    e.SetFoci(a,b);
    e.SetMajorAxis(3);
    assert(e.GetFocusA() == a);
    assert(e.GetFocusB() == b);
    assert(e.GetMajorAxis() == 3);
}
```

The function `f` above, for example, can't receive a `Circle` instead of an
`Ellipse`. Reason being that the method `setFoci` will alter the circle and
turn it into an ellipse. This can become a subtle bug in the application code.

A safe option is for the `Circle::SetFoci` method to add an extra validation,
asserting that `a == b`. This violates LSP. The child object now has an extra
restriction that the parent object doesn't. Martin concludes that:

> derived methods should expect no more and provide no less.

I don't have much to critique about this principle itself. To be honest it
sounds alright to me. However, this is only **one more thing** to remember when
you're using polymorphism, which contributes as a **negative** to the OPC
principle through abstraction that we discussed above.

Apart from performance and memory degradation, the programmer also has to worry
about loose/tight contracts between the parent and the child. This means that
the functionality may not work that well if the type implementation is
faulty.

Martin himself comments that LSP violation can be costly. If the interface is
being used in many different places, the cost of repairing this violation might
be too much to take. A possible solution, as stated by Martin, is to provide an
`if/else` statement to make sure the Ellipse is indeed an Ellipse.

Another problem of this type of polymorphism is that the Circle object is way
simpler than an Ellipse. This means that the Circle class will inherit many
methods that it doesn't need to use, generating **method spam**. This violates
another principle of SOLID, the Interface Segregation Principle that we will
look into later on.

## The Dependency Inversion Principle (DIP)

> Depend upon Abstractions. Do not depend upon concretions.

In essence, this principle means that code in high level modules should not
depend on code in low level modules. High level modules are usually top
abstractions that express the policies of the application, whereas low level
modules contain the implementation details. In other words, the abstraction
should not worry about the implementation.

By inverting the dependency, i.e., making the low level modules depend on the
high ones and not the opposite, a developer will be DIP complaint.

You might be noticing a trend now. Most of these SOLID rules are greatly
related to polymorphism. After all, they were created for OOP. As I feel like I
have addressed the main trade-off in that approach, I could easily end up
repeating myself here. Let's proceed nonetheless :')

Inverting dependencies in a codebase must be seen as a trade-off. As now your
abstraction can be changed without having to worry about the implementation
details, you can't change the implementation details without having to worry
about the abstraction. This means that if the interface changes often, it will
be harder to manage the concrete implementations.

More over, classes that could simply be a concrete implementation alone, with
no dependency on a high-level interface, now may have an artificial interface
so that this principle isn't violated. This usually happens because "you never
know whether another concrete implementation that needs to use the interface
might come about". One regular example is an interface `ShipmentPolicy` which
has **only one** concrete implementation, often called `ShipmentPolicyImpl`.
One could say that this is a code redundancy.


## The Interface Segregation Principle (ISP)

ISP states that no code should depend on methods it does not use. This implies
having smaller interfaces so that clients that depend on them only need to know
a few relevant methods.

This idea sounds reasonable, and it's a way of controlling inheritance method
spam when inheriting from bloated interfaces. But I think this technique is
more of a refactoring tool rather than a principle itself.

Treating ISP as a principle can add unnecessary complexity. You should design
your code to solve the problem at hand rather than worrying about whether your
interface will become too bloated in future when more use cases are added. As
you don't know how your codebase will progress in future, you shouldn't make
compromises from early on. If an interface grew too much, and **now** you have
legitimate reason to split it into smaller ones, then go and refactor it.

As all the other principles we have discussed so far, take ISP as a
trade-off instead of a principle.

Here are a few quotes from the Code Complete book that are relevant for the
matter:

> If the derived class isn't going to adhere completely to the same interface
> contract defined by the base class, inheritance is not the right
> implementation.

> Be suspicious of base classes of which there is only one derived class.

## Single Responsibility Principle (SRP)

This principle wasn't included in the original publication I linked above, and
more details can be found in this blog post from [clean
coder](http://web.archive.org/web/20240328163818/https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html).

This principle builds up on the "Separation of Concerns" term that was
popularised in a famous article "On the role of scientific thought" by Dijkstra
[source](http://web.archive.org/web/20221104003446/https://www.cs.utexas.edu/~EWD/ewd04xx/EWD447.PDF)

The principle can be summarised as:

> The Single Responsibility Principle (SRP) states that each software module
> should have one and only one reason to change.

The definition lacks specification and my major criticism here is the
specification itself. What is a reasonable "reason to change"?

Martin gives more information on the blog post linked about, saying:

> Imagine you took your car to a mechanic in order to fix a broken electric
> window. He calls you the next day saying it’s all fixed. When you pick up
> your car, you find the window works fine; but the car won’t start. It’s not
> likely you will return to that mechanic because he’s clearly an idiot.
> ...
> That’s how customers and managers feel when we break things they care about
> that they did not ask us to change.
> ...
> Another wording for the Single Responsibility Principle is:
> Gather together the things that change for the same reasons. Separate those
> things that change for different reasons.
> ...
> However, as you think about this principle, remember that the reasons for
> change are people. It is people who request changes. And you don’t want to
> confuse those people, or yourself, by mixing together the code that many
> different people care about for different reasons.

I agree that mixing code from different teams with different responsibilities
isn't ideal. I would call that unnecessary coupling.

It is obviously bad, for example, for a change in a back-end billing engine of
a bank to affect its front-end application and display data in a different
format.

Although I think that the definition isn't ideal, the principle here does sound
like the most reasonable in the list.

## Conclusions

In my opinion, those shouldn't be called "principles". The word _principle_ as
it is defined below should be reserved for terms that are really hard to
debunk:

> Principle: a fundamental truth or proposition that serves as the foundation
> for a system of belief or behaviour or for a chain of reasoning. "the basic
> principles of justice"

Most of what we have seen here fit within the saying "different horses for
different courses". I do appreciate that when those principles were written
OOP was all the rage and many people were investing resources in it and many
books were written. So I can accept that they were the single truth at the
time.

However, having many decades passed since the inception of those principles,
many other things have improved in the industry. I feel like we have moved
forward as a whole.

OOP is not considered **the only way** of developing any more, though still
very popular. Polymorphism, inheritance, and most importantly multi-level
inheritance is seen with bad eyes. More and more people have come to appreciate
composition over inheritance.

The classic book example of inheritance Shape->Ellipsis->Circle is very hard to
derive in the real world in a non-forceful way. Inheritance and thus
polymorphism has become a way of getting generic functionality from parent
classes **instead of sharing identities** between classes of the same base
implementation, and thus much tangled code has been created so that unrelated
classes could get the same shared behaviour. I feel like a lot of people
nowadays have scars to prove that.

Nonetheless, I feel positive that Martin has created these principles even
though I don't agree with them fully. It is easy to look back on the past and
point fingers about decisions that don't apply to the present. I think that
overall the popularity of SOLID and the outcome of having more people thinking
about designs and their own set of principles is a positive thing.
