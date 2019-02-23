---
title:  "Create REST services using Ktor"
date:   2019-02-23 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/create-rest-services-using-ktor.jpg
description: "Learn Ktor framework by creating a REST service. This service will use SQL library called Exposed to perform database operations."
---

**Ktor** is a lightweight framework written in Kotlin programming language. This framework allows us to create asynchronous servers and clients. In this article I will explain the basics of **Ktor** framework by creating a simple REST service. This service will listen on GET, POST, PUT and DELETE requests and perform CRUD database operations. I will use **Exposed** for database operations.

In this article we are creating a simple REST service with CRUD operations. To develop this application we are going to use Kotlin programming language with below frameworks/libraries.

* Ktor framework
* H2 in-memory database
* Exposed SQL library

Following is the checklist of items we will go through in this article.

* Create Kotlin project
* Add and configure **Ktor** framework
  - Configure Netty embedded server
  - Understanding Ktor
  - Configure Routing
  - Test Ktor server
* DAO layer for database
  - Add **Exposed** and **H2**
  - Create Model and Mapping
  - Create DAO
  - Integrate Exposed with Ktor
* Configure REST controllers
  - Create GET, PUT, POST and DELETE requests
  - Test HTTP endpoints with cURL
{:toc}

> Please note that this whole project setup is available in [github](https://github.com/kpradeep12/techstack-projects/tree/master/ktor-rest)

### Create Kotlin project

First step is to create Kotlin project. Execute below command to create an empty gradle Kotlin project. Once the project is created then import it into your favorite editor.

{% highlight bash %}
mkdir ktor-rest
cd ktor-rest
gradle init --type kotlin-application

Select build script DSL:
  1: groovy
  2: kotlin
Enter selection (default: kotlin) [1..2] 

Project name (default: ktor-rest): 
Source package (default: ktor.rest): net.thetechstack

{% endhighlight %}

> I executed this command on Gradle 5.2.1 version. You can choose to create kotlin project with any other build tool.

This command will create new project with standard folder structure with default **App.kt** file.

### Add and configure Ktor framework

Adding **Ktor** framework to the project is easy, just add below dependencies to your build.gradle

{% highlight java %}
val ktor_version = "1.1.3"

dependencies {
    //..
    implementation("io.ktor:ktor-server-core:$ktor_version")
    implementation("io.ktor:ktor-server-netty:$ktor_version")
    implementation("io.ktor:ktor-jackson:$ktor_version")
    implementation("ch.qos.logback:logback-classic:1.2.3")
}
{% endhighlight %}

#### Configure Netty embedded server

Open **App.kt** and update it with below code.

{% highlight java %}
package net.thetechstack

import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.jackson.jackson
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    embeddedServer(Netty, port = 8080){ }.start(wait = true)
}
{% endhighlight %}

**main()** function is the starting point of the Kotlin program. We will initialize and start embedded server by passing required information and then we will block main thread such that embedded server can stay live and listen for the requests.

We called **embeddedServer** function. This function will initiate and run the embedded server. We need to pass some important information to it, they are;

* Server instance type; We passed Netty. Ktor support Jetty and Tomcat as well.
* Port number on which the server will listen.
* Lambda instance of **Application**. More details about this in next section.

**start** function make server to start and we passed **wait = true** to block main thread such that server can listen for the requests.

> Now you can run **main()** function and should see Ktor server startup logs in the console. Server should start with out any errors but we can not test it yet because no end points are defined.

#### Understanding Ktor

In the previous section a lambda instance which runs with in the context of **Application** is passed to **embeddedServer** function. This lambda instance is the where real Ktor framework comes into picture. I am not going into deeper details because it is not in the context of this article, but I will explain the basics.

Ktor works on the concept of **features**. A Feature is a functionality that we want to put it in the request and response pipeline. Below are some of the examples;

* Logging client requests
* Handling sessions
* Authenticating client requests

Ktor provides many features but they are not included in the pipeline by default. We can customize or use any third party features. In-order to use these features we need to install them. Installing features is so easy, just need to pass the features to the **install** function. In the below code we installed **CallLogging** and **ContentNegotiation** features.

{% highlight java %}
fun main() {
    embeddedServer(Netty, port = 8080){
        install(CallLogging)
        install(ContentNegotiation){
            jackson {}
        }
    }.start(wait = true)
}
{% endhighlight %}

* CallLogging is to log client requests
* ContentNegotiation is used to convert JSON messages. Ktor supports **Jackson** and **GSON** but in this article I used **Jackson**. We can customize this library by passing configuration object but here I am not customizing it.

Once the features are installed then Ktor will listen for the requests. Here we not yet configured end-points so it will not listen for anything. In the next section we will define routing where we will declare some end-points.

#### Configure Routing

Routing will allow us to configure end points of the REST service. In below code I configured a single route;

{% highlight java %}
embeddedServer(Netty, port = 8080){
        //install() ...
        routing {
            route("/employees") { // matches the URL which ends with /employees
                get { // matches the GET verb
                    call.respond("Employees test")
                }
            }
        }
    }.start(wait = true)
{% endhighlight %}

Looking at the code it understands that we created a parent **routing** context and with in this we have a single **route('/employees')**. We have **get** under this route so requests with GET on this route will end up in this block. Another approach to configure routing is using **Location** annotation. To make it simple I am not using this approach in this tutorial.

**call** is the instance of the **ApplicationCall** which is part of the **get** context and this instance contains properties to access request and response. Here we just reponding with some text 'Employees test'

#### Test Ktor server

By now we have routing configured with single endpoint. To make sure everything is working fine, lets start our application and test it. Run **main()** function and check for no errors in the console log. Open terminal/command prompt and enter below cURL command.

{% highlight bash %}
$ curl http://localhost:8080/employees
$ Employees test
{% endhighlight %}

By default curl sends GET request. Response contains 'Employees test' means our endpoint is working fine.

### DAO layer for database

We are using **Exposed** to connect and perform SQL operations on H2 in-memory database. We need to include required dependencies in the build.gradle so go to build.gradle and add below dependencies.

{% highlight java %}
dependencies {
    //...
    implementation("org.jetbrains.exposed:exposed:0.12.1")
    implementation("com.h2database:h2:1.4.191")
    implementation("joda-time:joda-time:2.9.2")
 
}
{% endhighlight %}

> To learn more about SQL library **Exposed** please read this [article]({{site.baseurl}}/light-weight-sql-kotlin-library)

#### Create Model and Mapping

We are using Employee entity as an example so lets create a new package **model** and add **Employee.kt** with below code.

{% highlight java %}
package net.thetechstack.model

data class Employee(val id: Int, val name: String,
                    val email: String, val city: String)
{% endhighlight %}

This is a simple data class with four fields. We want to maintain id, name, email and city for the Employee so the constructor needs all these values.

Create a new package **dao** and add **Employees.kt** file with below content;

{% highlight java %}
import org.jetbrains.exposed.sql.Table

object Employees: Table(){
    val id = integer("id").primaryKey().autoIncrement()
    val name = varchar("name", 50)
    val email = varchar("email", 100)
    val city = varchar("city", 50)
}
{% endhighlight %}

Employees is the mapping object for Employee. This object will give enough information for **Exposed** to map fields with the database table. This object acts like a object to table mapping.

#### Create DAO

Instead of directly performing database operations we are creating **DAO** layer. DAO (Data Access Layer) will wrap all database operations in it. Create **DAOFacadeDatabase.kt** file in **dao** package with below code.

{% highlight java %}
package net.thetechstack.dao

import net.thetechstack.model.Employee
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.Closeable

interface DAOFacade: Closeable{
    fun init()
    fun createEmployee(name:String, email:String, city:String)
    fun updateEmployee(id:Int, name:String, email:String, city:String)
    fun deleteEmployee(id:Int)
    fun getEmployee(id:Int): Employee?
    fun getAllEmployees(): List<Employee>
}
{% endhighlight %}

We created an interface, this defines the contract for DAO layer. We added all the methods needed to perform CRUD operations. With in the same class lets implement this interface.

{% highlight java %}
class DAOFacadeDatabase(val db: Database): DAOFacade{

    override fun init() = transaction(db) {
            SchemaUtils.create(Employees)
        }
    override fun createEmployee(name: String, email: String, city: String) = transaction(db) {
            Employees.insert {it[Employees.name] = name;
                it[Employees.email] = email; it[Employees.city] = city;
            }
            Unit
        }
    override fun updateEmployee(id: Int, name: String, email: String, city: String) = transaction(db) {
            Employees.update({Employees.id eq id}){
                it[Employees.name] = name
                it[Employees.email] = email
                it[Employees.city] = city
            }
            Unit
        }
    override fun deleteEmployee(id: Int) = transaction(db) {
        Employees.deleteWhere { Employees.id eq id }
        Unit
    }
    override fun getEmployee(id: Int) = transaction(db) {
            Employees.select { Employees.id eq id }.map {
                Employee(it[Employees.id], it[Employees.name], it[Employees.email], it[Employees.city]
                )
            }.singleOrNull()
        }
    override fun getAllEmployees() = transaction(db) {
        Employees.selectAll().map {
            Employee(it[Employees.id], it[Employees.name], it[Employees.email], it[Employees.city]
            )
        }
    }
    override fun close() { }
}
{% endhighlight %}

DAOFacadeDatabase needs **Database** instance. We wrapped all query statements with in the **transaction** because **Exposed** needs all the database operations to be performed with in a transaction.

> To understand more about Exposed please read this [article]({{site.baseurl}}/light-weight-sql-kotlin-library)

Now we have our DAO layer ready.

#### Integrate Exposed with Ktor

Lets integrate DAO layer with Ktor. We need to instantiate **DAOFacadeDatabase** by passing H2 in-memory database instance. Below is code;

{% highlight java %}
val dao = DAOFacadeDatabase(Database.connect("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", driver = "org.h2.Driver"))
fun main() {
    embeddedServer(Netty, port = 8080){
        dao.init()
        //install
        //routing
    }.start(wait = true)
{% endhighlight %}

Instantiated **DAOFacadeDatabase** by passing H2 database instance and used this instance to create the tables by calling **init()**

### Configure REST controllers

We have DAO and Ktor server configured. Now we will create controller end-points for HTTP requests

#### Create GET, PUT, POST and DELETE requests

Update **routing** context with new end-points to handle GET, PUT, POST and DELETE requests. 

{% highlight java %}
embeddedServer(Netty, port = 8080){
        //install
        routing {
            route("/employees"){
                get {
                    call.respond(dao.getAllEmployees())
                }
                post {
                    val emp = call.receive<Employee>()
                    dao.createEmployee(emp.name, emp.email, emp.city)
                }
                put {
                    val emp = call.receive<Employee>()
                    dao.updateEmployee(emp.id, emp.name, emp.email, emp.city)
                }
                delete("/{id}") {
                    val id = call.parameters["id"]
                    if(id != null)
                        dao.deleteEmployee(id.toInt())
                }
            }
        }
    }.start(wait = true)
{% endhighlight %}

* GET: returns all employees from the database
* POST: receives Employee JSON and stores in the database
* PUT: updates employee record
* DELETE: deletes the employee for the given id

#### Test HTTP endpoints with cURL

Start the application by running **App.kt** and check for no errors in the console. Below are the examples to test end-points with cURL

{% highlight bash %}
curl --data '{"name":"Connor","email":"connor@thetechstack.net","city":"New York"}' -H "Content-Type: application/json" --request POST http://localhost:8080/employees
curl --data '{"name":"Owlette","email":"owlette@thetechstack.net","city":"New York"}' -H "Content-Type: application/json" --request POST http://localhost:8080/employees
curl --data '{"name":"Gekko","email":"gekko@thetechstack.net","city":"New York"}' -H "Content-Type: application/json" --request POST http://localhost:8080/employees

curl http://localhost:8080/employees

curl --data '{"id":1,"name":"Catboy","email":"catboy@thetechstack.net","city":"New York"}' -H "Content-Type: application/json" --request PUT http://localhost:8080/employees

curl -X DELETE http://localhost:8080/employees/3
{% endhighlight %}

We performed CRUD operations on the database using REST end-points.

### Conclusion

We created a Employee rest service using Ktor and Exposed and then tested all endpoints with some data to verify all database operations.