// OGAP price/status (_data/ogap.yml) and the RevenueCat Web Purchase Link token (_config.yml).
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

export default async function ogapData() {
  const ogap = parse(await readFile('_data/ogap.yml', 'utf8'));
  const config = parse(await readFile('_config.yml', 'utf8'));
  return { ogap: { price: ogap.price, status: ogap.status, link: config.revenuecat_link_ogap } };
}
