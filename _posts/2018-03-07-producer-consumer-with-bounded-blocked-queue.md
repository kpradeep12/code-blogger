---
title:  "Producer and Consumer with Bounded Blocked Queue"
date:   2018-03-07 14:08:40 -0500
categories: java
---

Producer and consumers are two independent entities works together on the  queue. Producer inserts elements into the tail of the queue  and consumer removes them from the head of the queue. Here elements can be tasks or data on which consumer is interested in. This design pattern will allow producer and consumer to work independently.

![Producer consumer](/assets/images/posts/producer-consumer.png){: height="150px" width="800px"}{: .align-center}

Queue allows data to be inserted in FIFO order. FIFO is ‘First In First Out’, in which longest waiting element will be removed first and shorted waiting element will be removed last. Queue acts as a communication channel between Producer and Consumer.

Producer and consumer will work on single queue instance and there can be multiple producers or consumers attached to this single instance. The rate of insertion and deletion from the queue will depends on the processing power of the producer and consumer. Producer and consumers works on there own pace with out depending on each other but faster producer can make queue size grow larger and which can result in a out of memory error.

To control the size of the queue we can use BlockedQueue interface. There are various implementation available for this interface and in this article I am using ArrayBlockingQueue class. BlockedQueue can be bounded or unbounded. In bounded, queue size is limited and where as in unbounded, there will be no limit.

The advantage of BlockedQueue is, if queue is full then it blocks the producer and it releases only when space is available and if queue is empty then it blocks the consumer and releases only when element is available. For example if we have a faster producer and slower consumer working on a blocked queue of five size; it blocks the producer if queue reaches its limit such than, it can not insert more elements into the queue. This arrangement will make producer and consumer work smoothly with out breaking the application.

{% highlight java %}
import java.util.Random;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ThreadLocalRandom;
 
public class ProcuderConsumer {
 
    public static void main(String args[]) throws InterruptedException {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);
 
        Runnable producer = () -> {
            while (true) {
                int jobId = getNewJobId();
                try {
                    Thread.sleep(getInterval(0, 1));
                    queue.put(jobId);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.printf("Producer: pushed new job '%d' into queue:%s \n", jobId, queue);
            }
        };
 
        Runnable consumer = () -> {
            while (true) {
                try {
                    int jobId = queue.take();
                    System.out.printf("Consumer: processing job '%d'\n", jobId);
                    Thread.sleep(getInterval(3, 6));
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
 
            }
 
        };
 
        new Thread(producer).start();
        new Thread(consumer).start();
    }
 
 
    //Randomly generates job id numbers between 1 to 10
    public static int getNewJobId() {
        Random r = new Random();
        return r.nextInt(10);
    }
 
    static int[] intervals = {1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000};
    //Randomly returns one of the value from intervals[] based on provided min and max indexes
    public static int getInterval(int min, int max) {
        ThreadLocalRandom r = ThreadLocalRandom.current();
        int index = r.nextInt((max - min) + 1) + min;
        return intervals[index];
    }
}
{% endhighlight %}

Above example lets us to configure speed of the producer and consumer. Producer inserts random job ids into the queue by calling getNewJobId() method and consumer removes job ids from the queue to process them.

To simulate the processing time, I am calling getInterval method at producer and consumer side. This method will return random milliseconds from intervals[] array. intervals array contains 10 millisecond intervals. getInterval takes min and max index and randomly selects one of the index with in the given range and returns the value of that index from intervals array. Processing time of creating and working on jobs can vary based on various factors like database calls, REST calls and for every job it can be different so using this method we can simulate this processing time.

### Fast producer and slow consumer
Producer takes 1 to 2 seconds to generates random job ids and consumer takes 4 to 7 seconds to process. So we have faster producer and slower consumer. Run this example and after some time you will see queue reaches its limit and producer gets blocked and can not insert new element until consumer removes one, but both will continue to work on there own pace.

{% highlight bash %}
Producer: pushed new job '5' into queue:[] 
Consumer: processing job '5'
Producer: pushed new job '4' into queue:[4] 
Producer: pushed new job '5' into queue:[4, 5] 
Producer: pushed new job '4' into queue:[4, 5, 4] 
Consumer: processing job '4'
Producer: pushed new job '4' into queue:[5, 4, 4] 
Producer: pushed new job '3' into queue:[5, 4, 4, 3] 
Producer: pushed new job '5' into queue:[5, 4, 4, 3, 5] 
Consumer: processing job '5'
Producer: pushed new job '0' into queue:[4, 4, 3, 5, 0] 
Consumer: processing job '4'
Producer: pushed new job '8' into queue:[4, 3, 5, 0, 8] 
Consumer: processing job '4'
...
{% endhighlight %}

### Slow producer and fast consumer
Change above example to convert producer slower and consumer faster by passing higher index range in producers and lower index range in consumer. If you run you should never see queue size reaching its limit. For below run I passed 3 and 6 to getInterval in producer (Thread.sleep(getInterval(3, 6))). In consumer I passed 0 and 1 to getInterval to make consumer fast.

{% highlight java %}
Producer: pushed new job '3' into queue:[] 
Consumer: processing job '3'
Producer: pushed new job '0' into queue:[] 
Consumer: processing job '0'
Producer: pushed new job '3' into queue:[] 
Consumer: processing job '3'
{% endhighlight %}

It will take some time to see output in the console because now the producer is slower and consumer will be blocked until elements are available in the queue. As you see queue is always empty because consumer is faster and always blocked on the queue so it gets element as soon as it is inserted.

### Multi producers and single consumer
We can attach multiple producers or consumers to the queue. For below run I attached five producers and single consumer.

{% highlight java %}
        //five producers        
        new Thread(producer).start();
        new Thread(producer).start();
        new Thread(producer).start();
        new Thread(producer).start();
        new Thread(producer).start();
 
        //single consumer
        new Thread(consumer).start();
{% endhighlight %}

When you run this code you will see queue gets filled because even though producer is slower but five of them are inserting elements into the queue. Below is the output;

{% highlight bash %}
Producer: pushed new job '6' into queue:[] 
Consumer: processing job '6'
Producer: pushed new job '6' into queue:[6] 
Consumer: processing job '6'
Producer: pushed new job '1' into queue:[1, 5, 9] 
Producer: pushed new job '9' into queue:[1, 5, 9] 
Producer: pushed new job '5' into queue:[1, 5, 9] 
Consumer: processing job '1'
Consumer: processing job '5'
Consumer: processing job '9'
Producer: pushed new job '5' into queue:[5, 1] 
Producer: pushed new job '1' into queue:[5, 1] 
Producer: pushed new job '7' into queue:[5, 1, 7] 
Producer: pushed new job '9' into queue:[5, 1, 7, 9]
{% endhighlight %}

You can continue to experiment with different speeds and can also add and remove producers and consumers to check the behavior.
