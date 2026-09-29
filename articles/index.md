---
layout: default
title: Articles
nav_order: 10
nav_group: Learn
wide: true
description: Find Off Grid AI guides by task, device, and topic.
---

# Find an Off Grid AI guide

Choose a topic or search for the task you want to do. Every guide is available here.

{% assign articles = site.pages | where: "devto_article", true | sort: "published_at" | reverse %}

<div class="article-hub" data-pagefind-ignore>
  <div class="article-search-row">
    <label class="article-search-label" for="article-search">Search articles</label>
    <input id="article-search" class="article-search-input" type="search" placeholder="Try transcription, PDF, Android, sync..." autocomplete="off">
  </div>

  <div class="article-topics" role="group" aria-label="Filter by topic">
    <button class="article-topic is-active" type="button" data-topic="" aria-pressed="true">
      <span class="article-topic-name">All topics</span>
      <span class="article-topic-count">{{ articles.size }} guides</span>
    </button>
    {% for section in site.data.article_sections %}
    {% assign matches = articles | where: "article_topic", section.name %}
    <button class="article-topic" type="button" data-topic="{{ section.name | escape }}" aria-pressed="false">
      <span class="article-topic-name">{{ section.name }}</span>
      <span class="article-topic-count">{{ matches.size }} guides</span>
      <span class="article-topic-desc">{{ section.description }}</span>
    </button>
    {% endfor %}
  </div>

  <div class="article-toolbar">
    <div class="article-toolbar-title">
      <h2 id="article-result-title">Latest articles</h2>
      <p id="article-result-count" role="status" aria-live="polite"></p>
    </div>
    <div class="article-toolbar-controls">
      <label for="article-platform">Device</label>
      <select id="article-platform">
        <option value="">All devices</option>
        <option>Android</option><option>iPhone</option><option>Mac</option><option>Windows</option>
        <option>Linux</option><option>Phone</option><option>Computer</option>
        <option>Across devices</option><option>Any device</option>
      </select>
      <label for="article-sort">Sort</label>
      <select id="article-sort"><option value="newest">Newest</option><option value="title">Title A–Z</option></select>
      <button id="article-clear" class="article-clear" type="button">Clear filters</button>
    </div>
  </div>

  <div id="article-results" class="article-results">
    {% for article in articles %}
    <a class="guide-card article-result" href="{{ article.url | relative_url }}" data-topic="{{ article.article_topic | escape }}" data-platform="{{ article.article_platform | escape }}" data-date="{{ article.published_at | escape }}">
      <span class="article-result-meta">{{ article.article_topic }} · {{ article.article_platform }} · {{ article.date | date: "%d %b %Y" }}</span>
      <span class="guide-card-title">{{ article.title | escape }}</span>
      <span class="guide-card-desc">{{ article.description | escape }}</span>
    </a>
    {% endfor %}
  </div>
  <p id="article-empty" class="article-empty" hidden>No articles match. Try another term or clear the filters.</p>
  <button id="article-more" class="article-more" type="button" hidden>Show more articles</button>
</div>

<script src="{{ '/assets/js/article-hub.js' | relative_url }}" defer></script>
