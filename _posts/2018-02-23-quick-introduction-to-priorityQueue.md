---
title:  "Quick introduction to PriorityQueue"
date:   2018-02-23 21:20:44 -0500
categories: java
---

PriorityQueue is the implementation of Queue interface. Generally queue store elements in FIFO (first in first out) order but PriorityQueue is the exception. As the name specifies, elements in the priority queue are retrieved based on the priority. Priority can be low-to-high which is called min priority or high-to-low which is called max priority. Internally it uses heap data structure to store elements.

There are two ways to set priority for the queue, either elements should implement Comparable or by passing Comparator to the PriorityQueue constructor. If not, then priority queue will throw ClassCastException.

In this article we will see how to insert and remove elements from the priority queue. Lets assume we want to process mails based on the priority. Each mail will have a priority and it can be low, normal or high. Processor should retrieve from high to low priority elements from the queue.

Lets create a Mail class and an Enum.

{% highlight java %}
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;
 
public class Mail {
    private Priority priority;
 
    Mail(Priority priority){
        this.priority = priority;
    }
 
    public Priority getPriority() {
        return priority;
    }
 
    @Override
    public String toString() {
        return "{" + priority + "}";
    }
}
 
enum Priority{
    LOW(-1), NORMAL(0), HIGH(1);
 
    private int value;
 
    Priority(int value){
        this.value = value;
    }
    public int getValue(){
        return value;
    }
}
{% endhighlight %}

Now we have required setup. Lets create Processor class which stores some mails in a queue and retrieves mails from HiGH to LOW priority.

{% highlight java %}
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;
 
public class Processor {
    public static void main(String args[]){
        //this is a natural ordered comparator
        Comparator<Mail> lowToHighPriority = Comparator
                .<Mail>comparingInt((mail) -> mail.getPriority().getValue());
        //reverse the natural order to
        Comparator<Mail> highToLowPriority = lowToHighPriority.reversed();
 
        Queue<Mail> queue = new PriorityQueue<>(highToLowPriority);
        queue.add(new Mail(Priority.LOW));
        queue.add(new Mail(Priority.HIGH));
        queue.add(new Mail(Priority.NORMAL));
        queue.add(new Mail(Priority.HIGH));
        queue.add(new Mail(Priority.NORMAL));
        queue.add(new Mail(Priority.LOW));
 
        System.out.println(queue.poll());
        System.out.println(queue.poll());
        System.out.println(queue.poll());
        System.out.println(queue.poll());
        System.out.println(queue.poll());
        System.out.println(queue.poll());
    }
}
{% endhighlight %}

Run this class to see below output.

{% highlight bash %}
{HIGH}
{HIGH}
{NORMAL}
{NORMAL}
{LOW}
{LOW}
{% endhighlight %}

Processor used highToLowPriority comparator to retrieve elements. If we pass lowToHighPriority then we will get LOW mails first and then HIGH at last.

As I mentioned earlier, Mail can also implement Comparable, if so, no need to pass a comparator to the queue but using comparator have a advantage, it will decouple compare logic with Mail class, so later we can customize comparator with out changing Mail class.
