const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.handlers = {};
    this.value = '';
    this.hidden = false;
    this.classList = { toggle() {} };
  }
  addEventListener(name, callback) { (this.handlers[name] ||= []).push(callback); }
  fire(name, event = {}) { (this.handlers[name] || []).forEach(callback => callback(event)); }
  setAttribute() {}
  focus() {}
  getBoundingClientRect() { return { top: 0 }; }
}

function fixture(sdk = 'normal', pageSize = '8') {
  const ids = {};
  for (const name of ['search', 'platform', 'sort', 'clear', 'more', 'empty', 'result-title', 'result-count', 'results']) {
    ids['article-' + name] = new Element();
  }
  ids['article-sort'].value = 'newest';
  const topics = ['', 'Guides', 'Articles'].map(topic => new Element({ topic }));
  const panel = new Element();
  const items = ['Guides', 'Articles'].map((topic, i) => {
    const item = new Element({ topic, platform: 'Android', date: '2026-09-30', keywords: 'Sync' });
    item.href = '/articles/result-' + i + '/?private=value';
    item.querySelector = selector => ({ textContent: selector === '.guide-card-title' ? 'Android sync' : 'Learn about sync' });
    item.closest = () => item;
    return item;
  });
  const results = ids['article-results'];
  results.appendChild = item => { items.splice(items.indexOf(item), 1); items.push(item); };
  results.querySelectorAll = () => items;
  results.contains = item => items.includes(item);
  const hub = new Element(pageSize ? { pageSize } : {});
  hub.querySelector = () => panel;
  hub.querySelectorAll = selector => selector === '.article-topic' ? topics : items;
  const impression = new Element({ analyticsView: 'design_partner_offer_viewed', analyticsPlacement: 'home_card' });
  const events = [];
  const handlers = {};
  let observerCallback;
  const timers = new Map();
  let timerId = 0;
  const window = {
    location: { pathname: pageSize ? '/' : '/articles/', href: 'https://getoffgridai.co/' },
    matchMedia: () => ({ matches: true }),
    addEventListener: (name, callback) => { handlers[name] = callback; },
    setTimeout: callback => { timers.set(++timerId, callback); return timerId; },
    clearTimeout: id => timers.delete(id)
  };
  if (sdk !== 'missing') window.posthog = {
    capture(name, properties) {
      if (sdk === 'throwing') throw new Error('blocked');
      events.push({ name, properties });
    }
  };
  const document = {
    querySelector: () => hub,
    querySelectorAll: () => [impression],
    getElementById: id => ids[id],
    addEventListener: (name, callback) => { handlers['document-' + name] = callback; }
  };
  const context = vm.createContext({ window, document, URL, IntersectionObserver: class {
    constructor(callback) { observerCallback = callback; }
    observe() {}
    unobserve() {}
  } });
  for (const file of ['site-analytics.js', 'article-hub.js']) {
    vm.runInContext(fs.readFileSync('assets/js/' + file, 'utf8'), context);
  }
  return {
    window, ids, topics, items, panel, events, handlers,
    type(value) { ids['article-search'].value = value; ids['article-search'].fire('input'); },
    tick() { const callbacks = [...timers.values()]; timers.clear(); callbacks.forEach(callback => callback()); },
    view() { observerCallback([{ target: impression, isIntersecting: true, intersectionRatio: 0.5 }]); }
  };
}

for (const pageSize of ['8', '']) {
  const f = fixture('normal', pageSize);
  assert.equal(f.events.length, 0, 'rendering alone must not send interaction events');
  f.type('android'); f.type('android sync'); f.tick();
  assert.equal(f.events.length, 1, 'typing is debounced');
  assert.equal(f.events[0].name, 'resource_search_used');
  assert.equal(f.events[0].properties.result_count, 2);
  assert.equal(f.events[0].properties.placement, pageSize ? 'home_resources' : 'articles');
  assert.equal(f.panel.hidden, true);
  f.ids['article-search'].fire('change'); f.ids['article-search'].fire('blur');
  assert.equal(f.events.length, 1, 'change and blur must not duplicate search');
  f.type(''); f.tick();
  assert.equal(f.events.at(-1).name, 'resource_search_cleared');
  assert.equal(f.panel.hidden, false);
  f.topics[1].fire('click');
  assert.equal(f.events.at(-1).properties.topic, 'Guides');
  assert.equal(f.events.at(-1).properties.result_count, 1);
  f.ids['article-platform'].value = 'Android';
  f.ids['article-platform'].fire('input'); f.ids['article-platform'].fire('change');
  assert.equal(f.events.filter(e => e.name === 'resource_device_selected').length, 1);
  f.ids['article-sort'].value = 'title'; f.ids['article-sort'].fire('change');
  assert.equal(f.events.at(-1).name, 'resource_sort_changed');
  f.ids['article-results'].fire('click', { target: f.items.find(item => !item.hidden) });
  assert.equal(f.events.at(-1).properties.position, 1);
  assert.match(f.events.at(-1).properties.destination, /^\/articles\/result-\d\/$/);
  f.ids['article-more'].fire('click');
  assert.equal(f.events.at(-1).name, 'resource_more_clicked');
  f.type('a-private-search-that-does-not-match'); f.tick();
  assert.equal(f.events.at(-1).properties.result_count, 0);
  assert.equal(f.ids['article-empty'].hidden, false);
  f.ids['article-clear'].fire('click');
  assert.equal(f.events.at(-1).name, 'resource_filters_cleared');
  assert.equal(f.ids['article-search'].value, '');
  f.view(); f.view();
  assert.equal(f.events.filter(e => e.name === 'design_partner_offer_viewed').length, 1);
  for (const name of ['design_partner_offer_clicked', 'design_partner_email_clicked']) {
    f.handlers['document-click']({ target: { closest: () => ({ dataset: { analyticsEvent: name, analyticsPlacement: 'test' } }) } });
    assert.equal(f.events.at(-1).name, name);
  }
  const payloads = JSON.stringify(f.events);
  assert.ok(!payloads.includes('android sync'));
  assert.ok(!payloads.includes('a-private-search'));
  assert.ok(!payloads.includes('private=value'));
}

for (const sdk of ['missing', 'throwing']) {
  const f = fixture(sdk);
  f.type('android'); f.tick(); f.topics[1].fire('click'); f.view();
  f.ids['article-results'].fire('click', { target: f.items.find(item => !item.hidden) });
  assert.equal(f.ids['article-empty'].hidden, true, 'tracking failure must not break results');
}
console.log('Analytics event, privacy, deduplication, and failure checks passed');
