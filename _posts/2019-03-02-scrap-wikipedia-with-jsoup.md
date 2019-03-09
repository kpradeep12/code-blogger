---
title:  "Scrap Wiki With Jsoup"
date:   2019-02-28 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/create-rest-services-using-ktor.jpg
description: ""
published: false
---

Couple of days back I was searching for dummy movie data-set for one of my personal project but couldn't found the size which I need. I needed around 200 to 300 records, finally I figured out that Wiki has huge compilation of movie lists and those lists are perfect for my data-set. My idea was to choose any list and go through each movie from the list and scrap the data from that wiki page.

Movie pages will have mostly same HTML structure so I used **[Jsoup](https://jsoup.org/)** library to scrap the HTML and extract to **Movie** object. Once these objects are created then we can insert them into the database using any **ORM** library.

> **[Jsoup](https://jsoup.org/)** is a Java library for working on HTML pages. This library provides API for extracting and manipulating data.

So lets dive in to the details.

* Create Kotlin project
* Add Jsoup
* Scrap HTML Page
  - Extract movie URL's
  - Scrape movie page
  - Use streams to combine flow
* Conclusion
{:toc}

> Please note that this whole project is available in [github](https://github.com/kpradeep12/techstack-projects/tree/master/ktor-freemarker)

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

### Add Jsoup

Add below dependencies to your build.gradle

{% highlight java %}
dependencies {
    //..
    implementation("org.jsoup:jsoup:1.11.3")
}
{% endhighlight %}

Now we have our project with required dependencies setup. Let's dive into the code.

### Scrap HTML Page

We have all the setup for scrapping wiki pages now lets create **App.kt** and begin coding.

#### Extract movie URL's

Create a Movie class with all the fields which we are extracting from the web page.
 
{% highlight java %}
class Movie {
    var title: String? = ""
    var directedBy: String = ""
    var producedBy: String = ""
    var writtenBy: String = ""
    var starring: String = ""
    var musicBy: String = ""
    var releaseDate: String = ""
    var posterURL: String = ""

    override fun toString(): String {
        return "Movie(title='$title')"
    }

} 
{% endhighlight %}
 
This class holds all the Movie related information. Once we scrap the page we are going to create the instance of this class and populate the fields.

{% highlight java %}
val wiki = "https://en.wikipedia.org"

fun main() {
    val doc = Jsoup.connect("$wiki/wiki/List_of_films_with_a_100%25_rating_on_Rotten_Tomatoes").get()    // <1>
    doc.select(".wikitable:first-of-type tr td:first-of-type a")    // <2>
            .map { col -> col.attr("href") }    // <3>
            .parallelStream()    // <4>
            .map { extractMovieData(it) }    // <5>
            .filter { it != null }
            .forEach { println(it) }
}
{% endhighlight %}



