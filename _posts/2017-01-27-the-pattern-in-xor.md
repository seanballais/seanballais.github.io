---
layout:     post
title:      "The Pattern in XOR"
date:       2017-01-27 17:33
author:     "Sean Francis N. Ballais"
permalink:  /blog/the-pattern-in-xor/
header-img: "img/posts/the-pattern-in-xor/header.jpg"
comments: true
description: "Hidden in XOR is a pattern that will help speed up calculating the XOR sum in a given range."
---

Let's say that your Computer Science professor decided to give you an assignment where you have to calculate the XOR sum from zero to a given number. The XOR is similar to addition but uses the XOR operator instead of the plus operator. Feeling confident you can solve this assignment, you immediately thought of creating a function that looks like the code below.

```python
def calculateXOR(max_num):
    sum = 0
    for num in range(max_num):
        sum ^= num

    return sum
```

But then you decided that you can simplify it by using functional programming. You modified the code, and reduced the function body to a single `return` statement.

```python
import operator
import functools

def calculateXOR(max_num):
    return functools.reduce(operator.xor, [0 + i for i in range(max_num + 1)])
```

You feel satisfied and are getting ready to submit the assignment. But to your dismay, the professor now requires you to make the time complexity $$O(1)$$ instead of $$O(n)$$.

*Have you used the XOR pattern before? What did you use it for? Got any bit manipulation tricks you would like to share? Want to say something? Let us know in the comments below.*
