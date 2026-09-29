---
layout: default
title: Articles
nav_order: 10
nav_group: Learn
description: Practical Off Grid AI articles for phones, computers, and everyday work.
---

# Articles

Practical ways to use Off Grid AI on your own devices. Use Search to find a specific task.

{% assign articles = site.pages | where: "devto_article", true | sort: "date" | reverse %}
{% for section in site.data.article_sections %}
## {{ section.name }}

{% assign matches = articles | where: "article_category", section.name %}
{% for article in matches %}
- [{{ article.title }}]({{ article.url | relative_url }}) <span class="muted">{{ article.date | date: "%d %b %Y" }}</span>
{% endfor %}

{% endfor %}
