---
title:  "Light Weight SQL Kotlin library"
date:   2019-02-16 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/light-weight-sql-kotlin-library.jpg
description: "Learn how to use a light weight SQL Kotlin library called Exposed. It is written in Kotlin and supports two layers to access database: DSL and DAO."
---

**Exposed** is a light weight SQL library written using Kotlin language. In this article I will demonstrate this library with some simple examples. I will create some test tables and perform **CRUD** operations on it. I was looking for some light wight SQL library for quick and small application and found **Exposed**. It is so simple to learn.

**Exposed** have two layers of database access: *DSL* and *DAO*. In this article I will use DSL layer. To make it simple I we use only single kotlin file to perform all database calls. If you want to read further about exposed then, [here](https://github.com/JetBrains/Exposed) is the link to its github repository.

Create a new Kotlin project in your IDE and add below dependencies in your build configuration.

Group Id | Artifact Id | Version
--- | --- | ---
org.jetbrains.exposed | **exposed** | 0.12.1
ch.qos.logback | **logback-classic** | 1.2.3
joda-time | **joda-time** | 2.9.2
com.h2database | **h2** | 1.4.191
{: .table .table-striped}

> Add above mentioned dependencies in your build configuration file (For Maven use pom.xml and for Gradle use build.gradle)

**org.jetbrains.exposed** depends on slf4j and joda-time so included *logback* and *joda-time*. We are going to use **h2** in-memory database so add **h2database**.

### Table mappings

We are using Employee and Company entities as example in this article. Employees work in a company so employee will have a reference to the company. In object relational mapping libraries we use annotations to provide relationship between table and class but in *exposed* we use Kotlin's *object* to provide mapping information. Create a new kotlin file in the project **ExposedDemo.kt** and write below code in it.

{% highlight java %}
import org.jetbrains.exposed.sql.*

object Companies: Table(){
    val id = integer("id").primaryKey()
    val name = varchar("name", 50)
    val city = varchar("city", 25)
}
object Employees: Table(){
    val id = integer("id").primaryKey()
    val name = varchar("name", 50)
    val age = integer("age")
    val company = (integer("company") references Companies.id)
}
{% endhighlight %}

In Kotlin [**object**](https://kotlinlang.org/docs/reference/object-declarations.html#object-expressions) declaration is used to create **Singleton** instance. Once an object is declared we can refer with its name directly with out creating instance.

We created two objects *Employees* and *Companies* and these objects are extending **Table** class. In Companies we need id, name and city columns so initialized these fields by calling respective functions based on there data types. 

All below functions are part of **Table** class;

* **integer**: Creates integer **Column**. Takes column name as parameter.
* **varchar**: Creates String **Column**.
* **primaryKey**: Creates **Column** of primary key type.
* **references**: This is an extension function in **Table** which is used for providing foreign key relation.

Now we have objects which extends **Table** and declared some columns in it. By this we completed our initial table mappings.

### Connect and create tables

We will now write our **main()** function which is the starting point of kotlin execution.

{% highlight java %}
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {
    Database.connect("jdbc:h2:mem:test", driver = "org.h2.Driver") // <1>
    transaction{    // <2>
        addLogger(StdOutSqlLogger)  // <3>
        SchemaUtils.create(Companies, Employees)    // <4>
    }
}
{% endhighlight %}

* **<1>** Load driver and connect to the database. In this case we are loading **h2** database driver and connecting to it.
* **<2>** **transaction** is a function which takes an extension lambda of **org.jetbrains.exposed.sql.Transaction** class. Every thing with in this lambda are executed in a transaction context.
* **<3>** Configure logger to view generated SQL statements.
* **<4>** We are using in-memory database so tables will be created on every application run. **SchemaUtils** provides utility functions to create tables.

Run this code to see SQL statements in the console log. In the next sections we see examples of **CRUD** operations.

### Create

Inserting new records into the table is so easy. **Exposed** provides insert function which will take an **InsertStatement**. Lets insert some rows into the Company and Employee tables.

{% highlight java %}
Companies.insert { 
    it[id]=1
    it[name] = "Apple"
    it[city] = "San Francisco" 
}
Companies.insert { 
    it[id]=2
    it[name] = "Amazon"
    it[city] = "Seattle" 
}

Employees.insert { it[id]=1; it[name]="Bob"; it[age]=30; it[company]=1 }
Employees.insert { it[id]=2; it[name]="Andrew"; it[age]=32; it[company]=2 }
Employees.insert { it[id]=3; it[name]="Sam"; it[age]=35; it[company]=1 }
Employees.insert { it[id]=4; it[name]="Alice"; it[age]=32; it[company]=2 }
Employees.insert { it[id]=5; it[name]="David"; it[age]=29; it[company]=2 }
{% endhighlight %}

**insert** is an extension function which takes **InsertStatement**. **it** in the insert block refers to the **Column**, I assigned all new values to this instance. For Employees I used semicolons to separate the statements to make code shorter, but that is optional.

### Read

Query data from the database using **select** function. There are many versions of select functions available below are some examples.

{% highlight java %}
Employees.selectAll().forEach { println("$it") }    // <1>

Employees.select {Employees.id greater 3}   // <2>
    .forEach { println(it[Employees.name]) }

Employees.slice(Employees.name).select {Employees.name like "S%"}   // <3>
    .forEach { println(it) }
{% endhighlight %}

* **<1>** **selectAll** returns all the rows from table. This function returns **Query** instance and on which we can call **forEach** to iterate the results.
* **<2>** To filter out the rows we can provide **where** condition by passing an **SqlExpressionBuilder** 
* **<3>** To get only *Employee.name* in the result use **Slice** function which will return only provided list of columns in the result.

### Update

Update the rows using **Update** function. This function takes **SqlExpressionBuilder** using which we can pass the where condition and the new values can be assigned to the column instance.

{% highlight java %}
Employees.update({Employees.id eq 5}){
    it[name] = "Dave"
}
{% endhighlight %}

Employee name for id equals to 5 is updated with 'Dave'

### Delete

**deleteWhere** function deletes the all the rows which satisfies the passed condition.

{% highlight java %}
Employees.deleteWhere { Employees.name eq "Sam" }
{% endhighlight %}

Employee record with name 'Sam' gets deleted.

### Joins

Inner join is the most common way to join two tables. In below example I will join Employees and Companies.

{% highlight java %}
(Employees innerJoin Companies).select {
    Companies.id eq 2
}.forEach { println("$it") }
{% endhighlight %}

**innerJoin** is a infix function which takes a column and returns **Join**. We can then call **select** on it to pass the where conditions. I want all employees who belong to company id 2 and then iterated on the result to print. Result will have all columns from Employees and Companies but for to get only some columns then use **slice**.

### Conclusion

We used **Exposed** SQL library to perform CRUD operations on h2 database.
