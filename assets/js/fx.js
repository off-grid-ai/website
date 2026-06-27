/* ─────────────────────────────────────────────────────────────────────────────
   Off Grid AI — fx.js
   Interaction layer for fx.css. Pure vanilla, no dependencies, no build step.

   AUTO-ENHANCES every page (no per-element markup needed):
     • cursor-follow spotlight on all card-like blocks
     • scroll-reveal on all content blocks (class added by JS, so no-JS shows all)
   Opt-in extras via attributes:
     data-fx-type        reveal child .ln lines in sequence (terminal)
     data-fx-accordion   container of .fx-rung items; click a head to toggle
                         (data-fx-open="N" = how many start open)
   Honors prefers-reduced-motion (resolves to final state, no animation).
   ───────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (window.__ogFxLoaded) return; window.__ogFxLoaded = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Card-like blocks that get the cursor spotlight everywhere on the site.
  var SPOT = '.perk-card, .ea-essay-card, .stat-card, .home-console-banner, .v-card, .offer-closing, .early-access-hero';

  // Content blocks that fade/slide in as they scroll into view (any page).
  var REVEAL = [
    '.content > h2', '.content > h3', '.content > p', '.content > ul', '.content > ol',
    '.content > table', '.content > blockquote', '.content > img',
    '.content > .page-title-row', '.content > .hero-buttons', '.content > .stats-row',
    '.content > .early-access-perks', '.content > .ea-essay-links', '.content > .home-console-banner',
    '.content > .offer-closing', '.content > .early-access-hero', '.content > .home-console-banner',
    '.vision .v-hero', '.vision .v-term', '.vision .v-sec'
  ].join(', ');

  function init() {
    /* ── Spotlight — auto-tag card-like blocks, then track the pointer ───────── */
    document.querySelectorAll(SPOT).forEach(function (el) { el.classList.add('fx-spot'); });
    document.querySelectorAll('.fx-spot').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--fx-mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--fx-my', (e.clientY - r.top) + 'px');
      });
    });

    /* ── Accordion (the maturity ladder, reusable elsewhere) ─────────────────── */
    document.querySelectorAll('[data-fx-accordion]').forEach(function (acc) {
      var rungs = acc.querySelectorAll('.fx-rung');
      var openN = parseInt(acc.getAttribute('data-fx-open') || '0', 10);
      rungs.forEach(function (r, i) {
        var head = r.querySelector('.fx-rung-head') || r;
        head.addEventListener('click', function () { r.classList.toggle('open'); });
        if (i < openN) r.classList.add('open');
      });
    });

    /* ── Scroll reveal — collect explicit + auto blocks, hide via JS, observe ── */
    var seen = [];
    function collect(el) { if (el && seen.indexOf(el) < 0) { seen.push(el); el.classList.add('fx-reveal'); } }
    document.querySelectorAll('[data-fx-reveal]').forEach(collect);
    document.querySelectorAll(REVEAL).forEach(collect);

    if (reduce || !('IntersectionObserver' in window)) {
      seen.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
      seen.forEach(function (el) { io.observe(el); });
    }

    /* ── Typed line reveal (terminal) ────────────────────────────────────────── */
    document.querySelectorAll('[data-fx-type]').forEach(function (box) {
      var lines = box.querySelectorAll('.ln');
      if (reduce || !('IntersectionObserver' in window)) {
        lines.forEach(function (l) { l.classList.add('show'); });
        return;
      }
      var started = false;
      var run = function () {
        var d = 0;
        lines.forEach(function (l, i) {
          setTimeout(function () { l.classList.add('show'); }, d);
          d += (l.getAttribute('data-quick') !== null) ? 650 : 900;
        });
      };
      var to = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !started) { started = true; run(); to.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      to.observe(box);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
