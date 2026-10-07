// The /thank-you/ purchase reporting script, verbatim from the old thank-you.md (Liquid values now come
// from thank-you.data.mjs). It is server-rendered as a plain inline <script> so it runs at the same
// point as before: during parsing, after the head scrubber, gtag and the Meta Pixel, before the PostHog
// snippet and before React. Only the last block changed: instead of writing the redemption link into
// the DOM it hands the validated URL to the page, which renders it (see thank-you.jsx).
const J = (v) => JSON.stringify(v).replace(/</g, '\\u003c');
export function purchaseScript(pricing, p) {
  return String.raw`
  (function () {
    // Browser checkout-return signal. This page cannot verify payment with
    // RevenueCat. Require a return ID and a known plan before reporting it.
    // The earlier checkout-CLICK
    // action fires on /pro - see the google_ads_* block in _config.yml.
    var SEND_TO = ${J(p.adsId)} + '/' + ${J(p.adsLabel)};
    var ENABLED = ${J(p.adsLabel)} !== '';

    // Report the configured price shown by the buy buttons. This is not a
    // verified amount after discounts or tax. A ?plan= on the
    // redirect URL wins when one is configured; otherwise the plan comes from
    // the cookie the buy button wrote (RevenueCat's redirect carries only
    // app_user_id). With no known plan, no purchase conversion is sent.
    var PLAN_VALUES = {
      monthly: ${Number(pricing.monthly)},
      lifetime: ${Number(pricing.lifetime)},
      ogap: ${Number(p.ogapPrice)}
    };

    // ------------------------------------------------------------ pure

    function param(search, name) {
      if (typeof search !== 'string') return '';
      var query = search.charAt(0) === '?' ? search.slice(1) : search;
      // Split on '?' as well as '&': RevenueCat appends app_user_id to the
      // success URL, and a second '?' would otherwise swallow the plan.
      var pairs = query.split(/[&?]/);
      for (var i = 0; i < pairs.length; i++) {
        var eq = pairs[i].indexOf('=');
        if (eq < 1 || pairs[i].slice(0, eq) !== name) continue;
        try {
          return decodeURIComponent(pairs[i].slice(eq + 1).replace(/\+/g, ' '));
        } catch (err) {
          return '';
        }
      }
      return '';
    }

    // Our App User ID is the buyer's email, so hash it - the raw address never
    // goes to Google from here. Same djb2 as the /pro checkout event.
    function hash(value) {
      var h = 5381;
      for (var i = 0; i < value.length; i++) {
        h = ((h << 5) + h + value.charCodeAt(i)) | 0;
      }
      return (h >>> 0).toString(36);
    }

    // Stable per buyer+plan, so a reload or a back-button return reports ONE
    // purchase - Google Ads dedups on transaction_id. Empty when RevenueCat
    // sent no app_user_id, in which case the session guard below does the work.
    function transactionId(plan, appUserId) {
      if (!appUserId) return '';
      return (plan || 'pro') + '-' + hash(appUserId);
    }

    // Only RevenueCat's own redemption link may be rendered as a button - the
    // value arrives in the URL, so anything else is somebody else's link.
    function safeRedeemUrl(raw) {
      if (!raw || raw.slice(0, 8) !== 'https://') return '';
      var host = raw.slice(8).split(/[/?#]/)[0].toLowerCase();
      var ok = host === 'revenuecat.com' || host.slice(-15) === '.revenuecat.com';
      return ok ? raw : '';
    }

    // ------------------------------------------------------------- I/O

    // The head scrubber strips app_user_id and redeem_url from the address
    // bar before any vendor snippet runs, and stashes the original query in
    // OG_QUERY for us. location.search is only the fallback for the scrubber
    // somehow not having run.
    var search = typeof window.OG_QUERY === 'string' ? window.OG_QUERY : location.search;

    // What the buyer picked, in order of trust: the redirect URL, then the
    // cookie the buy button wrote on the way out.
    var picked = window.CheckoutPlan ? CheckoutPlan.read() : null;
    var queryPlan = param(search, 'plan');
    var plan = PLAN_VALUES[queryPlan] ? queryPlan : (picked ? picked.plan : queryPlan);
    var value = PLAN_VALUES[queryPlan] || (picked ? picked.value : 0);
    var appUserId = param(search, 'app_user_id');
    var txnId = transactionId(plan, appUserId);

    // A reload must not count twice. Keyed on the buyer alone, never on the
    // plan: the plan cookie is spent on the first load, so a plan-keyed guard
    // would let the reload through under a second transaction_id and report the
    // same sale twice. sessionStorage is per tab, so a genuine second purchase
    // opens with a clean guard.
    function alreadyFired(key) {
      try {
        if (sessionStorage.getItem(key)) return true;
        sessionStorage.setItem(key, '1');
      } catch (err) {
        /* Private mode or storage disabled: fall back to transaction_id. */
      }
      return false;
    }

    var guardKey = 'og_purchase_' + (appUserId ? hash(appUserId) : 'anon');
    var checkoutReturn = appUserId !== '' && Boolean(PLAN_VALUES[plan]) && value > 0;
    // Reuse the existing per-tab purchase guard for all browser vendors.
    var purchaseAlreadyFired = checkoutReturn && alreadyFired(guardKey);

    if (checkoutReturn && !purchaseAlreadyFired && ENABLED && typeof gtag === 'function') {
      var payload = { send_to: SEND_TO };
      if (value > 0) {
        payload.value = value;
        payload.currency = 'USD';
      }
      if (txnId) payload.transaction_id = txnId;
      // Never let an analytics failure (blocked, errored) break the page the
      // buyer lands on straight after paying.
      try {
        gtag('event', 'conversion', payload);
      } catch (err) {
        console.warn('Google Ads conversion failed:', err);
      }
    }

    // Meta Pixel "Purchase". A bare visit to this page fires nothing.
    // Require checkout-return details and the selected plan;
    // these browser values do not verify that a payment settled.
    // AND the plan must resolve to lifetime Pro with its real price.
    // Monthly is sent by the RevenueCat webhook Worker with the event ID; its
    // browser ID differs, so firing both would double-count that purchase.
    // The OGAP pre-order is deliberately excluded.
    // The payload is value/currency/plan only - the buyer's email never goes
    // to Meta: the head scrubber removed app_user_id from the URL the pixel
    // sees, and here it is only hashed into the guard key and the eventID.
    var FB_PLANS = { lifetime: true };
    var fbEvidence = checkoutReturn;
    var fbGuardKey = 'og_fb_purchase_' + (appUserId ? hash(appUserId) : 'anon');
    if (fbEvidence && !purchaseAlreadyFired && FB_PLANS[plan] && value > 0 &&
        typeof fbq === 'function' && !alreadyFired(fbGuardKey)) {
      try {
        // txnId is stable per buyer+plan, so Meta also dedups a return visit
        // that outlives this tab's sessionStorage guard (and a future CAPI
        // event for the same sale).
        fbq('track', 'Purchase',
          { value: value, currency: 'USD', content_name: plan },
          txnId ? { eventID: txnId } : undefined);
      } catch (err) {
        console.warn('Meta Purchase failed:', err);
      }
    }

    // The PostHog snippet lives at the END of the layout, thousands of bytes
    // after this script, so 'posthog' does NOT exist yet on a page like this
    // one that reports at load time rather than from a click handler. Firing
    // straight away silently dropped every purchase event; wait for the
    // snippet instead. Give up after ~10s so a blocked loader costs nothing.
    function capturePurchase() {
      if (!checkoutReturn || purchaseAlreadyFired || (plan !== 'monthly' && plan !== 'lifetime')) return true;
      if (typeof posthog === 'undefined') return false;
      try {
        // RevenueCat redirects here with app_user_id set to the buyer's email,
        // the same id /pro identifies on. Claiming it again attaches the sale
        // to the visits that led to it even when checkout finished in another
        // tab. Anything that is not an email (an anonymous store id) is left
        // alone.
        if (appUserId && appUserId.indexOf('@') > 0) {
          posthog.identify(appUserId, { email: appUserId });
        }
        posthog.capture('pro_purchase_completed', {
          plan: plan,
          value: value
        });
      } catch (err) {
        console.warn('PostHog tracking failed:', err);
      }
      return true;
    }

    if (!capturePurchase()) {
      var phTries = 0;
      var phTimer = setInterval(function () {
        if (capturePurchase() || ++phTries > 100) clearInterval(phTimer);
      }, 100);
    }

    // One purchase, one use of that cookie.
    if (picked && window.CheckoutPlan) CheckoutPlan.clear();

    // RevenueCat's own success page offers the redemption link when redemption
    // is enabled; we redirect past that page, so offer it here instead. The
    // page (React) renders the link into #redeemSlot from this value, so the
    // markup React hydrates is never changed under it.
    window.OG_REDEEM_URL = safeRedeemUrl(param(search, 'redeem_url'));
  })();
`;
}
