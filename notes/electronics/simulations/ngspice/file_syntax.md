# File Syntax

```
Created at: 2025-11-02
```

A basic spice file can be defined with a title, followed by comments or a list
of nodes forming a netlist and some optional operations and control input.

For example, a basic voltage divider can be declared as:

```sp
.title Voltage Divider

* netlist details (note: 0 means GROUND).
V1 in 0 1
R1 in out 1k
R2 out 0 2k
* denotes the end of the netlist

* which controls to start the simulation with
.control
op
print all
.endc

.end
```

Standard component definitions follow the structure:

```
<component name> <left node> <right node> <value>
```

## DC Signal

For a DC signal connected to ground (0) and to a node called (in) of 1V:

```sp
* format:
* <source name, starting with "v"> <+node> <-node> <value in volts>

V1 in 0 1
```

## AC Signal

```sp
* dc format:
* <source name, starting with "v"> <+node> <-node> DC <DC value in volts>
* ac format:
* PULSE (VL VH TD TR TF PW PER PHASE)
*   VL = starting voltage
*   VH = end voltage
*   TD = delay before the pulse starts
*   TR = rise time
*   TF = fall time
*   PW = pulse width
*   PER = period of repetition
*   PHASE = phase shift.

* A pulse from 0 to 5V, with 1u of delay, rise and fall time. Phase is omitted
* here, the pulse width and period of repetition are both 1s (quite long).
V1 in 0 dc 0 PULSE (0 5 1u 1u 1u 1s 1s)
```
