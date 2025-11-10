# CLI basics

```
Created at: 2025-11-02
```

```sh
# Starts the iterative CLI
ngspice

# Loads a circuit netlist
source /tmp/my_circuit.ps

# Runs an operation point analysis
op

# Runs a transient analysis <step size>, <total length>
tran 50u 50m

# Print a specific node
print <node name>

# Print all nodes
print all

# Plot a specific node
plot in

# Plot all nodes
plot all
```
