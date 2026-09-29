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
  var entries = Array.from(hub.querySelectorAll('.article-result')).map(function (element) {
    var heading = element.querySelector('.guide-card-title').textContent;
    var description = element.querySelector('.guide-card-desc').textContent;
    return {
      element: element,
      heading: heading.toLocaleLowerCase(),
      text: (heading + ' ' + description + ' ' + element.dataset.topic + ' ' + element.dataset.platform).toLocaleLowerCase(),
      date: element.dataset.date
    };
  });
  var selectedTopic = '';
  var visible = 24;

  function render() {
    var query = search.value.trim().toLocaleLowerCase();
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
    title.textContent = query ? 'Search results' : (selectedTopic || 'Latest articles');
    count.textContent = matches.length ?
      'Showing ' + Math.min(visible, matches.length) + ' of ' + matches.length + ' guides' :
      '0 guides';
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
      selectedTopic = button.dataset.topic;
      visible = 24;
      render();
    });
  });
  [search, platform, sort].forEach(function (control) {
    control.addEventListener('input', function () { visible = 24; render(); });
    control.addEventListener('change', function () { visible = 24; render(); });
  });
  more.addEventListener('click', function () { visible += 24; render(); });
  clear.addEventListener('click', function () {
    search.value = '';
    platform.value = '';
    sort.value = 'newest';
    selectedTopic = '';
    visible = 24;
    render();
    search.focus();
  });
  render();
})();
