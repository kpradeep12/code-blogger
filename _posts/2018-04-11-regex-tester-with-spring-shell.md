---
title:  "Regex Tester With Spring Shell"
date:   2018-04-11 09:31:10 -0500
categories: java
header:
  teaser: /assets/images/banners/blog-banner-regex-tester-with-spring-shell.png
---

Spring framework is the suite of many projects, using which we can develop wide variety of applications. These applications may need user interaction, the most common way is to have a web interface. Not all applications need to have a web interface, a simple command line interface can be suffice for some type of applications. Spring Shell is a simple project which provides the infrastructure to build command line interface applications easily and quickly.

In this article I will show the steps needed to create a Spring shell project which tests the regex string provided at the command line. Easier way to create spring project is using [start.spring.io](https://start.spring.io/) Go to the site and select you choice of configuration with ‘Spring Shell’ as dependency. See below screenshot for the reference.

![Regex tester spring starter](/assets/images/posts/Post-Regex-tester-spring-starter.png){: height="300px" width="550px"}{: .align-center}

Click on ‘Generate Project’ which will download the pre-configured spring project. Unzip and import it into your favorite java editor.

![Regex tester spring shell](/assets/images/posts/Post-Regex-tester-spring-shell-pom.png){: height="300px" width="570px"}{: .align-center}

Now we have empty spring shell project ready.

### Create command for Regex tester
Creating a command is as simple as creating a class and method in Spring shell. Lets first create a class ‘RegexTester.java’ and annotate it will @ShellComponent.All command related classes need to be annotated with ShellComponent, this is a stereotype annotation which helps spring to configure component for the command interface. Add a method in this class and annotate with @ShellMethod. See code below;

{% highlight java %}
package com.regex.regextester;
 
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import java.util.regex.Pattern;
 
@ShellComponent
public class RegexTester {
 
    @ShellMethod("Regex tester")
    public void regex(String pattern, String text){
        Pattern.compile(pattern)
                .matcher(text)
                .results()
                .forEach(mr -> {
                    System.out.printf("Match: %s\n",
                            text.substring(0,mr.start())+
                                    "'"+
                                    mr.group()+
                                    "'"+
                                    text.substring(mr.end(),text.length()));
                });
    }
}
{% endhighlight %}

A method annotated with @ShellMethod becomes the command. In the example above, ‘regex’ becomes the command name and it expects two parameters. First parameter is the regex pattern and second one is the text on which regex pattern will be tested.

### Build project
I used Maven to build the application. In the project folder execute below command to execute maven build;

{% highlight bash %}
./mvnw clean install -DskipTests
{% endhighlight %}

Maven will download the required dependencies and builds the project. Packaged jar will be created in target folder.

### Run Regex tester
Maven build zipped all the required dependencies into regex-tester-0.0.1-SNAPSHOT.jar it even contains Spring Shell in it. Lets run this jar with java command. In the command prompt, go to the project folder and execute below command.

{% highlight bash %}
java -jar target/regex-tester-0.0.1-SNAPSHOT.jar
{% endhighlight %}

You should see a prompt saying ‘shell:>’ As I mentioned earlier, spring shell provides the required infrastructure for the command line interface so this prompt is provided by the spring shell and it is ready to take the commands. lets execute some commands on the shell prompt.

![Regex tester cli](/assets/images/posts/Post-Regex-tester-regex-cli.png){: height="140px" width="500px"}{: .align-center}

I passed ‘ab’ as the pattern and ‘abcabc’ as the test string to regex command. Spring will internally execute regex method and passes provided arguments to it. The output of the method will be printed in the console. We can continue to test regex command multiple times with different strings and it can be used as regex utility in local.

For the same ShellController class we can add multiple methods and use them as different  commands. After completing the regex testing, type ‘exit’ to quit from the shell. We have completed spring shell project with simple regex tester. You can continue to explore and learn more on Spring shell at this [link](https://docs.spring.io/spring-shell/docs/2.0.1.BUILD-SNAPSHOT/reference/htmlsingle/#_what_is_spring_shell). Happy Coding!