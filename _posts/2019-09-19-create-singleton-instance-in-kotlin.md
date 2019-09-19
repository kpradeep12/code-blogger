---
title:  "Create Singleton Instance In Kotlin"
date:   2019-09-19 12:11:10 -0500
categories: kotlin
image: /assets/images/banners/create-singleton-instances-kotlin.png
description: "There are many use cases where we need Singleton instances in applications. For example; to maintain a single instance of resources like a database or object store or file system. Kotlin supports singleton instances within the language with object keyword. In this article, we learn using the object keyword to implement singleton instances in Kotlin."
---

There are many use cases where we need Singleton instances in applications. For example; to maintain a single instance of resources like a database or object store or file system. One way to create an instance of Singleton in Java is to create a class, which should adhere to the rules of the singleton pattern. Implementing singleton might lead to bugs if implemented by an inexperienced programmer. Kotlin solves these issues by supporting singleton instances within the language with **object** keyword. In this article, we learn using the object keyword to implement singleton instances in Kotlin.

* Compare Singleton between Java and Kotlin
* Initiate Singleton
* Declare within other object declaration
* Declare within a class
* Can not declare in local
* Conclusion
{:toc}

#### Compare Singleton between Java and Kotlin

Before implementing Singleton in Kotlin lets see sample code in Java, so it's easier to learn;

{% highlight java %}
// Singleton in Java
public class DatabaseInstance {

 private static DatabaseInstance instance;
 
 private DatabaseInstance(){}
 
 public static synchronized DatabaseInstance getInstance(){
 if(instance == null){
 instance = new DatabaseInstance();
 }
 return instance;
 }
 
 public Connection getConnection() { ... }
}
{% endhighlight %}

In Java, we need to declare a class with a static synchronized method which checks whether the instance is null or not and if it is null then creates the instance. It is a little complex for beginners to understand. Let's implement the same in Kotlin;

{% highlight java %}
// Singleton in Kotlin
object DatabaseInstance {
 fun getConnection(): Connection { ... }
}
{% endhighlight %}

It's simple in Kotlin, declare singleton using **object** keyword, this declaration is called object declaration. At the execution time, Kotlin maintains a single instance of DatabaseInstance. To use this object, call getConnection() with a declared name like below;

{% highlight java %}
DatabaseInstance.getConnection()
{% endhighlight %}

#### Initiate Singleton

Sometimes we might need to execute code before the execution of getConnection(). We can do this with constructors in Java, the same way we can put our initiation code in **init** in Kotlin

{% highlight java %}
object DatabaseInstance {
 init {
 // executes once in the life time of JVM
 }
 fun getConnection(): Connection { ... }
}
{% endhighlight %}

#### Declare within other object declaration

Object declaration can be enclosed within other object declarations like below;

{% highlight java %}
object SystemInstance {
 object LogInstance {
 fun getLogHome(): String { ... }
 }
 fun getHomePath(): String { ... }
}

fun main() {
 println(SystemInstance.LogInstance.getLogHome())
}
{% endhighlight %}

To call getLogHome() just use Object names separated by dots, like **SystemInstance.LogInstance.getLogHome()**

#### Declare within a class

We can declare objects in a class.

{% highlight java %}
class ConnectionDetails {
 object LogInstance {
 fun getLogHome(): String { ... }
 }
 fun path(): String { ... }
}

fun main() {
 println(ConnectionDetails.LogInstance.getLogHome())
}
{% endhighlight %}

**getLogHome()** can be called directly with out ConnectionDetails instance like **ConnectionDetails.LogInstance.getLogHome()**

#### Can not declare in local

Can not declare an object within the functions because Kotlin throws an error saying **Named object 'LogInstance' is a singleton and cannot be local. Try to use anonymous object instead**

{% highlight java %}
fun main() {
 object LogInstance {
 fun getLogHome(): String { ... }
 }
}
{% endhighlight %}

### Conclusion

Comparing to Java declaring Singleton's are so comfortable in Kotlin using **object**. In this article, we learned using **object** to create Singletons.