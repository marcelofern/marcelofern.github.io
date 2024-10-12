# Refactoring

```
Created at: 2024-10-13
```

## Good things about this book

This is a book that helps you build a vocabulary of refactoring techniques.

If you are intuitively good at refactoring but struggle to explain your ideas
during code reviews or sell them to your organisation, this book may help.

The first 3 chapters are recommended to read as they give a holistic overview
of the process of refactoring. Chapter 4 is about testing, and if you already
know the benefits of testing I advise you skip it.

The rest of the book presents the catalogue of different refactoring techniques
and when to use them. There are 7 chapters that split the catalog into
different areas. You don't need to read them all. You can just check the
headers and basic ideas and come back to them once you have use for the
techniques in practice.

The name of the techniques presented in the catalogue are almost always
self-descriptive, making the catalogue a useful searching tool. For example,
the technique "extract function" explains how to extract a smaller function out
of a larger function. The "extract variable" and "inline function" are also
self-descriptive in the same way. This makes the book a great reference tool.

## Not so good things about this book

I've picked this book for a second read on 2024-10-10. I have attempted to
start this book once before. I gave up because I thought the first refactoring
example seemed to have left the code in worse shape and in performance.

The author explained:

> Let me pause for a bit to talk about what I’ve just done here. Firstly, I
> know readers will again be worrying about performance with this change, as
> many people are wary of repeating a loop. But most of the time, rerunning a
> loop like this has a negligible effect on performance.
> If you timed the code before and after this refactoring, you would probably
> not notice any significant change in speed—and that’s usually the case. Most
> programmers, even experienced ones, are poor judges of how code actually
> performs.
> Many of our intuitions are broken by clever compilers, modern caching
> techniques, and the like. The performance of software usually depends on just
> a few parts of the code, and changes anywhere else don’t make an appreciable
> difference. But “mostly” isn’t the same as “alwaysly.” Sometimes a
> refactoring will have a significant performance implication. Even then, I
> usually go ahead and do it, because it’s much easier to tune the performance
> of well­factored code. If I introduce a significant performance issue during
> refactoring, I spend time on performance tuning afterwards. It may be that
> this leads to reversing some of the refactoring I did earlier— but most of
> the time, due to the refactoring, I can apply a more effective performance­
> tuning enhancement instead. I end up with code that’s both clearer and
> faster.

This type of refactoring makes it easier to apply performance enhancements
later, the author claims. However, I wasn't convinced without further
explanation. On my second read I still didn't find explanations about why this
type of refactoring would lead to easier-to-address performance issues.

Duplicating a loop can cause bad performance when the underlying code calls
an external service such as a database. Many N+1-like problems are rooted in
these types of changes.

Turning a big function into several smaller ones can make it harder to analyse
which part of the code is **really** responsible for the bottleneck.

With lots of small functions, you have the benefit of seeing precisely which
one is the slowest one from a profiler. However, the offending function may be
in a chain of 20 functions, and the top ones may be the ones that actually
matter. Fixing the top-of-the-chain function may now culminate on changing 20
other functions. Of course, this is just an illustrative example and it might
be harder/easier to fix the problem depending on the situation.

I am not arguing that these refactors are bad and you should never do them.
Much the opposite, they are good most of the time. I think that the problem is
that the author puts performance aside too quickly. The author could, instead,
spend just a few extra pages to contextualise and give examples why performance
can be easier to address *after* a refactor.

Arguably, there is a 3-page sub-section on chapter 2 that touches on this. But
it only chucks performance aside once more promoting the false idea that
changes that make the program run faster make the program harder to work with.

## Quotes

There were some interesting quotes from the book that I pulled down below:

### Understanding through refactoring

> As is often the case with refactoring, the early stages were mostly driven by
> trying to understand what was going on. A common sequence is: Read the code,
> gain some insight, and use refactoring to move that insight from your head
> back into the code. The clearer code then makes it easier to understand it,
> leading to deeper insights and a beneficial positive feedback loop.

> Refactoring is all about applying small behavior­preserving steps and making
> a big change by stringing together a sequence of these behavior­preserving
> steps. Each individual refactoring is either pretty small itself or a
> combination of small steps. As a result, when I’m refactoring, my code
> doesn’t spend much time in a broken state, allowing me to stop at any moment
> even if I haven’t finished.

### Commit etiquette

> One bit of advice I’ve heard is to separate refactoring work and new feature
> additions into different version­control commits. The big advantage of this
> is that they can be reviewed and approved independently. I’m not convinced of
> this, however. Too often, the refactorings are closely interwoven with adding
> new features, and it’s not worth the time to separate them out. This can also
> remove the context for the refactoring, making the refactoring commits hard
> to justify. Each team should experiment to find what works for them; just
> remember that separating refactoring commits is not a self­evident
> principle—it’s only worthwhile if it makes life easier.

### Code ownership

> Code ownership boundaries get in the way of refactoring because I cannot make
> the kinds of changes I want without breaking my clients. This doesn’t prevent
> refactoring— I can still do a great deal—but it does impose limitations. When
> renaming a function, I need to use Rename Function (124) and to retain the
> old declaration as a pass­through to the new one. This complicates the
> interface—but it is the price I must pay to avoid breaking my clients. I may
> be able to mark the old interface as deprecated and, in time, retire it, but
> sometimes I have to retain that interface forever.

### On legacy code

> If you have a big legacy system with no tests, you can’t safely refactor it
> into clarity. The obvious answer to this problem is that you add tests. But
> while this sounds a simple, if laborious, procedure, it’s often much more
> tricky in practice. Usually, a system is only easy to put under test if it
> was designed with testing in mind—in which case it would have the tests and I
> wouldn’t be worrying about it.

### On coverage

> Don’t let the fear that testing can’t catch all bugs stop you from writing
> tests that catch most bugs.

### On inlining and too-much redirection

> One of the themes of this book is using short functions named to show their
> intent, because these functions lead to clearer and easier to read code. But
> sometimes, I do come across a function in which the body is as clear as the
> name. Or, I refactor the body of the code into something that is just as
> clear as the name. When this happens, I get rid of the function. Indirection
> can be helpful, but needless indirection is irritating. I also use Inline
> Function is when I have a group of functions that seem badly factored. I can
> inline them all into one big function and then reextract the functions the
> way I prefer.
