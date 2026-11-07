# Voltage Dividers

```
Created at: 2025-01-28
```

Also called "de-amplifiers", voltage dividers are one of the most widespread
circuit fragments, they are everywhere.

## Definition

A circuit that given a certain voltage input, produces a predictable fraction
of the input voltage as the output voltage. The output voltage is always lower
than the input voltage.

![img_voltage_divider.png](img_voltage_divider.png)

```
Vout/Vin = R2 / (R1 + R2)

or:

Vout = (R2 * Vin) / (R1 + R2)
```

## Gotchas

1. An adjustable voltage divider can be created from using a potentiometer to
   control Vout. However, in modern circuits you'll instead see a long series
   chain of equal-value resistors, with an arrangement of electronic switches
   that lets you choose any on the junctions as the output. This sounds more
   complicated but allows you to adjust the voltage ratio electrically rather
   than mechanically.

2. Attaching a load to the voltage divider makes the voltage on the divider to
   drop. This is often not desirable. One solution to the problem of making a
   stiff voltage source (“stiff” is used in this context to describe something
   that doesn’t bend under load) might be to use much smaller resistors in a
   voltage divider. Occasionally this brute-force approach is useful. However,
   it is usually best to construct a voltage source, or power supply, as it’s
   commonly called, using active com- ponents like transistors or operational
   ampliﬁers. In this way you can easily make a voltage source with internal
   (Thévenin equivalent) resis- tance as small as milliohms (thousandths of an
   ohm), with- out the large currents and dissipation of power characteris- tic
   of a low-resistance voltage divider delivering the same performance. In
   addition, with an active power supply it is easy to make the output voltage
   adjustable.
