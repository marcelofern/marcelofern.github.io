---
title: enum vs enum class
author: Marcelo Fernandes
date: March 10, 2023
---

## Why you should use `enum class`.

TLDR: `enum class` is safer and less bug prone than `enum`s. Here are the
reasons why this is the case:

## They don't implicitly convert to other types

Take for instance a plain `enum`:

```cpp
enum Shape {SQUARE, CIRCLE, TRIANGLE};

int main() {
  Shape square = SQUARE;  // OK
  int circle = CIRCLE; // Ouch! OK
}
```

Now if as `enum class`:

```cpp
enum class Shape {SQUARE, CIRCLE, TRIANGLE};

int main() {
  Shape square = SQUARE;  // error: undeclared identifier CIRCLE
  int circle = Shape::CIRCLE; // error: can't initialise type
}
```

And here's from Bjarne Stroustrup's C++11 FAQ:


> The enum classes ("new enums", "strong enums") address three problems with
> traditional C++ enumerations:
>
> - conventional enums implicitly convert to int, causing errors when someone
>   does not want an enumeration to act as an integer.
> - conventional enums export their enumerators to the surrounding scope, causing
>   name clashes.
> - the underlying type of an enum cannot be specified, causing confusion,
>   compatibility problems, and makes forward declaration impossible.
>
> The new enums are "enum class" because they combine aspects of traditional
> enumerations (names values) with aspects of classes (scoped members and absence
> of conversions).

## Assembly code

It's always interesting to have a look at the generated Assembly code to verify
if there's anything else to it.

For a plain enum we have the following:

```cpp
enum Vehicle {BYCICLE, MOTORBIKE, ELECTRIC_CAR};

Vehicle bike = BYCICLE;
Vehicle motorbike = MOTORBIKE;
```

Assembly:

```assembly
bike:
        .zero   4
motorbike:
        .long   1
```

Very straightforward, just two 4 byte labels, one containing only zeros, and
another containing the value `1`.

As for the `enum class`:

```cpp
enum class Vehicle {BYCICLE, MOTORBIKE, ELECTRIC_CAR};

Vehicle bike = Vehicle::BYCICLE;
Vehicle motorbike = Vehicle::MOTORBIKE;
```

The assembly code is effectively the same:

```assembly
bike:
        .zero   4
motorbike:
        .long   1
```

No surprises :)
