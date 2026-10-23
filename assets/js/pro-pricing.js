// One count request per page, using the existing count worker and pricing data.
// The final ladder tier has no purchase links yet; checkout has two cohorts.
const counts = new Map();

export function lifetimePrice(pricing) {
  const offer = pricing.lifetime_offer;
  return offer?.enabled
    ? Math.round((offer.original_price - offer.amount_off) * 100) / 100
    : pricing.lifetime;
}

// A local preview (127.0.0.1 or localhost) talks to the license worker running locally in Stripe test mode
// (`npx wrangler dev --port 8799` in license-worker); the live worker only answers the live site.
const LOCAL_STRIPE_ENDPOINT = 'http://127.0.0.1:8799/stripe';
const isLocal = () => typeof location !== 'undefined' && /^(127\.0\.0\.1|localhost)$/.test(location.hostname);

export function loadPricing(pricing) {
  if (pricing.checkout_provider === 'stripe') {
    const endpoint = isLocal() ? LOCAL_STRIPE_ENDPOINT : pricing.stripe_endpoint;
    return fetch(`${endpoint}/pricing`, { signal: AbortSignal.timeout(8000) })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Pricing unavailable')))
      .then(current => {
        if (!Number.isFinite(current.lifetime) || !Number.isFinite(current.monthly) || current.lifetime <= 0 || current.monthly <= 0) throw new Error('Invalid pricing');
        return { count: null, tier: null, pricing: { ...pricing, ...current, stripe_endpoint: endpoint } };
      });
  }
  const endpoint = pricing.count_endpoint;
  if (!endpoint) return Promise.reject(new Error('Customer count endpoint missing'));
  if (!counts.has(endpoint)) {
    counts.set(endpoint, new Promise((resolve, reject) => {
      const controller = typeof AbortController === 'function' ? new AbortController() : null;
      const timeout = setTimeout(() => {
        if (controller) controller.abort();
        reject(new Error('Customer count request timed out'));
      }, 8000);
      fetch(endpoint, controller ? { signal: controller.signal } : undefined)
        .then(r => r.ok ? r.json() : Promise.reject(new Error('Customer count unavailable')))
        .then(d => {
          if (!Number.isInteger(d.count) || d.count < 0) throw new Error('Invalid customer count');
          resolve(d.count);
        })
        .catch(reject)
        .then(() => clearTimeout(timeout));
    }));
  }
  return counts.get(endpoint).then(count => {
    const tier = count >= pricing.tiers[0].until ? 1 : 0;
    return {
      count,
      tier,
      pricing: { ...pricing, lifetime: lifetimePrice({ ...pricing, lifetime: pricing.tiers[tier].lifetime }), monthly: pricing.tiers[tier].monthly },
    };
  });
}
