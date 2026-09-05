const test = require('node:test');
const assert = require('node:assert/strict');

const CheckoutPlan = require('../assets/js/checkout-plan.js');
const MetaAttribution = require('../assets/js/meta-attribution.js');
const createMetaPixel = require('../assets/js/meta-pixel.js');
const ProCheckout = require('../assets/js/pro-checkout.js');
const PurchaseConfirmation = require('../assets/js/purchase-confirmation.js');

const CHECKOUT_ID = '018f0f6e-7d7a-4c29-9a79-5cd16f3b89a1';

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  contains(value) { return this.values.has(value); }
}

class FakeElement {
  constructor(attributes = {}) {
    this.attributes = { ...attributes };
    this.listeners = {};
    this.classList = new FakeClassList();
    this.value = '';
    this.disabled = false;
    this.textContent = '';
    this.innerHTML = '';
    this.className = '';
    this.focused = false;
    this.children = [];
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  dispatch(name) { if (this.listeners[name]) this.listeners[name]({ target: this }); }
  getAttribute(name) { return this.attributes[name] || null; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  focus() { this.focused = true; }
  appendChild(child) { this.children.push(child); return child; }
}

function checkoutHarness() {
  const annual = new FakeElement({ 'data-plan': 'annual' });
  const lifetime = new FakeElement({ 'data-plan': 'lifetime' });
  const hero = new FakeElement({ href: '#buy' });
  const form = new FakeElement();
  form.querySelectorAll = () => [lifetime, annual];
  const email = new FakeElement();
  const status = new FakeElement();
  const elements = { payForm: form, payEmail: email, payStatus: status };
  const document = {
    getElementById: id => elements[id] || null,
    createElement: () => new FakeElement(),
    createTextNode: text => ({ textContent: text }),
  };
  const window = { location: { origin: 'https://getoffgridai.co', pathname: '/pro/' } };
  const metaCalls = [];
  const posthogCalls = [];
  const opened = [];
  const remembered = [];
  const attributionCalls = [];
  const deps = {
    document,
    window,
    RevenueCatLink: {
      isValidEmail: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      buildPurchaseUrl: (url, emailValue) => `${url}?app_user_id=${encodeURIComponent(emailValue)}`,
    },
    CheckoutPlan: { remember: (...args) => remembered.push(args) },
    MetaAttribution: {
      newEventId: () => CHECKOUT_ID,
      remember: () => ({ utm_source: 'meta', source_url: 'https://getoffgridai.co/pro/' }),
      appendToCheckoutUrl: (url, record, id) => `${url}&utm_content=ogc_${id}`,
      sendCheckout: (...args) => { attributionCalls.push(args); return Promise.resolve(true); },
    },
    OffGridMeta: { track: (...args) => metaCalls.push(args) },
    posthog: { capture: (...args) => posthogCalls.push(args) },
    open: url => opened.push(url),
  };
  const config = {
    links: {
      annual: 'https://pay.rev.cat/annual',
      lifetime: 'https://pay.rev.cat/lifetime',
    },
    values: { annual: 49, lifetime: 69 },
    productIds: {
      annual: 'offgrid_pro_annual',
      lifetime: 'offgrid_pro_lifetime_69',
    },
    attributionEndpoint: 'https://license.getoffgridai.co/meta/attribution',
    googleEnabled: false,
  };
  return {
    annual, lifetime, hero, form, email, status, deps, config,
    metaCalls, posthogCalls, opened, remembered, attributionCalls,
  };
}

test('checkout values and product ids are plan-specific', () => {
  const values = { annual: 49, lifetime: 69 };
  const products = {
    annual: 'offgrid_pro_annual',
    lifetime: 'offgrid_pro_lifetime_69',
  };
  assert.deepEqual(
    ProCheckout.checkoutPayload('annual', values, products, CHECKOUT_ID, 'https://getoffgridai.co/pro/').data,
    {
      value: 49,
      currency: 'USD',
      content_type: 'product',
      content_ids: ['offgrid_pro_annual'],
      content_name: 'annual',
      event_source_url: 'https://getoffgridai.co/pro/',
    },
  );
  assert.equal(
    ProCheckout.checkoutPayload('lifetime', values, products, CHECKOUT_ID, 'https://getoffgridai.co/pro/').data.value,
    69,
  );
});

test('Meta Pixel queues checkout until its public ID is loaded', () => {
  const root = {};
  const meta = createMetaPixel(root, null);
  meta.track('InitiateCheckout', { value: 69 }, CHECKOUT_ID);
  assert.equal(meta.initialize('3137229433277919'), true);
  assert.deepEqual(root.fbq.queue.map(entry => Array.from(entry)), [
    ['init', '3137229433277919'],
    ['track', 'PageView', {}, undefined],
    ['track', 'InitiateCheckout', { value: 69 }, { eventID: CHECKOUT_ID }],
  ]);
});

test('only a real checkout button reports InitiateCheckout', () => {
  const harness = checkoutHarness();
  assert.equal(ProCheckout.mount(harness.config, harness.deps), true);
  assert.equal(harness.hero.listeners.click, undefined);
  assert.equal(harness.metaCalls.length, 0);

  harness.email.value = 'Buyer@Example.com';
  harness.email.dispatch('input');
  harness.lifetime.dispatch('click');

  assert.deepEqual(harness.metaCalls, [[
    'InitiateCheckout',
    {
      value: 69,
      currency: 'USD',
      content_type: 'product',
      content_ids: ['offgrid_pro_lifetime_69'],
      content_name: 'lifetime',
      event_source_url: 'https://getoffgridai.co/pro/',
    },
    CHECKOUT_ID,
  ]]);
  const checkoutEvent = harness.posthogCalls.find(call => call[0] === 'pro_checkout_started');
  assert.deepEqual(checkoutEvent[1], {
    plan: 'lifetime',
    value: 69,
    currency: 'USD',
    checkout_id: CHECKOUT_ID,
    source: '/pro/',
  });
  assert.equal(JSON.stringify(checkoutEvent).includes('buyer@example.com'), false);
  assert.deepEqual(harness.remembered, [['lifetime', 69, CHECKOUT_ID]]);
  assert.equal(harness.attributionCalls.length, 1);
  assert.equal(harness.opened.length, 1);
});

test('an invalid email sends no checkout event and opens no purchase link', () => {
  const harness = checkoutHarness();
  ProCheckout.mount(harness.config, harness.deps);
  harness.email.value = 'invalid';
  harness.lifetime.dispatch('click');
  assert.equal(harness.metaCalls.length, 0);
  assert.equal(harness.opened.length, 0);
  assert.equal(harness.email.focused, true);
});

test('live attribution creates fbc only from a real URL fbclid', () => {
  const organic = MetaAttribution.captureSnapshot(
    '?utm_source=newsletter',
    '',
    {},
    1770000000000,
    { origin: 'https://getoffgridai.co', pathname: '/pro/' },
  );
  assert.equal(organic.fbc, undefined);

  const paid = MetaAttribution.captureSnapshot(
    '?utm_source=meta&fbclid=real_click_id',
    '_fbp=fb.1.1760000000000.123456789',
    {},
    1770000000000,
    { origin: 'https://getoffgridai.co', pathname: '/pro/' },
  );
  assert.equal(paid.fbp, 'fb.1.1760000000000.123456789');
  assert.equal(paid.fbc, 'fb.1.1770000000000.real_click_id');
});

test('RevenueCat link carries a stable checkout id and preserves campaign content', () => {
  const url = MetaAttribution.appendToCheckoutUrl(
    'https://pay.rev.cat/product',
    { utm_source: 'meta', utm_content: 'own_it_forever', fbclid: 'real_click_id' },
    CHECKOUT_ID,
  );
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get('utm_source'), 'meta');
  assert.equal(parsed.searchParams.get('utm_content'), `ogc_${CHECKOUT_ID}~own_it_forever`);
  assert.equal(parsed.searchParams.get('fbclid'), 'real_click_id');
  assert.equal(MetaAttribution.checkoutIdFromContent(parsed.searchParams.get('utm_content')), CHECKOUT_ID);
});

test('checkout cookie is strict and carries the exact event id', () => {
  assert.equal(CheckoutPlan.serialize('monthly', 4.99, CHECKOUT_ID), null);
  assert.equal(CheckoutPlan.serialize('lifetime', 69, 'invalid'), null);
  assert.deepEqual(
    CheckoutPlan.deserialize(`annual.49.${CHECKOUT_ID}`),
    { plan: 'annual', value: 49, checkoutId: CHECKOUT_ID },
  );
});

function receipt() {
  return {
    confirmed: true,
    checkout_id: CHECKOUT_ID,
    event_id: 'rc_revenuecat-event-1',
    transaction_id: 'revenuecat-transaction-1',
    product_id: 'offgrid_pro_lifetime_69',
    plan: 'lifetime',
    value: 69,
    currency: 'USD',
    event_source_url: 'https://getoffgridai.co/pro/?utm_source=meta',
  };
}

test('an abandoned or direct thank-you visit cannot report Purchase', async () => {
  const metaCalls = [];
  const posthogCalls = [];
  const result = await PurchaseConfirmation.start({
    endpoint: 'https://license.getoffgridai.co/meta/purchase-status',
    checkoutId: CHECKOUT_ID,
    plan: 'lifetime',
  }, {
    fetch: async () => ({ ok: false }),
    delay: async () => {},
    attempts: 2,
    OffGridMeta: { track: (...args) => metaCalls.push(args) },
    posthog: { capture: (...args) => posthogCalls.push(args) },
  });
  assert.equal(result, null);
  assert.equal(metaCalls.length, 0);
  assert.equal(posthogCalls.length, 0);

  let called = false;
  await PurchaseConfirmation.start({ endpoint: 'endpoint', checkoutId: '', plan: 'lifetime' }, {
    fetch: async () => { called = true; return { ok: true, json: async () => receipt() }; },
  });
  assert.equal(called, false);
});

test('a confirmed RevenueCat receipt reports one Purchase with the server event id', async () => {
  const metaCalls = [];
  const posthogCalls = [];
  const values = new Map();
  const storage = {
    getItem: key => values.get(key),
    setItem: (key, value) => values.set(key, value),
  };
  const config = {
    endpoint: 'https://license.getoffgridai.co/meta/purchase-status',
    checkoutId: CHECKOUT_ID,
    plan: 'lifetime',
    googleEnabled: false,
  };
  const deps = {
    fetch: async () => ({ ok: true, json: async () => receipt() }),
    OffGridMeta: { track: (...args) => metaCalls.push(args) },
    posthog: { capture: (...args) => posthogCalls.push(args) },
    storage,
  };
  await PurchaseConfirmation.start(config, deps);
  await PurchaseConfirmation.start(config, deps);

  assert.equal(metaCalls.length, 1);
  assert.equal(metaCalls[0][0], 'Purchase');
  assert.equal(metaCalls[0][2], 'rc_revenuecat-event-1');
  assert.deepEqual(metaCalls[0][1].content_ids, ['offgrid_pro_lifetime_69']);
  assert.deepEqual(posthogCalls, [[
    'pro_purchase_completed',
    { plan: 'lifetime', value: 69, currency: 'USD', checkout_id: CHECKOUT_ID },
  ]]);
});

test('a receipt for another checkout id is rejected', () => {
  assert.equal(
    PurchaseConfirmation.validReceipt(receipt(), 'lifetime', '018f0f6e-7d7a-4c29-9a79-5cd16f3b89a2'),
    false,
  );
});
