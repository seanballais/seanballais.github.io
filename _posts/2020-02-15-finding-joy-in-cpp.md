---
layout:     post
title:      "Experiencing C&#43;&#43;"
date:       2020-02-15 22:06
author:     "Sean Francis N. Ballais"
permalink:  /blog/from-python-to-cpp/
header-img: "img/posts/comic-strip-3-when-you-add-a-new-feature-without-enough-tests/header.jpg"
comments: true
description: "Hey!"
---

For almost 5 years, my go-to language has been Python. Plenty of my personal projects, from an [open source election system](https://github.com/seanballais/botos) to [a (poorly-made) Worley Noise implementation](https://github.com/seanballais/worley-noise-demo), a few of my works in university (from small utilities to projects) are made in Python. It served me well. But, over time, a lingering feeling have crept up in me that I should not ignore.

# Problems in Python Land
Python is a relatively easy-to-use programming great for learning concepts and building applications. It taught me new software engineering and CS concepts, such as the name binding nature of Python variables (which is interesting!), package managers, and virtual environments. I used it to develop [an election system](https://github.com/seanballais/botos) for my high school alma mater, which was later used in another local school, as part of my recent freelance gig. I also received offers for interviews for Python-related jobs: one for a [senior developer role in Sweden](http://seanballais.github.io/blog/a-job-offer-from-madrid/), and another for an intern Django developer role in Germany. I used it in solving coding problems in competitive programming sites, such as HackerRank and Leetcode.

## Dynamic Typing: A Double-Edged Sword
However, it is not always sunshines and rainbows with Python. By design, Python is dynamically typed. This means that the Python interpreter will infer the type of a variable on runtime. You no longer need to specify the type of a variable, debugging will be faster, generic programming will be easier to implement, and code readability tends to be better. To demonstrate what dynamic typing brings to the table, let us compare a basic implementation of a square function, `square()` for integers, floats, and doubles between Java and Python. In Java, we can implement a square function via:

    public static int square(int n)
    {
        return n * n;
    }

    public static float square(float n)
    {
        return n * n;
    }

    public static double square(double n)
    {
        return n * n;
    }

As seen from above, `square()` is implemented multiple times for different primitive types. This procedure is quite cumbersome. Another option here is to use generics. However, in Java, you can only pass objects to generic functions. We would have to box (i.e. convert a primitive data type into an object) variables just in order for us to be able to pass arguments to a generic `square()`. Boxing [can lead to performance issues](https://stackoverflow.com/a/5199425/1116098) when done too many times.

In the contrary, in Python, an implementation of `square()` can simply be:

    def square(n):
        return n * n

That's it! &mdash; a single function definition. In Python, `square()` will simply take in any argument for `n`, may it be an `int`, `float`, or `double`, and return a square of `n`. No fuzzes about the wrong data type being passed, no boxing, and no duplicate code. Just pure elegance in display, and a showcase of the beauty of dynamic typing.

Yet, behind such beauty, lies a dark side. On the surface, dynamic typing will seem to make development easier and faster. However, as the codebase increases in size, it starts to become more of a liability. The lack of the need to specify the data type of a variable or a function parameter will lead to problems. It takes more effort to read Python code than statically-typed languages. The data type cannot always be easily determined. You must sometimes consult the documentation to figure out what the data types are. Dynamic typing can also introduce implicit side effects which will give out unexpected results. Let's take the simple expression:

    a * b

This expression simply multiplies two variables together. However, thanks to dynamic typing, `a` and `b` can be anything. What if `a` is an integer, but `b` is a character? In other languages, there could be a warning or a compilation error. But in Python, the result would be a string of `b` repeated for times. It is not something that you would normally expect, unless it was actually your intention.

    >>> a = 5
    >>> b = 'A'
    >>> a * b
    'AAAA'

Fortunately, this lack of static typing has been dealt with the introduction of [type annotations](https://www.python.org/dev/peps/pep-0484/), introduced in Python 3.5. However, I would not vouch that the majority of Python code bases utilizes this feature.

## A More Personal Dilemma
Another "problem" I had with Python is personal rather than technical. I had been indulging myself in Python for quite some time that I have started feeling that my skills were stagnating. I felt that I was specializing too much in Python. I was most confident with Python, and felt that I would do poorly when working with other languages.

The feeling of being a one-language pony is uncomfortable for me. The tech industry moves fast. A cutting-edge technology today would become obsolete tomorrow. Those in the industry must always try to keep up with the latest tech. Remaining only confident in working with a single technology severely limits the opportunities one can take. This limitation of opportunities actually happened to me. For the second half of 2019, most job opportunities that I have been bookmarking were those that mostly involved using Python (though a few of those were Java roles). The jobs were mostly either web development or DevOps roles.

# All I Needed Was... `\&nbsp;`

