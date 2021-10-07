---
title: "Common Workflows In Git For Developers"
date: 2021-10-07 12:11:10 -0500
categories: [git, workflow]
image: /assets/images/banners/common-workflows-in-git.png
description: "Most of the time, we try to search for solutions for some common Git problems. I started compiling them on this page; it might help you understand or learn more about Git."
published: false
---

In this article we will look at some common Git workflows.

* Check if any new changes in remote
{:toc}

### Check if any new changes in remote

Sometimes we may want to check if any new changes are available in remote before pulling the changes. To check that, execute the below sequence of Git commands.

{% highlight bash%}
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


> Read this **[Git Cheat Sheet]({{site.baseurl}}/pages/cheat-sheets/git-cheat-sheet/)**  for quick overlook of Git commands.
