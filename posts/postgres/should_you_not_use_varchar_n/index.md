# Should you not use Postgres varchar(n) by default?

```
Created at: 2025-02-01
```

The Postgres wiki has a page called ["Don't Do
This"](https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_varchar.28n.29_by_default)
where general good practices are discussed.

Amongst them, there is a session titled: **"Don't use varchar(n) by default"**
which is copied verbatim below:

> **Why not?**
> varchar(n) is a variable width text field that will throw an error if you try
> and insert a string longer than n characters (not bytes) into it.
>
> varchar (without the (n)) or text are similar, but without the length limit.
> If you insert the same string into the three field types they will take up
> exactly the same amount of space, and you won't be able to measure any
> difference in performance.
>
> If what you really need is a text field with an length limit then varchar(n)
> is great, but if you pick an arbitrary length and choose varchar(20) for a
> surname field you're risking production errors in the future when Hubert
> Blaine Wolfe­schlegel­stein­hausen­berger­dorff signs up for service.
>
> Some databases don't have a type that can hold arbitrary long text, or if
> they do it's not as convenient or efficient or well-supported as varchar(n).
> Users from those databases will often use something like varchar(255) when
> what they really want is text.
>
> If you need to constrain the value in a field you probably need something
> more specific than a maximum length - maybe a minimum length too, or a
> limited set of characters - and a check constraint can do all of those things
> as well as a maximum string length.

> **When should you?**

> When you want to, really. If what you want is a text field that will throw an
> error if you insert too long a string into it, and you don't want to use an
> explicit check constraint then varchar(n) is a perfectly good type. Just
> don't use it automatically without thinking about it.

> Also, the varchar type is in the SQL standard, unlike the text type, so it
> might be the best choice for writing super-portable applications.

The reasons for using `varchar` (without the (n)) are compelling:

1. No performance penalties.
2. Reduced risk of errors if you misrepresented the size of the data.

What the wiki doesn't do a good job of, is steelmanning the downsides of the
approach it directs towards, namely: **using varchar by default**.

Let's go over them.

## Denial-of-Service (DoS) via Uncontrolled Data Insertion

If you choose a bare `varchar` for your surname field, you'll need validation
somewhere in the application to ensure this field doesn't become a vector for
attacks.

If a malicious party finds this free-text field without an upper-limit
validation, they can perform database stuffing by storing enormous volume of
data in the database, ending on a DoS attack.

Even if the application pre-validates the data before storing it, this level
of validation is much weaker as a guarantee of data integrity than delegating
the job to the database. The database is excellent for data integrity
guarantees, application code is not.

Most services have hard constraints on such inputs. For example, the below is
the limit for names on Twitter:

![_img_twitter_limits.png](_img_twitter_limits.png)

## Storing free-text in a database may not be a good idea

Databases are optimised for structured data. There are better alternatives for
storing free-text like S3, CDNs, or even just a dump static file server.

Having large free-text fields stored on a table will reduce the performance of
the server, at the minimum you have the overhead of a TOAST table for some
large rows, but also you are slowing down many db maintenance activities and
backup tasks for data that you might not always need to have at hand.

## Increasing the size of a varchar(n) is not a problem

Performing an ALTER TABLE to pump the value of `n` up is a catalogue-only
operation and won't culminate in a database outage.

Of course, at that point you might have had a few angry customers complaining
about errors in the application. You have to ponderate if this is worth over
the risks of having a DoS via Uncontrolled Data Insertion attack instead.

There is a real problem though if you want to **decrease** the value of `n`.
This will rewrite the table:

```sql
-- This will tell you if a table is being re-written.
SET client_min_messages=debug1;

DROP TABLE IF EXISTS test;

CREATE TABLE test (id SERIAL PRIMARY KEY, str varchar(6));

INSERT INTO test (str) SELECT generate_series(1, 1000);

-- Increasing the value of `n`, no problem here.
ALTER TABLE test ALTER COLUMN str TYPE varchar(7);

-- Also completely removing `n`, no problem!
-- Caveat: this will trigger a potential "building_index" operation for the
-- TOAST table.
ALTER TABLE test ALTER COLUMN str TYPE varchar;

-- Decreasing the value of `n`. This is a risky operation!
ALTER TABLE test ALTER COLUMN str TYPE varchar(4);
-- DEBUG:  rewriting table "test"
```

I haven't seen cases of having to reduce the value of `n` before in production.

But even then, there is a way to set a lower upper bound without downtime
via check constraints:

```sql
-- [OPTIONAL] you can promote the field to a bare varchar first
ALTER TABLE test ALTER COLUMN str TYPE varchar;

-- Add a NOT VALID constraint, so that it does not scan the table while holding
-- an AccessExclusive Lock.
ALTER TABLE test
ADD CONSTRAINT chk_str_length CHECK (LENGTH(str) <= 4)
NOT VALID;

-- This will only acquire a ShareUpdateExclusiveLock
ALTER TABLE test VALIDATE CONSTRAINT chk_str_length;
```

Note that the check constraint performance may be slower than the native
`varchar(n)` check due to the function evaluations behind performing a
constraint check.

## Conclusions

- Think thoroughly about upper/lower bounds of your data before creating a
  field.
- Ponderate between the risks of having length-limit errors versus a potential
  DDoS attack surface.
- **Do not** reach out for free-text fields by default. Unless you are always
  adding a CHECK CONSTRAINT to sanitise input limits.
