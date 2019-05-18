---
title:  "Asyn Method Invocation Design Pattern"
date:   2019-05-17 12:11:10 -0500
categories: kotlin
image: /assets/images/banners/async-method-invocation.png
description: "Instead of executing thread and managing its life cycle lets create an Async method invocation pattern which allows us to submit tasks and this pattern manages the threads and when execution completes it passes the result with a callback. This pattern frees up the main thread so it can continue to execute other tasks. This article explains the design and implementation of the Async method invocation design pattern."
---

Synchronous execution blocks the thread until the task gets executed, means thread need to wait before moving on to the next task. For example, in a car reservation app, if user interface gets frozen for every search, then it results in poor user experience. To overcome this problem, we can asynchronously execute tasks. The task is handed over to another thread so the main thread can work on other tasks; for example, we can show a progress bar or allow users to see partial results. 

In this article, we design and implement an **Asynchronous method invocation design pattern**. This pattern allows us to submit a task. This task gets executed in a new thread, and when the execution completes, then the result or exception if any are passed to a callback.

* Introduction
* Code
* Execute
* Conclusion
{:toc}

> This whole project is available in [Github](https://github.com/kpradeep12/myprojects/tree/master/design-patterns/src/main/java/net/thetechstack/concurrency/future)

### Introduction

Working on lower level thread programming is complex because it involves handling thread life-cycle and inter-thread communication with proper synchronization and also testing multi-thread code is cumbersome. To overcome these problems, we can use the Async method invocation design pattern. In this design pattern, we delegate our tasks to an Executor, and it is responsible for executing our task on a separate thread.

To implement this pattern, we are going to define two interfaces and two classes.

![]({{site.baseurl}}/assets/images/posts/2019/async-method-design-pattern-uml.jpg){: height="342px" width="1009px"}{: .align-center}

* **AsyncExecutor**: This interface contains a single method **submit** which takes a **Callable** and a **callback**. When callable completes its execution, then the result is provided by executing the passed callback. This callback is a BiConsumer, and it is a functional interface, and it accepts two values. First one is the result of the Callable and second is the Optional of Exception which might be caught while executing Callable.
* **AsyncResult**: This interface has single method **await()**. If in case main thread wants to wait until the execution completes then this method will block it. This method acts like **join()** on Thread. Once the AsyncExecutor completes its task then it releases the lock. CompletableResult class implements this interface.

Below picture shows how this pattern works.

![]({{site.baseurl}}/assets/images/posts/2019/async-method-flow.jpg){: height="435px" width="740px"}{: .align-center}

### Code

Below are the interface declarations.

{% highlight java %}
//AsyncExecutor.java

import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.function.BiConsumer;

public interface AsyncExecutor {
    <T> AsyncResult<T> submit(Callable<T> task, BiConsumer<T, Optional<Exception>> callback);
}

//AsyncResult.java

public interface AsyncResult<T> {
    void await() throws InterruptedException;
}
{% endhighlight %}

AsyncExecutor has **submit** method which takes _Callable<T>_ and _BiConsumer<T, Optional<Exception>>_ and returns AsyncResult. AsyncResult has **await** method, and it is a blocking method, means if the execution is still going on, then it blocks the caller until execution completes.

Lets implement these interfaces;

{% highlight java %}

public class ThreadAsyncExecutor implements AsyncExecutor {

    @Override
    public <T> AsyncResult<T> submit(Callable<T> task) {
        CompletableResult<T> result = new CompletableResult<>();
        new Thread(() -> {
            try {
                result.setValue(task.call());
            } catch (Exception exc) {
                result.setException(exc);
            }
        }).start();
        return result;
    }
    
}

{% endhighlight %}

ThreadAsyncExecutor implements **submit**. Within this method, we are creating a new instance of CompletableResult. This class implements AsyncResult interface, and it is an inner-class of ThreadAsyncExecutor. We see this class in the next snippet. The is inner-class because this class is used by only ThreadAsyncExecutor so no need to bloat package with extra classes.

We execute passed Callable in a new thread, then the result of the execution is injected to AsyncResult (CompletableResult) instance. If in case of an exception we need to notify the user, so we pass it to AsyncResult instance and finally returns AsyncResult instance.

Next lets implement AsyncExecutor interface.

{% highlight java %}
public class ThreadAsyncExecutor implements AsyncExecutor {

    @Override
    public <T> AsyncResult<T> submit(Callable<T> task, BiConsumer<T, Optional<Exception>> callback) {
        CompletableResult<T> result = new CompletableResult<>(callback);
        new Thread(() -> {
            try {
                result.setValue(task.call());
            } catch (Exception exc) {
                result.setException(exc);
            }
        }).start();
        return result;
    }
}
{% endhighlight %}

ThreadSyncExecutor implemented **submit** method of AsyncExecutor, and this method executes passed Callable in a new thread. _Result_ or _Exception_ of the Callable, is stored in CompletableResult. CompletableResult implements AsyncResult, and we see the code of this class in the next snippet. Finally, this method starts the thread and returns the instance of AsyncResult (CompletableResult).

Let's implement CompletableResult. Users will never directly use this class, so we declared it as an inner class of ThreadSyncExecutor.

{% highlight java %}
public class ThreadAsyncExecutor implements AsyncExecutor {

    @Override
    public <T> AsyncResult<T> submit(Callable<T> task, BiConsumer<T, Optional<Exception>> callback) {
        // ...
    }

    private class CompletableResult<T> implements AsyncResult<T> {
        private static final int RUNNING = 1;
        private static final int FAILED = 2;
        private static final int COMPLETED = 3;
        private volatile int state = RUNNING;  // <1>
        private final Object lock;
        private BiConsumer<T, Optional<Exception>> callback;

        CompletableResult(BiConsumer<T, Optional<Exception>> callback) {  // <2>
            lock = new Object();
            this.callback = callback;
        }

        private void setValue(T value) {  // <3>
            this.state = COMPLETED;
            callback.accept(value, Optional.empty());
            synchronized (lock) {
                lock.notifyAll();
            }
        }

        private void setException(Exception exception) {  // <4>
            this.state = FAILED;
            callback.accept(null, Optional.of(exception));
            synchronized (lock) {
                lock.notifyAll();
            }
        }

        public void await() throws InterruptedException {  // <5>
            synchronized (lock) {
                while (!isDone()) {
                    lock.wait();
                }
            }
        }

        private boolean isDone() {  // <6>
            return state > RUNNING;
        }
    }
}
{% endhighlight %}

**<1>** Instantiate all required variables to track the execution progress.
 * **state** field gets updated with different statuses based on the execution; it can be any of _RUNNING_, _FAILED_ and _COMPLETED_. Initially, it is in _RUNNING_. If any exception then it gets updated with FAILED, and if completes successfully then it gets updated with COMPLETED.
 * lock is used for the synchronization.
 * callback is a BiConsumer which is used after execution by passing result or exception.  
 
**<2>** New **object** instance is created to use it for synchronization and **callback** is stored for later use.  

**<3>** Once after the Callable execution completes, then its result is stored by calling setValue() and setValue updates the state to COMPLETED. Callback gets invoked with the result and because there is no exception, so exception will be empty. Lock on the object needs to be released because there might have been a thread waiting on the lock, then it gets released. **await()** method is the blocking method so some threads might have been waiting for the result so **setvalue()** method releases it.  

**<4>** In case of an exception, ThreadAsyncExecutor calls setException by passing the exception. **setException()** we update the value to FAILED and invokes callback with value as null and exception instance and then releases the lock on the object instance.  

**<5>** **await()** method contains synchronized block on the lock instance. It uses **isDone()** to check the status of the execution. If the execution is still in the RUNNING state, then it calls **wait()** on the lock object. Once the ThreadAsyncExecutor calls setValue or setException, then the lock gets released.  

**<6>** It returns the status of the execution. If the status is higher than RUNNING, then either execution of the Callable is complete, or it might have thrown an exception so in either case it is completed, so it returns true or else, it returns false.

### Execute

Lets submit some tasks to Async method and see how it behaves, below code will use ThreadAsyncExecutor.

{% highlight java %}
public class App {
    public static void main(String[] args) throws InterruptedException {
        AsyncExecutor executor = new ThreadAsyncExecutor();  // <1>

        System.out.println("-- Main thread started --");

        AsyncResult<Boolean> task1 = executor.submit(task(true, 3), (val, exc) -> {  // <2>
            System.out.println("Result of task1 -> " + val);
            exc.ifPresent(System.err::println);
        });
        task1.await();  // <3>

        AsyncResult<String> task2 = executor.submit(task("Hello", 5), (val, exc) -> {  // <4>
            System.out.println("Result of task2 -> " + val);
            exc.ifPresent(System.err::println);
        });

        AsyncResult<Integer> task3 = executor.submit(taskWithExeption(3, 2), (val, exc) -> {  // <5>
            System.out.println("Result of task3 -> " + val);
            exc.ifPresent(System.err::println);
        });

        System.out.println("-- Main thread complete --");
    }

    private static <T> Callable<T> task(T value, int seconds) {
        return () -> {
            try {
                TimeUnit.SECONDS.sleep(seconds);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return value;
        };
    }
    private static <T> Callable<T> taskWithExeption(T value, int seconds) {
        return () -> {
            try {
                TimeUnit.SECONDS.sleep(seconds);
                throw new Exception("execution failed");
            } catch (InterruptedException e) {
                throw e;
            }
        };
    }
}
{% endhighlight %}

Output of the code:
{% highlight bash %}
-- Main thread started --
Result of task1 -> true
-- Main thread complete --
Result of task3 -> null
java.lang.Exception: execution failed
Result of task2 -> Hello
{% endhighlight %}


**<1>** Created AsyncExecutor instance and then we are printing a message to show that main thread started execution.  

**<2>** Passed a Callable of type boolean which returns true after 3 seconds. Look at the implementation of task method, which returns the passed value after given seconds. Second argument is BiConsumer callback, after Callable execution, AsyncExecutor executes this callback. In this case, this callback gets value 'true,' and it gets executed after 3 seconds and finally printing the result to console.  

**<3>** Main thread gets blocked when it executes **await()** on task1 because it has a synchronized block which blocks the thread until the passed Callable gets executed.  

**<4>** Callable of type String which takes 5 seconds to execute.  

**<5>** Callable of type integer but this throws an exception after 2 seconds. task3 result is printed before task2 because task3 only takes 2 seconds while task2 takes 5 seconds. task2 prints the value and task3 prints the exception.

### Conclusion

We implemented the Async method invocation design pattern and tested by passing some Callable and callback instances. This pattern allows us to submit tasks, and the main thread can continue with other tasks without waiting for the result. Once the result is ready, then the result is passed back with a callback.