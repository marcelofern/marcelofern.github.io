# Negative Feedback vs Positive Feedback

```
Created at: 2025-11-30
```
Note: In electronics positive feedback is usually a "bad thing" and negative
feedback is a "good thing" because for most applications it's desirable to
control the gain (through negative feedback) rather than to drive it to
extremes (saturation - positive feedback).

## Negative Feedback

In this type of connection, the op amp output will be connected back to the
inverting terminal.

The output voltage is "sent back" to the negative terminal, so that means that
the original equation:

```
Vout = A*(V+ - V-)
```

Now becomes

```
Vout = A*(V+ - fVout)

Where f = a fraction of what Vout is sending back.
```

Because A is a very large number:

```
Vout/A = V+ - fVout

Therefore

0 = V+ - fVout
```

In practical terms, it means that if the op amp sense any voltage difference
between its inputs, it will respond by feeding back as much current/voltage
through the feedback network as is necessary to keep the input difference equal
to zero! **This is only valid for negative feedback**.

Negative feedback examples are:
- Inverting amplifier
- Non inverting amplifier
- Buffer

## Positive Feedback

In this case the output sends back a response to the positive terminal
(non-inverting terminal):

```
Vout = A*(V+ - V-)

Becomes:

Vout = A*(fVout - V-)

Where f = a fraction of what Vout is sending back
```

Because the fVout component is positive, it will drive the op amp into
saturation mode, i.e: fVout augments the Vout output, which augments the fVout
componend, so on so forth.
