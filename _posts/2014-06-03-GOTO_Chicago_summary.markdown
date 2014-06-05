---
layout: post
title: GOTO Chicago Summary
date:   2014-06-03
---

I was lucky enough recently to attend GOTO software engineering conference in Chicago. One of the reasons I really enjoy working at ThoughtWorks is the emphasis they place on professional development, and having well informed employees who are active in the community. This is one of the things that I believe make us a really influential (and disruptive) force in our industry. If any of this sounds of interest to you, I've also written a post about [my first 6 months at ThoughtWorks]({{ site.url }}/2014/02/10/First_6_months_at_ThoughtWorks.html) which I encourage you to read, as it could well be a home for you as it has been for me...

This is a quick summary of a few of the many talks that I attended over the two days there, and I recommend you go on the [GOTO Chicago website](http://gotocon.com/chicago-2014) and take a look at some of the other slide decks for the other presentations, as they were interesting and thought provoking. This was also my first opportunity to visit Chicago, which I must say is a beautify vibrant city.

![Photo of Cloud Gate 'The Bean' in Chicago by Chris Socha]({{ site.url }}/assets/img/chicago.jpg "Photo of Cloud Gate 'The Bean' in Chicago by Chris Socha")

## Speed & Scale: How to get there
By Adrian Cockcroft ([Slides](http://gotocon.com/dl/goto-chicago-2014/slides/AdrianCockcroft_TuesdayMorningKeynoteSpeedAndScaleHowToGetThere.pdf))

*__My take away points:__ Challenge assumptions to cause disruption*

A lot of businesses are based on assumptions; If we start to question the assumptions, some may no longer hold true, and this is where there is real potential to disrupt big business. When Adrian Cockcroft was working at Netlix, they looked at the assumptions being made in the infrastructure world, and realised that some of these assumptions were no longer true. The slide below details average peoples reaction to Netflix's infrastructure transformation to the cloud, and how it evolved over time.

![Slide #3]({{ site.url }}/assets/img/goto_speed_and_scale.png "Slide #3")

Adrian discussed some other examples of when questioning the status quo disrupted an industry:

__Assumption__: In Product development, process prevents problems.

Traditional product development goes through the cycle of :

> *Business needs* &rarr; *Approval process* &rarr; *Hardware purchase* &rarr; *Software development* &rarr; *Development & testing* &rarr; *Customer feedback*.

What if we can replace hardware provisioning and approval with an Infrastructure as a Service (IaaS)? Why bother provisioning our own software when we can just use a Platform as a Service (PaaS) cloud? There is even potential to reduce software development by using Service as a System (SaaS) and Business Process as a System (BPaaS)! Now we are left with only two steps to get our business idea live:

> *Business Need* &rarr; *Customer Feedback*

We've reduced cost, size, and risk, and increased the rate of change!

__Assumption__: Development and Operations. Devs write code, Ops run code

It takes *forever* to get infrastructure for a project, and when it finally arrives it is surrounded by a wall of Policy and guarded by Ops so you can never get them in trouble. Why not hand the big red button to the developers (with all the rights and responsibilities that affords)? This needs a culture of responsibility within the organisation, but now developers run their own code (and are on call if it breaks, which gives the incentive to get it right!)

__Summary__:

> *"It's what you know that ain't so"*

* Make your assumptions explicit 
* Extrapolate trends to the limit 
* Listen to non-customers 
* Follow developer adoption, not IT spend 
* Map evolution of products to services to utilities 
* Re-organize your teams for speed of execution

Further reading:

* ["The Phoenix Story"](http://www.amazon.co.uk/The-Phoenix-Project-Helping-Business/dp/0988262592) &larr; A real life horror story
* ["Lean Enterprise"](http://shop.oreilly.com/product/0636920030355.do)

## Kicking the Complexity Habit
By Dan North ([Slides](http://gotocon.com/dl/goto-chicago-2014/slides/DanNorth_KickingTheComplexityHabit.pdf))

*__My take away points:__ Complexity is the default state. Painkillers hide the complexity, but do not resolve it*

Dan North opened the discussion by talking about different definitions of complexity. Peter Senge details two types of complexity in his 1990 book “The Fifth Discipline":

* Detail complexity
    * Lots of variables
* Dynamic complexity
    * Cause and effect are subtle
    * Effects over time of interventions are not obvious.

Dan prefers the James Lewis definition of complexity:

> *"I don't like to look at any code that can't fit in my head"*

Lots of things don't really fit in our heads, but we cope (somehow). Dan described how we deal with different types of complexity using the ["Shifting the Burden Archetype"](http://en.wikipedia.org/wiki/System_archetype#Shifting_the_burden). We can deal with problems by working around it, but this can have some side effects, and only deals with the symptom and not the real problem causing the symptom. Dan used the example of back back pain caused by a back injury. We can deal with it by using painkillers (with the potential side effect of addition), rather than dealing with the problem.

![Slide #8]({{ site.url }}/assets/img/goto_complexity.png "Slide #8")

In software development, our problems and painkillers are:

* Architecture
    * Emterprise mandates
* Design
    * Undirected local changes
    * We like federated decision making, we don't like undirected...
    * "Dont tell then what to do, tell them what needs to happen"
* Tools
    * IDEs
    * Build automation
* Techniques
  * TDD
  * Can't reason whole thing, use small unit tests!
* Process
* Organisation

Instead of using these painkillers, we should be looking at ways of reducing and avoiding these complexities. Since painkillers hide the pain, we need to take a proper look to see what problems are really there. There is an important distinction between *Familiarity* and *Simplicity* (A good exercise is to ask new members of your team "What is the dumbest thing you've seen?").

... and remember, complexity grows one little decision at a time ...

## BFFs TypeScript and Javascript
By Martin Schray ([Slides](http://gotocon.com/dl/goto-chicago-2014/slides/MartinSchray_BFFsTypeScriptAndJavaScript.pdf))

*__My take away points:__ JavaScript superset with optional typing and class-based Object Orientation*

Martin Schray spoke to us about some of the concerns developer at Microsoft have with large scale JavaScript code bases, and how their new language, TypeScript, helps to alleviate some these concerns. Two of the more common complains are the need for compensating patterns to effectively do class-based OO programming, and that refactoring large code bases is hard without static type checking (Which leads to code rot in larger system).

Martin showcased the (optional) type annotations which give us the "design time illusion of typing", and details how it is possible to use 'declaration files' which acts like an interface to 3rd party libraries which allows us to use the type annotations on these libraries (eg. [AngularJS](https://github.com/borisyankov/DefinitelyTyped/tree/master/angularjs))

``` javascript
// TypeScript type annotations
function add(left: number, right: number): number {
  return left + right;
}
```

While classes will be available in the ECMAScript 6, TypeScript gives us class-based OO goodness right away (Classes, interfaces, inheritance, public/private modifiers).

``` javascript
// TypeScript class-base OO
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

``` javascript
// TypeScript class-based OO to JavaScript
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
```

"Refactoring is a lot easier now that we have scope..."

Martin was eager to say that TypeScript is not another example of Microsoft doing ["embrace, extends, and extinguish"](http://en.wikipedia.org/wiki/Embrace,_extend_and_extinguish), so I imagine it is a question which has come up quite often. For me this feels like a really interested tool, as I really like the safe (warm fuzzy) feeling that statically typed languages give me, although I wonder if it could be difficult to walk away from TypeScript after large portions of your code have been generated by the tool?

Have a play online on the [TypeScript Playground](http://www.typescriptlang.org/Playground)

## Functional Principles for OO Developers
By Jessica Kerr ([Slides](http://gotocon.com/dl/goto-chicago-2014/slides/JessicaKerr_FunctionalPrinciplesForOODevelopers.pdf))

*__My take away points:__ Some functional tips that can be applied in every day programming*

Jessica Kerr came to talk to us about functional principles, and how these can be applied to every day development (Not necessarily just in functional languages!). With the (now common?) rule of thumb that we can only reason about the amount of code that fits in James Lewis's head, Jessica asked us to consider not what different programming paradigms give us over other paradigms, but what they let you *not* think about.

Jessica gave us some thoughts on:

__Data in, data out__

* Lets use functions as a unit of abstraction, and start saying *NO* to:
    * global state
    * modifying inputs
    * changing the world
* Easier to test & easier to understand
* Consider _Isolation_
    * Inside my function I don't look out
    * Different to OO encapsulation where no one looks in!

__Specific typing__

* Using tiny types (If you have a type system, you might as well use it!)
* Using Optional type (No more NPE)
* Treating errors as data (Don't interrupt flow by throwing exceptions if it is not an exceptional circumstance)

__Immutability__

* Concurrency is easier if our data structures are immutable
* Is one return type not enough? Use a `Tuple`!

__Declarative style__

* Show what your doing, not how you are doing it
    * "Never tell people how to do things. Tell them what to do and they will surprise you with their ingenuity."  
    _Not first time we've heard this at GOTO Chicago!_
* Good example is SQL which tell you what data we want, but not how to get it


``` sql
select ROLE_NAME,  
UPDATE_DATE  
from USER_ROLES  
where USER_ID = :userId
```
