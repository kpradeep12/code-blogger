---
title:  "Fixed Thread Pool using Executor framework"
date:   2018-03-10 19:49:40 -0500
categories: java
---

In this article we are looking at the Fixed thread pool implementation. This thread pool creates a fixed number of threads and reuses them as the tasks are completed and because the threads are reused so once after reaching the thread pool limit then there will not be any thread creations involved. This pool will be helpful when we want to execute long running threads. For example we can use this pool in running batch jobs or accepting HTTP client requests and so on.

![Fixed thread pool](/assets/images/posts/Fixed-thread-pool.png){: height="130px" width="490px"}{: .align-center}

In the above figure, producer inserts tasks into the queue, queue contains the tasks which are ready to be executed and the pool contains the running tasks. With fixed thread pool of size two, not more than two threads can execute at any time. Threads will be reused once after the current running tasks are completed, so there will not be thread creation overhead involved after completing every task. Fixed thread pool will consume less resources because they will control the number of simultaneous thread executions.

{% highlight java%}
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
 
public class FixedThreadExecutor {
 
    public static void main(String args[]){
        
        ExecutorService executor = Executors.newFixedThreadPool(2);
        
        Runnable r = () -> {
            try {
                System.out.printf("Processing %s\n", Thread.currentThread().getName());
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        };
 
        executor.execute(r);
        executor.execute(r);
        executor.execute(r);
        executor.execute(r);
        executor.execute(r);
        executor.execute(r);
 
        executor.shutdown();
    }
}
{% endhighlight %}

In above class, I created fixed thread pool of size two, so not more than two threads execute simultaneously. I created a runnable, which just prints the thread name and sleeps for three seconds. I passed this runnable instance six times, to the executer and finally shutting down the executor. We need to shutdown the executor after the use, else it will continue to execute or wait for the next thread.

Below is the output you see for the first three seconds.

{% highlight bash %}
Processing pool-1-thread-1
Processing pool-1-thread-2
{% endhighlight %}

Threads in the executor will have default names and it is printed in the above output, this thread names are having pool number and a thread number. As per the output two threads are executing in a single pool because the pool number is one for both the threads and each thread will take three seconds to execute and both of them are running simultaneously. Below is the full output of this class.

{% highlight bash %}
Processing pool-1-thread-1
Processing pool-1-thread-2
Processing pool-1-thread-1
Processing pool-1-thread-2
Processing pool-1-thread-2
Processing pool-1-thread-1
{% endhighlight %}

‘pool-1-thread-1’ is printed three times and ‘pool-2-thread-2’ is printed three times because two threads in the pool shared the six tasks, so each thread got three  tasks.

You can continue to experiment by creating another runnable and making it to sleep longer or shorter and then pass it to the executers so you can see how threads are allocated with in the pool.
