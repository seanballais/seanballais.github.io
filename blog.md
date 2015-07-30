---
layout: page
title: "Blog"
description: "These thoughts of mine"
---

Here is the list of articles written previously. More coming!

<p>
{% for post in site.posts %}
  * {{ post.date | date: "%A %B %-d, %Y %I:%M %p" }} - [{{ post.title }}]({{ post.url }})
{% endfor %}
</p>