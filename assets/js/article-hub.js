(function () {
  var hub = document.querySelector('.article-hub');
  if (!hub) return;

  var search = document.getElementById('article-search');
  var platform = document.getElementById('article-platform');
  var sort = document.getElementById('article-sort');
  var clear = document.getElementById('article-clear');
  var more = document.getElementById('article-more');
  var empty = document.getElementById('article-empty');
  var title = document.getElementById('article-result-title');
  var count = document.getElementById('article-result-count');
  var results = document.getElementById('article-results');
  var topics = Array.from(hub.querySelectorAll('.article-topic'));
  var topicPanel = hub.querySelector('.article-topics');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var topicsHidden = false;
  var topicAnimation;
  var contentAnimations = [];

  function setTopicsHidden(hidden) {
    if (hidden === topicsHidden) return;
    topicsHidden = hidden;
    if (topicAnimation) topicAnimation.cancel();
    contentAnimations.forEach(function (animation) { animation.cancel(); });
    contentAnimations = [];
    // Exclude fading controls from keyboard navigation immediately.
    topicPanel.inert = hidden;
    topicPanel.setAttribute('aria-hidden', String(hidden));

    function updateLayout() {
      var following = [];
      for (var element = topicPanel.nextElementSibling; element; element = element.nextElementSibling) {
        if (!element.hidden) following.push({ element: element, top: element.getBoundingClientRect().top });
      }
      topicPanel.hidden = hidden;
      if (reducedMotion.matches || !topicPanel.animate) return;
      following.forEach(function (item) {
        var offset = item.top - item.element.getBoundingClientRect().top;
        if (!offset) return;
        contentAnimations.push(item.element.animate([
          { transform: 'translateY(' + offset + 'px)' },
          { transform: 'translateY(0)' }
        ], { duration: 200, easing: 'ease-out' }));
      });
    }

    if (reducedMotion.matches || !topicPanel.animate) {
      updateLayout();
    } else if (hidden && !topicPanel.hidden) {
      topicAnimation = topicPanel.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 150, easing: 'ease-out'
      });
      topicAnimation.onfinish = function () {
        if (topicsHidden) updateLayout();
      };
    } else {
      updateLayout();
      topicAnimation = topicPanel.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 150, easing: 'ease-out'
      });
    }
  }
  var entries = Array.from(hub.querySelectorAll('.article-result')).map(function (element) {
    var heading = element.querySelector('.guide-card-title').textContent;
    var description = element.querySelector('.guide-card-desc').textContent;
    return {
      element: element,
      heading: heading.toLocaleLowerCase(),
      text: (heading + ' ' + description + ' ' + element.dataset.topic + ' ' + element.dataset.platform + ' ' + (element.dataset.keywords || '')).toLocaleLowerCase(),
      date: element.dataset.date
    };
  });
  var selectedTopic = '';
  var pageSize = Number(hub.dataset.pageSize) || 24;
  var resultLabel = hub.dataset.resultLabel || 'guides';
  var defaultTitle = hub.dataset.defaultTitle || 'Latest articles';
  var visible = pageSize;

  function render() {
    var query = search.value.trim().toLocaleLowerCase();
    setTopicsHidden(Boolean(query));
    var terms = query.split(/\s+/).filter(Boolean);
    var device = platform.value;
    var matches = entries.filter(function (entry) {
      return (!selectedTopic || entry.element.dataset.topic === selectedTopic) &&
        (!device || entry.element.dataset.platform === device) &&
        terms.every(function (term) { return entry.text.includes(term); });
    });

    matches.sort(function (a, b) {
      if (query) {
        var score = function (entry) {
          return (entry.heading.includes(query) ? 8 : 0) +
            terms.reduce(function (total, term) { return total + (entry.heading.includes(term) ? 2 : 0); }, 0);
        };
        var difference = score(b) - score(a);
        if (difference) return difference;
      }
      if (sort.value === 'title') return a.heading.localeCompare(b.heading);
      return b.date.localeCompare(a.date);
    });

    entries.forEach(function (entry) { entry.element.hidden = true; });
    matches.slice(0, visible).forEach(function (entry) {
      entry.element.hidden = false;
      results.appendChild(entry.element);
    });
    title.textContent = query ? (selectedTopic ? 'Search results in ' + selectedTopic : 'Search results') : (selectedTopic || defaultTitle);
    count.textContent = matches.length ?
      'Showing ' + Math.min(visible, matches.length) + ' of ' + matches.length + ' ' + resultLabel :
      '0 ' + resultLabel;
    empty.hidden = matches.length > 0;
    more.hidden = matches.length <= visible;
    topics.forEach(function (button) {
      var active = button.dataset.topic === selectedTopic;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  topics.forEach(function (button) {
    button.addEventListener('click', function () {
      selectedTopic = selectedTopic === button.dataset.topic ? '' : button.dataset.topic;
      visible = pageSize;
      render();
    });
  });
  [search, platform, sort].forEach(function (control) {
    control.addEventListener('input', function () { visible = pageSize; render(); });
    control.addEventListener('change', function () { visible = pageSize; render(); });
  });
  more.addEventListener('click', function () { visible += pageSize; render(); });
  clear.addEventListener('click', function () {
    search.value = '';
    platform.value = '';
    sort.value = 'newest';
    selectedTopic = '';
    visible = pageSize;
    render();
    search.focus();
  });
  render();
})();
