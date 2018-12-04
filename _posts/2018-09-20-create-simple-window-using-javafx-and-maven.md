---
layout: post
title:  "Create simple window using JavaFX 11 and Maven"
date:   2018-09-20 12:11:10 -0500
categories: java
image: /assets/images/banners/JavaFX-11.png
author: pradeep
featured: false
---

JavaFX modules are no more part of OpenJDK. From version 11 JavaFX modules are separated from Java SDK and it's a major version released after 8. JavaFX have its own website now [https://openjfx.io/](https://openjfx.io/). In this article we will go through the process of creating and running simple JavaFX window using Maven. JavaFX 11 runtime is available in maven repository so we will use it with maven.

To make it simple I will use a terminal and a text editor to create this simple JavaFX window.

## Prerequisits

* Java 11 (JavaFX 11 needs minimum Java 11 SDK to run)
* Maven

## Create Maven Project

In the terminal execute below command to generate an empty maven project.

{% highlight bash %}
mvn -B archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DgroupId=org.hello.fx -DartifactId=hello-fx
{% endhighlight %}

This command will generate a maven project with org.hello.fx package. Update pom.xml with below content.

{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.hello.fx</groupId>
  <artifactId>hello-fx</artifactId>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>hello-fx</name>
  <url>http://maven.apache.org</url>
  <dependencies>
          <dependency>
                  <groupId>org.openjfx</groupId>
                  <artifactId>javafx-controls</artifactId>
                  <version>11</version>
          </dependency>
</dependencies>
<build>
        <plugins>
                <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-compiler-plugin</artifactId>
                        <version>3.8.0</version>
                        <configuration>
                                <release>10</release>
                                 <!--  or 11  -->
                         </configuration>
                 </plugin>
                 <plugin>
                         <groupId>org.codehaus.mojo</groupId>
                         <artifactId>exec-maven-plugin</artifactId>
                         <version>1.2.1</version>
                         <executions>
                                 <execution>
                                         <goals>
                                                 <goal>java</goal>
                                         </goals>
                                 </execution>
                         </executions>
                         <configuration>
                                 <mainClass>org.hello.fx.HelloFX</mainClass>
                         </configuration>
                 </plugin>
         </plugins>
 </build>
</project>
{% endhighlight %}

We need org.openjfx dependency, this dependency is the runtime environment for JavaFX so I added it and also we need below two plugins;

* maven-compiler-plugin: To compile the project
* exec-maven-plugin: I provided org.hello.fx.HelloFX as main class in the configuration. I will create this class in the next section, this class will initialize and run's JavaFX class.

## Create JavaFX class

Create a new class in hello-fx/src/main/java/org/hello/fx/HelloFX.java

{% highlight java %}
package org.hello.fx;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class HelloFX extends Application {
    @Override
    public void start(Stage primaryStage) {
        Button btn = new Button();
        btn.setText("Say 'Hello World'");
        btn.setOnAction(event -> System.out.println("Hello World!"));

        StackPane root = new StackPane();
        root.getChildren().add(btn);

        Scene scene = new Scene(root, 300, 250);

        primaryStage.setTitle("Hello World!");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
{% endhighlight %}

This class opens a simple window with 'Say Hello World' button in center. Clicking on this button will print "Hello World!" in the console.

## Run Application

Execute below command in the terminal to compile and run HelloFX class.
{% highlight bash %}
mvn compile exec:java
{% endhighlight %}
Maven will compile and run's HelloFX class. New window will open with the button in center. Click on this button to see 'Hello World!' in the console.

## Conclusion

We created and executed a simple JavaFX 11 window. You can import this project to any Java IDE.