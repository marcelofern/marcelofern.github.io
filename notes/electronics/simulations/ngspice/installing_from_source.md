# Installing From Source

```
Created at: 2025-11-01
```

This script clones the repository and installs the executable in
`/usr/local/bin/ngspice`.

```sh
# Create tmp folder for the build
DIR="/tmp/ngspice_build"
rm -rf $DIR && mkdir $DIR && cd $DIR

# Shadow-clone the repo in the specific commit
git init
git remote add origin https://git.code.sf.net/p/ngspice/ngspice
git fetch --depth=1 origin 600ff137961587503a3bd8247d79849b6a1db3f6
git reset --hard 600ff137961587503a3bd8247d79849b6a1db3f6

# ngspice alreayd comes with an installation script
sudo ./compile_linux.sh
```
