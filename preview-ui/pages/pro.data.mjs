// Checkout configuration for /pro/: RevenueCat purchase-link tokens and the Google Ads
// "checkout started" conversion, read from _config.yml (the same keys pro.md's Liquid used).
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

export default async function proData() {
  const config = parse(await readFile('_config.yml', 'utf8'));
  return {
    checkout: {
      links: { monthly: config.revenuecat_link_monthly, lifetime: config.revenuecat_link_lifetime },
      adsId: config.google_ads_id || '',
      adsLabel: config.google_ads_conversion_label || '',
    },
  };
}
