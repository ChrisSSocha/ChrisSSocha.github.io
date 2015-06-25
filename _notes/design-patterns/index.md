---
layout: notes
title: Design Patterns
parent: true
---
# Introduction

## What is a design pattern?

> "Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice"
>
> ~ Christopher Alexander on patterns in buildings and towns

The design patterns in this book are _descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context_

## Catalog of design patterns

![Design pattern space]({{ site.url }}/assets/img/design-pattern-space.jpg "Design pattern space")

*Creational class patterns* defer some part of the object creation to subclasses, while *creational object patterns* defer it to another object. The *Structural class patterns* use inheritance to compose classes, while the *Structural object patterns* describe ways to assemble objects. The *Behavioural class patterns* use inheritance to describe algorithms and flow of control, whereas the *Behavioural object pattern* describes how a group of objects cooperate to perform a task that no single object can carry out alone.

## Putting reuse mechanisms to work

### Inheritance vs Composition

> Favour object composition over class inheritance

### Delegation

Instead of making class `Window` a subclass of `Rectangle`, the `Window` class might reuse the behaviour of of `Rectangle` by keeping a `Rectangle` instance variable and _degelating_ `Rectangle` specific behaviour to it. Instead of _being_ a `Rectangle` it would _have_ a `Rectangle`.

![Delegation]({{ site.url }}/assets/img/delegation.jpg "Delegation")



**Attribution**:

* _Design Patterns. Elements of Reusable Object-Oriented Software_.  E Gamme, R Helm, R Johnson, J Vlissides
