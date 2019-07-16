---
title:  "Java & Kotlin Grammer"
date:   2019-04-08 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/kotlin-ktor-oauth.png
description: ""
published: false
---

* JUnit5
* Mockito
* Java method references - cheat sheet
* 12factor apps
* IntelliJ
* Principle of Good programming
* Lombok
* Logging - MethodHandles
* HTTP - Five parts of HTTP URL
* Kotlin
{:toc}


### JUnit5

#### Disable JUnit test cases

Just add a @Disabled annotation to the test method or class to skip 🚫 running JUnit 5 test cases.

{% highlight java %}
// Disables all tests in the class
@Disabled
class ArithmeticTest {

    @Test
    @Disabled("Disabled for 0.4 release")
    fun testSum() {
        Assertions.assertEquals(4, 2 + 2)
    }

    @Test
    fun testMultiply() {
        Assertions.assertEquals(4, 2 * 2)
    }
}
{% endhighlight %}

#### @Nested annotation

Use @Nested JUnit annotation to express the relationship among groups of tests. Apply this annotation on the inner test classes to organize related tests within a single class file.

![]({{site.baseurl}}/assets/images/posts/2019/junit-nested-annotation.jpg){: height="1058px" width="904px"}{: .align-center}

### Mockito

Three things to remember before doing mock testing

📌 Do not mock types you don't own (ex: third party libraries)
📌 Do not mock value objects (ex: Person, Employee)
📌 Do not mock everything

### Java method references - cheat sheet

Where applicable, prefer using method references in #Java. Check out a mini cheat sheet 🗒️ attached for the list of all supported method references.

{% highlight java %}
//static: call static methods by passing value
Integer::parseInt

//Bound: create instance and call method on it
Instant.now()::isAfter

//Unbound: call method on the instance
String::toUpperCase

//Class constructor
TreeMap<K,V>::new

//Array constructor
int[]::new
{% endhighlight %}

### 12factor apps

A 12factor app will strictly separate build, release and run stages.

* Build (converts code to executable bundle) ➡️ Release (combines the generated bundle with current deploys config and creates the release) ➡️ Run (execution of the release)

12factor processes / apps are stateless and share nothing

📌 App should not rely on any state being persistent in memory or file system.
📌 Any data that needs to persist must be stored on stateful backing service like Database, Redis or Memcached

### IntelliJ

#### Open projects directly from command line

Open Java / Kotlin project directly from the command line, execute below command to open the current directory in a #intellij editor.

{% highlight bash %}
$ idea .
{% endhighlight %}

If in case it not works then, open IntelliJ and in the top menu click on Tools > Create command-line launcher.

![]({{site.baseurl}}/assets/images/posts/2019/intellij-cli-open-project.gif){: height="549px" width="810px"}{: .align-center}

#### Paste from history

IntelliJ keeps track of everything that goes to the clipboard, and we can paste anything from the clipboard history.

To paste from history use below shortcuts
Mac -> shift + ⌘V
Windows -> ctrl-shift-alt + V

![]({{site.baseurl}}/assets/images/posts/2019/intellij-paste-from-history.gif){: height="513px" width="938px"}{: .align-center}

### Principle of Good programming

* Do the simplest thing that could possibly work.

❎ Don't build any amazing superstructures 
❎ Don't do anything fancy 
✅ Implement the new feature in the simplest way you can think of that 'could possibly work.'

* Don’t make me think

Code should be easily read and understood with a minimum of effort required. If a code requires too much thinking to understand then it can probably stand to be simplified.

* Minimize coupling

📌 Each section of code (block, function, class, package, modules...) 
should minimize the dependencies on other areas of code
📌 Use shared variables as little as possible
📌 Low coupling is often a sign of a well-structured computer system and a good design

### Lombok

#### @NonNull annotation

@NonNull annotation in #java's lombok library will generate a null check statement. We can use it on the parameter of a method or constructor.

Check attached snippet for the differences in the code one with @NonNull and other with out it.

![]({{site.baseurl}}/assets/images/posts/2019/lombok-nonnull-annotation.jpg){: height="784px" width="1420px"}{: .align-center}

#### @Cleanup annotation

Use Lombok's @Cleanup annotation to automatically clean up your resources before the execution ends from the current scope, no need to explicitly clean up the resources in the finally clause.

![]({{site.baseurl}}/assets/images/posts/2019/lombok-cleanup-annotation.jpg){: height="984px" width="2151px"}{: .align-center}

### Logging - MethodHandles

Below logger declaration is not resistant to copy & pasting between classes. We need to change the class name 😯

final static Logger logger = LoggerFactory.getLogger(Employee.class);

Use MethodHandles.lookup() to make it copy and pasted across classes 😀

![]({{site.baseurl}}/assets/images/posts/2019/logging-methodhandles.jpg){: height="356px" width="1670px"}{: .align-center}

### HTTP - Five parts of HTTP URL

Five main parts of the HTTP URL

📌 protocol 
📌 domain and port 
📌 path 
📌 query parameters
📌 fragment

![]({{site.baseurl}}/assets/images/posts/2019/HTTP-URL-parts.jpg){: height="504px" width="1404px"}{: .align-center}

### Kotlin

* A lambda expression in #Kotlin with single parameter will have implicitly declared variable under the name 'it.' No need to declare parameter and omit ->

listOf(1,2,3,4,5).filter { it % 2 == 0 }

![]({{site.baseurl}}/assets/images/posts/2019/kotlin-implicit-it.jpg){: height="456px" width="1404px"}{: .align-center}