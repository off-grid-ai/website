import React from 'react';
import { Badge } from '@offgrid-ui/badge';
import { lifetimePrice } from '../assets/js/pro-pricing.js';

// Product copy and amounts, composed with the shared library's Badge and alive layer.
export function LifetimePrice({ pricing, compact = false }) {
  const offer = pricing.lifetime_offer;
  if (!offer?.enabled) return <span className={compact ? '' : 'price'}><span className="amt">${pricing.lifetime}</span> <small>once</small></span>;
  const price = lifetimePrice(pricing);
  return <span className={`lifetime-offer${compact ? ' lifetime-offer-compact' : ''}`}>
    <Badge variant="outline" className="lifetime-offer-badge">Limited time <span aria-hidden="true">·</span> Save ${offer.amount_off.toFixed(2)}</Badge>
    <span className="lifetime-offer-prices">
      <span className="sr-only">Regular price </span><s>${offer.original_price}</s>
      <span className="sr-only">Offer price </span><strong>${price.toFixed(2)}</strong><small>once</small>
    </span>
    {!compact && <span className="lifetime-offer-detail">Save ${(offer.original_price - price).toFixed(2)}. Yours for life.</span>}
  </span>;
}
