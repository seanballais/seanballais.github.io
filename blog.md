---
layout: page
title: "Blog"
description: "These thoughts of mine"
---

Here is the list of articles written previously. More coming!

{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}
