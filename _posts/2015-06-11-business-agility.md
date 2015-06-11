---
layout: post
title: Business agility and fast feedback
date:   2015-06-11
published: false
---

For me **business agility** is about having the **fast feedback loops** that give us the **confidence** to move at speed.

Businesses want the ability to go to market quickly and see what their customers think, and be able to quickly change their offering depending on customers needs and feedback.

To be in a position where we can deploy our updated software frequently, we need to have confidence in our software and our deployment process. On waterfall projects there is often a lot of pain associated with the testing and deployment. We have a saying, "*If something hurts, do it more often*", and this is where the concept of Continuous Delivery come into play.

Continuous delivery is a practice where every single time a developer check code in our source version control system, our CD server picks up the changes and automatically builds the software, runs a suite of tests, packages it, and deploys it to our development server. If any of these steps fail, our build will go 'red' and the pipeline will halt. If all the steps have succeeded, then that check in can be promoted to the QA environment and so on until it hits production. CD ensures that every single check in is tested, deployable, and can be deployed into production if the there is a business need. Deployment used to be painful but now we do it multiple times a day is is a non event.

One of the components I mentioned there was testing; To have confidence in the quality of our software our CD system automatically runs a suite of tests. With the aim of getting faster feedback, we don't need to wait for our code to be picked up by the CD software to be tested, but can easily run the tests on our developer machines, which means less waiting. Another technique we use to get faster feedback is to write different types of tests, which form a pyramid shape: At the bottom of the pyramid we have lots of very small tests that we call unit tests that can typically be run in just a few seconds, if those have passed we can run our integration level tests that check how our individual components work together, and finally we can run our functional level tests which tests our product from the customers perspective, in this case through the browser.

Most people think the software development process means that we write the code, and then we write the tests to prove that it works. We've flipped that and follow a practice called Test Driven Development where we write the tests first that state what we expect the software should do, then write the code to satisfy that test case. In this manner we know that all of our software will have a suite of associated tests that prove correctness, and you quickly get a large suite of tests that will point us to any regressions.

So for business agility we need to have the confidence that we can deploy quickly, and for rapid deployments we need to have the confidence that the software we are deploying is functional. Continuous Delivery and automated testing is how developers ensure business agility.