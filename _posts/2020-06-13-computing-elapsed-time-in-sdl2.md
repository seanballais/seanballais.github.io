---
layout:     post
title:      "Computing Elapsed Time in SDL 2"
date:       2020-06-13 22:50
author:     "Sean Francis N. Ballais"
permalink:  /blog/computing-elapsed-time-in-sdl2/
header-img: "img/posts/computing-elapsed-time-in-sdl2/header.jpg"
comments: true
description: "Elapsed time is one of the fundamental aspects of games. But, how do you compute it? If you're using SDL 2, the library provides functions that will help us with just that."
---

Elapsed time is one of the fundamental aspects of games. It determines the time between two snapshots (i.e. frames) of a game, used in the physics subsystems, and a whole lot more. Computing the elapsed time incorrectly may lead to inaccurate simulations and/or unsatisfying gaming experiences. SDL 2, a cross-platform library used to build games, provides functions to help us compute our elapsed time.

The basic mechanism from SDL 2 that can be used for computing elapsed time is `SDL_GetTicks()`. This function returns the amount of time that has lapsed since the SDL library has been initialized in milliseconds. Note that `SDL_GetTicks()` returns an unsigned 32-bit integer. With this function, we can get the elapsed time in seconds through:

```
uint32_t startTime = SDL_GetTicks();

// Do awesome stuff here, like figuring out if the girl at the bar you're in who
// glanced briefly at you and does a quick hair flip is into you. You actually
// really can't tell from this example since she could just be adjusting her
// hair, and looking at someone behind you.

uint32_t currTime = SDL_GetTicks();

double elapsedTime = (currTime - startTime) / 1000.0; // Convert to seconds.
```

I'm using seconds here since it's the SI unit for time, and I find it easier to perform calculations with the unit (Thanks, PSHS-EVC, my high school, for drilling SI units into me!). This is should be enough for many cases, including computing for the elapsed time between frames. However, `SDL_GetTicks()` is not enough when you want higher precision times. Tasks like profiling will benefit from higher precision. For that, we have `SDL_GetPerformanceFrequency()` and `SDL_GetPerformanceCounter()`.

**Quick Aside**: If you want to store a large amount of time, like the total running time of the game, do not use `float`. The precision of the `float` type decreases fast, especially compared to a `double`, as the value increases. Prefer using a `double` or an integer (if you want microsecond precision that would be viable for \~5,843.02 **centuries**, use a 64-bit unsigned integer) to store the time. [This blog post](https://randomascii.wordpress.com/2012/02/13/dont-store-that-in-a-float/) by Bruce Dawson delves into the problem.

`SDL_GetPerformanceCounter()` and `SDL_GetPerformanceFrequency()` gets the current value and frequency of the high resolution counter, which is a register present on modern CPUs, at least the x86 ones. We can get high precision timings from those two functions. Both functions return a 64-bit unsigned integer. Getting the elapsed is actually just similar to using `SDL_GetTicks()`:

```
// Code based from here:
//   https://gamedev.stackexchange.com/a/110831/93942
uint64_t startTime = SDL_GetPerformanceCounter();

// Do other awesome stuff, like converting between pixels in screen space and
// meters in physics world space. Here's an article to learn how to do that:
//   https://seanballais.github.io/blog/box2d-and-the-pixel-per-meter-ratio/

uint64_t currTime = SDL_GetPerformanceCounter();

double elapsedTime = static_cast<double>(
  (currTime - startTime) / static_cast<double>(SDL_GetPerformanceFrequency())
);
```

This should give us a high-precision elapsed time in seconds. A variation of this is actually what I use in my game engine. I previously struggled understanding this, so I'll explain how this works. Performing `currTime - startTime` will give us the number of ticks there are between the two calls to `SDL_GetPerformanceCounter()`, which gets the current number of ticks there are on call to the function. Now, we have to convert those number of ticks to seconds. `SDL_GetPerformanceFrequency()` provides the number of ticks per second (i.e. the frequency). We can use that function to convert `currTime - startTime` into seconds. To convert to seconds, we just simply divide `currTime - startTime` by `SDL_GetPerformanceFrequency()`. We have to cast the latter to a `double` to prevent integer clamping, since both operands are integers. And that's just it! Here's a little SI conversion to show that that division operation actually converts the number of ticks to seconds:

$$

\begin{align}
\frac{(t_{1} - t_{0}) \text{ ticks}}{1} \cdot \frac{1 \text{ seconds}}{n \text{ ticks}} &= \frac{(t_{1} - t_{0}) \text{ }\cancel{\text{ticks}}}{1} \cdot \frac{1 \text{ seconds}}{n \text{ }\cancel{\text{ticks}}} \\
&= \frac{t_{1} - t_{0}}{1} \cdot \frac{1 \text{ seconds}}{n} \\
&= \frac{t_{1} - t_{0}}{n} \text{ seconds}
\end{align}

$$

We've just learned that SDL 2 provides functions to help us compute the elapsed time. Choosing which to use will depend on your use case. Actually, we can take this up a notch by creating a `Timer` class that will handle computing the elapsed time. But, that's on you. At the very least, I hope this provides you with guidance with regards to computing the elapsed time.

# References and Additional Readings

 * [c++ - How to calculate delta time with SDL? - Game Development Stack Exchange](https://gamedev.stackexchange.com/q/110825/93942)
 * [Don't Store That in a Float \| Random ASCII - tech blog of Bruce Dawson](https://randomascii.wordpress.com/2012/02/13/dont-store-that-in-a-float/)
 * [SDL_GetTicks - SDL Wiki'](https://wiki.libsdl.org/SDL_GetTicks)
 * [Simple DirectMedia Layer - Homepage](https://www.libsdl.org/)
 * [The High Performance Time-Stamp Counter \| Bernardt Duvenhage's Blog](https://bduvenhage.me/performance/2019/06/22/high-performance-timer.html)
 * [Time Stamp Counter - Wikipedia](https://en.wikipedia.org/wiki/Time_Stamp_Counter)

# Credits

Header image used is owned by Ansgar Koreng, obtained from [Wikipedia](https://wikipedia.org/) (image is obtainable via this [link](https://en.wikipedia.org/wiki/Stopwatch#/media/File:Stopwatch,_1810201155,_ako.jpg)), and used under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode).
