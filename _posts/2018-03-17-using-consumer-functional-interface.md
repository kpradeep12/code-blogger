---
title:  "Using consumer functional interface"
date:   2018-03-17 08:12:40 -0500
categories: java
---

This article will explain the basics of using consumer functional interface. Consume is one of the many available functional interfaces in Java. This interface can be used when we need to take an object and process it but with out returning anything. Below image will show you how it looks in a logical way.

![Consumer Function](/assets/images/posts/consumer.png){: height="130px" width="280px"}{: .align-center}

As you see in the above image, it takes a value and operates on it with a side-effect. Here side-effect means, some thing like printing to console or logging to file or making call to rest service but without returning any value. This interface have single abstract method, which is ‘**void accept(T t)**‘ As you can see this method takes a value but does not return anything.

Using these functional interfaces will make code standardized and code will become easier to understand. We can implement them as lambda expressions and can be used across application by passing them as behaviors. Below are two different examples; first example is with out consumer and second example uses consumer.

{% highlight java %}
public static void processJobs(List<Job> jobs){
        for(Job job: jobs){
            job.process();
            System.out.println(job.getId());
        }
}
{% endhighlight %}

{% highlight java %}
public static void processJobs(List<Job> jobs, Consumer<Integer> postProcess){
        for(Job job: jobs){
            job.process();
            postProcess.accept(job.getId());
        }
}
{% endhighlight %}

The advantage with the second method is, I can later change postProcess behavior with out changing code in processJobs function. If I have multiple variations of prints which need to be printed based on different situations then I can pass a different consumer lambdas to it. Below example shows how I passed consumer to processJobs function.

{% highlight java %}
List<Job> jobs = List.of(new Job(2), new Job(4), new Job(5));
Consumer<Integer> print = (i) -> {
            System.out.println(i);
        };
processJobs(jobs, print);
{% endhighlight %}

If you want to start using consumer then one of the best place to start is using forEach method in collections. This function takes consumer.Check below example;

{% highlight java %}
jobs.forEach(job -> {
            System.out.println(job.getId());
        });
{% endhighlight %}

### Composed consumer
Consumer functional interface have a default method which is:

**default Consumer\<T> andThen​(Consumer<? super T> after)**
{: .text-center}

This method takes and returns a consumer and as the signature specifies; this is a default method, means this method is implemented by Consumer with default implementation, so we no need to implement this method and we can directly call this on any consumer instance.

This method returns a composed consumer means, sequentially it calls accept on ‘this’ instance and then on ‘after’ instance. Along with printing job id If I also want to send an email alert, then I can call processJobs like below

{% highlight java %}
Consumer<Integer> print = (i) -> {
            System.out.println(i);
        };
Consumer<Integer> emailAlert = (i) -> {
            System.out.printf("Sending email for job id: %d \n", i);
        };
processJobs(jobs, print.andThen(emailAlert));
{% endhighlight %}

There will be no code change required in processJobs function because we composed multiple consumers into single consumer and passed to it. You can compose by chaining as many as into single consumer.

### Primitive Consumers
There are three primitive consumers available in java.util.functional package; IntConsumer, LongConsumer and DoubleConsumer. If you are operating on primitive values then use these primitive versions, because objects are expensive comparing to primitives.

### BiConsumer
BiConsumer is same like Consumer except it takes two parameters. Below is the logical representation of it.

![BiConsumer Function](/assets/images/posts/biconsumer.png){: height="130px" width="280px"}{: .align-center}

This interface will be handy if in case you need to consume two parameters and also it allows you to compose multiple BiConsumers. There are primitive versions of this interface; which are **ObjIntConsumer, ObjLongConsumer** and **ObjDoubleConsumer**, all these interfaces takes object as first parameter and primitive value as second parameter.