---
layout:     post
title:      "Box2D and the Pixel Per Meter Ratio"
date:       2016-12-17 12:27
author:     "Sean Francis N. Ballais"
permalink:  /blog/box2d-and-the-pixel-per-meter-ratio/
header-img: "img/posts/box2d-and-the-pixel-per-meter-ratio/header.jpg"
comments: true
description: "The graphics world and the physics world are two separate dimensions with different units. Converting units between the two would require a set conversion factor."
---

When you develop a 2D game that has physics, chances are that you will be using Box2D. Box2D is an open source physics engine for 2D rigid bodies. It can integrate with any 2D game engine or library. Many games, such as Angry Birds and even the game I recently made with my classmates called [Push 'Em Over](https://github.com/seanballais/push-em-over/), use Box2D for their physics. However, when you integrate the physics world of Box2D into the graphics world of your 2D library or engine for the first time, it might come as a surprise to you that your bodies are moving slowly.

![A body moving slowly due to a 1 PPM ratio.](/static/img/posts/box2d-and-the-pixel-per-meter-ratio/1-ppm.gif)

According to Box2D's [website](http://box2d.org/2011/12/pixels/), Box2D uses the MKS system and radians for angles. As you would usually have learned from your Physics class, the MKS system uses meters (M) for length, kilograms (K) for mass, and seconds (S) for time.

By default, Box2D assumes that one pixel on the screen is equal to one meter to the physics world. This was one of the first hurdles I encountered when I was using Box2D for the first time. From this premise, we can infer that the cause of the slowdown of the movement of your bodies is that your bodies are traveling large distances. This means that if you have a character at `(0, 0)` moving towards `(1024, 0)` in your screen, your character would be traveling a total distance of 1.024 kilometers.

![1024 pixels equals to 1024 meters in Box2D by default!](/static/img/posts/box2d-and-the-pixel-per-meter-ratio/default-box2d-travel.jpg)

Fortunately, solving this problem is easy. We would just need to come up with a reasonable conversion factor for the pixels on the screen, and the meters in the physics world. This conversion factor is called the **pixel per meter (PPM) ratio**. This pixel per meter ratio would set how many pixels a meter is equal to in your physics world in Box2D.

For example, if you set your PPM ratio to 32, then it would mean that one meter in Box2D would equal to 32 pixels in your screen. A character traveling from `(0, 0)` to `(1024, 0)` would only be traveling 32 meters, instead of 1024 meters if you are using the default pixel per meter ratio of 1 pixel to 1 meter. That's a 96.875% decrease in distance traveled! This will result in faster movement and a stabler simulation.

![A body moving fast due to a 32 PPM ratio](/static/img/posts/box2d-and-the-pixel-per-meter-ratio/32-ppm.gif)

It is suggested in the Box2D website that you base your PPM ratio on the size of your characters. If you have a character 100 pixels tall and his "physical" height is 1 meter, then you should set your PPM ratio to 100 pixels to 1 meter (100:1). The next question is how you would apply the pixel per meter ratio to your code. Your approach might be different but this is what I would suggest.

You would first need to set a global static class where you would store your constants. You could call the class `Constants` but the name is arbitrary. Store the constant variable `PPM` there and give it a value of your choice. Remember that the value of `PPM` can differ from game to game. My game might have a PPM ratio of 32 while yours might have a ratio of 100. Make sure that `PPM` is a `float` to preserve precision and to prevent the value from being casted into an `int` when you convert to meters or pixels. Box2D works with decimal values in its physics world.

```java
class Constants {
    ...
    const float PPM = 32f;
    ...
}
```

The tricky part deciding where you would convert between pixels to meters. One of the key places where you would want to convert pixels to meters is where you would create the [physics bodies](http://www.iforce2d.net/b2dtut/bodies) and its fixtures. Box2D talks in meters so to modify properties in your bodies and fixtures, you must translate pixels into meters as shown in the code below.

```java
BodyDef bodyDef = new BodyDef ();
...
// x and y refers to your character's position relative to the screen
bodyDef.position.set ( x / Constants.PPM, y / Constants.PPM );
...

...
PolygonShape bodyBounds = new PolygonShape ();
// width and height refers to the width and height of your character in pixels
bodyBounds.setAsBox ( ( width / Constants.PPM ) / 2, ( height / Constants.PPM ) / 2 );
...
```

Another place where you would want to convert meters to pixels is the part where you would set your character's position every time a frame is updated. Box2D bodies would give their positions in meters. You must convert the values into pixels to properly position your characters on-screen. The code will look similar to the one below.

```java
...
character.setXPos ( Math.round ( character.getPlayerPhysicsBody ().getPosition ().x * Constants.PPM ) );
...
```

To wrap up things, you should convert pixels to meters (`n / Constants.PPM` where `n` is in pixels) whenever you need set Box2D properties. On the other hand, you should convert meters to pixels (`n * Constants.PPM` where `n` is in meters) whenever you need to get values from Box2D for use on-screen. For example, if you need to set the position of your character on screen, you need to get the character's position from Box2D's physics world first and then convert the retrieved values to pixels so that they would be properly placed on-screen. Otherwise, your character will be placed on the wrong position on the screen. Worse, using Box2D's values without converting them first could result in unexpected outputs such as the one below.

![A mess in converting between pixels and meters.](/static/img/posts/box2d-and-the-pixel-per-meter-ratio/a-box2d-mess.jpg)

Box2D is a powerful physics engine. When done right, it will produce wonderful simulations that you and your friends can enjoy. But integrating it into your game can be a tricky process. Meters and pixels are two different units with no standard conversion factor between the two. Using a pixel per meter ratio will solve this ordeal and let you integrate physics with your graphics. This reduces the number of problems that you will encounter, and lets you focus on the more important aspects of your game.

*Have you used Box2D before? Are you currently working on a game that uses Box2D? Do you have anything to share? Let us know in the comments below.*
