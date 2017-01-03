---
layout:     post
title:      "Implementing a Simple Message Bus in C++"
date:       2017-01-03 14:33
author:     "Sean Francis N. Ballais"
permalink:  /blog/implementing-a-simple-message-bus-in-cpp/
header-img: "img/posts/implementing-a-simple-message-bus-in-cpp/header.jpg"
comments: true
description: "Developing a system to allow communication between decoupled components."
---

Starting late December of 2016, I have been working on creating a 2D game engine for fun (and profit). It is not done yet. Most of the systems have not yet been implemented. [Integration between graphics and physics](/blog/box2d-and-the-pixel-per-meter-ratio/) is nonexistent. Key core components are nothing but ideas of the mind. What I recently finished working on was the message bus. It is already functional but it still needs improvement.

A message bus acts like the communication gateway between two or more components in a program, may it be business-oriented applications, or games. Without it, components can tend to couple themselves, and create a messy looking architecture.

In this article, we will be implementing a game-oriented message bus that you can use in your own project. Many applications, game engines, and games are written in C++ so we will be using that language. I recommend using C++14 because it is the latest C++ standard but this will compile in C++11 too.

#### What's a Message Bus?
Applications and games normally are composed of multiple components. Each component is responsible for a task or a feature of the application. Sometimes, a component needs to 'talk' to another component. For example, your input system would need to "tell" your entity system that the player needs to be moved forward because the `W` key has been pressed. In code, you might implement it in this manner.

```
// Somewhere in the depths of your Input system.
if (Input.isPressed(Keys.W)) {
    Log.add("Siopao! Siopao! Siopao! Do not do it this way! Siopao! Siopao! Siopao!");
    player.move(10, 10);
    ...
}
```

Now, your input system is now informing the player to move forward. Game runs perfectly but there is a problem. Doing so couples your code. Coupled code is hard to maintain and is messy. Adding and removing certain parts would be more difficult as one change could entail changes in the other components. Creating a diagram on the overall system could result in each component connected to each other component. It looks messy.

![Coupled components](/static/img/posts/implementing-a-simple-message-bus-in-cpp/messy-coupling.jpg)

To solve this issue, we would need to decouple the components from each other. A system that will allow communication between these components is what we need. This system is what we call a message bus.

A **message bus** is basically a modified large-scale [Observer pattern](http://gameprogrammingpatterns.com/observer.html). In the Observer pattern, there would be **observers** to receive notifications and **subjects** to send those notifications.

In a message bus, you have components sending and receiving messages to it. The message bus's job is to route these messages to every component connected to it. **Messages** that each component send are basically events that happened. For example, a component may send a `W_PRESSED` message and the message bus will send that message to other components. The receipient is responsible with what it will do with the message.

![Architecture based around a message bus](/static/img/posts/implementing-a-simple-message-bus-in-cpp/messagebus.jpg)

One cool thing about message buses is that the sender does not even need to know if the message was received by another component or not. Heck! The sender should only be aware of the existence of itself and the message bus. It should not know the existence of the other components. The sent message can be silently ignored by the receivers (if there are any).

#### Implementing a Message Bus
Time to for the part you have been waiting for - implementing the message bus. The code here is adapted from the `MessageBus` component I have in my engine. We would start with implementing the `Message` class. We can implement it like this:

```
class Message
{
public:
    Message(const std::string event)
    {
        messageEvent = event;
    }

    std::string getEvent()
    {
        return messageEvent;
    }
private:
    std::string messageEvent;
};
```

The `Message` constructor accepts the string parameter `event` that contains the event that happened. The value of `messageEvent` can be something like `W_PRESSED` or `PLAYER_FELL`. Note that this implementation may differ from yours depending on your needs.

Next, we will implement the message bus itself where all components are connected to. This is how we can implement the message bus.

```
#include <functional>
#include <queue>
#include <vector>

class MessageBus
{
public:
    MessageBus() {};
    ~MessageBus() {};

    void addReceiver(std::function<void (Message)> messageReceiver)
    {
        receivers.push_back(messageReceiver);
    }

    void sendMessage(Message message)
    {
        messages.push(message);
    }

    void notify()
    {
        while(!messages.empty()) {
            for (auto iter = receivers.begin(); iter != receivers.end(); iter++) {
                (*iter)(messages.front());
            }

            messages.pop();
        }
    }

private:
    std::vector<std::function<void (Message)>> receivers;
    std::queue<Message> messages;
};
```

Well, that's aplenty! Let's explain what each function does.

* `addReceiver()`    
This function adds a new receiver to the list of receivers `notify()` will loop through. A receiver is basically another component connected to the message bus. All receivers are stored in the `receivers` vector. This function should be called during the initialization of your program. We are accepting `std::function` objects so that we will be able to accept receivers that do not inherit from some sort of an `Observer` class. Also, the function name we pass can be different as long as the function has the same signature.
* `sendMessage()`    
Adds a new message that the message bus will send to each component. All messages are added in a queue(`messages` in our case). We are using a queue so that we are guaranteed that messages are sent using FIFO (first in, first out). You do not want to be killed by an enemy first even though you killed him first, don't you? This function is invoked by the component itself that has a reference to the message bus.
* `notify()`    
This function sends all messages to each component. The first message in the queue is the first to be sent to each component and then popped off the message queue and so on. This function should be called during the game loop.

Next, we would need a base class where all components that uses the message bus will be based on. We will call this base class, `BusNode`.

```
#include <iostream>
#include <functional>

class BusNode
{
public:
    BusNode(MessageBus *messageBus)
    {
        this->messageBus = messageBus;
        this->messageBus->addReceiver(this->getNotifyFunc());
    }

    virtual void update() {};
protected:
    MessageBus *messageBus;

    std::function<void (Message)> getNotifyFunc()
    {
        auto messageListener = [=](Message message) -> void {
            this->onNotify(message);
        };
        return messageListener;
    }

    void send(Message message)
    {
        messageBus->sendMessage(message);
    }

    virtual void onNotify(Message message)
    {
        // Do something here. Your choice. You could do something like this.
        // std::cout << "Siopao! Siopao! Siopao! (Someone forgot to implement onNotify().)" << std::endl;
    }
};
```

Upon construction of a `BusNode` object, it will add its receiver function, `onNotify`, to the message bus so that it can begin receiving messages automatically. We have to use `getNotifyFunc()` to pass a `std::function` object containing a lambda function that calls our object's `onNotify()`. The `update()` function is where we would perform update routines in our component.

We have now implemented a rudimentary message bus. You can now use this in your project and remix it according to your needs. But to finish this section on a high note, let's create a simple example using those three classes we have built. Don't forget to compile this under C++11 or C++14.

```
#include <iostream>
#include <functional>
#include <queue>
#include <vector>

class Message
{
public:
    Message(const std::string event)
    {
        messageEvent = event;
    }

    std::string getEvent()
    {
        return messageEvent;
    }
private:
    std::string messageEvent;
};

class MessageBus
{
public:
    MessageBus() {};
    ~MessageBus() {};

    void addReceiver(std::function<void (Message)> messageReceiver)
    {
        receivers.push_back(messageReceiver);
    }

    void sendMessage(Message message)
    {
        messages.push(message);
    }

    void notify()
    {
        while(!messages.empty()) {
            for (auto iter = receivers.begin(); iter != receivers.end(); iter++) {
                (*iter)(messages.front());
            }

            messages.pop();
        }
    }

private:
    std::vector<std::function<void (Message)>> receivers;
    std::queue<Message> messages;
};

class BusNode
{
public:
    BusNode(MessageBus *messageBus)
    {
        this->messageBus = messageBus;
        this->messageBus->addReceiver(this->getNotifyFunc());
    }

    virtual void update() {}
protected:
    MessageBus *messageBus;

    std::function<void (Message)> getNotifyFunc()
    {
        auto messageListener = [=](Message message) -> void {
            this->onNotify(message);
        };
        return messageListener;
    }

    void send(Message message)
    {
        messageBus->sendMessage(message);
    }

    virtual void onNotify(Message message)
    {
        // Do something here. Your choice. But you could do this.
        // std::cout << "Siopao! Siopao! Siopao! (Someone forgot to implement onNotify().)" << std::endl;
    }
};

// This class will receive a message from ComponentB.
class ComponentA : public BusNode
{
public:
    ComponentA(MessageBus* messageBus) : BusNode(messageBus) {}

private:
    void onNotify(Message message)
    {
        std::cout << "I received: " << message.getEvent() << std::endl;
    }
};

// This class will send a message to ComponentA.
class ComponentB : public BusNode
{
public:
    ComponentB(MessageBus* messageBus) : BusNode(messageBus) {}

    void update()
    {
        Message greeting("Hi!");
        send(greeting);
    }

private:
    void onNotify(Message message)
    {
        std::cout << "I received: " << message.getEvent() << std::endl;
    }
};


int main()
{
    MessageBus messageBus;
    ComponentA compA(&messageBus);
    ComponentB compB(&messageBus);

    // This is supposed to act like a game loop.
    for (int ctr = 0; ctr < 50; ctr++) {
        compA.update();
        compB.update();
        messageBus.notify();
    }

    return 0;
}
```

The output would look like this.

![Message Bus example output](/static/img/posts/implementing-a-simple-message-bus-in-cpp/example-output.jpg)

#### Conclusion
We have implemented a message bus that allows intercomponent communication and decoupling of our system. Our message bus consists of three classes: `BusNode`, the base class for our components depending on the message bus; `Message`, the class the messages we send depends on; and `MessageBus`, the message bus implementation itself.

What we created is just a basic message bus. The message bus is usable but it surely needs improvements. One way you can build upon this is by adding a mechanism where receivers can subscribe to specific messages. To allow comparison between messages, we can use message IDs. The IDs should be hashed (try FNV-1A) to allow fast comparisons.

For further reference, you may want to check out OpTank's [article](http://optank.org/2013/04/02/game-development-design-3-message-bus/) on message buses. Michael Kissner's [article](http://gamasutra.com/blogs/MichaelKissner/20151027/257369/Writing_a_Game_Engine_from_Scratch__Part_1_Messaging.php) about messaging in a game engine in Gamasutra can be helpful as well.

Do not take what we have created as is. I intended it as a foundation from which you can build your own message bus. I recommend deviating from the code here. Do not forget to [plan before you code](/blog/5-lessons-learned-from-developing-a-school-election-system/). Adapt what you have learned here and apply it in your own message bus or any project you have at hand.

*Are you currently working on a project? How did you process communication between your project's components? Do you have something to share? Let us know in the comments below.*
