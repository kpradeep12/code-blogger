---
title:  "Create Records with Java 14"
date:   2020-04-08 12:11:10 -0500
categories: java
image: /assets/images/banners/records-java14.png
description: "Record is a new feature added in Java 14. In this article, we will learn about Records, and we will explore some examples."
---

Record is a new feature added in Java 14. In this article, we will learn about Records, there usage and limitations along with some examples. We will also see how to compile and run Java 14 classes, which are using preview features from the command prompt.

* Introduction
* How do Records looks?
* Why we need records?
* What we get with the Record
* Compile and Run from Command prompt
* Examples
* Limitations
* Conclusion
{:toc}

### Introduction

There are many new features added in Java 14, and some of them are in a preview state, **Record** is one of them. Records are compact classes, which allow us to store immutable data with minimal syntax. They are much like a POJO's except they don't have setters because Records are immutable. Much of the boilerplate code is not needed because, by default, every Record comes with getters, toString(), equals(), and hasCode() implementation.

### How do Records looks?

The below example shows a Record, which stores x and y of a Point.

{% highlight java %}
record Point(int x, int y) {}
{% endhighlight %}

* **record** is the keyword and which is followed by the name. In the above example, 'Point' is the name of the Record.
* State description declares the fields of the Record. It is just like the constructor. 'x' and 'y' in the above example is the state of the Point.
* Optional implementation.

### Why we need records?

We can use Classes for creating data transfer objects or implementing business logic, or we can customize Class for any use, this means classes are very flexible, so do we need Records? Because we can use Classes instead.
The main motive of introducing Records is;
* Java is a verbose language, and Records can reduce a lot of boilerplate code (equals(), hashCode(), getters(), and toString()), but at the same time, Records are not to replace Classes.
* equals() and hashCode() are important methods, and they are error-prone to implement. Records provide a default implementation, which means lesser code to write and the developer is happy :)
* IDE's can generate these methods, but the problem is, a Class can have hundreds of lines of code for just a couple of data fields. Isn't it takes time to dig through all those lines of code to debug a simple issue?
* Not just boilerplate reduction, but also semantics are essential. Records will model data as data. Now, whenever we see a Record, the only thing we need to remember is, it is a data transfer object, whereas we can use Classes for anything.

### What we get with the Record

A Record acquires many standard members automatically;
* Each field declared in the state description is a private final field, which means fields are immutable.
* A public accessor method for each field, which means in the above example, 'Point' gets two methods 'x()' returns 'int' and 'y()' returns 'int.'
* A public constructor, whose signature is the same as the state description, records are instantiated like classes, using the new keyword.
* Implementation of equals() and hashCode(). Two records are the same only if the state of all fields match.
* Implementation of the toString(). Which includes string representation of all fields with there names.

### Compile and Run from Command prompt

I have a class called HelloRecord, and it contains a Record. Let's compile and run it from the command prompt.
{% highlight java %}
public class HelloRecord {
    public static void main(String[] args) {
        record Point(int x, int y) {}
    }
}
{% endhighlight %}
{% highlight bash %}
# pass -source and flag --enable-preview to javac because records are part of preview
javac --source 14 --enable-preview HelloRecord.java
# pass flag --enable-preview to java
java --enable-preview HelloRecord
{% endhighlight %}

### Examples

Below are many different examples;

* Declare a record and access its state with accessors.
{% highlight java %}
record Point(int x, int y) {}

Point point = new Point(2,3); // new instance
System.out.println(point.x()); // get x with accessor

//OUTPUT
2
{% endhighlight %}

* Validate state on initialization. 
{% highlight java %}
record Point(int x, int y) {
    public Point { // canonical constructor
        if(x > y)
            throw new IllegalArgumentException(x + " is > than " + y);
    }
}

new Point(2,3);
new Point(12,3); // throws IllegalArgumentException because x is greater than y
{% endhighlight %}

* Implement body
{% highlight java %}
record Point(int x, int y) {
    public int doubleX() { // method with in record
        return x * 2;
    }
}

Point point = new Point(2,3);
System.out.println(point.doubleX());

//OUTPUT
4
{% endhighlight %}

* Static fields and static methods are allowed in Record
{% highlight java %}
record Point(int x, int y) {
    public static final double HALF = 0.5; // static field
    public static double halfX(int value) { // static method
        return value * HALF;
    }
}

System.out.println(Point.halfX(100)); // calling static method

//OUTPUT
50.0
{% endhighlight %}

### Limitations
The following are the limits of the Record.
* Records can not extend any other class.
* Fields declared within the body should be static.
* Records are implicitly final, and cannot be abstract.

### Conclusion

Records are immutable, which means the state of the Record cannot be changed, and they reduce a lot of boilerplate code. Use Records to store data or as data carriers or returning from methods.
