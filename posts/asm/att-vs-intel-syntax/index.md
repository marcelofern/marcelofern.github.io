# AT&T vs Intel Syntax For Assembly

```
Created at: 2024-07-24
```

**TLDR**: Use the Intel syntax, but AT&T isn't that bad.

I usually prefer not to post content that is already easily searchable on the
internet. But the problem is, the really great information on this topic seems
to be distributed across just a few different places which sometimes are tricky
to find and often not argumentative enough to prescribe a syntax
recommendation.

That means that when I eventually forget why I picked one versus another, I
have to scramble across various posts to figure out which syntax to use for a
new project.

Top results on Google don't help much as many link to Reddit threads. Due to
the nature of Reddit, the arguments are rare or non-existent.

As you already figured out from the TLDR at the top, I prefer the Intel syntax.
I think that a good approach is to be contrarian and start with the differences
that seem to make the Intel Syntax **look less desirable**. I am a fan of
honest downsides being up front, and I think it makes an article more honest.
So here we go.

## Order of Operands

In the Intel syntax, the first operand is the destination and the second
operand is the source, whereas in AT&T it is the opposite. This is just about
the most confusing thing when you are comparing AT&T assembly with Intel
assembly.

If you don't read assembly often, it is easy to forget which order each syntax
uses.

```
| Intel         | AT&T             |
| --------------|------------------|
| mov rax, 0xFF | movq $0xFF, %rax |
```

I prefer the AT&T syntax here because it flows better in English. E.g. "Move
the value 0xFF **into** rax".

The counter argument here for some people is that they still prefer the Intel
syntax in this case because it reads like C:

```asm
mov rax, rdx        ; rax = rdx
sub rbx, rdi        ; rbx -= rdi
shlx rax, rbx, rdi  ; rax = rbx << rdi
```

If that mode of thinking fits your brain well you probably won't see that as a
problem. For me, I always have to "reverse think".

## AT&T is The Default on GCC, objdump, and GDB

This point isn't about syntax at all, but I often find tooling characteristics
relevant when making an important choice and thus I can't ignore them. I spend
a great deal of time inside gdb and also printing `objdump`s and if there was a
major inconvenience about using a syntax that would put a damper on my using of
`gcc`, `objdump` and `gdb`, I'd probably consider learning a new syntax.

For historical reasons `GAS` (the GNU disassembler that is a backend of GCC)
originally used the AT&T syntax. Support for Intel was only used later, and
naturally the default remained AT&T syntax.

This can be changed by configurations, of course, so I have the following
line in my `~/.config/gdb/gdbinit` file:

```
set disassembly-flavor intel
```

And when using `gcc`'s disassembler I use the following:

```
gcc -S -masm=intel
```

And finally for `objdump` I have to run:

```
objdump -Mintel
```

This isn't a problem on my local machine since I can use aliases. But on
another dev environment, or when someone is sharing some code from theirs, it
isn't absurd to expect they'll be using the defaults. This was a strong reason
for me to commit to learning both syntaxes well. I do have to spin my brain on
hyperthreaded mode to read AT&T syntax. Writing is a bit harder for me because
I keep forgetting the instruction suffixes, and the `%` and `$` signs as I'm
more used to writing Intel.

## Comments

Intel syntax uses `;` for comments. Whereas AT&T uses `#` or C style comments.
I do have a slight preference for AT&T style here (C style comments!) but this
is the last point where I think AT&T syntax is better.

Now the cons... I will follow course and start with the minor problems and go
up to bigger problems.

## Suffixes

Many instructions require suffixes on AT&T when the size of operands matter:

```asm
# AT&T operator suffixes
movb al, bl
movw ax, bx
movl eax, ebx
movq rax, rbx
```

`b` is for byte, `w` is for word (16 bits), `l` is for long-word (32 bits), and
`q` is for quadword (64 bits).

I don't know why the 32bit length is called "long-word". I imagine it's because
it was added when 32 bits were seen as the limit and "long" made sense then.

As soon as we got 64 bits "long" became a confusing word. Specially because C
has the `long` keyword and on modern machines `sizeof(long)` is 64 bits instead
of 32 bits. In Intel syntax this is called a "double word", which in my opinion
is a much clearer nominator.

This is a minor issue, you get used to it. In the Intel syntax you often don't
need size specifiers because the operands give you this information implicitly:

```asm
; because esi is 32bits, this is
; the equivalent of "movl" in AT&T
mov esi, 8
```

However other operations in Intel syntax may *also* require a suffix if the
operators alone aren't sufficient to determine the size of the operation. For
example:

```asm
; how many bytes??
mov  [rbp-20], 20
```

You are moving 20 to the address in memory calculated by the value `rbp-20`
but how many bytes from the value "20" are you moving? You need to clarify:

```asm
mov DWORD PTR [rbp-20], 20
```

## Prefixes

Both registers and immediate values have prefixes in AT&T syntax.

```asm
# AT&T
movl $25, %rdi
```

The fact that Intel doesn't use prefixes for registers and immediate values
already shows the reader that prefixes aren't necessary.

The only "downside" I can think of (and please reader correct me if I am
wrong), is that we can't have symbols with register names in Intel i.e.,
`rax` is not a valid symbol name.

For example this code fails to compile:

```asm
main:
  mov eax, ebx
  call ax
  ret
ax:
  mov bl, cl
  ret
```

Changing `ax` to something other than a register name will fix the code. This
may only be a problem when writing code manually. But note that if you are
overriding gcc defaults the following code blows up when running `gcc
-masm=intel main.c`

```c
#include <stdio.h>

long rax(int a, int b) {
  return 32*a << b;
}

int main() {
  long a;
  a = rax(42, 42);
  printf("%ld", a);
}
// Error:
// gcc -masm=intel main.c
// A.s: Assembler messages:
// Error: .size expression for rax does not evaluate to a constant
//
```

That blows up because a symbol (the function named `rax`) uses the name of a
register. Changing the name of the function to something else fixes the
problem.

## Memory Operands

This is the biggest pain point of AT&T. Addressing memory scales.

```
Intel, AT&T
instr bar, [base+index*scale+disp], instr disp(base,index,scale),foo
add rax,[rbx+rcx*0x4-0x22], addq -0x22(%rbx,%rcx,0x4), %rax
```

Note that displacements aren't the same as immediate values and thus don't
require a `$` prefix. I'm sure some will think of it as an inconsistency.

This is where everything packs together. The suffixes, prefixes, and a strange
way to calculate memory addresses. At least the form never changes, so once
you're used the expression it becomes more familiar.

## Final Remarks

> Is that all? Why! It doesn't look so bad!

Well, it doesn't look so bad because it isn't *that* bad! But also keep in mind
that I didn't show you any long snippets of assembly code. Take a file with 200
lines of assembly and naturally the AT&T syntax will be more visually daunting.

There are also other arguments I didn't add here regarding documentation.
Intel manuals naturally use the Intel syntax, and there are plenty of Intel
manuals out there, so chances are you'll be reading some. Also some of the
MCUs I've worked with on embedded systems follow a syntax that is closer to
Intel.

If you are writing a new project in Assembly I'd recommend the Intel syntax.

But considering that you will likely come across both when *reading* code, my
recommendation is to learn both syntaxes, and if you don't use assembly that
often just keep a cheatsheet handy so that you can quickly navigate between the
discrepancies.
