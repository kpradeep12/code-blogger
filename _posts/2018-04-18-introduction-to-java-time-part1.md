---
layout: post
title:  "Introduction to java.time - Part 1"
date:   2018-04-18 12:11:10 -0500
categories: java
image: /assets/images/banners/blog-banner-intro-to-java-time-part1.png
author: pradeep
featured: false
---

This article will provide introduction to the java.time package. This package is introduced in Java 8 version and it contains many classes and interfaces to represent and process dates and times. Below are the five most basic classes you need to know in this package.

**LocalDate:** a date without a time. You can store year, month and day. If you want to work on only dates with out any time information, then this is the class. For example, you can store birthday dates.

**LocalTime:** a time without a date and time-zone. You can store hour, minutes and seconds. Stop-watch is the example, where only hours, minutes and seconds are needed.

**LocalDateTime:** a date and time with out time-zone. This class can represent all date and time fields like year, month, day, hour, minute and second. Date and time of the local foot ball match can be saved in this instance.

**ZonedDateTime:** a date, time and time-zone. Meeting invite in a calendar may require all these fields. It becomes complex to process time with zone information so its better to use this class only if required.

**Instant:** a timestamp. This is the long number represents epoch-seconds. For example, a network ping application needs epoch seconds to calculate the timing of the network packets.

All classes in java.time package are thread-safe and all are immutable. Every change to the object results in the new instance of it. This package uses a consistent method prefixes for all standard operations and which made this API to understand easily.

### Creating new instance
Use static method now(), to create the instances based on the current time, this method creates instance based on the system clock. In the below example, I created instances using now().

{% highlight java %}
LocalDate date = LocalDate.now();
LocalTime time = LocalTime.now();
LocalDateTime dateTime = LocalDateTime.now();
ZonedDateTime zonedDateTime = ZonedDateTime.now();
Instant instant = Instant.now();
{% endhighlight %}

If you want to create instance based on particular time, then use static method of(). Methods with prefix ‘of’ will create instance based on the provided arguments.

{% highlight java %}
public static LocalDate of​(int year, int month, int dayOfMonth)
public static LocalTime of​(int hour,  int minute, int second)
public static LocalDateTime of​(int year, int month, int dayOfMonth, int hour, int minute, int second)
public static ZonedDateTime of​(LocalDateTime localDateTime, ZoneId zone)
public static Instant ofEpochSecond​(long epochSecond)
{% endhighlight %}

There are other overloaded methods for ‘of’ and ‘now’, read the documentation for all available methods. If you want to create instances based on the string then you can use parse method. Parse method takes CharSequence and returns time object. Below example creates LocalDate based on the string.

{% highlight java %}
LocalDate date = LocalDate.parse("2018-01-01");
{% endhighlight %}

Note that we need to pass string in ISO format. This method throws DateTimeParseException if you pass different format. ISO formats are the standard, when you want to parse any string then check if the string is a ISO format, if it is, then you can pass it to parse method directly. Below are the list of parse methods in all the classes.

{% highlight java %}
// accepts ISO_LOCAL_DATE ex: '2011-12-03'
public static LocalDate parse​(CharSequence text)
 
// accepts ISO_LOCAL_TIME ex: '10:15:30'
public static LocalTime parse​(CharSequence text) 
 
// accepts ISO_LOCAL_DATE_TIME ex: '2011-12-03T10:15:30'
public static LocalDateTime parse​(CharSequence text) 
 
//accepts ISO_ZONED_DATE_TIME ex: '2011-12-03T10:15:30+01:00[Europe/Paris]'
public static ZonedDateTime parse​(CharSequence text) 
 
//accepts ISO_INSTANT ex: '2011-12-03T10:15:30Z'
public static Instant parse​(CharSequence text)
{% endhighlight %}

Some times we need to parse different format then we can use another version of the parse method which also takes DateTimeFormatter.

{% highlight java %}
LocalDate.parse("1 Jan 2018", DateTimeFormatter.ofPattern("d MMM uuuu"));
{% endhighlight %}

Above example shows the basic usage of parsing with DateTimeFormatter. In this article I am not providing much information on DateTimeFormatter because it is a huge class with lot of methods.

### Conclusion
This article provided information about the basic classes in java.time package and the different ways to create there instances. Go through the **[second part]({{site.baseurl}}/introduction-to-java-time-part2/)** of this post to learn about accessing time fields.