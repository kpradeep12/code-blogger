---
title:  "How to process annotations in Java"
date:   2019-02-04 20:11:10 -0500
categories: java
image: /assets/images/banners/how-to-process-annotations-in-java.jpg
description: "Learn how to process annotations in Java. Create an annotation and process annotations at compile time."
---

Many libraries in Java uses Annotations. Annotations help developers to write less code because they will generate code or help is configuring application with less hassle, they also can be used as providing meta-data to compiler and runtime environments. In this article I will explain how annotations are declared and processed by creating a simple annotation. We don't need to have any fancy editors or build tools to learn annotations because they add more complexity. We can use simple text editor and command line to compile the examples in this article. 

I will create a simple *Todo* annotation. Developers can annotate any method with @Todo annotation like below;

{% highlight java %}
@Todo("technical details pending")
public void neutral(){}
{% endhighlight %}

This Todo acts like a reminder for the developer. We will later create an annotation processor which will detect *Todo* annotations and fails the compilation with some message so developer will not forgot to implement methods. This annotation will be useful in cases where for example requirements from client are not clear or waiting for some information from other teams, then we can annotate these methods with **Todo** annotation.

Our annotation processor will catch all these **Todo** annotations at compile time and fails the compilation. This will help developers to either implement this method or if it is already implemented then developer should remove it so the compilation will succeed. This annotation acts like tagging.

We will go through below steps to create and process annotations:

* Declare an annotation
* Implement annotation processor
* Use annotation in the code

Lets understand each of them in below sections

### Declare an annotation

Create a new java file *Todo.java* to declare an annotation. Annotation declaration looks similar to interface except the keyword **interface** is preceded with **@**

{% highlight java %}
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.METHOD)
public @interface Todo{
    String value();
}
{% endhighlight %}

**Todo** annotation is declared with two meta-annotations. Meta annotations helps in providing more information about the annotation;

* *Retention*: How long this annotation retains or available.
    * SOURCE: It is available in the source code and discarded by compiler. In above example we want our annotation to be available in the source code.
    * CLASS: This is the default. Available in the class file but VM may ignore it at runtime.
    * RUNTIME: Available in the class file and VM will load it at runtime and they can be processed reflectively.

* *Target*: Type of elements we can use this annotation like; constructor, field, package... but here we want our annotation to be used on the methods. If we apply this annotation on the other types then compiler will throw error.

I want users to mention the task description so I have **String** field where the task description will be stored.

For more information on Annotations read this [tutorial](https://docs.oracle.com/javase/tutorial/java/annotations/basics.html).

### Implement annotation processor

Annotations declared in the classes need to processed either at compile time or runtime. In this article we are going to learn compile time annotation processing. This processor will look for **Todo** annotations in the class and throws an error if it finds. The main intention of this **Todo** annotation is helping developers by reminding missed implementations at compile time.

{% highlight java %}
import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;
import java.util.Set;

@SupportedAnnotationTypes("Todo")   // <1>
@SupportedSourceVersion(SourceVersion.RELEASE_8)   // <2>
public class TodoProcessor extends AbstractProcessor{   // <3>
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) { // <4>
        Messager messager = processingEnv.getMessager();

        for (TypeElement typeElement : annotations) {   // <5>
            for (Element element : roundEnv.getElementsAnnotatedWith(typeElement)) {    // <6>
                Todo todo = element.getAnnotation(Todo.class);  // <7>
                messager.printMessage(Diagnostic.Kind.ERROR,    // <8>
                        "Task '" + todo.value() + "' is pending on " + element);
            }
        }

        return true;    // <9>
    }
}
{% endhighlight %}

**<1>** **SupportedAnnotationTypes** is a meta annotation which will tell the type of annotations this class will process. In this case this class will process **Todo** annotations.  
**<2>** **SupportedSourceVersion** Latest java version this annotation processor supports.  
**<3>** Annotation processor must either implement **Processor** interface or extend **AbstractProcessor** class.  
**<4>** Override **process** method of **AbstractProcessor** class. Compiler will call this method on every class in the application.   
**<5>** Single annotation processor class can be used to process multiple annotations by providing multiple entries in **SupportedAnnotationTypes**. Here we are processing only one annotation so **annotations** set contains only one **TypeElement** which is **Todo**  
**<6>** **Todo** can be declared on multiple methods. **RoundEnvironment** provides set of all elements where **Todo** annotations are used.  
**<7>** Get and store annotation instance.  
**<8>** **processingEnv** is the instance of **ProcessingEnvironment** interface. This will provide some utilities to work with the compiler environment. This class provides a **Messager** which can be used to indicate errors in the annotation processing. In this case we printed the error message which contains value of the Todo annotation and the method name on which it is used.  
**<9>** **true** is returned to mention that we complemented our processing. In some cases annotation processor will generate classes in those cases we need to return false.  

We completed our annotation processor, now lets use it.

### Using annotation in the code

**Vehicle.java** uses **Todo** annotation. It contains three methods and two of them are marked with **Todo** annotations.

{% highlight java %}
public class Vehicle{

	@Todo("implement after phase 1")
	public void drive(){}

	public void park(){}

	@Todo("technical details pending")
	public void neutral(){}
}
{% endhighlight %}

### Compile code

Open terminal/command line then change the directory to the folder where you created these three java files. Execute below commands;

{% highlight bash %}
$ javac Todo.java TodoProcessor.java
$ javac -processor TodoProcessor Vehicle.java
error: Task 'implement after phase 1' is pending on drive()
error: Task 'technical details pending' is pending on neutral()
2 errors
{% endhighlight %}

First compile **Todo** and **TodoProcessor** and then compile **Vehicle** because it depends on these classes. While compiling **Vehicle** we need to pass **-processor** flag to **javac** to indicate the compiler that we are using annotation processor (**TodoProcessor**) so compiler will use passed class to process annotations.

Compiler shows two errors because two methods in the **Vehicle** class is using **Todo** annotations. Error message shows the value which we passed to the annotation and the method name. Now developer can either implement the incomplete methods or remove the annotations/methods if the implementation is no longer needed.

### Conclusion

We created a Todo annotation and annotation processor class. Used this annotation in a **Vehicle** class then compiled it using annotation processor. You can expand this example even more by providing more details and adding more functionality.