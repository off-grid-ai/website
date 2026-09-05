/* ============================================================================
   Off Grid — motion layer

   Vanilla ports of the four interactions worth keeping from right-suite. The
   library is gone (framer-motion is React-only); the timings are not, and the
   timings are the craft:

     scroll reveal   12px rise, 400ms, ~55ms stagger   card-deck.tsx:91-94
     spotlight       260px radial tracking the cursor  gtm-flip-card.tsx:57
     headline        blur(4px)→0 + 12px, 60ms/word     docs/design.md:263-266
     count-up        900ms easeOutCubic on first view  magicui/number-ticker

   Deliberately not ported: the nudge card's rotate/scale wiggle and the
   counter-angled shimmer sweeps. Both are decoration, which DESIGN_PHILOSOPHY
   §7 forbids. right-suite's nudge *trigger* logic (20% scroll / first click /
   30s, whichever lands first) is worth having but needs new copy, so it waits
   until there is copy to show.

   Progressive enhancement: this file adds the classes that hide things. With
   JS off or reduced-motion on, the page renders static and complete.
   ========================================================================== */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var CARDS =
    '.perk-card, .ea-essay-card, .stat-card, .guide-card, .home-console-banner, .page-nav-item';

  /* ── Scroll reveal ─────────────────────────────────────────────────────────
     Staggered per group so each grid deals itself in, rather than one stagger
     running across the whole page and leaving the last card seconds behind. */

  function revealOnScroll() {
    var groups = [
      '.stats-row',
      '.early-access-perks',
      '.ea-essay-links',
      '.guide-grid',
      '.hero-buttons'
    ];

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }
    );

    groups.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          child.classList.add('og-reveal');
          child.style.setProperty('--i', i);
          observer.observe(child);
        });
      });
    });

    // Standalone blocks reveal without a stagger index.
    document
      .querySelectorAll('.home-console-banner-wrap, .content > table')
      .forEach(function (el) {
        el.classList.add('og-reveal');
        observer.observe(el);
      });
  }

  /* ── Mouse-follow spotlight ────────────────────────────────────────────────
     One delegated listener for every card on the page instead of per-card React
     state, coalesced to one write per frame so a fast cursor cannot thrash
     style recalc. Writes --mx/--my; offgrid.css owns the gradient. */

  function spotlight() {
    var pending = null;

    document.addEventListener(
      'pointermove',
      function (event) {
        if (event.pointerType !== 'mouse') return;

        var card = event.target.closest && event.target.closest(CARDS);
        if (!card) return;

        pending = { card: card, x: event.clientX, y: event.clientY };
        requestAnimationFrame(function () {
          if (!pending) return;
          var rect = pending.card.getBoundingClientRect();
          pending.card.style.setProperty('--mx', pending.x - rect.left + 'px');
          pending.card.style.setProperty('--my', pending.y - rect.top + 'px');
          pending = null;
        });
      },
      { passive: true }
    );
  }

  /* ── Headline reveal ──────────────────────────────────────────────────────
     Splits the hero h1 into per-word spans. Rebuilt with text nodes for the
     spaces so the heading still copies and reads as one string. */

  function revealHeadline() {
    var heading = document.querySelector('.page-title-row h1');
    if (!heading || heading.children.length) return;

    var words = heading.textContent.trim().split(/\s+/);
    if (words.length < 2) return;

    heading.textContent = '';
    words.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'og-word';
      span.style.setProperty('--i', i);
      span.textContent = word;
      heading.appendChild(span);
      if (i < words.length - 1) heading.appendChild(document.createTextNode(' '));
    });
  }

  /* ── Stat count-up ────────────────────────────────────────────────────────
     Counts the leading number and keeps whatever follows it, so "100k+",
     "2,500+" and "500+" all animate without their suffix flickering. Thousands
     separators are re-applied each frame; .stat-number is tabular so the row
     never reflows mid-count. */

  function countUp() {
    var stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animate(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(function (stat) {
      observer.observe(stat);
    });

    function animate(el) {
      var raw = el.textContent.trim();
      var match = raw.match(/^([\d.,]+)(.*)$/);
      if (!match) return;

      var grouped = match[1].indexOf(',') !== -1;
      var target = parseFloat(match[1].replace(/,/g, ''));
      var suffix = match[2];
      if (!isFinite(target)) return;

      var DURATION = 900;
      var start = null;

      function frame(now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / DURATION, 1);
        var eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        var value = Math.round(target * eased);

        el.textContent = (grouped ? value.toLocaleString('en-US') : String(value)) + suffix;

        if (t < 1) requestAnimationFrame(frame);
        else el.textContent = raw; // land exactly on the authored string
      }

      el.textContent = '0' + suffix;
      requestAnimationFrame(frame);
    }
  }

  function init() {
    revealOnScroll();
    spotlight();
    revealHeadline();
    countUp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
