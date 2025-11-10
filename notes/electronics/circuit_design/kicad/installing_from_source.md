# Installing from source

```
Created at: 2025-11-05
```

Don't. It is very finickly to get everything sussed. On arch linux simply:
```sh
sudo pacman -Syu kicad
# if you want to install the official libraries (recommended):
sudo pacman -Syu --asdeps kicad-library kicad-library-3d
```

Official docs: https://dev-docs.kicad.org/en/build/linux/index.html
