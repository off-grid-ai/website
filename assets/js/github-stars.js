/* Refresh the star counts in the open-source strip from GitHub.
 *
 * Progressive enhancement only: every count is already server-rendered from
 * _data/repos.yml, so a blocked request, a rate limit (60/hr unauthenticated,
 * shared per IP) or JS off all leave the strip correct-but-stale rather than
 * empty. One request per session covers every repo on the page; the result is
 * cached in sessionStorage so navigating the site does not spend the budget. */
(function () {
  'use strict';

  var CACHE_KEY = 'og-github-stars';
  var ENDPOINT = 'https://api.github.com/orgs/off-grid-ai/repos?per_page=100&type=public';

  /* 2860 -> "2.9k". Mirrors the Liquid formatting in _includes/open-source-strip.html
   * so a refreshed count never changes shape, only value. */
  function format(stars) {
    if (stars >= 1000) return Math.round(stars / 100) / 10 + 'k';
    return String(stars);
  }

  function paint(starsByRepo) {
    var nodes = document.querySelectorAll('.oss-repo[data-repo]');
    for (var i = 0; i < nodes.length; i++) {
      var stars = starsByRepo[nodes[i].getAttribute('data-repo')];
      var count = nodes[i].querySelector('.oss-repo-count');
      if (typeof stars === 'number' && count) count.textContent = format(stars);
    }
  }

  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(starsByRepo) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(starsByRepo));
    } catch (e) {
      /* Private mode or a full quota - the counts still painted. */
    }
  }

  var cached = readCache();
  if (cached) {
    paint(cached);
    return;
  }

  fetch(ENDPOINT, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('github ' + res.status);
      return res.json();
    })
    .then(function (repos) {
      if (!Array.isArray(repos)) return;
      var starsByRepo = {};
      for (var i = 0; i < repos.length; i++) {
        if (repos[i] && repos[i].name) starsByRepo[repos[i].name] = repos[i].stargazers_count;
      }
      paint(starsByRepo);
      writeCache(starsByRepo);
    })
    .catch(function () {
      /* Keep the server-rendered counts. */
    });
})();
