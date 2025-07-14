---
layout: ../../layouts/BlogLayout.astro
title: "Execute shell commands from inside Vim"
description: "A quick guide to using Vim's visual selection and Ex mode to execute shell commands directly from within the editor, perfect for running temporary scripts."
tags: ["vim", "cli", "shell", "productivity", "terminal", "scripting"]
time: 3
featured: false
timestamp: 2024-02-26T01:09:26+00:00
filename: execute-shell-commands-from-vim
---

Vim has some really useful but lesser known features that can be really useful when creating temporary shell scripts. In this tech quickie post, I use Vim `:'<,'>!` syntax to help me quickly define an entire project in [Taskwarrior - a CLI for task and project management](https://taskwarrior.org/).

### Visually Select a Set of Lines

In my case, I was setting a series of tasks to port my docker server from Ubuntu to Debian - a subset of the task are listed below.

```sh
task add "REBUILD: server with Debian" project:home_lab.server_redo
task add "CONFIGURE: fresh Debian server with basic settings - user, sudo, etc" project:home_lab.server_redo
task add "SETUP: tailscale" project:home_lab.server_redo
task add "CONFIGURE: Syncthing for DB and Nvim" project:home_lab.server_redo
task add "ADJUST: pihole configurations for more logical IP addresses" project:home_lab.server_redo
task add "SETUP: pihole" project:home_lab.server_redo
...
```

Typing all this out one by one would've been a massive pain in the ass. So I used Vim to edit this list of shell commands and execute them quickly and easily.

### Entering Ex Mode with a Visual Selection

After visually selecting the lines you wish to execute, hitting the colon (`:`) key will enter Ex mode with the visual selection active, which is indicated by:

```vimscript
:'<,'>
```

This notation signifies that Vim has set a mark at the start (`'<`) and the end (`'>`) of the visual selection, creating a range. Any command you issue next in this Ex command mode will act on that range.

### Executing Shell Commands

To execute the selected lines as shell commands, we use the `!` Ex command, which tells Vim to execute the following command in the shell. For example, you can execute a simple `curl` command by typing:

```vimscript
!curl https://nathanlaundry.com
```

Or, to insert the output of the `curl` command into a temporary buffer in Vim, you can use:

```vimscript
:r! curl https://nathanlaundry.com
```

### Piping the Visual Selection to the Shell

In our case, we want to execute multiple shell commands listed in our visual selection. To do this, we pipe the text between the markers for the start and end of the visual selection (`'<` and `'>`), into `sh` (the shell), by running:

```vimscript
:'<,'>! sh
```

This command will replace the contents of the visual range with the result of the execution. If you prefer to keep your original commands in the buffer instead of the execution result, simply press `u` to undo the overwrite in the buffer.

This is a quick and easy way to write, manipulate, and execute a series of inconveniently long shell commands that you don't want to save as a script and then execute them from the comforts of Vim. Much nicer than saving it as a .sh file, chmod + x, and executing it, followed by deleting the file. 