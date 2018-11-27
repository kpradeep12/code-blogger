---
title:  "Quick way to create List, Set and Map"
date:   2018-03-21 20:12:40 -0500
categories: java
---

Java 9 introduced **of()** static methods in List, Map and Set interfaces. This method will help us to create collection easily. I got surprised to see this method, it is lot easier to use and easier to remember and less verbose. Lets see some examples of using this method.

{% highlight java %}
//list contains four string objects
List<String> numbers = List.of("one", "two", "three", "four");
{% endhighlight %}

Iterator on this list will give us the same order in which we inserted. Before java 9 we have only option to create list like this, is using Arrays.asList method. In the List interface you will see multiple overloaded of() methods, each of them takes variable number of parameters.  below is the list;

{% highlight java %}
static <E> List<E> of​()
static <E> List<E> of​(E e1)
static <E> List<E> of​(E e1, E e2)
static <E> List<E> of​(E e1, E e2, E e3)
static <E> List<E> of​(E e1, E e2, E e3, E e4)
static <E> List<E> of​(E e1, E e2, E e3, E e4, E e5)
static <E> List<E> of​(E e1, E e2, E e3, E e4, E e5, E e6)
static <E> List<E> of​(E e1, E e2, E e3, E e4, E e5, E e6, E e7)
static <E> List<E> of​(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8)
static <E> List<E> of​(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8, E e9)
static <E> List<E> of​(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8, E e9, E e10)
static <E> List<E> of​(E... elements)
{% endhighlight %}

There are eleven overloaded methods to handle up to ten input parameters and twelfth one takes ‘varargs’. of() is not just for List, same kind of overloaded methods are available in Set and Map as well. Except in Map there is no ‘varargs’ method.

{% highlight java %}
//set contains two string objects
{% endhighlight %}

Note that if you pass duplicate object into set then it throws IllegalArgumentException, because in set, duplicates are not allowed.

{% highlight java %}
//map contains three entries
Map<Integer, String> numbers = Map.of(1, "one", 2, "two", 3, "three");
{% endhighlight %}

See, how easy it is to create map objects. We need to pass key and values like normal parameters to the of() method. You can also create Map with entry objects using ofEntries() method.

{% highlight java %}
Map<Integer, String> numbers = Map.ofEntries(
Map.entry(1, "one"),
Map.entry(2, "two"),
Map.entry(3, "three"));
{% endhighlight %}

Duplicate keys are not allowed in Map, it will throw IllegalArgumentException.

This method creates immutable collection means; once created, no element can be added, removed or replaced and no nulls are allowed when creating the collection object.
