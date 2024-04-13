The fixit library allows developers to create their own custom linters, in
addition to providing "autofixers" for fixing current errors.

One common workflow is the following:

1. Add new linting rule in existing codebase
2. The linter automatically fails due to existing violations.
3. Either autofix existing issues, or silence their errors.

If autofix is not available for the particular linter, errors must be silenced
before they can be fixed manually.

There are two ways I have found of doing this:

## Cloning the module and slapping a comment on it.

After you have coded your fixup rule, change the code block that reports
on the violation to something like this:

```python
    fixit_comment = cst.Comment("# lint-fixme: MyRuleName")
    new_module = cst.Module(
        body=[
            # existing node that failed the verification.
            node.deep_clone(),
            fixit_comment,
        ]
    )
    self.report(node, replacement=new_module)
```

And then run the command to "fix" all errors by adding the string comment:

```sh
fixit fix --automatic .
```

## Using `silent-lint-error`

This is a 3rd party package:

```sh
pip install silence-lint-error
```

And then running:

```sh
silence-lint-error fixit tools.fixit.rules.common:MyCustomRule src/octoenergy/data/models/debt.py
```

Where `tools.fixit.rules.common` is the path denominated in your pyproject.toml
