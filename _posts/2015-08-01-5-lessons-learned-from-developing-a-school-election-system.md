---
layout:     post
title:      "5 Lessons Learned From Developing A School Election System"
subtitle:   "Experience is an excellent teacher - especially in programming"
date:       2015-08-01 20:36
author:     "Sean Francis N. Ballais"
permalink:  /blog/5-lessons-learned-from-developing-a-school-election-system/
header-img: "img/posts/5-lessons-learned-from-developing-a-school-election-system/header.jpg"
comments: true
type: blog
description: "In around mid-March 2015, a friend of mine and batchmate, who was my high school's student government (also known as the Student Alliance) president, asked to create an online election app for the school. I reluctantly said yes. Immediately that day, I set out to work."
---

In around mid-March 2015, a friend of mine and batchmate, who was my high school's student government (also known as the Student Alliance) president, asked me to create an online [election app](https://www.github.com/seanballais/SAElections/) for the school. I reluctantly said yes. Immediately that day, I set out to work.

After a few days of working, I placed the project on hold. Before my friend asked me to create the election app, I was already making [my entry](https://www.github.com/seanballais/Marky/) for Jeff Atwood's markdown tutorial contest, and the deadline was near. I had to make tradeoffs. Unfortunately, I lost the competition. I was really hoping to win at least the *Code Complete 2*, and the *Beautiful Code* books. Oh well, I better save some money then (if you want to donate any of the books I just mentioned or are in Jeff Atwood's [Recommended Reading For Developers](http://blog.codinghorror.com/recommended-reading-for-developers/) to me, just [contact]({{ site.url }}/contact/) me. I'll be exceptionally grateful).

I went back to work on it for 2-3 weeks more after submitting my entry to the contest. Sadly, I had put it on hold again because I had to go to Cebu City to take a SAT test. At that point, I lost interest in continuing the project, and just searched for an easier route. A shortcut.

Eventually, after some encouragement from my friend who requested the project, I finally finished the app, with all the requested (even the last minute ones) features by July 22, 2015 after putting it on hold for nearly 3 weeks. During the development cycle and the days when my app was used, I learned 5 valuable lessons that I think will all of us improve ourselves as programmers.

####1) Write Your Plan On Paper
We've been, in one way or another, taught to plan before we code. It's absolutely necessary so that you won't get lost and waste time thinking what feature to add next.

Making the election app taught me a valuable lesson - write your plan on paper. Right before development started, I planned on how the app will look like, and how it will process any input. But the plan was just in my head. I never wrote the plan on paper. This soon proved to be inconvenient. It gave me a feeling of burden, and the project won't be finished. It gave me unnecessary stress. I usually (but not always) write down my plan on paper how the logic will flow in other projects I did. Sadly, I didn't do it on this one.

<img class="img-responsive" src="/static/img/posts/5-lessons-learned-from-developing-a-school-election-system/pen-and-paper.jpg" width="550px" height="366px" alt="Write your plan on paper">

Please don't do the same mistakes that I did. Write down your plan at least on paper. It's gonna help you in the long run. To beginners, I know that it's very tempting to write down code immediately. But please, resist the temptation. The way you write down your plan on paper may be different from person to person, or organization to organization.

####2) Never Use A Quick and Dirty Solution
As mentioned earlier, I lost interest in continuing the app during the time I was going to take my SAT test. During that time, I kept looking for a pre-built election app. I found many. Most of them are just regular poll apps. Not totally suitable for the job. The best I can find is the [Halalan project](https://github.com/halalaninitiative/halalan) by the [Halalan Initiative](http://halalan.uplug.org/). Even that wasn't enough for the job. I knew at that point that going with a shortcut would not be the best solution. It would a quick and dirty solution. I wouldn't probably have been satisfied and happy with the project.

Fortunately, the friend who requested the app encouraged me enough to finish the project. With that little spark of encouragement, the project was brought to life once more and has seen the light of day. A quote by the late Randy Pausch, a CS professor at Carnegie Mellon University, summarizes what I learned.

> “A lot of people want a shortcut. I find the best shortcut is the long way, which is basically two words: work hard.”
> \- Randy Pausch (1960 - 2008), [The Last Lecture](http://www.amazon.com/The-Last-Lecture-Hyperion-Books/dp/B005F1QC2Y)

To generalize, if you want to produce good software, never go down the quick and dirty route. Work hard on your project. Even though it might not succeed, at least you'll get a feeling of some form of accomplishment, and a lesson that can help you improve yourself as a programmer, and/or as a person.

####3) Prepare For Any Sudden Requests
There are two stable versions of the election app that I made. The first version was finished on June 19. It was ready to be used, and was already deployed at [PythonAnywhere](https://www.pythonanywhere.com). It uses Facebook for the sign-in. If it is your first time to vote, a page will appear that will ask for a password after signing in. After confirming, you will be directed to a voting page (pictured below) if it's your first time to vote. Otherwise, you will be shown the *Thank You* page.

![First version of the election app](/static/img/posts/5-lessons-learned-from-developing-a-school-election-system/elections-app-first-version.png)

All was well. I felt happy. I was already starting to develop this website. I was just waiting for the school to give me the go signal to tell the voters (the school's students) about the election app.

And a signal I was given.

On the 8th of July, another friend of mine told me that I should modify the app because there is a new party that will be added (originally, there was only one party. I was shocked by that fact but I just went with the flow.). I was shocked. I promised myself to not touch the code again.

I was asked by the school's Information Analyst to go to the school on July 13. When I went there on the said date, my fears were confirmed - I had to add another party and modify the website. On exactly that day, at around 8 in the morning, I immediately set out to work. I had to remove the Facebook Sign-in feature and replace it with a custom login form; add the new party to the voting page; modify the JavaScript file to perform the behaviour I intended it to do; and make sure that I don't break anything that I can still reuse from the first version.

Fortunately, I was able to modify the website in accordance with the request in 9 days. I was relieved. And the voting page now looks like:

![Second version of the election app](/static/img/posts/5-lessons-learned-from-developing-a-school-election-system/elections-app-second-version.png)

I was finally satisfied. I feel ready for the next adventure.

This experience taught me to be prepared for anything, even for sudden requests. This can make some programmers a bit cranky (or maybe make them do some table flipping). Their hard work wasted for nothing. But we need to do this (okay, maybe not) for the benefit of our clients. We're serving them anyway and make their respective endeavors successful. Who knows? We are probably the reasons why our clients are having a good time. We make them happy, you become happy *\*ka-ching\**. Win-win!

####4) Check Before You Apply
During the last week I spent developing the app, I was making changes to the code. As usual, I always use a version control system for these things, notably Git. I usually have three active branches: the **master** branch for the latest stable code; the **develop** branch for the latest unstable code; and a branch I create when developing features and fixes, and writing a few changes.

However, on one occasion during the week, I forgot to create a branch for the minor changes I was writing in the code. I then discovered that I was making changes on the `develop` branch. I panicked. I don't know what to do. I felt helpless. I can't create a new branch with the changes. I had to push my changes first before checking out a new branch. Helplessly, I pushed the changes to the `develop` branch.

<img class="img-responsive" src="/static/img/posts/5-lessons-learned-from-developing-a-school-election-system/think-before-you-act.jpg" width="864px" height="432px" alt="Think before you act">

Because of this occurrence, I learned to check things first before I apply. This makes sure that we do the right thing, and with less errors. Like what they say, think before you act.

####5) Anticipate The Worst
On the day before the app will be used by the school, the Commission on Elections of the school held a test run of the app. They had to login using all the accounts that were registered on the day before, and vote.

To authenticate a user, the app would send an AJAX POST request to the server containing the user name, and the password, and the server would check if the user name and password combination was right. It would then send back a 'success' message if authenticated, or a 'failed' message otherwise.

The code of the function that sends the AJAX POST request is like:


    var e = {
        studentID: a,
        password: b,
        csrfmiddlewaretoken: getCookie("csrftoken")
    };
    $.post("/authenticate/", e, function(a) {
        $(c).css("visibility", "hidden"), "" !== b && ("success" == a ? ($(c).css("visibility", "hidden"),
        d.disabled = !1) : ($(c).css("visibility", "visible"), d.disabled = !0));
    });


During the testing, the testers discovered that the AJAX POST request was a bottleneck in the app. Authentication, which would normally just takes a few seconds, takes more or less 20 seconds to complete. The analogy I could think of regarding the request's speed is like that of a turtle's.

![Turtle speed](/static/img/posts/5-lessons-learned-from-developing-a-school-election-system/turtle.jpg)

Once I learned about the problem, I was somehow panicking in the inside. I don't want this to happen during the actual elections. For me, it was the worst things that could happen to my beloved app. As a friend would put it, *"It's your baby."* My options were to either change something in the code, or move to a more powerful rig. Moving the site to a more powerful was not an option for me. I needed to use Linux and Apache, and the laptops that were more capable has only Windows installed! I decided to modify the code.

After a few minutes of checking my code, I decided to authenticate the combination directly to the server back end (with some modifications to the back end authenticator, of course) and just let the page reload (which would still show the login form if the combination was wrong). The time it would take to authenticate dropped to 2-5 seconds. That's a 75-90% improvement!

This taught me to keep calm, and analyze the problem. In my case, the app chokes when an AJAX request is sent. I had to figure out how to fix it. And that also taught me to anticipate the worst. Anything can happen to your app. It can choke, crash and burn, or do something worse. But if you anticipate the worst, you are more than prepared to solve the dilemma.

I learned a lot from developing the election app for my high school. It was a nice experience. It helped me become a better person, in general. I hope that these lessons I learned the hard way will help you when you're coding *The Next Big Thing*.

*Do you have a lesson that you learned while developing an app or any type of software (heck, even hardware)? Or do you have an opinion that you want to share? Let me know in the comments.*
