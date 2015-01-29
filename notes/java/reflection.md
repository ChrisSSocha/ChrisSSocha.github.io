---
layout: notes
title: Java - Reflection
---

## Dynamic introspection with Java Reflection API

For every type of object, the Java virtual machine instantiates an immutable instance of java.lang.Class which provides methods to examine the runtime properties of the object including its members and type information. Class also provides the ability to create new classes and objects. Most importantly, it is the entry point for all of the Reflection APIs. [[1]]

The entry point for all reflection operations is `java.lang.Class`:

{% highlight java %}
// Object.getClass()
String string = "This is a string";
Class stringClass = string.getClass();

// .class syntax
Class mapClass = java.util.Map.class;

// Class.forName(...)
Class hashMapClass = Class.forName("java.util.HashMap");

// .TYPE for auto-boxed primitives
Class doubleClass = Double.TYPE;
{% endhighlight %}

There are a number of other methods that return `Class`:

* `Class.getSuperclass()`
* `Class.getClasses()`
* `Class.getDeclaredClasses()`
* `Class.getDeclaringClass()`
* `Class.getEnclosingClass()`

Once we have a class, we can extract a lot of information about it, such as modifiers, type parameters, implemented interfaces, annotations etc...

### Getting `Field`s, `Method`s, and `Constructor`s

`getDeclaredFields()` returns a list of all `Field`s that the class has (i.e. public, protected, and private), while `getFields()` returns a list of all publicly accessible `Field`s that the class has (i.e. public, and public inherited fields).

The same pattern can be used to get `Method`s, and `Constructor`s.

**Code:**
{% highlight java %}
import java.lang.reflect.Field;

public class ReflectionTest {
    public static void main(String[] args) throws ClassNotFoundException {

        class SimpleClass{
            public String inheritedPublicField;
            protected String inheritedProtectedField;
        }

        class InheritedClass extends SimpleClass {
            private String privateField;
            protected String protectedField;
            public String publicField;
        }

        System.out.println("-- getDeclaredFields() --");
        Field[] declaredFields = InheritedClass.class.getDeclaredFields();
        for(Field field : declaredFields){
            System.out.println(field.toGenericString());
        }

        System.out.println("-- getFields() --");
        Field[] fields = InheritedClass.class.getFields();
        for(Field field : fields){
            System.out.println(field.toGenericString());
        }
    }
}
{% endhighlight %}

**Output:**

~~~
-- getDeclaredFields() --
private java.lang.String ReflectionTest$1InheritedClass.privateField
protected java.lang.String ReflectionTest$1InheritedClass.protectedField
public java.lang.String ReflectionTest$1InheritedClass.publicField
-- getFields() --
public java.lang.String ReflectionTest$1InheritedClass.publicField
public java.lang.String ReflectionTest$1SimpleClass.inheritedPublicField
~~~

### Modifying `Field`s


**Code:**

{% highlight java %}
import java.lang.reflect.Field;

public class ModifyingFields {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, IllegalAccessException {

        class SimpleClass {
            public String publicField = "public original";
            private String privateField = "private original";
        }

        SimpleClass simpleClass = new SimpleClass();

        Field publicField = simpleClass.getClass().getDeclaredField("publicField");
        Field privateField = simpleClass.getClass().getDeclaredField("privateField");

        System.out.println(publicField.get(simpleClass));

        // MUST make private field accessible, or else it will throw an IllegalAccessException
        privateField.setAccessible(true);

        System.out.println(privateField.get(simpleClass));

        publicField.set(simpleClass, "public changed");
        privateField.set(simpleClass, "private changed");

        System.out.println(publicField.get(simpleClass));
        System.out.println(privateField.get(simpleClass));
    }
}
{% endhighlight %}

**Output:**

~~~
public original
private original
public changed
private changed
~~~

### Calling `Method`s and `Constructor`s
[...]

## Why use reflection
[...]


[1]: http://docs.oracle.com/javase/tutorial/reflect/ "Reflection"
