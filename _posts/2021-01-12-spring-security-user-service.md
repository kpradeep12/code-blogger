---
title: "Spring Security User Service"
date: 2021-01-12 12:11:10 -0500
categories: [java, spring, book]
image: /assets/images/banners/spring-security-user-service.jpg
description: "We need to make sure that only authorized users can able to access an application. This article will help us learn to configure a customized user store so that Spring Security will authorize only if the user provides the right credentials."
book_id: "spring-security-guide"
---

Spring Security will configure a single default user with a username as **user**, and it generates a random password and prints it in the application startup log. We can use this default user to access the application, but we need multiple users in the real world application.

In this section, we will learn to fetch users from an in-memory store. This exercise will help us understand how the Spring security configuration will work. We will also create an in-memory user store and attach it to the Spring security.

We need to get user details from the database or LDAP, or any other third-party application in the real world, but we will start with an in-memory user store to make it simpler. Once you understand this, then you can extend this to integrate with any other user store.

I highlighted the user details service component in the below diagram because we will understand this component in this section.

![Spring Security User Details]({{site.baseurl}}/assets/images/books/spring-security-guide/spring-security-user-details.png){: width="75%" height="75%"}{: .align-center}

The main goal of the User details service is to fetch users from the store. We can fetch users from a datastore or any external system, but we need to integrate our custom logic with Spring security. To implement a custom User details service, we need to implement the *UserDetailsService*{: .hl} interface. Interfaces in the Java language act as a contract, so in this case, **UserDetailsService** acts as a contract between custom logic and Spring security.

Below is the UserDetailsService interface; it has only a single method, **loadUserByUserName**. This method will fetch the user based on the provided username. In this section, we will implement this interface to fetch users from an in-memory store.

{% highlight java %}
public interface UserDetailsService {
    UserDetails loadUserByUsername(String var1) throws UsernameNotFoundException;
}
{% endhighlight %}

Source code for this section is available *[here](https://github.com/kpradeep12/thetechstack-projects/tree/main/spring-security-user-service-2){:target="_blank"}*{:.ul} *&nbsp;*{:.fas .fa-external-link-alt .small_text}.

Create a package called **config** and under this, create a Java class file *InMemoryUserDetailsService.java*{: .hl}; this class will implement the **UserDetailsService** interface. Below is the code;

{% highlight java %}
public class InMemoryUserDetailsService implements UserDetailsService {
private final List<UserDetails> users =
List.of(User.builder().username("john").password("test").authorities("READ").build(),
User.builder().username("adam").password("test").authorities("READ").build(),
User.builder().username("david").password("test").authorities("ADMIN").build());

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
       Optional<UserDetails> user = users.stream()
           .filter(userDetails -> userDetails.getUsername().equals(s))
           .findFirst();
    
        if(user.isEmpty())
            throw new UsernameNotFoundException("User " + s + " not found");
    
        return user.get();
    }
}
{% endhighlight %}

We implemented **loadUserByUsername** method. This method is so simple; we are doing three things in this method.

* Iterate the user store and find the provided username.
* If no user is found, then throw *UsernameNotFoundException*{: .hl}.
* If a user is found, then Return the user.

If you notice, **loadUserByUsername** returns *UserDetails*{: .hl}. We have not discussed about UserDetails till now. Spring security can only recognize users of type UserDetails. UserDetails is an interface; it is a contract provided by Spring for us to define users. This interface represents a User. If we want to implement a custom User object, then implement this interface so Spring can identify it as a User. Below is the UserDetails interface structure.

{% highlight java %}
public interface UserDetails extends Serializable {
    Collection<? extends GrantedAuthority> getAuthorities();
    String getPassword();
    String getUsername();
    boolean isAccountNonExpired();
    boolean isAccountNonLocked();
    boolean isCredentialsNonExpired();
    boolean isEnabled();
}
{% endhighlight %}

This interface has all the methods needed to represent a User;
* **getAuthorities**; All users are not the same in the application. It may need a different kind of users. For example, **read-only**, **admin**, or **super-admin**. *Authority*{: .hl} is an interface that represents the type of user. A single user can represent different types like (read-only and admin), so this method returns the authoritie's as collection.
* **getPassword** and **getUsername** are straightforward; they will return passwords and usernames.
* **isAccountNonExpired**, **isAccountNonLocked**, **isCredentialsNonExpired** and **isEnabled** are to support more security features. If you implement UserDetails then all these methods should return **true** to pass the authentication.

Spring security comes with a class called *User*{: .hl}. This class implements the **UserDetails** interface, so we no need to implement the UserDetails interface for our demo application. Instead, we will use the default **User** class. Below code snippet creates a User instance.

{% highlight java %}
User.builder().username("john").password("test").authorities("READ").build();
{% endhighlight %}

User has an inbuilt builder class, using which we can chain the methods and finally call the build() to create a User instance. In the above code snippet, we created a single user with a username as **john**, password as **test**, and a single authority of **READ**.

We added three users to our List. In the **loadUserByUsername** method, we iterated this list to search for the provided username.

We have our UserDetailsService ready, but we have one more thing left; we need to tie this service to Spring security so then only Spring can recognize this service. To do that, we need to create a configuration class and wire the beans. Create a new class under the **config** package and call it **UserConfiguration.java**. Copy below content in that class;

{% highlight java %}
@Configuration
public class UserConfiguration {

    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
{% endhighlight %}

This class is declared with **@Configuration** annotation, which means this class will have application configuration, and it will get loaded on application startup. This class has two methods **userDetailsService()** and **passwordEncoder()**. Both are declared with **@Bean** annotation, which means Spring will call these methods and stores the returned instances. On application startup, Spring will provide instances of UserDetailsService and PasswordEncoder to Spring Security.

In userDetailsService(), we are simply returning an instance of **InMemoryUserDetailsService**, and because we configured UserDetailsService, so it is mandatory to configure PasswordEncoder.

We use PasswordEncoder for two things; **encode the password** and **compare the password**. We will learn more about PasswordEncoder in the next sections. In passwordEncoder(), we are just returning an instance of **NoOpPasswordEncoder**. NoOpPasswordEncoder comes with Spring security; it is not a recommended PasswordEncoder in the production. It is useful for testing purposes and works on plain text.

We completed our configuration. The next step is to run the application and verify if the application accepts only the users we have in the in-memory store. Run the application. Once the application is up, notice that there will be no password printed in the startup logs because we provided a custom configuration.

Open a new browser tab and go to *[http://localhost:8080/greeting](http://localhost:8080/greeting){:target="_blank"}*{:.ul} *&nbsp;*{:.fas .fa-external-link-alt .small_text}. You are prompted with a login form. Enter any user credentials which we configured in the InMemoryUserDetailsService and click on Sign-in. Application will successfully authenticate and displays a welcome message along with the username.

You can improve this application by extending the functionality of InMemoryUserDetailsService to fetch the users from a database or any other third party service.

In this section, we learned how to customize user service and configure it with Spring security.