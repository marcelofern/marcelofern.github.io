`2024-03-29`.

A brief reference for the differences between C standards.
[Source](https://web.archive.org/web/20240327221533/https://en.wikipedia.org/wiki/C_(programming_language)#K&R_C)

## K&R C (1972-1989)

Anything before standardisation was called K&R C as per the first edition of the
book that was the de facto implementation at the time. The book came out at
1978, so sometimes this implementation is also referred to as C78.

The following language features were introduced by the book:

- `long int` data type.
- `unsigned int` data type.
- Compound operators that allow to combine arithmetic operation with assignment
  were changed from **=op** to **op=**. For example, `a =+ 1;` has become `a +=
  1;`. This happened to remove ambiguity. Before, `a=-10;` meant `a =- 10;`
  instead of `a = -10;`

C functions that returned an `int` could be declared without the `int` keyword
upfront as it was implicit that they returned int.

```c
/* K&R */
long function_that_returns_long();
function_that_returns_int();

/* newer standards */
long function_that_returns_long();
int function_that_returns_int();
```

Function declarations also had an implicit `int` return when the return type
was not specified:

```c
/* K&R */
function_that_returns_int() {
  return 10;
}

/* newer standards */
int function_that_returns_int() {
  return 10;
}
```

Function declarations also didn't include information about function arguments.
This means that function parameter type checks were not performed. Some
compilers would still raise a warning if the function was called with the wrong
number of arguments or if different calls to the same function had different
numbers of arguments.

After the book publication and before C89, several compilers added other
features to the language:

- `void` functions.
- Functions returning `struct` and `union` types. Prior to that only a pointer
  (int or float) could be returned.
- Assignment for `struct` data types.
- `enum` types. Before that, preprocessors were used like `#define BLUE 0`.


## C89 (ANSI / ISO C)

The goal of this standards was to create a superset of K&R out of the many
unofficial features, such as:

- The standard library.
- Function prototypes, including the name and type signature:
```c
/* before (no argument info in declarations) */
long function_that_returns_long();

/* C89 */
long function_that_returns_long(int a, int b);
```
- `void` pointers.
- International character sets and locales.
- `const` qualifier.
- Function prototyping checking, i.e., functions to be declared before they are
  called.
- `#error` and `#pragma` directives.

## C99

The following functionalities were introduced in this new version of the
standard:

- Intermingled declarations and code. Declaring a variable does not need to be
  at the top of the function anymore.
- Booleans via <stdbool.h>
- `inline` functions. Those are used to suggest (but not mandate) the compiler
  to inline the body of the function where it is called by performing inline
  expansion.
```c
inline void swap(int *m, int* n) {
  int tmp = *m;
  *m = *n;
  *n = tmp;
}
```
- Struct initialisation by field names:
```c
struct point p = { .x = 1, .y = 2 };
```
- Compound literals. Like initialising a struct inside a function call:
```c
my_sweet_function_call((struct x) {1, 2});
```
- New headers such as <stdbool.h>, <complex.h>, <tgmath.h>, and <inttypes.h>.
- Many data types including: `long long int` and `complex`.
- Variable-length array VLA - (size defined at runtime). Note that C11 made
  this an optional feature that may not be supported by certain compilers.
  However, C23 made it mandatory again! Linus Torvalds made Linux VLA-free as
  he reckons the the generated assembly is of lower quality. He prefers to use
  arrays with pre-determined sizes instead.
```c
float read_and_process(int n)
{
    float vals[n];

    for (int i = 0; i < n; ++i)
        vals[i] = read_val();

    return process(n, vals);
}
```
- Along with the above the keyword `static` in array indices in parameter
  declarations was added. The below indicates that the array size is determined
  by the params `rows` and `cols`:
```c
void function(int rows, int cols, int array[static rows][cols]) {
    // Function implementation
}
```
- Flexible array members:
```c
struct vectord {
    short len;    // there must be at least one other data member
    double arr[]; // the flexible array member must be last.
    // The compiler may reserve extra padding space here, like it can between struct members
};
```
- Variadic macros
- Support for one-line comments starting with `//`.
- Support for identifiers using unicode in the form of escaped characters like
  `\u0040`.
- `restrict` qualification allows more aggressive code optimization, removing
  compile-time array access advantages previously held by FORTRAN over ANSI C.
  This is used to tell the compiler two pointers don't point to the same
  address in memory. With that, the compiler can aggressively optimise the code
  as it knows pointers won't be aliased (overlapped in memory).
```c
void update(int *restrict a, int *restrict b, int n) {
    // Using 'restrict' keyword to indicate no aliasing
    for (int i = 0; i < n; i++) {
        a[i] += b[i];
    }
}
```

## C11

- `_Noreturn` this specifier informs the compiler that once the function is
  called, it will never return control to the calling function. The
  <stdnoreturn.h> header provides the `_Noreturn` keyword for compilers that
  don't support the C11 standard but still want to use this feature.
- Alignment (`_Alignas` specifier, `_Alignof` operator, `aligned_alloc`
  function, <stdalign.h>). These can be helpful when optimising performance in
  SIMD (Single Instruction, Multiple Data) programming or dealing with
  hardware-specific requirements.
```c
// Align the array to a 16-byte boundary.
_Alignas(16) char aligned_array[32];

// Get the alignment requirement of a data type.
printf("Alignment of int: %zu\n", _Alignof(int));

// Allocate 32 bytes of memory aligned to a 16-byte boundary
void *ptr = aligned_alloc(16, 32);

// <stdalign.h> header provides similar functionality:
alignas(16) char aligned_array[32];
printf("Alignment of aligned_array: %zu\n", alignof(aligned_array));
```
- Type-generic expressions using the `_Generic` keyword.
```c
#define print_value(x) _Generic((x), \
    int:    printf("%d\n", x), \
    float:  printf("%f\n", x), \
    double: printf("%lf\n", x), \
    default: printf("Unsupported type\n") \
)
```
- Multi-threading support via `_Thread_local` storage-class specifier and
  <threads.h> header.
- Atomic operations to avoid race conditions from threads via <stdatomic.h>
- Removal of the gets function (in favour of safer fgets), which was deprecated
  in the previous C language standard revision
- Bounds-checking interfaces (Annex K). Annex K introduces functions like
  `memcpy_s`, `memmove_s`, `strcpy_s`, `strncpy_s`, and others with the `_s`
  suffix, which perform bounds-checking for array accesses. These functions
  typically take additional parameters specifying the size of the destination
  buffer to ensure that the copy operation does not exceed the buffer size.
  These changes remain controversial and they haven't been widely implemented.
- Analysability features (Annex L). Annex L adds the `_Static_assert` keyword,
  allowing programmers to embed compile-time assertions directly into their
  code. There is also the library <assert.h> to that end, with the function
  `static_assert`.
- Anonymous structures and unions, useful when unions and structures are
  nested, e.g.
```c
struct T { int tag; union { float x; int n; }; };
```
- The `quick_exit` function as a third way to terminate a program, intended to
  do at least minimal deinitialisation.
- Macros for the construction of complex values (partly because `real +
  imaginary*I` might not yield the expected value if imaginary is infinite or
  NaN).

## C17

C17 fixes numerous minor defects in C11 without introducing new language
features.


## [Extra] Embedded C

> Embedded C is a set of language extensions for the C programming language by
> the C Standards Committee to address commonality issues that exist between C
> extensions for different embedded systems.

These include:

- Fixed-point arithmetic.This is a method of representing fractional
  (non-integer) numbers by storing a fixed number of digits of their fractional
  part. This is less demanding computationally than using float numbers.
> Many embedded processors lack an FPU, because integer arithmetic units
> require substantially fewer logic gates and consume much smaller chip area
> than an FPU
- Memory banks (hardware dependent unit of storage).
- Basic I/O operations.

