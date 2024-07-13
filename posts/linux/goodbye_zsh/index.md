# Goodbye ZSH

```
Created: 2024-05-08
Updated: 2024-07-06
```

After 7 years using
[zsh](http://web.archive.org/web/20240503162424/https://www.zsh.org/) and
[oh-my-zsh](http://web.archive.org/web/20240501165521/https://ohmyz.sh/), I've
completely ditched both of them today.

I would like to state at the top that there isn't anything inherently bad or
wrong with zsh and oh-my-zsh. It is just that these technologies don't fit well
within my way of doing things, and have become unnecessary over time.

There are many reasons for this, but I will start with the reasons for getting
rid of `oh-my-zsh` first.

## oh-my-zsh

One may think that oh-my-zsh is zsh itself, but that is not true.
oh-my-zsh is simply a "plugin manager" for zsh.

The oh-my-zsh package promises wonders. From their website:

> Oh My Zsh will not make you a 10x developer...but you may feel like one!
>
> Once installed, your terminal shell will become the talk of the town or your
> money back! With each keystroke in your command prompt, you'll take advantage
> of the hundreds of powerful plugins and beautiful themes. Strangers will come
> up to you in cafés and ask you, "that is amazing! are you some sort of
> genius?"

oh-my-zsh comes with hundreds of plugins pre-installed, many of which you will
never use or hear of, and that includes themes as well.

Even though this isn't a problem in itself, as those plugins are just text
files that will hang around in your system, they are still there when you
didn't ask for them.

This is something that I personally have been trying to reduce in my system as
the burden of maintenance rises with every package added.

The less unused files, dependencies, libs, etc, the less risk there is of
something crashing, requiring updates, or being a security risk. This is
particularly relevant as on-my-zsh plugins are just a bunch of zsh shell
scripts.

But this is just me preaching a particular philosophy. A more important
practical problem, is around the bash `aliases` that oh-my-zsh brings with it.
Many of each are for applications you may not even have installed.

For example, these are some of the aliases available with oh-my-zsh:


```sh
alias help='man'
alias _='sudo '
alias :3='echo'
alias dud='du -d 1 -h'
alias drm='docker container rm'
alias p='ps -f'
alias rm='rm -i'
alias ldot='ls -ld .*'
alias lS='ls -1FSsh'
alias hadat='heroku addons:attach'
```

This might not be a problem unless you have a crashing alias. But still, did
you know you had all those aliases available? Are them really that useful to
you? Have you come across them accidentally and became surprised? The `helper`
alias to `man` particularly bothers me. But also, I don't want heroku aliases
in my user land.

Even if some aliases or plugins are useful, you can copy the ones you want, and
just plug into your `.bashrc` file.

In the end of the day oh-my-zsh plugins are just bash files written in zsh
syntax, many of which are compatible with plain bash, or can be easily ported.

There is no versioning control or anything fancy like that. Just files. This is
one of the reasons many people won't categorise oh-my-zsh as a plug-in manager
(and why it put it between quote marks when I mentioned it earlier), as it
lacks so many features to that end.

For me it comes down to: I don't need this technology, and it does not add much
value to my daily use of my computer, therefore it must go.

Next are the reasons why I stopped using zsh.

## zsh

One thing that people aren't really aware of is that zsh doubles as a scripting
language of its own. They might not realise this until they share a script with
someone, and that script doesn't run on their machine.

For example, the syntax below is only available in zsh:

```sh
# All files that are NOT .c files (^ provides negation)
ls -d ^*.c

# Grouping
ls (foo|bar).*

# Recursive search with **
ls **/*bar
```

There are more advanced filename-generation patterns, but you get the idea.

`zsh` also allows you to `cd` into a directory just by typing its name

```sh
% cd /
% setopt autocd
% bin
% pwd
/bin
```

The official introduction page has a lot more examples of what is available.
You can check it [here](http://web.archive.org/web/20240503012616/https://zsh.sourceforge.io/Intro/intro_toc.html).

Some functionalities like expanding `/u/lo/b` to `/usr/local/bin` are things
that I do not want to have in my shell, and they strike me as bad patterns due
to the high risk of doing the wrong matching and expanding to the wrong dir
or file.

But the biggest problem for me is that the zsh scripting language adds way too
many non-POSIX compliant features that end up confusing me a lot. I always have
to look up the syntax to make sure my zsh script isn't going to be flawed in
another environment that doesn't use zsh due to invalid syntax errors.

This diminishes my ability to write good portable scripts.

Part of this is skill-issue on my side (everything is!) as we know every
bash script should be POSIX compliant (joking, not even bash is POSIX
compliant), but nonetheless, for newcomers like I once was, picking up the
shell that looked the most "cool" was part of a factor for picking up a shell.

This type of problem is more pronounced for me because I have several bash
scripts that I created overtime with zsh scripting not even knowing I was using
zsh scripting. This is a common newbie mistake to make, but when you just want
to get something going you often get into these types trade-offs that become
more pronounced later once you have mastered a few tools.

So what is the alternative to all of this?

## bash

Yep. I'm just using plain bash now and trying to figure out how far I can get
with it. So far I haven't got a reason to get anything more featureful than
bash.

I have been using `fzf` in the terminal, which is a dependency I already had
and am familiar with, to deal with autocompletion and recursive command search
instead. The experience is much better than the zsh autocompletion.

These are the lines in my .bashrc that turn on the fzf integration.

```sh
source /usr/share/fzf/key-bindings.bash
source /usr/share/fzf/completion.bash
```

This will enable:

- Ctrl+t list files+folders in current directory (e.g., type git add , press
  Ctrl+t, select a few files using Tab, finally Enter)
- Ctrl+r search history of shell commands
- Alt+c fuzzy change directory

This is handy for me, as the functionality is similar to the `Telescope` plugin
I have been using in neovim, and I can see a quick preview of files but also
a fuzzy-search output of the reverse search I'm performing at the time.

Also, I use alacritty as my terminal.
Alacritty has vi key bindings, so I don't need my shell to provide that for me,
one less feature I need from the shell!

Most terminal emulators have some form of emacs or vi key bindings these days,
so this isn't something necessary for a shell to support.

But that said, I can still turn vi mode on bash with `set -o vi`, so you can
choose between using vi mode on your shell or on your terminal.

And that is pretty much it.

Nothing fancy - just getting rid of new technology that doesn't aggregate value
in my day-to-day activities.

I'm on a journey to make my installation script as lean as possible to make
updating my system as fast as possible, and also to give my system less
entrypoints to break or be exploited.

Granted, I haven't had any bad experiences with zsh, but that alone doesn't
mean I should re-check my previous assumptions and switch a particular
technology for something better (or just pick the boring tech that has always
been there to begin with).

I have no plans to go more basic and further switch to `sh` at this stage, but
I will be looking at `dash` next to get the sweet performance enhancements and
something that is more POSIX compliant than bash.
