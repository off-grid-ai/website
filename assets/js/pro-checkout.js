// Owns the real /pro checkout-button journey. Hero links only scroll to the
// form and are intentionally outside this controller.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ProCheckout = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  function googleDedupeId(plan, email) {
    var h = 5381;
    for (var i = 0; i < email.length; i++) h = ((h << 5) + h + email.charCodeAt(i)) | 0;
    return plan + '-' + (h >>> 0).toString(36);
  }

  function checkoutPayload(plan, values, productIds, eventId, sourceUrl) {
    if (['annual', 'lifetime'].indexOf(plan) === -1) return null;
    var value = Number(values[plan]);
    if (!isFinite(value) || value <= 0 || !productIds[plan] || !eventId) return null;
    return {
      name: 'InitiateCheckout',
      eventId: eventId,
      data: {
        value: value,
        currency: 'USD',
        content_type: 'product',
        content_ids: [productIds[plan]],
        content_name: plan,
        event_source_url: sourceUrl,
      },
    };
  }

  function mount(config, supplied) {
    var deps = supplied || {};
    var doc = deps.document || (typeof document !== 'undefined' ? document : null);
    var win = deps.window || (typeof window !== 'undefined' ? window : null);
    if (!doc || !win) return false;

    var linkBuilder = deps.RevenueCatLink || win.RevenueCatLink;
    var checkoutPlan = deps.CheckoutPlan || win.CheckoutPlan;
    var attribution = deps.MetaAttribution || win.MetaAttribution;
    var meta = deps.OffGridMeta || win.OffGridMeta;
    var posthogClient = deps.posthog || win.posthog;
    var google = deps.gtag || win.gtag;
    var openWindow = deps.open || function (url) { return win.open(url, '_blank'); };
    var form = doc.getElementById('payForm');
    var emailInput = doc.getElementById('payEmail');
    var status = doc.getElementById('payStatus');
    var buttons = form ? form.querySelectorAll('button[data-plan]') : [];
    if (!form || !emailInput || !status || !linkBuilder || !attribution) return false;

    function eachButton(fn) {
      for (var i = 0; i < buttons.length; i++) fn(buttons[i]);
    }

    function setEnabled() {
      var ok = emailInput.value.trim() !== '';
      eachButton(function (button) { button.disabled = !ok; });
    }

    function clearError() {
      emailInput.classList.remove('ea-input-error');
      emailInput.setAttribute('aria-invalid', 'false');
      if (status.classList.contains('ea-status-error')) {
        status.textContent = '';
        status.className = 'ea-status';
      }
    }

    function showError(message) {
      emailInput.classList.add('ea-input-error');
      emailInput.setAttribute('aria-invalid', 'true');
      status.textContent = message;
      status.className = 'ea-status ea-status-error';
    }

    function capturePostHog(name, properties) {
      if (!posthogClient || typeof posthogClient.capture !== 'function') return;
      try { posthogClient.capture(name, properties); } catch (err) { /* no-op */ }
    }

    var emailReported = false;
    emailInput.addEventListener('input', function () {
      setEnabled();
      clearError();
      if (!emailReported && emailInput.value.trim()) {
        emailReported = true;
        capturePostHog('pro_email_entered', { source: win.location.pathname });
      }
    });
    setEnabled();

    if (typeof win.IntersectionObserver === 'function') {
      var formReported = false;
      var observer = new win.IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting || formReported) continue;
          formReported = true;
          capturePostHog('pro_buy_form_viewed', { source: win.location.pathname });
          observer.disconnect();
        }
      }, { threshold: 0.4 });
      observer.observe(form);
    }

    eachButton(function (button) {
      button.addEventListener('click', function () {
        var plan = button.getAttribute('data-plan');
        var email = emailInput.value.trim().toLowerCase();
        if (!linkBuilder.isValidEmail(email)) {
          showError('Enter a valid email address.');
          emailInput.focus();
          return;
        }
        if (!config.links[plan] || !config.values[plan]) {
          showError('Checkout is not available right now. Please try again later.');
          return;
        }

        var checkoutId = attribution.newEventId();
        if (!checkoutId) {
          showError('Checkout is not available right now. Please try again later.');
          return;
        }
        var record = attribution.remember() || {};
        var rawUrl = linkBuilder.buildPurchaseUrl(config.links[plan], email);
        var url = attribution.appendToCheckoutUrl(rawUrl, record, checkoutId);
        if (!url) {
          showError('Checkout is not available right now. Please try again later.');
          return;
        }

        var source = win.location.origin + win.location.pathname;
        var event = checkoutPayload(plan, config.values, config.productIds, checkoutId, source);
        if (!event) {
          showError('Checkout is not available right now. Please try again later.');
          return;
        }
        if (meta && typeof meta.track === 'function') {
          meta.track(event.name, event.data, event.eventId);
        }
        capturePostHog('pro_checkout_started', {
          plan: plan,
          value: event.data.value,
          currency: 'USD',
          checkout_id: checkoutId,
          source: win.location.pathname,
        });
        if (checkoutPlan) checkoutPlan.remember(plan, event.data.value, checkoutId);
        attribution.sendCheckout(config.attributionEndpoint, checkoutId, plan, record);

        if (config.googleEnabled && typeof google === 'function') {
          try {
            google('event', 'conversion', {
              send_to: config.googleSendTo,
              value: event.data.value,
              currency: 'USD',
              transaction_id: googleDedupeId(plan, email),
            });
          } catch (err) { /* no-op */ }
        }

        status.textContent = 'Checkout opened in a new tab. ';
        var reopen = doc.createElement('a');
        reopen.href = url;
        reopen.target = '_blank';
        reopen.rel = 'noopener';
        reopen.textContent = 'Reopen it';
        status.appendChild(reopen);
        status.appendChild(doc.createTextNode(' if your browser blocked the popup.'));
        status.className = 'ea-status ea-status-success';
        openWindow(url);
      });
    });
    return true;
  }

  return { mount: mount, checkoutPayload: checkoutPayload, googleDedupeId: googleDedupeId };
});
