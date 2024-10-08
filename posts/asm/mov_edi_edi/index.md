# mov edi, edi

```
Created at: 2024-06-08
Updated at: 2024-07-27
```

I had a surprise today when I saw the instruction `mov edi, edi` as the first
instruction of a function call.

This is my C code:

```c
unsigned int func(unsigned int idx) {
  static unsigned int my_table[] = {10, 20, 30, 40};
  return my_table[idx];
}
```

Which returned the following x86 assembly (compiled via gcc):

```asm
func:
  mov  edi, edi
  lea  rax, my_table.0[rip]
  mov  eax, DWORD PTR [rax+rdi*4]
  ret
  .size  func, .-func
  .section  .rodata
  .align 16
  .type  my_table.0, @object
  .size  my_table.0, 16
my_table.0:
  .long  10
  .long  20
  .long  30
  .long  40
```

This code was compiled with the flag -O3, which I thought was going to
eliminate all useless instructions. To my surprise, when I removed all the
unsigned keywords from the function, the `mov edi, edi` disappeared in favour
of a `movsx rdi, edi`! Here's the equivalent asm code:

```asm
func:
  movsx  rdi, edi
  lea  rax, my_table.0[rip]
  mov  eax, DWORD PTR [rax+rdi*4]
  ret
  .size  func, .-func
  .section  .rodata
  .align 16
  .type  my_table.0, @object
  .size  my_table.0, 16
my_table.0:
  .long  10
  .long  20
  .long  30
  .long  40
```

I went on a spiral of research, and I found many links pointing to this
instruction being necessary in Microsoft Windows, so that the OS could operate
hot-patching. [source](http://web.archive.org/web/20240610022212/https://devblogs.microsoft.com/oldnewthing/20110921-00/?p=9583)

However, I compiled this on Linux. This should not be relevant to me. Here is
the catch; that `mov edi, edi` operation is used for zero'ing the most
significant 32 bits of the `rdi` register.

It does not seem obvious, but the answer can be found in the x86 tour of Intel
manuals [source](http://web.archive.org/web/20240610022212/http://web.archive.org/web/20240415061928/http://x86asm.net/articles/x86-64-tour-of-intel-manuals/)

> General-purpose Registers (...)
>
>   32-bit operands generate a 32-bit result, zero-extended to a 64-bit result
>   in the destination general-purpose register. (...)

UPDATE: In case it wasn't clear from the quote above, the zero-extension only
works for 32 bit operands. If you run `mov di, di` (di is 16 bits long), the
zero-extension **will not happen**.

---

The zero-extension is indeed what happens when I try to run the following mock
assembly code below:

```asm
main:
  ; Load `rdi` with all one's.
  mov rdi, 0xFFFFFFFFFFFFFFFF
  ; After the instruction below,
  ; rdi will be 0x0000000011111111
  mov edi, edi
  ret
```

This was not obvious to me at all. The initial instruction `mov edi, edi` just
looked like a nop equivalent with two bytes...

Coming back to my original function:

```asm
unsigned int func(unsigned int idx) {
  static unsigned int my_table[] = {10, 20, 30, 40};
  return my_table[idx];
}
```

Since I am using unsigned integers, the compiler can trust that the arguments
passed to that function in assembly won't be more than 32 bits long in my
machine.

UPDATE: The compiler actually doesn't need to "trust" anything, it actually
does not matter. The `movsx` instruction accepts operands of different sizes.
This means that the 32 bits in `edi` will be moved with sign-extension to fit
the 64 bits of `rdi`. The underlying 32 bit value will remain the same, and it
doesn't matter what bits were in the most-significant upper 32bits of `rdi`
before the `mov` operation - they will just be completely ignored. That is why
the instruction `mov edi, edi` is not necessary beforehand!

---

Remember that the ABI for C functions calls in assembly is that the first
argument to the function, in this case idx, will be passed in the register rdi.

So this function is cleaning up the most significant bits of rdi for us. I am
still not totally sure why this is necessary, but perhaps the compiler assumes
that some garbage could be held in the most significant bits of rdi and tries
to clean that up first to avoid potential bugs.

This assumption makes sense to me at first, because down in the assembly
function body, we rely on rdi for finding the address offset of the element in
the table that we want to return: `mov eax, DWORD PTR [rax+rdi*4]`.

Now remains the question: "Why is there an assumption by the compiler that rdi
can contain garbage in the most significant bits?".

This can happen if the function is being called with a "casted" value given
that casting per-se does not clean up unused bits of a 64bit register. That
could happen if a 64 bit integer was casted down to a 32 bit one.

Again, this is very much based on my own understanding on how assembly works in
my platform, if you think that I got something wrong please send me an email at
marceelofernandes@gmail.com.
