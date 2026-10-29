import { useEffect, useState } from 'react';
import { loadPricing, lifetimePrice, currentPricing } from '../assets/js/pro-pricing.js';

// React adapter for the same helper used by the Liquid layouts. With Stripe the prices are the site's own, known at
// render time, so the page is built with them and the buy buttons work from the first paint: no "$..." placeholder,
// no wait.
export function usePricing(initialPricing) {
  const stripe = initialPricing.checkout_provider === 'stripe';
  const [result, setResult] = useState(() => (stripe ? currentPricing(initialPricing) : null));
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (stripe) return;
    let active = true;
    loadPricing(initialPricing)
      .then(value => { if (active) setResult(value); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [initialPricing]);
  return {
    pricing: result?.pricing ?? { ...initialPricing, lifetime: lifetimePrice({ ...initialPricing, lifetime: '...' }), monthly: '...' },
    count: result?.count ?? null,
    tier: result?.tier ?? null,
    failed,
    ready: result !== null,
  };
}
