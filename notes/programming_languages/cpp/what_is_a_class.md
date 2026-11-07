March 07, 2023

## Starting simple

Our approach here will be to start simple and then incrementally expand our
class. Our first example is a foo/bar class:

```cpp
class MySweetClass {
public:
    char foo;
private:
    char bar;
};

MySweetClass my_obj;
```

This is a simple class with two attributes `foo` and `bar`. Both are `char`s
and aren't initialised by default. The following is the assembly code generated
by the code above:

```assembly
my_obj:
  .zero   2
```

The assembly code is very simple. It creates a new label `my_obj`, and uses
the `.zero` directive to store two bytes of memory and initialise them to zero.

If you're not familiar with Assembly, you can now use the label `my_obj` to
refer to this memory location, so that we can use other instructions like
`load` or `store`.

If you are asking yourself "If this Assembly is only reserving memory and
initialising it to zero, wouldn't it be the same as an empty struct?" Let's
check it out. Here's our `struct` code:

```cpp
struct MySweetStruct {
  char foo;
  char bar;
};

MySweetStruct my_struct_obj;
```

And the result is...

```assembly
my_struct_obj:
        .zero   2
```

Identical assembly code. Quite remarkable. Let's see what happens once we start
adding initialisers in the class:

```diff
class MySweetClass {
public:
+    MySweetClass() : foo('f'), bar('b') {}
    char foo;
private:
    char bar;
};

MySweetClass my_obj;
```

Now things start to get more complicated...

```assembly
MySweetClass::MySweetClass() [base object constructor]:
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi
        mov     rax, QWORD PTR [rbp-8]
        mov     BYTE PTR [rax], 102
        mov     rax, QWORD PTR [rbp-8]
        mov     BYTE PTR [rax+1], 98
        nop
        pop     rbp
        ret
my_obj:
        .zero   2
__static_initialization_and_destruction_0(int, int):
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     DWORD PTR [rbp-4], edi
        mov     DWORD PTR [rbp-8], esi
        cmp     DWORD PTR [rbp-4], 1
        jne     .L4
        cmp     DWORD PTR [rbp-8], 65535
        jne     .L4
        mov     edi, OFFSET FLAT:my_obj
        call    MySweetClass::MySweetClass() [complete object constructor]
.L4:
        nop
        leave
        ret
_GLOBAL__sub_I_my_obj:
        push    rbp
        mov     rbp, rsp
        mov     esi, 65535
        mov     edi, 1
        call    __static_initialization_and_destruction_0(int, int)
        pop     rbp
        ret
```

The constructor code for MySweetClass begins by pushing the value of the base
pointer (rbp) onto the stack, and then moving the stack pointer (rsp) into rbp.
This sets up the stack frame for the function.

The constructor then stores the value of the "this" pointer (which is passed as
the first argument to the function in register rdi) in the local stack variable
at `[rbp-8]`. It then loads the "this" pointer back into rax and uses it to set
the first byte of the object to the value 102 (char 'f'), and the second byte
to the value 98 (char 'b').

The constructor ends with a nop (no-operation) instruction, which does nothing,
and then pops the base pointer off the stack and returns.

The rest of the code is initialisation code for our static object "my_obj".
It begins by reserving 2 bytes of space for the object, which
is indicated by the .zero 2 directive that we saw earlier. This space is being
used to store the two bytes of data that were set by the MySweetClass
constructor.

Next, there is a function called static_initialization_and_destruction_0,
which takes two integer arguments (edi and esi). The purpose of this function
is to check the values of these arguments and call the MySweetClass constructor
if they meet certain conditions. Specifically, if the first argument is equal
to 1 and the second argument is equal to 65535, then the constructor is called
with the "this" pointer set to the address of the my_obj object.

After this function, there is another function called GLOBAL__sub_I_my_obj,
which appears to be responsible for initializing the my_obj object. It starts
by setting the values of edi and esi to 1 and 65535, respectively, and then
calling the static_initialization_and_destruction_0 function with these
values. Finally, it cleans up the stack and returns.

The numbers `1` and `65535` are very misterious to me, I'm not sure why
exactly they are used as prerequisite. If you do, please let me know.

---

Let's now have a look at our `struct` when it has an initialiser:

```diff
struct MySweetStruct {
  char foo;
  char bar;
+  MySweetStruct() : foo('f'), bar('b') {}
};

MySweetStruct my_struct_obj;
```

This is the resulting assembly code:

```assembly
MySweetStruct::MySweetStruct() [base object constructor]:
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi
        mov     rax, QWORD PTR [rbp-8]
        mov     BYTE PTR [rax], 102
        mov     rax, QWORD PTR [rbp-8]
        mov     BYTE PTR [rax+1], 98
        nop
        pop     rbp
        ret
my_struct_obj:
        .zero   2
__static_initialization_and_destruction_0(int, int):
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     DWORD PTR [rbp-4], edi
        mov     DWORD PTR [rbp-8], esi
        cmp     DWORD PTR [rbp-4], 1
        jne     .L4
        cmp     DWORD PTR [rbp-8], 65535
        jne     .L4
        mov     edi, OFFSET FLAT:my_struct_obj
        call    MySweetStruct::MySweetStruct() [complete object constructor]
.L4:
        nop
        leave
        ret
_GLOBAL__sub_I_my_struct_obj:
        push    rbp
        mov     rbp, rsp
        mov     esi, 65535
        mov     edi, 1
        call    __static_initialization_and_destruction_0(int, int)
        pop     rbp
        ret
```

You guessed it. Yes, it generates the same code.
In fact, even if you add functions to the struct or to the class, their
assembly code would look fairly similar.

This is nice, because you're using an OOP abstraction instead of using a struct,
but you're not paying much (if anything) for it.
