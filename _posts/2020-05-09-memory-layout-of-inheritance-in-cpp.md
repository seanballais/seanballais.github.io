---
layout:     post
title:      "Implementation of Non-Virtual Inheritance in C&#43;&#43;"
date:       2020-05-03 18:38
author:     "Sean Francis N. Ballais"
permalink:  /blog/memory-layout-of-inheritance-in-cpp/
header-img: "img/posts/memory-layout-of-inheritance-in-cpp/header.png"
comments: true
description: ""
---

A pillar of object-oriented programming, often simply abbreviated to OOP, is inheritance. It allows different classes to share a set of attributes and functions. This mechanisms allows for reusability, as you no longer need to duplicate code across different classes. The class that inherits from another class is called the derived class. It may also be called the subclass. On the other hand, the class that is being inherited from is called the base class, or superclass. A consequence of inheritance is that it provides a way to establish is-a relationships between classes, which we can map to the real world. For example, let's say we have a class `CPU`, and a class `Ryzen`. If we let `Ryzen` inherit (or derive) from `CPU`, then the relationship, `Ryzen` is a `CPU`, is created. `Ryzen` will also be able to access functions defined in `CPU`.

Many languages implement object-oriented programming. Most of the top 10 programming languages in the [TIOBE Index for May 2020](https://web.archive.org/web/20200503005803/https://www.tiobe.com/tiobe-index/) supports OOP. C++ is one of those languages. C++ is a popular, high-level language used in building many applications, especially those that need high performance, like games and financial trading software. Being an object-oriented language, C++ also has inheritance built in. Making a class inherit from another class in C++ is done by simply adding a colon, an access specifier, and the base classes, in that specific order, after the name of the inheriting class. The code below demonstrates this.

    class Base
    {
      public:
        void hello() {}
        int publicX;

      private:
        int privateX;
    };

    class Derived : public Base // Notice the colon, access specifier, and base class
    {
      public:
        void hi() {}
    };

In the code above, `Derived` will now be able to use `Base`'s `hello()` function, and now has a `publicX` variable inherited from `Base`.

Inheritance may seem magical. But, we will find out that the i [Blegh! Improve this bridge to the next section.]

# Inheriting From Just One Class

# Multi-Level Inheritance

# Inheriting From A Class With Virtual Functions

# Inheriting From Two Classes

# References and Additional Readings

 * [C++ Inheritance (Programiz)](https://www.programiz.com/cpp-programming/inheritance)
 * [C++ Inheritance (TutorialsPoint)](https://www.tutorialspoint.com/cplusplus/cpp_inheritance.htm)
 * [OOP Concept for Beginners: What is Inheritance?](https://stackify.com/oop-concept-inheritance/)
 * [What is Inheritance in Programming?](https://www.educba.com/what-is-inheritance-in-programming/)
 * [Understanding Inheritance and Different Types of Inheritance](https://www.dotnettricks.com/learn/oops/understanding-inheritance-and-different-types-of-inheritance)
