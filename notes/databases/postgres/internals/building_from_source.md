# Building From Source

```
Created at: 2024-10-11
```

I prefer to build from source whenever possible. This practice allows me to
better control compilation flags that are useful for profiling.

Besides that, if I am running multiple different versions of Postgres locally,
I don't have to mingle with my OS package manager or resort to using Docker or
some other containerised environment.

The authoritative guide to installing Postgres from source can be found in
the official [documentation](https://www.postgresql.org/docs/current/installation.html).

What comes below is _my own way of installing Postgres_, which is done in a
particular way so that I can profile and trace underlying functionality in a
practical way.

## Getting The Source Code

Go to Postgres' [ftp server in this link ](https://www.postgresql.org/ftp/source/)
and grab the version of Postgres you are interested in.

Aim for the file with the `.bz2` extension, and decompress it like this:

```sh
tar xf postgresql-version.tar.bz2
```

This will create a new folder `postgresql-version` in your current directory
with the source code.

## Step 0 (for macOs users only - skip if on Linux)

Run these commands first, so that your homebrew libraries

```sh
export CPPFLAGS="-I/opt/homebrew/include"
export LDFLAGS="-L/opt/homebrew/lib"
```

## Configure

In the source directory, there is a bash script called `./configure`.

```sh
VERSION=15
PREFIX="$(pwd)/build"

./configure \
    CC='gcc' \
    CFLAGS="-fno-omit-frame-pointer -ggdb" \
    --prefix=${PREFIX} \
    --with-pgport=54${VERSION} \
    --enable-debug
```

Flags:

- `--prefix`: The default configuration installs Postgres on
  **/usr/local/pgsql**. I plan to have multiple versions of Postgres running,
  so I want to change the folder where I'll install each of them. I prefer
  to use a "build" folder so that both source and build live in the same
  directory.
- `--with-pgport`: The default port is 5432, but again, since I am running
  multiple Postgres versions, I usually use 54${version_number} in this case my
  version is 12, so 5412. This makes it easier for me to know which version a
  service runs just by looking at the port number. It also makes it easier to
  run multiple versions at the same time.
- `--enable-debug`: I want debug symbols. When using GCC as a compiler this
  doesn't affect performance too badly.
- `--enable-profiling`: This is for use with GNU gprof. Upon exit, a subfolder
  will be created with a `gmon.out` file containing the results of the
  profiler. I am not using this at the moment as I haven't been lucky to get
  gprof to work yet - In either case, `perf` is better.
- `CFLAGS`: These options allow support for capturing the whole user-space call
  stack.

The option `-fno-omit-frame-pointer` is necessary because the profiler may be
using a frame pointer-based approach for reading the stack. This may come with
an ~1% performance cost. From the Systems Performance book (Gregg):

> Incomplete stack traces are unfortunately common, and are usually caused by a
> confluence of two factors: 1) the observability tool using a frame
> pointer-based approach for reading the stack trace, and 2) the target binary
> not reserving a register (RBP on x86) for the frame pointer, instead reusing
> it as a general-purpose register as a compiler performance optimisation. The
> observability tool reads this register expecting it to be a frame pointer,
> but in fact it could now contain anything: numbers, object address, pointers
> to strings, etc. The observability tool tries to resolve this number in the
> symbol table and, if it is lucky, it doesn't find it and can print
> "[unknown]". If it is unlucky, that random number resolves to an unrelated
> symbol, and now the printed stack trace has a function name that is wrong,
> confusing you, the end user.

Note that the tool I am going to use (`perf(1)`) supports DWARF-based stack
walking, which is not stack-based. So we could skip this flag. But for the sake
of being able to use other tools later if needed, we'll compile with frame
pointers optimisation disabled anyway.

## Make

I use `bear` here so that I can get a `compile_commands.json` file after
running `make`. This is for my clangd LSP. It allows me to have jump to
definitions and the likes when I need to look at source code.

```sh
# Remove existing file if it exists.
rm -f src/compile_commands.json build

# `make` will take a bit of time to finish.
bear --output src/compile_commands.json -- make
make install
```

## Optional (extensions)

If you need to install extensions, like `btree_gist`:

```sh
# Extensions are added under `contrib`.
cd contrib/btree_gist
make && make install
cd ../..
```

If you want to install all extensions just:

```sh
cd contrib

# Loop through each folder in the current directory and run
# make && make install
for dir in */; do
    echo "Entering directory: $dir"
    cd "$dir"
    echo "Running make in $dir..."
    make > /dev/null 2>&1
    if [ $? -eq 0 ]; then  # Check if make was successful
        echo "Running make install in $dir..."
        make install > /dev/null 2>&1
    else
        echo -e "\033[31m--> \033[0m Make failed in $dir. Skipping make install."
    fi
    cd ..
done

cd ..
```

## Initialising and starting the server

```sh
VERSION=15
PORT="54${VERSION}"
DBNAME=postgres${VERSION}

# This will initialise configuration for the database.
build/bin/initdb -D build/data

# Add our specific port to the configuration file.
# The step above doesn't do that.
echo "port = 54${VERSION}" >> build/data/postgresql.conf
echo "max_locks_per_transaction=1000" >> build/data/postgresql.conf
echo "log_statement = 'all'" >> build/data/postgresql.conf
echo "log_duration = on" >> build/data/postgresql.conf
echo "log_line_prefix = '%t [%p]: [%l-1] %q%u@%d '" >> build/data/postgresql.conf

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

chmod +x server_start.sh
chmod +x server_stop.sh
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
