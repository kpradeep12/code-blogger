var store = [{
        "title": "Stream of dates with LocalDate",
        "excerpt":"I want a list of all dates with starting range from Jan 15, 2018 to Feb 20, 2018. I can generate this list using the new ‘datesUntil’ method in LocalDate class. This method is introduced in Java 9 and I recently found out this method while browsing through Java API...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/02/17/stream-of-dates-with-localdate",
        "teaser":null},{
        "title": "Using comparing methods in Comparator Interface",
        "excerpt":"Java 8 introduced some new methods in Comparator interface. I was going through this interface to check all available methods in it and did some code experiments to understand some of them and thought comparing and thenComparing methods are very interesting. There are multiple comparing methods which can be used...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/02/21/using-comparing-methods-in-comparator-interface",
        "teaser":null},{
        "title": "Quick introduction to PriorityQueue",
        "excerpt":"PriorityQueue is the implementation of Queue interface. Generally queue store elements in FIFO (first in first out) order but PriorityQueue is the exception. As the name specifies, elements in the priority queue are retrieved based on the priority. Priority can be low-to-high which is called min priority or high-to-low which...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/02/23/quick-introduction-to-priorityQueue",
        "teaser":null},{
        "title": "Quick way to create, read, write and delete files in Java",
        "excerpt":"Files class in java.nio.file package contains static utility methods to operate on files and directories. In this article I will provide information on some of these static methods. These methods will help us in writing simple and quick code to work on the files. The main advantage of using this...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/02/28/quickway-to-create-read-write-delete-files",
        "teaser":null},{
        "title": "Generate stream of random numbers",
        "excerpt":"Its not possible for any computer to generate real random numbers, but they can generate pseudorandom numbers. Pseudorandom numbers are generated based on an algorithm and they are nearly like random numbers. Java’s Random class uses to generate pseudorandom numbers and this formula needs initial value or called seed. Random...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/03/generate-stream-of-random-numbers",
        "teaser":null},{
        "title": "Producer and Consumer with Bounded Blocked Queue",
        "excerpt":"Producer and consumers are two independent entities works together on the queue. Producer inserts elements into the tail of the queue and consumer removes them from the head of the queue. Here elements can be tasks or data on which consumer is interested in. This design pattern will allow producer...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/07/producer-consumer-with-bounded-blocked-queue",
        "teaser":null},{
        "title": "Fixed Thread Pool using Executor framework",
        "excerpt":"In this article we are looking at the Fixed thread pool implementation. This thread pool creates a fixed number of threads and reuses them as the tasks are completed and because the threads are reused so once after reaching the thread pool limit then there will not be any thread...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/10/fixed-thread-pool-using-executor-framework",
        "teaser":null},{
        "title": "Create Maven project in GitHub",
        "excerpt":"If you are looking to publish your first Maven project to gitHub then this article will help you to get started with that. I am going to explain the steps involved in creating a new maven project and pushing it to gitHub. Before creating local project its better to create...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/14/create-maven-project-in-github",
        "teaser":null},{
        "title": "Using consumer functional interface",
        "excerpt":"This article will explain the basics of using consumer functional interface. Consume is one of the many available functional interfaces in Java. This interface can be used when we need to take an object and process it but with out returning anything. Below image will show you how it looks...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/17/using-consumer-functional-interface",
        "teaser":null},{
        "title": "Quick way to create List, Set and Map",
        "excerpt":"Java 9 introduced of() static methods in List, Map and Set interfaces. This method will help us to create collection easily. I got surprised to see this method, it is lot easier to use and easier to remember and less verbose. Lets see some examples of using this method. //list...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/21/quick-way-to-create-list-set-and-map",
        "teaser":null},{
        "title": "Reduce stream to single value",
        "excerpt":"Lets say we want to return the sum of all numbers in a list, there are multiple ways in Java we can achieve this, one of the way is using a for loop to iterate the list by keeping track of current sum in a temporary variable, like below: List&lt;Integer&gt;...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/24/reduce-stream-to-single-value",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-reduce-the-streamto-single-value.png"},{
        "title": "Functions cheat sheet",
        "excerpt":"Functional interface will have single abstract method and they provide target types for lambda expressions. There are many functional interfaces in Java and they all are available in java.util.function package. I tried to organize all of them with a logical diagram and table. Table contains interface name and abstract method....","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/03/28/functions-cheat-sheet",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-functions-cheat-sheet.png"},{
        "title": "Recipes for Optional",
        "excerpt":"Optional allows us to wrap a nullable object in it so we can make a method to return Optional instead of bare object. There is a possibility that below method can return null; so we need to explicitly do the null check on the returned object before using it. Employee...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/04/03/recipes-for-optional",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-recipes-for-optional.png"},{
        "title": "Infinite streams",
        "excerpt":"Streams allows us to generate endless progression of discrete objects. There are couple of methods available in Java which will help us to generate infinite sequences. With streams There are four main stream interfaces in java.util.stream package; Stream, IntStream, LongStream and DoubleStream. All of these interfaces have a common method...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/04/08/infinite-streams",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-infinite-streams.png"},{
        "title": "Regex Tester With Spring Shell",
        "excerpt":"Spring framework is the suite of many projects, using which we can develop wide variety of applications. These applications may need user interaction, the most common way is to have a web interface. Not all applications need to have a web interface, a simple command line interface can be suffice...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/04/11/regex-tester-with-spring-shell",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-regex-tester-with-spring-shell.png"},{
        "title": "How ConcurrentModificationException is thrown?",
        "excerpt":"How concurrent modification detection logic works and on what basis ConcurrentModificationException is thrown? This article will explain these questions. Iterating a collection is one of the important operation we usually perform and it can be a time consuming if collection is big enough. Iterator interface is the responsible for iterating...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/04/15/how-concurrentModificationException-is-thrown",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-How-ConcurrentModificationException-is-thrown_.png"},{
        "title": "Introduction to java.time - Part 1",
        "excerpt":"This article will provide introduction to the java.time package. This package is introduced in Java 8 version and it contains many classes and interfaces to represent and process dates and times. Below are the five most basic classes you need to know in this package. LocalDate: a date without a...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/04/18/introduction-to-java-time-part1",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-intro-to-java-time-part1.png"},{
        "title": "Strategy design pattern",
        "excerpt":"This article will explain the strategy design pattern using functional interfaces. Sometimes application may need to execute an algorithm conditionally. Here the algorithm means nothing but a strategy, execution of this strategy depends on runtime conditions or it depends on the input received from the user. For example, sorting a...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/04/22/strategy-design-pattern",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-strategy-design-pattern.png"},{
        "title": "Simple Introduction to ForkJoin Framework - Part 1",
        "excerpt":"ForkJoin framework allows us to execute tasks in a thread based environment. We need to pass tasks to this framework and this framework will execute them efficiently. This framework provides all the required utility classes which will handle all nitty-gritty things like maintaining the thread pool and running the tasks,...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/05/03/simple-introduction-to-forkjoin-framework-part1",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/simple-introduction-to-forkjoin-framework-part1.png"},{
        "title": "Simple Introduction to ForkJoin Framework - Part 2",
        "excerpt":"In the first part of this series we went through the introduction on ForkJoin framework. In this article we will go through code example to create a ForkJoinTask using RecursiveAction. RecursiveAction is an abstract class and it is one of the subclass of ForkJoinTask. In order to create a divisible...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/05/03/simple-introduction-to-forkjoin-framework-part2",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/simple-introduction-to-forkjoin-framework-part2.png"},{
        "title": "Introduction to java.time - Part 2",
        "excerpt":"Part 1 of this series explained the basic time related classes in java.time package and different approaches to create them. In this post we will see how to retrieve time values from these classes. Once the date and time objects are created, we can get information from it using various...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/05/13/introduction-to-java-time-part2",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/blog-banner-intro-to-java-time-part2.png"},{
        "title": "Chain of responsibility",
        "excerpt":"Chain of responsibility is one of the behavioral design pattern in Gang of Four patterns. The main objective of this design pattern is processing a command. For example, command can be any application related task like approving a transaction, writing text to a log file or filtering HTTP requests. We...","categories": ["java"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/05/17/chain-of-responsibility-design-pattern",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/chain-of-responsibility-design-pattern.png"},{
        "title": "ReactiveX Introduction",
        "excerpt":"ReactiveX library helps us to write applications to handle asynchronous events emitted over the time. Before understanding how to handle these events, lets go through some examples to see why we need this library. Lets assume we want to list out all the users who logged in to an application....","categories": ["reactiveX"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/06/06/reactivex-introduction",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/reactiveX-introduction.png"},{
        "title": "Docker Introduction",
        "excerpt":"Lets say we have a Java based reservation application which depends on JRE, MySQL and Tomcat to run. To have this application setup we need to install all these dependencies, configure and then run the application. Not just on single environment, we need to do this setup in multiple environments...","categories": ["docker"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/06/09/docker-intro",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/docker-introduction.png"},{
        "title": "Using SDKMAN to manage SDK's",
        "excerpt":"Some times we may want multiple java versions on our computer. Lets say we want to have java 8 to run a personal application and java 7 to run a old tool. We can install both of them but depending on what we working on, we may need to switch...","categories": ["tools"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/06/13/using-sdkman-to-manage-sdks",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/using-sdkman-to-manage-sdks.png"},{
        "title": "ReactiveX Observables",
        "excerpt":"Observable emit values over the time and the observer who is interested to receive those values should subscribe for it. On the availability of values observable will push them to subscribers/observers. Observer will not wait for the values instead it will act only when the value is pushed towards it....","categories": ["reactiveX"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/06/15/reactivex-observables",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/reactiveX-observables.png"},{
        "title": "Spring Cloud Configuration - Part 1",
        "excerpt":"Configuration can be any key value pair information needed by the application at runtime. Spring applications accepts configuration in many ways like command line arguments, OS environment variables or application properties and so on. In the context of microservices we can have multiple applications running together and if each application...","categories": ["spring"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/06/27/spring-cloud-config-basics-part-1",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/spring-cloud-config-basics-part-1.png"},{
        "title": "Spring Cloud Configuration - Part 2",
        "excerpt":"In Part 1 we created git repository and config server. In this article we will create a pet-store application which is also a client for the configuration server, because pet-store will request application properties from config server. Create Configuration Client Go to start.spring.io to generate spring project with web, config-client...","categories": ["spring"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/07/11/spring-cloud-config-basics-part-2",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/spring-cloud-config-basics-part-2.png"},{
        "title": "Pull And Run First Docker Image",
        "excerpt":"Docker image is a file, which contains set of commands. When these commands are executed, instance of the image is created and this instance is called Container. We can assume image files are like Java’s class files and objects are container instances. Pull docker image Docker Store is a central...","categories": ["docker"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/07/22/pull-and-run-first-docker-image",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/pull-and-run-first-docker-image.png"},{
        "title": "8 Quick Ways To Create Observables",
        "excerpt":"Many operators are available in RxJava to create observables. In this post I will go through each of them with examples. In the context of reactive programming, operator is nothing but a function which performs some operation, there are many types of operators available like creation, transforming, filtering, error handling,...","categories": ["reactiveX"],
        "tags": [],
        "url": "http://localhost:4000/code-blogger/blog/2018/07/24/observables",
        "teaser":"http://localhost:4000/code-blogger/assets/images/banners/reactiveX-observables.png"}]
