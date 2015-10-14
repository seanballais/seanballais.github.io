---
layout: page
title: "Blog"
description: "These thoughts of mine"
---

Here is the list of articles written previously. More coming!

{% for post in site.posts %}
  {% if post.draft == false %}
     * [{{ post.title }}]({{ post.url }}) - *Posted on {{ post.date | date: "%A %B %-d, %Y %I:%M %p" }}*
  {% endif %}
{% endfor %}
