# Greatest Common Divisors Proof

```
Created at: 2025-05-11
```
## Necessary concepts
### Definition of Divisibility For Integers
A nonzero integer `a` is said to divide an integer `b` if `b/a = k` for some
integer `k`.
When `a` divides `b`, we write `a | b`.
When `a` does not divide `b`, we write `a † b`.

## Definition of Greatest Common Divisors
- Let `a` and `b` be integers.
- If `c | a` and `c | b` then `c` is a *common* divisor of `a` and `b`.
- The *greatest* common divisor of `a` and `b` is the largest integer `d` such
  that,
- `d | a` and `d |  b`.

This number (d) is denoted `gcd(a,b)`.

## Examples (prior to the proof)

- gcd(6, 8) = 2
- gcd(12, 8) = 4
- gcd(6, -8) = 2
- gcd(7, 15) = 1
- gcd(-5, -20) = 5
- gcd(9, 9) = 9

## Insights (prior to the proof)

- If `a` and `b` are non-zero, then
- Since `1 | x` is true for every integer, then
- `1 | a` and `1 | b` are also true, then
- The integer 1 is always a common divisor, then
- The greatest common divisor will therefore at least be 1.

- The greatest common divisor can never be larger than |a| or |b|, then
- 1 ≤ gcd(a,b) ≤ |a|, and
- 1 ≤ gcd(a,b) ≤ |b|, and therefore
- gcd(a, b) *always* exists.

- When a = 0 and b = 0, then there's no greatest common divisor as every
  integer is a divisor of 0.

## Theorem Bézout's identity (prior to the proof)

If `a` and `b` are positive integers, then there exist integers `k` and `l`
such that: `gcd(a, b) = ak + bl`.

### Examples

```
  gcd(12,20) = 4
  gcd(12,20) = 12k + 20l
  gcd(12,20) = 12*2 + 20*-1
  k = 2, l = -1

  gcd(12,20) = 4
  gcd(12,20) = 12k + 20l
  gcd(12,20) = 12*-3 + 20*2
  k = -3, l = 2
```

In fact there are infinite solutions. But only one suffices for the theorem.
