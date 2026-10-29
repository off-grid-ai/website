// One count request per page, using the existing count worker and pricing data.
// The final ladder tier has no purchase links yet; checkout has two cohorts.
const counts = new Map();

export function lifetimePrice(pricing) {
  const offer = pricing.lifetime_offer;
  return offer?.enabled
    ? Math.round((offer.original_price - offer.amount_off) * 100) / 100
    : pricing.lifetime;
}

// With Stripe the site's own prices are the prices: nothing is fetched. Fetching them from the Worker and then a
// customer count kept every buy button off for 1-1.5 s on each visit, and the count stopped moving when checkout
// left RevenueCat. The Worker checks Stripe against these before every checkout.
export function currentPricing(pricing) {
  return { count: null, tier: null, pricing: { ...pricing, lifetime: lifetimePrice(pricing), monthly: pricing.monthly } };
}

export function loadPricing(pricing) {
  if (pricing.checkout_provider === 'stripe') return Promise.resolve(currentPricing(pricing));
  return customerCount(pricing).then(count => {
    const tier = count >= pricing.tiers[0].until ? 1 : 0;
    return {
      count,
      tier,
      pricing: { ...pricing, lifetime: lifetimePrice({ ...pricing, lifetime: pricing.tiers[tier].lifetime }), monthly: pricing.tiers[tier].monthly },
    };
  });
}

// One count request per endpoint, shared by every caller on the page.
function customerCount(pricing) {
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
  return counts.get(endpoint);
}
