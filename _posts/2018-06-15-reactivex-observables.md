---
layout: post
title:  "ReactiveX Observables"
date:   2018-06-15 12:11:10 -0500
categories: reactiveX
image: /assets/images/banners/reactiveX-observables.png
author: pradeep
featured: false
---

Observable emit values over the time and the observer who is interested to receive those values should subscribe for it. On the availability of values observable will push them to subscribers/observers. Observer will not wait for the values instead it will act only when the value is pushed towards it.

Other than the values, observable will also send error or complete notification and once these notifications are sent then no more values are emitted. Its optional for the observer to handle error and complete notifications but if needed observer can handle and process it accordingly. 

## Chaining Observables

Values traversing between observable and observer can be modified by introducing an intermediate observable. An intermediate observable can modify the values before they reach observer. Adding and removing intermediate observables makes the flow flexible and dynamic.

Lets say we are interested only in printing even numbers so we can arrange two observables. First observable will emit numbers from 1 to infinite and second observable in the chain will filter out all values except even numbers and finally observer will print what ever number pushed towards it. This arrangement is so flexible, we can print odd numbers by just replacing even number with odd number observable.

**Number generator (Observable) -> Filter even number (Observable) -> Print to console (Observer)**

![ReactiveX Observables]({{site.baseurl}}/assets/images/posts/reactivex-observables.png){: height="450px" width="550px"}{: .align-center}

## Hot and Cold Observables

An hot observable emits values as soon as it is created. This observable will not wait for the observers and those who joined later will receive values from middle.

Cold observable will not emit values until any observer subscribes to it. Observer will see all emitted values.

## Operators

ReactiveX provides wide variety of operators. We can apply these operators on the emitted values to transform, filter, aggregate, merge and many more. These operators returns new observable, we can chain multiple operators to form chain of observables.

## RxJava

ReactiveX is polyglot, means it is implemented in various of languages and in Java it is RxJava.

## Coding Observables in RxJava

Below code creates an observable which emits ten random numbers between the range of 0 to 5 for every 500 milliseconds.
{% highlight java %}
Observable<Integer> observable = Observable.create(observableEmitter -> { // <1>
    System.out.println("Generating numbers");
    new Random().ints(10, 0, 5) // <2>
        .forEach(i -> {
            delay(500); // <3>
            observableEmitter.onNext(i); // <4>
        });
});
{% endhighlight %}
<1> One of the way to get Observable instance is by calling static **[create](http://reactivex.io/RxJava/javadoc/io/reactivex/Observable.html#create-io.reactivex.ObservableOnSubscribe-)** method, as we did in above code. We are passing implementation of *ObservableOnSubscribe* as lambda expression. This expression is executed for each new subscription.  
<2> Creating Random class instance to generate ten random numbers between 0 and 5 (exclusive)  
<3> delay(500) will make current thread to sleep 500 milliseconds.  
<4> On every subscription this lambda gets new instance of *ObservableEmitter*. Using this instance we can emit values.

Observables are lazy, they will not emit values until any observer subscribes to it. If you execute above code it will not print 'Generating numbers' because no observers subscribed yet. In the below code we will create an observer which subscribes to this observable.

{% highlight java %}
observable.subscribe( // <1>
    value -> System.out.print(value + ", ")
);
{% endhighlight %}
<1> There are many overloaded subscribe methods available in Observable, here we are using one which takes consumer. This consumer is executed for every emitted value from observable and prints it, below is the output of the code;

{% highlight bash %}
Generating numbers
3, 2, 3, 3, 2, 2, 3, 2, 4, 2, 
{% endhighlight %}

Output shows that 'Generating numbers' is displayed after the subscription and then ten values are printed for every 500 milliseconds. Now lets add little bit more details to this code. We can improve our observable by adding completion and error notifications.

{% highlight java %}
public static void main(String[] args) {
    Observable<Integer> observable = Observable.create(observableEmitter -> {
        System.out.println("Generating numbers");
        new Random().ints(5, 0, 5)
                .forEach(i -> {
                    delay(500);
                    if(i == 4) // <1>
                        observableEmitter.onError(new IllegalStateException("Value 4 is emitted"));
                        observableEmitter.onNext(i);
                });
        observableEmitter.onComplete();
    });

    observable.subscribe( // <2>
        value -> System.out.print(value + ", "),
        error -> System.out.println("Error:"+error.getMessage()),
        () -> System.out.println("Completed")
    );
}

public static void delay(int milliseconds){
    try {
        TimeUnit.MILLISECONDS.sleep(milliseconds);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
{% endhighlight %}
<1> I am generating five random numbers and if the generated random number is 4 then onError is called which takes Throwable object. I am calling onComplete once all five values are emitted to notify that there are no more values emit. Note that we call onNext to emit values, onError to notify for any error and onComplete to indicate no more values from the emitter.  
<2> As I mentioned there are multiple versions of subscribe method available. Here subscribe method takes three parameters; first parameter is consumer which gets the values, second parameter is consumer which gets Throwable to handle the error and third parameter is Action which will be called on complete notification.  
<3> Implementation of delay method to block thread based on provided time.

Output of this code; 
{% highlight bash %}
Generating numbers
1, 3, Error:Value 4 is emitted

Generating numbers
0, 3, 0, 3, 1, Completed
{% endhighlight %}
First execution emits error and second execution completes with out error. Note that after the error there are no more values emitted.

![Number generator observable]({{site.baseurl}}/assets/images/posts/number-generator-observable.png){: height="650px" width="550px"}{: .align-center}

## Conclusion
In this article we went through basic introduction of Observables with some coding examples.