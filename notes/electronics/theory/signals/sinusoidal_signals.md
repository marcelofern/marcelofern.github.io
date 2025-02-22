# Sinusoidal Signals

```
Created at: 2025-02-04
```

Wave function:

```
V = A sin(2π f t + φ )

# OR

V = A sin ω t.

# Note that

2π f t ↔ ω
```

Common nomenclature:

- **peak-to-peak amplitude** (pp amplitude) ↔ twice the amplitude.
- **root-mean-square amplitude** (rms amplitude), which is Vrms = √(1/2)A =
  0.707A (this is for sinewaves only; the ratio of pp to rms will be different
  for other waveforms).Odd as it may seem, this is the usual method, because
  rms voltage is what’s used to compute power. The nominal voltage across the
  terminals of a wall socket (in the United States) is 120 volts rms, 60 Hz.
  The amplitude is 170 volts (339 volts pp).

## Quotes from the art of electronics

> If someone says something like “take a 10 μ V signal at 1 MHz,” they mean a
> sinewave. Mathematically, what you have is a voltage described by

```
V = A sin(2π f t + φ )
```

> where A is called the amplitude and f is the frequency in hertz (cycles per
> second).
> The other variation on this simple theme is the use of angular frequency,
> which looks like this:

```
V = A sin ω t.
```

> Just remember the important relation ω = 2π f and you won’t go wrong.

> The great merit of sinewaves (and the cause of their perennial popularity) is
> the fact that they are the solutions to certain linear differential equations
> that happen to describe many phenomena in nature as well as the properties of
> linear circuits. A linear circuit has the property that its output, when
> driven by the sum of two input signals, equals the sum of its individual
> outputs when driven by each input signal in turn; i.e., if O(A) represents
> the output when driven by signal A, then a circuit is linear if O(A + B) =
> O(A) + O(B). A linear circuit driven by a sinewave always responds with a
> sinewave, although in general the phase and amplitude are changed. No other
> periodic signal can make this statement. It is standard practice, in fact, to
> describe the behavior of a circuit by its frequency response, by which we
> mean the way the circuit alters the amplitude of an applied sinewave as a
> function of frequency. A stereo ampliﬁer, for instance, should be
> characterized by a “ﬂat” frequency response over the range 20 Hz to 20 kHz,
> at least. The sinewave frequencies we usually deal with range from a few
> hertz to a few tens of megahertz. Lower frequencies, down to 0.0001 Hz or
> lower, can be generated with carefully built circuits, if needed. Higher
> frequencies, up to say 2000 MHz (2 GHz) and above, can be generated, but they
> require special transmission-line techniques. Above that, you’re dealing with
> microwaves, for which conventional wired circuits with lumped-circuit
> elements become impractical, and exotic waveguides or “striplines” are used
> instead.

From: The Art Of Electronics.
