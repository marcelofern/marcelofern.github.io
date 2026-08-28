# Day 2

```
Created at: 2025-01-13
```

## Definition: Functions

A function is a formula that gives a value:

```
y = f(x); ∀ x (for each x)
```

The function should be single valued. Meaning it gives a single value of y for
each x.

## Definition: Derivative

The derivative of y with respect to x is written as:

```
δy/δx ("dee y, dee x")
```

It represents the slope of the graph of y versus x. The derivative is itself a
function, given that it has a value for each point, representing the tangent
to the curve on the graph at that point.

## Deriviative of common functions

- `a` is a constant

```
(δ/δx)a = 0

(δ/δx)ax = a

(δ/δx)ax = a

(δ/δx)ax^n = anx^(n-1)

(δ/δx)sin(ax) = acos(ax)

(δ/δx)cos(ax) = -asin(ax)

(δ/δx)e^(ax) = ae^(ax)

(δ/δx)log(x) = 1/x
```

## Rules for combining derivatives

- `u` and `v` are arbitrary functions of x

```
(δ/δx)a*u(x) = a(δ/δx)u(x) -> pull out the constant

(δ/δx)(u + v) = (δ/δx)u + (δ/δx)v

(δ/δx)u*v = u(δ/δx)v + v(δ/δx)u -> product rule

(δ/δx)(u/v) = [v(δ/δx)u - u(δ/δx)v] / v²

(δ/δx)log(u) = [(δ/δx)u] / u

(δ/δx){u[v(x)]} = (δu/δv) * (δv/δx) -> chain rule
```

## Chain rule example

```
(δ/δx)e^(-x²)

Function = e^(-x²)
I.e      = e^(v(x))
I.e      = u(v(x))

Where:
u(v) = e^(v)
v(x) = -x²

According to the chain rule:
(δ/δx){u[v(x)]} = (δu/δv) * (δv/δx)

We have that:
(δu/δv) = e^(v)
(δv/δx) = -2x

Result: -2x*e^(-x²)
```

## Product rule example

```
(δ/δx)xe^(x)

Function = xe^(x)
I.e      = v(x) = x
I.e      = u(x) = e^(x)

According to the product rule:
(δ/δx)u*v = u(δ/δx)v + v(δ/δx)u

We have that:
(δ/δx)v = 1
(δ/δx)u = e^(x)

Result: e^(x) + xe^(x)
```
