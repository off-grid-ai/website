// Captures Meta and campaign attribution on the first-party site and carries it
// into RevenueCat Web Purchase Links. It never invents a click id. An _fbc
// cookie is created only when the current URL contains a real fbclid.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MetaAttribution = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  var COOKIE = 'og_meta_attribution';
  var MAX_AGE_SECONDS = 90 * 24 * 60 * 60;
  var UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
  ];
  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  var CLICK_RE = /^[A-Za-z0-9._-]{1,512}$/;

  function safeValue(value) {
    return typeof value === 'string' && value.length <= 512 && !/[\u0000-\u001f\u007f]/.test(value);
  }

  function parse(search) {
    var result = {};
    if (typeof search !== 'string' || !search) return result;
    var query = search.charAt(0) === '?' ? search.slice(1) : search;
    var pairs = query.split(/[&?]/);
    for (var i = 0; i < pairs.length; i++) {
      var eq = pairs[i].indexOf('=');
      if (eq < 1) continue;
      var key = pairs[i].slice(0, eq);
      if (key !== 'fbclid' && UTM_KEYS.indexOf(key) === -1) continue;
      var value;
      try {
        value = decodeURIComponent(pairs[i].slice(eq + 1).replace(/\+/g, ' '));
      } catch (err) {
        continue;
      }
      if (!safeValue(value)) continue;
      if (key === 'fbclid' && !CLICK_RE.test(value)) continue;
      if (!result[key]) result[key] = value;
    }
    return result;
  }

  function parseCookies(raw) {
    var result = {};
    var parts = String(raw || '').split('; ');
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf('=');
      if (eq < 1) continue;
      var key = parts[i].slice(0, eq);
      try {
        result[key] = decodeURIComponent(parts[i].slice(eq + 1));
      } catch (err) {
        result[key] = '';
      }
    }
    return result;
  }

  function validFbp(value) {
    return typeof value === 'string' &&
      value.length <= 1024 &&
      /^fb\.\d+\.\d{10,16}\.[^\s;\u0000-\u001f\u007f]{1,900}$/.test(value);
  }

  function validFbc(value) {
    return typeof value === 'string' &&
      value.length <= 1024 &&
      /^fb\.\d+\.\d{10,16}\.[^\s;\u0000-\u001f\u007f]{1,900}$/.test(value);
  }

  function makeFbc(fbclid, now) {
    if (!CLICK_RE.test(String(fbclid || ''))) return '';
    var timestamp = Number(now);
    if (!isFinite(timestamp) || timestamp <= 0) return '';
    return 'fb.1.' + Math.floor(timestamp) + '.' + fbclid;
  }

  function sourceUrl(locationLike, params) {
    if (!locationLike) return '';
    var origin = String(locationLike.origin || '');
    var pathname = String(locationLike.pathname || '/');
    if (!/^https?:\/\//.test(origin)) return '';
    var kept = [];
    for (var i = 0; i < UTM_KEYS.length; i++) {
      var value = params && params[UTM_KEYS[i]];
      if (safeValue(value)) kept.push(encodeURIComponent(UTM_KEYS[i]) + '=' + encodeURIComponent(value));
    }
    if (params && CLICK_RE.test(String(params.fbclid || ''))) {
      kept.push('fbclid=' + encodeURIComponent(params.fbclid));
    }
    return origin + pathname + (kept.length ? '?' + kept.join('&') : '');
  }

  // Pure capture step. Fresh campaign values replace old ones; missing values
  // retain the last legitimate first-party capture.
  function captureSnapshot(search, rawCookies, stored, now, locationLike) {
    var fresh = parse(search);
    var cookies = parseCookies(rawCookies);
    var result = {};
    var previous = stored && typeof stored === 'object' ? stored : {};

    for (var i = 0; i < UTM_KEYS.length; i++) {
      var key = UTM_KEYS[i];
      var value = fresh[key] || previous[key];
      if (safeValue(value)) result[key] = value;
    }

    var fbclid = fresh.fbclid || previous.fbclid;
    if (CLICK_RE.test(String(fbclid || ''))) result.fbclid = fbclid;

    var currentFbp = validFbp(cookies._fbp) ? cookies._fbp : '';
    var currentFbc = validFbc(cookies._fbc) ? cookies._fbc : '';
    if (currentFbp || validFbp(previous.fbp)) result.fbp = currentFbp || previous.fbp;

    if (fresh.fbclid) {
      // A new real click supersedes a stale _fbc from an older click.
      var suffix = '.' + fresh.fbclid;
      result.fbc = currentFbc.slice(-suffix.length) === suffix
        ? currentFbc
        : makeFbc(fresh.fbclid, now);
    } else if (currentFbc || validFbc(previous.fbc)) {
      result.fbc = currentFbc || previous.fbc;
    }

    var hasFreshCampaign = !!fresh.fbclid;
    for (var j = 0; j < UTM_KEYS.length; j++) hasFreshCampaign = hasFreshCampaign || !!fresh[UTM_KEYS[j]];
    result.source_url = hasFreshCampaign
      ? sourceUrl(locationLike, fresh)
      : (safeValue(previous.source_url) ? previous.source_url : sourceUrl(locationLike, result));
    result.captured_at_ms = hasFreshCampaign ? Math.floor(Number(now)) : Number(previous.captured_at_ms || now);
    return result;
  }

  function readStored() {
    if (typeof document === 'undefined') return null;
    var cookies = parseCookies(document.cookie);
    if (!cookies[COOKIE]) return null;
    try {
      var value = JSON.parse(cookies[COOKIE]);
      return value && typeof value === 'object' ? value : null;
    } catch (err) {
      return null;
    }
  }

  function writeCookie(name, value) {
    if (typeof document === 'undefined') return false;
    var secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; Max-Age=' + MAX_AGE_SECONDS + '; Path=/; SameSite=Lax' + secure;
    return true;
  }

  function remember() {
    if (typeof document === 'undefined' || typeof location === 'undefined') return null;
    var snapshot = captureSnapshot(location.search, document.cookie, readStored(), Date.now(), location);
    try {
      writeCookie(COOKIE, JSON.stringify(snapshot));
      var fresh = parse(location.search);
      if (fresh.fbclid && snapshot.fbc) writeCookie('_fbc', snapshot.fbc);
    } catch (err) {
      return snapshot;
    }
    return snapshot;
  }

  function newEventId(cryptoLike) {
    var c = cryptoLike || (typeof crypto !== 'undefined' ? crypto : null);
    if (c && typeof c.randomUUID === 'function') return c.randomUUID();
    if (c && typeof c.getRandomValues === 'function') {
      var bytes = new Uint8Array(16);
      c.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 15) | 64;
      bytes[8] = (bytes[8] & 63) | 128;
      var hex = [];
      for (var i = 0; i < bytes.length; i++) hex.push((bytes[i] + 256).toString(16).slice(1));
      return hex.slice(0, 4).join('') + '-' + hex.slice(4, 6).join('') + '-' +
        hex.slice(6, 8).join('') + '-' + hex.slice(8, 10).join('') + '-' + hex.slice(10).join('');
    }
    return '';
  }

  // RevenueCat Web Purchase Links automatically place the five standard UTMs
  // in webhook metadata. The reversible ogc_ prefix carries the checkout UUID
  // without discarding the original utm_content value.
  function appendToCheckoutUrl(rawUrl, record, checkoutId) {
    if (!rawUrl || !UUID_RE.test(String(checkoutId || ''))) return null;
    var url;
    try {
      url = new URL(rawUrl);
    } catch (err) {
      return null;
    }
    var data = record || {};
    for (var i = 0; i < UTM_KEYS.length; i++) {
      var key = UTM_KEYS[i];
      if (key === 'utm_content' || !safeValue(data[key])) continue;
      url.searchParams.set(key, data[key]);
    }
    var originalContent = safeValue(data.utm_content) ? data.utm_content : '';
    url.searchParams.set('utm_content', 'ogc_' + checkoutId + (originalContent ? '~' + originalContent : ''));
    if (CLICK_RE.test(String(data.fbclid || ''))) url.searchParams.set('fbclid', data.fbclid);
    return url.toString();
  }

  function checkoutIdFromContent(value) {
    if (typeof value !== 'string') return '';
    var match = /^ogc_([0-9a-f-]{36})(?:~|$)/i.exec(value);
    return match && UUID_RE.test(match[1]) ? match[1].toLowerCase() : '';
  }

  function sendCheckout(endpoint, checkoutId, plan, record) {
    if (!endpoint || !UUID_RE.test(String(checkoutId || '')) ||
        ['annual', 'lifetime'].indexOf(plan) === -1 || typeof fetch !== 'function') {
      return Promise.resolve(false);
    }
    var data = record || {};
    var attribution = {};
    var keys = UTM_KEYS.concat(['fbclid', 'fbp', 'fbc']);
    for (var i = 0; i < keys.length; i++) {
      if (safeValue(data[keys[i]])) attribution[keys[i]] = data[keys[i]];
    }
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      keepalive: true,
      body: JSON.stringify({
        checkout_id: checkoutId,
        plan: plan,
        source_url: safeValue(data.source_url) ? data.source_url : '',
        attribution: attribution,
      }),
    }).then(function (response) {
      return response.ok;
    }).catch(function () {
      return false;
    });
  }

  return {
    parse: parse,
    parseCookies: parseCookies,
    validFbp: validFbp,
    validFbc: validFbc,
    makeFbc: makeFbc,
    captureSnapshot: captureSnapshot,
    sourceUrl: sourceUrl,
    read: readStored,
    remember: remember,
    newEventId: newEventId,
    appendToCheckoutUrl: appendToCheckoutUrl,
    checkoutIdFromContent: checkoutIdFromContent,
    sendCheckout: sendCheckout,
  };
});
