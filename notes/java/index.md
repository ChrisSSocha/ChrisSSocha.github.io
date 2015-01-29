---
layout: notes
title: Java
---

# Java versions history and features

## Java versions history and features

I wanted to take a closer look at some of the major additions to the Java language, libraries, and platform.

## Java 1.0

Initial release

## Java 1.1

### Nested classes

Nested classes are divided into two categories: static and non-static. Nested classes that are declared static are called **static nested classes**. Non-static nested classes are called **inner classes**. [[1]]

#### Static nested classes

{% highlight java %}
public class OuterClass {

    private static int staticVariable = 0;

    public static class StaticNestedClass {
        public void doAThing(){
            staticVariable++;
        }
    }
}

// Outer class
OuterClass outerClass = new OuterClass();

// Static nested class
OuterClass.StaticNestedClass staticInnerClass = new OuterClass.StaticNestedClass();
{% endhighlight %}
<br>
As with class methods and variables, a static nested class is associated with its outer class. And like static class methods, a static nested class cannot refer directly to instance variables or methods defined in its enclosing class: it can use them only through an object reference (i.e. We would get a `non-static variable 'staticVariable' cannot be referenced from a static context` compilation error if staticVariable was not declared as static).

Note: A static nested class interacts with the instance members of its outer class (and other classes) just like any other top-level class. In effect, a static nested class is behaviourally a top-level class that has been nested in another top-level class for packaging convenience. [[1]]
{: .panel}

#### Inner classes

As with instance methods and variables, an inner class is associated with an instance of its enclosing class and has direct access to that object's methods and fields. Also, because an inner class is associated with an instance, it cannot define any static members itself. An instance of InnerClass can exist only within an instance of OuterClass and has direct access to the methods and fields of its enclosing instance. [[1]]

{% highlight java %}
public class OuterClass {

    private int memberVariable = 0;

    private class InnerClass {
        public void doAThing(){
            //Inner class has access to variables of outer class
            memberVariable++;
        }
    }
}

// Outer class
OuterClass outerClass = new OuterClass();

// COMPILE ERROR! Cannot instantiate inner class that is not static
OuterClass.InnerClass innerClass = new OuterClass.InnerClass();
{% endhighlight %}
<br>
There are two special kinds of inner classes: _local classes_ and _anonymous classes_.

###### Local classes

Local classes are classes that are defined in a block, which is a group of zero or more statements between balanced braces. You typically find local classes defined in the body of a method.

{% highlight java %}
public class OuterClass {

    private int memberVariable = 0;

    public void doAThing(){

        class LocalClass{
            public void doAnotherThing(){
                memberVariable++;
            }
        }
    }
}
{% endhighlight %}

###### Anonymous classes

Anonymous classes enable you to make your code more concise. They enable you to declare and instantiate a class at the same time. They are like local classes except that they do not have a name. Use them if you need to use a local class only once.

{% highlight java %}
public interface Printer {
    public void print();
}

public class OuterClass {

    private String memberVariable = "I'm a member variable";

    public Printer createPrinter(){
        // Anonymous class
        return new Printer() {
            @Override
            public void print() {
                System.out.println(memberVariable);
            }
        };
    }
}
{% endhighlight %}

### JDBC
[...]

### Reflection
[...]

## Java 1.2

### Unified Collections
[...]

### JIT
[...]

## Java 1.3

### Hotspot JVM
[...]

## Java 1.4

### Assert
[...]

### Regular expression
[...]

### Exception chaining
[...]

### Non-blocking IO
[...]

### XML parser and XSLT processor (JAXP)
[...]

## Java 1.5

### Generics
[...]

### Annotations
[...]

### enum
[...]

### concurrent
[...]

## Java 1.6

minor changes

## Java 1.7

### Project coin

* Strings in switch
* try-with-resource

### Timsort > Mergesort
[...]

## Java 1.8

### Lambda expressions
[...]

### Date & Time library
[...]

[1]: http://docs.oracle.com/javase/tutorial/java/javaOO/nested.html "Nested Classes"
[2]: https://jcp.org/aboutJava/communityprocess/maintenance/JLS/innerclasses.pdf "Inner classes specification"
