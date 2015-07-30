---
layout:     post
title:      "The Brainf*ck Language"
subtitle:   "An esoteric programming language you might want to wrap around your head"
date:       2015-07-28 22:27 +0800
author:     "Sean Francis N. Ballais"
permalink:  /blog/the-brainfck-language/
header-img: "img/posts/the-brainfck-language/header.jpg"
---

Programming languages were developed to ease the development of applications for computers. They ease development of projects, save time, and have a good return of investment. But there are languages designed to just f*ck with your brain. They want you to be mindblown by their rather peculiar syntax. A notable example, and also the highlight of this article, is Brainf\*ck.

<img src="/static/img/posts/the-brainfck-language/mindblown.gif" alt="Mindblown!" width="650" height="416">

Brainf\*ck was created in 1993 by Urban Miller, a Swiss physics student. He designed the language with being able to implement the smallest compiler possible. Impressively, the language is [Turing-complete](http://programmers.stackexchange.com/questions/132385/what-makes-a-language-turing-complete). The first compiler was coded in machine language which made it as small as 296 bytes. More compilers were developed and the size of many were much lower than 200 bytes, and one is, impressively, just **100** bytes.

Brainf\*ck was not designed to be used for practical purposes, and was rather aimed to challenge and amuse programmers. The language uses a fairly simple machine model. The model consists of the program; an array consisting of 30,000 byte cells all initialized at zero, with a data pointer initialized to the point of the leftmost byte of the array; and two streams for input and output (using ASCII).

**The language has a very minimal and simplistic syntax, with only eight commands.**
    
    Any character not included below is ignored and can be used for comments.

    >    point to the next cell to the right
    <    point to the next cell to the left
    +    increment the value of the current cell by one
    -    decrement the value of the current cell by one
    .    display the value of the current cell
    ,    accept an input value, and store it in the current cell
    [    if the value of the current cell is zero, skip to the instruction
         after the matching ] bracket. Otherwise, execute the instruction next
         to the bracket.
    ]    if the value of the current cell is zero, move to the next
         instruction. Otherwise, jump to the matching [ bracket.

Personally, I initially thought Brainf\*ck was very confusing and felt that I won't ever touch it ever even once. That changed when it was during the Independence Day of my country. I wanted to say *Happy Independence Day* using a programming language. I wanted to challenge myself to create the greeting using an esolang. So, I settled with Brainf*ck with reasons I already forgot.

Grasping the concepts was fairly easy once you convert the weird, complicated descriptions of the commands to something fairly simple, or in layman's terms. The descriptions in the commands in the table above were simplified in layman's terms for the benefit of many.

![Success!](/static/img/posts/the-brainfck-language/success-kid.jpg)

After coding for less than an hour or two, I finally *got* Brainf\*ck. My reaction was like of success kid's as pictured above. Here's even the code that I wrote in Brainf\*ck for Independence Day. This code has been unformatted to only fit in a single line because the formatted code takes up sixty lines and I don't want you to scroll down for **probably** a *long* time.
    
    ++++++++++[>++++++>+++++++++>+++>+<<<<-]>>>>.<<<<>>+++++++>++<<++++++++++++.>.+++++++++++++++..+++++++++.>.<<+.>-----------.----------.+.+++++++++++.-----------.+++++++++.----------.+.+++++++++.-----------.++.>.<<-----.>----.++++++++++++++++++++++++.>+.>..

If you want to see the formatted code, which is way more cleaner and beautiful, here is the [link](https://gist.github.com/seanballais/12d6706b54a0cacb2f4e).

Using Brainf\*ck was a satisfying experience. It was the closest thing I could get to programming with a machine language at the moment. The language takes away features you usually take for granted in languages like C, and Python. That taught me to appreciate the advances in programming languages that helped programmers create great products, and solve many of the world's problems.

If you want to try out Brainf\*ck, I embedded a modified Brainf\*ck interpreter by [Rahul Anand](https://github.com/eternalthinker/) for you to use and have fun.
<script type="text/javascript" src="/static/js/jquery.min.js"></script>
<script type="text/javascript" src="/static/js/brainfcked.js"></script>
<script type="text/javascript" src="/static/js/brainfck-manager.js"></script>
<div class="container-fluid" style="padding: 0;">
    <div class="row">
        <div class="col-md-12">
            <span style="color: #aaa;"><b>Program:</b></span>
            <textarea id="program" class="form-control" rows="10" style="border-top-left-radius: 7px; font-family: Consolas,Monaco,'Lucida Console','Liberation Mono','DejaVu Sans Mono','Bitstream Vera Sans Mono','Courier New', monospace; border-top-right-radius: 7px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; margin-bottom: 0; resize: none;">
Hello World program
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
            </textarea> 
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <input id="input" type="text" class="form-control" placeholder="Enter program's input here. Also supports ASCII values in the form \65, \255 etc and newline as \n" style="border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px; margin-top: 0; resize: none;">
        </div>
    </div>
    <div class="row" style="margin-top:10px; margin-bottom:10px;">  
        <div class="col-xs-12">
            <button type="button" id="run" class="btn btn-success" disabled>Run</button>
            <button type="button" id="resume" class="btn btn-success" disabled>Resume</button>
            <button type="button" id="pause" class="btn btn-warning" disabled>Pause</button>
            <button type="button" id="stop" class="btn btn-danger" disabled>Stop</button>
        </div>
    </div>
    <div class="row" style="font-size: 16px; margin-top:20px; margin-bottom:20px;">  
        <div class="col-xs-12">
            <b><span id="state" class="alert"></span></b>
            <b><span id="notification" class="alert"></span></b>
        </div>
    </div>
    <div class="row">  
        <div class="col-md-12">
            <span style="color: #aaa;"><b>Output:</b></span>
            <textarea id="output" class="form-control" rows="20" wrap="off" readonly style="background-color: #484848; color: #24D851; font-family: Consolas,Monaco,'Lucida Console','Liberation Mono','DejaVu Sans Mono','Bitstream Vera Sans Mono','Courier New', monospace; font-size: 20px; border-radius: 7px; resize: none;"></textarea> 
        </div>
    </div>
</div>

What do you think of Brainf*ck? What's your opinion? Are you gonna try it to amuse your friends? Or are you just gonna pass it for now? Do you have a question to ask? Or do you need some clarifications? Let me know in the comments below.