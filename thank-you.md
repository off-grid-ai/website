---
layout: default
title: Thank you
permalink: /thank-you/
sitemap: false
description: Your Off Grid AI Pro purchase is complete. Your license key is on its way to your inbox - one key for your laptop and your phone.
---

<div class="early-access-hero">
  <div class="early-access-badge">Payment complete</div>
  <h1>You're in. Your key<br>is on its way.</h1>
  <p class="early-access-sub">Your Off Grid AI Pro license key is landing in the inbox you paid with, usually inside a minute. One key unlocks your laptop and your phone - up to {{ site.data.pricing.devices }} devices - and everything it sees stays on them. There is no server to send it to.</p>
</div>

<div class="hero-buttons">
  <a href="{{ '/download/' | relative_url }}" class="btn btn-green">Get the apps</a>
  <a href="{{ '/pro/' | relative_url }}" class="btn btn-outline">See everything Pro does</a>
</div>

<p class="ea-status" id="redeemSlot" hidden></p>

<script src="{{ '/assets/js/checkout-plan.js' | relative_url }}"></script>
<script src="{{ '/assets/js/purchase-confirmation.js' | relative_url }}"></script>

<div class="offer-closing" role="note">
  <strong>Check your spam folder before you do anything else.</strong> Your key arrives from <strong>keys@offgridmobileai.co</strong>, subject "Your Off Grid AI Pro license key". Filters send a lot of first-time mail there. If you find it in spam or promotions, open it and hit <strong>Not spam</strong> (Gmail) or <strong>Not junk</strong> (Apple Mail, Outlook), and add the address to your contacts. That one tap is what keeps everything that comes after - new releases, device limits, renewal notices, anything you actually need to act on - landing in your inbox instead of a folder you never open.
</div>

---

## What to do next

1. **Find your key, spam folder included.** Search your mail for `keys@offgridmobileai.co`. Mark it **Not spam** the moment you find it there, so the next message reaches you.
2. **Install Off Grid AI** on the machines you actually work on - macOS or Windows for the desktop layer, iPhone or Android for the phone. Both are on the [download page]({{ '/download/' | relative_url }}).
3. **Paste your key** into the app on each device. That is the whole activation - no account, no sign-in.
4. **Turn on capture** when you're ready. It is off until you switch it on, per device, and it shows a recording indicator the entire time it runs.

Still nothing after five minutes, spam checked? Email **support@offgridmobileai.co** from the address you paid with and we'll get your key to you.

<script>
  (function () {
    // RevenueCat's webhook is the payment authority. This page polls the
    // first-party receipt endpoint and reports browser Purchase/PostHog only
    // after that server confirmation exists.
    var SEND_TO = {{ site.google_ads_id | jsonify }} + '/' + {{ site.google_ads_purchase_label | jsonify }};
    var ENABLED = {{ site.google_ads_purchase_label | jsonify }} !== '';

    // These values resolve the selected plan only. The confirmed receipt owns
    // the actual charged value and currency, including discounts.
    var PLAN_VALUES = {
      annual: {{ site.data.pricing.price }},
      lifetime: {{ site.data.pricing.lifetime }},
      ogap: {{ site.data.ogap.price }}
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
    var checkoutId = picked ? picked.checkoutId : '';
    function startPurchaseConfirmation() {
      PurchaseConfirmation.start({
        endpoint: 'https://license.getoffgridai.co/meta/purchase-status',
        checkoutId: checkoutId,
        plan: plan,
        googleSendTo: SEND_TO,
        googleEnabled: ENABLED
      });
    }
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', startPurchaseConfirmation);
    } else {
      startPurchaseConfirmation();
    }

    // One purchase, one use of that cookie.
    if (picked && window.CheckoutPlan) CheckoutPlan.clear();

    // RevenueCat's own success page offers the redemption link when redemption
    // is enabled; we redirect past that page, so offer it here instead.
    var redeem = safeRedeemUrl(param(search, 'redeem_url'));
    var slot = document.getElementById('redeemSlot');
    if (redeem && slot) {
      var link = document.createElement('a');
      link.href = redeem;
      link.rel = 'noopener';
      link.textContent = 'Attach this purchase to your Off Grid AI account';
      slot.appendChild(link);
      slot.hidden = false;
    }
  })();
</script>
