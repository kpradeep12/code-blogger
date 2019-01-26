---
title:  "Pizza DSL with Kotlin"
date:   2019-01-23 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/pizza-dsl-with-kotlin.png
description: "We develop a fun pizza DSL which will help in learning kotlin features and DSL."
---

DSL is not a programming language, it is the term used to describe any application API which is designed in a way such that users can easily use it in there domain to solve problems with out knowing any programming language. Domain Specific Languages is used to solve problems in a specific field or domain. For example; SQL is based on a natural language so users can easily create there queries to get data from database. Learn more about DSL **[here]({{site.baseurl}}/domain-specific-language)**. Below are some of the examples of DSL's and there applications;

* HTML -> Render web pages
* SQL -> Query database
* XML -> Data transfer between applications

In this article I am using **Kotlin** to create a Pizza DSL. We can not really order a pizza with this but my intention is to develop a new DSL so we can configure a pizza and call **order()** on it so it prints pizza configuration on the console. This is a fun way to understand how DSL work and also we can learn some kotlin's programming features. We are going to use below features of Kotlin to build this DSL.

* [Lambdas](https://kotlinlang.org/docs/reference/lambdas.html#lambda-expressions-and-anonymous-functions)
* [Extension functions](https://kotlinlang.org/docs/reference/extensions.html)
* [Multi line strings](https://kotlinlang.org/docs/reference/coding-conventions.html#using-strings)

Kotlin have many features which are helpful in developing DSL's so lets create a basic shell and then we will build-up our pizza API on it.

{% highlight java %}
class Pizza { // <1>
    fun order() = println(this)
}

fun pizza(build: Pizza.() -> Unit): Pizza { // <2>
    val pizza = Pizza()
    pizza.build()
    return pizza
}

fun main() =
    pizza {

    }.order() // <3>
{% endhighlight %}

**<1>** Initial Pizza class with only order function and it just prints the instance. Nothing much in this class.  
**<2>** Declared a pizza function which takes an extension function of Pizza and it returns a new Pizza instance. If you are new to extension function then read more about it [here]({{site.baseurl}}/understanding-kotlin-extension-functions).  
**<3>** We are calling *pizza* function with out passing any thing to lambda and then calling *order()* on it.  

### Pizza size (Large or Medium ??)

Pizza order starts by mentioning the size so lets create some functions to handle size of the pizza.

{% highlight java %}
class Pizza {
    var size: String = "Medium" // <1>
    fun large(size: Pizza.() -> Unit){ // <2>
        this.size = "Large"
        this.size()
    }
    fun medium(size: Pizza.() -> Unit){
        this.size = "Medium"
        this.size()
    }
}

fun main() =
    pizza {
        large {
        }
    }.order()
{% endhighlight %}

**<1>** Our Pizza class supports *medium* and *large* size pizzas and by default it is medium sized so we initialized *size* with *Medium*  
**<2>** Implemented functions to handle each size: large and medium. These functions take extension function on Pizza then it sets the related size and then calls the passed function.  

### Cheese it up

We need to allow users to add sauce and cheese. We are going to give user to choose three levels or cheese (light, normal and extra) and three types of sauces (Marinara, Garlic parmesan, Alfredo)

{% highlight java %}
enum class Cheese{ Light, Normal, Extra } // <1>
enum class Sauce{ Marinara, GarlicParmesan, Alfredo }

class Pizza {
    var sauce: Sauce = Sauce.Marinara
    var cheese: Cheese = Cheese.Normal
    fun add(sauce: Sauce) : Pizza { // <2>
        this.sauce = sauce
        return this
    }
    fun add(cheese: Cheese):Unit{
        this.cheese = cheese
    }
}

fun main() =
    pizza {
        large {
            add(Sauce.Alfredo) // <3>
            add(Cheese.Extra)
        }
    }.order()
{% endhighlight %}

**<1>** Declared enums to maintain Cheese level and Sauce types.  
**<2>** Implemented two functions to add sauce and cheese. These functions will just set the passed values into the class level fields.  
**<3>** Calling *add* function to add sauce and cheese. These functions are part of large pizza context.  

### Toppings

Allow users to add toppings and also what if users want toppings on one side? so lets implement this.

{% highlight java %}
interface Topping
enum class Veg: Topping { Onion, Tomato, Pepper, Spinach } // <1>
enum class Meat: Topping { Chicken, Pepperoni }

class Pizza {
    var toppings: MutableList<Topping> = mutableListOf()
    //...
    fun toppings(tops: Pizza.() -> Unit) = this.tops() // <2>
    fun half(side: Pizza.() -> Unit) = this.side()
    fun add(vararg toppings: Topping) = this.toppings.addAll(toppings)
}

fun main() =
    pizza {
        large {
            add(Sauce.Alfredo)
            add(Cheese.Extra)
            toppings {
                add(Veg.Tomato, Veg.Onion, Meat.Chicken) // <3>
                half{ // <4>
                    add(Meat.Pepperoni)
                }
            }
        }
    }.order()
{% endhighlight %}

**<1>** Two enums are used to maintain Veg and Meat toppings. These enums extend a common interface *Topping*  
**<2>** **toppings** will create new context to add toppings on the pizza. **half** will create new context to add toppings on half part of the pizza and **add** will take variable arguments to add toppings to the list.  
**<3>** call *add* by passing some toppings which are added to the list.  
**<4>** creates new context to add toppings on half side of the pizza.  

### Print pizza information

Display configured pizza information on the console.

{% highlight java %}
class Pizza {
    //...
    override fun toString(): String{ // <1>
        return """Pizza [
    $size [
        Sauce: $sauce Cheese: $cheese
        $toppings
    ]
]"""
    }
}
{% endhighlight %}

**<1>** Overload *toString* to return string representation of pizza instance. This will use multi-line string to return pizza details.  

Full code of this code available on **[gist](https://gist.github.com/kpradeep12/2c3af25e210f96c5e54ac060129f6797)**

### Conclusion

We used many kotlin features to develop pizza DSL. Using this DSL we can configure pizza and print its information to the console.