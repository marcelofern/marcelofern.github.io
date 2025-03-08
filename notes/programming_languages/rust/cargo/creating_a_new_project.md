# Creating a New Project

```
Created at: 2025-02-27
```

The command to create a new project is:

```sh
cargo new project_name
```

It will:

- Create a directory of the same name
- Initialise `git` and add a basic `.gitignore`.
- Create a `src` folder with a `main.rs` inside.
- Create a `Cargo.toml` with the following content:
  ```
  [package]
  name = "project_name"
  version = "0.1.0"
  edition = "2024"
  ```
