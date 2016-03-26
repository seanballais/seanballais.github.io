---
layout:     post
title:      "Developing Basyang Server Part 1"
subtitle:   "The experience in developing the server for Basyang"
date:       2016-03-26 21:48
author:     "Sean Francis N. Ballais"
permalink:  "/blog/developing-basyang-server-part-1/"
header-img: "img/posts/developing-basyang-server-part-1/header.png"
comments: true
description: "In this part 1 of the Developing the Basyang Server series, I share my experiences on developing the first incomplete version of the Basyang server."
---

Late December 2015, two of my friends ([Warren Chu](https://twitter.com/wechuuuuu) and [Ray Mart Montesclaros](https://web.facebook.com/profile.php?id=1679863886&ref=br_rs)) and I formed a startup called [Creatomiv](https://web.facebook.com/CreatomivStudios/) with [Francis Plaza](https://twitter.com/TheFrancisPlaza) as our mentor and advisor. It is a tech startup that aims to develop mobile apps of different categories. Recently, we are currently working on first product called Basyang, an app that lets you create stories with friends. I was charged with developing the server application and developing it is quite fun and frustrating.

Initially, we were planning to develop Basyang Server in Go for its speed, its similarity to C, and appeal for back-end web development. I tried it out for nearly a month and found it quite a joy to use. However, I hated the project structure of each Go project. I just don't get it at times. I prefer to have freedom in structuring my project. Realizing that I would spend more time learning Go than developing the server itself, I opted to use Python instead.

I opted for Python because I am more experienced with it. I started learning it just days before [Typhoon Haiyan struck the country](/blog/remembering-haiyan/). I was quite impressed with the language. It was fun to work with and things were easier in Python land except those nasty misplaced white spaces.

In an internship Ray Mart, another friend of mine, [Dennis Limher Capili](https://twitter.com/CapiliLimher), and I attended in the University of the Philippines Diliman, we used Python and Django to develop a room reservation system. My research thesis that utilized [OpenCV](http://opencv.org/) was originally written in Python before porting it to C++. A year later after our internship, I was asked by my high school, Philippine Science High School Eastern Visayas Campus, to [build an election system](/blog/5-lessons-learned-from-developing-a-school-election-system/) for them.

I designed the server around the [MVC design pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) because it creates a clear border between the logic and presentation. The MVC pattern is a design pattern that, as mentioned before, separates the logic of your application from the presentation. The pattern has three components: model, view, and controller.

The **model** is where the logic and data resides. This is where you do data manipulation such as creating a user.

The **view** is what the user sees. It is the user interface in web apps. In Basyang Server, our view is the REST API that lets the Basyang app communicate with the server. One general rule is that the view should never directly talk to the model and vice versa. This is where the third and last component of the MVC pattern comes in - the controller.

The **controller** is the glue that binds the view and model together. It accepts input and converts it to commands for the model or view.

![The MVC Pattern](/static/img/posts/developing-basyang-server-part-1/mvc-pattern.png)

To make things easier on our end, we used a microframework called Bottle for our server. It is easy to use, requires little space, and it is only one file. We used a microframework because we do not want to use a full framework because we do not need the functionality brought by a full framework and it would just be a waste of space if we do so.

Since we are storing passwords, we utilized the `pprp` package to hash our passwords using SHA512 and PBKDF2 before we store the passwords.

For handling the data, we used `PyMySQL` for directly talking to our MySQL database. We talked to our MySQL database through SQL commands instead of using an ORM because I was already directly talking to our database before I thought of using an ORM instead.

We also utilize unit testing through Python's `unittest` library. A lot of bugs were catched thanks to unit testing.

My text editor of choice and the one I used for developing Basyang server is Atom. I love the user interface and the feature set is comparable with Sublime Text. In conjunction with Atom, I use Flare8 for linting my Python code. For testing the API, I use the REST Client package available for Atom.

Our Git repository is stored privately over at GitLab. We used it to save money because private repositories are free at GitLab (Hooray for GitLab!). BitBucket was an option but it only limited private repositories to 5 users. We also use GitLab CI as our build server. PythonAnywhere was also used as our test server.

Initial development started in February 12, 2016 after I finished my contract with a client. Getting started to work with Basyang Server was a relief for me. The recent contract had me developing a WordPress site that was very slow. I even had to download the site and develop it locally because of its speed.

The structure of Basyang Server is inspired from Django. I had experience with developing Django web apps before and love the structure of a Django app. I even have a separate `settings.py` file that is inspired from the framework for the people with deadlines.

![The Basyang Server Structure](/static/img/posts/developing-basyang-server-part-1/structure.png)

Later on, I added unit testing to aid debugging. I hated the dots, `E`s, and `F`s when tests fail, raise an error, or pass. So, when I had the primary functionality running, I modified the unit test results to use ✔ for pass, • for errors, and ✗ for errors. The first unit test I made was for the test view function that lets the client test if there is a connection to the server.

The model was originally just a file full of functions. I merged the functions into a class called `UserManager` and pretty much finished adding all the user related functions such authenticating a user and deleting users.

But a major hurdle I encountered while developing the `UserManager` was the hashing the password part. I, of course, utilize `pprp` for hashing the passwords but there was a time that there was a hashing bug that hashed the password the wrong way. My tests tell me so. But eventually I fixed but I no longer remember how I did it.

After finishing the model, I worked on the view and the controller. The view was pretty much just using the `@route` decorator of Bottle in which its input would be sent to the controller where it will then send it to the model. I refactored and everything is finished. It was ready for the initial testing.

Right now, I am planning to refactor the model to use SQLAlchemy instead of relying on talking directly to the database to make things easier. Some parts of the code are still in need of refactoring.

![The custom unittest in Basyang Server](/static/img/posts/developing-basyang-server-part-1/atom.png)

Generally, developing Basyang Server has been fun. Now that I have more time developing the application unlike in the previous weeks, I will be able to continue developing Basyang Server and bump into multiple bugs again.

*Are you currently working in a startup? What have been developing lately? Let us know in the comments below.*
