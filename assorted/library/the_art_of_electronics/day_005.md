# Day 5

```
Created at: 2025-01-27
```

## Intuitive tips for understanding resistor values

- A large resistor in series with a small resistor has roughly the resistance
  of the larger one.
- Inversely, a large resistor in parallel with a small resistor has roughly the
  resistance of the smaller one.
- To reduce the resistance, connect a (much) larger resistor in parallel.
- Putting N resistors of value X in parallel is the same as having a resistor
  of value X/N

## Examples

Say you want the resistance of 5k in parallel with 10k.
This is the equivalent of three 10k resistors in parallel.
Or one 3.3k (10k/3) resistor

## Exercise 1.5

> Show that it is not possible to exceed the power rating of a 1/4 watt
> resistor of resistance greater than 1k, no matter how you connect it, in a
> circuit operating from a 15 volt battery.

From the power formulas:

```
P = IV
P = I²R
P = V²/R
```

Say you connect the resistor in series with the circuit, and the circuit has
resistance Rc.

```
P = V²/R
P = (15²)/(>=1k + Rc)
P = 225/(>=1k + Rc)

The highest power is when >=1k + Rc is at a minimum. Meaning that Rc = 0 and
the resistor is 1k.

P = 225/1000
P = 0.225
P < 1/4
```

Say you connect the resistor in parallel with the circuit, and the circuit has
resistance Rc.

```
R(parallel) = (R1*R2) / (R1+R2)
R(parallel) = (>=1k*Rc) / (>=1k+Rc)

The larger the value of >=1k, the less current will go through it.
The less power will it dissipate (P = I²R).

The higher R(parallel) is when the circuit is opened (Rc = ∞).
In this case all the current flows throw the 1k resistor.

P = V²/R
P = 225/1000
P = 0.225
P < 1/4
```
