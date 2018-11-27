---
title:  "Spring Cloud Configuration - Part 1"
date:   2018-06-27 12:11:10 -0500
categories: spring
header:
  teaser: /assets/images/banners/spring-cloud-config-basics-part-1.png
---

Configuration can be any key value pair information needed by the application at runtime. Spring applications accepts configuration in many ways like command line arguments, OS environment variables or application properties and so on. In the context of microservices we can have multiple applications running together and if each application maintains its own set of configuration then a simple change in the configuration needs deployment or restart. If we have to change configuration in multiple applications then this approach is a time consuming and not efficient.

Alternative way is to have a config server application. The main purpose of this application is to manage configuration for all applications. All other applications on the startup will request configuration from the config server. Applications which request configuration are called config clients. Config server and config clients, both are the spring based applications.

With the config server and clients in the place now the config changes we make on the server will reflect on the client application with out deployment or restart. In the microservices environment this is a very useful setup because configuration for all applications are maintained at single location and the changes are reflected on the client applications with out restart or deployment.

## Config server setup

Config server is just another spring application which runs on its own port and manages config repository. Config repository is a location in which we can store application properties. Config server can support many types of repositories like git, local file system, database or vault back-end. By-default config server uses git folder as the repository.

### Create local Git repository

To create a local git repository make sure your computer have git installed. Open a terminal and create a git repository by executing below command;
{% highlight java %}
git init pet-store-repository
{% endhighlight %}

In this repository folder, create a configuration file for pet-store application. In the next part of this article we will create a pet-store application which uses config server to get configuration from this repository. To create a pet-store configuration for a dev profile we need to name file as *pet-store-dev.properties*. We can have multiple configurations for same application but different profiles. Lets just have a single property in it.

File: pet-store-dev.properties
{% highlight bash %}
message=Hello!
{% endhighlight %}

Add and commit this file to local repository by executing below commands;

{% highlight bash %}
git add -A
git commit -m "config"
{% endhighlight %}

Now our local git repository contains single configuration file. Lets create a config server.

Go to **[start.spring.io](https://start.spring.io/)** to generate spring project

* Change Artifact to *config-server-demo*
* Select *Config Server* as dependency
* Click on *Generate Project*

![Config server demo](/assets/images/posts/2018/06/spring-starter-config-server-demo.png){: height="500px" width="650px"}{: .align-center}

Unzip and open project in any IDE.

Open ConfigServerDemoApplication.java and add **@EnableConfigServer** annotation, like below;

{% highlight java %}
@SpringBootApplication
@EnableConfigServer
public class ConfigServerDemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConfigServerDemoApplication.class, args);
	}
}
{% endhighlight %}

**@EnableConfigServer** annotation will add configuration server features to the application. Update application.properties with below configuration;

File: application.properties
{% highlight bash %}
server.port= 8888
spring.cloud.config.server.git.uri= file://${user.home}/code/spring/pet-store-repository
{% endhighlight %}


Config server will startup on the port 8888. spring.cloud.config.server.git.uri property is for the path to the repository location. On my computer repository is located at /<user>/code/spring/pet-store-repository. If it is windows computer then provide three forward slashes 'file:///'

Start config-server-demo application and access URL **http://localhost:8888/pet-store/dev** in the browser. This should return below JSON

{% highlight bash %}
// 20180626222509
// http://localhost:8888/pet-store/dev

{
  "name": "pet-store",
  "profiles": [
    "dev"
  ],
  "label": null,
  "version": "1738976280ccd3ba3c776f28cffe8f5ecbd800fd",
  "state": null,
  "propertySources": [
    {
      "name": "file:///Users/pradeep/code/spring/pet-store-repository/pet-store-dev.properties",
      "source": {
        "message": "Hello!"
      }
    }
  ]
}
{% endhighlight %}

We can see *message* property in the JSON. Config server wraps properties with some meta information, like version and profile. We can access this JSON with various URL combinations. Look for the config server startup logs to see all URL end points server can accept. If we update properties and refresh the browser we should see new changes in the JSON response. Config server will always serve updated properties from the repository

Below image shows the link between server, repository and client applications.

![Config server with client applications](/assets/images/posts/2018/06/config-server-with-clients.jpg){: height="500px" width="650px"}{: .align-center}

## Conclusion

In this post we created git repository with single configuration file and a config server. In the next part we will create a pet-store application which will request properties from the config server. 