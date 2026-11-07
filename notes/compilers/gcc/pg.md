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
// test.c
// gcc -pg test.c -o a.out

long mul(long a, long b) {
    return a*b;
}

float div(long a, long b) {
    return a/b;
}

void looper() {
    for (int i = 0; i < 500000000; i++) {
        mul(i, i+42);
        div(i, i+42);
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
```

After the code finished, a file called `gmon.out` would have been created.

You can now run `gprof` against a.out:

```
$ gprof a.out
Flat profile:

Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls   s/call   s/call  name
 31.26      0.58     0.58 500000000     0.00     0.00  div
 28.57      1.11     0.53 500000000     0.00     0.00  mul
 23.72      1.55     0.44         1     0.44     1.55  looper
 10.78      1.75     0.20                              _init
  5.93      1.86     0.11                              _dl_relocate_static_pie

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

...

                     Call graph (explanation follows)


granularity: each sample hit covers 2 byte(s) for 0.54% of 1.86 seconds

index % time    self  children    called             name
                0.44    1.11       1/1               main [2]
[1]     83.3    0.44    1.11       1                 looper [1]
                0.58    0.00 500000000/500000000     div [3]
                0.53    0.00 500000000/500000000     mul [4]
-----------------------------------------------
                                                     <spontaneous>
[2]     83.3    0.00    1.55                         main [2]
                0.44    1.11       1/1               looper [1]
-----------------------------------------------
                0.58    0.00 500000000/500000000     looper [1]
[3]     31.2    0.58    0.00 500000000               div [3]
-----------------------------------------------
                0.53    0.00 500000000/500000000     looper [1]
[4]     28.5    0.53    0.00 500000000               mul [4]
-----------------------------------------------
                                                     <spontaneous>
[5]     10.8    0.20    0.00                         _init [5]
-----------------------------------------------
                                                     <spontaneous>
[6]      5.9    0.11    0.00                         _dl_relocate_static_pie [6]
-----------------------------------------------

...

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

Index by function name

   [6] _dl_relocate_static_pie [3] div                     [4] mul
   [5] _init                   [1] looper
```

There's a lot of information here, and the output is not super interesting for
this particular program.

If you compiled with the `-g` option, you can run gprof with `-A`, which will
show the annotated code:

```
[tmp] gprof -A a.out
*** File /tmp/foo.c:
                // test.c
                // gcc -pg test.c -o a.out

   500000000 -> long mul(long a, long b) {
                    return a*b;
                }

   500000000 -> float div(long a, long b) {
                    return a/b;
                }

           1 -> void looper() {
                    for (int i = 0; i < 500000000; i++) {
                        mul(i, i+42);
                        div(i, i+42);
                    }
                }

       ##### -> int main() {
                    looper();
                    return 0;
                }


Top 10 Lines:

     Line      Count

        4  500000000
        8  500000000
       12          1

Execution Summary:

        4   Executable lines in this file
        4   Lines executed
   100.00   Percent of the file executed

1000000001   Total number of line executions
250000000.25   Average executions per line
```

## Useful flags:


```
"-r"
"--function-ordering"
The --function-ordering option causes "gprof" to print a suggested function
ordering for the program based on profiling data.  This option suggests an
ordering which may improve paging, tlb and cache behavior for the program on
systems which support arbitrary ordering of functions in an executable.

The exact details of how to force the linker to place functions in a particular
order is system dependent and out of the scope of this manual.

"-R map_file"
"--file-ordering map_file"
The --file-ordering option causes "gprof" to print a suggested .o link line
ordering for the program based on profiling data.  This option suggests an
ordering which may improve paging, tlb and cache behavior for the program on
systems which do not support arbitrary ordering of functions in an executable.

Use of the -a argument is highly recommended with this option.

The map_file argument is a pathname to a file which provides function name to
object file mappings.  The format of the file is similar to the output of the
program "nm".

"-a"
"--no-static"
The -a option causes "gprof" to suppress the printing of statically declared
(private) functions.  (These are functions whose names are not listed as
global, and which are not visible outside the file/function/block where they
were defined.)  Time spent in these functions, calls to/from them, etc., will
all be attributed to the function that was loaded directly before it in the
executable file.  This option affects both the flat profile and the call graph.
```

## How does it do it?

How does gprof count how many times a function has been called and how long it
took?

Let's have a quick look at the assembly generated by our mul function.

```c
// test.c
long mul(long a, long b) {
    return a*b;
}
```

Compiling that with -O3:

```asm
mul:
  mov  rax, rdi
  imul  rax, rsi
  ret
```

Notice the difference when we compile it with -pg:

```asm
mul:
  push  rbp
  mov  rbp, rsp
1:  call  mcount
  pop  rbp
  mov  rax, rdi
  imul  rax, rsi
  ret
```

## What the docs say

According to the `gprof` [manual](https://ftp.gnu.org/old-gnu/Manuals/gprof-2.9.1/html_node/gprof_25.html)

> The mcount routine, included in the profiling library, is responsible for
> recording in an in-memory call graph table both its parent routine (the
> child) and its parent's parent. This is typically done by examining the stack
> frame to find both the address of the child, and the return address in the
> original parent. Since this is a very machine-dependant operation, mcount
> itself is typically a short assembly-language stub routine that extracts the
> required information, and then calls __mcount_internal (a normal C function)
> with two arguments - frompc and selfpc. __mcount_internal is responsible for
> maintaining the in-memory call graph, which records frompc, selfpc, and the
> number of times each of these call arcs was transversed.

So `mcount` only records the call count. How do we have the time estimation for
each function?

> Profiling also involves watching your program as it runs, and keeping a
> histogram of where the program counter happens to be every now and then.
> Typically the program counter is looked at around 100 times per second of run
> time, but the exact frequency may vary from system to system.

> This is done is one of two ways. Most UNIX-like operating systems provide a
> profil() system call, which registers a memory array with the kernel, along
> with a scale factor that determines how the program's address space maps into
> the array. Typical scaling values cause every 2 to 8 bytes of address space
> to map into a single array slot. On every tick of the system clock (assuming
> the profiled program is running), the value of the program counter is
> examined and the corresponding slot in the memory array is incremented. Since
> this is done in the kernel, which had to interrupt the process anyway to
> handle the clock interrupt, very little additional system overhead is
> required.

> A special startup routine allocates memory for the histogram and either calls
> profil() or sets up a clock signal handler. This routine (monstartup) can be
> invoked in several ways. On Linux systems, a special profiling startup file
> gcrt0.o, which invokes monstartup before main, is used instead of the default
> crt0.o. Use of this special startup file is one of the effects of using `gcc
> ... -pg' to link. On SPARC systems, no special startup files are used.
> Rather, the mcount routine, when it is invoked for the first time (typically
> when main is called), calls monstartup. 

This is why we see the _init section of the disassemblied file calling
gmon_start

```asm
Disassembly of section .init:

0000000000001000 <_init>:
    1000:	f3 0f 1e fa          	endbr64
    1004:	48 83 ec 08          	sub    $0x8,%rsp
    1008:	48 8d 05 71 00 00 00 	lea    0x71(%rip),%rax        # 1080 <__gmon_start__>
    100f:	48 85 c0             	test   %rax,%rax
    1012:	74 02                	je     1016 <_init+0x16>
    1014:	ff d0                	call   *%rax
    1016:	48 83 c4 08          	add    $0x8,%rsp
    101a:	c3                   	ret
```

> The profiling library also includes a function (mcleanup) which is typically
> registered using atexit() to be called as the program exits, and is
> responsible for writing the file `gmon.out'. Profiling is turned off, various
> headers are output, and the histogram is written, followed by the call-graph
> arcs and the basic-block counts.

We will see this mcleanup call when we dissect the code in a section below.

> The output from gprof gives no indication of parts of your program that are
> limited by I/O or swapping bandwidth. This is because samples of the program
> counter are taken at fixed intervals of the program's run time. Therefore,
> the time measurements in gprof output say nothing about time that your
> program was not running. For example, a part of the program that creates so
> much data that it cannot all fit in physical memory at once may run very
> slowly due to thrashing, but gprof will say it uses little time. On the other
> hand, sampling by run time has the advantage that the amount of load due to
> other users won't directly affect the output you get. 

## What does profil do?

The profil is used to create a buffer, that can store how many times a IP
address was observed. This will give an estimate on the % of the program spent
on that IP.

## Checking mcount code

So what is mcount doing? Let's compile the code and check the binary:

```sh
gcc -O3 -pg test.c -o /tmp/a.out
objdump -d -S /tmp/a.out > /tmp/a.asm
```

The `mul` function now looks like this:

```asm
00000000000011a0 <mul>:
long mul(long a, long b) {
    11a0:	55                   	push   %rbp
    11a1:	48 89 e5             	mov    %rsp,%rbp
    11a4:	e8 87 fe ff ff       	call   1030 <mcount@plt>
}
    11a9:	5d                   	pop    %rbp
    return a*b;
    11aa:	48 89 f8             	mov    %rdi,%rax
    11ad:	48 0f af c6          	imul   %rsi,%rax
}
```

So we are calling address 1030, which contains the mcount function.
Let's have a look.

```
0000000000001030 <mcount@plt>:
    1030:	ff 25 ca 2f 00 00    	jmp    *0x2fca(%rip)        # 4000 <mcount@GLIBC_2.2.5>
    1036:	68 00 00 00 00       	push   $0x0
    103b:	e9 e0 ff ff ff       	jmp    1020 <_init+0x20>
```

- jumps to the address 0x4000 where the mcount function actually is.
- push 0 onto the stack
- jump to 0x1020

In 0x1020 we have:

```
0000000000001020 <mcount@plt-0x10>:
    1020:	ff 35 ca 2f 00 00    	push   0x2fca(%rip)  # 3ff0 <_GLOBAL_OFFSET_TABLE_+0x8>
    1026:	ff 25 cc 2f 00 00    	jmp    *0x2fcc(%rip) # 3ff8 <_GLOBAL_OFFSET_TABLE_+0x10>
    102c:	0f 1f 40 00          	nopl   0x0(%rax)
```

- It pushs 0x3ff0 to the stack.
- jumps to 0x3ff8.
- nopl (no operation) might be here just for alignment.

This doesn't tell us what `mcount` actually does... It is a shared library.

Let's find what the shared library is:

```
ldd /tmp/a.out
    linux-vdso.so.1 (0x00007fffc4df3000)
    libc.so.6 => /usr/lib/libc.so.6 (0x000071686abb4000)
    /lib64/ld-linux-x86-64.so.2 => /usr/lib64/ld-linux-x86-64.so.2 (0x000071686add1000)
```

It's probably in the libc.so shared library:

```
objdump -d /usr/lib/libc.so.6
```

```asm
000000000011d5e0 <_mcount@@GLIBC_2.2.5>:
  11d5e0:	f3 0f 1e fa          	endbr64
  11d5e4:	48 83 ec 38          	sub    $0x38,%rsp
  11d5e8:	48 89 04 24          	mov    %rax,(%rsp)
  11d5ec:	48 89 4c 24 08       	mov    %rcx,0x8(%rsp)
  11d5f1:	48 89 54 24 10       	mov    %rdx,0x10(%rsp)
  11d5f6:	48 89 74 24 18       	mov    %rsi,0x18(%rsp)
  11d5fb:	48 89 7c 24 20       	mov    %rdi,0x20(%rsp)
  11d600:	4c 89 44 24 28       	mov    %r8,0x28(%rsp)
  11d605:	4c 89 4c 24 30       	mov    %r9,0x30(%rsp)
  11d60a:	48 8b 74 24 38       	mov    0x38(%rsp),%rsi
  11d60f:	48 8b 7d 08          	mov    0x8(%rbp),%rdi
  11d613:	e8 88 f3 ff ff       	call   11c9a0 <_mcleanup@@GLIBC_2.2.5+0x70>
  11d618:	4c 8b 4c 24 30       	mov    0x30(%rsp),%r9
  11d61d:	4c 8b 44 24 28       	mov    0x28(%rsp),%r8
  11d622:	48 8b 7c 24 20       	mov    0x20(%rsp),%rdi
  11d627:	48 8b 74 24 18       	mov    0x18(%rsp),%rsi
  11d62c:	48 8b 54 24 10       	mov    0x10(%rsp),%rdx
  11d631:	48 8b 4c 24 08       	mov    0x8(%rsp),%rcx
  11d636:	48 8b 04 24          	mov    (%rsp),%rax
  11d63a:	48 83 c4 38          	add    $0x38,%rsp
  11d63e:	c3                   	ret
  11d63f:	90                   	nop
```

... More code!

Remember from the documentation what mcleanup does:

> The profiling library also includes a function (mcleanup) which is typically
> registered using atexit() to be called as the program exits, and is
> responsible for writing the file `gmon.out'. Profiling is turned off, various
> headers are output, and the histogram is written, followed by the call-graph
> arcs and the basic-block counts.

## Outro

Accoridng to IBM [docs](https://www.ibm.com/docs/en/aix/7.1?topic=command-implementation-gprof):

> The compiler inserts a call to the mcount() function into the object code
> generated for each recompiled function of your program. The mcount() function
> counts each time a parent calls a child function. Also, the monitor()
> function is enabled to estimate the time spent in each routine.

What is the `monitor` function? [source](https://man.cx/monitor(3))

> The monitor() function is an interface to the profil(2) function and is
> called automatically with default parameters by any program created by the
> cc(1B) utility with the -p option specified. Except to establish further
> control over profiling activity, it is not necessary to explicitly call
> monitor().

> When used, monitor() is called at least at the beginning and the end of a
> program. The first call to monitor() initiates the recording of two different
> kinds of execution-profile information: execution-time distribution and
> function call count. Execution-time distribution data is generated by
> profil() and the function call counts are generated by code supplied to the
> object file (or files) by cc(1B) -p. Both types of information are collected
> as a program executes. The last call to monitor() writes this collected data
> to the output file mon.out.
