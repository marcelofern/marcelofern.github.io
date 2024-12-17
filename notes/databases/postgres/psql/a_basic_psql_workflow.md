# A Basic psql Workflow

This is a workflow that only relies on vim and psql.
All of the commands below should be executed inside a psql shell.

```
-- Step 0: create local and env variables for the file name

\set FILE_NAME /tmp/queries.sql
\setenv FILE_NAME /tmp/queries.sql

-- Step 1: create the file:

\! touch $FILE_NAME

-- Step 2: edit the file with your queries:

\e :FILE_NAME
```

You can now use vim to write down your queries.
Every time you close the buffer, the query will be run by psql.

You can reopen the file with `\e :FILE_NAME`.
I usually just use `:F` for the variable name to save some keystrokes.

Sadly there is no way to simply set the default buffer to write using psql.
After analysing the code, the code for `\e` uses `getenv("TMPDIR")` (standard C
function) to grab a new buffer name of the format `tmp_dir/psql.edit.PID.sql`

## Tip 1: Use meaningful file names

This helps you by keeping a record of queries and experiments that you have
run in the past.

## Tip 2: Use \x

When you have too many columns to display, it's best to use `\x` so that each
column is represented in a line.

## Tip 3: Use a vim function:

You can simply type `\e` and execute the command `PsqlBuffer` and all will be
set for you. You can execute `\e :F` for follow up edits.

```lua

function PsqlBuffer(file_path)
    -- Use it with :PsqlBuffer <file_name>
    -- note that <file_name> is optional.
    -- the default file is `/tmp/queries.sql`
    file_path = file_path or '/tmp/queries.sql'
    vim.fn.system('touch ' .. file_path)
    local text = string.format([[\set F %s
\e :F]], file_path, file_path)

    local bufnr = vim.api.nvim_get_current_buf()
    local current_line = vim.fn.line('.')
    vim.api.nvim_buf_set_lines(bufnr, current_line, current_line, true, vim.split(text, "\n"))
end

vim.api.nvim_command('command! -nargs=? PsqlBuffer lua PsqlBuffer(<f-args>)')
```
