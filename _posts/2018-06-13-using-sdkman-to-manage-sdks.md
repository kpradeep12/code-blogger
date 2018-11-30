---
layout: post
title:  "Using SDKMAN to manage SDK's"
date:   2018-06-13 20:11:10 -0500
categories: tools
image: /assets/images/banners/using-sdkman-to-manage-sdks.png
author: pradeep
featured: false
---

Some times we may want multiple java versions on our computer. Lets say we want to have java 8 to run a personal application and java 7 to run a old tool. We can install both of them but depending on what we working on, we may need to switch PATH and JAVA_HOME. It doesn't just stop at java, what about if application depends on some old maven but we also need latest version of maven for some other project, then we need to manage multiple maven versions.

## SDKMAN

**[SDKMAN](https://sdkman.io/)** is a Software Development Kit Manager for java developers. It provides a CLI interface to manage multiple SDK's like java or maven in the above example. Using this tool we can easily switch, install, uninstall or update candidates. Candidates are nothing but the java SDK's managed by SDKMAN.

Installation of SDKMAN is easy on linux based operation systems because it is written in bash but for Windows we need to have Cygwin or MSYS+MinGW. Go through this **[link](https://sdkman.io/install)** for installation steps.

Note that SDKMAN will not manage pre-existing SDK's. So either you need to uninstall them and reinstall with SDKMAN or you can continue to keep them.

After the installation you can see a hidden folder '.sdkman' in users home directory. This contains a sub-folder named 'candidates' which is used to store all installed candidates. We no need to learn about these directories but these folders will give us an idea of how SDKMAN works internally. 

If we install multiple java versions then candidates folder will contain more than one java sub-folder. IDE's like Eclipse or IntelliJ Idea allows us to add multiple JDK's so we can provide java folders in the candidates to add multiple versions.

Go through this **[link](https://sdkman.io/sdks)** to see the list of all SDK's which SDKMAN can install.

## CLI

Lets open a terminal and fire up some commands to see how SDKMAN works. I provided some basic commands, we can also go through this **[link](https://sdkman.io/usage)** to learn all available options.

### List all available versions

Below command will list all available java versions.
{% highlight bash %}
$ sdk list java

================================================================================
Available Java Versions
================================================================================
     9.0.7-zulu                                                                 
     9.0.4-openjdk                                                              
   * 8.0.172-zulu                                                                
     8.0.171-oracle                                                              
     7.0.181-zulu                                                                
     10.0.1-zulu                                                                 
     10.0.1-oracle                                                               
 > * 10.0.0-openjdk                                                       
================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
{% endhighlight %}

Above output is from my local machine. In the list, it indicates that I have two java versions already available on my machine (8.0.172-zulu and 10.0.0-openjdk) out of them java 10 is currently in use.

### Install

No need to mention version if we want to install latest stable release. Below command will install latest stable java version.
{% highlight bash %}
sdk install java
{% endhighlight %}

While installing it asks if we want this version to be set as default. If we say Yes then it will update the PATH so this effects in all new terminal windows.

To install specific java version:
{% highlight bash %}
sdk install java 9.0.7-zulu
{% endhighlight %}

### Switching versions

Switch to different version temporarily in current shell window.
{% highlight bash %}
sdk use java 8.0.172-zulu
{% endhighlight %}

Switch to different version permanently. This command will update PATH.
{% highlight bash %}
sdk default java 8.0.172-zulu
{% endhighlight %}

## List current versions

To see all installed SDK's
{% highlight bash %}
sdk current
{% endhighlight %}

## Conclusion

SDKMAN is a small and easy utility to manage multiple SDK's in our computer. Its really useful for Java developers and it makes life easier.