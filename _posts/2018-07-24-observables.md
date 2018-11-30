---
layout: post
title:  "8 Quick Ways To Create Observables"
date:   2018-07-24 12:11:10 -0500
categories: reactiveX
author: pradeep
image: /assets/images/banners/reactiveX-observables.png
featured: false
---

Many operators are available in RxJava to create observables. In this post I will go through each of them with examples. In the context of reactive programming, operator is nothing but a function which performs some operation, there are many types of operators available like creation, transforming, filtering, error handling, combining and many more. Lets go with each static create operator supported by RxJava.

## Interval

Generate’s sequence of numbers starting from 0 with some delay. Code shown below will wait for two seconds before generating numbers and then for each generated number it takes one second. 

{% highlight java %}
Observable.interval(2, 1, TimeUnit.SECONDS)
        .subscribe(value -> System.out.printf(" %d ", value)); // <1>

Thread.sleep(10000); // <2>

//Output: 0  1  2  3  4  5  6  7  8
{% endhighlight %}
<1> Subscriber prints the values to console.  
<2> Note that subscriber listens for the values in a different thread. If the main thread completes its execution then the program terminates so to we are making main thread to sleep for 10 seconds. Mean while subscriber prints nine values.

## Just

This operator generates the values which are passed as arguments.

{% highlight java %}
Observable.just(3, 5, 7, 9) // <1>
        .subscribe(value -> System.out.printf(" %d ", value),
                        error -> System.out.println("error"),
                        () -> System.out.println("completed")); // <2>

Thread.sleep(1000);

//output:  3  5  7  9 completed
{% endhighlight %}
<1> There are many just methods which can handle up to ten parameters. In this example it takes four parameters.  
<2> subscribe method takes three parameters method which takes:
  * Consumer, to process value
  * Consumer, to process error notification
  * Action, to process complete notification

## From

This operator can generate values from difference sources like array, collections, iterable, callable and futures.

{% highlight java %}
Observable.fromArray(3,4,5) // <1>
        .subscribe(value -> System.out.printf(" %d ", value));

System.out.println();

Observable.fromIterable(Arrays.asList(1,2,3)) // <2>
        .subscribe(value -> System.out.printf(" %d ", value));

System.out.println();

Observable.fromCallable(() -> 1)
        .subscribe(value -> System.out.printf(" %d ", value));

System.out.println();

ExecutorService executor = Executors.newSingleThreadExecutor();
Observable.fromFuture(executor.submit(() -> Thread.currentThread().getName()))
        .subscribe(value -> System.out.printf(" %s ",value));

Thread.sleep(1000);
//output:  
// 3  4  5 
// 1  2  3 
// 1 
// pool-1-thread-1
{% endhighlight %}

<1> fromArray take variable arguments.  
<2> fromIterable takes any Iterable collection, here I passed List.

## Timer

Generate zero after specified delay.

{% highlight java %}
Observable.timer(500, TimeUnit.MILLISECONDS)
        .subscribe(value -> {System.out.printf(" %d ", value);});

        Thread.sleep(1000);
//output: 0
{% endhighlight %}

## Empty / Never / Error

Empty does not emit any value and terminates normally.

{% highlight java %}
Observable.empty()
                .subscribe(value -> System.out.println(value),
                        error -> System.out.println(error),
                        () -> System.out.println("completed"));

//Output:completed
{% endhighlight %}

Never will not emit any value and does not terminate.

{% highlight java %}
Observable.never()
                .subscribe(value -> System.out.println(value),
                        error -> System.out.println(error),
                        () -> System.out.println("completed"));

//Output:
{% endhighlight %}

Throw does not emit any values but terminates with an error.

{% highlight java %}
Observable.error(new Throwable("Error!"))
                .subscribe(value -> System.out.println(value),
                        error -> System.out.println(error),
                        () -> System.out.println("completed"));

//Output: java.lang.Throwable: Error!
{% endhighlight %}

## Range

Emits range of sequence numbers. Below code generates 5 numbers starting from 10.

{% highlight java %}
Observable.range(10,5)
            .subscribe(value -> {System.out.printf(" %d ", value);});

//Output:  10  11  12  13  14
{% endhighlight %}

## Conclusion

We went through different operators to generate values for the subscribers.