---
layout: post
title:  "Generate stream of random numbers"
date:   2018-03-03 10:28:40 -0500
categories: java
author: pradeep
featured: false
---

Its not possible for any computer to generate real random numbers, but they can generate pseudorandom numbers. Pseudorandom numbers are generated based on an algorithm and they are nearly like random numbers. Java’s Random class uses ![linear congruential formula](https://en.wikipedia.org/wiki/File:Linear_congruential_generator_visualisation.svg) to generate pseudorandom numbers and this formula needs initial value or called seed.

Random class have two constructors:

* Random(): No need to provide seed so if you create multiple Random objects, then all of them will likely generate different pseudorandom number sequence.

* Random(long seed): Takes seed as initial value. This will be useful if you want to regenerate same sequence again.

I will use JShell for demo because we are just working on Random class so it will be easier. so lets start JShell and create Random object.

{% highlight bash %}
~ $ jshell
| Welcome to JShell -- Version 9.0.4
| For an introduction type: /help intro
jshell>Random r = new Random();
{% endhighlight %}

ints() method in the Random class will return unlimited stream of pseudorandom numbers. We can limit this stream by calling limit method on the stream like below:

{% highlight bash %}
jshell> r.ints().limit(5).forEach(System.out::println)
1203929932
794148605
836555594
-471647802
-1519876495
{% endhighlight %}

I used terminal operation ‘forEach’ at the end to show the output. We can make this code shorter by using ints(long streamSize) method in the Random class. This will generate limited IntStream;

{% highlight bash %}
jshell> r.ints(5).forEach(System.out::println)
1748811776
-1321337966
-182556431
-1551712685
204483208
{% endhighlight %}

We can generate numbers with in a range by calling ‘ints​(long streamSize, int randomNumberOrigin, int randomNumberBound)’ method in Random;

{% highlight bash %}
jshell> r.ints(5,1,10).forEach(System.out::println)
8
6
9
3
8
{% endhighlight %}

All of the above methods are available in long and double versions also, so those methods return LongStream and DoubleStream. Instead of printing it to console we can collect them into a list easily using Collectors, like below;

{% highlight bash %}
jshell> r.ints(5,1,10).mapToObj(Integer::valueOf).collect(Collectors.toList())
$12 ==> [5, 1, 7, 4, 6]
{% endhighlight %}
