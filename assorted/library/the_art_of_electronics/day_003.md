# Day 3

```
Created at: 2025-01-14
```

## How To Draw Schematic Diagrams

### General Advise

This is a summary of the rules exposed on Appendix B:

- Schematics should not contain ambiguity. Label: parts, pins, values,
  polarities, etc.
- Keep functional areas in a circuit distinct.
- Use conventional ways of drawing functional subunits so that these parts can
  be easily recognised.
- Use the same symbol for the same device.
- Align wires and components either horizontally or vertically.
- All parts should have values or types.
- Leave space around circuit symbols like op-amps. This allows for a less
  cluttered design and for space for labels.
- Label all boxes that aren't obvious such as op-amp, comparators, shift
  register, counter, etc.
- Be consistent.
- Certain devices like amp-ops and logic devices are assumed to have
  power-supply connections. However, clarify it when needed.
- Include small table of integrated circuit numbers, types, etc.

### On Wires

- When wires connect, use a heavy black dot to indicate the connection.

- Four wires must not connect at a point.

- Bring leads a little bit away from component symbols before connecting.

### On Pins

- Pin numbers go on the outside of a symbol.

### On Signals

- Signal names go on the inside of a symbol.

- Signals usually go from left to right.

- Label signals and functional blocks, showing waveforms. This is specially
  important in logic diagrams to label signal likes such as RESET or CLK.

### On Supply Points

- Positive supply voltages go at the top of the page.

- Negative supply voltages go at the bottom of the page.

- Don't cramp many wires onto the supply "rails". Use ground symbols (multiple)
  and labels such as +Vcc to indicate such voltages where needed.

### On flip-flops

Draw flip-flops with clock and inputs on the left, set and clear on top and
bottom, and outputs on the right.

### Switches

The path a signal takes through a switch should be clear. That avoids making
the reader follow wires to find how a signal is switched.
