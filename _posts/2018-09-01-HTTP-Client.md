---
layout: post
title:  "HTTP Client"
date:   2018-09-01 12:11:10 -0500
categories: java
image: /assets/images/banners/HTTP_Client.png
author: pradeep
featured: false
---

In this article I will give a simple introduction of HttpClient class and then will use this class to develop a small HTTP program. This program will hit a HTTP end point at [http://numbersapi.com/](http://numbersapi.com/) This end point will take a number and returns an interesting fact about the given number.

In Java 11 HttpClient has moved from incubator module to base module under the java.net.http package. This package provides a high-level interfaces to HTTP and low-level interfaces to Websockets. This package provides all the required classes and interfaces to make a HTTP request.

We need to do below three actions to complete a full HTTP request

* Create HTTP request
* Create HTTP client
* Get HTTP response

Lets go through each of this action in below sections

## Create HTTP request

HttpRequest class represents the request object. This class contains all the functionality to handle HTTP requests some of them are like request URL, request headers, HTTP protocol version and request types (GET, POST, PUT).

{% highlight java %}
HttpRequest request = HttpRequest
                .newBuilder(URI.create("http://numbersapi.com/5"))
                .build();
{% endhighlight %}

newBuilder is a static method which will take a URI of the HTTP request and creates a Builder object. We called build on it to get HttpRequest object. If needed this request object can be cached to use multiple times.

## Create HTTP Client

Once we have request then we can pass it to HTTPClient. HTTPClient class is used to send and get the request and responses from the HTTP server. Below code snippet will send the request and returns the HTTPResponse.

{% highlight java %}
HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());
{% endhighlight %}

newHttpClient is a static method which will return an instance of HttpClient and we called send method on it. send method will take request and body handler instances. We will discuss about body handlers in the next section below. send is a synchronous call means this method will block the thread until the response receives from the server. We can make an asynchronous call by using sendAsync method like below

{% highlight java %}
HttpClient.newHttpClient()
        .sendAsync(request, HttpResponse.BodyHandlers.ofString())
        .join();
{% endhighlight %}

sendAsync returns CompletableFuture<HttpResponse<String>>. Both send and sendAsync methods we return HttpResponse object. We will use this object in the below section.

## Get HTTP response

send and sendAsync methods in the HttpClient takes the request and Body handlers. Body handlers are used to indicate the response type from the HTTP server, for example response can be a simple string, byte stream or it can be a file to download so BodyHandlers builds the instance of HttpResponse, this is the reason HttpResponse is an interface and BodyHandler will create its instance based on the response type.

Below contains two code snippets to handle response with send and sendAsync;

{% highlight java %}
HttpRequest request = HttpRequest
                .newBuilder(URI.create("http://numbersapi.com/5"))
                .build();
//sync call
HttpResponse response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());

//async call
HttpClient.newHttpClient()
        .sendAsync(request, HttpResponse.BodyHandlers.ofString())
        .thenApply(HttpResponse::body)
        .thenAccept(System.out::println)
        .join();
{% endhighlight %}

Output
{% highlight bash %}
5 is the number of dots in a quincunx.
5 is the number of permanent members with veto power on the United Nations Security Council.
{% endhighlight %}

[http://numbersapi.com/](http://numbersapi.com/) responds with a random interesting fact about the provided number. In the above code snippet I made two HTTP calls (sync and async) for number 5 so there are two lines.

Now we have completed all three actions for a HTTP transaction now lets enhance this using Java streams. Lets make five HttpRequests with random numbers.

{% highlight java %}
new Random().ints(5, 1, 100)
        .mapToObj(number -> String.format("http://numbersapi.com/%d", number))
        .map(url -> HttpRequest.newBuilder(URI.create(url))
                .build())
        .map(request -> HttpClient.newHttpClient()
                .sendAsync(request, HttpResponse.BodyHandlers.ofString()))
        .forEach(response ->
                response.thenApply(HttpResponse::body)
                        .thenAccept(System.out::println)
                        .join()
        );
{% endhighlight %}

Output
{% highlight bash %}
91 is the atomic number of protactinium.
33 is the temperature at which water boils according to the Newton scale.
58 is the minimum wind speed (mph) needed to issue a Severe Thunderstorm Warning.
17 is the number of flames emanating from the grenade cap-badge of the Grenadier Guards.
8 is the number of principles of Yong in Chinese calligraphy.
{% endhighlight %}
We are generating five random numbers between 1 and 100 and mapping them to URL's and then creating HttpRequest for each URL and making requests with HttpClient, finally displaying the body content in the console.

## Conclusion

We went through different classes and interfaces in java.net.http package and created some sample HTTP requests.