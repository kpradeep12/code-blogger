---
layout: book
title: Git cheat sheet
menus:
    - title: Basic operations
      url: basic-operations
    - title: Branching
      url: branching
    - title: Remote branch
      url: remote-branch
    - title: Stash
      url: stash
    - title: Rebase
      url: rebase
    - title: View commit history
      url: view-commit-history
    - title: Working with remotes
      url: working-with-remotes
    - title: Tagging
      url: tagging
---

##### Basic operations

| **git clone \<repo_url>**   | Clone and create new local repository
| **git status**   | List all the changes in the repository; new file, modification or deletion
| **git status -s**   | List all the changes in the repository; short format
| **git diff**   | Compares modified files to staging area
| **git diff --staged**   | Compares staged files to last commit
| **git add \<file>**   | Move file from working area to staging area
| **git add -A**   | Move all modified/new files to staging area
| **git commit -m "\<message>"**   | Commit all staged files to local project history
| **git commit -a -m "\<message>"**   | Add and commit together. Short form for 'git add -A && git commit -m <>'
| **git push \<origin> \<master>**   | Push local commited changes to remote. <origin> is the server and <master> is the branch to which changes are pushed
| **git pull --all**   | Pull all new changes on remote to local
{: .custom-cheat-sheet-table}

##### Branching

| **git checkout \<branch name>**   | Create new branch
| **git checkout -b \<branch name>**   | Create new branch and switch
| **git merge \<branch name>**   | Merge branch
| **git branch -d \<branch name>**   | Delete branch
| **git branch**   | List all local branches
| **git branch -v**   | List branches with last commit
| **git branch --merged**   | List all branches merged with current branch
| **git branch --no-merged**   | List all branches which haven't yet merged
{: .custom-cheat-sheet-table}

##### Remote branch

| **git branch -r**   | List all remote branches
| **git checkout -b \<branch-name> \<remote-branch-name>**   | Creates new local repo from this remote branch
| **git push origin --delete \<branch-name>**   | Delete's remote branch
{: .custom-cheat-sheet-table}

##### Stash

| **git stash**   | Saves all files to stash
| **git stash clear**   | Delete all changes in stash
| **git stash list**   | List all changes in the stash
| **git stash apply**   | Pops and applies recent stash
| **git stash show**   | List all recent stash changes
{: .custom-cheat-sheet-table}

##### Rebase

| **git rebase \<branch>**   |
| **git rebase --continue**   | To continue after fixing rebase conflict issues
{: .custom-cheat-sheet-table}

##### View commit history

| **git log**   | Lists summary of all commits
| **git log -p -2**   | Lists last two commit details
| **git log --stat**   | Displays stats
| **git log --pretty=online**   | Display in one line. *Other options for pretty is short, full and fuller*{:.bg-warning}
| **git log --pretty=format: "%h %s" --graph**   | Display as graph
| **git log --oneline --decorate**   | Shows current HEAD pointer. (Git keeps a special pointer called HEAD, which helps git to know in which branch it is on)
{: .custom-cheat-sheet-table}

##### Working with remotes

| **git remote**   | List all remote branches (use -v option to show URL's)
| **git remote add pb \<URL>**   | Add remote repo
| **git fetch pb**   | Fetch new changes from remote (fetch will not merge changes automatically)
| **git pull**   | Fetch and merge changes into curent branch
| **git push origin master**   | Push local changes from origin to master branch in remote
| **git remote show origin**   | Inspect remote; lists all details about the remote
| **git remote remove pb**   | Remove remotes
{: .custom-cheat-sheet-table}

##### Tagging

| **git tag**   | List all tags
| **git tag -a v1.4 -m "my version"**   | Create annotated tag
| **git tag v1.4**   | Create a lightweight tag
| **git tag v1.4**   | Show tag info
| **git tag -a v1.4 \<commit-id>**   | Tag a particular commit
| **git push origin v1.4**   | Push particular tag to remote (By default 'git push' will not upload tags to remote)
| **git push origin --tags**   | Push all tags
{: .custom-cheat-sheet-table}

