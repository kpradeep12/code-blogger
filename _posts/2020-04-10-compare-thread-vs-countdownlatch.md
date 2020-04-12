---
title: "Compare Thread vs CountDownLatch"
date: 2020-04-10 12:11:10 -0500
categories: java
image: /assets/images/banners/switch-expression-java14.png
description: "Record is a new feature added in Java 14. In this article, we will learn about Records, and we will explore some examples."
published: false
---

One of the new features released as part of Java 14 is the switch expressions. This feature was available in earlier versions (Java 12 and 13), too, but as a preview. In Java 14, it became standard. The main difference between the existing and new switch is, the new switch is not the only statement but also expression. There are some more differences, which we will learn in this article.

* Syntax of the new switch expression
* How to use the new switch expression?
  - Statement & Expressions
* Conclusion
{:toc}

### Syntax of the new switch expression

{% highlight java %}
T result = switch (arg) {
	case L1 -> e1;
	case L2 -> e2;
	default -> e3;
}
{% endhighlight %}

On the right hand side of 'case L1 ->' we can have an **expression, a block or a throw statement**.

### How to use the new switch expression?

The Existing switch has some problems and which are the motive for adding new switch expression. Below is the list of features of the new switch expression.

##### Statement & Expressions
First and foremost, as I mentioned earlier is, the existing switch is a statement, whereas a new switch can be used as a statement and also as an expression. Expressions can reduce a lot of boilerplate; they can be used along with the return or passed as an argument.
{% highlight java %}
System.out.println(switch (number) {
    case "one" -> 1;
    case "two" -> 2;
    default -> 0;
});
//outputs 2 if number is "two"
{% endhighlight %}
Switch expression is passed as an argument to System.out.println(). It is not possible with the existing switch statement.

##### Yield values
**yield** is the new keyword introduced along with switch expression. We may have a block on the right side of 'case L ->,' if so, then we need to use **yield** to return value from the block, which becomes the value of the enclosed switch statement. For a single expression, we don't need to have a **yield**.
{% highlight java %}
int number = switch (text) {
    case "one" -> 1;
    case "two" -> 2;
    default -> {
        yield calculate(text);
    }
};
{% endhighlight %}

##### Arrows and Semicolon
Switch case statements can have arrows ('case L1 ->') or semicolons ('case L2:'). The main difference between these is, with an arrow, an expression is enough to return a value. Whereas with a semicolon, use 'yield' to return value. **yield** keyword will help us to identify that we are using new switch expression, not the existing switch statement.
{% highlight java %}
//with arrow
System.out.println(switch (day) {
    case "sunday" -> 1;
    case "monday" -> 2;
    default -> 0;
});

//with semicolon
System.out.println(switch (day) {
    case "sunday" : yield 1;
    case "monday" : yield 2;
    default : yield 0;
});
{% endhighlight %}

##### Scope
The whole switch block is treated as a single scope in the current switch statement, whereas the scope for each case arm is different in the new switch.
{% highlight java %}
System.out.println(switch (day) {
    case "sunday" -> {
        int result = calculate(day);
        yield result * 2;
    }
    case "monday" -> {
        int result = calculate(day);
        yield result * 3;
    }
    default -> 0;
});
{% endhighlight %}
Variable 'result' is used in multiple cases because the scope is different for each case, whereas in the existing switch, the whole switch will have the same scope.

##### Multiple constants
New switch expression can have multiple constants per case.
{% highlight java %}
System.out.println(switch (day) {
    case "sunday", "monday" -> 1;
    case "tuesday","wednesday", "thursday" -> 2;
    default -> 0;
});
{% endhighlight %}

### Conclusion

New switch expression fixes many irregularities of the existing switch statement and try to use it to express multi-way conditionals as expressions.
