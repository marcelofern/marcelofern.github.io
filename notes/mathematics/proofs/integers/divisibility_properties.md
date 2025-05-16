# Proof Integer Divisibility Properties

```
Created at: 2025-05-11
```

## Definition of Divisibility For Integers

A nonzero integer `a` is said to divide an integer `b` if `b/a = k` for some
integer `k`.

When `a` divides `b`, we write `a | b`.
When `a` does not divide `b`, we write `a † b`.


**Simple Examples**:

- 2 | 14 because 4 = 2*7 and 7 is an integer.
- -4 | 20 because 20 = -4*-5 and -5 is an integer.
- 12 | -48 because -48 = 12*-4 and -4 is an integer.
- -7 | -7 because -7 = -7*1 and 1 is an integer
- 6 † 9 because there is no integer `a` that can divide 9 by 6 and result in an
  integer. That number would be 1.5 since 9 = 6*1.5 but 1.5 is not an integer.

Special case b = 0:

0/a = 0 for every **non-zero** integer a, and 0 is an integer.

## Proof of the transitive property

**Proposition**
Let a, b, and c be integers. If a | b and b | c, then a | c.

**Note**
By assuming that a | b, then a ≠ 0.
By assuming that b | c, then b ≠ 0.

**Scratch work**
a = 3, b = 12, c = 24

- a | b = 3 | 12 because 12/3 = 4 and 4 is an integer.
- b | c = 12 | 24 because 24/12 = 2 and 2 is an integer.

**Proof**

- `a | b` is true if `b = a*x` for an integer x.
- `b | c` is true if `c = b*y` for an integer y.
- `c = b*y`, then
- `c = a*x*y`, then
- `c = a*z` where `z = x*y*`, then
- Given that the multiplication of integers results in an integer (fact), then
- `z` is also an integer, and `c=a*z` then by the definition of divisibility,
- `a | c` ✓.

