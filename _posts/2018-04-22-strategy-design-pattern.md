---
layout: post
title:  "Strategy design pattern"
date:   2018-04-22 02:11:10 -0500
categories: java
image: /assets/images/banners/blog-banner-strategy-design-pattern.png
author: pradeep
featured: false
---

This article will explain the strategy design pattern using functional interfaces. Sometimes application may need to execute an algorithm conditionally. Here the algorithm means nothing but a strategy, execution of this strategy depends on runtime conditions or it depends on the input received from the user. For example, sorting a list of persons can be a strategy and a type of the sorting can depend on age or name, Encrypting a string can be strategy and this strategy can depend on the type like RSA or Blowfish.

We can conditionally execute algorithms based on the if or switch conditions like below

{% highlight java %}
public class EncryptClient {
    static String encryptMessage(String type, String input){
        //to shorten the code this method just converts the case of the input
        if(type.equals("RSA"))
            return input.toUpperCase();
        else if(type.equals("Blowfish"))
            return input.toLowerCase();
        return input;
    }
 
    public static void main(String[] args) {
        System.out.println(EncryptClient.encryptMessage("RSA","teXt"));
    }
}
{% endhighlight %}

The problem with the above code is, EncryptClient class needs to modified for every new algorithm added. Also modification needed, if name of the type changes. This is not a good design.

## Strategy design pattern
Instead of executing algorithm conditionally we use an interface to define the strategy.

{% highlight java %}
public class EncryptClient {
    static String encryptMessage(EncryptionStrategy es, String input){
        return es.encrypt(input);
    }
 
    public static void main(String[] args) {
        System.out.println(EncryptClient.encryptMessage(new RSAEncryption(),"teXt"));
    }
}
 
interface EncryptionStrategy{
    public String encrypt(String input);
}
class RSAEncryption implements EncryptionStrategy{
    @Override
    public String encrypt(String input){
        	//to shorten the code this method just converts the input to upper case
        return input.toUpperCase();
    }
}
class BlowFishEncryption implements EncryptionStrategy{
    @Override
    public String encrypt(String input) {
        //to shorten the code this method just converts the input to lower case
        return input.toLowerCase();
    }
}
{% endhighlight %}

We created an interface (EncryptionStrategy) and implemented it for each algorithm. Note that the implementation classes are not actually encrypting the input but instead converting the case of the input characters, this is to reduce the code size, in real word application it should call a method which contains real algorithm. Instead of passing the name of the algorithm we passed the implementation to encryptMessage method. No more if conditions are needed in encryptMessage method because it receives the EncryptionStrategy as one of the parameter so it just uses it. In future we can create new class for new algorithm which implements EncryptionStrategy and there will be no change needed in encryptMessage method. We further optimize and improve the code using static interface methods, which will be explained in below section.

### Strategy pattern with static interface methods
Another approach to implement strategy pattern is using static methods in the interface, this way, instead of creating new class for each implementation we have to create new static method in the interface. This will help us to have less number of classes. Static methods in interface are introduced in Java 8.

{% highlight java %}
public class EncryptClient {
    static String encryptMessage(EncryptionStrategy es, String input){
        return es.encrypt(input);
    }
    
    public static void main(String[] args) {
        System.out.println(EncryptClient.encryptMessage(EncryptionStrategy.getRSAStrategy(),"teXt"));
    }
}
 
interface EncryptionStrategy{
    public String encrypt(String input);
    
    static EncryptionStrategy getRSAStrategy(){
		  //returns lambda, which implements encrypt method of EncryptionStrategy
        return input -> input.toUpperCase();
    }
    static EncryptionStrategy getBlowFishStrategy(){
        return input -> input.toLowerCase();
    }
}
{% endhighlight %}

getRSAStrategy and getBlowfishStrategy returns the lambda which implements the EncyrptionStrategy interface.

### Strategy pattern with functional interfaces.
We can improve and optimize  this code even more by utilizing functional interfaces. If you observe the EncryptionStrategy interface, it is having a single method which is encrypt, this method accepts and returns String. This is how the UnaryOperator interface in java.util.function package works. UnaryOperator accepts and returns the same type. Java provided some standard functional interfaces, we can utilize these interfaces instead of creating new ones.

{% highlight java %}
public class EncryptClient {
    static String encryptMessage(UnaryOperator<String> es, String input){
        return es.apply(input);
    }
 
    public static void main(String[] args) {
        System.out.println(
                EncryptClient.encryptMessage(
                        input -> input.toUpperCase(),"teXt"));
    }
}
{% endhighlight %}
We no more need any custom interface, instead we can use UnaryOperator because it accepts and returns same type. EncryptionStrategy is doing the same thing so instead of using this interface we can reuse exiting functional interfaces. Caller of encryptMessage is passing the lambda which is the implementation on UnaryOperator. This lambda is just passing the case conversion logic but in real world application caller will pass the real call to the algorithm, this is to just make code smaller for this article purpose.

## Conclusion
We have seen how strategy design pattern works and multiple ways to design it in the Java.