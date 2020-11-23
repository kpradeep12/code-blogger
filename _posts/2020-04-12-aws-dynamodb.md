---
title: "AWS DynamoDB With Spring"
date: 2020-04-12 12:11:10 -0500
categories: java
image: /assets/images/banners/intro-to-eclipse-vertx.png
description: ""
published: false
---

Vert.x provides us utilities to develop event-based, non-blocking applications. Means, we receive notifications when some event happens, and instead of waiting on any blocked operation, we provide a handler. This handler gets executed after the operation is complete. How Vert.x accomplishes this? with the use event-loops.

This article assumes that the reader has prior knowledge of the event-loop because it is a separate topic and not covered in this article. One of the advantages of event-loop is, a single thread can handle multiple tasks; for example, Node.js internally uses event-loop. Event-loop architecture is also called Reactive.

Threads are expensive to create; they consume resources and takes time for initialization. Assume we have a thread that performs a database operation, which is a blocked operation and takes some milliseconds or seconds to complete. Meanwhile, a thread is just waiting on it, and doing nothing, means we are wasting computing resources. Since Vert.x uses event-loop architecture, so instead of waiting on a blocked operation, threads get assigned to the next pending operation in the queue.

Vert.x is not just reactive; it is also multi-reactive. Means Vert.x spins multiple event-loops instead of single, and runs them on each processor core, whereas Node.js runs on a single event-loop. The advantage of having multiple event-loops are resource utilization, means running more number of pending operations on multiple cores.

Vert.x provides simple API, using which we can interact with Vert.x and run our application on reactive architecture. Let's work on some coding examples.

### Hello Vert.x

Import 'vertx-core' in your project.

{% highlight xml %}
<dependency>
 <groupId>io.vertx</groupId>
 <artifactId>vertx-core</artifactId>
 <version>3.9.0</version>
</dependency>
{% endhighlight %}

Once the **vertx-core** is imported, then create Vert.x instance in the **main** method.

{% highlight java %}
Vertx vertx = Vertx.vertx();
{% endhighlight %}

Above line creates Vert.x instance, which can be used to interact with the Vert.x. On initialization, Vert.x creates event-loops, and they are ready to accept operations/handlers. Handlers are nothing but a set of instructions.

Remember this rule while working with Vert.x; **Don't call Vert.x, Vert.x will call you**. Means we need to provide a handler to Vert.x, and Vert.x will call this handler once an event gets generated. Let's say we want to execute a handler for every second;

{% highlight java %}
vertx.setPeriodic(1000, id -> {
    System.out.println("hello Vert.x!");
});
{% endhighlight %}

We called _setPeriodic_ on _vertx_. This method takes two parameters, time in milliseconds and a handler. As I mentioned earlier, a handler is a set of instructions. Here, in this case, handler prints 'hello Vert.x!'. An event gets generated every second, and Vert.x executes the provided handler. On the console, you should see the message 'hello Vert.x!' printed in a new line for every second. setPeriod is a non-block method, so execution continues to the next line.

### Verticles

Organize your code as Verticles and deploy them on Vert.x. It is not necessary to organize code as Verticles, but it is a simple, scalable, and concurrent model out of the box that you can use to save time. Multiple instances of verticles can be deployed on a single Vert.x instance, and they all can communicate on the event bus.

In the below code, I created a Verticle and deployed.

{% highlight java %}
public class HelloVertx {
    public static void main(String[] args) throws InterruptedException {
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new MyVerticle());
    }
    static class MyVerticle extends AbstractVerticle {
        @Override
        public void start(Promise<Void> startPromise) throws Exception {
            System.out.println("in start");
        }
    }
}
// output
in start
{% endhighlight %}

MyVerticle extends AbstractVerticle and overrides its start method, and this method gets called on the initialization of Verticle. We passed MyVerticle instance to 'deployVerticle', and this gives a chance to Vert.x to manage the given Verticle. For example, we can write Verticles to initiate an HTTP server, database connection, or messaging, and what ever your application demands.

### How Verticles communicate

In the earlier section, we saw how to deploy Verticles. As we already know that Verticles are an independent and scalable unit of code. If we have multiple Verticles, then how can they all communicate?

Every Vert.x instance comes with its event bus instances. Intercommunication between different application components happens with the event bus. Event bus has a straightforward API, its simple to use. It supports various kinds of messaging; publish/subscribe, point-to-point, and request-response.

Let's create an event bus and register a handler to consume a message.

{% highlight java %}
Vertx vertx = Vertx.vertx();
EventBus eventBus = vertx.eventBus();
eventBus.consumer("hello.vertx", message -> {
    System.out.println("Received message: " + message.body());
});
{% endhighlight %}

_eventBus()_ method on Vert.x instance returns the instance of an event bus associated with it, and we called consumer method on it, which accepts two parameters; address, on which consumer should listen and message handler, this is the message received on this address.

Same way in the below code, we publish a message.

{% highlight java %}
eventBus.publish("hello.vertx", "Something happened!");
{% endhighlight %}

You can think of an event bus as a bridge between different components in the application.

### Conclusion

In this article, we went through some basics of Vert.x library using some simple examples. Vert.x provides an extensive set of utilities, and please go through the Vert.x documentation for the details.