---
title:  "Basics of Domain Specific Language (DSL) using Kotlin"
date:   2018-12-22 20:11:10 -0500
categories: kotlin
image: /assets/images/banners/basics-of-domain-specific-language.jpg
description: "Learn basics of Domain specific language using Kotlin and create a sample DSL to generate HTML"
---

Domain Specific Language (DSL) is a simple language targeted to solve a particular kind of problem. DSL is not a programming language, its a way of using existing programming language to create a new domain language. This new domain language can be used to solve problems with in that particular domain. DSL is not a new concept, it's old and programmers use it frequently. For example SQL, CSS, HTML and XML all these are DSL's.

With out any more theory lets dive in to this concept using some examples. Lets create our own HTML DSL language using Kotlin and then we use it to generate HTML dynamically. 

Below is the example of DSL we are going to create in this article
{% highlight java %}
fun main(){
    html{
        header{
            title with "Welcome"
        }
        body{
            h1("Hello World!")
        }
    }
}
{% endhighlight %}

Someone who is not Kotlin programmer can understand this code. One of the main advantage of DSL is providing an API which can be understandable and usable by naive user. The structure and levels of blocks in the above code is easy to figure out whats going on. Running this code will generate an HTML as shown below.

{% highlight html %}
<html>
	<header>
		<title>Welcome</title>
	</header>
	<body>
		<h1>Hello World!</h1>
	</body>
</html>
{% endhighlight %}

Lets go through each piece to understand how it works. I am using **Kotlin** language to create this DSL.

## Create HTML block

I declared a **html** function which takes a lambda like below

{% highlight java %}
fun html(content: () -> Unit){
    println("<html>")
    content()
    println("</html>")
}
{% endhighlight %}

*html* function is expecting an empty parameter lambda which does not return anything. With in the function it just prints start and end tags and between it calls the passed lambda **content()**. So when I call html function I can pass any code to it so that code will be executed as part of lambda.

In kotlin we need to pass lambda implementation with in curly brackets so we can call html function like below.

{% highlight java %}
html{
    println("Test")
}

//Output:
<html>
test
</html>
{% endhighlight %}

## Header block

Creating header block is same as html but only difference is, header function should accept a Title object.

{% highlight java %}
fun header(title: Title.() -> Unit){
    println("\t<header>")
    Title().title()
    println("\t</header>")
}
class Title{
    var title = this
    infix fun with(value:String){
        println("\t\t<title>$value</title>")
    }
}
{% endhighlight %}

header function is expecting a lambda with extension function on Title, means code passed to header is executed with in the Title context. Read this **[article]({{site.baseurl}}/understanding-kotlin-extension-functions.html)** for more on extension functions. **Title** class is having single **[infix](https://kotlinlang.org/docs/reference/functions.html#infix-notation)** function (with) which takes String and prints its on the console.

{% highlight java %}
header{
    title with "Welcome" // <1>
}
{% endhighlight %}

**<1>** We are passing this statement to extension function in header. With in the header function instead of directly calling **title()** we are calling it on new Title instance like **Title().title()**. This is because *title()* is not just a lambda, it is also an extension function. Extension function needs a context object so we are creating Title object and it is passed as context.

The code we are passing to the header function is executed in the context of new title instance created.

## Body and Header block

Body is similar to HTML block, it is a function which accepts a lambda and h1() is a simple function which accepts a String.

{% highlight java %}
fun body(content:() -> Unit){
    println("\t<body>")
    content()
    println("\t</body>")
}

fun h1(content:String){
    println("\t\t<h1>$content</h1>")
}
{% endhighlight %}

We now have all parts for our HTML DSL. Right now we are just printing tags to console but we can make it more powerful by adding more functionality.

## Conclusion

In this article we created new DSL to generate a simple HTML. DSL's are mainly used for configuration or generating a structure in a simple contextual way.