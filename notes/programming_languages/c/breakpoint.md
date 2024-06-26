January 31, 2024

## Using breakpoints in C

An easy shortcut to get a breakpoint in `gdb` going is by using global assembly
labels.

```c
int fun(int a, int b) {
    // do something

    asm("b:");
    // or
    asm("b: nop");

    // return something
}
```

The label does nothing, but it means that once `gdb` is open, you can simply
do:

```sh
(gdb) b b
```

Original idea from:
- https://nullprogram.com/blog/2024/01/28/

In case the above does not work, please try:
- https://github.com/scottt/debugbreak

## Neovim shortcut

- F1: Adds the breakpoint in a new line under the cursor.
- F2: Deletes the breakpoint.

```lua
vim.api.nvim_create_autocmd({"BufNewFile", "BufRead"}, {
  group = vim.api.nvim_create_augroup("UserCAutoCommands", {clear=true}),
  pattern = '*.c',
  command = [[
    noremap <F1> :normal oasm("b: nop");<ESC> |
    noremap <F2> :g/^.*asm("b: nop").*/d<CR>
  ]]
})
```
