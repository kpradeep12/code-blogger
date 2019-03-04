---
title:  "Scrap Wiki With Jsoup"
date:   2019-02-28 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/create-rest-services-using-ktor.jpg
description: ""
published: false
---

Couple of days back I was searching for some dummy movie data-set to develop one of my personal project but couldn't found the size which I need. Either huge files from **IMDB** or small sets but I needed around 200 to 300 records. Finally I figured out that Wiki huge compilation of movie lists and those lists are perfect for my data-set. My idea was to choose any list and go through each movie from the list and scrap the data from that wiki page.

Movie pages will have mostly same HTML structure so I used **JSOUP** library to scrap the movie page and extract to **Movie** object. I used this objects to insert data into database.

This is kind of a mini project and helps beginners to understand and there are number of ways this solution can be improved. So lets dive in to the details.

Techstack I used for this project is;
* Kotlin programming language
* Kotlin script
* JSOUP library

