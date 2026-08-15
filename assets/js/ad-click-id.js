// Remembers the Google Ads click id for the whole visit, not just the landing
// page.
//
// Why this exists: PostHog records `gclid` natively, but only on the pageview
// that carried it in the URL. A buyer lands on `/?gclid=...`, browses to
// `/pro/`, and clicks Buy — by then the click id is gone, so the purchase can
// never be matched back to the ad that produced it. This stores the click id
// in a first-party cookie and registers it as a PostHog super-property, so
// every later event on the visit carries it.
//
// The properties are named `ad_click_id` / `ad_click_id_type` rather than
// `gclid` on purpose. Registering a `gclid` super-property would stamp it onto
// organic visits weeks later, and PostHog derives its acquisition-channel
// reports from those campaign params — the paid/organic split would be wrong.
// A separate namespace keeps PostHog's own reporting honest while still giving
// the conversion upload the value it needs.
//
// Loaded as a browser global by the default layout, so it has no dependencies
// and stays ES5.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AdClickId = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  var COOKIE = 'og_ad_click';
  // Google's conversion window tops out at 90 days, so a longer cookie would
  // hold ids the upload will reject anyway.
  var MAX_AGE_SECONDS = 90 * 24 * 60 * 60;
  // Click ids are opaque tokens. Bound the length and charset so nothing that
  // arrives in a URL can break out of the cookie or the property value.
  var VALUE_RE = /^[A-Za-z0-9._-]{1,512}$/;
  // Order matters: Google sends gbraid/wbraid instead of gclid when the click
  // came from an app or iOS context, and gclid wins when more than one is
  // present.
  var PARAMS = ['gclid', 'wbraid', 'gbraid'];

  // ---------------------------------------------------------------- pure

  // Pulls the click id out of a query string. Returns { type, value } or null.
  // Takes the string rather than reading location, so it is testable and has
  // no I/O.
  function parse(search) {
    if (typeof search !== 'string' || search === '') return null;
    var query = search.charAt(0) === '?' ? search.slice(1) : search;
    var pairs = query.split('&');
    var found = {};

    for (var i = 0; i < pairs.length; i++) {
      var eq = pairs[i].indexOf('=');
      if (eq < 1) continue;
      var key = pairs[i].slice(0, eq);
      if (PARAMS.indexOf(key) === -1) continue;
      var value;
      try {
        value = decodeURIComponent(pairs[i].slice(eq + 1).replace(/\+/g, ' '));
      } catch (err) {
        continue; // Malformed percent-encoding: ignore this pair.
      }
      if (VALUE_RE.test(value) && !found[key]) found[key] = value;
    }

    for (var p = 0; p < PARAMS.length; p++) {
      if (found[PARAMS[p]]) return { type: PARAMS[p], value: found[PARAMS[p]] };
    }
    return null;
  }

  function serialize(record) {
    if (!record || PARAMS.indexOf(record.type) === -1) return null;
    if (!VALUE_RE.test(record.value)) return null;
    /* eslint-disable prefer-template */
    return record.type + '.' + record.value;
    /* eslint-enable prefer-template */
  }

  function deserialize(raw) {
    if (typeof raw !== 'string') return null;
    var dot = raw.indexOf('.');
    if (dot < 1) return null;
    var record = { type: raw.slice(0, dot), value: raw.slice(dot + 1) };
    return serialize(record) ? record : null;
  }

  // ----------------------------------------------------------------- I/O

  function readCookie() {
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

  function writeCookie(record) {
    var encoded = serialize(record);
    if (!encoded || typeof document === 'undefined') return false;
    var secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    /* eslint-disable prefer-template */
    document.cookie =
      COOKIE +
      '=' +
      encodeURIComponent(encoded) +
      '; Max-Age=' +
      MAX_AGE_SECONDS +
      '; Path=/; SameSite=Lax' +
      secure;
    /* eslint-enable prefer-template */
    return true;
  }

  // The click id for this visit: a fresh one from the URL if present,
  // otherwise whatever an earlier page in the window stored.
  function get() {
    if (typeof location !== 'undefined') {
      var fresh = parse(location.search);
      if (fresh) return fresh;
    }
    return readCookie();
  }

  // Stores a new click id and hands it to PostHog for every later event.
  // Last click wins, which is how Google attributes the conversion.
  function remember() {
    var fresh = typeof location !== 'undefined' ? parse(location.search) : null;
    if (fresh) writeCookie(fresh);

    var record = fresh || readCookie();
    if (!record) return null;

    // Never let an analytics failure (blocked, errored) break the page.
    try {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.register({
          ad_click_id: record.value,
          ad_click_id_type: record.type,
        });
      }
    } catch (err) {
      /* no-op */
    }
    return record;
  }

  return {
    parse: parse,
    serialize: serialize,
    deserialize: deserialize,
    get: get,
    remember: remember,
  };
});
