# Capacitor Basics

```
Created at: 2025-02-16
```

> Capacitors, in particular, are essential in nearly every circuit application.
> They are used for waveform generation, ﬁltering, and blocking and bypass
> applications. They are used in integrators and differentiators. In com-
> bination with inductors, they make possible sharp ﬁlters for separating
> desired signals from background. TAOE 3rd ed.

```
I = C(dV/dT)
capacitor is more complicated than a resistor: the current is not simply
proportional to the voltage, but rather to the rate of change of voltage

Cparallel = C1 + C2 + C3...
The total parallel capacitance is the sum of the capacitances.

Cseries = 1 / (1/C1) + (1/C2) ...
The total series capacitance is similar to the parallel resistance.

Q = CV
A capacitor of C farads with V volts across its terminals has Q coulombs of
stored charge on one plate and −Q on the other.

Uc = (1/2)CV²
Uc is in joules (energy stored in the capacitor) for C in farads and V in
volts.

C = 8.85×10−14 ε A/d F,

The capacitance is proportional to the area and inversely proportional to the
spacing. For the simple parallel-plate capacitor, with separation d and plate
area A (and with the spacing d much less than the dimensions of the plates),
the capacitance C is given by the above equation.

where ε is the dielectric constant of the insulator, and the dimensions are
measured in centimeters. It takes a lot of area, and tiny spacing, to make the
sort of capacitances commonly used in circuits
```

## Intuition Tips

- capacitors might be considered simply as frequency-dependent resistors.
- capacitors can act as frequency-dependent voltage dividers.

## General

- bypass and coupling are the most common use for capacitors. Because a
  capacitor looks like an open circuit at dc, it lets you couple a varying
  (sine) signal while blocking its average dc level. This is a blocking capacitor
  (also called a coupling capacitor), as in Figure 1.93. Likewise, because a
  capacitor looks like a short circuit at high frequencies, it suppresses
  (“bypasses”) signals where you don’t want them.
- A farad is an enormous capacitance, and you usually deal in microfarads (μ
  F), nanofarads (nF), or picofarads (pF).

