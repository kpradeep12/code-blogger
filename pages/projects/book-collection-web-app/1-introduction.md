---
layout: project
title: "Book Collection"
categories: [project]
image: /assets/images/banners/dockerfile-quick-reference.png
project_id: book-collection-web-app
---

**_My Book Collection_** is a web application that allows users to search their favorite books and add them to their collection, and users can also share their collection.

### Demo
![]({{site.baseurl}}/assets/images/projects/my-book-collection/my-book-collection.gif){: .align-center}

### What did we use in this project?
* Java
* Spring framework
    * Spring boot
    * Spring security
    * Spring Thymeleaf
* H2 database

### What you'll need?
* Java 11 (or higher)
* Git
* Your favorite Java editor to view/edit source code (optional)

### Download and Run application
Open a terminal and clone my book collection application.
{% highlight console %}
git clone https://github.com/kpradeep12/project-my-book-collection.git
{% endhighlight %}

Run application in Mac
{% highlight console %}
./mvnw spring-boot:run
{% endhighlight %}

Run application in Windows
{% highlight console %}
mvnw spring-boot:run
{% endhighlight %}

### Project walkthrough

By default, the application starts at **8080** port. You can change the port number by providing an application argument, like below.

{% highlight console %}
mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.port=8081"
{% endhighlight %}

Once the application is up, then open a browser and hit *[http://localhost:8080/ned_s](http://localhost:8080/ned_s){:target="_blank"}*{:.ul} *&nbsp;*{:.fas .fa-external-link-alt .small_text}; this is the public profile of user **Ned**. Ned can share this URL with anyone to show his book collection, but only Ned can edit his collection.

<image>

To edit Ned's collection, log in with the below credentials;
User name: ned_s
password: test

To browse books, click on 'Search Books' link on the top menu.
