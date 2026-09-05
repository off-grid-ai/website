// Carries the plan a buyer picked across the hosted checkout, so the purchase
// conversion can report what the sale was worth.
//
// Why this exists: RevenueCat hosts checkout and redirects back to
// /thank-you/?app_user_id=<email> - the plan and the price are not in that URL.
// The buy button is the last place that knows both, so it writes them to a
// first-party cookie and the thank-you page reads them back. The redirect is a
// top-level navigation, so a SameSite=Lax cookie is sent with it.
//
// A ?plan= on the redirect URL still wins when one is configured; this is the
// fallback that needs no dashboard setup.
//
// Loaded as a browser global by the pages that need it, so it has no
// dependencies and stays ES5.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CheckoutPlan = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  var COOKIE = 'og_checkout';
  // A checkout is minutes, not days. Short enough that an abandoned attempt
  // cannot attach itself to a purchase made much later.
  var MAX_AGE_SECONDS = 6 * 60 * 60;
  var PLANS = { annual: true, lifetime: true, ogap: true };
  var EVENT_ID_RE = /^[0-9a-f-]{36}$/i;

  // ---------------------------------------------------------------- pure

  // "lifetime.69.<checkout uuid>" - the selected plan, display value, and
  // exact checkout attempt. Older two-part cookies remain readable during the
  // deployment transition.
  function serialize(plan, value, checkoutId) {
    if (!PLANS[String(plan)]) return null;
    var amount = Number(value);
    if (!isFinite(amount) || amount < 0) return null;
    var id = checkoutId ? String(checkoutId) : '';
    if (id && !EVENT_ID_RE.test(id)) return null;
    return plan + '.' + amount + (id ? '.' + id : '');
  }

  function deserialize(raw) {
    if (typeof raw !== 'string') return null;
    var dot = raw.indexOf('.');
    if (dot < 1) return null;
    var plan = raw.slice(0, dot);
    var secondDot = raw.indexOf('.', dot + 1);
    var amount = Number(secondDot < 0 ? raw.slice(dot + 1) : raw.slice(dot + 1, secondDot));
    var checkoutId = secondDot < 0 ? '' : raw.slice(secondDot + 1);
    if (!PLANS[plan] || !isFinite(amount) || amount < 0) return null;
    if (checkoutId && !EVENT_ID_RE.test(checkoutId)) return null;
    return { plan: plan, value: amount, checkoutId: checkoutId };
  }

  // ----------------------------------------------------------------- I/O

  function write(encoded, maxAge) {
    if (typeof document === 'undefined') return false;
    var secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    /* eslint-disable prefer-template */
    document.cookie =
      COOKIE + '=' + encodeURIComponent(encoded) +
      '; Max-Age=' + maxAge +
      '; Path=/; SameSite=Lax' + secure;
    /* eslint-enable prefer-template */
    return true;
  }

  // Stores the plan the buyer just clicked. Never throws: a cookie we cannot
  // write costs us a reporting value, not the sale.
  function remember(plan, value, checkoutId) {
    var encoded = serialize(plan, value, checkoutId);
    if (!encoded) return false;
    try {
      return write(encoded, MAX_AGE_SECONDS);
    } catch (err) {
      return false;
    }
  }

  function read() {
    if (typeof document === 'undefined') return null;
    var parts = String(document.cookie || '').split('; ');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].indexOf(COOKIE + '=') === 0) {
        try {
          return deserialize(decodeURIComponent(parts[i].slice(COOKIE.length + 1)));
        } catch (err) {
          return null;
        }
      }
    }
    return null;
  }

  // Spend it once. Otherwise a later visit to the thank-you page would report a
  // second sale that never happened.
  function clear() {
    try {
      write('', 0);
    } catch (err) {
      /* no-op */
    }
  }

  return {
    serialize: serialize,
    deserialize: deserialize,
    remember: remember,
    read: read,
    clear: clear,
  };
});
