---
title: SQL Table Management
author: Marcelo Fernandes
date: October 2, 2020
---

## Creating Tables

Tables can be created using the CREATE TABLE command. Examples using an Oracle
database:

```sql
CREATE TABLE TEAM
(
  TEAM_ID CHAR(5) PRIMARY KEY,
  NAME VARCHAR2(30) NOT NULL UNIQUE,
  LOCATION VARCHAR2(50),
  EMAIL VARCHAR(70)
);

CREATE TABLE PLAYER
(
  PLAYER_ID CHAR(5) PRIMARY KEY,
  FIRST_NAME VARCHAR2(30) NOT NULL,
  LAST_NAME VARCHAR2(30) NOT NULL,
  TEAM_ID CHAR(5) REFERENCES TEAM(TEAM_ID),
);
```

Note: When using a database such as Oracle, Postgres, MySQL, etc, make sure to
be aware of naming conventions.

## Defining Constraints

Constraints are created to preserve the data integrity in the database. They
are imposed on one or more columns, and can be used to check the acceptability
and accuracy of the data.

There are two types of constraints:

- Column Constraints: Defined along with the column definition in a CREATE
  TABLE statement.
- Table Constraints: Defined at the end of the table definition after listing
  all the columns. Tables with multiple primary keys should be defined at the
  of the table definition as a table constraint.

Some commonly used constraints are:

- PRIMARY KEY
- UNIQUE
- NOT NULL
- REFERENCES table(column)
- ON DELETE CASCADE
- ON DELETE SET NULL
- DEFAULT value
- CHECK (condition)

 This is how it would look in a CREATE TABLE statement:

```sql

     CREATE TABLE MOCK_TABLE
    (
      COL1 CHAR(5) PRIMARY KEY,
      COL2 NUMBER(10) NOT NULL,
      COL3 VARCHAR2(5) REFERENCES TEST(COL3) ON DELETE CASCADE,
      COL4 DATE DEFAULT SYSDATE,
      COL5 UNIQUE,
      COL6 NUMBER(4) CHECK (COL6 > 100)
    );
```
```sql
 CREATE TABLE MOCK_TABLE
(
  COL1 CHAR(5),
  COL2 NUMBER(10) NOT NULL,
  COL3 VARCHAR2(5)
  COL4 DATE DEFAULT SYSDATE,
  COL5 UNIQUE,
  COL6 NUMBER(4) CHECK (COL6 > 100),
  CONSTRAINT MOCK_TABLE_PK PRIMARY KEY (COL1),
  CONSTRAINT MOCK_TABLE_FK FOREIGN KEY (COL3) REFERENCES TEST(COL3),
  CONSTRAINT COL5_UPPERCASE CHECK (COl5 = UPPER(COL5))
);
```

As a tip to organise your database, you might want to define all your tables
without any foreign keys and then create them at the end using the ALTER
command:

```sql
ALTER TABLE PLAYER
ADD FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
```

## Modifying Tables

 Table attributes can be added, modified, or deleted. The same is valid for
 table constraints.

A few examples using the ALTER TABLE command:

```sql
ALTER TABLE tableName + (one of the below)
```

1.
  ```sql
  ADD columnName VARCHAR2(30) NOT NULL
  ```
2.
  ```sql
     DROP columnName [RESTRICT | CASCADE]
  ```
3.
  ```sql
    ALTER columnName SET DEFAULT defaultOption
  ```
4.
  ```sql
    ALTER columnName DROP DEFAULT
  ```
5.
  ```sql
    ADD CONSTRAINT constraintName tableConstraintDefinition
  ```
6.
  ```sql
    DROP CONSTRAINT constraintName [RESTRICT | CASCADE]
  ```
7.
  ```sql
    DISABLE CONSTRAINT constraintName
  ```
8.
  ```sql
    ENABLE constraintName
  ```
9.
  ```sql
    RENAME constraintName TO newConstraintName
  ```

A few "real world" examples:

```sql
ALTER TABLE PLAYER ADD PRIMARY KEY (ID);

ALTER TABLE PLAYER ADD CHECK(SALARY > 0);
```

Ultimately, tables can also be completely deleted with the DROP TABLE command.
Be aware that tables with child tables might require a CASCADE operation.

```sql
DROP TABLE TEAM CASCADE CONSTRAINTS;
```

## Indexes

Indexes are used to increase the performance of database queries. Some
advantages and disadvantages are listed below:

**Advantages**:

- Speeds up SELECT queries
- They can be used for sorting
- Unique indexes guarantee uniquely identifiable records in the database

**Disadvantages**:

- Take additional disk space
- Slow down INSERT, UPDATE, and DELETE operations. But it can speed up an
  UPDATE query if the WHERE condition has an indexed field.

Indexes can be created using the CREATE INDEX statement:

```sql
CREATE INDEX PNAME ON PLAYER(NAME);
```

Or dropped using DROP INDEX

```sql
DROP INDEX PNAME;
```

Unique indexes can also be added to ensure uniqueness of non-primary data. The
benefit of using unique indexes versus UNIQUE constraint is that the index not
only will guarantee data uniqueness but will also speed up queries

```sql
CREATE UNIQUE INDEX PNICKNAME ON PLAYER(NICKNAME);
```

Only create an index if:

- A table is large
- A column is likely to appear in the WHERE clause or ORDER BY clause.
- A column has values which each occur in fewer than 20% of the rows
- Multiple columns are continually referenced together (concatenated index on
  multiple columns)
- All the column values are distinct (unique index)
- The table is to be used primarily for queries (data retrieval)

## Sequences

Sequences are particularly useful to help data entry, especially in the primary
key column. The primary key must have a unique value, and more often than not,
to be sequential. Manually ensuring uniqueness on a PK is very time-consuming
and may lead to future flaws.

Sequences can be created using the CREATE SEQUENCE command:

```sql
CREATE SEQUENCE testseq;
```

```sql
CREATE SEQUENCE testseq
START WITH 777
INCREMENT BY 22
MAXVALUE 100000
CYCLE
```

Once created, an index can be used in an INSERT statement

```sql
INSERT INTO PLAYER VALUES
(testseq.NEXTVAL, 'Ronaldo', 'Real Madrid', 7);
```

Note: NEXTVAL initialises the sequence or generate the next value. CURRVAL
returns the current sequence value, but it only works if you already called
NEXTVAL during the current user session.

## Copying A Table

There are 3 ways to create a new table from an existing table:

1. Create a new structure and only copy the data. In this case, define the
   structure using the CREATE TABLE clause and then add the data from the
   previous table using a SELECT query in an INSERT statement. Make sure that
   the new table has the same data types from the columns you are fetching data
   from.
   ```sql
   INSERT INTO TOP_SCORERS
   SELECT FIRST_NAME, LAST_NAME, TEAM_ID, GOALS
   FROM PLAYER
   WHERE GOALS > 100;
   ```
2. Copy the structure and the data. In this case, omit the column definitions
   in the CREATE TABLE STATEMENT and then use a SELECT statement to fill in
   the data.
   ```sql
   CREATE TABLE PLAYER_COPY AS (SELECT * FROM INSTRUCTOR);
   ```
3. Copy only the structure. In this case, omit the column definitions in the
   CREATE TABLE statement and then use use a SELECT statement with a WHERE
   clause that is never going to be true, like 1=2.
   ```sql
   CREATE TABLE PLAYER_STRUCT AS (SELECT * FROM PLAYER WHERE 1=2);
   ```

## Transactions

 A transaction is the representation of a logical unit of work for the
 database. Transactions can be initiated by any SQL statement, and for a
 transaction to be successful, all the tasks within the transaction need to be
 completed successfully.

The default transaction mode is "auto-commit". It will commit each transaction
as soon as possible after the user executes each query. Multi-user database
applications will require more control over transactions to make sure that data
in the database isn't duplicated or to prevent data inconsistencies.

COMMIT statements can be used to save changes immediately during the active
session.

ROLLBACK statements can be used to reverse the changes made since the last
COMMIT statement, or in the active session.

Rules of thumb:

- Before starting updates for a transaction, COMMIT any previous updates
- Complete the updates for the transaction, if the transaction can't be
  completed use ROLLBACK, otherwise use COMMIT

Note that COMMIT makes the data changes in a transaction permanent. Running a
ROLLBACK straight after a COMMIT cannot reverse that update

Also keep in mind that ROLLBACK will only reverse data changes but won't
reverse (delete) any database objects created/altered using CREATE, ALTER, and
DROP.
