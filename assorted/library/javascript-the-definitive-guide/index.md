---
title: JavaScript - The Definitive Guide
author: Marcelo Fernandes
date: May 31, 2022
---

# Review

The author's intent:

> My goal with this book is to document the JavaScript language comprehensively
> and definitively and to provide an in-depth introduction to the most important
> client-side and server-side APIs available to JavaScript programs.

Given that this book is a proper systematic text book, to maximise my
content retention I'll conduct this review on a chapter-to-chapter approach.

Without further do:

## Contents
- [Chapter 1. Introduction to JavaScript](#chapter-1)
- [Chapter 2. Lexial Structure](#chapter-2)
- [Chapter 3. Types, Values, and Variables](#chapter-3)
- [Chapter 4. Expressions and Operators](#chapter-4)
- [Chapter 5. Statements](#chapter-5)
- [Chapter 6. Objects](#chapter-6)
- [Chapter 7. Arrays](#chapter-7)
- [Chapter 8. Functions](#chapter-8)
- [Chapter 9. Classes](#chapter-9)
- [Chapter 10. Modules](#chapter-10)
- [Chapter 11. Standard Library](#chapter-11)
- [Chapter 12. Iterators and Generators](#chapter-12)
- [Chapter 13. Asynchronous JavaScript](#chapter-13)

## Chapter 1
### Introduction to JavaScript

The chapter starts with some definitions and history behind JavaScript. Here
are the comments that I deemed most relevant to start with:

> JavaScript is a high-level, dynamic, interpreted programming language that is
> well-suited to object-oriented and functional programming styles.

Regarding ECMAScript vs JavaScript:

> Because of trademark issues, the standardized version of the language was
> stuck with the name ECMAScript (ECMA: European Computer Manufacturer's
> Association) or ES for short.

> Since ES6, the ECMAScript specification has moved to a yearly release.
> I.e: ES2016, ES2017, etc.

Regarding incompatibility with earlier versions:

> From ES5 and later, programs can opt in to JavaScript's strict mode in which
> a number of language mistakes have been corrected. The mechanism for opting
> in is the "use strict" directive.

> In ES6 and later, the use of new language features often implicitly invokes
> strict mode. For example, if you use the ES6 `class` keyword or create an ES6
> module, then all the code within the class or module is automatically strict.

Conditionally accessing properties with `?.`

Where in Python you would have something like:

```python
book = {"topic": "Python", "edition": 7, "contents": {}}

chap1_sect1 = book.get("contents", {}).get("ch01", {}).get("sect1", "")
```

In JavaScript you would have something like:

```javascript
book = {topic: "JavaScript", edition: 7, contents: {}}

let chap1_sect1 = book.contents?.ch01?.sect1  // undefined.
```

Regarding the definition of an **expression**:

> An _expression_ is a phrase of JavaScript that can be _evaluated_ to produce
> a value. For example, the use of `.` and `[]` to refer to the value of an
> object property or array element is an expression.

A brief introduction of **arrow functions** (those remind a lot lambda
functions in Python)

```javascript
// Firstly, a normal function:
function plus1(x) {
  return x + 1;
}

// Now the arrow function equivalent:
plus1 = x => x + 1;
```

A brief example of looping through an array:

```javascript
function sum(array) {
  let sum = 0;
  for(let x of array) {
    sum += x;
  }
  return sum;
}
```

And a brief example of initialising a class:

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y
    );
  }
}

let p = new Point(1, 1);
```

## Chapter 2
### Lexical Structure

Definition

> The lexical structure of a programming language is the set of elementary
> rules that specifies how you write programs in that language. I.e., syntax.

Comments:

```javascript
// This is a single-line comment
/* This is also a comment */ // and here is another one.

/*
 * This is a multi-line comment. The extra * aren't part of the syntax, they
 * just look cool!
 */
 ```

Identifiers in JavaScript must begin with a letter, an underscore, or a dollar
sign. Example:

```javascript
i
my_variable_name
v13
_dummy
$str
```

Unicode escape sequences:

```javascript
let café = true;
// exactly four hexadecimal digits notation.
caf\u00e9
// one to six hexadecimal digits enclosed by curly braces.
caf\u{E9}
```

Optional semicolons:

> In JavaScript, you can usually omit the semicolon between two statements if
> those statements are written on separate lines. You can also omit a semicolon
> at the end of a program or if the next token in the program is a closing
> curly brace `}`. However, many JS programmers use semicolons to explicitly
> mark the end of statements.

```javascript
// in this case the semicolon could've been ommited.
a = 3;
b = 4;
// in this other case, the semicolon is _required_
a = 3; b = 4;
// not all line breaks are treated as semicolons. E.g:
let a
a
=
3
console.log(a) // This is interpreted as let a; a = 3; console.log(a);
```

A potential problem with the above:
```javascript
let y = x + f
(a+b).toString()
// this is interpreted as
let y = x + f(a+b).toString()
// JS interpreter things that it can continue as
// a function invocation!
```

And therefore:

> In general, if a statement begins with `(`, `[`, `/`, `+`, `-`, there is a
> chance that it could be interpreted as a continuation of the statement
> before. Statements beginning with /, + and - are quite rare in practice, but
> statements beginning with ( and [ are not uncommon.

Some programmers use defensive semicolons at the beginning of such statements
to avoid a bug if the statement before is modified and the previously
terminating semicolon removed.

```javascript
let x = 0
;[x, x+1, x+2].forEach(console.log) // defensive ;
```

Another exception: Never insert a line break between `return`, `break`, or
`continue` and the expression that follows. Example:

```javascript
// if you write
return
true;
// JavaScript interprets as
return; true;
// although you probably meant
return true;
// other exceptions involve ++ and --, and arrow functions.
// in arrow functions the arrow itself must be in the same
// line as the parameter list.
```

## Chapter 3
### Types, Values, And Variables

> JavaScript types can be divided into two categories _primitive types_ and
> _object types_.

> Primitive types include numbers, strings of text, and Boolean truth values.
> The null and undefined are primitive values, but they are not numbers,
> strings, or Booleans.

> ES6 adds a new special-purpose type, known as Symbol. It enables the
> definition of language extensions without harming backward compatibility.
> (More on that later).

In JavaScript, most objects are an unordered collection of named values.
JS also has a special object, known as array, to represent ordered collections
of numbered values. Arrays have some special behaviour that distinguish them
from ordinary objects. Refer to chapter 7. Other useful special objects the
Map object (keys to value), and the Set object.

> JavaScript differs from more static languages in that functions and classes
> are not just part of the language syntax. They are themselves values that
> can be manipulated by JavaScript programs.

JavaScript has a garbage collector that is similar to Python's one. When a
value isn't reachable any more (i.e. when a program doesn't have a way to use
it any more) the interpreter knows it and automatically reclaims the memory.

Gotcha about methods:

> It's not only JS objects that have methods, but numbers, strings, booleans,
> and symbol values behave as if they have methods. **null** and **undefined**
> are the only values that methods cannot be invoked on.

Gotcha about strings:

```javascript
// Strings are immutable
let myString = "abcde";
myString[0] = "z";
myString
// > still prints 'abcde'. However, fails silently.
```

Gotcha about the equality operator:

```javascript
// JS liberally converts values from one type to another:
null == undefined // > true: These two values are treated equal.
"0" == 0 // > true: String converts to a number before comparing.
0 == false // > true: Boolean converts to a number before comparing.
"0" == false // > true: Both convert to 0 before comparing.

/* Note: In practice the `==` operator is
 * deprecated in favor of the `===` operator,
 * which doesn't do type conversions.
 */
```

On numbers:

```javascript
// On hexadecimals:
0xff + 0xff // > (255 + 255) = 510
// > ES6 you can express integers in binaries:
0b10101
// and octals
0o377
// You can use underscores to make they read nicer
let billion = 1_000_000_000;
let bytes = 0x89_AB_CD_EF;
```

Gotcha about numbers:

> Arithmetic in JavaScript does  not raise errors in cases of overflow,
> underflow, or division by zero. When the result of numeric operations are
> larger than the largest representable number (overflow), the result is
> the special infinity value, Infinity.

> For underflows, i.e., when the result of an operation is closer to zero than
> the smallest representable number, JavaScript returns 0 (or -0!).

> Division by zero isn't an error in JavaScript, it simply returns infinity.
> The only exception is zero divided by zero, in this case JS returns a special
> not-a-number (NaN). Same with square root of negative numbers and dividing
> infinity by infinity.

Gotcha about NaN:

> In JavaScript NaN doesn't compare equal to any other value, including itself.
> This means that to determine if a value is a NaN, you got to do
> `Number.isNaN(x)` as x === NaN won't work!!!
> Another handy function is `Number.isFinite()`, which returns true if its
> argument is anything except Infinity, -Infinity, or NaN.

On BigInt

```javascript
// In ES2020 you can us BigInt.
// BigInts can have millions of digits
// They are declared with a `n` at the end of the number
typeof(1234n) // > 'bigint'
// They shouldn't be mixed with other numbers in arithmetic!
1234n + 20 // > Uncaught TypeError: cannot mix BigInt and other types.
// The exception being comparison!
1 < 2n // > true
1 === 1n // > false, === checks for type equality too!
```

On template literals (template strings).

Template strings are delimited with backticks (`). Allowing for string
interpolation, multi-line strings, and tagged templates.

```javascript
// untagged, these create strings:
`string text`;

`string text first line;
string text second line`;

// similar to f-strings in Python
`string text ${expression} string text`;

// Tagged. This calls the function
// "tagFunction" with the template as
// the first argument, and substitution
// values as subsequent arguments:
function tagFunction(strings, ...values) {
  console.log(strings);
  console.log(values);
}

let var1 = "Hello, ";
let var2 = "world.";
tagFunction`My text is: ${var1}${var2} Cool?`;
// > [ 'My text is: ', '', ' Cool?' ]
// > [ 'Hello, ', 'world.' ]
```

Handy string manipulation methods:

```javascript
let s = "Hello, world";

// Note that all of these methods
// don't actually change the string,
// as in JS strings are immutable.
// They, instead, return a whole new
// string.
s.split(", ") // > [ "Hello", "world"]
s.slice(1, 4) // > "ell". Note: last number is not inclusive.
s.indexOf("l") // > 2: first position of letter l
s.startsWith("Hello") // > true
s.endsWith("!") // > false
s.includes("or") //> true* like "or" in s (Python)
s.replace("llo", "ya")  // > "Heya, world"
s.toLowerCase() // > "hello, world"
s.toUpperCase() // > "HELLO, WORLD"
" test ".trim() // > "test"
" test ".trimStart() // > "test "
" test ".trimEnd() // > " test"
```

Falsy values that wouldn't work on a conditional:

```javascript
// values that would fail a conditional
// if (o) ...
undefined
null
0
-0
NaN
"" // the empty string.
// Note: All objects are truthy by definition.
```

On `undefined` vs `null`:

> I consider `undefined` to represent a system-level, unexpected, or error-like
> absence of value and `null` to represent a program-level, normal, or expected
> absence of value.

On Symbols:

> Property names are typically (and until ES6, exclusively) strings. But in
> ES6 and later, `Symbols` can also serve this purpose:

```javascript
let strname = " string name";
let symname = Symbol("propname");
typeof strname // > string
typeof symname // > symbol
let o = {}; // create an object
o[strname] = 1;
o[symname] = 2;
o[strname] // 1
o[symname] // 2
```

> To obtain a Symbol, you call the `Symbol()` function. This function never
> returns the same value twice, even when called with the same argument.

> This means that if you call Symbol to obtain a Symbol value, you can safely
> use that value as a property name to add a new property to an object and do
> not need to worry that you might be overwriting an existing property with the
> same name.

> Similarly, if you use symbolic property names and do not share those symbols,
> you can be confident that other modules of code in your program will not
> accidentally overwrite your properties.

It's worth noting that when wanting to share a Symbol with another module, you
can call the method `Symbol.for()` with a string. This method returns an
existent symbol, or creates a new one, with the associated string. This is
useful when sharing a Symbol between modules.

```javascript
let s = Symbol.for("shared");
let t = Symbol.for("shared");

s === t // > true
s.toString() // => "Symbol(shared)"
Symbol.keyFor(t) // => "shared"
```

Regarding the global object:

> Every time a JavaScript interpreter starts (or a web browser opens a new
> page), it creates a new global object.

> In Node, the global object has a property named `global` whose value is the
> global object itself. In web browsers, the `window` object serves as the
> global object, but it includes extra functionalities specific to web browsers

> ES2020 finally defines `globalThis` as the standard way to refer to the
> global object in any context.

Objects are not compared by value. Two distinct objects are not equal even if
all their properties and values are equal.

Two object values are the same if and only if they refer to the same underlying
object.

```javascript
let o = {x:1}, p = {x:1};
o === p // => false

let a = [], b = [];
a === b // => false
```

Explicit conversions might be useful to make the code clearer.

```javascript
Number("3"); // > 3
String(false); // > "false"
Boolean([]); // > true

// All functions above can
// be invoked with `new`
// If you use them this way,
// you'll get a wrapper object
// that behaves just like a primitive
// boolean, number, or string.
// However, those wrappers are just
// a historical leftover from earliest
// JS days, and there is never really
// any good reason to use them.

// ---
// Another way to convert objects
// that isn't so straightforward is
// the following:
x + "" // > String(x)
+x // > Number(x)
x-0 // > Number(x)
!!x // > Boolean(x)
```

Number formatting for display:

```javascript
let n = 123456.789;

n.toFixed(0) // > 123457 (rounded up)
n.toFixed(2) // > 123456.79 (rounded up)
n.toFixed(5) // > 123456.78900 (padded)

n.toExponential(1) // > 1.2e+5
n.toExponential(4) // > 1.235e+5

n.toPrecision(4) // > 1.235e+5 (same as above)
n.toPrecision(7) // > 123456.8

// In addition to the above,
// the class Intl.NumberFormat
// class defines a more general,
// internationalised number-formatting.

// parseInt and parseFloat are more
// general and can handle hexadecimal.
// parseFloat can handle both int and float.
// they both skip leading spaces too.
// Those functions try to parse as
// many numeric characters as they
// can, and ignore anything that follows.
// if the first nonspace character is not
// part of a valid numeric literal, they
// return NaN

parseInt("3 blind mice")  // > 3
parseFloat(" 3.14 meters") // > 3.14
parseInt("-12.34") // -12
parseInt("0xFF") // > 255
parseFloat(".1") // > 0.1
parseInt("0.1") // > 0
parseInt(".1") // > NaN (integers can't start with "."
parseFloat("$72.47") // NaN: numbers can't start with "$"
```

The `toString()` method:

```javascript
// All objects inherit two conversion
// methods that are used by object-to-primitive
// conversions.

// The first method is `toString()`.
// Its job is to return a string repr
// of the object. The default doesn't
// return a very interesting value.

({x: 1, y:2}).toString() // > "[object Object]"

// The toString() method of an Array
// converts each element to string and
// joins the resulting with commas

[1,2,3].toString() // > "1,2,3"

// the Function converts user-defined
// functions to strings.
(function(x) { f(x); }).toString() // > "function(x) { f(x); }"

// dates return a human-readable and
// JS-parsable date and time string
let d = new Date(2020,0,1)
// > "Wed Jan 01 2020 00:00:00 GMT+1300 (New Zealand Daylight Time)"

// overriting the toString method:
let point = {
  x: 1,
  y: 2,
  toString: function() { return `(${this.x}, ${this.y})`; }
}
String(point) // > "(1, 2)"
```

The `valueOf()` method

```javascript
// The job of this method isn't well defined.
// It is supposed to convert an object to a
// primitive value that represents the object
// if such primitive value exists.

// As most objects can't be represented by
// a single primitive value, so the default
// `valueOf()` method simply returns the
// object itself.

let d = new Date(2010, 0, 1);
d.valueOf()  // > 1577790000000
```

On `let`.

> It's a good programming practice to assign an initial value to your variables
> when you declare them, when this is possible:

```javascript
let message = "hello";

// You can also declare multiple variables
let i, sum;
i // > undefined
```

On `const`.

> To declare a constant instead of a variable use const instead of let.
> const works just like let except that you must initialize the constant when
> you declare it.

> Additionally, you can't change the value of a const. Attempting to, will
> raise a TypeError.

> It is a common (but no universal) convention to declare constants using names
> with all capital letters such as H0 or HTTP_NOT_FOUND as a way to
> distinguish them from variables.

When to use const:

> There're two schools of thought about the use of the const keyword. One
> approach is to use const only for values that are fundamentally unchaning, like
> physical constants, or program version numbers, or byte sequences used to
> identify file types, for example.
>
> Another approach recognizes that many of the so-called variables in our program
> don't actually ever change as our program runs. In this approach, we declare
> everything with const, and then if we find that we do actually want to allow
> the value to vary, we switch the declaration to let. This may help prevent bugs
> by ruling out accidental changes to variables that we did not intend.
>
> In one approach, we use const only for values that must not change. In the
> other, we use const for any value that does not happen to change. I prefer the
> former approach in my own code.

Surprisingly `const` can be used in the body of loops. In this case, it means
that the body of the loop doesn't reassign a new value to that const.

```javascript
for(const datum of data) console.log(datum);
for(const property in object) console.log(property);
```

Repeated declarations:

It is a syntax error to use the same name with more than one let or const
declaration in the same scope. It is legal (though a practice best avoided) to
declare a new variable with the same name in a nested scope:

```javascript
const x = 1; // global constant
if (x === 1) {
  let x = 2; // inside a block `x` can refer to a different value
  console.log(x); // > 2
}
console.log(x); // > 1
let x = 3; // SyntaxError. Identifier 'x' has already been declared.
```

Differences between `var` and `let`:

- Variables declared with `var` do not have block scope. Instead, they are
  scoped to the body of the containing function no matter how deeply nested
  they are inside that function.
- If you use `var` outside of a function body, it declares a global variable.
  But global variables declared with `var` differs from globals declared with
  `let` in an important way. Globals declared with var are implemented as
  properties of the global object. The global object can be referenced as
  globalThis. So if you write `var x = 2;` outside of a function, it is like
  you wrote `globalThis.x = 2;`. Note that the analogy isn't perfect: the
  properties created with global var declarations cannot be deleted with the
  delete operator. Global variables and constants declared with let and const
  are not properties of the global object.
- Unlike variables declared with let, it is legal to declare the same variable
  multiple times with var. And because var variables have function scope
  instead of block scope, it is actually common to do this kind of
  redeclaration. The variable `i` is frequently used for integer values, and
  specially as the index variable of `for` loops. In a function with multiple
  for loops, it is typical for each one to begin `for(var i = 0; ...`. Because
  var does not scope these variables to the loop body, each of these loops is
  (harmlessly) re-declaring and re-initialising the same variable.
- One of the most unusual features of var declarations is known as `hoisting`.
  When a variable is declared with var, the declaration is lifted up (or
  "hoisted") to the top of the enclosing function. The initialisation of the
  variable remains where you wrote it, but the definition of the variable moves
  to the top of the function. So variables declared with var can be used,
  without error, anywhere in the enclosing function. If the initialisation code
  has not run yet, then the value of the variable may be undefined, but you
  won't get an error if you use the variable before it is initialised. This can
  be a source of bugs and is one important misfeature that let corrects: if you
  declare a variable with let but attempt to use it before the let statement
  runs, you will get an actual error instead of just seeing an undefined
  value).

Using undeclared variables in strict mode:

>In strict mode, if you attempt to use an undeclared variable, you'll get a
>reference error when you run your code. Outside of strict mode, however, if you
>assign a value to a name that has not been declared with let, const, or var,
>you'll end up creating a new global variable. It will be a global no matter how
>deeply nested within functions and blocks your code is, which is almost
>certainly not what you want, is bug-prone, and is one of the best reasons for
>using strict mode.

>Global variables created in this accidental way are like global variables
>declare with var: they define properties of the global object. But unlike the
>properties defined by proper var declarations, these properties can be delted
>with the delete operator.

On destructuring assignment

>ES6 implements a compound declaration and assignment syntax know as
>destructuring assignment. In destructuring assignment, the value on the
>righthand side of the equals sign is an array or object (a "structured" value),
>and the lefthand side specifies one or more variable names using a syntax that
>mimics array and object literal syntax.

```javascript
let [x,y] = [1,2]; // same as let x=1, y=2;
[x,y] = [x+1,y+1]; // same as x = x + 1, y = y + 1;
[x, y] = [y, x]; // swap the value of two variables.
let [a, [b,c]] = [1, [2,2.5], 3] // > a==1, b==2, c==2.5 (3 is ignored).
```

Destructuring assignment makes it easy to work with functions that return
arrays of values:

```javascript
// Convert [x,y] coordinates
// to [r, theta] polar coordinates
function toPolar(x, y) {
  return [Math.sqrt(x*x+y*y), Math.atan2(y,x)];
}

// convert polar to cartesian
function toCartesian(r, theta) {
  return [r*Math.cos(theta), r*Math.sin(theta)];
}

let [r, theta] = toPolar(1.0, 1.0);
let [x,y] = toCartesian(r, theta);
```

Destructuring assignment also works in loops.

```javascript
// similar to dict.values() in Python.
let o = { x:1, y:2 };
for(const [key, value] of Object.entries(o)) {
  console.log(key, value);
}
```

Gotcha about Destructuring assignments:

>The number of variables on the left of a destructuring assignment does not have
>to match the number of array elements on the right. Extra variables on the left
>are set to undefined, and extra values on the right are ignored. The list of
>variables on the left can include extra commas to skip certain values on the
>right.

```javascript
let [x,y] = [1] // x == 1, y == undefined
[x,y] = [1,2,3] // x == 1, y == 2
[,x,,y] = [1,2,3,4] // x == 2, y == 4

// If you want to collect all unused or
// remaining values into a single variable
// when destructuring an array, use (...)
// three dots, before the last variable name
// on the left hand side.

let [x, ...y] = [1,2,3,4]; // x == 1, y == [2,3,4]

// Also works with iterables
let [first, ...rest] = "hello" // first == "h", rest == ["e", "l", "l", "o"]

// and with object values.
let transparent = {r: 0.0, g: 0.0, b:0.0};
let {r, g, b} = transaprent // r == 0.0, g == 0.0, b == 0.0

// and with object methods into variables
// of the same name
const {sin, cos, tan} = Math; // sin==Math.sin, cos==Math.cos, ...

// or with key value pairs for renaming it.
const { cos: cosine, tan: tangent } = Math;
// "I find that object destructuring syntax
// becomes too complicated to be useful when
// the variable names and property names are
// not the same." The author.
```

## Chapter 4
### Expressions and Operators

Array initialisers:

```javascript
// Undefined elements can be included
// in an array literal by simply omitting a
// value between commas

let sparseArray = [1,,,,5];
```

Conditional property access `?.` and `?.[]`

```javascript
let a = { b: null };
a.b // > null
// a is an object, so a.b is a valid
// property. But the value of a.b is
// null, so a.b.c would throw a TypeError.
// By using a.b?.c, now c evaluates to
// undefined. This means that (a.b?.c).d
// will throw a TypeError because the
// expression attempts to access a property
// of the value undefined.

// However, and this is an important gotcha,
// a.b?.c.d (without the parentheses) simply
// evaluates to `undefined` and does not throw
// an error. This is because property access
// with ?. is "short-circuiting". If the
// subexpression to the left of ?. evaluates
// to null or undefined, then the entire
// expression immediately evaluates to
// undefined without any further property access
// attempts.
a.b?.c.d

// Of course, if a.b is an object, and if that
// object has no property named c, then a.b?.c.d
// will again throw a TypeError. Thus:
let a = { b: {} };
a.b?.c?.d // > undefined

// now with arrays:
let a;
let index = 0;
try {
  a[index++]; // throws TypeError
} catch(e) {
  index // > 1: increment occurs before TypeError
}
a?.[index++] // undefined because a is undefined
index // > 1: not incremented because ?.[] short-circuits
a[index++] // TypeError: can't index undefined.
index // > 2: incremented the index first.
```

Conditional invocation with `?.()`.

```javascript
// before ES2020

function square(x, log) {
  if (log) {
    log(x)
  }
  return x*x;
}

// after ES2020
function square(x, log) {
  log?.(x);
  return x * x
}
// note that ?.() only checks whether
// the lefthand side is null or undefined.
// It does not verify that the value is actually
// a function. So the `square()` function in
// this example would still throw an exception if
// you passed two numbers to it, for example.

// like conditional property access, the ?.()
// is short-circuiting. If the value to the left
// of ?. is null or undefined, then none of the
// argument expressions within the parenthesis
// are evaluated.
```

On `==` (equality operator) and `===` (strict equality operator):

>The == operator is a legacy feature of JavaScript and is widely considered to
>be a source of bugs. You should almost always use === instead of ==, and !==
>instead of !=.

The `in` operator:

```javascript
let point = {x: 1, y:1};
"x" in point // > true
"z" in point // > false (no property with this name)
"toString" in point // > true

let data = [7,8,9];
"0" in data // true (surprisingly different than Python)
1 in data // true
3 in data // false (no element 3)
7 in data // false (no element 7)
```

The `instanceof` operator:

> Note, `instanceof` considers multiple inheritance.

```javascript
let d = new Date();
d instanceof Date // true
d instanceof Object // true. All objects are instance of Object

let a = [1,2,3]
a instanceof Array // true
a instanceof Object // true arrays are objects.
```

The first-defined operator `??`.

```javascript
// the ?? operator is equivalent to
(a !== null && a !== undefined) ? a : b
```

`??` is a useful alternative to || when you want to select the first *defined*
operand rather than the first truthy operand.

```javascript
// the problem with the following is that
// if maxWidth is set to 0, it will be ignored
let max = maxWidth || preferences.maxWidth || 500;

// However, if maxWidth is 0, now
// it won't be ignored
let max = maxWidth ?? preferences.maxWidth ?? 500;

// other useful examples
let options = {timeout: 0, title: "", verbose: false, n: null}
options.timeout ?? 1000 // > 0
options.title ?? "Untitled" // > ""
options.verbose ?? true // > false
options.quiet ?? false // false
options.n ?? 10 // 10 (property is null)
```

The `delete` operator

```javascript
let o = { x: 1, y: 2 };
delete o.x
"x" in o // > false

let a = [1,2,3]
delete a[2]
2 in a // > false

// deleting an array element leaves a
// "hole" in the array and does not change
// the array's length.
a.length // > 3
```

## Chapter 5
### Statements

The empty statement allows you to include no statements where one is expected.

```javascript
// empty statements are represented
// by a single semi colon ";"

// this for loop, for example, changes
// the array elements to zero.
for(let i=0; i < a.length; a[i++] = 0) ;

// Note that the inclusion of a
// semicolon after the right
// parenthesis of a for loop, while
// loop, or if statement can cause
// a lot of frustrating bugs.
// for example:
if ((a===0) || (b===0)); // this line does nothing
  o = null; // thus this line is _always_ executed

```

Looping with `for of` or `for/of`

```javascript
// ES6 defines for/of
// It is different from for/in.
// for/of works with iterables
// arrays, strings, sets, and maps are iterables.

let data = [1,2,3,4,5,6,7,8,9], sum = 0;
for (let element of data) {
  sum += element
}
sum // => 45

// Objects are not (by default) iterable.
let o = {x: 1, y: 2, z: 3};
for (let element of o) { // TypeError: o is not iterable
  console.log(element);
}

// for doing the above you can just
// use the for/in loop, or use
// Object.keys(), Object.values():
for (let element of Object.keys(o)) {
  console.log(element) // prints x \n y \n z
}
// Or Object.entries() if you are interested
// in both keys and values:
for (let [k, v] of Object.entries(o)) {
  console.log(k + ":" + v); // x:1 x:2 x:3
}
// the above is similar to dict.items() in Python.
```

Looping with `for in` or `for/in`

Gotchas:
> Enumerable inherited properties are enumerated by the for/in loop. This means
> that if you use for/in loops and also use code that defines properties that are
> inherited by all objects, then your loop may not behave in the way you expect.
> This is the reason many programmers prefer to use a for/of loop with
> Object.keys() instead of a for/in loop.

```javascript
// while a for/of requires an iterable,
// for/in works with any object.

// for/in loops through the property
// of an object.
let o = {x: 1, y: 2, z: 3};
for (let element in o) {
  console.log(element); // prints x \n y \n z
}

// Gotcha: for arrays it returns the
// index numbers in an array. This is
// a common source of bugs. More often than
// not you want to use for/of for arrays:

let l = ["a", 2, 3.14];
for (let index in l) {
  console.log(index);  // 0 \n 1 \n 2
}

// on enumarable inherited properties:
// Somewhere deep in your JavaScript library...
Array.prototype.foo = 1;

// Now you have no idea what the below code will do.
var a = [1, 2, 3, 4, 5];
for (let x in a){
  // Now foo is a part of EVERY array and
  // will show up here as a value of 'x'.
  console.log(x); // 1,2,3,4,5,foo
}

for (let x of a){
  // this actually does what you wanted!
  console.log(x); // 1,2,3,4,5
}

// to safeguard against enumareting inherited
// properties you can:
for (let i in object) {
  if !(object.hasOwnProperty(i)) continue
  // you might also want to skip functions
  if !(typeof object[i] === 'function') continue
}
```

Labelled statements

By labelling a statement, you give it a name that you can refer back somewhere
else in the program.

> break and continue are the only JS statements that use statement labels.

```javascript
mainloop: while(token !== null) {
  // ...
  continue mainloop; // jump back to the top
  // ...
}
```

JavaScript exception triggered uses `throw`

```javascript
function factorial(x) {
  if (f < 0) {
    throw new Error("x must not be negative");
  }
  // otherwise compute a value normally.
  for (f = 1; x > 1; f *= x, x--) /* empty */ ;
  return f
}
```

Gotcha about `try/catch/finally`

The finally block is always executed regardless of what happens in the try
block. If the interpreter left the try block because of a return, continue, or
break, the finally block is executed before the interpreter jumps to its new
destination.

Similarly, the interpreter first executes the catch block and then the
finally block. If no catch block is there to handle an exception, the
interpreter first executes the finally block and then jumps to the nearest
containing catch clause.

**try and finally** can be used without a catch clause. In this case, the
finally block is simply clean-up code that is guaranteed to be executed.

---

The `with` statement runs a block of code as if the properties of an object
were variables in the scope of that code.

> However, the with statement is forbidden in strict mode, and should be
> considered deprecated in non-strict mode.
> JS code that uses with is difficult to optimise and is likely to run slower
> than the equivalent code without the with statement.

```javascript
with (object)
  statement
```

---

The `debugger` statement is the effective way of adding breakpoints in JS code.

```javascript
function f(o) {
  if (o === undefined) debugger;
  ...
}
```

---

`use strict`. The strict mode is a restricted subset of the language that fixes
important deficiencies, providing stronger error checking and increased
security.

> The purpose of a "use strict" directive is to indicate that the code that
> follows is strict code.

> In addition to code explicitly declared to be strict, any code in a **class**
> body or in an ES6 module is automatically strict code. This means that if all
> of your JS code is written as modules, then it is all automatically strict, and
> you will never need to use an explicit "use strict" directive.

Rules:

- The **with** statement is not allowed.
- All variables must be declared, otherwise ReferenceError is thrown. Remember
  that in non-strict mode, this implicit variable declares a global variable by
  adding a new property to the global object.
- Functions invoked as functions (rather than as methods) have a **this** value
  of undefined. In non-strict mode, **this* is the global object.
  Also, for functions invoked with call() or apply(), **this** is the value
  passed as the first argument to these functions. In non strict-mode, null and
  undefined values are replaced with the global object.


For more items, refer to section 5.6.3 of the book!

---

`var`

> Variables declared with var are scoped to the containing function rather than
> the containing block. In modern JS there is really no reason to use var instead
> of let


## Chapter 6
### Objects

> An object is an unordered collection of properties, each of which has a name
> and a value.

> It is sometimes important to be able to distinguish between properties defined
> by the object and properties defined by its prototype. JS uses the term own
> property for the non-inherited properties.

In addition to its name and value, each property has three property attributes:
1. The writeable attribute specifies whether the value of a property can be set.
2. The enumerable attribute specifies whether the property name is returned by a
   for/in loop.
3. The configurable attribute specifies whether the property can be deleted and
   whether its attributes can be altered.

---

`object literal`: The simple JS objects defined by comma-separated key-pair
values. Like a Python dictionary.

---

`Object.create()`

> One use for Object.create() is when you want to guard against unintended (but
> non-malicious) modification of an object by a library function that you don't
> have control over. Instead of passing the object directly to the function, you
> can pass an object that inherits from it. If the function reads properties of
> that object, it will see the inherited values. If it sets properties, however,
> those writes will not affect the original object.

```javascript
let o = {x:"don't change this value"};
library.function(Object.create(o)); // guard against accidental modifications.
```

---

`Object.assign()`
Extending objects is a common operation.

```javascript
Object.assign(o, defaults) // overwrites everything in o with defaults

// Creates a new object,
// copies the defaults into it,
// and then override those defaults with the properties
// in o.
o = Object.assign({}, defaults, o)

// Same as the above:
o = {...defaults, ...o};
```

---

Computed Property Names

Sometimes you need to use the value of a variable as the key to an object:

```javascript
const PROPERTY_NAME = "p1";

// wrong!
let o = {PROPERTY_NAME: 1} // {"PROPERTY_NAME": 1}

// correct!
let oo { [PROPERTY_NAME]: 1 } // {"p1": 1}

// The above also works with symbols
const extension = Symbol("my extension symbol");
let oo = { [extension]: "data" };
```

---

Spread Operator: `...`

In ES2018 and later you can copy the properties of an existing object into
a new object using the spread operator:

```javascript
let position = {x:1, y:0};
let dimensions = {width:100, height:75};
let rect = {...position, ...dimensions};

rect.x + r.height // 76

// note that spread operator only spreads
// own properties of an object, not any
// inherited ones via prototype.
let o = Object.create({x: 1});
let p = { ...o };
p.x // undefined
```

---

`get` and `set`

```javascript
let p = {
  x: 1.0,
  y: 1.0,
  // getter and setter (read-write property)
  get r() { return Math.hypot(this.x, this.y) },
  set r(newvalue) {
    let oldvalue = Math.hypot(this.x, this.y);
    let ratio = newvalue/oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },
  // read-only property:
  get theta() { return Math.atan2(this.y, this.x) },
}
```

## Chapter 7
### Arrays

- An array is an ordered collection of values
- JavaScript arrays are untyped. I.e., an array element may be of any type, and
  different elements of the same array may be of different types.
- An array cannot have more than 2**32 - 2 = 4294967294 indexes.
- Arrays may be sparse: The elements need not have contiguous indexes, and
  there may be gaps

```javascript

let sparse_array = [1,,3] // No element at index 1, length = 3.
let ten_elements_sparse = new Array(10);

let non_sparse = new Array(1, 2)
non_sparse // [1, 2]
```

---

Spread operator on Arrays
```javascript

// spread operator over arrays:
let a = [1, 2, 3];
let b = [0, ...a, 4]; // [0,1,2,3,4]

// useful for shallow copies
let original = [1,2,3];
let copy = [...original];
copy[0] = 0; // modifying the copy doesn't change the original.

// true copy
let another_copy = new Array.from(original);

// you can use spread to turn strings into array:
let digits = [..."01234567890"]
digits // > ['0','1','2',...,'0'];

// turn array to set and back to array:
let letters = [..."hello world"];
[...new Set(letters)] // ["h", "e", "l", "l", ..., "d"]
```

---

`push` and `pop` on Arrays

```javascript
let a = [];
a.push("zero") // a = ["zero"]
let b = a.pop() // a = []
b // "zero"
```

---

Array `entries`

> Useful for when you need both the index and the element of the array.

```javascript
let everyother = "";
for (let [index, letter] of letters.entries()) {
  if (index % 2 === 0) everyother += letter
}
```

---

`forEach`

> The difference between forEach and for/of is that the first is aware of
> sparse arrays and does not invoke your function for elements that are not
> there.


```javascript
let data = [1,2,3,4,5], sum = 0;
data.forEach(value => {sum += value}); // sum == 15

// with two entries
data.forEach(
  (value, index) => {
    sum += value;
    console.log(index); // 1 \n 2 \n 3...
  }
); // sum == 15

// Finally, forEach can be called with 3 arguments:
// the value of the element, the index,
// and the array itself:
data.forEach(function(v, i, a) { a[i] = v + 1; });
data // data == [2,3,4,5,6]
```
---

`map`

> Returns a new array with the mapped values

```javascript
let a = [1,2,3];
a.map(x => x*x) // [1, 4, 9]
```
---

`filter`

> Returns a new array containing a subset of filtered values for the array.

```javascript
let a = [5,4,3,2,1];
a.filter(x => x < 3) // [2, 1]
```
---

`find` and `findIndex`

> Like filter() but shortcuts when the first predicade finds an element.
> Returns the element

```javascript
let a = [1,2,3,4,5];
a.find(x => x % 5 === 0) // 5
a.find(x => x % 7 === 0) // undefined

a.findIndex(x => x === 3) // 2
a.findIndex(x => x < 0) // -1; no negative numbers in the array.
```
---

`every` and `some` (like python `any` and `all`)

```javascript
let a = [1,2,3,4,5];
a.every(x => x < 10) // true
a.some(x => x % 2 === 0) // true
a.some(isNaN) // false, no non-numeric values.
```

---

`reduce` and `reduceRight` (similar to Python's `sum` but more generic)

```javascript
let a = [1,2,3,4,5];

// the second argument (0) is optional.
a.reduce((x, y) => x+y, 0) // 15 (the sum)

a.reduce((x, y) => (x > y) ? x : y) // 5 (largest value)

// reduceRight is the same as
// reduce, but it starts from the
// highest index.
let a = [2,3,4];
a.reduceRight((acc,val) => Math.pow(val,acc)) // 2^(3^4)
```

---

`flat` and `flatMap`

```javascript
// new in ES2019
[1, [2,3]].flat() // [1,2,3]
[1, [2, [3]]].flat() // [1,2,[34]]

// to flat more levels pass a
// number to flat
let a = [1,[2,[3,[4]]]];
a.flat(1) // [1,2,[3,[4]]
a.flat(999) // [1,2,3,4]

// flatMap is like flat but
// allows you to pass a function
// to map the values.
let phrases = ["hello world", "hi hi"];
let words = phrases.flatMap(phrase => phrase.split(" "));
words // ["hello", "world", "hi", "hi"]
```

---

`concat` (like Python's `extend`)

```javascript
let a = [1,2,3];
a.concat(4, 5); // [1,2,3,4,5]
```

---

`push` (like Python's `append`) and `pop`

```javascript
let a =[1,2,3];
a.push(4,5); // a == [1,2,3,4,5]

a.pop() // 5; also a == [1,2,3,4]
```

---

`includes` (Like Python's `in`)

```javascript
// new in ES2016.

let a = [1,true,3,NaN];
a.includes(true) // true
a.includes(2) // false
a.includes(NaN) // true

// the === algorithm for indexOf
// does not consider NaN to be equal
// to itself.
a.indexOf(NaN) // -1 (indexOf can't find NaN)
```

## Chapter 8
### Functions

In JavaScript, functions are objects and can be manipulated by programs.
JavaScript can assign functions to variables and pass them to other functions.

Javascript function definitions can be nested within other functions.
In this case, they have access to any variables that are in scope where they
are defined. This means that JavaScript functions are closures.

> Function declaration statements are "hoisted" to the top of the enclosing
> script, function, or block so that functions defined in this way may be invoked
> from code that appears before the definition.

---

Default function values.

> Parameter default expressions are evaluated when your function is called,
> not when it is defined.

```javascript
// In ES6 and later you can
// define default values for
// your function arguments
function getPropertyNames(o, a = []) {
  for (let property in o) a.push(property);
  return a
}
```

---

Rest parameters (like Python's `*args`, `**kwargs`)

> Important: within the body of the function, the `rest` argument will ALWAYS
> be an Array.

```javascript
function max(first=-Infinity, ...rest) {
  let maxValue = first;
  for let (n of rest) {
    if (n > maxValue) {
      maxValue = n;
    }
  }
}

max(1, 10, 100, 5, 6, 7); // > 100
```

---

Declaring and calling an anonymous function

```javascript
(function() {console.log('hi')}());

// or (note the parenthesis)
(function() {console.log('hi')})();
```

---

`call` and `apply`

> call() and apply() allow you to indirectly invoke a function as if it were a
> method of some other object. The first argument to both functions is the object
> on which the function is to be invoked. This argument is the invocation context
> and becomes the value of the `this` keyword within the body of the function

> Remember that arrow functions inherit the `this` value of the context where
> they are define. Thus, call() and apply() methods don't work with it as the
> first argument is effectively ignored.

> The apply() method is like call(), except that the arguments to call the
> function with are passed as an array

```javascript
f.call(o);
f.apply(o);

o.m = f; // make f a temporary method of o
o.m(); // invoke it
delete o.m; // remove the temporary method

// any arguments after the first, are passed
// into the function:
f.call(o, 1, 2); // f(1, 2)

// apply uses arrays.
f.apply(o, [1,2]);
```

---

`bind`

> The primary purpose of bind() is to bind a function to an object. When you
> invoke the bind() method on a function f and pass an object o, the method
> returns a new function. Invoking the new function (as a function) invokes the
> original function f as a method of o.

> Arrow functions inherit their this value from the environment in which they are
> defined, and that value cannot be overridden with bind(), so if the function
> f() in the preceding code was defined as an arrow function, the binding would
> not work.

> The most common use case for calling bind() is to make non-arrow functions
> behave like arrow functions, however, so this limitation on binding arrow
> functions is not a problem in practice.

```javascript
// function that will bound
function f(y) {return this.x + y}
let o = { x: 1};
// calling g will invoke f on o.
let g = f.bind(o);
g(2) === 3;
let p = {x: 10, g};
p.g(2) === 3; // g is still bound to o, not p.
```

## Chapter 9
### Classes

> In JavaScript, a class is a set of objects that inherit properties from the
> same prototype object. The prototype object, therefore, is the central feature
> of a class.

> If we define a prototype object, and then use `Object.create()` to create
> objects that inherit from it, we have defined a JavaScript class.

However, ES6 introduces the reserved word `class`, making the creation of new
instances more straightforward.

The example below demonstrates an idiomatic way to create classes in versions
of JavaScript that do not support the ES6 `class` keyword. A lot of old cold
still uses this class-creation pattern.

```javascript
function Range(from, to) {
  this.from = from;
  this.to = to;
}

// note that the property name
// must be "prototype" for this
// to work.
Range.prototype = {
  constructor: Range, // explicitly set the constructor.
  includes: function(x) { return this.from <= x && this.to >= x },
  // a generator to make iterables
  [Symbol.iterator]: function*() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x
  },
  toString: function() {return "("+this.from+"..."+this.to+")";},
}

let r = new Range(1,3);
r.includes(2) // true
r.toString() // (1,...,3)
[...r] // [1,2,3]
typeof r // "object"
r instanceof Range // true
```

Note that the above doesn't work well with subclasses. Prior to ES6, JavaScript
didn't have a simple way to call the parent class methods as the keyword
`super` does.

> Any regular JS function can be used as a constructor. Constructor invocations
> need a prototype property. Therefore, every regular JS function automatically
> has a prototype property. The value of this property is an object that has a
> single, non-enumerable, constructor property. The value of the constructor
> property is the function object:

```javascript
let F = function() {}; // "F" is the function object
let p = f.prototype;
let c = f.constructor;

c === F // true > F.prototype.constructor === F for any f

let o = new F();
o.constructor === F // true
```

Using ES6, the Range example above can be rewritten as:

```javascript
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  includes(x) {
    return this.from <= x && this.to >= x
  }

  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x
  }

  toString() {
    return `(${this.from},...,${this.to})`;
  }
}

let r = new Range(1, 3);
r.includes(2) === true
r.toString() === '(1,...,3)';
[...r] // -> [1,2,3];

Range.prototype.constructor === Range
```

Note that the use of `class` is just syntax sugar, as it does exactly the same
thing as the previous example using pre-ES6 JavaScript.

Also, unlike function declarations, class declarations are not "hoisted" to the
top of the enclosed file or enclosed function. Thus, you cannot instantiate a
class before you declare it.

---

`extend` can be used to define subclasses.


```javascript
class Span extends Range {
  constructor(start, length) {
    if (length >= 0) {
      // super calls Range.constructor
      super(start, start + length);
    } else {
      super(start + length, start);
    }
  }
}

class EZArray extends Array {
  get first() { return this[0]; },
  get last() { return this[this.length - 1]; },
}
```

---

`static` methods.
You can define a static method within a class body by prefixing it with the
static keyword. Static methods are defined as properties of the constructor
function rather than properties of the prototype object.

Because static methods are invoked on the constructor rather than on any
particular instance, it almost never makes sense to use the this keyword in a
static method.

```javascript
static parse(s) {
  let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
  if (!matches) {
    throw new TypeError(`Cannot parse Range from "${s}".`);
  }
  return new Range(parseInt(matches[1]), parseInt(matches[2]));
}

let r = Range.parse('(1...10)');
// won't work for the instance.
r.parse('(1...10)'); // TypeError: r.parse is not a function
```
---

`static fields`

```javascript
// instead of
class Buffer {
  constructor() {
    this.size = 0;
    this.capacity = 4096;
    this.buffer = new Uint8Array(this.capacity);
  }
}

// do:
class Buffer {
  size = 0;
  capacity = 4096;
  buffer = new Uint8Array(this.capacity);
}
```

---

`private fields` (start with #)

```javascript
class Buffer {
  #size = 0;
  get size() { return this.#size };
}
```

## Chapter 10
### Modules

> As a practical matter, modularity is mostly about encapsulating or hiding
> private implementation details and keeping the global namespace tidy so that
> modules cannot accidentally modify the variables, functions, and classes
> defined by other modules.

> Although `import` and `export` have been part of the language for years, they
> were only implemented by web browsers and Node relatively recently.

---

Node `exports`. (Note, you might want to use the ES6 modules feature available
in Node 13 instead!)

> Node defines a global `exports` object that is always defined. If you're
> writing a Node module that exports multiple values, you can simply assign them
> to the properties of this object

```javascript
const sum = (x, y) => x + y;
exports.mean = data => data.reduce(sum)/data.length;
```

`module.exports` is similar to `exports`, but it's useful when you want to
export only a single function or class rather than an object full of functions
or classes.

```javascript
module.exports = class BitSet extends AbstractWritableSet {
  // ...
}
```

Node `require` (Note, you might want to use the ES6 modules feature available
in Node 13 instead!)

```javascript
const stats = require('./stats.js');
// or a lib installed separately or
// a build in lib can be
// imported as
const fs = require("fs")

// use destructuring assignment to
// import only the functions you want
const { stddev } = require('./stats.js');
```

---

ES6 Modules

`export`

```javascript
export const PI = Math.PI;
export function degreesToRadians(d) { return d * PI / 180 };

// or do this at the end of
// the file instead:
const PI = ...
function degreesToRadians(d) { ... };
// note that the curly braces don't
// actually define an object in this case!
// However, `export default` would return an
// object!
export { degreesToRadians, PI }; // end of file

// it is common to write modules
// that only export a single value.
// in this case, use export default instead
export default class BitSet {
  // ...
}
// you can also rename exports
export { layout as calculateLayour, render as renderLayout };
```

`import`

```javascript
// importing a default module
// note, you can pick whatever name
// for BitSet as you like!
import BitSet from './bistset.js';

// or a module with multiple exports
import { mean, stddev } from "./stats.js";

// importing everything
import * as stats from "./stats.js"

// rename it
import { render as renderImage } from "./imageutils.js"

// module with both export and export default
import Histogram, { mean, stddev } from "./histogram-stats.js";
// adding renaming on top
import { default as Histogram, mean, stddev } from "./histogram-stats.js";

// modules without exports
// those modules run once the first
// time they're imported.
import "./analytics.js"

// dynamically importing a module
import("./stats.js").then(stats => {
  let average = stats.mean(data);
});
// or
async analyseData(data) {
  let stats = await import("./stats.js");
  return {average: stats.mean(data), stddev: stats.stddev(data)};
}
```

`re-exports`

If you had two files `stats/mean.js` and `stats/stddev.js` and you want to
expose both their functionality through `stats/main.js` you can:

```javascript
// stats/main.js
export { mean } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";

// or
export * from "./stats/mean.js";
export * from "./stats/stddev.js";

// or make it the default export of your module
export { mean as default } from "./stats/mean.js";
// or (though not very useful)
export { default } from "./stats/mean.js";
```

## Chapter 11
### Standard Library

I decided to not do a review of this chapter as the content is better
understood from the book. Moreover, most of it is fairly googleable.


## Chapter 12
### Iterators and Generators

To learn more about iterators refer to the book. I'm going to go through
generators instead as they encapsulate most of what iterators do.

---

A generator is particularly useful when the values to be iterated are not the
elements of a data structure, but the result of a computation. A generator
function is syntactically like a regular JS function, except it's defined with
the keyword **`function*`**.

When you invoke a generator function, it doesn't actually execute the function
body, but instead returns a generator object. This generator object is an
iterator. Calling its next() method causes the body of the generator function
to run from the start (or whatever its current position is) until it reaches a
yield statement.

A quick example:

```javascript
function* oneDigitPrimes() {
  yield 2;
  yield 3;
  yield 5;
  yield 7;
}

primes = [...oneDigitPrimes()]; // [ 2, 3, 5, 7 ]
```

In an object:

```javascript
o = {
  x:1, y:2, z:3,
  *g() {
    for (let key of Object.keys(this)) {
      yield key
    }
  }
}
[...o.g()] // > x, y, z, g
```

In a class:

```javascript
class Blah {
  //...

  // note that the brackets around
  // [Symbol.iterator] are necessary
  // since it is a computed property.
  *[Symbol.iterator]() {
    yield "something";
  }
}
```

Nested yields with `yield*`

```javascript
function* sequenece(...iterables) {
  for (let iterable of iterables) {
    // exhaust each iterable in
    // a sequence of iterables
    // before going to the next
    yield* iterable;
  }
}

[...sequence("abc", "def")] // > '[a,b,c,d,e,f]'
```

## Chapter 13
### Asynchronous JavaScript

`Promise`.

The Promise API is intentionally vague. There is no way to synchronously get
the value of a Promise; you can only ask the Promise to call a callback
function when the value is ready. So, at the simplest level, Promises are just
a different way of working with callbacks.

```javascript
// promise chain
getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);

// another promise chain
fetch(documentURL)
  .then(response => response.json())
  .then(document => render(document))
  // if any callbacks invoked by then() return an error,
  // this error is passed to catch(), no matter where in
  // the chain we are at.
  // In synchronous code we say that if something goes
  // wrong, a exception will "bubble up the call stack".
  // In async, we say that an error will
  // "trickle down the chain" until it finds a catch()
  // method.
  .catch(handleError)
  // .finally() is useful for cleaning up.
  // You won't know whether the Promise is fulfilled
  // or rejected. No arguments are passed to its
  // callback
  .finally(() => console.log('chain ended!');


// Sometimes errors occur at random,
// in these cases you can retry the
// async operation like this:
queryDatabase()
  .catch(e => wait(500).then(queryDatabase))
  .then(displayTable)
  .catch(displayDatabaseError);

// Promises in Parallel
// note that the returned
// Promise will be rejected if
// any of the input Promises are
// rejected. Otherwise, it will be
// fulfilled with the array of the
// fulfilment of each
// input Promise
const urls = ['http://google.com', 'http://marcelofern.com'];
promises = urls.map(url => fetch(url).then(r => r.text()));
Promise.all(promises)
  .then(bodies => { /* do something with array of strings */ })
  .catch(e => console.error(e));

// Promise.allSettled() is similar to Promise.all()
// but it never rejects the returned Promise.
// It does not fulfill that Promise until all
// the input Promises have settled.
// This method return a Promise that resolves
// to an array of object, each having a status
// property of "fulfilled" or "rejected".
Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(
  results => {
    results[0] // status: 'fulfilled', value: 1
    results[1] // status: 'rejected', reason: 2
    results[2] // status: 'fulfilled', value: 3
  }
);

// there's also Promise.race() when you only
// care about the first Promise to fulfil.
```

---

`async` and `await`

Given a Promise object **p**, the expression "await p" waits until p settles.
If p fulfils, then the value of "await p" is the fulfilment value of p.

```javascript
// you can think of the async keyword,
// as a wrapper around a synchronous function:
// Thus:
async function f(x) { /* body */ };
// is equivalent of:
function f(x) {
  return new Promise(function(resolve, reject) {
    try {
      resolve((function(x) { /* body */ })(x));
    }
    catch(e) {
      reject(e);
    }
  }
}

// the await keyword does not cause
// your program to block. The code
// remains asynchronous, and the
// await simply disguises this fact.
let response = await fetch("/api/user/profile");
let profile = await response.json();

// you can only use await within functions
// declared with async.

async function getHighScore() {
  let response = await fetch("/api/user/profile");
  let profile = await response.json();
  // this return value will be a Promise
  // even if no Promise-related code appears
  // in the function's body.
  return profile.highScore;
}

// await a set of concurrently
// executing async functions
let [value1, value2] = await Promise.all([getJson(url1), getJson(url2)]);

// async generators
async function* clock(interval, max=Infinity) {
  for (let count = 1; count <= max; count++) {
    await elapsedTime(interval);
    yield count;
  }
}

// async for/await
async function testClock() {
  for await (let tick of clock(300, 100)) {
    console.log(tick);
  }
}
```
