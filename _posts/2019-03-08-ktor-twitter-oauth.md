---
title:  "Make your users login with there Twitter credentials"
date:   2019-03-08 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/create-rest-services-using-ktor.jpg
description: ""
published: false
---


So lets dive in to the details.

* Create Kotlin project
* Conclusion
{:toc}

> Please note that this whole project is available in ...

### Create Kotlin project

Execute below command to create an empty gradle Kotlin project. Once the project is created then import it into your favorite editor.

{% highlight bash %}
mkdir wiki-scraper
cd wiki-scraper
gradle init --type kotlin-application

Select build script DSL:
  1: groovy
  2: kotlin
Enter selection (default: kotlin) [1..2] 

Project name (default: wiki-scraper): 
Source package (default: wiki.scraper): net.thetechstack
{% endhighlight %}

> I executed this command on Gradle 5.2.1 version. You can choose to create kotlin project with any other build tool.

This command will create new project with standard folder structure and default **App.kt** file.

