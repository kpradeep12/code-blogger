---
title:  "Operator overloading in Kotlin"
date:   2018-12-15 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/kotlin-operator-overloading.png
---

Kotlin allows us to implement **Operator overloading** for a predefined set of operators. We can implement them on class members or extension functions. These operators have fixed symbolic representation (like + or -). 

## Overloading with class members

To demonstrate this feature I will override *increment* and *decrement* operators on a Counter class. Counter is a simple class with single integer field, we can either increment or decrement it.

To override an operator we need to declare a function with **operator** keyword and the name of the function should be fixed name which should be corresponding to the operator. Below table shows the predefined function names for increment and decrement operators.

Operator&nbsp; &nbsp; &nbsp; | Function name
---|---
`++` | inc()
`--` | dec()
{: .align-text-center}
<br/>
We can overload many operators but we are not covering all of them in this article so please read this [kotlin documentation](https://kotlinlang.org/docs/reference/operator-overloading.html) for full details.

Here is the Counter class with the implementation for *++* and *--* operators

{% highlight java %}
class Counter(val number:Int){
    operator fun inc() = Counter(number + 1)
    operator fun dec() = Counter(number - 1)
    override fun toString() = number.toString()
}
{% endhighlight %}

inc() and dec() are predefined fixed names to override increment and decrement operators and these functions should be declared with **operator** keyword. These functions returns Counter object with new value. Overriding **toString()** is optional, I did because I want to show the value in console.

Lets call these functions:

{% highlight java %}
fun main(){
    var counter = Counter(-1) // <1>
    repeat(10) {
        print("${++counter} ") // <2>
    }
    repeat(10){
        print("${--counter} ")
    }
}

//Output:
//1 2 3 4 5 6 7 8 9 10 9 8 7 6 5 4 3 2 1 0 

{% endhighlight %}

<1> Initially counter is created with -1  
<2> Counter is incremented 10 times using the operator **++** At compile time Kotlin will lookup for the function **inc()** in Counter class and **++** is converted to inc() function call on the counter and the result is assigned back to counter. This is the reason we declared *counter* as var instead of val.

Output shows that the counter is incremented and decremented ten times.

## Overloading with Extension functions

We can also override operators using Extension functions. Read this **[article]({{site.baseurl}}/blog/2018/12/04/understanding-kotlin-extension-functions.html)** to learn about extension functions. If we dont have access to Counter class then we can add new extension function like below:

{% highlight java %}
operator fun Counter.unaryPlus() = Counter(number + 1)
{% endhighlight %}

unaryPlus() works like increment except it is not assigned back to itself. We need to store the result in the reference, like shown in below code.

{% highlight java %}
fun main(){
    var counter = Counter(0)
    repeat(10){
        counter = +counter
        print("${counter} ")
    }
}
//Output:
//1 2 3 4 5 6 7 8 9 10 
{% endhighlight %}

## Conclusion

We went through some examples to overload **++**, **--**, and **+** operators with class members and extension functions.