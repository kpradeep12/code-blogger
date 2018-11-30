---
layout: post
title:  "Using comparing methods in Comparator Interface"
date:   2018-02-21 13:30:24 -0500
categories: java
author: pradeep
featured: false
---

Java 8 introduced some new methods in Comparator interface. I was going through this interface to check all available methods in it and did some code experiments to understand some of them and thought comparing and thenComparing methods are very interesting. There are multiple comparing methods which can be used in various situations. I listed all comparing methods here:

{% highlight java %}
//static comparing methods
static <T,U extends Comparable<? super U>> Comparator<T> comparing​(Function<? super T,? extends U> keyExtractor)
static <T,U> Comparator<T> comparing​(Function<? super T,? extends U> keyExtractor, Comparator<? super U> keyComparator)
static <T> Comparator<T> comparingDouble​(ToDoubleFunction<? super T> keyExtractor)
static <T> Comparator<T> comparingInt​(ToIntFunction<? super T> keyExtractor)
static <T> Comparator<T> comparingLong​(ToLongFunction<? super T> keyExtractor)
 
//default thenComparing methods
default Comparator<T> thenComparing​(Comparator<? super T> other)
default <U extends Comparable<? super U>> Comparator<T> thenComparing​(Function<? super T,? extends U> keyExtractor)
default <U> Comparator<T> thenComparing​(Function<? super T,? extends U> keyExtractor, Comparator<? super U> keyComparator)
default Comparator<T> thenComparingDouble​(ToDoubleFunction<? super T> keyExtractor)
default Comparator<T> thenComparingInt​(ToIntFunction<? super T> keyExtractor)
default Comparator<T> thenComparingLong​(ToLongFunction<? super T> keyExtractor)
{% endhighlight %}

If you can understand how these comparing methods work then you can generate a comparator object with out implementing this interface. I will go through some examples so it will be easier to understand. Lets create a Student class and add couple of students to a List.

{% highlight java %}
public class Student{
    private int id;
    private String grade;
    private String firstName;
 
    public Student(int id,String grade, String firstName) {
        this.id = id;
        this.grade = grade;
        this.firstName = firstName;
    }
 
    public int getId() {
        return id;
    }
 
    public String getGrade() {
        return grade;
    }
 
    public String getFirstName() {
        return firstName;
    }
 
    @Override
    public String toString() {
        return "[" + id + "-" + grade +
                "-" + firstName +
                ']';
    }
    public static void main(String args[]){
        List<Student> students = Arrays.asList(new Student(4,"B","Sandra"),
                new Student(2,"A","Cary"),
                new Student(5,"A","Ferne"),
                new Student(3,"B","Donnell"),
                new Student(1,"A","Ria"));
        //sort students
        students.sort((s1, s2) -> Integer.compare(s1.getId(), s2.getId()));
 
        //display list of students
        students.forEach(System.out::println);
    }
}
{% endhighlight %}

In line number 37 we are passing Comparator implementation to sort method. In next section we will see how to generate it with out implementing Comparator interface.

## Generate comparator using static comparing methods
In line number 37 of above example we implemented comparator  which compares integers. Here we wrote basic compare logic but instead why can’t we just pass the field on which we want to compare? This is where static comparing methods will come into picture. Static comparing methods need key extractor so comparator can be generated based on that. If we need to compare integers then use below static method to generate comparator.

static <T> Comparator<T> comparingInt​(ToIntFunction<? super T> keyExtractor)

To use this  method we need to pass ToIntFunction. This is a functional interface and it has single method ‘applyAsInt’, See below for the declaration of this method:

int applyAsInt​(T value)

If we want to sort based on id field of the student, which is an int then we can update line number 37 to:

students.sort(Comparator.comparingInt((s) -> s.getId()));

We are passing implementation of ToIntFunction to comparingInt method. comparingInt will get int value from ToIntFunction and creates comparator based on that. We can even use method reference to reduce the code size.

students.sort(Comparator.comparingInt(Student::getId));

Basic thing to understand is, instead of ‘how’ we mentioned ‘what’ by using comparingInt method. Like wise there are other overloaded methods to generate comparator for long and double values. What is the case if we have objects? then we can use below method.

static <T,U extends Comparable<? super U>> Comparator<T> comparing​(Function<? super T,? extends U> keyExtractor)

This method takes a function so we can return any object and Comparator will use natural sorting on it if it implements Comparable interface else it will give compilation error. I can use this method to sort students based on there first names. First name is a String and String implements Comparable so this method works fine.

students.sort(Comparator.comparing(Student::getFirstName));

There is another comparing method available to generate customized comparator which take comparator as second parameter.

static <T,U> Comparator<T> comparing​(Function<? super T,? extends U> keyExtractor, Comparator<? super U> keyComparator)

Using this method we can pass custom comparator. In below example we passed  case insensitive string comparator.

students.sort(Comparator.comparing(Student::getFirstName,String.CASE_INSENSITIVE_ORDER));

With this we covered all static comparing methods. Instead of writing our own comparing logic we just need to pass key extractors, so these methods will generate comparator for us.

## Using thenComparing methods
If we want to do sort on multiple fields then we can use ‘thenComparing’ methods. These methods will return comparator, so we can chain multiple thenComparing methods to sort multiple fields. It is like applying sorting on multiple columns in a table. For example we can do sort on grade and then on first names of the students like below.

{% highlight java %}
students.sort(Comparator.comparing(Student::getGrade)
              .thenComparing(Student::getFirstName));
{% endhighlight %}

thenComparing comes with same set of overloaded methods as comparing methods so we can pass functions to extract keys.

## Conclusion
With all the above examples hope you understood the usage of these methods. Please comment if anything is missing or need more explanation.
