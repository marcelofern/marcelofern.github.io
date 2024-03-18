---
title: Verilog and Verilator
author: Marcelo Fernandes
date: January 5, 2023
---

## Verilog

Verilog is a hardware description language (HDL) used in the design and
verification of digital circuits. Verilog has been merged into the
SystemVerilog standard in 2009, and is now part of the SystemVerilog language.

## SystemVerilog

This is the actual language we'll be using. A source points out the following
benefits of SystemVerilog:

> SystemVerilog is better than Verilog because of its ability to perform
> constrained random stimuli, use OOP features in testbench construction,
> functional coverage, assertions, etc.

### Data Types

SystemVerilog has the following data types:

- **reg**: Represent data storage elements (not necessarily physical
  registers). They retain their value until the next value is sent to them. Can
  only be driven in procedural blocks like `always` and `initial`.
- **wire**: Used for connecting different elements. They can be treated as
  physical wires. Can only be driven in `assign` statements.
- **integer**
- **real**: Like a `double` in C.
- **time**
- **realtime**: Also a `double`.
- **logic**: A 4-state data type. Can be driven by both procedural blocks and
  continuous `assign` statements.
- **bit**
- **byte**
- **shortint** (16 bits)
- **int** (32 bits)
- **longint** (64 bits)
- **shortreal** (float)

Types that can hold UNKNOWN (X) and high-impedance (Z) values in addition to
0 and 1 are called **4-state data types**.

#### logic
```verilog
module tb;
  logic [3:0]  my_data; // Declare a 4-bit logic type variable
  logic        en; // Declare a 1-bit logic type variable

  initial begin
    // Default value of logic type is X
    $display ("my_data=0x%0h en=%0b", my_data, en);
    // logic data type can be driven in initial/always blocks
    my_data = 4'hB;
    $display ("my_data=0x%0h en=%0b", my_data, en);
    #1;
    $display ("my_data=0x%0h en=%0b", my_data, en);
  end
  // logic data type can also be driven via assign statements
  assign en = my_data[0];
endmodule
```

Simulation log:
```
my_data=0xx en=x
my_data=0xb en=x
my_data=0xb en=1
```

#### bit
```verilog
module tb;
  bit       var_a; // Declare a 1 bit variable of type "bit"
  bit [3:0] var_b; // Declare a 4 bit variable of type "bit"

  logic [3:0] x_val; // Declare a 4 bit variable of type "logic"

  initial begin
    // Initial value of "bit" data type is 0
    $display ("Initial value var_a=%0b var_b=0x%0h", var_a, var_b);
    // Assign new values and display the variable to see that it gets the new values
    var_a = 1;
    var_b = 4'hF;
    $display ("New values var_a=%0b var_b=0x%0h", var_a, var_b);
    // If a "bit" type variable is assigned with a value greater than it can hold
    // the left most bits are truncated. In this case, var_b can hold only 4 bits
    // and hence 'h481 gets truncated leaving var_b with only 'ha;
    var_b = 16'h481a;
    $display ("Truncated value: var_b=0x%0h", var_b);
    // If a logic type or any 4-state variable assigns its value to a "bit"
    // type variable, then X and Z get converted to zero
    var_b = 4'b01zx;
    $display ("var_b = %b", var_b);
  end
endmodule
```

Simulation log:
```
Initial value var_a=0 var_b=0x0
New values var_a=1 var_b=0xf
Truncated value: var_b=0xa
var_b = 0100
```

### Arrays
Arrays can be: static, dynamic, associative, queues

#### Static arrays

```verilog
module tb;
  // an 8 bit-wide vector
	bit [7:0] 	m_data; 	// A vector or 1D packed array
	initial begin
		// 1. Assign a value to the vector
		m_data = 8'hA2;
		// 2. Iterate through each bit of the vector and print value
		for (int i = 0; i < $size(m_data); i++) begin
			$display ("m_data[%0d] = %b", i, m_data[i]);
		end
	end
endmodule
```

#### Dynamic arrays
```verilog
// Dynamic array, size unknown but it holds integer values
int 		m_mem [];
```

#### Associative arrays (like a dictionary)
```verilog
int m_data [int]; // Key is of type int, and data is also of type int
int m_name [string]; // Key is of type string, and data is of type int

m_name ["Rachel"] = 30;
m_name ["Orange"] = 2;

m_data [32'h123] = 3333;
```

### Queues
```verilog
int 	m_queue [$]; 		// Unbound queue, no size

m_queue.push_back(23); 		// Push into the queue

int data = m_queue.pop_front(); // Pop from the queue
```

**More information:**

[TUTORIAL 1](https://www.chipverify.com/systemverilog/systemverilog-data-types-integer-byte)

[TUTORIAL 2](https://verilogguide.readthedocs.io/en/latest/verilog/overview.html)
