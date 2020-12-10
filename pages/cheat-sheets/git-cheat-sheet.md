---
layout: page
title: Git cheat sheet
---

* Branch
* Remote branch
* Stash
* Rebase
{:toc}

##### Branch

| **git checkout**   | checkout current code
| **git checkout -b \<branch name>**   | checks out current branch to new branch and switches
{: .custom-cheat-sheet-table}
&nbsp;

##### Remote branch

| **git branch -r**   | List all remote branches
| **git checkout -b \<branch-name> \<remote-branch-name>**   | Creates new local repo from this remote branch
| **git push origin --delete \<branch-name>**   | Delete's remote branch
{: .custom-cheat-sheet-table}
&nbsp;

##### Stash

| **git stash**   | Saves all files to stash
| **git stash clear**   | Delete all changes in stash
| **git stash list**   | List all changes in the stash
| **git stash apply**   | Pops and applies recent stash
| **git stash show**   | List all recent stash changes
{: .custom-cheat-sheet-table}
&nbsp;

##### Rebase

| **git rebase \<branch>**   |
| **git rebase --continue**   | To continue after fixing rebase conflict issues
{: .custom-cheat-sheet-table}
&nbsp;
