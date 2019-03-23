---
title:  "Make your users login with there Twitter credentials"
date:   2019-03-08 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/light-weight-sql-kotlin-library.jpg
description: ""
published: false
---

* Introduction
* Create Kotlin project with Ktor
  - Add dependencies
* Create a host entry
* Create Twitter app
* Install OAuth Authentication
* Test application
* Conclusion
{:toc}

### Introduction

This article will explain the process of authenticating users with there **Twitter** credentials to login into a web application. I will use **Ktor** framework for this web application. This kind of authentication process is called OAuth where third party will authenticate users and this will help users to login into the application with out creating new credentials.

> This whole project is available in [Github](https://github.com/kpradeep12/techstack-projects/tree/master/ktor-oauth)

### Create Kotlin project with Ktor

Execute below commands to create an empty gradle Kotlin project. Once the project is created then import it into your favorite editor.

{% highlight bash %}
mkdir ktor-oauth
cd ktor-oauth
gradle init --type kotlin-application

Select build script DSL:
  1: groovy
  2: kotlin
Enter selection (default: kotlin) [1..2] 

Project name (default: ktor-oauth): 
Source package (default: ktor.oauth): net.thetechstack
{% endhighlight %}

> I executed this command on Gradle 5.2.1 version. You can choose to create kotlin project with any other build tool.

This command will create a new project with standard folder structure.

#### Add dependencies

Update **build.gradle.kts** to add below dependencies;

{% highlight java %}
val ktor_version = "1.1.3"
dependencies {
  //ktor
  implementation("io.ktor:ktor-server-core:$ktor_version")
  implementation("io.ktor:ktor-server-netty:$ktor_version")
  implementation("io.ktor:ktor-jackson:$ktor_version")
  
  //ktor authentication
  implementation("io.ktor:ktor-auth:$ktor_version")

  //ktor HTTP client
  implementation("io.ktor:ktor-client-apache:$ktor_version")
  
  //ktor freemarker template dependency for HTML templates
  implementation("io.ktor:ktor-freemarker:$ktor_version")

  //logging
  implementation("ch.qos.logback:logback-classic:1.2.3")
}
{% endhighlight %}

### Create a host entry

While configuring OAuth we need to provide redirect URLs that can't be IP addresses or localhost. So for development purpose we need to create a host which points to 127.0.0.1 in local. We can create a host by editing **hosts** file. You can choose any name for your local domain but I am going to give it **me.mydomain.com**

Update **hosts** file by adding new line shown below. You will need root/admin access to edit it.

{% highlight bash %}
127.0.0.1   me.mydomain.com
{% endhighlight %}

In linux based operating systems this file exists at **/etc/hosts** and in Windows it exists at **%SystemRoot%\System32\drivers\etc\hosts**

### Create Twitter app

The web application which we are developing allows users to login with there **Twitter** credentials. In-order to collect and authenticate users we need to register our application with **Twitter**. Below steps will help us in registering our application with Twitter.

* Sign in to twitter developer account [https://developer.twitter.com](https://developer.twitter.com). Create new account if not exists.
* Create new app by clicking on **Create an app** button.
* Provide new app details like shown in below.

![Twitter new app]({{site.baseurl}}/assets/images/posts/2019/03/twitter-dev-app-1.jpg){: height="400px" width="600px"}{: .align-center}

* 