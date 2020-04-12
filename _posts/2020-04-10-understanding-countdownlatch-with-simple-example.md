---
title: "Understanding CountDownLatch With Simple Example"
date: 2020-04-10 12:11:10 -0500
categories: java
image: /assets/images/banners/understanding-countdownlatch-with-simple-example.png
description: "CountDownLatch is a simple utility, which we can use to wait for multiple threads to complete their job, till then CountDownLatch will block the thread. In this article, we will compare two examples, one without and the other with CountDownLatch. This comparison will help in understanding how CountDownLatch will work."
published: false
---

We use Threads to run multiple tasks in parallel. We usually create a thread, start them, and at a later point in the application, we wait for the thread to join back. Below is the simple example which shows how it works.

{% highlight java %}
import java.util.concurrent.TimeUnit;

public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread one = new Task("one", 1);
        Thread two = new Task("two", 5);
        Thread three = new Task("three", 3);

        one.start();
        two.start();
        three.start();

        one.join();
        two.join();
        three.join();

        System.out.println("All workers joined");
    }
    static class Task extends Thread {
        int delay;
        Task(String name, int delay) {
            setName(name);
            this.delay = delay;
        }

        @Override
        public void run() {
            try {
                TimeUnit.SECONDS.sleep(delay);
                System.out.println(getName() + " finished");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

//OUTPUT
one finished
three finished
two finished
All workers joined

{% endhighlight %}

We created three instances of Task (which extends thread), then started them and then finally called join() on each thread. We called join() on each thread because we want to make sure that all child threads are completed execution before main Thread exits. The run() method in the Task is just blocking the thread for a couple of seconds to mimic a long-running job. After the sleep, it prints its name in the console.

This simple example works fine for a small number of threads, but what if, if we want to create more threads and wait for all of them to join()? Like for example, ten threads or maybe a hundred threads? The approach, as mentioned earlier, is not suitable for more threads because we need to declare and maintain multiple Thread instances. CountDownLatch will rescue us from this problem.

### CountDownLatch

We will initialize a CountDownLatch object with a count; this count should be equal to the number of Threads. Means if we want to run ten Threads and wait for all of them to finish, then we will initialize CountDownLatch with ten. The below example shows the initialization of CountDownLatch with three because we want to start and wait for three threads.


{% highlight java %}
CountDownLatch countDownLatch = new CountDownLatch(3);
{% endhighlight %}

CountDownLatch works like a counter, and we need to pass the instance of CountDownLatch to each thread. When each thread completes its job, then they need to count this counter down by calling countDown() on CountDownLatch. By the time all threads complete their tasks, then this counter will be zero. The below code shows how it works; this time, I used ExecutorService to run threads because this way, I no need to create Thread instances.

{% highlight java %}
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class CountDownLatchDemo {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch countDownLatch = new CountDownLatch(3);
        ExecutorService service = Executors.newFixedThreadPool(3);

        service.submit(new Task("one", 1, countDownLatch));
        service.submit(new Task("two", 5, countDownLatch));
        service.submit(new Task("three", 3, countDownLatch));

        countDownLatch.await();
        service.shutdown();
        System.out.println("All workers joined");

    }
    static class Task extends Thread {
        int delay;
        CountDownLatch countDownLatch;
        Task(String name, int delay, CountDownLatch countDownLatch) {
            setName(name);
            this.delay = delay;
            this.countDownLatch = countDownLatch;
        }

        @Override
        public void run() {
            try {
                TimeUnit.SECONDS.sleep(delay);
                System.out.println(getName() + " finished");
                this.countDownLatch.countDown();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

//OUTPUT
one finished
three finished
two finished
All workers joined

{% endhighlight %}

We passed CountDownLatch to each Thread, and within the run() method, we called countDownLatch.countDown() to decrement the counter.

countDownLatch.await() causes the current thread to wait until the latch has counted down to zero. Finally, we are shutting down ExecutorService and printing a message to console.

What if a thread doesn't count down? Then the main thread waits indefinitely. To fix this, we can use await(long timeout, TimeUnit unit), which waits for a specific time and returns boolean, this boolean tells us if all threads ran successfully or not.

{% highlight java %}
boolean result = countDownLatch.await(6, TimeUnit.SECONDS);
service.shutdown();
System.out.println("All workers job status " + result);
{% endhighlight %}

### Conclusion

In this article, we learned about CountDownLatch and went through different examples to understand how it works.
