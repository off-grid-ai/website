// Polls the first-party Worker for a RevenueCat-confirmed purchase. Browser
// Purchase and PostHog completion events cannot fire until the webhook has
// published this receipt.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PurchaseConfirmation = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  var EVENT_ID_RE = /^rc_[A-Za-z0-9._:-]{1,200}$/;
  var TRANSACTION_RE = /^[A-Za-z0-9._:-]{1,200}$/;
  var PRODUCT_RE = /^[A-Za-z0-9._:-]{1,200}$/;
  var CHECKOUT_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  function validSourceUrl(value) {
    try {
      var url = new URL(String(value || ''));
      return url.origin === 'https://getoffgridai.co' && !url.username && !url.password;
    } catch (err) {
      return false;
    }
  }

  function validReceipt(receipt, expectedPlan, expectedCheckoutId) {
    if (!receipt || receipt.confirmed !== true) return false;
    if (receipt.plan !== expectedPlan || ['annual', 'lifetime'].indexOf(receipt.plan) === -1) return false;
    if (!EVENT_ID_RE.test(String(receipt.event_id || ''))) return false;
    if (!TRANSACTION_RE.test(String(receipt.transaction_id || ''))) return false;
    if (!PRODUCT_RE.test(String(receipt.product_id || ''))) return false;
    if (!CHECKOUT_RE.test(String(receipt.checkout_id || ''))) return false;
    if (expectedCheckoutId && receipt.checkout_id !== expectedCheckoutId) return false;
    if (!validSourceUrl(receipt.event_source_url)) return false;
    if (receipt.currency !== 'USD') return false;
    var value = Number(receipt.value);
    return isFinite(value) && value > 0;
  }

  function poll(endpoint, checkoutId, plan, options) {
    var opts = options || {};
    var fetcher = opts.fetch || (typeof fetch === 'function' ? fetch : null);
    var delay = opts.delay || function (ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    };
    var attempts = Number(opts.attempts || 30);
    var intervalMs = Number(opts.intervalMs || 1000);
    if (!fetcher || !endpoint || !checkoutId || attempts < 1) return Promise.resolve(null);
    var url = endpoint + '?checkout_id=' + encodeURIComponent(checkoutId);

    function next(remaining) {
      return fetcher(url, { credentials: 'omit', cache: 'no-store' })
        .then(function (response) { return response.ok ? response.json() : null; })
        .then(function (receipt) {
          if (validReceipt(receipt, plan, checkoutId)) return receipt;
          if (remaining <= 1) return null;
          return delay(intervalMs).then(function () { return next(remaining - 1); });
        })
        .catch(function () {
          if (remaining <= 1) return null;
          return delay(intervalMs).then(function () { return next(remaining - 1); });
        });
    }
    return next(attempts);
  }

  function alreadyFired(eventId, storage) {
    if (!storage) return false;
    var key = 'og_purchase_' + eventId;
    try {
      if (storage.getItem(key)) return true;
      storage.setItem(key, '1');
    } catch (err) { /* no-op */ }
    return false;
  }

  function report(receipt, config, supplied) {
    var deps = supplied || {};
    var meta = deps.OffGridMeta || (typeof window !== 'undefined' ? window.OffGridMeta : null);
    var posthogClient = deps.posthog || (typeof window !== 'undefined' ? window.posthog : null);
    var google = deps.gtag || (typeof window !== 'undefined' ? window.gtag : null);
    var storage = deps.storage || (typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    if (!validReceipt(receipt, receipt && receipt.plan) || alreadyFired(receipt.event_id, storage)) {
      return false;
    }

    if (meta && typeof meta.track === 'function') {
      meta.track('Purchase', {
        value: receipt.value,
        currency: receipt.currency,
        content_type: 'product',
        content_ids: [receipt.product_id],
        content_name: receipt.plan,
        transaction_id: receipt.transaction_id,
        event_source_url: receipt.event_source_url,
      }, receipt.event_id);
    }
    if (config.googleEnabled && typeof google === 'function') {
      try {
        google('event', 'conversion', {
          send_to: config.googleSendTo,
          value: receipt.value,
          currency: receipt.currency,
          transaction_id: receipt.transaction_id,
        });
      } catch (err) { /* no-op */ }
    }
    if (posthogClient && typeof posthogClient.capture === 'function') {
      try {
        posthogClient.capture('pro_purchase_completed', {
          plan: receipt.plan,
          value: receipt.value,
          currency: receipt.currency,
          checkout_id: receipt.checkout_id,
        });
      } catch (err) { /* no-op */ }
    }
    return true;
  }

  function start(config, supplied) {
    if (!config || !config.checkoutId || ['annual', 'lifetime'].indexOf(config.plan) === -1) {
      return Promise.resolve(null);
    }
    return poll(config.endpoint, config.checkoutId, config.plan, supplied)
      .then(function (receipt) {
        if (receipt) report(receipt, config, supplied);
        return receipt;
      });
  }

  return { validReceipt: validReceipt, poll: poll, report: report, start: start };
});
