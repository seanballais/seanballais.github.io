---
layout:     post
title:      "Developing Basyang Server Part 1"
subtitle:   "The experience in developing the server for Basyang"
date:       2016-03-26 21:48
author:     "Sean Francis N. Ballais"
permalink:  "/blog/developing-basyang-server-part-1/"
header-img: "img/posts/a-job-offer-from-madrid/header.jpg"
comments: true
description: "In this part 1 of the Developing the Basyang Server series, I share my experiences on developing the first incomplete version of the Basyang server."
---

Late December 2015, two of my friends ([Warren Chu](https://twitter.com/wechuuuuu) and [Ray Mart Montesclaros](https://web.facebook.com/profile.php?id=1679863886&ref=br_rs)) and I formed a startup called [Creatomiv](https://web.facebook.com/CreatomivStudios/) with [Francis Plaza](https://twitter.com/TheFrancisPlaza) as our mentor and advisor. It is a tech startup that aims to develop mobile apps of different categories. Recently, we are currently working on first product called Basyang. It is an app that lets you create stories together with your friends. I was tasked with developing the server of the app which is aptly called, Basyang Server. Ray Mart's doing the app side of things. The server is still incomplete and is gonna undergo some refactoring.

Initially, we were planning to develop Basyang Server in Go as the language for its speed. I tried out go for nearly a month and found it quite a joy to use. However, I hated the project structure of each Go project. I just don't get it at times. I prefer to have freedom in structuring my project. Realizing that I would spend more time learning Go than developing the server itself, I opted to use Python instead.

I opted for Python because I am more experienced with it. I started learning it just days before [Typhoon Haiyan struck the country](/blog/remembering-haiyan/). I was quite impressed with the language. It was fun to work with and things were easier in Python land except those nasty misplaced white spaces. In an internship Ray Mart, another friend of mine, [Dennis Limher Capili](https://twitter.com/CapiliLimher), and I attended in the University of the Philippines Diliman, we used Python and Django to develop a room reservation system. My research thesis that utilized [OpenCV](http://opencv.org/) was originally written in Python before porting it to C++. A year later after our internship, I was asked by my high school, Philippine Science High School Eastern Visayas Campus, to [build an election system](/blog/5-lessons-learned-from-developing-a-school-election-system/) for them.

I designed the server around the [MVC design pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) because it creates a clear border between the logic and presentation. The MVC pattern is a design pattern that, as mentioned before, separates the logic of your application from the presentation. The pattern has three components: model, view, and controller. The **model** is where the logic and data resides. This is where you do data manipulation such as creating a user. The **view** is what the user sees. It is the user interface in web apps. In Basyang Server, our view is the REST API that lets the Basyang app communicate with the server. One general rule is that the view should never directly talk to the model and vice versa. This is where the third and last component of the MVC pattern comes in. The **controller** is the glue that binds the view and model together. It accepts input and converts it to commands for the model or view.

![The MVC Pattern](/static/img/posts/developing-basyang-server-part-1/mvc-pattern.png)

To make things easier on your end, we used a microframework called Bottle for our server. It is easy to use, requires little space, and it is only one file. We used a microframework because we do not want to use a full framework because we do not need the functionality brought by the framework and it would just be a waste of space if we do so. Since we are storing passwords, we utilized the `pprp` package to hash our passwords using SHA512 and PBKDF2 before we store the passwords. For handling the data, we used `PyMySQL` for directly talking to our MySQL database. We talked to our MySQL database through SQL commands instead of using an ORM because I was already directly talking to our database before I thought of using an ORM instead. We also utilize unit testing through Python's `unittest` library. A lot of bugs were catched thanks to unit testing.

*Are you currently working in a startup? What have been up lately? Let us know in the comments below.*
