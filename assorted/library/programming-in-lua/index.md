---
title: Programming in Lua
author: Marcelo Fernandes
date: July 10, 2022
---

I've decided to start reading this book to get more insight into how to
incorporate Lua into Neovim

## Contents
- [Chapter 1. Getting started](#chapter-1)
- [Chapter 4. Strings](#chapter-4)
- [Chapter 5. Tables](#chapter-5)
- [Chapter 6. Functions](#chapter-6)
- [Chapter 18. Generic for](#chapter-18)
- [Chapter 20. Metatables and Metamethods](#chapter-20)
- [Chapter 21. Object-Oriented Programming](#chapter-21)

## Chapter 1
### Getting Started

```lua
-- file test.lua
print("Hello World")

-- defines a factorial function
function factorial(n)
  if n == 0 then
    return 1
  else
    return n * factorial(n-1)
  end
end

print("enter a number:")
a = io.read("*n")
print(factorial(a))

-- types
type(nil) --> nil
type(true) --> boolean
```

You can run the code above by passing the `test.lua` file to the Lua
interpreter of your choice.

```bash
luajit test.lua

# If you want to open an iterative session after running the code, use the
# -i flag. This is usually helpful for debugging.
luajit -i test.lua
```

List of reserved words:

- and
- break
- do
- else
- elseif
- end
- false
- for
- function
- goto
- if
- in
- local
- nil
- not
- or
- repeat
- return
- then
- true
- until
- while

List of basic types:
- nil
- boolean
- number
- string
- userdata (type(io.stdin))
- function
- table
- thread

```lua
type(a) --> nil. It does not return an error.
a = 10
type(a) --> number
a = "string"
type(a) --> string
```

### Exercises

Run the factorial example. What happens to your program if you enter a negative
number? Modify the example to avoid this problem.

A: The program raises a `stack overlow` error.

`factorial.lua`
```lua
#!/usr/bin/luajit

function factorial(n)
  if n < 0 then
    return nil
  elseif n == 0 then
    return 1
  else
    return n * factorial(n-1)
  end
end

print("enter a number:")
a = io.read("*n")
print(factorial(a))
```

Write a simple script that prints its own name without knowing it in advance.

```lua
#!/usr/bin/luajit

function print_file_name()
  print(arg[0])
end

print_file_name()
```

## Chapter 4
### Strings

```lua
-- The length operator is `#`
a = "hello"
print(#a) --> 5
print(#"test") --> 4

-- the lib string also has a length function
print(string.len("morning!")) --> 8

-- String concatenation happens with `..`
print("hello " .. "world")

-- long strings use [[ and ]]
body = [[
<body>
  <a href="https://marcelofern.com">Marcelo Fern</a>
</body>
]]
```
```lua
-- or [[= (followed by any number of = signs)
-- and =]]. This is useful when you need to
-- stringfy text that includes ]]
text = [[===
This text has ]]
===]]
```
```lua
-- coercions
print(10 .. 20) --> 1020

-- string to number
tonumber("   -3 ") --> -3
tonumber(" i2 ") --> nil

-- number to string
tostring(3) --> "3"

-- formatting a string
string.format("x = %d y = %d", 10, 20) --> x= 10 y = 20

-- search in string
x, y = string.find("hello world", "wor") --> 7 9
string.find("hello world", "war") --> nil
```

## Chapter 5
### Tables

Tables are the only data structuring mechanism in Lua.

```lua
#!/usr/bin/luajit

a = {}
a["x"] = 10
print(a["x"]) --> 10

b = {}
b.x = 20
print(b.x) --> 20
```

Implementing lists / arrays:

```lua
numbers = {10, 20, 30, 40, 50}
print(numbers[1]) --> 10 Indexes in Lua start at 1.
print(#numbers) --> 5 The # calculates the length.

-- note that # is unreliable for lists with holes.

-- iterate over an array
for i=1, #numbers do
  print(numbers[i])
end

-- or use ipairs
for k, v in ipairs(numbers) do
  print(k, v)
end
--> 1 10
--> 2 20
--> 3 30
--> 4 40
--> 5 50

-- append an element at the end of an array
numbers[#numbers + 1] = 60
print(numbers[6]) --> 60
-- or use table.insert
table.insert(numbers, 70)
print(numbers[7]) --> 70

-- remove the last element of an array, returning it as a result
print(table.remove(numbers)) --> 70
print(numbers[#numbers]) --> 60
-- you can also call `table.remove` with
-- the number of the index you want to remove.
-- in that case, the holes will be filled up
-- i.e., each element after the removed one
-- will be brought one position down.
```

Implementing a dictionary

```lua
name = {first="Marcelo", last="Fernandes"}
print(name.first .. " " .. name.last) --> Marcelo Fernandes

-- traverse all key-value pairs
for k, v in pairs(name) do
  print(k, v)
end
--> first Marcelo
--> last Fernandes

name.first = nil --> Remove the key from the table.

-- To use strings:
sum = {["+"] = "add"}
print(sum["+"]) --> "add"
```

## Chapter 6
### Functions

```lua
function add(array)
  local sum = 0
  for i=1, #array do
    sum = sum + array[i]
  end
  return sum
end

print(add({20, 20})) --> 40
```

Variadic functions (variable number of arguments)

```lua
function add(...)
  local sum = 0
  for _, v in pairs({...}) do
    sum = sum + v
  end
  return sum
end

print(add(3, 4, 5, 6, 7)) --> 25
```

### Exercices

Write a function that takes an array and prints all its elements
```lua
#!/usr/bin/luajit

function print_array(array)
  print(unpack(array))
end

print(print_array({3, 4, 5, 6, 7}))
```

Write a function that takes an arbitrary number of values and returns all of
them, with the exception of the first one.

```lua
function all_but_first(first, ...)
  return ...
end

print(all_but_first(1, 2, 10)) --> 2 10
print(all_but_first(1, "5", "word")) --> "5" "word"
```

Write a function that takes an arbitrary number of values and returns all of
them, with the exception of the last one.

```lua
#!/usr/bin/luajit

function all_but_last(...)
  array = {...}
  table.remove(array)
  return unpack(array)
end

print(all_but_last(1, 2, 10)) --> 1 2
print(all_but_last(1, "5", "word")) --> 1 "5"
```

## Chapter 18
### Generic for

```lua
-- given a function to iterate
-- over an array using closures
function array_iterator(array)
  local i = 0
  return function()
    i = i + 1
    return array[i]
  end
end

-- you can use a while loop
array = {10, 20, 30}
iterator = array_iterator(array)
while true do
  element = iterator()
  if element == nil then
    break
  print(element)
  end
end

-- But you could use the generic for
for element in array_iterator(array) do
  print(element)
end
```

Stateless iterators:

```lua
#!/usr/bin/luajit

local function array_iterator(array, index)
  index = index + 1
  local value = array[index]
  if value then
    return index, value
  end
end

local function stateless_array_iterator(array)
  return array_iterator, array, 0
end

array = {10, 20, 30}

for index, element in stateless_array_iterator(array) do
  print(index, element)
end
```

## Chapter 20
### Metatables and metamethods

```lua
-- setting and getting metatables
table = {}
second_table = {}

setmetatable(second_table, table)
print(getmetatable(second_table) == table) --> true

-- a table can be its own metatable

setmetatable(table, table)
print(getmetatable(table) == table) --> true
```

## Chapter 21
### Object-Oriented Programming

Whenever a `:` is present on a function name, Lua injects a `self` keyword
in the body of the function:

```lua
Account = {balance=0}
function Account:withdraw(amount)
  self.balance = self.balance - amount
end

acc = Account
acc:withdraw(10)
print(acc.balance) --> -10

-- the above is only syntax sugar.
-- you can achieve the same as:
Account = {balance=0}
function Account.withdraw(self, amount)
  self.balance = self.balance - amount
end

acc = Account
-- pass the extra argument here.
acc.withdraw(acc, 10)
print(acc.balance) --> -10
```

Creating classes

```lua
-- Lua uses the idea of prototypes like
-- JavaScript. To set the prototype of
-- an object, do this:
setmetatable(A, {__index = B})
-- now A looks up to B for
-- all operations that it does
-- not have.
```

Thus we can create account objects:

```lua
-- defaults
Account = {balance=0}

-- methods
function Account:withdraw(amount)
  self.balance = self.balance - amount
end

-- constructors
local mt = {__index = Account}
function Account.new(o)
  o = o or {}
  setmetatable(o, mt)
  return o
end

acc = Account.new()
acc:withdraw(50)
print(acc.balance) --> -50
```

You can improve this by setting the prototype in the constructor directly

```lua
-- defaults
Account = {balance=0}

-- constructors
function Account:new(o)
  o = o or {}
  -- use the Account table
  -- as the instance prototype
  self.__index = self
  setmetatable(o, self)
  return o
end

-- methods
function Account:withdraw(amount)
  self.balance = self.balance - amount
end


acc = Account:new()
acc:withdraw(70)
print(acc.balance) --> -70
```

Inheritance:

```lua
#!/usr/bin/luajit

-- defaults
Account = {balance=0}

-- constructors
function Account:new(o)
  o = o or {}
  -- use the Account table
  -- as the instance prototype
  self.__index = self
  setmetatable(o, self)
  return o
end

-- methods
function Account:withdraw(amount)
  if amount > self.balance then
    error("insufficient funds")
  end
  self.balance = self.balance - amount
end

-- The SpecialAccount allows users
-- to withdraw more than they own

-- defaults
-- SpecialAccount = an account object with
-- the Account prototype.
SpecialAccount = Account:new()

-- methods
-- override withdraw
function SpecialAccount:withdraw(amount)
  if (amount - self.balance) >= self:get_limit() then
    error("insufficient funds")
  end
  self.balance = self.balance - amount
end

function SpecialAccount:get_limit()
  return self.limit or 0
end

special_acc = SpecialAccount:new({limit=1000})
special_acc:withdraw(999)
print(special_acc.balance) --> -999

-- this line returns an error
special_acc:withdraw(1000)
```
