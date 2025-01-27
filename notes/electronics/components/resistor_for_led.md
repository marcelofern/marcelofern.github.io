# Resistor for LED

```
Created at: 2024-04-29
```

From a LED's datasheet, you will find two attributes:

- Forward voltage `Vf`. Typically 2V-3V.
- Forward current `If`. Typically 10mA - 30mA.

- [example datasheet](http://web.archive.org/web/20231001211621/https://www.lumex.com/datasheet/SSL-LX5093ID)

You want to avoid any current above the value of `If` to make sure your LED
does not burn. For that, you will need a resistor connected **in series**.

In terms of minimum current to pass through the LED for indoor use,
high-efficiency LEDs can light up with as little as 1 mA.

So the equation to find a resistor is basically:

> R = (Vin - Vf) / (If)

For common values of `Vin` = 5V, `Vf` = 2V, and `If` = 20mA:

> R = (5 - 2) / (0.02)
> R = 150 Ohms

With lower voltages you will need less resistance, and with higher voltages you
will need higher resistances.

## Reading resources

- [parallel LEDs?](http://web.archive.org/web/20240422070418/https://en.wikipedia.org/wiki/LED_circuit)
