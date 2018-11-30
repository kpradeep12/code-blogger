---
layout: post
title:  "How ConcurrentModificationException is thrown?"
date:   2018-04-15 12:11:10 -0500
categories: java
image: /assets/images/banners/blog-banner-How-ConcurrentModificationException-is-thrown_.png
author: pradeep
featured: false
---

How concurrent modification detection logic works and on what basis ConcurrentModificationException is thrown? This article will explain these questions. Iterating a collection is one of the important operation we usually perform and it can be a time consuming if collection is big enough. Iterator interface is the responsible for iterating the collection. Many collection classes in Java implement iterator like List and Set. If we want to iterate through the collection we first need to get the instance of it, we can get it by calling iterate(). Refer below code, which gets iterator from list.

{% highlight java %}
var numList = new ArrayList<>(List.of(1,2,3));
var iterator = numList.iterator();
iterator.forEachRemaining((num) -> {
	System.out.println(num);
});
{% endhighlight %}

Note that I used local variable type inference so I can declare variables with ‘var’. This is the new feature in version 10. This code gets iterator from ArrayList and iterates the list using  forEachRemaining. forEachRemaining is a default method in Iterator which is introduced in Java 1.8 and we can use it to replace traditional while loop. This code just works fine and prints the numbers in the console. For your reference Iterator has below methods;

{% highlight java %}
default void forEachRemaining​(Consumer<? super E> action)
boolean hasNext()
E next()
default void remove()
{% endhighlight %}

### Adding an element

Lets see what happens when numList.iterator() is called. From now on, I refer collection as the classes which implement iterator interface like List or Set. Collections will maintain a private modification count variable and this count gets updated on every modification like addition or deletion of elements.Modification count is the internal private variable so we can not access this variable. When iterator() is called on the collection, it creates a new instance of iterator and modification count is passed to this new iterator instance. In the above example, we created a list of size 3 and an iterator, both of them will have the same modification count. Now lets add an element to the list after the iterator instance creation.

{% highlight java %}
var numList = newArrayList<>(List.of(1,2,3));
var iterator = numList.iterator();
numList.add(4);
iterator.forEachRemaining((num) -> {
    System.out.println(num);
});
{% endhighlight %}

It throws ConcurrentModificationException at line number 4. All iterator methods except hasNext() will compare modification count of iterator and collection instance. In the above case collection is modified at line number 3 so collections modification count gets updated but iterator will have old count. Counts will not match when forEachRemaining is executed so it throws ConcurrentModificationException. This approach is called fail-fast; because exception is thrown before performing the real action. Note that this modification can occur in a multi threaded environment but for simplicity purpose I not used any threads. This comparison will help the iterator to detect the modifications in the collection and in case of mismatch it throws an exception.

I can add a new element after iterating the collection but I need to get new iterator instance to iterate again else I get exception because of different modification counts between the updated collection and old iterator instance.

### Removing an element
Calling remove after the creation of iterator will throw ConcurrentModificationException. Check below code;

{% highlight java %}
var numList = newArrayList<>(List.of(1,2,3));
var iterator = numList.iterator();
numList.remove(1);
iterator.forEachRemaining((num) -> {
    System.out.println(num);
});
{% endhighlight %}
At line number 3 we removed element from the collection, iterator will detect it in forEachRemaining method and throws exception because list’s modification count gets  updated but it is not passed down to the iterator, so comparison fails in forEachRemaining method and it throws exception. Alternatively we can call remove() on iterator which will not throw exception because remove method will update modification count of itself and also it passes new count to its creator, in this case creator is the list instance such that iterator and collection will be in sync. Below is the updated code which removes element using remove() of iterator instance.

{% highlight java %}
var numList = newArrayList<>(List.of(1,2,3));
var iterator = numList.iterator();
iterator.next();
iterator.remove();
numList.forEach(System.out::println);
{% endhighlight %}
Because the first element is removed so this code prints 2 and 3. Note that I moved iterators position to the next element by calling next() because by default it will not point to any element. This code will not throw ConcurrentModificationException because remove() method will pass new modification count to the list.

### Modifications in ListIterator
ListIterator is the sub interface of Iterator and this also depends on modification count to detect concurrent modifications. Along with the behavior of iterator, it supports addition, update and reverse iteration operations. When ListIterator instance is created, it gets modification count from the collection and it validates this count on every operation. If count mismatch happens, then it throws exception. All the modification operations like add, update and remove in the ListIterator will pass the updated modification count to its creator, in this case it is the list. Below is the example;

{% highlight java %}
var numList = newArrayList<>(List.of(1,2,3));
var iterator = numList.listIterator();
//removes 1 from the list
iterator.next();
iterator.remove();
//updates 2 with 0
iterator.next();
iterator.set(0);
//adds 4 to the list
iterator.add(4);
numList.forEach(System.out::println);
{% endhighlight %}

### Exception with hidden iterators

Code can throw ConcurrentModificationException with out direct use of iterator because of hidden iterators. For example, for-each loop will internally creates iterator instance so concurrent modifications will make for-each to throw exception. Be cautious when using internal iterators. There are many methods which uses iterators internally. See below example;

{% highlight java %}
System.out.println(numList.toString());
{% endhighlight %}

toString() of list uses iterator to construct the string from each element of it. Similarly containsAll, removeAll, retainAll and constructors that take collection internally uses iterator and all of these methods can throw ConcurrentModificationException.

### Conclusion

Collection can not be modified directly once the iterator is created but we can modify indirectly using the iterator instance. ConcurrentModificationException will give us the clue that multiple parts of the application is modifying the collection so it helps us to debug the issue.