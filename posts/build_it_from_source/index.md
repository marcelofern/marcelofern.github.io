# Build It From Source

```
Created at: 2026-09-03
```

I am slowly migrating away from having software that is packaged by a third
party onto building it from source myself. Not manually, but in an automated
way.

I think this has been possible recently due to two main reasons:

- Most of the popular software programs have stable building systems. You don't
  have to rely on someone else's arcane knowledge of what combination of flags
  to pass to the `make` command any more. In many cases running the following
  simply works:
  `./configure && make && make install`.
- I have done the hard work upfront to minimise the number of dependencies on
  my system. That makes this more achievable. I used to run an arch linux
  machine with [1270 packages](posts/postgres/about-that-postgres-json-field/index.md),
  and now I am running 538. Out of those, I only explicitly installed 40. The
  rest comes with a basic arch install (linux kernel, firmwares, grub, etc.).
  I don't mind them too much, but I'd be happy to see them go so that I
  could get faster system updates.

I didn't go down this track just for fun. I had a real issue that I wanted to
solve, and it started with Python.

Python fame over the years hasn't been great on the subject of binary
distributions. If you used Linux in the past 5-10 years, you have possibly had a
`python` and a `python3` binary. Along with a `pip` and a `pip3` Python package
manager.

Beyond that, if you wanted to use Python 3.1 and your distribution had Python
3.2 you had to build your own binaries or use some auxiliary tool to do that
for you. It was not a good idea to overwrite the OS `/usr/bin/python3` because
you didn't know which other dependencies required a specific version of Python
that were pointing to that binary. On top of that, your distribution might also
update the Python version at any time.

There were some ways to manage multiple Python versions on the same
environment. For a while, `pyenv` was the go to for software developers, and
`conda` was very popular amongst the scientific community. People who wanted a
version-manager ecosystem would go with something like `asdf`. Nowadays
`uv` has taken the scene in the world of Python tooling.

What do these tools have to offer though? They have nice commands. You still
have to memorise them, though. But they are nice one liners. But compare that
to the script that I have that allows me to install Python binaries on my
system:

```
install_python_version() {
  # call this function with a version of Python
  # like `install_python_version 3.11.9`.

  # Clean up first
  rm -rf /tmp/python-install

  # This is where the different Python executables will be installed.
  DIR=$HOME/.python_bin/python-$1
  mkdir -p $DIR

  # This is where temporary installation files will be available.
  mkdir -p /tmp/python-install && cd /tmp/python-install

  # Download the python version
  curl -O https://www.python.org/ftp/python/$1/Python-$1.tgz

  tar -xzf Python-$1.tgz && cd /tmp/python-install/Python-$1
  ./configure --prefix=$DIR && make && make install

  echo "Now you can install your virtualenv:"
  echo "$HOME/.python_bin/python-$1/bin/python3 -m venv <env_name>"
}
```

For example if I am working on a codebase called `black_fish` that uses Python
3.14.0, I perform the following commands:

```sh
install_python_version 3.14.0

# Go to the repo directory and install the env
cd ~/workspace/black_fish
$HOME/.python_bin/python-3.14.0/bin/python3 -m venv .env

# On my bashrc I have the following:
alias black_fish="source ~/workspace/black_fish/.env/bin/activate && cd ~/workspace/black_fish/"
```

From now on every time I type `black_fish` on on my terminal I go to the
`black_fish` repository with its own Python 3.14.0 that will never conflict with anything else.

I am often working on 3-4 Python codebases simultaneously. Not having to go
through the process of remembering which tool I am using, what version the
project wants, and what activation commands to run is much convenient.

But this doesn't stop at Python. I also have to run several Postgres versions
on my machine. Sometimes simultaneously. Many Postgres environment managers
don't allow you to do this. Typically Postgres uses the port 5432, and once
that port is busy you are stuck with running a single Postgres instance at a
time.

If one project uses Postgres 15, and the other Postgres 16, and you are doing
some debugging across these two different projects at the same time, how do you
reconcile that?

In my setup I run multiple versions of Postgres in different ports. So if I am
running Postgres 15, I will run it on port 54**15**. If I am running version
16, I will run on port 54**16**. This allows me to always know which version I
am using based on the port my project is connecting to.

To make my life easier, I also set the default db names to
`postgres${VERSION}`.

On top of that, I have a very specific use case. I want to be able to profile
Postgres now and then. This requires me to build Postgres with some very
specific flags. Over the years I also learned about some very helpful Postgres
configuration settings that I wanted to propagate to my future use cases. Flags
like `"log_statement = 'all'"`, `"log_duration = on"`, etc. that are very helpful
for local debugging. So I chucked it all into my script so that I don't have
keep them on my mind when moving onto a new machine.

The basic flow is like this:

Go to Postgres' [ftp server in this link ](https://www.postgresql.org/ftp/source/)
and grab the version of Postgres you are interested in. I didn't bother to make
a `curl` script for that. Then:

```sh
VERSION=15
PORT="54${VERSION}"
DBNAME=postgres${VERSION}

tar xf postgresql-${VERSION}.tar.bz2

cd postgresql-${VERSION}/

PREFIX="$(pwd)/build"

./configure \
    CC='gcc' \
    CFLAGS="-fno-omit-frame-pointer -ggdb" \
    --prefix=${PREFIX} \
    --with-pgport=54${VERSION} \
    --enable-debug \
    --without-icu

# Remove existing file if it exists.
rm -f src/compile_commands.json build

# `make` will take a bit of time to finish.
bear --output src/compile_commands.json -- make
make install

# This will initialise configuration for the database.
build/bin/initdb -D build/data

# Add our specific port to the configuration file.
# The step above doesn't do that.
echo "port = 54${VERSION}" >> build/data/postgresql.conf
echo "max_locks_per_transaction=1000" >> build/data/postgresql.conf
echo "log_statement = 'all'" >> build/data/postgresql.conf
echo "log_duration = on" >> build/data/postgresql.conf
echo "log_line_prefix = '%t [%p]: [%l-1] %q%u@%d '" >> build/data/postgresql.conf
echo "session_preload_libraries = 'auto_explain'" >> build/data/postgresql.conf
echo "auto_explain.log_nested_statements = true" >> build/data/postgresql.conf
echo "auto_explain.log_min_duration = 200" >> build/data/postgresql.conf

# This initialises the database server. All the queries will be stored in the
# file named `logfile` at the base directory.
build/bin/pg_ctl -D build/data -l logfile start

# Create the default db "postgres${VERSION}".
build/bin/createdb --port=${PORT} ${DBNAME}

# Add handy scripts so that I don't have to rememeber these
# commands from the top of my head.
echo "rm -f logfile && build/bin/pg_ctl -D build/data -l logfile start" > server_start.sh
echo "build/bin/pg_ctl -D build/data stop" > server_stop.sh
echo "build/bin/psql -e --port=${PORT} --dbname=${DBNAME} \"\$@\"" > psql.sh
echo "./server_stop.sh && ./server_start.sh" > server_restart.sh

chmod +x server_start.sh
chmod +x server_stop.sh
chmod +x server_restart.sh
chmod +x psql.sh

# I often find it a good idea to initialise a git repository. If I need to
# alter the code, I can track my changes if I need to revert or submit a patch.
git init

cat <<EOF > .gitignore
build/
src/.cache/
logfile
perf.data
perf.data.old
EOF

git add .
git commit -m "Initial Commit"
```

I usually install my packages in `~/workspace/`. So I will have a `~/workspace/postgres15/` folder for example.
With that, I can start the server with the script created during the step above:

```sh
cd ~/workspace/postgres15/

./server_start.sh

# later...
./server_stop.sh
```

That is it, even though I would consider Postgres a "complex" case of software
to build as it involves more configuration than Python. I did want to use it as
an example because I believe it is one of the finicky ones. But as an outcome I
have full control of the Postgres server. I am not digging into weird places to
see where the log is. My logs are always stored at
`~/workspace/postgres15/logfile`. I am also free of having to rely on systemd's
goodwill to turn my Postgres service on and keep track of its life cycle.

I use this script on both my MacOs for work, and on my personal Linux laptop.
This is another great benefit of building it from source - it generally just
works on both platforms.

## Conclusions

In the process of building scripts and notes for installing software from
source I actually learned a lot about how software is packaged.

The more I learned the more I understood what value the package managers and
environment management systems gave to me, and what value was missing.

As you can tell from the above, I am still using `pacman`.
That is still necessary for things that I haven't come across to porting to
scripts yet or for things that are not possible at present or that I don't see
the value in it. Most of these are libraries that just came as default on the
arch linux installation, or that will never have competing versions in my
system running simultaneously (mostly nondevelopment packages).

Finally, note that these are only a couple of examples. Managing your builds
for the software you use is especially easy in the era of LLMs if you are so
inclined, and I urge you to at least give it a go to see what you can build at
home.

You hear about package maintainers heroes all the time, and their job
looks pretty tough and intimidating. But don't let that put you off. You have
to consider that such jobs are packaging a heap of different packages for a
generic audience that might need any combination of them. But you have your
own use case - and you can easily optimise for that.
