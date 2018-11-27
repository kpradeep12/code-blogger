---
title:  "Reduce stream to single value"
date:   2018-03-24 17:19:40 -0500
categories: java
header:
  teaser: /assets/images/banners/blog-banner-reduce-the-streamto-single-value.png
---

Lets say we want to return the sum of all numbers in a list, there are multiple ways in Java we can achieve this, one of the way is using a for loop to iterate the list by keeping track of current sum in a temporary variable, like below:

{% highlight java %}
List<Integer> numbers = List.of(1,2,3);
int total = 0;
for(int i: numbers){
   total += i;
}
System.out.println(total); //prints 6
{% endhighlight %}
This same can be achieved using reduce function with lot less code and also we get the advantage of using streams. This reduce function is called reduction operation, means this function takes multiple elements from the stream and reduces it to a single element. There are three reduce functions in the stream interface and I will go through each of them below;

**T reduce (T identity, BinaryOperator\<T> accumulator)**

This function takes two parameters, an identity and an accumulator and returns T.

* Identity: Initial starting value. Reduction operation will use this as an initial value for the first accumulation in the stream. It is like assigning 0 to variable (total) as starting value in the first example.
* \<T>: Binary operator takes two parameters of same time and returns the result of same type. Below code uses reduce on integer stream.

{% highlight java %}
List<Integer> numbers = List.of(1,2,3);
int total = numbers.stream()
                .reduce(0, (i,j) -> i+j);
System.out.println(total); //prints 6
{% endhighlight %}
We passed 0 as identity, because we need to start calculating sum from 0, then we passed accumulator function. Accumulator takes two integers, ‘i’ and ‘j’. ‘i’ is the previous calculated sum and j is the current element in the stream. Result of accumulator function is passed as ‘i’ for the next accumulator execution. Below code demonstrates how the internals of accumulator works.

{% highlight java %}
List<Integer> numbers = List.of(1,2,3);
int total = numbers.stream()
             .reduce(0,(i,j)->{
                 System.out.printf("In accumulator i=%d j=%d -> return: %d \n", i, j, i+j);
                 return i+j;
             });
System.out.printf("total : %d\n",total);
{% endhighlight %}
{% highlight bash %}
In accumulator i=0 j=1 -> return: 1 
In accumulator i=1 j=2 -> return: 3 
In accumulator i=3 j=3 -> return: 6 
total : 6
{% endhighlight %}
‘i’ in the output shows the accumulated sum from the previous execution and ‘j’ is the current element from the stream.

**Optional\<T> reduce​(BinaryOperator\<T> accumulator)**

Result of the reduce function is returned as an optional object. Optional will make it easier to handle return values with out checking nulls. We need to only pass accumulator to this function and by default it considers first element as an initial value.

{% highlight java %}
List<Integer> numbers = List.of(1,2,3);
Optional<Integer> total = numbers.stream()
                .reduce((i,j)->{
                    System.out.printf("In accumulator i=%d j=%d -> return: %d \n", i, j, i+j);
                    return i+j;
                });
total.ifPresent(s->System.out.printf("total : %d",s));
{% endhighlight %}
{% highlight bash %}
In accumulator i=1 j=2 -> return: 3 
In accumulator i=3 j=3 -> return: 6 
total : 6
{% endhighlight %}
**\<U> U reduce​(U identity, BiFunction\<U,? super T,U> accumulator, BinaryOperator\<U> combiner)**

This function works on a stream of T and returns U, where as the other methods which we discussed earlier works on stream of T and returns T. For example, if we want to sum the lengths of all strings in a stream then we can use this function.

{% highlight java %}
List<String> numbers = List.of("one", "two", "three");
Integer sum = numbers.stream()
                .reduce(0,
                        (i,s)->{
                            System.out.printf("In accumulator i=%d s=%s -> return: %d \n", i, s, i+s.length());
                            return i + s.length();
                        },
                        (i,j)->{
                            System.out.printf("In combiner i=%d j=%d -> return: %d\n", i, j, i+j);
                            return i + j;
                        });
System.out.printf("sum: %d\n",sum);
{% endhighlight %}
{% highlight bash %}
In accumulator i=0 s=one -> return: 3 
In accumulator i=3 s=two -> return: 6 
In accumulator i=6 s=three -> return: 11 
sum: 11
{% endhighlight %}
Below are the parameters we need to pass to this function:

* identity: Initial starting value for the accumulator.
* accumulator: This is a BiFunction<U, ? super T, U>. BiFunction takes two parameters. In this case it takes two different input types U and T and returns U. In the above example we passed ‘i’ and ‘s’. ‘i’ is the previous accumulated sum and ‘s’ is the current value from the stream. We are summing ‘i’ with length of ‘s’ and returning integer. In the above output ‘i’ contains 0, 3, and 6 because ‘i’ is the accumulation of string lengths, so it is like “one”.length() + “two”.length() + “three”.length()
* combiner: It is a BinaryOperator\<U>, it takes two input parameters and returns one. In the above example there is no output from combiner because this function is executed in parallel stream. In parallel stream multiple threads will accumulate to intermediate values and combiner will combine all those values and returns single result. In the above example change numbers.stream() to numbers.parallelStream() and you see below output;

{% highlight bash %}
In accumulator i=0 s=three -> return: 5 
In accumulator i=0 s=two -> return: 3 
In accumulator i=0 s=one -> return: 3 
In combiner i=3 j=5 -> return: 8
In combiner i=3 j=8 -> return: 11
sum: 11
{% endhighlight %}
Accumulator returns the length of the string and combiner, combines all the lengths together. Reduction to a different type requires accumulator and combiner, thats the reason first two reduce functions don’t have combiner because they always return the same type.
