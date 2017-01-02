---
layout:     post
title:      "Implementing a Simple Message Bus in C++"
date:       2017-01-03 14:58
author:     "Sean Francis N. Ballais"
permalink:  /blog/implementing-a-simple-message-bus-in-cpp/
header-img: "img/posts/out-with-the-old-and-in-with-the-new/header.jpg"
comments: true
description: "Developing a system to allow communication between decoupled components."
---

Starting late December of 2016, I have been working on creating a 2D game engine for fun (and profit). It is not done yet and most of the systems have not yet been implemented. What I recently finished working on was the message bus. It is already functional but it still needs some improvement. In this article, we will be implementing a message bus that you can use in your own project. The message bus that we will be implemented will be game-oriented.

#### What's a Message Bus?
Applications and games normally are composed of multiple components. Each component is responsible for a task or a feature of the application. Sometimes, a component needs to 'talk' to another component. For example, your input system would need to 'tell' your entity system that the player needs to be moved forward because the `W` key has been pressed. In code, you might implement it in this manner.

```
// Somewhere in the depths of your Input system.
if (Input.isPressed(Keys.W)) {
    Log.add("Siopao! Siopao! Siopao! Do not do it this way! Siopao! Siopao! Siopao!");
    player.move(10, 10);
    ...
}
```

Now, your input system is now informing the player to move forward. Game runs perfectly but there is a problem. Doing so couples your code. Coupled code is hard to maintain and is messy. Adding and removing certain parts would be more difficult as one change could entail changes in the other components. Creating a diagram on the overall system would result in each component connected to each other component. It looks messy.

To solve this issue, we would need to decouple the components from each other. A system that will allow communication between these components is what we need. This system is what we call a message bus.

A **message bus** is basically a modified large-scale [Observer pattern](http://gameprogrammingpatterns.com/observer.html). In the Observer pattern, there would be **observers** to receive notifications and **subjects** to send those notifications. Usually, observers and subjects are class instances. However, in the post-OOP zeitgeist, it is recommended to use function pointers (or `std::function`) instead of class instances for observers as using objects have its limitations (of which, you can learn about [here](http://www.drdobbs.com/cpp/generalizing-observer/184403873) near the end of the article). You can learn more about the Observer Pattern [here](http://gameprogrammingpatterns.com/observer.html).

In a message bus, you have components sending and receiving messages to it. The message bus's job is to route these messages to every component connected to it. **Messages** that each component send are basically events that happened. For example, a component may send a `W_PRESSED` message and the message bus will send that message to other components. The receipient is responsible with what it will do with the message. The sender does not even need to know if the message was received by another component or not. Heck! The sender should only be aware of the existence of itself and the message bus. It should not know the existence of the other components. The sent message can be silently ignored by the receivers like how your crush would just carefully ignore your chat messages to him/her instead of seen-zoning you (Introducing this Filipino thing called [*hugot*](http://www.urbandictionary.com/define.php?term=hugot) and proceeds to lie down, try not to cry, and then cry a lot).

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

The `Message` constructor accepts the string parameter `event` that contains the event that happened. The value of `messageEvent` may be `"W_PRESSED"` or `PLAYER_FELL`. Note that this implementation may differ from yours depending on your needs.

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
This function adds a new receiver to the list of receivers `notify()` will loop through. A receiver is basically another component connected to the message bus. All receivers are stored in the `receivers` vector. This function should be called during the initialization of your program.
* `sendMessage()`
Adds a new message that the message bus will send to each component. All messages are added in a queue(`messages` in our case). We are using a queue so that we are guaranteed that messages are sent using FIFO (first in, first out). You do not want to be killed by an enemy first even though you killed him first, don't you? This function is invoked by the component itself.
* `notify()`
This function sends all messages to each component. The first message in the queue is the first to be sent to each component and then popped off the message queue and so on. This function should be called during the game loop.

Next, we would need a base class where all components that uses the message bus will be based on. We will call this base class, `BusNode`.

```
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

Upon construction of a `BusNode` object, it will add itself to the message bus so that it can begin receiving messages automatically. The `update()` function is where we would perform update routines in our component. You could already create an object using `BusNode` and use it but components are built with different purposes. So, your project components be different classes that inherit from `BusNode`.

We have now implemented a rudimentary message bus. You can now use this in your project and remix it according to your needs. But to finish this section on a high note, let's create a simple example using those three classes we have built.

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

    for (int ctr = 0; ctr < 50; ctr++) {
        compA.update();
        compB.update();
        messageBus.notify();
    }

    return 0;
}
```

Output:

```
...
I received: Hi!
I received: Hi!
I received: Hi!
I received: Hi!
I received: Hi!
...
```

#### Conclusion
We have implemented a message bus that allows intercomponent communication and decouple our system. Our message bus consists of three classes: `BusNode`, the base class for our components depending on the message bus; `Message`, the class the messages we send depends on; and `MessageBus`, the message bus implementation itself.

What we created is just a basic message bus. The message bus is usable but it surely needs improvements. One way you can build upon this is by adding a mechanism where receivers can subscribe to specific messages. To allow comparison between messages, we can use message IDs. The IDs should be hashed (Try FNV-1A) to allow fast comparisons.

For further reference, you may want to check out OpTank's [article](http://optank.org/2013/04/02/game-development-design-3-message-bus/) on message buses. Michael Kissner's [article](http://gamasutra.com/blogs/MichaelKissner/20151027/257369/Writing_a_Game_Engine_from_Scratch__Part_1_Messaging.php) on Gamasutra can be helpful as well.

Do not take what we have created as is. I intended it as a foundation from which you can build your own message bus. I recommend deviating from the code here. Adapt what you have learned here and apply it in your own message bus.

*Are you currently working on a project? How did you process communication between your project's components? Do you have something to share? Let us know in the comments below.*
