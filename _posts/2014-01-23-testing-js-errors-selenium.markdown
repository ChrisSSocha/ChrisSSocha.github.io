---
layout: post
title: Testing JavaScript errors using Selenium
date:   2014-01-23
---

While it is easy to unit test JavaScrip using frameworks like [Jasmine](http://pivotal.github.io/jasmine/), some JavaScript errors only occur when you integrate the different components together. Something I was interested in looking at was trying to catch JavaScript errors during the functional testing stage.

I've seen various solutions online that discuss adding logging attributes to the document, but these will be lost whenever we change pages. Instead, why not use some fun HTML5 features (Don't worry about browser compatibility, you'll only be using this in testing) and save errors to the session. Here is a sample code snippet:

{% highlight javascript %}
window.onerror=function(msg){
	if (!sessionStorage.jsError){
		sessionStorage.jsError = "";
	}

	sessionStorage.jsError += msg += "; ";
}
{% endhighlight %}

We can query what JavaScript errors have happened in out current session by calling `sessionStorage.jsError`; if it is falsey (e.g. `undefined`) then there have been no errors.

If you add this to your JavaScript when you are running in your developer environment you can test using the following Java code:

{% highlight java %}
// Note: Compiled, but not tested.
public class JSError {
    private final JavascriptExecutor js;

    public JSError(WebDriver driver){
        js = (JavascriptExecutor) driver;
    }

    public void assertNoJSErrors(){
        String jsErrors = (String) js.executeScript("sessionStore.jsError");
        assertThat(jsErrors, is("undefined"));
    }

    public void clearJSErrors(){
        js.executeScript("delete sessionStore.jsError");
    }
}
{% endhighlight %}

Happy testing!