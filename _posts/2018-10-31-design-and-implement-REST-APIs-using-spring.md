---
layout: post
title:  "Design and Implement REST API's using Spring"
date:   2018-10-31 12:11:10 -0500
categories: java
image: /assets/images/banners/design-and-implement-rest-apis.png
author: pradeep
featured: false
description: "Example based article on designing and implementing rest API's. Using Spring REST."
---

REST endpoints are used in integrating applications or in providing services to the clients. In this article I will go through a CRUD based application to design and implement REST endpoints using Spring boot. I have a sample customer data and I will create a corresponding Spring REST Controller to access customer data. To make it simple I will focus only on the controller class instead of on whole spring application.You can download full project in [github](https://github.com/kpradeep12/mycustomers).

This is a CRUD application so controller will have four basic methods to support get, save, update and delete operations. All these operations will work on the customer data. Below is the skeleton of the controller class.

{% highlight java %}
@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
    
    //get, save, update and delete methods go here
}
{% endhighlight %}
All end points to the customer resource begins with /customers.

## Design and Implement End Points

End points should be short and simple enough to use. For example, to get customers by Id we can have end point like **/customers/{id}** Never have actions or verbs in the URL for example **/customers/getCustomerById** is bad because getting customer by Id is a action and we can provide this action using HTTP method so this is redundant and it complicates the URL. HTTP provides various methods which can be used to simplify the end points. HTTP provides some standard methods like GET, PUT, POST or OPTIONS and so on. All these methods will help is designing simple REST end point and since this is standard so everyone can understand them.

## GET

GET method is used to access the resource. To get customer record based on the id we can have endpoint like /customers/{id}. Below is the implementation of this end point.

{% highlight java %}
@RequestMapping(value = {"/{id}"})
ResponseEntity byId(@PathVariable String id){
    if(!customerRepository.existsById(id))
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // HTTP 404

    return new ResponseEntity<>(customerRepository.findById(id).get(), HttpStatus.OK); // HTTP 200
}
{% endhighlight %}

When clients request invalid or non existing 'id' then instead of responding with custom body or error message we can use standard HTTP response codes. HTTP response codes are the standard way in the REST to inform the processing status. There are many categories of codes available, here is the link for some information on these codes.

* 404 - NOT FOUND: Using this HTTP code is appropriate if 'id' is not available in the data store. Note that this HTTP code is a standard code to represent no data found so client understands this with out any extra information in the response body.
* 200 - OK: Successfully processed the request.

## POST

This method is used to create new data record. End point for this request is **/customers**. Data is sent as part of body so no request parameters are needed.

{% highlight java %}
@RequestMapping(value = {""}, method = RequestMethod.POST)
ResponseEntity<?> save(@RequestBody Customer customer){
    if(customer == null)
        return new ResponseEntity(HttpStatus.BAD_REQUEST); // HTTP 400
    if(customerRepository.existsById(customer.getId()))
        return new ResponseEntity(HttpStatus.CONFLICT); // HTTP 409

    Customer cust = customerRepository.save(customer);
    return new ResponseEntity<>(cust, HttpStatus.CREATED); // HTTP 201
}
{% endhighlight %}

* 400 - BAD REQUEST: If the request is null then this notifies the client that the request is bad.
* 409 - CONFLICT: If the id of new customer is already existing in the data store then it is a conflict request.
* 201 - CREATED: All validations are successful and data is inserted in to the store.

## PUT

This method allows users to update existing data records. End point for this request is **/customers**, data is sent as part of the body so no more request parameters are needed.
{% highlight java %}
@RequestMapping(value = {""}, method = RequestMethod.PUT)
ResponseEntity<?> update(@RequestBody Customer customer){
    if(customer == null)
        return new ResponseEntity(HttpStatus.BAD_REQUEST); // HTTP 400
    if(!customerRepository.existsById(customer.getId()))
        return new ResponseEntity(HttpStatus.BAD_REQUEST); // HTTP 400

    return new ResponseEntity<>(customerRepository.save(customer), HttpStatus.CREATED); // HTTP 201
}
{% endhighlight %}

* 400 - BAD REQUEST: If body is empty or customer is not available in the data store.
* 201 - CREATED: There is no standard HTTP code for update so we can respond with 201 for update.

## DELETE

This method should be used for delete requests. End point for this request is **/customers/{id}**. Specified id in the request will be deleted from the store.

{% highlight java %}
@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
ResponseEntity<Object> delete(@PathVariable String id){
    if(!customerRepository.existsById(id))
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // HTTP 400

    customerRepository.deleteById(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT); // HTTP 204
}
{% endhighlight %}
* 400 - BAD REQUEST: If id is not existing in the data store then it is a bad request.
* 204 - NO CONTENT: Data will not be available once it is deleted so 204 is appropriate in this case. We can also consider using 200.

## Conclusion

This article demonstrated various design strategies in developing REST end points.