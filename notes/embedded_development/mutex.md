2024-05-11

Mutex (mutual exclusion) is also referred to as **lock**.

They are considered a synchronisation primitive, used to prevent data (state)
of being mutated by multiple threads at the same time.

Mutexes are similar to Semaphores as in they allow to control who has access to
a particular resource in a scenario where multiple threads are trying to mutate
shared data.

However, mutexes are used when only one thread can access a particular
resource, whereas semaphores are more general, and allow a number N of threads
(but no more) to access a particular resource.

## Locking strategies

There are mainly two locking strategies. Advisory locks versus Mandatory locks.

In advisory locks, each thread of execution waits to request the lock before
accessing the underlying data.

In mandatory locks, an exception is raised if a thread tries to read data that
has been locked.

## Binary Semaphore

Binary semaphores are the simplest types of lock.

They are implemented as a variable that has two states, "0" (unlocked) or "1"
(locked).

## Spinlock

A spinlock is a particular kind of lock that waits (spins) until the resource
can be acquired.

This mechanism is only efficient if the threads are blocked for a short period
of time given that it saves the programmer the overhead of having to
re-schedule the thread to acquire the resource again, later on, using the
operating system resources.

## Implementation

> Locks typically require hardware support for efficient implementation. This
> support usually takes the form of one or more atomic instructions such as
> "test-and-set", "fetch-and-add" or "compare-and-swap". These instructions
> allow a single process to test if the lock is free, and if free, acquire the
> lock in a single atomic operation.

> The reason an atomic operation is required is because of concurrency, where
> more than one task executes the same logic. For example, consider the
> following C code: 

```c
if (lock == 0) {
    // lock free, set it
    lock = myPID;
}
```

> The above example does not guarantee that the task has the lock, since more
> than one task can be testing the lock at the same time. Since both tasks will
> detect that the lock is free, both tasks will attempt to set the lock, not
> knowing that the other task is also setting the lock.

[source](https://en.wikipedia.org/wiki/Lock_(computer_science))

## Granularity

A coarse lock is a lock that covers a big piece of data or resource. For
example, a lock on an entire table. This type of lock often generates lower
lock overhead when a single process is used, but the performance quickly
deteriorates on a multi-user concurrency scenario.

The more coarse the lock, the higher the changes of it stopping another process
of running.

Granular locking, on the other hand, reduces the problem of locking contention.
An example is locking a row or a cell of a table. This performs better in a
multi-user scenario, but creates more lock overhead and increases the chances
of deadlocks.

## Pessimistic Locking

To update a record on a table, a user may acquire a pessimistic lock.

The pessimistic lock will prevent any other user of manipulating that record at
the same time. Only when the first user releases the lock that the second user
can manipulate the record.

In this scenario, the second user may wait for a long time before being allowed
to acquire a lock themselves, which may impact the overall performance of the
system.

This type of locking is best suited for environments with a great number of
concurrent database requests. This works well if the cost of acquiring the lock
isn't as high as rolling back a transaction when lock timeouts occur.

## Optimistic locking


> this allows multiple concurrent users access to the database whilst the
> system keeps a copy of the initial-read made by each user. When a user wants
> to update a record, the application determines whether another user has
> changed the record since it was last read. The application does this by
> comparing the initial-read held in memory to the database record to verify
> any changes made to the record. Any discrepancies between the initial-read
> and the database record violates concurrency rules and hence causes the
> system to disregard any update request. An error message is generated and the
> user is asked to start the update process again. It improves database
> performance by reducing the amount of locking required, thereby reducing the
> load on the database server. It works efficiently with tables that require
> limited updates since no users are locked out. However, some updates may
> fail. The downside is constant update failures due to high volumes of update
> requests from multiple concurrent users - it can be frustrating for users.

[source](http://web.archive.org/web/20240506200934/https://en.wikipedia.org/wiki/Lock_(computer_science))

## Deadlock

> In an operating system, a deadlock occurs when a process or thread enters a
> waiting state because a requested system resource is held by another waiting
> process, which in turn is waiting for another resource held by another
> waiting process.[3] If a process remains indefinitely unable to change its
> state because resources requested by it are being used by another process
> that itself is waiting, then the system is said to be in a deadlock.[4]

> In a communications system, deadlocks occur mainly due to loss or corruption
> of signals rather than contention for resources.

An example of dead lock is as follow:

Imagine there are two processes locking the same resources in different orders:

- Process A (PA): locks resource R1, then locks resource R2. Then releases both
- Process B (PB): locks resource R2, then locks resource R1. Then releases both

In the beginning of both processes, they lock R1 (PA) and R2 (PB), but then
when they move on to the next step to lock R2 (PA) and R1 (PB), the processes
lock each other, creating a deadlock.
