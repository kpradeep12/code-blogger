---
title:  "ReactiveX Introduction"
date:   2018-06-06 12:11:10 -0500
categories: reactiveX
header:
  teaser: /assets/images/banners/reactiveX-introduction.png
---

ReactiveX library helps us to write applications to handle asynchronous events emitted over the time. Before understanding how to handle these events, lets go through some examples to see why we need this library.

Lets assume we want to list out all the users who logged in to an application. To achieve this, we can declare a method which returns Future like below.

{% highlight java %}
Future<List<User>> getUsers()
{% endhighlight %}

getUsers is asynchronous method because it returns Future. Asynchronous operations will not block the caller, instead they allows us to register a callback and this callback is executed when the response is returned. Instead of waiting for the response caller will get a chance to execute some other code. Internally getUsers() may make database or rest call on a different thread. Callback is executed when the list of users are available.

Within the callback we can iterate the list of users. Lets say below is the list of users we got in the list;

{% highlight bash %}
John
Kate
Williams
{% endhighlight %}

Till now it is good, but what if a new user logs into the application? for example, Bob just logged-in, but our method will not return Bob because our method returns only the users logged in at the time of method execution. How to get Bob in our list? not only just Bob, how to get users who continue to login? Future is not helpful in this case because it is executed and returned only once.

To achieve this, we need a caller and callee to be connected to each other because users can login at any time and callee can notify caller whenever a new user logs into the application, means we need a push based mechanism, callee will push data to the caller and because both are connected so callee can push data whenever a new user logs in.

Future is a pull based because caller will call getUsers to pull the list of users.

## Observables

Observables will help us to achieve our goal to process continuous events asynchronously. We will need to understand two important entities; Observable and Observer. Observable is the one who pushes data and observer will listen and process the data.

We can change getUsers method like below, which returns the Observable.

{% highlight java %}
Observable<User> getUsers()
{% endhighlight %}

Observable allows observer to subscribe on it so when ever a new user logs into the application then observer gets the notification. Observable is based on Observer design pattern in Gang of Four's patterns but the only difference is reactiveX observable can send error and complete notifications. Connection between observable and observer continues to stay active until either error or completion occurs. Error and Complete are two special events Observable can push to the observer.

Observable will send an error notification if any error occurs and terminates the connection. This error notification will help the observer to get more information about the error. If everything is fine and at the end, observable will send a complete notification to let observer know that there are no more values available to send.

## Conclusion

ReactiveX library uses Observables to operate on discrete values that are emitted over the time. These emitted values are independent of each other and these values are handled asynchronously. ReactiveX will take care of all low-level threading mechanisms and this library supports various types of operators, some of them are like filter, merge, max and map, these operators will help us to process the incoming values. ReactiveX is a polyglot implementation, means it is implemented in various languages.