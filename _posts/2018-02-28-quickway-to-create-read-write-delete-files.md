---
title:  "Quick way to create, read, write and delete files in Java"
date:   2018-02-28 09:25:40 -0500
categories: java
---

Files class in java.nio.file package contains static utility methods to operate on files and directories. In this article I will provide information on some of these static methods. These methods will help us in writing simple and quick code to work on the files. The main advantage of using this class is that we no more need to handle lower level input/output streams.

## Create file
Quick way to create a file is using createFile method by passing the path object. If file already exists then it throws FileAlreadyExistsException, so in the below example I called deleteIfExists method before creating file. I am creating a file which is located at “/Users/pradeep/temp/data.txt” in my computer, so you can create a file with different path based on your computer. If it is Microsoft OS then use \\ in the string to separate the folder paths.

{% highlight java %}
Path create() throws IOException {
        Path path = Paths.get("/Users/pradeep/temp/data.txt");
        //deletes the file if it exists
        Files.deleteIfExists(path);
 
        //creates new file and returns path
        return Files.createFile(path);
}
{% endhighlight %}

## Write to file
Files class have couple of overloaded write methods. In below example I used one of the write method which takes three parameters; path of the file, list of strings to be written into the file and optional array of OpenOption objects. OpenOption tells how the file is created or opened.

{% highlight java %}
void write() throws IOException {
        //writes list of cities into file
        Files.write(Paths.get("/Users/pradeep/temp/data.txt"), 
                Arrays.asList("New York", "San Francisco", "Chicago", "Orlando"));
}
{% endhighlight %}

If we don’t pass OpenOption to this method then this method will use three default OpenOptions CREATE, TRUNCATE_EXISTING and WRITE which means creates file if it doesn’t exist, opens to write content, truncates all existing contents.

There is another overloaded write method which takes byte[] instead of Iterable. This method is useful if you have large data so you can convert it to byte array, for example a string can be converted to byte arrays by calling getBytes() method on it.

## Read file
If you want to get all lines in the file as a List<String> and want to read whole file at once, then you can use ‘readAllLines’ method as mentioned in below example.

{% highlight java %}
void read() throws IOException {
        //readAllLines returns List<String> and forEach iterates on this list and prints to console
        Files.readAllLines(Paths.get("/Users/pradeep/temp/data.txt"))
                .forEach(System.out::println);
}
{% endhighlight %}

In the above example I used forEach on the returned list to print each line on the console, so which means you can process each single line separately. If in case data can not be processed line by line then we can use ‘readAllBytes’ method, this will return whole file content as byte[].

We can also get Stream<String> on the file by calling ‘lines’ method. This will be useful if we want to process the content line by line, but after the processing we should close the stream. Below is the example:

{% highlight java %}
void read() throws IOException {
        //get stream of strings from file
        Stream<String> lines = Files.lines(Paths.get("/Users/pradeep/temp/data.txt"));
        //process each line
        lines.forEach(System.out::println);
        //close the stream
        lines.close();
}
{% endhighlight %}

## Delete file
There are two methods available to delete a file. One of the method is ‘deleteIfExists’ which I used in create() mentioned in first example. The other method is ‘delete’

{% highlight java %}
void delete() throws IOException{
        //deletes the file
        Files.delete(Paths.get("/Users/pradeep/temp/data.txt"));
}
{% endhighlight %}

## Conclusion
All the above examples can be used to do simple file operations easily with out using any third party libraries. Go through the Java 9 Files API to see all available methods.
