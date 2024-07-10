---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Joanna Farmer - Teacher & Programmer
---
<article class="markdown-body">
  <h2>About Me</h2>
  <p></p>
  <h2>Recent Posts</h2>
  <dl>
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}

  {% for nav_post in sorted_posts limit: 3 %}
    {% if nav_post.layout != 'redirect' %}
      <dt><a href="{{ nav_post.url | relative_url }}">{% if nav_post.date %}{{ nav_post.date | date: "%b %-d" }}: {% endif %}{{ nav_post.title }}</a></dt>
      {% if nav_post.description %}<dd>{{ nav_post.description }}</dd>{% endif %}
    {% endif %}
  {% endfor %}
  </dl>
</article>
