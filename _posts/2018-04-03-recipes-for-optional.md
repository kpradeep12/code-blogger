---
layout: post
title:  "Recipes for Optional"
date:   2018-04-03 08:51:10 -0500
categories: java
image: /assets/images/banners/blog-banner-recipes-for-optional.png
author: pradeep
featured: false
---

Optional allows us to wrap a nullable object in it so we can make a method to return Optional instead of bare object. There is a possibility that below method can return null; so we need to explicitly do the null check on the returned object before using it.

{% highlight java %}
Employee getEmployee(Integer id){
 //return employee;
}
{% endhighlight %}

Check below modified method which returns Optional<Employee> and it communicates very well, saying that the result can be null.

{% highlight java %}
Optional<Employee> getEmployee(Integer id){
 // return optional employee
}
{% endhighlight %}

I will go through some recipes to handle Optional results, before that lets create an EmployeeService which returns Employee object.

{% highlight java %}
class Employee{
    private Integer id;
    private String name;
    private Integer age;
 
    Employee(Integer id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
 
    public Integer getId() { return id; }
    public String getName() { return name; }
    public Integer getAge() { return age; }
 
    @Override
    public String toString() {
        return "Employee{ id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age + '}';
    }
}
 
public class EmployeeService {
    Map<Integer, Employee> store = Map.of(1, new Employee(1, "Peter", 34),
            2, new Employee(2, "John", 28),
            3, new Employee(3, "Bill", 42));
 
    Optional<Employee> getEmployee(Integer id){
        return Optional.ofNullable(store.get(id));
    }
}
{% endhighlight %}

**Recipe 1:** Check if result is present in the Optional using isPresent() and if it present then get the result using get() function.

{% highlight java %}
EmployeeService es = new EmployeeService();
Optional<Employee> emp = es.getEmployee(2);
if(emp.isPresent()){
    System.out.println(emp.get());
}
//Output: Employee{id=2, name='John', age=28}
{% endhighlight %}

Its not a good practice to use isPresent and get methods because this code is doing regular null check and then performing action on it. Instead follow the next recipes which will show you different ways to use Optional result. I used these methods to show available functions in the Optional class.

 
**Recipe 2:** Consume the result with out checking null. ifPresent() takes a consumer and it is  executed only if the result is not null. We no need to explicitly check the null.

{% highlight java %}
EmployeeService es = new EmployeeService();
es.getEmployee(2)
    .ifPresent(System.out::println); 
//Output: Employee{id=2, name='John', age=28}
{% endhighlight %}

**Recipe 3:** Consume and perform action if the result is present and if not present then perform empty action. ifPresentOrElse function takes two parameters, first parameter is consumer which will be executed if the result is present and second parameter is a runnable which will be executed when the result is null.

{% highlight java %}
EmployeeService es = new EmployeeService();
//Employee id 5 is not available.
es.getEmployee(5)
    .ifPresentOrElse(System.out::println,
                     () -> {System.out.println("No object present");});
//Output: No object present
{% endhighlight %}

**Recipe 4:** Perform filter before consuming the result. Filter function takes predicate and returns Optional. We can test the result before processing. Filter function returns empty Optional if predicate returns false.

{% highlight java %}
EmployeeService es = new EmployeeService();
es.getEmployee(3)
      .filter(emp -> emp.getAge() > 40)
      .ifPresent(System.out::println);
//Output: Employee{ id=3, name='Bill', age=42}
{% endhighlight %}

**Recipe 5:** If result is present then perform action on it else perform action by creating new Optional. If getEmployee did not return Employee then we can create and return empty Employee. Other alternatives to this function is orElse(T other), orElseGet(Supplier<? extends T> supplier) both of these functions returns T instead of Optional<T>

{% highlight java %}
EmployeeService es = new EmployeeService();
//Employee id 5 is not available.
es.getEmployee(5)
        .or(() -> {return Optional.of(new Employee(0, "", 0));})
        .ifPresent(System.out::println);
//Output: Employee{ id=0, name='', age=0}
{% endhighlight %}

**Recipe 6:** Throw exception if result is not present. orElseThrow takes supplier which should return throwable object.

{% highlight java %}
EmployeeService es = new EmployeeService();
es.getEmployee(5).orElseThrow(() -> {
            return new IllegalStateException("employee not available");
        });
//Output: Exception in thread "main" java.lang.IllegalStateException: employee not available
{% endhighlight %}

**Recipe 7:** We can map the result to different type with map function. For example using map we can extract employee age from the employee object. The returned employee age from the map is wrapped in its own Optional. So make sure to unwrap it before using.

{% highlight java %}
EmployeeService es = new EmployeeService();
es.getEmployee(2)
        .map(Employee::getAge)
        .ifPresent(System.out::println);
//Output: 28
{% endhighlight %}

**Recipe 8:** Alternative to map is flatMap function. Both of these functions returns Optional except in flatMap we need to explicitly map to Optional.

{% highlight java %}
EmployeeService es = new EmployeeService();
es.getEmployee(2)
        .flatMap(emp -> Optional.of(emp.getAge()))
        .ifPresent(System.out::println);
//Output: 28
{% endhighlight %}
