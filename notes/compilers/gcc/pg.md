# -pg

```
Created at: 2024-10-21
```

From the man pages:

```
-pg Generate extra code to write profile information suitable for the analysis
    program prof (for -p) or gprof (for -pg).  You must use this option when
    compiling the source files you want data about, and you must also use it
    when linking.

You can use the function attribute "no_instrument_function" to suppress
profiling of individual functions when compiling with these options.
```

This is cool, but what does it actually do? First, let's talk about gprof.

## gprof

> gprof - display call graph profile data

This program will produce the execution profile of a C, Pascal, or Fortran77
program. It takens an "a.out" file compiled by gcc with the `-pg` flag.

So for the following C code:

```c
// foo.c
// gcc -pg foo.c -o a.out
#include <stdio.h>

void bar(int a) {
    printf("this is bar with %d\n", a);
}

int foo(long a, long b) {
    return a*b + 42;
}

void looper() {
    for (int i = 0; i < 100; i++) {
        bar(i);
        foo(i, i+42);
    }
}

int main() {
    looper();
    return 0;
}
```

After you compiled the code, you must run the executable once:

```
[tmp] ./a.out
this is bar with 0
this is bar with 1
this is bar with 2
...
```

After the code finished, a file called `gmon.out` would have been created.

You can now run `gprof` against a.out:

```
$ gprof /tmp/a.out
Flat profile:

Each sample counts as 0.01 seconds.
 no time accumulated

  %   cumulative   self              self     total
 time   seconds   seconds    calls  Ts/call  Ts/call  name
  0.00      0.00     0.00      100     0.00     0.00  bar
  0.00      0.00     0.00      100     0.00     0.00  foo
  0.00      0.00     0.00        1     0.00     0.00  looper

 %         the percentage of the total running time of the
time       program used by this function.

cumulative a running sum of the number of seconds accounted
 seconds   for by this function and those listed above it.

 self      the number of seconds accounted for by this
seconds    function alone.  This is the major sort for this
           listing.

calls      the number of times this function was invoked, if
           this function is profiled, else blank.

 self      the average number of milliseconds spent in this
ms/call    function per call, if this function is profiled,
           else blank.

 total     the average number of milliseconds spent in this
ms/call    function and its descendents per call, if this
           function is profiled, else blank.

name       the name of the function.  This is the minor sort
           for this listing. The index shows the location of
           the function in the gprof listing. If the index is
           in parenthesis it shows where it would appear in
           the gprof listing if it were to be printed.


Copyright (C) 2012-2024 Free Software Foundation, Inc.

Copying and distribution of this file, with or without modification,
are permitted in any medium without royalty provided the copyright
notice and this notice are preserved.


                     Call graph (explanation follows)


granularity: each sample hit covers 2 byte(s) no time propagated

index % time    self  children    called     name
                0.00    0.00     100/100         looper [3]
[1]      0.0    0.00    0.00     100         bar [1]
-----------------------------------------------
                0.00    0.00     100/100         looper [3]
[2]      0.0    0.00    0.00     100         foo [2]
-----------------------------------------------
                0.00    0.00       1/1           main [7]
[3]      0.0    0.00    0.00       1         looper [3]
                0.00    0.00     100/100         bar [1]
                0.00    0.00     100/100         foo [2]
-----------------------------------------------

 This table describes the call tree of the program, and was sorted by
 the total amount of time spent in each function and its children.

 Each entry in this table consists of several lines.  The line with the
 index number at the left hand margin lists the current function.
 The lines above it list the functions that called this function,
 and the lines below it list the functions this one called.
 This line lists:
     index      A unique number given to each element of the table.
                Index numbers are sorted numerically.
                The index number is printed next to every function name so
                it is easier to look up where the function is in the table.

     % time     This is the percentage of the `total' time that was spent
                in this function and its children.  Note that due to
                different viewpoints, functions excluded by options, etc,
                these numbers will NOT add up to 100%.

     self       This is the total amount of time spent in this function.

     children   This is the total amount of time propagated into this
                function by its children.

     called     This is the number of times the function was called.
                If the function called itself recursively, the number
                only includes non-recursive calls, and is followed by
                a `+' and the number of recursive calls.

     name       The name of the current function.  The index number is
                printed after it.  If the function is a member of a
                cycle, the cycle number is printed between the
                function's name and the index number.


 For the function's parents, the fields have the following meanings:

     self       This is the amount of time that was propagated directly
                from the function into this parent.

     children   This is the amount of time that was propagated from
                the function's children into this parent.

     called     This is the number of times this parent called the
                function `/' the total number of times the function
                was called.  Recursive calls to the function are not
                included in the number after the `/'.

     name       This is the name of the parent.  The parent's index
                number is printed after it.  If the parent is a
                member of a cycle, the cycle number is printed between
                the name and the index number.

 If the parents of the function cannot be determined, the word
 `<spontaneous>' is printed in the `name' field, and all the other
 fields are blank.

 For the function's children, the fields have the following meanings:

     self       This is the amount of time that was propagated directly
                from the child into the function.

     children   This is the amount of time that was propagated from the
                child's children to the function.

     called     This is the number of times the function called
                this child `/' the total number of times the child
                was called.  Recursive calls by the child are not
                listed in the number after the `/'.

     name       This is the name of the child.  The child's index
                number is printed after it.  If the child is a
                member of a cycle, the cycle number is printed
                between the name and the index number.

 If there are any cycles (circles) in the call graph, there is an
 entry for the cycle-as-a-whole.  This entry shows who called the
 cycle (as parents) and the members of the cycle (as children.)
 The `+' recursive calls entry shows the number of function calls that
 were internal to the cycle, and the calls entry for each member shows,
 for that member, how many times it was called from other members of
 the cycle.


Copyright (C) 2012-2024 Free Software Foundation, Inc.

Copying and distribution of this file, with or without modification,
are permitted in any medium without royalty provided the copyright
notice and this notice are preserved.


Index by function name

   [1] bar                     [2] foo                     [3] looper
```

There's a lot of information here, and the output is not super interesting for
this particular program.

