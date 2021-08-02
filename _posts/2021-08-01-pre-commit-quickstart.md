---
layout: post
title: Pre-commit quickstart 
---

So, I finally added pre-commit to my little library repo -- it's so much easier than I thought it would be.  

## Why use pre-commit? 

Python has a ton of tools for improving code readability and quality, including
black, isort, flake8, mypy and so on. Pre-commit is a tool that aggregates
all tools you want to run before committing a file into one command. 

[This talk from PyOhio](https://www.youtube.com/watch?v=OnM3KuE7MQM) explains it well, and adds adding pre-commit as your linter in your tox
environment as well (but this article will just cover setting up pre-commit).

## Initial steps

1. Install it

   `pip install pre-commit`

2. Create a default config file. From the top directory of your project, run:

   `pre-commit sample-config >  .pre-commit-config.yaml`

3. Try it out

   `pre-commit run --all-files`

Congratulations! You've just used pre-commit to remove trailing whitespace from all you files and a couple other checks.  (You can delete any of the "standard" rules you don't like from the initial .yaml file.)

## Install additional tools

1. Go to the
[pre-commit hooks list](https://pre-commit.com/hooks.html)
and enter the hook you want in the search box. Let's choose `isort`.

2. Copy the repo link from the pre-commit website. Sometimes, as for isort, it is the tool's official repo. Other times, it's a special
   pre-commit mirror repo.

3. Paste the link from the pre-commit hooks website into your command line to get the entry for your pre-commit-config.yaml:

   `pre-commit try-repo https://github.com/PyCQA/isort`

4. The top part of the output will be the entry for the yaml file:

   ```text
   [INFO] Initializing environment for https://github.com/PyCQA/isort.
   ===============================================================================
   Using config:
   ===============================================================================
   ```
   ```yaml
   repos:
   -   repo: https://github.com/PyCQA/isort
       rev: e5bfb28b079d942b8d5b0ce5aa7a231a0292d14a
       hooks:
       -   id: isort
   ```
   ```text
   ===============================================================================
   ```

5. This is my own little trick: copy the ouput for the tool
   into your yaml file, but replace the git-hash with a fake version number ("v0"). Your file will look something like this:

   ```yaml
   repos:
   -   repo: https://github.com/pre-commit/pre-commit-hooks
       rev: v4.0.1
       hooks:
       -   id: trailing-whitespace
       -   id: end-of-file-fixer
       -   id: check-yaml
       -   id: check-added-large-files
   -   repo: https://github.com/PyCQA/isort
       rev: v0
       hooks:
       -   id: isort
   ```

6. Run `pre-commit autoupdate` and it will replace the "v0" with the human-readable current version of the tool. (Or you could pin a preferred version of your choice here as well.)

1. You can add additional arguments or install-dependencies to each tool in this yaml file as well. I had my arguments already set up in setup.cfg and pyproject.toml and I left them there for now.  Mypy was a smidge tricky - you do have to add the install dependencies for any stub files you need.

   ```yaml
   -   repo: https://github.com/pre-commit/mirrors-mypy
       rev: v0.910
       hooks:
       -   id: mypy
           additional_dependencies: ['types-python-dateutil', 'types-requests']
   ```

8. Add one tool at a time, running `pre-commit run --all-files` each time to verify that the tool is configured correctly. If a tool is slow, you can just run a single tool, such as with `pre-commit run isort --all-files`

## Configure your project and development environment

8. Delete the installation of all the file-checking tools from your setup or requirements files in your project.  Replace all the separate tool installs
   with installing pre-commit, let pre-commit take it from there.  Test everything one last time. I had a Makefile to run my tools - I changed
   that to a single command to call pre-commit as well.

9.  When everything is happy, run `pre-commit install` to make it a git hook that runs every time you commit a file in this repo. (Don't forget to 
    check in .pre-commit-config.yaml as well.)

10. If you run multiple coordinated builds in tox, see the video above for 
    instructions for that.