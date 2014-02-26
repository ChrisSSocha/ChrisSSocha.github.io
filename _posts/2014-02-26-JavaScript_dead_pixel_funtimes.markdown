---
layout: post
title: JavaScrip Dead Pixel Funtimes
date:   2014-02-26
---

Just for fun, add *dead pixel* to your screen with this JavaScript bookmarklet:

{% highlight javascript %}
javascript:(function(pixelSize){

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  x = getRandomInt(0, screen.width);
  y = getRandomInt(0, screen.height);

  var deadPixel = document.createElement('div');

  deadPixel.style.position = "fixed";
  deadPixel.style.zIndex = "1000";
  deadPixel.style.width = pixelSize + "px";
  deadPixel.style.height = pixelSize + "px";
  deadPixel.style.backgroundColor = "black";
  deadPixel.style.left = x + "px";
  deadPixel.style.top = y + "px";

  document.body.appendChild(deadPixel);

  console.log("Added dead pixel at " + x + ", " + y);
  
})(2)
{% endhighlight %}

<script type="text/javascript">
	deadPixel(2);
</script>
