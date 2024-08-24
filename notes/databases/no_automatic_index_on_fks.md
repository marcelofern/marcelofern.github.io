# No Automatic Index on Foreign Keys

```
Created at: 2024-08-22
```

Postgres does not automatically creates indexes for Foreign Keys.

[This
email](http://web.archive.org/web/20240822020006/https://www.postgresql.org/message-id/472700FC.7040006%40reedyriver.com)
thread from the `psql-admin` reading list gives an example where adding an
index for a FK is unnecessary:

> Whether or not you want to index non-identifying foreign keys is determined
> by the requirements of the database design.  For example, assume that we have
> a table that contains sales territories, which rarely change. We will use
> this table to create drop down lists that we will use to set territories.
> Now let's create a table for sales person and include an attribute for sales
> territory.  We will create a non-identifying foreign key relationship between
> this value and the sales territories and create proper constraints.  We will
> not index the column in the sales person table because the only thing that
> would use the index is the foreign key constraint and it will rarely fire and
> therefore the index is not worth the cost.

But to not take anyone's word for it, you can run the following:

```sql
CREATE DATABASE sandbox_db;

\c sandbox_db

CREATE TABLE parent_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE child_table (
    id SERIAL PRIMARY KEY,
    parent_id INT,
    description VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES parent_table(id)
);

-- Insert rows into parent_table
INSERT INTO parent_table (name)
VALUES
('Parent 1'),
('Parent 2'),
('Parent 3');

-- Insert rows into child_table
INSERT INTO child_table (parent_id, description)
VALUES
(1, 'Child 1 of Parent 1'),
(1, 'Child 2 of Parent 1'),
(2, 'Child 1 of Parent 2'),
(3, 'Child 1 of Parent 3');

\d child_table

-- No FK indexes here
Indexes:
    "child_table_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "child_table_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES parent_table(id)

-- Clean up
DROP DATABASE sandbox_db;
```
