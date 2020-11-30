---
title: "Spring Cloud Gateway - Part 2"
date: 2020-11-30 12:11:10 -0500
categories: java
image: /assets/images/banners/spring-cloud-gateway-part-2.png
description: "This is the second part of Spring cloud gateway tutorial. We will learn the basics and configure the Spring Cloud Gateway. We will go through the sample project and run it to see the results, and also, we will see how to configure Filters to change request and response."
---

In **[Part 1]({{site.baseurl}}/spring-cloud-gateway-part-1/)** of this tutorial series, we learned to configure routes using Predicates. Predicates help us to define the conditions on the request to match the Route. In this article, we will learn about Filters.

Filters allow us to modify the request and response. For example, We can add a customized header to the HTTP request so all downstream services can use it. In the same way, we can add a header in the HTTP response to the client.

Spring Cloud Gateway comes with many Filter factories; We can configure them easily in the configuration file or customize it using **RouteLocatorBuilder**. In this article, we learn configuring filters but not customizing them.

We continue to use the same project we downloaded in **[Part 1]({{site.baseurl}}/spring-cloud-gateway-part-1/)**. If you want to download it again, click on this **[link](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.4.0.RELEASE&packaging=jar&jvmVersion=11&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=cloud-gateway)**. Open it in the editor and modify application.yml with the below content.

### Add Request Header Filter

Open **application.yml** and add Request Header filter to the request.

{% highlight yml %}
server:
  port: 9091
spring:
  cloud:
    gateway:
      routes:
        - id: one
          uri: https://httpbin.org/
          predicates:
            - Path=/get
          filters:
            - AddRequestHeader=X-Request-AppId, 238732
{% endhighlight %}

* Configured API gateway to use port 9091.
* Predicate will redirect the requests to **https://httpbin.org/** if the request starts with the path **/get'**.
* Filter will add a header in the HTTP request. In this case, we want to add an HTTP header with key **X-Request-AppId** and value as **238732**

Run the application and execute a CURL command to make a get request to 'http://localhost:9091/get.'

{% highlight bash%}
curl http://localhost:9091/get
{
 "args": {}, 
 "headers": {
  "Accept": "*/*", 
  "Content-Length": "0", 
  "Forwarded": "proto=http;host=\"localhost:9091\";for=\"0:0:0:0:0:0:0:1:58775\"", 
  "Host": "httpbin.org", 
  "User-Agent": "curl/7.54.0", 
  "X-Amzn-Trace-Id": "Root=1-5fbc29e7-0f7fffaa50c1c198661a2ecf", 
  "X-Forwarded-Host": "localhost:9091", 
  "X-Request-Appid": "23452"
 }, 
 "origin": "0:0:0:0:0:0:0:1, XX.XX.X.XXX", 
 "url": "https://localhost:9091/get"
}
{% endhighlight %}

We made a GET request on /get endpoint, and this request will match with the Path '/get' which we mentioned in the Predicate, so the request directs to https://httpbin.org/, and along with that, our Filter will add a new header to the Request. HttpBin will send us back the response with all our request headers as a JSON body. We can see our Request header in the JSON response.

### Rewrite Path Filter

Rewrite Path is one of the Filters, which is part of Spring Cloud Gateway, which I want to explain along with AddRequestHeader Filter in this article. For instance, if we want to redirect traffic to multiple different services based on the path, we can use it to direct the traffic. Following Route configuration will help you to understand how this will work.

{% highlight bash %}
server:
  port: 9091
spring:
  cloud:
    gateway:
      routes:
        - id: one
          uri: http://localhost:8080/
          predicates:
            - Path=/retail/**
          filters:
            - RewritePath=/retail(?<segment>/?.*), $\{segment}
        - id: two
            uri: http://localhost:8081/
            predicates:
              - Path=/banking/**
            filters:
              - RewritePath=/banking(?<segment>/?.*), $\{segment}
{% endhighlight %}

* RewritePath will take two arguments; regular expression and replacement parameter, regular expression will contain the root context and the regExp to retrive the remaining part of the Path and this remaining part is used in the replacement parameter.
* HTTP calls received on **http://localhost:9091/retail/orders/1** will be directed to **http://localhost:8080/orders/1**
* HTTP calls received on **http://localhost:9091/banking/account/1** will be directed to **http://localhost:8081/account/1**

This configuration is useful for directing traffic to different downstream services and grouping them under a single context path.

There are many other predefined filters available. We can directly use them by configuring them in the application properties file.

### Conclusion

We learned to configure routes using Filter. Filters will modify the Request and response of the HTTP call. In this article, we used an Add Header filter and Rewrite Path filter to modify HTTP headers.