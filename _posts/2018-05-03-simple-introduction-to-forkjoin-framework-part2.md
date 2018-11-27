---
title:  "Simple Introduction to ForkJoin Framework - Part 2"
date:   2018-05-03 12:11:10 -0500
categories: java
header:
  teaser: /assets/images/banners/simple-introduction-to-forkjoin-framework-part2.png
---

In the **[first part](/java/2018/05/03/simple-introduction-to-forkjoin-framework-part1.html)** of this series we went through the introduction on ForkJoin framework. In this article we will go through code example to create a ForkJoinTask using RecursiveAction. RecursiveAction is an abstract class and it is one of the subclass of ForkJoinTask. In order to create a divisible task we need to extend RecursiveAction and implement compute() method.

In this article we will go through an array incrementor example. We declare a class ArrayIncrementor and this class will increment numbers in the given array and this class extends RecursiveAction. RecursiveAction has one abstract method, compute(), we implement this method. Instead of incrementing each element sequentially we will divide array into sub-arrays and threads in the pool will increment values in these sub-arrays. We need to take care of dividing array and ForkJoin framework will handle remaining things like execution of compute method and managing the threads.

To make it simple, lets start coding with small part of the class and then add code to it. 

{% highlight java %}
import java.util.Arrays;
import java.util.concurrent.*;

public class ArrayIncrementor extends RecursiveAction{ // <1>
    int[] data; // <2>
    int hi,lo;
    static int THRESHOLD = 5;

    public ArrayIncrementor(int[] data, int lo, int hi) { // <3>
        this.data = data;
        this.lo = lo;
        this.hi = hi;
    }

    @Override
    protected void compute() { // <4>
        if(hi - lo <= THRESHOLD) {
            //increment elements in array
        }else{
            //divide array further to make it smaller
        }
    }

    public static void main(String[] args){
    
    }
}
{% endhighlight %}
<1> Class ArrayIncrementor extends abstract RecursiveAction class. This class has abstract method compute() and we are going to implement it.  
<2> This class increments values in the array so we declared integer array and also two integer fields 'lo' and 'hi' which contains lower and upper index limit of the array. Increments happens only with in this range. THRESHOLD is static and we maintain minimum sub-array size in it.  
<3> ArrayIncrementor constructor gets input array, lower and higher indexes of array.  
<4> Implements compute() method. This method is not yet fully implemented. We need to increment elements in the array only if 'lo' and 'hi' index is lower or equal to THRESHOLD else divide the array to make it smaller. This means computation happens only when task is small enough, else task is divided further.

In above code we created basic shell of the class. It is taking integer array with lo and hi index as input, now lets implement compute() method.

{% highlight java %}
@Override
protected void compute() {
    if(hi - lo <= THRESHOLD) {
        System.out.printf("compute: %d - %d %n", lo, hi);
        for (int i = lo; i < hi; i++) { // <1>
            data[i]++;
        }
    }else{
        int mid = (hi-lo)/2 + lo; // <2>
        System.out.printf("fork: %d - %d, %d - %d %n",lo, mid, mid, hi);
        invokeAll(new ArrayIncrementor(data, lo, mid),
                new ArrayIncrementor(data, mid, hi)); // <3>
        System.out.printf("join: %d - %d %n", lo, hi);
    }
}
{% endhighlight %}
<1> If index range is equal or lower than THRESHOLD then, iterate array between lo and hi index and increment values. Note that 'lo' is inclusive and 'hi' is exclusive in the for loop.  
<2> Calculating the mid index, if index range is greater than THRESHOLD. mid index will help us to divide array into two parts.  
<3> Fork input array into two parts by calling invokeAll. We are passing two ArrayIncrementor objects to it, first object takes index range of lo to mid and second object takes mid to hi. Each ArrayIncrementor object can be forked further, if range is not in THRESHOLD limit, this call works like recursive call.

We implemented compute(), now lets create ForkJoinPool and pass this task to it.

{% highlight java %}
public static void main(String[] args) throws ExecutionException, InterruptedException {
    int[] input = new int[]{5,2,6,1,4,5,6,9,8,5,5,2,6,1,4,5,6,9,8,5};
    ForkJoinPool fjp = new ForkJoinPool();
    fjp.invoke(new ArrayIncrementor(input,0,input.length)); // <1>
    fjp.shutdown();
    System.out.printf("result: %s",Arrays.toString(input));
}
{% endhighlight %}
<1> call invoke on ForkJoinPool by passing ArrayIncrementor object with array, lo and hi range. invoke() takes ForkJoinTask and because our ArrayIncrementor extends it, so we can pass it directly. In the next line we called shutdown to stop ForkJoinPool and then printed array.

Below will show the output
{% highlight bash %}
Submitting task
fork: 0 - 10, 10 - 20  // <1>
fork: 0 - 5, 5 - 10 
fork: 10 - 15, 15 - 20 
compute: 5 - 10  // <2>
compute: 15 - 20 
compute: 0 - 5 
compute: 10 - 15 
join: 10 - 20 // <3>
join: 0 - 10 
join: 0 - 20 
result: [6, 3, 7, 2, 5, 6, 7, 10, 9, 6, 6, 3, 7, 2, 5, 6, 7, 10, 9, 6] // <4>
{% endhighlight %}
<1> Input is having 20 elements and the THRESHOLD is 5 so array is forked until size reaches five.  
<2> compute happens only for five element range. The order of the compute is not sequential like 0-5 then 5-10 because they are executed by threads in parallel so there will be no order in execution.  
<3> join statement printed after invokeAll execution.  
<4> Final output shows incremented array values.

I added system outs in the code to show the flow of execution. In the above example there are four compute statements means those four tasks are executed in parallel. Below image which I posted in part 1 will help more in understanding this example.

![Fork Join framework task execution](/assets/images/posts/fork-join-execution.png){: height="550px" width="650px"}{: .align-center}

## Conclusion
We implemented RecursiveAction to for and increment array values. This is a simple example of using ForkJoin framework.
