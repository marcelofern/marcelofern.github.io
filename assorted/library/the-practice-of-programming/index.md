# Review

```
Created at: 2024-07-20
```

I've been meaning to read other books from Kernighan for a while after reading
K&R's C programming book and "Unix a Memoir". The rational is simple: I like
his direct and simple writing and he has worked with some very important
historical figures in computer science. Also Rob Pike, who co-authored this
book, is known for his work on the Go language, and before that, for working at
Bell Labs.

This book is relatively old (1999), but I had a sense that much of the advice
would still be relevant. That was correct. I would put this book in the
"Classics" category of Computer Science for sure.

## Summary Page

This is the last page of the book, which summarises the advice:


- Style Use descriptive names for globals, short names for locals.
- Be consistent.
- Use active names for functions.
- Be accurate.
- Indent to show structure.
- Use the natural form for expressions (no double negation).
- Parenthesize to resolve ambiguity.
- Break up complex expressions.
- Be clear.
- Be careful with side effects.
- Use a consistent indentation and brace style.
- Use (language) idioms for consistency.
- Use else-ifs for multi-way decisions.
- Avoid function macros.
- Parenthesize the macro body and arguments.
- Give names to magic numbers.
- Define numbers as constants, not macros.
- Use character constants, not integers.
- Use the language to calculate the size of an object.
- Don’t belabor the obvious.
- Comment functions and global data.
- Don’t comment bad code, rewrite it.
- Don’t contradict the code.
- Clarify, don’t confuse.
- Interfaces Hide implementation details.
- Choose a small orthogonal set of primitives.
- Don’t reach behind the user’s back.
- Do the same thing the same way everywhere.
- Free a resource in the same layer that allocated it.
- Detect errors at a low level, handle them at a high level.
- Use exceptions only for exceptional situations.
- Debugging Look for familiar patterns.
- Examine the most recent change.
- Don’t make the same mistake twice.
- Debug it now, not later.
- Get a stack trace.
- Read before typing.
- Explain your code to someone else.
- Make the bug reproducible.
- Divide and conquer.
- Study the numerology of failures.
- Display output to localize your search.
- Write self-checking code.
- Write a log file.
- Draw a picture.
- Use tools.
- Keep records.
- Testing Test code at its boundaries.
- Test pre- and post-conditions.
- Use assertions.
- Program defensively.
- Check error returns.
- Test incrementally.
- Test simple parts first.
- Know what output to expect.
- Verify conservation properties.
- Compare independent implementations.
- Measure test coverage.
- Automate regression testing.
- Create self-contained tests.
- Performance Automate timing measurements.
- Use a profiler.
- Concentrate on the hot spots.
- Draw a picture.
- Use a better algorithm or data structure.
- Enable compiler optimizations.
- Tune the code.
- Don’t optimize what doesn’t matter.
- Collect common subexpressions.
- Replace expensive operations by cheap ones.
- Unroll or eliminate loops.
- Cache frequently-used values.
- Write a special-purpose allocator.
- Buffer input and output.
- Handle special cases separately.
- Precompute results.
- Use approximate values.
- Rewrite in a lower-level language.
- Save space by using the smallest possible data type.
- Don’t store what you can easily recompute.
- Portability Stick to the standard.
- Program in the mainstream.
- Beware of language trouble spots.
- Try several compilers.
- Use standard libraries.
- Use only features available everywhere.
- Avoid conditional compilation.
- Localize system dependencies in separate files.
- Hide system dependencies behind interfaces.
- Use text for data exchange.
- Use a fixed byte order for data exchange.
- Change the name if you change the specification.
- Maintain compatibility with existing programs and data.
- Don’t assume ASCII.
- Don’t assume English.

The following is a list of highlights from the book that I'll likely reference
again:

## Naming things

> Much information comes from context and scope; the broader the scope of a
> variable, the more information should be conveyed by its name.
> Use descriptive names for globals, short names for locals. Global variables,
> by definition, can crop up anywhere in a program, so they need names long
> enough shorter names suffice for local variables; within a function, n may be
> sufficient, npoints is fine, and numberOfPoints is overkill.

> Use active names for functions. Function names should be based on active
> verbs, perhaps followed by nouns: Functions that return a boolean (true or
> false) value should be named so that the return value is unambiguous.
> Conditional expressions that include negations are always hard to understand
> Use the natural form for expressions. Write expressions as you might speak
> them aloud. Conditional expressions that include negations are always hard to
> understand

## Macros

> Even parenthesizing the macro properly does not address the multiple
> evaluation problem. If an operation is expensive or common enough to be
> wrapped up, use a function.

> Define numbers as constants, not macros. C programmers have traditionally
> used #define to manage magic number values.

> And macros are a dangerous way to program because they change the lexical
> structure of the program underfoot. Let the language proper do the work. In C
> and C++, integer constants can be defined with an enum statement, C also has
> const values but they cannot be used as array bounds, so the enum statement
> remains the method of choice in C.

## Sizeof

> For similar reasons, sizeof(array[0]) may be better than sizeof(int) because
> it’s one less thing to change if the type of the array changes.

> Sizes of data types. The sizes of basic data types in C and C++ are not
> defined; other than the basic rules that sizeof(char) ≤ sizeof(short) ≤
> sizeof(int) ≤ sizeof(long)

## Arrays

> In C and C++, a parameter that is an array of strings can be declared as char
> *array[] or char **array. Although these forms are equivalent, the first
> makes it clearer how the parameter will be used.

## Casting

> The return value of realloc does not need to be cast to its final type
> because C promotes the void* automatically. But C++ does not; there the cast
> is required. One can argue about whether it is safer to cast (cleanliness,
> honesty) or not to cast (the cast can hide genuine errors). We chose to cast
> because it makes the program legal in both C and C++; the price is less
> error-checking from the C compiler, but that is offset by the extra checking
> available from using two compilers.

## Interfaces and Libraries

> This is a pervasive and growing concern in software: as libraries,
> interfaces, and tools become more complicated, they become less understood
> and less controllable. When everything works, rich programming environments
> can be very productive, but when they fail, there is little recourse. Indeed,
> we may not even realize that something is wrong if the problems involve
> performance or subtle logic errors.

> Without these principles, the result is often the sort of haphazard
> interfaces that frustrate and impede programmers every day.

## Global Variables

> Avoid global variables; wherever possible it is better to pass references to
> all data through function arguments.

## Memory and Allocation

> Free a resource in the same layer that allocated it. One way to control
> resource allocation and reclamation is to have the same library, package, or
> interface that allocates a resource be responsible for freeing it. Another
> way of saying this is that the allocation state of a resource should not
> change across the interface. Our CSV libraries read data from files that have
> already been opened, so they leave them open when they are done. The caller
> of the library needs to close the files.

> A few machines allow ints to be stored on odd boundaries, but most demand
> that an n-byte primitive data type be stored at an n-byte boundary, for
> example that doubles, which are usually 8 bytes long, are stored at addresses
> that are multiples of 8. On top of this, the compiler writer may make further
> adjustments, such as forcing alignment for performance reasons.

## Errors

> Detect errors at a low level, handle them at a high level. As a general
> principle, errors should be detected at as low a level as possible, but
> handled at a high level. In most cases, the caller should determine how to
> handle an error, not the callee.

> Exceptions should not be used for handling expected return values. Reading
> from a file will eventually produce an end of file; this should be handled
> with a return value, not by an exception.

> Exceptions are often overused. Because they distort the flow of control, they
> can lead to convoluted constructions that are prone to bugs. It is hardly
> exceptional to fail to open a file; generating an exception in this case
> strikes us as over-engineering. Exceptions are best reserved for truly
> unexpected events, such as file systems filling up or floating-point errors.

## Follow up Recommendations

> One practical book based on hard-won experience is Large-Scale C++ Software
> Design by John Lakos (Addison-Wesley, 1996), which discusses how to build and
> manage truly large C++ programs. David Hanson’s C Interfaces and
> Implementations (Addison-Wesley, 1997) is a good treatment for C programs.

## Practices

> Read before typing. One effective but under-appreciated debugging technique
> is to read the code very carefully and think about it for a while without
> making changes. There’s a powerful urge to get to the keyboard and start
> modifying the program to see if the bug goes away.

## Portability

> The char type in C and C++ may be signed or unsigned, and need not even have
> exactly 8 bits. Leaving such issues up to the compiler writer may allow more
> efficient implementations and avoid restricting the hardware the language
> will run on, at the risk of making life harder for programmers.

> Brand new features such as // comments and complex in C, or features specific
> to one architecture such as the keywords near and far, are guaranteed to
> cause trouble. If a feature is so unusual or unclear that to understand it
> you need to consult a “language lawyer”—an expert in reading language
> definitions—don’t use it.

## Sign

> Signedness of char. In C and C++, it is not specified whether the char data
> type is signed or unsigned. This can lead to trouble when combining chars and
> ints, such as in code that calls the int-valued routine getchar().

> Even if char is signed, however, the code isn’t correct. The comparison will
> succeed at EOF, but a valid input byte of 0xFF will look just like EOF and
> terminate the loop prematurely. So regardless of the sign of char, you must
> always store the return value of getchar in an int for comparison with EOF.

## Side Effects

> Don’t use side effects except for a very few idiomatic constructions like
> a[i++] = 0;

## Boundaries

> Don’t compare a char to EOF. Always use sizeof to compute the size of types
> and objects. Never right shift a signed value. Make sure the data type is big
> enough for the range of values you are storing in it.

## Preprocessor

> regular if statement with a constant condition may work just as well (as
> ifdef): enum { DEBUG = 0 };
>
>    if (DEBUG) {
>        printf(...);
>    }
> If DEBUG is zero, most compilers won’t generate any code for this, but they
> will check the syntax of the excluded code. An #ifdef, by contrast, can
> conceal syntax errors that will prevent compilation if the #ifdef is later
> enabled.

## \r and \n

> There is one continuing irritation with exchanging text: PC systems use a
> carriage return '\r' and a newline or line-feed '\n' to terminate each line,
> while Unix systems use only newline. The carriage return is an artifact of an
> ancient device called a Teletype that had a carriage-return (CR) operation to
> return the typing mechanism to the beginning of a line, and a separate
> line-feed operation (LF) to advance it to the next line.

## Endianess

> It is not safe to write an int (or short or long) from one computer and read
> it as an int on another computer. For example, if the source computer writes
> with fread(&x, sizeof(x), 1, stdin); the value of x will not be preserved if
> the machines have different byte orders. If x starts as 0x1000 it may arrive
> as 0x0010.
