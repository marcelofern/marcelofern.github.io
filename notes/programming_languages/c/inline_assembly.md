February 24th, 2024

## Recap of Linux x64 ABI

When a function is called in C, the converted x64 assembly code will hold the
function arguments in the following order:

1. rdi
2. rsi
3. rdx
4. rcx
5. r8
6. r9

If the function takes more than 6 arguments, the remaining ones will be on
$rsp+8. This is because $rsp+0 stores the value of rip so that the `return`
statement knows where to go:

7. `rsp+8`
8. `rsp+8*2`
9. `...`

And finally, the result is stored in rax, if any.

## How to inline code (naive approach)

Assembly code can be inlined with `asm`. You have to be careful with what you
are doing, because compiled code with optimisations will look very different
from compiled code without optimisation.

Take for example this simple function:

```c
int foo(int a) {
  asm("add dword ptr [rbp-4], 25");
  return a;
}

int main() {
  return foo(42);
}
```

Note that you must compile this with `-masm=intel`.

```
!gcc -masm=intel -o /tmp/a.out % && /tmp/a.out
```

This is the output assembly:

```asm
  .text
  .globl  foo
foo:
  push  rbp
  mov  rbp, rsp
  mov  DWORD PTR -4[rbp], edi
#APP
# 2 "/tmp/c_to_assembly.c" 1
  add dword ptr [rbp-4], 25
# 0 "" 2
#NO_APP
  mov  eax, DWORD PTR -4[rbp]
  pop  rbp
  ret
main:
  push  rbp
  mov  rbp, rsp
  mov  edi, 42
  call  foo
  pop  rbp
  ret
```

Note how it all falls into place. The program exits returning 42+25 = 67.

However, if we compile with optimisation, this will all go to shambles:

```asm
  .text
  .globl  foo
  .globl  main
foo:
  mov  eax, edi
#APP
# 2 "/tmp/c_to_assembly.c" 1
  add dword ptr [rbp-4], 25
# 0 "" 2
#NO_APP
  ret
main:
#APP
# 2 "/tmp/c_to_assembly.c" 1
  add dword ptr [rbp-4], 25
# 0 "" 2
#NO_APP
  mov  eax, 42
  ret
```

Look how the compiler inlined the code from `foo`. The function isn't even
called anymore.


## Extended asm with gcc (better approach)

> With extended asm you can read and write C variables from assembler and
> perform jumps from assembler code to C labels. Extended asm syntax uses
> colons (‘:’) to delimit the operand parameters after the assembler template:

```
asm asm-qualifiers ( AssemblerTemplate
                 : OutputOperands
                 [ : InputOperands
                 [ : Clobbers ] ])

asm asm-qualifiers ( AssemblerTemplate
                      : OutputOperands
                      : InputOperands
                      : Clobbers
                      : GotoLabels)
```

[source](https://web.archive.org/web/20240128193556/https://gcc.gnu.org/onlinedocs/gcc/Extended-Asm.html)

Note that:

> The asm keyword is a GNU extension. When writing code that can be compiled
> with -ansi and the various -std options, use __asm__ instead of asm (see
> Alternate Keywords).

And very importantly:

> Since GCC does not parse the assembler template, it has no visibility of any
> symbols it references. This may result in GCC discarding those symbols as
> unreferenced unless they are also listed as input, output, or goto operands.

---

> Outputs, inputs, clobbers, and labels are all optional. Colons are only
> required up to the parameter that you wish to use, and having nothing between
> colons is valid when you wish to skip a parameter. For instance, each of
> these (explained below) are valid.

```c
    asm("movq %0, %0" : "+rm" (foo));
    asm("addl %0, %1" : "+r" (foo) : "g" (bar));
    asm("lfence" : /* no output */ : /* no input */ : "memory");
```

[source](https://web.archive.org/web/20230711125434/https://www.felixcloutier.com/documents/gcc-asm.html)

- you specify arguments using %N, where N refers to an argument by its
  zero-based number in order of appearance (outputs and inputs being in the
  same "namespace", outputs being first)
- you specify named arguments using `%[Name]`.
- you specify a literal % by using %%, which you will need if you reference
  registers directly in x86 assembly with the `AT&T;` syntax

**Prefer to name parameters**:

When you specify the optional `[Name]` field, you become able to refer to that
input or output using the `%[Name]` syntax in the assembler template. For
instance:

```c
int foo = 1;
asm("inc %[IncrementMe]" : [IncrementMe] "+r" (foo));
foo == 2
```

Even when names are specified, you can still refer to operands using the
numbered syntax.

### Constraints

In the example above we have, right next to the variable, the double quoted
"+r" constraint.

The constraint string communicates to GCC what the variable represents.
For example, take the asm code:

```c
imul %0, %1, %2
```
- the first operand has to be a register
- the second operand may be a register or a memory address
- the last operand has to be a constant integer value

> The constraint string for each operand must communicate these requirements to
> GCC. For instance, it will ensure that the destination value lives in a
> register that can be used at the point of this statement.

GCC defines many types of constraints, but on 2019's desktop/mobile platforms,
those are the constraints that are the most likely to be used:

- `r` specifies that the operand must be a general-purpose register
- `m` specifies that the operand must be a memory address
- `i` specifies that the operand must be an integer constant
- `g` specifies that the operand must be a general-purpose register, or a
  memory address, or an integer constant (effectively the same as "rmi"). By
  specifying multiple constraints via `g` or `rmi`, you allow the compiler to
  pick the operand kind that suits it best when the same instruction has
  multiple forms.

For a list with more constraints go to:

- [source](http://web.archive.org/web/20231224184039/https://gcc.gnu.org/onlinedocs/gcc/Simple-Constraints.html)
- [machine-specific constraints](http://web.archive.org/web/20231223081527/https://gcc.gnu.org/onlinedocs/gcc/Machine-Constraints.html)

Right next to `r` we have the symbol `+`, those symbols are:

**Constraint modifying characters**

- `=` Means that this operand is write-only by this instruction: the previous
  value is discarded and replaced by new data. Most ARM instructions don't use
  the initial value of its destination register and thus don't have to have
  read access. In those cases use `=`.
- `+` Means that this operand is both read and written by the instruction
  (read+write value). Almost all x86 instructions read and write to their first
  operand.
- `&` Means (in a particular alternative) that this operand is an earlyclobber
  operand. Its initial value is unspecified. It is not a bug to read from an =&
  operand once it has been assigned a value. This is written before the
  instruction is finished using the input operands. Therefore, this operand may
  not lie in a register that is read by the instruction or as part of any
  memory address.
- `%` Declares the instruction to be commutative for this operand and the
  following operand. This means that the compiler may interchange the two
  operands if that is the cheapest way to make all operands fit the
  constraints.

Output constraints must begin with either `=` (a variable overwriting an
existing value) or `+` (when reading and writing). When using `=`, do not
assume the location contains the existing value on entry to the asm, except
when the operand is tied to an input; see Input Operands.

### Clobbers

> While the compiler is aware of changes to entries listed in the output
> operands, the inline asm code may modify more than just the outputs. For
> example, calculations may require additional registers, or the processor may
> overwrite a register as a side effect of a particular assembler instruction.
> In order to inform the compiler of these changes, list them in the clobber
> list. Clobber list items are either register names or the special clobbers
> (listed below). Each clobber list item is a string constant enclosed in
> double quotes and separated by commas.


- Register names (on x86, both register and %register are accepted, such as
  `rax` or `%rax`)
- The special name `cc`, which specifies that the assembly altered condition
  flags. On platforms that keep multiple sets of condition flags as separate
  registers, it's also possible to name individual registers: for instance, on
  PowerPC, you can specify that you clobber cr0.
- The special name `memory`, which specifies that the assembly wrote to memory
  that is not explicitly referenced by an output (for instance, by
  dereferencing an input pointer). A memory clobber prevents the compiler from
  reordering memory operations across the asm statement (although it does not
  prevent the processor from doing it: you need to use an actual memory fence
  to achieve this).

### Simple Example

```c
int add(int a, int b) {
    asm("add %[a], %[b]" : [a] "+r" (a) : [b] "rm" (b));
    return a;
}
```

Now note that using this notation, when we compile this code with -O3, we still
get the correct code!

```asm
add:
  mov  eax, edi
#APP
# 2 "/tmp/c_to_assembly.c" 1
  addl eax, esi
# 0 "" 2
#NO_APP
  ret
```

### Fixing our initial example with extended assembly

```c
int foo(int a) {
  asm(
    "add %[a], 25"
    : [a] "+r" (a)
  );
  return a;
}

int main() {
  return foo(42);
}
```

And the output assembly:

```asm
foo:
  mov  eax, edi
#APP
# 2 "/tmp/c_to_assembly.c" 1
  add eax, 25
# 0 "" 2
#NO_APP
  ret
  .size  foo, .-foo
  .section  .text.startup,"ax",@progbits
  .p2align 4
  .globl  main
  .type  main, @function
main:
  mov  eax, 42
#APP
# 2 "/tmp/c_to_assembly.c" 1
  add eax, 25
# 0 "" 2
#NO_APP
  ret
```
