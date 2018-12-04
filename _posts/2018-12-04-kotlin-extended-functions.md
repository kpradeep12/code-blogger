---
title:  "Kotlin extended functions"
date:   2018-12-04 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/design-and-implement-rest-apis.png
published: false
---

Extension functions allows us to extend the functionality of a class. It does not matter if the class is in a external library. Extension functions will not extend the class. We can customize the functionality of class with out making changes in it. At first these extension functions seems confusing for Java programmers but going though some example should help to understand it.

I will take **String** class as an example because 'String' is one of the most used class in the Java world, lets add an extended function to it. To print a string in the console we can pass it to **println** function but instead of passing it to a function we can add an extension function to the **String** class itself and will function make this function to print it to the console. In below code I created a extension function on String and calling it from main()

{% highlight java %}
fun main(){
    println("Hello World!") // <1>
    "Hello World!".println() // <2> Calling extension function on String class
}

//Extension function
fun String.println() = println(this) // <3>

/* Output:
Hello World!
Hello World!
*/
{% endhighlight %}

<1> Passing string to *println* which prints message on console.  
<2> *println* function is not part of **String** class but this is an extension function.  
<3> Declared an extension function on String class. More about this in the next section.

Now we can directly call *println* on *String* to print it on console.

## Declare Extension Functions

To declare an extension function we need to prefix *function name* with *receiver type* separating with *dot* like below.

**fun \<Receiver type>.\<function name>(){}**{: .align-text-center}

Based on our example we created an extension function on String so we declared it as **fun String.println()**. We are saying that *String* is the receiver type and *println* is the extension function name. Now we can call *println* on any String objects in my project if I have this declaration in the class path and this function will print the message to console.

For this tutorial purpose created a simple example where it just prints a message but we can have any logic in it which can manipulate *receiver type*. **How to access receiver type in the function?** the answer is using **this**. this is a implicit reference to the receiver type so can manipulate receiver using **this**

In the above example I just want to print so I am directly passing *this* to *println* function like below

{% highlight java %}
fun String.println() = println(this)
{% endhighlight %}

## How Extension Functions Works

How *this* is implicitly reference the receiver type? I decompiled the above code to show how *Kotlin* converts them to *Java* compatible code and below is the output:

**Kotlin Code**
{% highlight java %}
"Hello World!".println()

fun String.println() = println(this)
{% endhighlight %}

**Decompiled Code**
{% highlight java %}
println("Hello World!"); // <1>

public static final void println(@NotNull String $receiver) { // <2>
    Intrinsics.checkParameterIsNotNull($receiver, "receiver$0");
    System.out.println($receiver); // <3>
}
{% endhighlight %}

<1> *Receiver type* is passed as the argument to the extension function. This is the reason we can use **this** in the extension function to refer the receiver.  
<2> Declaration is changed such that *Receiver type* becomes parameter to the function.
<3> Extension function implementation is converted to *Java*.  Where ever we used *this* in the *Kotlin* is replaced with *receiver* in *Java*

If extension function *println* needs to take arguments then those arguments are appended after the *receiver* type in the function implementation. Lets assume we have a class *Animal* in a third party library. In below code I created a extended function to add more functionality to it and extended function takes one argument.

{% highlight java %}
class Animal(val type:String){ // <1>
    fun eat() = println("$type is Eating")
}

fun Animal.run(speed:Int) = println("$type is running at $speed mph") // <2>

fun main(){
    val animal = Animal("Cat") // <3>
    animal.eat()
    animal.run(10)
}
{% endhighlight %}

<1> *Animal* class is part of third party library so we can not change it.  
<2> We added *run* as extension function on Animal, which prints animal type and speed  
<3> Creating animal object and calling *eat()* and extension function *run()*. This example shows that we can add arguments to the external functions.

## Conclusion

Extension functions not only just for Java inbuilt classes, we can add them for even third party libraries. But make sure to not overuse it because they may create ambiguity in the project so some policies may be needed in the project to create and maintaining extension functions.