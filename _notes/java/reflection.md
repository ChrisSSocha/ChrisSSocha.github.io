---
layout: notes
title: Java - Reflection
parent: false
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
<br>
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
<br>
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
<br>
**Output:**

~~~
public original
private original
public changed
private changed
~~~

### Calling `Method`s

**Code:**

{% highlight java %}
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.stream.IntStream;

public class InvokingMethods {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        class SimpleClass{

            public void printOut(String string){
                System.out.println("Invoking 'printOut' with parameter " + string);
            }

            private int add(int... integers){
                // Note: Streams are from Java 1.8
                return IntStream.of(integers).sum();
            }
        }

        SimpleClass simpleClass = new SimpleClass();

        Method printOutMethod = simpleClass.getClass().getDeclaredMethod("printOut", String.class);
        printOutMethod.invoke(simpleClass, "Hello World");

        Method addMethod = simpleClass.getClass().getDeclaredMethod("add", int[].class);
        addMethod.setAccessible(true);
        Object result = addMethod.invoke(simpleClass, new int[]{1, 2});
        System.out.println(result);
    }
}
{% endhighlight %}
<br>
**Output**:

~~~
Invoking 'printOut' with parameter Hello World
3
~~~

### Calling `Constructor`s

**Code:**

{% highlight java %}
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class InvokingConstructors {
    public static void main(String[] args) throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        class SimpleClass{
            public SimpleClass(){
                System.out.println("Invoked public no arg constructor");
            }
            private SimpleClass(String string){
                System.out.println("Invoked private constructor with arg: " + string);
            }
        }

        Class simpleClassClass = SimpleClass.class;

        simpleClassClass.newInstance();

        Constructor declaredConstructor = simpleClassClass.getDeclaredConstructor(String.class);
        declaredConstructor.setAccessible(true);
        declaredConstructor.newInstance("hello world");
    }
}
{% endhighlight %}
<br>
**Output**:

~~~
Invoked public no arg constructor
Invoked private constructor with arg: hello world
~~~


## Reflection in the wild

One good example of reflection is in JUnit 4 which uses reflection to identify which methods in the test class have the `@Test` annotation.

Here is an code example of a (failing) JUnit test. We first pass the class to JUnitCore to be run; unless we have specified a JUnitRunner (with the `@RunWith`) annotation, JUnit will use the default class runner. The class runner instanciates a TestClass which identifies which if the methods have the `@Test`, and should be run as a test.

{% highlight java %}
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.Result;

public class JunitTest {

    public static void main(String[] args){
        Result result = JUnitCore.runClasses(JunitTest.class);
        System.out.println("Test " + (result.wasSuccessful() ? "success" : "failure"));
    }

    @Test
    public void aSimpleTest() throws Exception {
        Assert.assertTrue(false);
    }
}
{% endhighlight %}
<br>
JUnit4ClassRunner.java

{% highlight java %}
public JUnit4ClassRunner(Class<?> klass) throws InitializationError {
    testClass = new TestClass(klass);
    testMethods = getTestMethods();
    validate();
}
{% endhighlight %}
<br>
TestClass.java

{% highlight java %}
public List<Method> getAnnotatedMethods(Class<? extends Annotation> annotationClass) {
    List<Method> results = new ArrayList<Method>();
    for (Class<?> eachClass : getSuperClasses(klass)) {
        Method[] methods = MethodSorter.getDeclaredMethods(eachClass);
        for (Method eachMethod : methods) {
            Annotation annotation = eachMethod.getAnnotation(annotationClass);
            if (annotation != null && !isShadowed(eachMethod, results)) {
                results.add(eachMethod);
            }
        }
    }
    if (runsTopToBottom(annotationClass)) {
        Collections.reverse(results);
    }
    return results;
}
{% endhighlight %}
<br>

Other good examples of reflection:

* IoC/DI containers
* Spring uses reflection to create its beans
* Java API for XML Parsing (JAXP)

More Reading:

* [Java Reflection tutorial](http://docs.oracle.com/javase/tutorial/reflect/)
* [Reflection Madness](http://www.javaspecialists.eu/talks/oslo09/ReflectionMadness.pdf)
* [Take an in depth look at the java reflection API](http://www.javaworld.com/article/2077015/java-se/take-an-in-depth-look-at-the-java-reflection-api.html)

[1]: http://docs.oracle.com/javase/tutorial/reflect/ "Reflection"
