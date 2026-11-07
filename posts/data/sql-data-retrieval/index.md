September 18, 2020

## Single Table Data Retrieval

Simple queries can be executed by the SELECT statement. This statement is the
equivalent of the relation algebra's Selection, Projection, and Join.

The SELECT statement has the following form:

```sql
SELECT [DISTINCT | ALL] {* | [columnExpression [AS newName]] [,...]}

FROM TableName [alias] [,,..]

[WHERE condition]

[GROUP BY columnList][HAVING condition]

[ORDER BY columnList]
```

 The order of the clauses in a SELECT statement cannot be changed. SELECT and
 FROM are the only mandatory clauses.

The sequence that data is processed in a SELECT statement is:

1. `FROM`: which table or tables will be used.
2. `WHERE`: filters the rows based on a condition.
3. `GROUP BY`: Creates groups of rows with the same column value.
4. `HAVING`: Filter the groups based on a condition.
5. `SELECT`: Specifies the columns that will show up in the output.
6. `ORDER BY`: The output ordering based on a column.

## WHERE clause

The WHERE clause filters out rows that don't respect a condition.
There are 5 basic conditions (or predicates) for the WHERE clause:

1. **Comparison**: Between two expressions:
```sql
WHERE score > 80 (greater than)
WHERE score <> 80 (not equal to - ISO standard)
WHERE score != 80 (not equal to)
WHERE (score != 80) AND (score > 24)
```
2. **Range**: If a value falls within a range of values:
```sql
WHERE score BETWEEN 40 AND 60
WHERE score > = 10 and score < 20
```
3. **Membership**: If the value belongs to a defined set:
```sql
WHERE name IN ('Messi', 'Ronaldo')
```
4. **Pattern Match**: If the value matches a given string pattern:
```sql
WHERE name LIKE 'M%' (names starting with M)
WHERE name LIKE 'M___' (names starting with M and with exactly 4 characters)
WHERE name LIKE '%son%' (names that included son)
WHERE position LIKE '15#%' ESCAPE '#' (escaping the % character)
```
5. **Null**: if the value is NULL
```sql
WHERE profession is NULL
WHERE target IS NOT NULL
```

## ORDER BY clause

Columns can be ordered by one or many columns.

```sql
ORDER BY salary DESC
ORDER BY age, salary ASC
```

## GROUP BY clause

The GROUP BY clause groups the data from a SELECT table and creates a single
summary row for each group. Each group is composed by different values from the
column that is "grouped by".

```sql
GROUP BY class HAVING COUNT(student) > 1
```

## Aggregation functions

Aggregation functions are used for executing an operation on a table column,
and retrieving a single result based on that operation.

- COUNT: fetches the number of values in a specified column.
- SUM: fetches the sum of the values in a specified column.
- AVG: fetches the average of the values in a specified column.
- MIN: fetches the smallest values in a specified column.
- MAX: fetches the largest value in a specified column.

## Subqueries

Subqueries can be created by nesting SELECT statements. The results from the
inner queried are used to determine the final results for the outter query.
This operation is called **subselect** Additionally, SELECTs can be used in
WHERE and HAVING clauses to filter out results. This operation is called
**subquery** or **nested query**.

- Scalar subquery: returns a single column and a single row. I.e, a single value.
  Example:
```sql
SELECT fName, lName
FROM Student
WHERE collegeNo = (SELECT collegeNo FROM College WHERE street = ‘Austin St’);
```
- Row subquery: returns multiple columns but a single row
- Table subquery: returns one or more columns and multiple rows.
```sql
SELECT fName, lName
FROM Parent
WHERE chieldId IN (SELECT studentId from Student WHERE collegeNo = (SELECT collegeNo FROM College WHERE street = 'Austin St'));
```

Additionally, the key-word EXISTS is designed to be used only with sub-queries. The result of a query containing the EXISTS key-word is a true/false boolean.

```sql
SELECT staffId, fName
FROM Staff s
WHERE EXISTS (SELECT * FROM Branch b WHERE s.branchId = b.branchId AND city = 'London');
```

Which is the same as:

```sql
SELECT staffId, fName
FROM Staff s, Branch b
WHERE s.branchId = b.branchId AND city = 'London';
```

## Multi Table Data Retrieval

Multi table data queries can be performed using a join operation. The idea is
to combine information from different tables by looking at their related rows.
The related rows will be the ones where the different tables have the same
value for a given column

The join operation is used when the result of an SQL query displays information
about columns from more than one table. If this is not the case, and only the
columns from a single table are required in the result, a subquery is more
appropriate.

## Simple Join / Inner Join

A simple join can be performed by including more than one table in the FROM
clause. The tables must be split by comma and the table name can be followed by
an alias:

```sql
SELECT p.city, fName, lName, presidentId
FROM Player p, Team t
WHERE p.id = t.captainId;
```

This can also be written as:

```sql
SELECT p.city, fName, lName, presidentId
FROM Player p JOIN Team t
ON (p.id = t.captainId);
```

Or:

```sql
SELECT p.city, fName, lName, presidentId
FROM Player p INNER JOIN Team t
ON (p.id = t.captainId);
```

Given that the city column is defined on both tables, we need to specify which
one we are pulling data from, hence we use the alias in front of the column
name. The other columns are defined only in one of the tables. Although this
example would work, the best practice is to include the alias in front of every
column name to clarify which table the column is coming from.

To join those tables, we specify the WHERE/ON clause to search for matching
columns from both tables.

An example of a join operation with 3 tables:

```sql
SELECT b.branchId, s.StaffId, s.fName, p.propertyId
FROM Branch b, Staff s, Property p
WHERE b.branchId = s.branchId AND s.staffId = p.staffId
ORDER BY b.branchId, s.staffId, p.propertyId;
```

Or:

```sql
SELECT b.branchId, s.StaffId, s.fName, p.propertyId
FROM Branch b
INNER JOIN Staff s ON (b.branchId = s.branchId)
INNER JOIN Property p ON (s.staffId = p.staffId)
```

## JOIN Clause

A JOIN between tables results in a Cartesian product. The Cartesian product
between two tables is a third table that consists of all possible pairs of
rows from the two tables. The third table will have all the columns from the
first table followed by all the columns from the second table.

The Cartesian product can be obtained by:

```sql
SELECT [DISTINCT | ALL] {* | columnList}
FROM Table1 CROSS JOIN Table2
```

## Outer Joins

So far, we have presented join operations that retrieve related rows from
different tables when they have matching columns. The outer join is used when
we want to retain the rows that do not satisfy the join condition as well as
the ones that do satisfy the join condition.

There are 3 different types of outer joins: Left, Right, and Full:

1. Left: The left outer join will keep the rows from the first table that don't
   meet the joining criteria while setting the second table column values to
   NULL
```sql
SELECT b.name, p.name, p.ownerName
FROM Branch b LEFT OUTER JOIN Property p ON b.city = p.city
```
The property name and ownerName would be set to NULL for the cases where b.city
=! p.city

2. Right: The right outer join will keep the rows from the second table that
   don't meet the joining criteria while setting the first table columns value
   to NULL
```sql
SELECT b.name, p.name, p.ownerName
FROM Branch b RIGHT OUTER JOIN Property p ON b.city = p.city
```
The branch name would be set to NULL for the cases where b.city =! p.city

3. Full: Includes not only the matching results but also results from both
   tables that do not match the join condition.
```sql
SELECT b.name, p.name, p.ownerName
FROM Branch b FULL OUTER JOIN Property p ON b.city = p.city
```
Some rows would have the branch name set to NULL whereas some rows would have
the property name and ownerName set to NULL (both happening when b.city =!
p.city).

## Non-equi join

Some times there isn't a primary key - foreign key relationship between tables,
but there might be some other ways in which we want to relate data. For those
cases, the condition "equal to" won't surface and we have to resort to a
different kind of conditional operator. This particular JOIN scenario is named
NON-EQUI JOIN.

Example:

```sql
SELECT playerId, scores
FROM Player, Score
WHERE Score BETWEEN 20 AND 50;
```

## Self Join

Used for the cases where we need to fetch data from a recursive relationship.
We then SELF-JOIN the table (Joining the table to itself).

Example - List the book code for each pair of book that has the same price:

```sql
SELECT f.BOOK_CODE, s.BOOK_CODE, f.PRICE
FROM BOOK f, BOOK s
WHERE f.PRICE = s.PRICE AND f.BOOK_CODE <> s.BOOK_CODE
ORDER BY f.BOOK_CODE, s.BOOK_CODE;
```

## Combining results (UNION, INTERSECT, EXCEPT)

Combining operators follow the corresponding format:

```sql
operator [ALL] [CORRESPONDING [BY {column1 [, ...]}]]
```

If CORRESPONDING BY is specified, then the union is performed on the named
column(s). If CORRESPONDING is specified but not with the BY clause, the set of
operation is performed on the columns that are common to both tables.

- Union: creates a resulting table with all rows that belong to a either a table
  A or a table B along with the rows that appear on both tables.
```sql
(SELECT * FROM Staff WHERE city IS NOT NULL)
UNION CORRESPONDING BY city
(SELECT * FROM Warehouse WHERE city IS NOT NULL)
```
- Intersection: creates a resulting table with only all rows that are common to
  both tables A and B.
```sql
(SELECT city FROM Staff)
INTERSECT
(SELECT city FROM Branch)
```
- Difference (except): retrieves a table with all rows that are in table A but
  not in table B.
```sql
(SELECT name FROM Customer)
EXCEPT
(SELECT name FROM Staff)
```

One important thing to keep in mind is that two tables can only be combined if
they have the same structure. Tables with the same structure are called
union-compatible. This implies that the tables have the same number of columns
and that those columns have the same data types and lengths.
