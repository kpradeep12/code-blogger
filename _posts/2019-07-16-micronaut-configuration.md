---
title:  "Cloud Configuration With Micronaut and Consul"
date:   2019-07-16 12:11:10 -0500
categories: cloud
image: /assets/images/banners/Micronaut-cloud-configuration-with-consul.png
description: "Services may be running on multiple machines/containers, and if each service has its copy of the configuration, then it is a very tedious job to change and restart all instances, in cloud environments we can resolve this issue by publishing configuration at a single location and allowing all services to read it. We learn more about this by developing a sample application using Micronaut and Consul."
---

**[Micronaut](https://micronaut.io/)** is one of the new framework available to Java world which helps in developing web, cloud, and serverless applications. Recently we see many new frameworks evolving like **Quarkus** from Ret Hat and **Helidon** from Oracle.

We already have **Spring** framework, which is the most famous framework and which used in the majority of applications in the enterprise world, but why we need new frameworks? Spring framework can do most of the things, but at the same time, it consumes much memory and takes a while to start because it depends on runtime reflection to process annotations. All the other frameworks which we mentioned earlier works on compile-time annotation processing and they take milliseconds to one or two seconds to startup and consumes very less memory. These frameworks are a good fit in developing microservices.

In this article, we use **Micronaut** to develop a simple microservice, and then we configure it with cloud configuration. Why do we need a cloud configuration? In the microservices world, we need to scale our app based on the demand so we might have multiple instances of the app running on different machines/containers. It is challenging to maintain the same configuration at each application instance because it involves much maintenance, to overcome this we can keep our configuration at a single location and make all app instances to fetch their configuration from this central location.

* Create Micronaut project
* Install Consul
* Create Controller
* Insert Key/Value pairs in Consul
  - Web application
  - CURL Key/Value
  - CURL file
* Handle multiple environments  
* Conclusion
{:toc}

> Source code of this project is available at [github](https://github.com/kpradeep12/techstack-projects/tree/master/micronaut-config)

### Create Micronaut project

Creating a new Micronaut project is so simple with a Micronaut CLI tool. Installing is simple if you have SDKMAN. Execute below command;

{% highlight console %}
sdk install micronaut
{% endhighlight %}

There are many other ways to install Micronaut. Follow this [link](https://docs.micronaut.io/1.2.0.RC2/guide/index.html#buildCLI) to know more about other options.

After the installation completes, navigate to any folder from your terminal where you want to create new Micronaut project, then execute below command;

{% highlight console %}
mn create-app micronaut-config --features config-consul
{% endhighlight %}

This command creates an empty project with a cloud configuration feature. By default, it creates a gradle project but if you wish to create a Maven-based then supply '--build maven' option.

Open the newly created project in your favorite IDE, and configure it to compile your project, follow the steps based on the information given [here](https://docs.micronaut.io/1.2.0.RC2/guide/index.html#ideSetup).

We have our new project ready. Navigate to the source code and see how the project is structured. Important file to see is **src/main/resources/bootstrap.yml**

Micronaut adds bootstrap.yml to the project because we added 'config-consul' feature. This file gets loaded first, and it contains important information about the **CONSUL** instance. Consul is a tool which helps in managing microservices; its main features are service discovery, service mesh, and configuration. In our case, it helps us to maintain configuration in a single location.

### Install Consul

We have our project ready now let's install **CONSUL**. There are various ways to install Consul. I used precompiled binaries and its easy. Follow the instructions [here](https://www.consul.io/docs/install/index.html#precompiled-binaries).

Once the installation completes then run Consul by executing below command;

{% highlight console %}
consul agent -server -bootstrap-expect=1 -data-dir <PATH TO CONSUL DATA>/data/ -config-dir <PATH TO CONSUL DATA>/config-data/ -ui -bind=<IP ADDRESS>
{% endhighlight %}

Replace <PATH TO CONSUL DATA> with any folder on your computer which Consul can use to persist data and configuration and replace <IP ADDRESS> with your computers IP. Once the Consul started running, then we can access it from the browser at [http://localhost:8500/ui/](http://localhost:8500/ui/). Navigate to 'Key/Value' from the top menu which directs us to the configuration page.

### Create Controller

Let's create our first controller with proper annotations and an endpoints. Create a new package, 'api' under micronaut.config and create UserController.java with the following content.

{% highlight java %}
package micronaut.config.api;

import io.micronaut.context.annotation.Value;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/user")    // <1>
public class UserController {
    @Value("${welcome-message:Hello all!}")    // <2>
    private String message;

    @Get(produces = MediaType.TEXT_PLAIN)
    public String index() {     // <3>
        return message;
    }
}
{% endhighlight %}

  **<1>** UserController class is annotated with **@Controller** annotation with **/user** as endpoint.  
  **<2>** A String field **message** is declared with **@Value**. This annotation contains two parts **key** and **default value**. It tries to load the configuration value at welcome-message and if it does not find then returns the default value. In this case, the default value is 'Hello all!'  
  **<3>** index() method returns the value in message property.

Our controller is ready so let's run micronaut.config.Application.java. If no errors in the console then you can hit http://localhost:8080/user/. Index page shows the default message 'Hello all!' because we not configured any value for welcome-message.

On my computer, I got below exception in IntelliJ Idea editor. I solved it by enabling 'Include dependencies with Provided scope' checkbox in **Run > Edit Configuration** in the menu.

{% highlight bash %}
Exception in thread "main" java.lang.NoClassDefFoundError: io/micronaut/context/ApplicationContextBuilder
{% endhighlight %}

### Insert Key/Value pairs in Consul

On application startup, you should see a log message like 'Resolved 0 configuration sources from client: compositeConfigurationClient(consul)' This mentions the count of configurations it resolved from Consul is zero because we not yet configured any value. There are many ways to insert key/values in Consul. 

##### Web application

Before proceeding, make sure Consul is up
* Access Consul at http://localhost:8500/ui/
* Go to Key/Value from the top menu.
* Micronaut expects configurations to be under **config** folder. Consul allows us to create folders to organize Key/Values. To create a config folder, click on **Create** button. In the 'Key or folder' field enter **config/** when a key ends with a backslash then that is converted to a folder. Click on **Save**.
* Create [application name] folder under config/ . Micronaut expects config/[application name] as folder structure in Consul. Navigate to config/ folder and in the 'key or folder' field enter **micronaut-config/** and click on **Save**
* Under config/miconaut-config/ create new key/value pair; In 'Key or folder' field enter 'welcome-message' and in the value enter 'Hello World From Consul.', then click on Save.

We have our first Key/Value pair. Let's restart our app and see if it picks up our configuration. Access app at http://localhost:8080/user/ it should show 'Hello World From Consul.'

##### CURL Key/Value

If you have multiple Key/Value pairs, then it is tedious to manage them from web application. We can use the Consul REST API to do the same operation with CURL. Before that, delete existing 'welcome-message' key, then from a terminal execute below command.

{% highlight console %}
curl -X PUT -d @- localhost:8500/v1/kv/config/micronaut-config/welcome-message <<< 'Hello World From Consul'
{% endhighlight %}

New key-value pair got created at config/micronaut-config, now restart the app and see if it picks up this value.

##### CURL file

Instead of having multiple key-value pairs, we can organize all properties in a single file and upload them at once. It is an even more straightforward approach comparing to maintaining multiple key/value pairs; we can keep all our application-specific properties in a single file. Before working on this approach, delete existing key 'welcome-message.' Now create a new yml file in your computer, let's call it micronaut-config.yml and put below content in it.

{% highlight yml %}
welcome-message: Hello World From Consul
{% endhighlight %}

Upload this file to Consul using CURL, in terminal navigate to the location where micronaut-config.yml is created and execute below command.

{% highlight console %}
curl -X PUT --data-binary @./micronaut-config.yml localhost:8500/v1/kv/config/micronaut-config
{% endhighlight %}

Restart the application, and it should pick up welcome-message.

### Handle multiple environments

Micronaut supports multi-environment configurations. It helps us to create multiple versions of our configuration based on the environment. Assume our local environment as **dev**, and let's create a configuration for dev version. Before that let's delete 'micronaut-config' folder in Consul.

Micronaut expects environment-specific configurations should be at **config/[application name],[environment]** location. So execute below CURL command to upload file to new environment specific location.

{% highlight console %}
curl -X PUT --data-binary @./micronaut-config.yml localhost:8500/v1/kv/config/micronaut-config,dev
{% endhighlight %}

Note that application is not yet aware of its environment, so if you restart the app, it does not pick 'welcome-message' because now configurations are in **dev** space. We need to make the application to know about its environment so pass VM option **-Dmicronaut.environments=dev** to JVM. In IDE's you can pass this to JVM by editing run configurations. In IntelliJ you can edit configurations by going to **Run > Edit Configuration**

Now the app is aware of its environment, but by default, Micronaut assumes configuration as Key/Values, so we need to update bootstrap.yml to add new configuration which tells Micronaut to read the file. Add below configuration in bootstrap.yml (consul.client.config.format: YAML)

{% highlight yml %}
micronaut:
  application:
        name: micronaut-config
  config-client:
    enabled: true
consul:
  client:
    registration:
      enabled: true
    config:
      format: YAML
    defaultZone: "${CONSUL_HOST:localhost}:${CONSUL_PORT:8500}"
{% endhighlight %}

Now restart the application, and it should pick welcome-message from dev folder. You can add multiple environment folders for the same application.

### Conclusion

We created a new Micronaut application and integrated with Consul to read the configuration on startup. Multiple instances of services read the configuration from Consul instead of from its local classpath.
