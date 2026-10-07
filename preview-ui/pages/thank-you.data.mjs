// /thank-you/ purchase reporting: the values thank-you.md's Liquid used to print into its script
// (site.google_ads_id, site.google_ads_purchase_label, site.data.ogap.price; pricing comes in as data.pricing).
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

export default async function thankYouData() {
  const config = parse(await readFile('_config.yml', 'utf8'));
  const ogap = parse(await readFile('_data/ogap.yml', 'utf8'));
  return {
    purchase: {
      adsId: config.google_ads_id ?? '',
      adsLabel: config.google_ads_purchase_label ?? '',
      ogapPrice: ogap.price,
    },
  };
}
