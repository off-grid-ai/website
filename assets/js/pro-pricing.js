// One count request per page, using the existing count worker and pricing data.
// The final ladder tier has no purchase links yet; checkout has two cohorts.
const counts = new Map();

export function loadPricing(pricing) {
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
      pricing: { ...pricing, lifetime: pricing.tiers[tier].lifetime, monthly: pricing.tiers[tier].monthly },
    };
  });
}
