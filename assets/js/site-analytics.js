// Named events for the resource hub and design partner funnel.
(function () {
  function capture(name, properties) {
    try {
      if (!window.posthog || typeof window.posthog.capture !== 'function') return;
      window.posthog.capture(name, Object.assign({ source: window.location.pathname }, properties));
    } catch (error) {
      // Analytics must never block navigation, filtering, or checkout.
    }
  }
  window.OffGridAnalytics = { capture: capture };

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[data-analytics-event]');
    if (!link) return;
    capture(link.dataset.analyticsEvent, { placement: link.dataset.analyticsPlacement });
  });

  if (typeof IntersectionObserver !== 'function') return;
  var viewed = new WeakSet();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.4) return;
      var element = entry.target;
      if (viewed.has(element)) return;
      viewed.add(element);
      // Placements on every page (the announcement bar) count once per visit, not on every page view.
      if (element.dataset.analyticsOnce === 'session') {
        var key = 'og-viewed:' + element.dataset.analyticsView + ':' + element.dataset.analyticsPlacement;
        try { if (sessionStorage.getItem(key)) { observer.unobserve(element); return; } sessionStorage.setItem(key, '1'); } catch (error) {}
      }
      capture(element.dataset.analyticsView, { placement: element.dataset.analyticsPlacement });
      observer.unobserve(element);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-analytics-view]').forEach(function (element) {
    observer.observe(element);
  });
})();
