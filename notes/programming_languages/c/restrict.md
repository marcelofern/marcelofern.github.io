`2024-03-31`

The `restrict` keyword is available from C99.

It can be used to give the compiler a hint that, for the lifetime of the
pointer, no other pointer will be used to access the object to which it points
in the function.

This limits the effects of pointer aliasing, because if the compiler knows that
there is only one pointer to a memory block, it can perform better
optimisations.

One such optimisation comes from the possibility for the compiler to trust no
other code in the function changes the pointer, and thus the pointer only needs
to be loaded to a register or to the stack once.

Take for example this code:

```c
void update_ptrs(int *a, int *b, int *val)
{
  *a += *val;
  *b += *val;
}
```

It generates the following Assembly code:

```asm
update_ptrs:
  mov  eax, DWORD PTR [rdx]
  add  DWORD PTR [rdi], eax
  mov  eax, DWORD PTR [rdx]
  add  DWORD PTR [rsi], eax
  ret
```

- rdi = `int *a`
- rsi = `int *b`
- rdx = `int *val`

Note that the `int *val` pointer was loaded twice, as the compiler couldn't
tell if its value had changed during the execution of the function.

However, with the restrict keyword, the extra loading goes away:

```c
void update_ptrs(int *restrict a, int *restrict b, int *restrict val)
{
  *a += *val;
  *b += *val;
}
```

We get one less instruction in the asm:

```asm
update_ptrs:
  mov  eax, DWORD PTR [rdx]
  add  DWORD PTR [rdi], eax
  add  DWORD PTR [rsi], eax
  ret
```

So why do we get one less instruction?

Without the `restrict` keyword, the compiler needs to do one addition per time.
This is because it does not know if the value of the pointers changed based on
the previous instruction, so it needs to load things up again.

If you tell the compiler that these memories don't overlap, there is no
necessity for doing one operation at a time, since the previous instructions
wouldn't have altered the value of a different pointer not involved in the
instruction. The CPU can just "parallelise" the two additions directly.

More over, we are telling the compiler that no other pointer in the function
body points to the same object of those arguments, so the above is valid
throughout all the instructions in the function body.

Only one instruction seems like not such a big gain. But this is a `mov` from
memory to a register, which is more expensive than other x86 instructions.
Plus, the add instruction needs to wait for the loading instruction before it
can run, and so the CPU cannot parallelise multiple instructions adequately.

According to [Markus Fasselt's
paper](https://web.archive.org/web/20231001092447/https://hps.vi4io.org/_media/teaching/wintersemester_2013_2014/epc-1314-fasselt-c-keywords-report.pdf),
testing this optimisation in a very large *n*, the speed improvement of the
optimised assembly can be of 3 times.

## No protection against silly code

Note that there is no protection whatsoever for aliasing if your code is
incorrect. Using `restrict` or not. This is a source of confusion.

If we use this last `asm` listing, and assume the pointers `a` and `val` point
to the same memory address, we obtain interesting results. Note that this also
happens without the `restrict` word, as there is no protection for this kind of
silly code I've made up.

```
rdx = rdi = 0xffffffff
rsi = 0x00000000

[rdx] = [rdi] = [0xffffffff] = 1
[rsi] = [0x00000000] = 2
```

The assembly code would affect the pointer `val`.

```asm
mov eax, DWORD PTR[rdx]
; eax = 1

add DWORD PTR [rdi], eax
; 0xffffffff = 2

add DWORD PTR [rsi], eax
; 0x00000000 = 3
```

Expected:
- a = 2
- b = 3
- val = 1

Obtained:
- a = 2
- b = 3
- val = 2


## Further links

- [Markus Fasselt](https://web.archive.org/web/20231001092447/https://hps.vi4io.org/_media/teaching/wintersemester_2013_2014/epc-1314-fasselt-c-keywords-report.pdf)
- [Undefined behaviour for restrict qualifiers](https://wiki.sei.cmu.edu/confluence/display/c/EXP43-C.+Avoid+undefined+behavior+when+using+restrict-qualified+pointers)
