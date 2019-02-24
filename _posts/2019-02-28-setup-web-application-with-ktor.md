---
title:  "Setup Web Application With Ktor"
date:   2019-02-28 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/create-rest-services-using-ktor.jpg
description: ""
---

Its easy to create a web application with **Ktor**. In this article I will explain the tools we need and the process for developing a small CRUD based web application. I will take **Employee** as an entity to demonstrate this application. To develop this application we are going to use below frameworks/libraries.

* Ktor framework: Develop asynchronous servers and clients.
* FreeMarker: Template engine to generate text output. We are using it for HTML pages.
* H2 database: In-memory and very fast database.
* Exposed SQL library: Light weight library for database access.

If you are new to Exposed and Ktor framework then please go through below series of articles. These articles will give you basic understanding with examples.

* [Exposed SQL Library]()
* [Ktor rest]()

We will develop some web pages using Freemarker to show employees and to add/edit employee. To construct these web pages we are going to use **Bootstrap** CSS framework, because bootstrap provides many styles to develop web pages faster. We are going through below checklist to develop this application.

**Table of contents**
* Create Kotlin project
* Add and configure **Ktor** framework
  - Configure Netty embedded server
* DAO layer for database
  - Create DAO
  - Integrate Exposed with Ktor
* Configure FreeMarker
  - Create templates
  - Declare controllers
{:toc}

> Please note that this whole project setup is available in [github](https://github.com/kpradeep12/myprojects/tree/master/ktor-rest)

### Create Kotlin project

First step is to create Kotlin project. Execute below command to create an empty maven Kotlin project. Once the project is created then import it into your favorite editor.

{% highlight bash %}
mvn archetype:generate \
-DgroupId=net.thetechstack \
-DartifactId=ktor-freemarker \
-DarchetypeGroupId=org.jetbrains.kotlin \
-DarchetypeArtifactId=kotlin-archetype-jvm \
-DarchetypeVersion=1.3.20 \
-DinteractiveMode=false
{% endhighlight %}

> I executed this command on Maven 3.6.0 version.

This command will create new project with standard Maven folder structure and having default **Hello.kt** file. Rename this file to **Application.kt** because this will contain **main()** function and it will be starting point of our server execution.

### Add and configure Ktor framework

Adding **Ktor** framework to the project is easy, just add below dependencies to your pom.xml.

Group Id | Artifact Id | Version | Description
--- | --- | --- | ---
io.ktor | ktor-server-core | 1.1.2 | Ktor core library
io.ktor | ktor-server-netty | 1.1.2 | Ktor supports Jetty, Netty and Tomcat as embedded servers. In this article I am using Netty.
ch.qos.logback | logback-classic | 1.2.3 | Ktor needs SLF4J implementation for logging
{: .table .table-striped}

#### Configure Netty embedded server

Go to **Application.kt** and update it with below code.

{% highlight java %}
package net.thetechstack

import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    embeddedServer(Netty, port = 8080){ }.start(wait = true)
}
{% endhighlight %}

**embeddedServer** function will initiate and run the embedded server. We need to pass some important information to it, they are;

* Server instance type; We passed Netty. Ktor support Jetty and Tomcat as well.
* Port number on which the server will listen.
* Lambda instance of **Application**. WMore details about this in next section.

### DAO layer for database

We are using **Exposed** to connect and perform SQL operations on H2 in-memory database. We need to include required dependencies in the pom.xml so go to pom.xml and add below dependencies.

Group Id | Artifact Id | Version | Description
--- | --- | --- | ---
org.jetbrains.exposed | **exposed** | 0.12.1 | Light weight SQL library
joda-time | **joda-time** | 2.9.2 | Exposed depends on this library
com.h2database | **h2** | 1.4.191 | H2 is an in-memory database, its quick and easy to use.
{: .table .table-striped}

> To learn more about SQL library **Exposed** please read this [article]({{site.baseurl}}/light-weight-sql-kotlin-library)
> To learn more on DAO layer please read this [article]()

#### Integrate Exposed with Ktor

Lets integrate DAO layer with Ktor. We need to instantiate **DAOFacadeDatabase** by passing H2 in-memory database instance. Update **Application.kt** with below code;

{% highlight java %}
val dao = DAOFacadeDatabase(Database.connect("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", driver = "org.h2.Driver"))
fun main() {
    embeddedServer(Netty, port = 8080){
        dao.init()
    }.start(wait = true)
{% endhighlight %}

Instantiated **DAOFacadeDatabase** by passing H2 database instance and used this instance to create the tables by calling **init()**

### Configure FreeMarker

Update pom.xml with below dependency to add support for FreeMarker templates;

Group Id | Artifact Id | Version | Description
--- | --- | --- | ---
io.ktor | **ktor-freemarker** | 1.1.2 | FreeMarker library
{: .table .table-striped}

We will save all our FreeMarker templates in **resources/templates** directory so create these directories under **ktor-freemarker/src/main/**

{% highlight java %}
embeddedServer(Netty, port = 8080){
        dao.init()
        install(FreeMarker){
            templateLoader = ClassTemplateLoader(this::class.java.classLoader, "templates")
        }
    }.start(wait = true)
{% endhighlight %}

We installed **FreeMarker** feature on the request and response pipeline by passing FreeMarker configuration to **install** function. Configuration mentions the folder name of the FreeMarker templates and by default it will check under **resources** directory.

#### Create templates

We need three template files;

* **template.ftl**: This is the main template of our application. This contains the framework for our page.
* **index.ftl**: Default page which will list all employees and gives options to add/edit/delete employees.
* **employee.ftl**: This page allows us to add/edit employee

**template.ftl**
{% highlight html %}
<#macro mainLayout title="Welcome to Employee Database">
    <!doctype html>
    <html lang="en">
        <head>
            <title>${title}</title>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <div class="row mt-2 mb-2">
                    <div class="col">
                        <h3>Employees</h3>
                    </div>
                </div>
                <div class="row">
                    <#nested/>
                </div>
            </div>

            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        </body>
    </html>
</#macro>
{% endhighlight %}

This is the simple starter HTML page taken from **Bootstrap** website but I added some FreeMarker directives in it to make this page reusable. I used **macro** and **nested** directives;

**Macro** is used to store reusable templates and we can refer them with there names. In below code I created a macro with named **test**. This macro contains reusable block, in this case it is having **Hello** with in **p** tab. If I want to use then call it like **<@test/>** so the contents of the macro will be replaced. Below code will output 'Hello'.

{% highlight html %}
<#macro test>
    <p>Hello</p>
</#macro>

<@test/>
<@test/>
{% endhighlight %}

Macro can take parameters. We need to declare and pass value to it so it can be used in the template.

{% highlight html %}
<#macro test name>
    <p>Hello ${name}</p>
</#macro>

<@test name="World"/>
<@test name="FreeMarker"/>
{% endhighlight %}

> More information on the macro is available on the FreeMarker [site](https://freemarker.apache.org/docs/ref_directive_macro.html).

Instead of Macro having its own content we can pass content to it using **Nested**. In this case macro acts like a border around the nested. In below example instead of macro having the content we are passing 'Hello' to it and macro will replace <#nested> with the content.

{% highlight html %}
<#macro test>
    <#nested>
</#macro>
<@test><p>Hello</p></@test>
{% endhighlight %}

**template.ftl** uses macro and nested to define our web page structure. We called our macro as _mainLayout_ this contains and with in the body we have **nested** so what ever we pass to this macro will get all bootstrap dependencies. In future if we want to change the version of the bootstrap then this is the only file we need to change.

**index.ftl**
{% highlight html %}
<#import "template.ftl" as layout />
<@layout.mainLayout>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <#list employees as emp>
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.city}</td>
                <td>
                    <a href="/employee?action=edit&id=${emp.id}" class="btn btn-secondary float-right mr-2" role="button">Edit</a>
                    <a href="/delete?id=${emp.id}" class="btn btn-danger float-right mr-2" role="button">Delete</a>
                </td>
            </tr>
            </#list>
        </tbody>
    </table>
    <div class="container">
        <div class="row">
            <a href="/employee?action=new" class="btn btn-secondary float-right" role="button">New Employee</a>
        </div>
    </div>
</@layout.mainLayout>
{% endhighlight %}

**index.ftl** will show all employees in the table and allows users to add/edit/delete employees. We are importing **template.ftl** as **layout** because we need to pass this file contents as nested to it. Then we used layout to call the macro **<@layout.mainLayout>**

We used **list** directive to iterate employees and show them in the rows.

To add/edit we are passing **action** query parameter and for delete we are passing **id**

**employee.ftl**
{% highlight html %}
<#import "template.ftl" as layout />
<@layout.mainLayout title="New Employee">
    <form action="/employee" method="post">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" value="${(employee.name)!}">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email" value="${(employee.email)!}">
        </div>
        <div class="form-group">
            <label for="city">City</label>
            <input type="text" class="form-control" id="city" name="city" placeholder="Enter City" value="${(employee.city)!}">
        </div>
        <input type="hidden" id="action" name="action" value="${action}">
        <input type="hidden" id="id" name="id" value="${(employee.id)!}">
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</@layout.mainLayout>
{% endhighlight %}

* **Add**: _action_ hidden field contains _new_ or _edit_ based on the request.
* **Edit**: _id_ hidden field contains id of the employee which are editing.

#### Declare controllers


### Conclusion

