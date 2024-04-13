March, 11th 2024

> In software development, time-of-check to time-of-use (TOCTOU, TOCTTOU or
> TOC/TOU) is a class of software bugs caused by a race condition involving the
> checking of the state of a part of a system (such as a security credential)
> and the use of the results of that check.

> TOCTOU race conditions are common in Unix between operations on the file
> system, but can occur in other contexts, including local sockets and improper
> use of database transactions.

[source](https://web.archive.org/web/20240128022038/https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use)

This vulnerability is mentioned in the book "Advanced Programming in the Unix
Environment" when the book introduces the `open` and `open_at` unix functions.

It says that:

> The basic idea behind TOCTTOU errors is that a program is vulnerable if it
> makes two file-based function calls where the second call depends on the
> results of the first call. Because the two calls are not atomic, the file can
> change between the two calls, thereby invalidating the results of the first
> call (...)

> (...) TOCTTOU errors in the file system namespace generally deal with
> attempts to subvert file system permissions by tricking a privileged program
> into either reducing permissions on a privileged file or modifying a
> privileged file to open up a security hole.


The book also mentions the work by Wei and Pu, referenced in the following
source, which we use in the example section below.

[source](https://web.archive.org/web/20230516115534/https://www.usenix.org/legacy/event/fast05/tech/full_papers/wei/wei.pdf)

## Example

This example is taken from the article above:

> First, a vulnerable program checks for a file status. Second, the program
> operates on the file assuming the original file status remained invariant
> during execution. For example, `sendmail` may check for a specific attribute
> of a mailbox (e.g., it is not a symbolic link) in step one and then append
> new messages (as root) in step two. Because the two steps are not executed
> atomically, a local attacker (mailbox owner) can exploit the window of
> vulnerability between the two steps by deleting his/her mailbox and replacing
> it with a symbolic link to /etc/passwd. If the replacement is completed
> within the window and the new messages happen to be syntactically correct
> /etc/passwd entries with root access, then sendmail may unintentionally give
> unauthorized root access to a normal user (the attacker).

This example might not explain thoroughly what the consequences are.

First, the `etc/passwd` file stores information about users. Each line in the
file represents a user, with various fields separated by colons. One of these
fields is the user privilege to the system, represented by a numerical value.
For example, a value of 0 indicates the highest privilege, that of the root
user.

Example `/etc/passwd` file:

```
root:x:0:0::/root:/bin/bash
bin:x:1:1::/:/usr/bin/nologin
daemon:x:2:2::/:/usr/bin/nologin
mail:x:8:12::/var/spool/mail:/usr/bin/nologin
```

So the exploit runs like this:

1. The hacker calls sendmail with a message that looks like this:
   `my_root:x:0:0::/root:/bin/bash`.
2. The sendmail code does the first pass to verify the mailbox file to append
   the message is not a symbolic link.
3. The hacker changes their mailbox to point to the `/etc/passwd` so that
   instead of appending to their mailbox, their message above will be appended
   to the `/etc/passwd` file.
4. The sendmail code writes, with root access, to the `/etc/passwd` folder the
   message above.
5. The hacker now has a user with root access to the system.

Note that the attack can only succeed if the hacker managed to change their
mailbox to the `/etc/passwd` file in that time window where the program is
running between the check and the message appending.

This might not take as much time as expected if the hacker managed to create a
brute force program with random time-window guesses.

## Vulnerable code

Take for example this C code snippet:

```c
if (access("file", W_OK) != 0) {
    // check if the `file` is OK to write on. Exit if not.
    exit(1);
}

// The exploit must start from here until the time the file is opened for
// writting.

fd = open("file", O_WRONLY);
write(fd, buffer, sizeof(buffer));
```

## openat

```c
int openat(int dirfd, const char *pathname, int flags, ...
          /* mode_t mode */ );
``

The system function `openat` is a more secure way to avoid the TOCTTOU attacks.
Instead of opening any kinds of files in the system, it can accept a file
descriptor for a base directory (`dirfd`), and a relative path `pathname` and
only operate within that directory.

Another possibility is the `openat2()` system call. It optionally allows for
the file to be created at the same time the file is being written, helping with
atomicity.
