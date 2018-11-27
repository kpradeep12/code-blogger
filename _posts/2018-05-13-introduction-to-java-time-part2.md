---
title:  "Introduction to java.time - Part 2"
date:   2018-05-13 12:11:10 -0500
categories: java
header:
  teaser: /assets/images/banners/blog-banner-intro-to-java-time-part2.png
---

**[Part 1](/java/2018/04/18/introduction-to-java-time-part1.html)** of this series explained the basic time related classes in java.time package and different approaches to create them. In this post we will see how to retrieve time values from these classes.

Once the date and time objects are created, we can get information from it using various getter methods. Below code shows some examples of the LocalDate.

{% highlight java %}
LocalDate todayDate = LocalDate.now();
todayDate.getYear(); //returns year as int
todayDate.getMonth().getValue(); //returns Month object
todayDate.getDayOfMonth(); //returns day as int
{% endhighlight %}

LocaTime contains getters to get hour, minute and seconds. LocalDateTime and ZonedDateTime contains the getters to get year, month, day, hour, minute and seconds. ZonedDateTime also supports getters to get zone information. Instant class contains getters to get epoch seconds or nanoseconds information. Below are more examples of getters using different classes.

{% highlight java %}
LocalTime.now().getHour(); //returns hour
LocalDateTime.now().getSecond(); //returns seconds
ZonedDateTime.now().getZone(); //returns zoneid
Instant.now().getEpochSecond(); //returns epoch second
{% endhighlight %}

Along with the specific getter methods, all of the above classes also supports a generic get method. This method accepts a TemporalField instance. Temporal field represents the date and time property, it can be anything like hour, day, year, month and so on. For example, if we need to get year from the LocalDate then we can pass TemporalField which represents the year. TemporalField is the interface but we no need to implement it because by default the constants in the Enum ChronoField implemented this interface so we can directly use them. In below example I used various ChronoField's.

{% highlight java %}
LocalDate.now().get(ChronoField.YEAR);
LocalTime.now().get(ChronoField.CLOCK_HOUR_OF_DAY);
LocalDateTime.now().get(ChronoField.AMPM_OF_DAY); 
ZonedDateTime.now().get(ChronoField.MINUTE_OF_HOUR);
Instant.now().get(ChronoField.MILLI_OF_SECOND);
{% endhighlight %}

Be cautious when passing the ChronoField's to the get method because LocalDate can not return hour if you pass ChronoField.HOUR_OF_DAY to it, because it only supports year, month and day. Compilation will succeed but at runtime we will get UnsupportedTemporalTypeException, means the passed field is not supported by the class. At runtime we can use isSupported method to verify if the temporal field is supported or not. Go through documentation of isSupported method to see the list of all supported temporal fields.

## Conclusion
In this post we went through the getter methods and TemporalField to access time fields.