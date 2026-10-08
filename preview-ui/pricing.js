import { useEffect, useState } from 'react';
import { loadPricing } from '../assets/js/pro-pricing.js';

// React adapter for the same helper used by the Liquid layouts.
export function usePricing(initialPricing) {
  const [result, setResult] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    loadPricing(initialPricing)
      .then(value => { if (active) setResult(value); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [initialPricing]);
  return {
    pricing: result?.pricing ?? { ...initialPricing, lifetime: '...', monthly: '...' },
    count: result?.count ?? null,
    tier: result?.tier ?? null,
    failed,
  };
}
