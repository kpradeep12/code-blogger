---
title: "Common Workflows In Git For Developers"
date: 2021-10-07 12:11:10 -0500
categories: [git, workflow]
image: /assets/images/banners/common-workflows-in-git.png
description: "Most of the time, we try to search for solutions for some common Git problems. I started compiling them on this page; it might help you understand or learn more about Git."
---

In this article we will look at some common Git workflows.

* Connect local repo to Github repository
* Check if any new changes in remote
* Force pull to overwrite local files
* Exclude some files/directories from staging
* Working on tags
{:toc}

### Connect local repo to Github repository

At a later point, you might want to connect the local repo with the Github repository. To do that, initiate the git project and sync it by following the below commands.

{% highlight bash %}
#initiate git project in loca repo
git init .

#Add remote repo
git remote add origin https://github.com/<user>/repo.git

#pull changes from remote
git pull origin master
{% endhighlight %}

### Check if any new changes in remote

Sometimes we may want to check if any new changes are available in remote before pulling the changes. To check that, execute the below sequence of Git commands.

{% highlight bash %}
#fetch the changes from remote; this command will not touch your local changes.
git fetch origin

#view commit history
git log master origin/master

#view differences between the master and the fetched branch
git diff master origin/master

#optional command: view only changed files; this is the short form
git diff master origin/master --name-only

#apply the changes by merging with remote branch
git merge origin/master

#or pull the changes
git pull
{% endhighlight %}

### Force pull to overwrite local files

You may be faced the below error when trying to pull changes from the remote.

{% highlight bash %}
error: Your local changes to the following files would be overwritten by merge:
{% endhighlight %}

To fix this issue, we need to first either save local changes by stashing them 'git stash' or discard local changes with the below commands

{% highlight bash %}
#reset staged files
git reset --hard

#delete local untracked/new files
git clean -fd
{% endhighlight %}

After the local changes are cleaned then, execute 'git pull'

### Exclude some files/directories from staging

If you want to skip some files/directories from staging, then use the below command. 

{% highlight bash %}
#skips notes.txt and docs from staging but remaining all file will be staged
git add --all -- ':!<notes.txt>' ':!<docs>'
{% endhighlight %}

### Working on tags

Commit all your changes and look below commands for your specific need.

{% highlight bash %}
#to create a tag
git tag v1.0

#list all tags
git tag

#to push a particular tag
git push origin v1.0
{% endhighlight %}

> Read this **[Git Cheat Sheet]({{site.baseurl}}/pages/cheat-sheets/git-cheat-sheet/)**  for quick overlook of Git commands.
