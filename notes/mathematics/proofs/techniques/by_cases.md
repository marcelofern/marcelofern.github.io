# Proofs By Cases

```
Created at: 2025-05-11
```

Proving by case means dividing a problem into all the possible branches and
then solving each branch individually.

In other words, "divide and conquer".

## Example

**Proposition**:
- If `n` is an integer, then `n² + n + 6` is even.

**Fact**:
- (1) If `n` is an integer, it is either odd or even.
- (2) Any multiplication, addition, or subtraction of an integer by another results
  in another integer.

**Definitions**:
- (a) An integer `n` is even if `n = 2k` where `k` is another integer.
- (b) An integer `n` is odd if `n = 2k + 1` where `k` is another integer.

**Branch 1 `n` is even**:
```
  n² + n + 6, then

  (2k)² + 2k + 6, then

  4k² + 2k + 6, then

  2(2k² + k + 3), then

  2x where x = (2k² + k + 3)

  By fact (2) x is an integer.

  By definition (a), we have that n² + n + 6 results in an even number when
  n is even.
```

**Branch 2 `n` is odd**:
```
  n² + n + 6, then

  (2k + 1)² + 2k + 1 + 6, then

  4k² + 4k + 1 + 2k + 1 + 6, then

  4k² + 6k + 8, then

  2(2k² + 3k + 4), then

  2x where x (2k² + 3k + 4)

  By fact (2) x is an integer.

  By definition (a), we have that n² + n + 6 results in an even number when
  n is odd.
```
