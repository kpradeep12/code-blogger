---
layout: post
title:  "Infinite streams"
date:   2018-04-08 18:01:10 -0500
categories: java
image: /assets/images/banners/blog-banner-infinite-streams.png
author: pradeep
featured: false
---

Streams allows us to generate endless progression of discrete objects. There are couple of methods available in Java which will help us to generate infinite sequences.

### With streams
There are four main stream interfaces in java.util.stream package; Stream, IntStream, LongStream and DoubleStream. All of these interfaces have a common method called iterate, which will generate infinite objects. I am using IntStream as an example in this article but these examples are also applicable for other stream interfaces.

**[static IntStream iterate​(int seed, IntUnaryOperator f)](https://docs.oracle.com/javase/9/docs/api/java/util/stream/IntStream.html#iterate-int-java.util.function.IntUnaryOperator-)**

This method generates infinite sequence of integers based on the provided unary operator. Unary operator is one of the functional interface which takes single parameter and returns same type of result. Iterate in IntStream expects IntUnaryOperator so it always takes and returns integer. We can implement unary operator to generate customizable sequence. Input to this unary operator is always its previous returned result but for first execution it gets the seed from the first parameter. If f is an unary operator then it generates sequence like {seed, f(seed), f(f(seed)), f(f(f(seed))) … }

Below code starts from 0 and continues to generate numbers by incrementing two.We can customize the lambda expression to generate different type of sequences. I added a limit on the sequence else the code continues to execute indefinitely.

{% highlight java %}
IntStream.iterate(0, (i) -> i+2)
	.limit(100)
        .forEach(System.out::println);
{% endhighlight %}

We can also use ‘generate’ method which takes the supplier as parameter. This method can be used to generate constant or random numbers. Supplier is a functional interface which will not take any input so it will not depend on its previous state.

**[static IntStream generate​(IntSupplier s)](https://docs.oracle.com/javase/9/docs/api/java/util/stream/IntStream.html#generate-java.util.function.IntSupplier-)**

### With Random class
Random class provides some utility methods to generate infinite random numbers in the form of integers, longs or doubles. In below example I used ints method, which takes inclusive start and exclusive end range.

{% highlight java %}
Random r = new Random(120);
r.ints(10, 30)
   .limit(100)
   .forEach(System.out::println);
{% endhighlight %}