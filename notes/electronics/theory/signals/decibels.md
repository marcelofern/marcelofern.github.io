# Decibels

```
Created at: 2025-02-09
```

By deﬁnition, the ratio of two signals, in decibels (dB), is:

```
dB = 10 log10(P2/P1)
```

where P1 and P2 represent the power in the two signals.
We are often dealing with signal amplitudes, however, in which case we can
express the ratio of two signals having the same waveform as

```
dB = 20 log10(A2/A1)
```

## Example 1

Determine the voltage and power ratios for a pair of signals with the following
decibel ratios: (a) 3 dB, (b) 6 dB, (c) 10 dB, (d) 20 dB.

```
# To get rid of a log10 simply raise both sides by a power of 10.

power_3db = 3 = 10log10(x)
10**(3/10) = x = 1.995

voltage_3db = 3 = 20log10(x)
10**(3/20) = x = 1.413

... so on so forth.
```
