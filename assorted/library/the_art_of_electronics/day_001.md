# Day 1

```
Created at 2025-01-12
```

I am starting today with "Appendix A: Math Review" because I am almost sure
that my maths are rusty.

By order of importance (most important at the top), the relevant mathematical
skills to be able to navigate this book are:

1. Algebra
2. Trigonometry
3. Complex numbers
4. Derivatives

## Trigonometry - Exponentials - Logarithms

Trigonometry:
```
ax² + bx + c = 0
x = (-b ± √(b² - 4ac)) / 2a
```

Sine and cosine:
```
sin(x±y) = sin(x)cos(y) ∓ cos(x)sin(y)

cos(x±y) = cos(x)cos(y) ∓ sin(x)sin(y)

sin(2x) = 2sin(x)cos(x)

cos(x)cos(y) = ½[cos(x+y) + cos(x-y)]

cos(x)sin(y) = ½[sin(x+y) - sin(x-y)]

sin(x)sin(y) = ½[cos(x-y) - cos(x+y)]
```

Exponentials:
```
e^(x+y) = e^x * e^y

e^(x-y) = e^x / e^y

x^(a/b) = (x^a)^(-b)
```

Base (e) logs:

```
e^(log x) = x

log(xy) = log(x) + log(y)

log(x/y) = log(x) - log(y)

log(x^n) = nlog(x)

log(e^x) = x

log(x) = 2.3log(base 10)(x)

a^x = e^(xlog(a))
```

## Complex Numbers

Representation:

```
A complex number:
N  = a + ib

Complex conjugate (note the *):
N* = a - ib

Real part:
N = R⌉(N)

Imaginary part:
N = I↕(N)

Magnitude or Modulus:
|N| = |a + ib| = √(NN*) = √[(a + ib)(a - ib)] = √(a²+b²)

As x, y pairs on the imaginary pane
a + ib ↔ (a,b)

As polar coordinates:
a + ib ↔ r ∠ Θ
Where:
r = |N| = √(a²+b²)
Θ = tan-¹(b/a)
Therefore:
N = r*e^(iΘ)

Converting from polar to rectangular form:
r*e^(iΘ) = rcos(Θ) + irsin(Θ)

When dealing with circuits and signals, the angular argument Θ often takes the
form of an evolving wave:
Θ = ωt = 2πft
V(t) = R⌉(V*e^(iwt) = Vcos(wt)
```

Tips:

1. The magnitude of the product of two imaginary numbers is the product of each
   of their magnitudes.
2. Complex numbers can be added, subtracted, multiplied, etc., just like real
   numbers.
3. Polar form is handy when complex numbers have to be multiplied or divided.
   For multiplication, you just multiply their magnitudes and add their angles.
   For division, you just divide their magnitudes and subtract their angles).
4. Electrical engineers usually swap `i` for `j` to not confuse `i` with
   current.
