# pgcrypto

```
Created at: 2024-11-14
```

## Building From Source

If you installed postgres from source, you'll have a folder called "contrib".
This is where the `pgcrypto` extension lives.

```
cd contrib/pgcrypto
make && make install
```

## MacOs users only:

Make sure you are linking homebrew (follow my note for installing postgres from
source), and if you have error about missing symbols, add the following at the
end of the `gcc` command:

```sh
gcc -Wall ... -lz -lssl -lcrypto
```

