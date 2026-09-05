// Loads the public Meta Pixel ID from the Worker environment, then exposes one
// queue-safe tracking boundary for the rest of the site.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory;
  } else {
    root.OffGridMeta = factory(root, root.document);
    root.OffGridMeta.boot();
  }
})(typeof self !== 'undefined' ? self : this, function (root, documentLike) {
  var ready = false;
  var pending = [];

  function installPixel() {
    if (root.fbq) return root.fbq;
    var n = root.fbq = function () {
      if (n.callMethod) n.callMethod.apply(n, arguments);
      else n.queue.push(arguments);
    };
    if (!root._fbq) root._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    if (documentLike && documentLike.createElement) {
      var script = documentLike.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      var first = documentLike.getElementsByTagName('script')[0];
      if (first && first.parentNode) first.parentNode.insertBefore(script, first);
    }
    return n;
  }

  function trackNow(name, data, eventId) {
    var options = eventId ? { eventID: eventId } : undefined;
    root.fbq('track', name, data || {}, options);
  }

  function track(name, data, eventId) {
    if (!ready) {
      pending.push([name, data, eventId]);
      return;
    }
    try {
      trackNow(name, data, eventId);
    } catch (err) {
      /* An analytics failure must never stop checkout. */
    }
  }

  function initialize(pixelId) {
    if (!/^\d{5,30}$/.test(String(pixelId || ''))) return false;
    installPixel();
    root.fbq('init', String(pixelId));
    ready = true;
    trackNow('PageView', {}, '');
    while (pending.length) {
      var item = pending.shift();
      trackNow(item[0], item[1], item[2]);
    }
    return true;
  }

  function boot() {
    if (!documentLike || typeof root.fetch !== 'function') return Promise.resolve(false);
    var script = documentLike.currentScript;
    var endpoint = script && script.getAttribute ? script.getAttribute('data-config-url') : '';
    if (!endpoint) return Promise.resolve(false);
    return root.fetch(endpoint, { credentials: 'omit' })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (config) { return initialize(config && config.pixel_id); })
      .catch(function () { return false; });
  }

  return { boot: boot, initialize: initialize, track: track };
});
