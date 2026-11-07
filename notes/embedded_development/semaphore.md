2024-05-11

Semaphores are similar to mutexes as in they allow to control who has access to
a particular resource in a scenario where multiple threads are trying to mutate
shared data.

However, mutexes are used when only one thread can access a particular
resource, whereas semaphores are more general, and allow a number N of threads
(but no more) to access a particular resource.

## Library Analogy

> Suppose a physical library has ten identical study rooms, to be used by one
> student at a time. Students must request a room from the front desk. If no
> rooms are free, students wait at the desk until someone relinquishes a room.
> When a student has finished using a room, the student must return to the desk
> and indicate that the room is free.

> In the simplest implementation, the clerk at the front desk knows only the
> number of free rooms available. This requires that all of the students use
> their room while they have signed up for it and return it when they are done.
> When a student requests a room, the clerk decreases this number. When a
> student releases a room, the clerk increases this number. The room can be
> used for as long as desired, and so it is not possible to book rooms ahead of
> time.

> In this scenario, the front desk count-holder represents a counting
> semaphore, the rooms are the resource, and the students represent
> processes/threads. The value of the semaphore in this scenario is initially
> 10, with all rooms empty. When a student requests a room, they are granted
> access, and the value of the semaphore is changed to 9. After the next
> student comes, it drops to 8, then 7, and so on. If someone requests a room
> and the current value of the semaphore is 0,[3] they are forced to wait until
> a room is freed (when the count is increased from 0). If one of the rooms was
> released, but there are several students waiting, then any method can be used
> to select the one who will occupy the room (like FIFO or randomly picking
> one). And of course, a student must inform the clerk about releasing their
> room only after really leaving it.

> The paradigm is especially powerful because the semaphore count may serve as
> a useful trigger for a number of different actions. The librarian above may
> turn the lights off in the study hall when there are no students remaining,
> or may place a sign that says the rooms are very busy when most of the rooms
> are occupied.

[source](http://web.archive.org/web/20240507180413/https://en.wikipedia.org/wiki/Semaphore_(programming))




