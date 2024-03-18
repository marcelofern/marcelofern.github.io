---
title: Database Design
author: Marcelo Fernandes
date: September 2, 2020
---

## Data Model

A database design usually starts by the high-level description of the schema.
The idea is to analyse the organisation requirements and frame it on a schema
that a variety of users would understand.

The outcome of this exercise, is a data model. A data model is a
representation (often in a diagram) of the data relationship in an
organisation. This representation will describe the data and provide a
guideline of how this data could be manipulated and retrieved.

The data model is composed of three components

- Structural: A collection of relationships that construct the data. This
  includes the diagrams, the entities and their dependencies, what their names
  are, what types of data those entities host, etc.
- Manipulative: The available operations on the data. Directives to instruct
  what data can be retrieved, updated, or deleted.
- Integrity constraints: Checks that guarantee data integrity.

 The optimal data model can be found if the following criteria is satisfied:

- Consistent: The model represents a clear mapping of the organisation
  information.
- Minimal: No entity or property is dispensable. No non-necessary dependencies
  are present. It is also easy for all the organisation users to understand the
  data model.
- Distinguishable: Different data can be told apart without confusion.
- Non-redundant: There is only one way to represent an entity and its
  attributes.
- Not application bound: The data model should not change based on what
  database system is being used.
- Extensible: New features can be added without breaking the existent schema.
- Easy to draw: If the diagram of a said data-model is difficult to draw, one
  of the criteria above hasn't been completely satisfied.

## Entity-Relationship (ER)

An entity is an object in the organisation that can be represented in the
database (a person, location, thing, concept, event, etc...). An entity can
have any number of attributes. Those attributes are properties that describe
the data stored in that entity. An entity that represents a location, could
have a set of coordinates as one of its attributes. Entities are then
connected via relationships.

## Database Design Phases

 The process of designing a database can be split into three different phases:


- Conceptual Phase: The creation of a data model concept that is put to proof
  against users' requirements. This phase does not involve any particular
  implementation details. This phase will present the entities and their
  attributes.
- Logical Phase: The model concept is enhanced with the relationship logic.
  This means that the relationship between data, its constrains, and data
  retrieval/update/deletion queries are added. The model should then be put to
  proof against users' requirements once more.
- Physical Phase: Decision of how the database is implemented. It takes into
  account which database management system (DBMS) will be used, what tables
  will be created, what security protocol will be implemented, what constraints
  and indexes will be created, and so on.

Note that the database design is an organic process. The database will change
as the organisation grows and requires updates.

## Functional Dependency

A functional dependency between attributes describes how those attributes are
related.

**Formal definition**: If A and B are attributes of a relation R, B is
functionally dependent on A if each value of A is associated with exactly one
value of B. In this case, A is called the determinant
Notation: `A ® B` (or `A -> B`)

**Example**: Consider an entity Player with the following attributes:
*playerId, fName, position*. We can determine the position of a certain player,
by knowing what the value of playerId is. In other words, playerId determines
the position (`playerId -> position`). But the opposite is not true, knowing
the position doesn't imply knowing the playerId.

Functional dependencies can be broken down into 3 different types:


1. Partial Functional Dependency: A -> B is a partial functional dependency if
   there is an attribute that can be removed from A and yet the dependency
   still holds. Consider the entity Player with the attributes playerId, name,
   and teamId. We have that:
   ```
   playerId, name -> teamId
   ```
   But the name attribute is not really necessary to determine teamId.
   Therefore, the name attribute could be removed but the functional
   dependency would still exist between playerId and teamId.
2. Full Functional Dependency: A -> B is a full functional dependency if
   removal of any attribute from A results in the dependency no longer
   existing. Consider the entity Player with attributes playerId and position.
   We then have that:
   ```
   playerId -> position
   ```
   If we remove the playerId attribute, the dependency no longer exists.
3. Transitive Dependency: Given that A, B, and C are attributes of a relation
   and A -> B and B -> C, then C is a transivite dependency of A via B.
   Consider the entity Player:
   ```
   playerId -> name, position, teamId, teamName
   teamId -> teamName
   ```
   playerId determines the teamName attribute via the teamId attribute. In this
   case, teamName is transitively dependent on playerId via teamId.

## Normalisation

Normalisation is one of the most important aspects of database design. It is
common to find databases that have more entities than necessary. The same
redundancy often happens to entities' attributes as well. The normalisation
technique aims to minimise those redundancies by finding the minimal set of
entities and attributes required to meet users' requirements.

A normalised database is easier to manipulate and to understand. Normalisation
provides easy access to the database, prevents maintenance overheads, and
enhances user experience in general. Additionally, new users will have a more
compact learning curve when being introduced to the database for the first
time.

Normalisation rules can be broken down into the following normal forms:

1. First Normal Form
2. Second Normal Form
3. Third Normal Form
4. Boyce and Codd Normal Form (BCNF)
5. Fourth Normal Form

## First Normal Form (1NF)

For a table to be in the 1NF, it must conform to the following 4 rules:

1. Single Valued Attributes: Each column in a table should not contain multiple
   values. As a hypothetical example, on a table defining a Location entity, an
   entry in the column "country" cannot be "New Zealand & Brazil".
2. Attribute Domain does not change: In each column, the values stored must be
   of the same type. On a table defining a Location entity, an entry in the
   column "country" cannot be a number, while the other entries are a text.
3. Unique name for Attributes/Columns: No repetition of columns names within
   the same entity. The entity "Country" cannot have two columns called
   "population".
4. Order doesn't matter: The order that the data is stored in the table does
   not affect any database operation.

## Second Normal Form (2NF)

A table is in the 2NF if:

1. It is in the First Normal Form (1NF)
2. Has Partial Dependency: An attribute in a table depends on a part of the
   primary key, but not on the whole key. As an example, if we have an entity
   "Student Score" which has the attributes: "student_id", "subject_id",
   "score", and "teacher_name". The attribute "teacher_name" only depends on
   the "subject_id", and the primary key of this table is the combination of
   "student_id + subject_id". Note that to remove this dependency we only need
   to move the "teacher_name" property to the "Subject" entity.

Alternative Definition: A table is in the first normal form and every
non-primary-key attribute is fully functionally dependent on the primary key.

Note: A table with transitive dependencies can be in the 2NF.

## Third Normal Form (3NF)

A table is in the 3NF if:

1. It is in the Second Normal Form (2NF)
2. Does not have Transitive Dependency (TD): The TD happens when a non-prime
   attribute has a dependency on another non-prime attribute. If a "Score"
   entity has the properties: "score_id", "student_id", "subject_id", "marks",
   "exam_name", "total_marks". The prime keys are "student_id" and
   "subject_id". But the "total_marks" depends on the "exam_name", that does
   not belong to the prime keys set. In this case, the solution is to create a
   new "Exam" entity with the attributes: "exam_name" and "total_marks"

Alternative Definition: A table is in the first and second normal form and no
non-primary-key attribute is transitively dependent on the primary-key.

## Boyce and Codd Normal Form (BCNF)

A table is in the BCNF if:

1. It is in the Third Normal Form (3NF)
2. For each functional dependency (X -> Y), X should be a super key. If we have
   an entity "Students Subjects" with the attributes: "student_id", "subject",
   and "professor", we have "student_id" and "subject" as the primary keys.
   Given that a subject can have multiple professors, there is a dependency
   between professor -> subject. So we have an attribute depending on a
   prime/super key. To solve this problem, the solution is to create a
   "Professor" entity with the columns "professor_id", "professor_name", and
   "subject".

## Fourth Normal Form (4NF)

A table is in the BCNF if:

1. It is in the Boyce and Codd Normal Form (BCNF)
2. There is no Multi-Valued Dependency Given that A -> B (B depends on A), if
   multiple values of B exist, then the table has a multi-valued dependency.
   Imagine we have an entity with three columns: "student_id", "course", and
   "hobby". Both "course" and "hobby" depend on the student id. A way to fix it
   is to create two entities: "Student Hobby", and "Student Course". This
   dependency usually infers that the table has a combination of columns that
   don't belong together. (Why are hobby and course in the same table?)
