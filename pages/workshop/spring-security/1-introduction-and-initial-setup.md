---
layout: workshop
title: "Introduction And Initial Setup"
categories: [workshop]
image: /assets/images/banners/dockerfile-quick-reference.png
workshop_id: spring-security
---

This Spring security workshop aims to build a secure web application; this workshop will have less theory and more practical work. I will provide simple instructions with explanations along the path of our web application development, and I try to cover as many essential features of Spring security.

##### Step 1: Project Setup

* Go to https://start.spring.io/
* Select your own choice of configuration (Project, Language, Spring Boot, Project Metadata, Packaging, and Java version).
* Select below dependencies;
    * Spring Web
    * Thymeleaf
    * Spring Security
* Click on Generate to download this spring project. Open it in your favorite Java editor.
  
In this section, we work on showing a welcome message to the user. To implement this, we need two files; Controller and HTML template. Let's create these files.

##### Step 2: Create Controller

Create GreetingsController java file.

INFO: Create Java files at either the same package level where SpringBootApplication class is or create it under a sub-package.

{% highlight java %}
@Controller
public class GreetingsController {
  @GetMapping("/greeting")
  public String all(Model model, Principal principal) {
    model.addAttribute("userName", principal.getName());
    return "greeting";
  }
}
{% endhighlight %}

Spring will invoke the method 'all' when an HTTP GET on '/greeting' is received. It will pass instances of Model and Principal, and we use them with in the method. The principal object represents the currently logged-in user. The Model is a key-value object store; we use it as an intermediary store between the controller and Thymeleaf template. We are returning the string "greeting" in this method, which means Spring will look for greeting.html in 'src/main/java/resources/templates' folder, processes it, and returns it to the user.

##### Step 3: Thymeleaf HTML Template file

Create greetings.html

{% highlight html %}
<html>
  <body>
    <h2>Welcome <span th:text="${userName}"></span>!</h2>
  </body>
</html>
{% endhighlight %}

${userName} will get replaced with the logged-in user name because, in the controller, we passed the logged-in user name to 'userName'.

##### Step 4: Run Spring Application

In your editor, open the main Spring boot class; usually, it is annotated with @SpringBootAppliation and run it.

##### Step 5: Test

In the browser, open http://localhost:8080/greeting. You will see a login page, it asks for the user name and password. Spring Boot identified that we have Spring Security as a dependency, so Spring configured default security. With the default, security Spring creates a single user with the name 'user', and it generates a random password. Look for Spring startup logs for the random password. Use these credentials to log in.

Now you will see an HTML page with the message saying, Welcome user! As I said earlier, 'user' is the user’s default name, which Spring security will create for us. We successfully created a 