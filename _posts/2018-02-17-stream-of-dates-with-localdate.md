---
layout: post
title:  "Stream of dates with LocalDate"
date:   2018-02-17 09:30:24 -0500
categories: java
author: pradeep
featured: false
---

I want a list of all dates with starting range from Jan 15, 2018 to Feb 20, 2018. I can generate this list using the new ‘datesUntil’ method in LocalDate class. This method is introduced in Java 9 and I recently found out this method while browsing through Java API and quickly did some code experiments using JShell. I thought this is very useful method and wanted to share my experiments in this article.

Below is the definition of this method.
{% highlight java %}
public Stream<LocalDate> datesUntil​(LocalDate endExclusive)
{% endhighlight %}
This method returns stream of LocalDate objects so we can process these dates in a stream. To use this method we need fromDate and toDate so we can generate stream of LocalDate’s.

I fired up my JShell and executed below code snippets. JShell is a quick and best way to experiment small code snippets like below. I always love to use JShell for these type of experiments. I will also give some tips on JShell usage on the way while we do this experiment.

You need Java 9 to run JShell. Go to command prompt/terminal and execute ‘jshell’ command.
{% highlight bash%}
~ $ jshell
| Welcome to JShell -- Version 9.0.4
| For an introduction type: /help intro
jshell>
{% endhighlight%}
By Default java.time package is not imported in JShell so we need to import this package. (You can check all available imports by executing /imports in JShell)
{% highlight bash%}
jshell> import java.time.*
{% endhighlight %}
Create fromDate and toDate and stream using datesUntil method
{% highlight bash%}
jshell> LocalDate fromDate = LocalDate.of(2018,1,15)
fromDate ==> 2018-01-15
jshell> LocalDate toDate = LocalDate.of(2018,2,20)
toDate ==> 2018-02-20
jshell> Stream<LocalDate> dates = fromDate.datesUntil(toDate)
{% endhighlight %}
Now lets apply forEach to see all dates with in this range.
{% highlight bash%}
jshell> dates.forEach(System.out::println)
2018-01-15
2018-01-16
...
...
2018-02-18
2018-02-19
{% endhighlight %}
Nice, we got all dates with in the range. Note that toDate is not in the output because it is a endExclusive parameter. See the declaration of datesUntil method which I mentioned above. If you want to include toDate in the range then quick way to add a day is toDate.plusDays(1)

There is another overloaded ‘datesUntil’ method which is even more useful, it takes Period as second parameter. So we get stream with incremental steps.
{% highlight java%}
public Stream<LocalDate> datesUntil​(LocalDate endExclusive, Period step)
{% endhighlight %}
I will use same above fromDate and toDate to create another stream with weekly increments.
{% highlight bash%}
jshell> Stream<LocalDate> weekly = fromDate.datesUntil(toDate, Period.ofWeeks(1))
weekly ==> java.util.stream.LongPipeline$1@59494225
jshell> weekly.forEach(System.out::println)
2018-01-15
2018-01-22
2018-01-29
2018-02-05
2018-02-12
2018-02-19
{% endhighlight %}
Nice, we got dates on weekly intervals. We can apply some functions on these streams and can do lot more interesting stuff like creating continues events for the calendar or scheduling jobs and many more…

Note: Once a stream is executed then you can not reuse it. If I execute above code again then I get IllegalStateException
{% highlight bash%}
jshell> weekly.forEach(System.out::println)
| java.lang.IllegalStateException thrown: stream has already been operated upon or closed
{% endhighlight %}
One quick way to fix this is to declare a supplier and reuse it every time. I learnt this tip from Baeldung blog. [Here](http://www.baeldung.com/java-stream-operated-upon-or-closed-exception) is the more information on this tip.
