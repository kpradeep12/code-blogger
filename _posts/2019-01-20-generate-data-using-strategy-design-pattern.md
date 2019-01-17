---
title:  "Generate data using strategy design pattern"
date:   2019-01-16 20:11:10 -0500
categories: java
image: /assets/images/banners/no.jpg
description: "Learn Graph Algorithms with examples."
published: false
---

We need data for testing applications and there are many libraries which will provide but in this article we are going to develop a Java class which will generate test data for us. This class will generate different types of data; number, boolean, character, string and dates. There are many ways to develop this class, I am going to use **strategy design pattern**.

Strategy design pattern helps us in current context because we are going to have different strategies to generate each type of data. For example code to generate numbers are different than strings. Read this article to learn more about **[strategy design pattern]({{site.baseurl}}/strategy-design-pattern/)**.

We need to define our interface before implementing our generators. Each generator will implement this interface so this helps us to access any generator using single interface type instead of having multiple different instance types.

{% highlight java %}
interface Generator<T> {
    T generate();
}
{% endhighlight %}

This is a simple generic interface. We are taking advantage of generics here so this single interface can be used to implement any type of data.

#### Boolean Generator

Instead of creating a separate class for each data type we can add static methods to this interface for each type of generator and these methods will return the generators. Lets first implement a boolean generator.

{% highlight java %}
interface Generator<T> {
    T generate();

    static Generator<Boolean> generateBoolean(){
        return new Generator<>() {
            Random random = new Random();
            @Override
            public Boolean generate() {
                return random.nextBoolean();
            }
        };
    }
}
{% endhighlight %}

*generateBoolean()* method will return an instance of anonymous class which implements Generator interface. This method internally uses *java.util.Random* class to return value.

#### Number Generator

In the below example I added *generateNumber()* method which returns integers.

{% highlight java %}
    static Generator<Integer> generateNumber(){
        return () -> new Random().nextInt(100000);
    }
{% endhighlight %}

I am using lambda to implement number generator. This is to demonstrate that since *Generator* is having only one method so we can use lambda to implement it. This lambda returns random number with in the range of 0 to 100,000 numbers.

#### Character Generator
All required characters are stored in an array and then we will pick random character from it.

{% highlight java %}
    static Generator<Character> generateCharacter(){
        return new Generator<>() {
            Random random = new Random();
            char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
            @Override
            public Character generate() {
                return chars[random.nextInt(chars.length)];
            }
        };
    }
{% endhighlight %}

#### String Generator
Since string is a combination of characters so this will internally uses character generator.

{% highlight java %}
    static Generator<String> generateString(){
        return () -> {
            char[] chars = new char[7];
            Generator<Character> generator = generateCharacter();
            for(int i=0; i<7; i++){
                chars[i] = generator.generate();
            }
            return new String(chars);
        };
    }
{% endhighlight %}

#### Date Generator
I want to generate random dates between Jan 1, 1970 to Dec 31, 2018. There are total 1546214400 seconds between this date range so I pick any random number between 0 to 1546214400. This number is passed to *java.time.Instance* to create *java.time.LocalDate* instances.

{% highlight java %}
    static Generator<LocalDate> generateDate(){
        return () -> {
            // Number of seconds from 1970 Jan 1 to 2018 Dec 31 is 1546214400.
            int instance = new Random().nextInt(1546214400);
            return LocalDate.ofInstant(Instant.ofEpochSecond(instance), ZoneId.systemDefault());
        };
    }
{% endhighlight %}

### Generate Data

Now it is time to test our Generate interface and its implementations.

{% highlight java %}
    public static void main(String[] args) {
        testGenerator(Generator.generateNumber());
        testGenerator(Generator.generateBoolean());
        testGenerator(Generator.generateCharacter());
        testGenerator(Generator.generateString());
        testGenerator(Generator.generateDate());
    }
    private static void testGenerator(Generator<? extends Comparable> gen){
        for(int i=0; i<5; i++)
            System.out.print(gen.generate()+" ");
        System.out.println();
    }
{% endhighlight %}

### Conclusion
Created a *Generator* interface and implemented it to generate test data. We used Strategy design pattern to implement this. Full code is available **[here](https://gist.github.com/kpradeep12/1afe32af14a4b309e0eb8c18d2de2e16)**.