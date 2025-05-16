# Direct Proofs

```
Created at: 2025-05-10
```

A direct proof is a way to prove "P therefore Q", or P → Q.

The idea is to start with some P and work a way towards Q. This usually
involves applying definitions, previous results, algebra, logic and other
techniques to satisfy P → Q.

## Structure

```
Proposition:
  P → Q

Proof:
  Assume P
  <explanation of what P means>
              ...
  Apply algebra, logic, etc.
              ...
  <this is what Q means>

Therefore Q
```

## Example

**Fact**
- The sum, difference, and product of integers is an integer.
- An integer is either even or odd.

**Definitions:**
- An integer `n` is even if `n = 2k` for some integer `k`.
- An integer `n` is odd  if `n = 2k + 1` for some integer `k`.

**Proposition**:
- The sum of two even integers is even.

```
Given
  A = 2x
  B = 2y

Then
  A + B = 2x + 2y
  A + B = 2(x + y)

Let
  z = (x + y)

So that
  A + B = 2z

By definition:
  A + B is an even number.
```
