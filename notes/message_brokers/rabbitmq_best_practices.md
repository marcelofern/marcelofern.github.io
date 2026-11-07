2024-05-11

## Keep queues short

RabbitMQ will start writing messages to disk in order to free RAM.

This process is called "Page out". While RabbitMQ is writing messages to
disk, the queue is blocked.

If a cluster is restarted, its message index needs to be rebuilt. The more
messages in the queue, the longer it takes. The same is true for syncing
messages between nodes after a restart.

## Use quorum queues

The Mirrored Queues (older implementation) have been deprecated.

The basic design of Mirror Queues is based on a single leader queue and one
or more copies (mirrors).

All reading and writing operations must go to the leader first, and then the
leader replicates those commands in the copies. When all the mirrors have the
commands synchronised, the leader will confirm the operation with the
publisher.

If the confirmation doesn't work because the leader failed, another mirror is
promoted as leader. Meaning the queue remains available without any data loss.

On the whole, Mirrored Queues have slower performance because the algorithm
that replicates messages is inefficient. However, there are also a few design
flaws with this system.

**Brokers restarting**. When a broker goes off-line and is brought back up
again, the data in their mirrors is completely discarded. With the empty
mirror, admins can decide whether they sync the mirror to get the messages
back or not.

**Synchronisation blocks**. If the broker restarted and needed to re-sync,
the whole queue has to be blocked while synchronisation happens. If the queue
is really long (>1kk messages) or very heavy (>1GB) this can take a lot of
time.

**Synchronisation defaults**. All mirror will synchronise by default
automatically. But it is possible to change settings so that the
synchronisation doesn't happen automatically. This means that new messages
would get mirrored normally, but existing ones would not. In this case, there's
less redundancy and higher chances of memory loss.

Thus enters the QUORUM QUEUES:

Quorum Queues function as a replicated queue with one leader and multiple
followers. For instance, a quorum queue with a replication factor of six will
include six replicated queues: one leader and five followers, each queue living
on a distinct node (broker).

Clients, both publishers and consumers, exclusively interact with the leader,
which then disseminates all read and write commands to the followers.

Followers remain isolated from client interactions and serve solely for
redundancy purposes, ensuring continuity in case of a RabbitMQ broker failure,
shutdown, or reboot. In the event of a broker outage, a follower replica on
another broker is elected as the leader, seamlessly maintaining service.

When a publisher dispatches a message, the queue confirms its receipt only
after a majority of replicas have persisted the message to disk. Consequently,
a slow minority does not impede the overall queue performance. Similarly,
leader election necessitates majority agreement, preventing dual leadership
acceptance during network partitioning. Thus, quorum queues prioritize
consistency over availability.

## Enable lazy queues

When operating a Lazy Queue, all the messages are automatically written to
disk.

This minimises RAM in exchange for slower throughput.

Lazy Queues will make the cluster more stable and will make it easier to
predict the overall performance of the broker. This means that there will be
less unpredictability when sending a lot of messages in a short period of time.

This is recommended if the queue is used for managing batch jobs and when
there's a chance that consumers may not keep up with how quickly messages get
published. Since RabbitMQ 3.12, this feature is turned on by default.

## Auto-deleting unused queues

Unused queues might fail behind due to dropped connections. In these cases it
is sensible to set a TTL of 28 days (or so) to delete queries that haven't been
consumed from in 28 days.

## Further reading

- [source](http://web.archive.org/web/20240408165450/https://www.cloudamqp.com/blog/part1-rabbitmq-best-practice.html)
- [source](http://web.archive.org/web/20240408165447/https://www.cloudamqp.com/blog/reasons-you-should-switch-to-quorum-queues.html)
