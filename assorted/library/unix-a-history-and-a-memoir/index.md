March 13, 2024

# Review

I have been more interested in the "History of Computing" area in the past year
after I have gone through Alan Turing's annotated papers and some of the old
books about C.

The funny thing is that I know of people who are interested in the history of
wars, countries, economies, empires, religion, etc. But I don't think I have
come across anyone who is interested in the history of computing.

Working in the software world, odds are that I would've found someone by now,
maybe one person or two, but that just doesn't seem to be the case. Either that
or people may be shy about confessing they spend their free time doing more
nerdy stuff.

Anyhow, I came across this book because I was checking what other books Brian
Kernighan had written. He seems to have quite a good reputation around the
community, so it made sense to see what else he had to offer besides the
legendary K&R C programming book.

As it turns out, he's written a fair bit.

This book came in handy as I was already studying some C books and wanted to
know more about how C came about. I was also dabbing in Assembly and read my
first assembly book this year, which opened up a big range of possibilities for
me about what to do next.

This book talks through the history behind Bell Labs from Brian's point of view
but also from some "interviews" he had with other people who were employees at
the lab.

The history of C is very well documented (so is the Bell Lab's one), so here
are a few quotes from the book:

- [Richard Hamming's speach on "You and Your Research"](http://web.archive.org/web/20240407185643/https://www.cs.virginia.edu/~robins/YouAndYourResearch.html)
- [Ken Thompson's on trusting trust - Turing award lecture](http://web.archive.org/web/20240402221452/https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf)
- [Usenix ;login journal](https://www.usenix.org/publications/login)
- [Bell system technical journal on Unix in july 1978](http://web.archive.org/web/20230730005829/https://www.tuhs.org/Archive/Documentation/Papers/BSTJ/bstj57-6-1905.pdf)

> The Unix philosophy, a style of programming, of how to approach a computing
> task, was summarised by Doug McIlroy in his foreword to the special issue of
> the Bell Labs Technical Journal on Unix 1978: (i) Make each program do one
> thing well. To do a new job, build afresh rather than complicate old programs
> by adding new "features". (ii) Expect the output of every program to become
> the input to another, as yet unknown, program. Don't clutter output with
> extraneous information. Avoid stringently columnar or binary input formats.
> Don't insist on interactive input. (iii) Design and build software, even
> operating systems, to be tried early. Ideally within weeks. Don't hesitate to
> throw away the clumsy parts and rebuild them. (iv) Use tools in preference to
> unskilled help to lighten a programming task, even if you have to detour to
> build the tools and expect to throw some of them out after you've finished
> using them.

---

> Arguably, one of the reason why many command names on Unix are short is that
> it took considerable physical force to type on a Model 33, and printing was
> slow.

---

> The first edition of Unix had just over 30 system calls. About half of which
> were related to the file system. Because files contained only uninterpreted
> bytes, the basic file system interface was dead simple. Only five calls to
> open (1) or create (2) a file, read (3) or write (4) its bytes, and close
> (5).

---

> The control flow syntax of the new shell was unusual, since it was based on
> Algol 68. Algol 68 used reversed words as terminators, like `fi` to terminate
> `if` and `esac` to terminate `case`. But since `od` was already taken (for
> the octal dump command), do was terminated by `done`.

---

> The name Lint comes from the image of picking lint off clothing.

---

> At the same time, there was zero, or even negative enthusiasm for the kinds
> of team-building exercises that one often sees today. Most of us saw them as
> artificial, pointless, and a waste of time. It takes effort to build and
> maintain an organisation whose members like and respect each other, and who
> enjoy each other's company. This can't be created by management fiat, nor by
> external consultants. It grows organically from the enjoyment of working
> together, some times playing together, and appreciating what others do well.
