---
layout: post
title:  "Chain of responsibility"
date:   2018-05-17 12:11:10 -0500
categories: java
image: /assets/images/banners/chain-of-responsibility-design-pattern.png
author: pradeep
featured: false
---

Chain of responsibility is one of the behavioral design pattern in Gang of Four patterns. The main objective of this design pattern is processing a command. For example, command can be any application related task like approving a transaction, writing text to a log file or filtering HTTP requests. 

We can write a simple piece of code to process these commands, but what if, if we want to process these commands based on certain conditions? For instance, in the transaction approval application user keys in transaction details into the application and this transaction need to be processed by any one of the higher level employee in the company. All transactions lesser than 1000$ amount can be approved by manager, lesser than 10000$ can be approved by vice president and lesser than 100,000$ can be approved by CEO.

We can implement this behavior with a simple if else conditions, by checking if amount is less than 1000$ or else if amount is less than 10000$ and so on. But this approach is static, means we can not change these conditions dynamically. We got the chain of responsibility design pattern to rescue us in this situation.

Chain of responsibility acts like a if..else condition but in a object oriented way and it gives us a dynamic nature to the conditions, means we can change the order of the conditions or remove or add new conditions dynamically. These conditions are like responsibilities and we chain these responsibilities together.

In the transaction processing application, approval process acts like a chain of responsibilities. First, manager acts on the transaction, if the amount is higher than his approval limit then the transaction is transferred to vice president and so on. 

We need to design processing and command objects. Based on the above example, processing objects are employees like Manager, Vice President because they process the transaction by approving and command object is the transaction. Once processing objects are created then we need to chain them together like manager -> vice president -> CEO and pass the transaction at the beginning of the chain. Transaction continues to flow in the chain until it reaches the employee, who's limit allows to approve it.

Lets get in to the coding part. We will first create an abstract class for processing the transactions: 

{% highlight java %}
abstract class TransactionProcessor{
    private TransactionProcessor transactionProcessor;
    abstract protected Double getApprovalLimit();
    abstract protected String getDesignation();

    public void setSuccessor(TransactionProcessor transactionProcessor) { // <1>
        this.transactionProcessor = transactionProcessor;
    }

    public void approve(Transaction transaction) {
        if(transaction.getAmount() <= getApprovalLimit()) {
            System.out.printf("transaction for amount %s approved by %s %n",transaction.getAmount(), getDesignation());
        }else {
            if(transactionProcessor == null) {
                System.out.printf("transaction amount %s is higher than approval limit! %n", transaction.getAmount());
                return;
            }

            transactionProcessor.approve(transaction);
        }
    }
}
{% endhighlight %}
<1> If the transaction can be processed then it should be passed to its successor so this class store its next successor object.  
<2> If transaction is with in the limit then it prints the message. If it is out of range then passes it to next processor by calling 'approve' method, before callings approve we are doing null check because it throws NullPointerException if processor is last in the chain.

Now we need to create concrete class for each approver and this class will extend TransactionProcessor.

{% highlight java %}
class Manager extends TransactionProcessor{

    @Override
    protected Double getApprovalLimit() {
        return 1000d;
    }

    @Override
    protected String getDesignation() {
        return "manager";
    }
}
class VicePresident extends TransactionProcessor{

    @Override
    protected Double getApprovalLimit() {
        return 10000d;
    }

    @Override
    protected String getDesignation() {
        return "vice president";
    }
}
class CEO extends TransactionProcessor{

    @Override
    protected Double getApprovalLimit() {
        return 100000d;
    }

    @Override
    protected String getDesignation() {
        return "CEO";
    }
}
{% endhighlight %}

Each processing class sets its limit and designation. Next, we need to create a command class. In our example transaction acts like a command, so lets create it.

{% highlight java %}
class Transaction{
    private Double amount;
    private String purpose;

    Transaction(Double amount, String purpose){
        this.amount = amount;
        this.purpose = purpose;
    }

    public Double getAmount() {
        return amount;
    }

    public String getPurpose() {
        return purpose;
    }
}
{% endhighlight %}

Now we will glue all these classes together to form chain of responsibility pattern. 

{% highlight java %}
public class ChainOfResponsibility {
    public static void main(String[] args) {
        Manager manager = new Manager(); // <1>
        VicePresident vicePresident = new VicePresident();
        CEO ceo = new CEO();

        manager.setSuccessor(vicePresident); // <2>
        vicePresident.setSuccessor(ceo);
        //not setting successor for CEO because CEO is the highest level in the company.

        manager.approve(new Transaction(500d, "general")); // <3>
        manager.approve(new Transaction(1200d, "general"));
        manager.approve(new Transaction(25000d, "general"));
        manager.approve(new Transaction(500000d, "general"));
    }
}
{% endhighlight %}
<1> Create processing objects. We have three processing objects in the chain.  
<2> Chain together all the processing objects. Order of the objects is important because we want manager handover transaction to vice president.  
<3> Because the chain starts from the manager so transactions are pushed using the manager instance.

See below for the output of the program
{% highlight bash %}
transaction for amount 500.0 approved by manager 
transaction for amount 1200.0 approved by vice president 
transaction for amount 25000.0 approved by CEO 
transaction amount 500000.0 is higher than approval limit! 
{% endhighlight %}

Based on the output it is clear that manager approved 500$ because manager can approve up to 1000$. Next transaction with 1200$ is approved by Vice president because this amount is out of range for manager so this is handed over to Vice president, like wise 25000$ is handed over to CEO. 500000$ is out of limit for all the employees so it will reach the end of the chain and finally returns from the flow.

## Conclusion
In this post we learned Chain of responsibility design patter. It is a object oriented version of if..else condition. Use this pattern if there are possibility of multiple processing objects involved. 