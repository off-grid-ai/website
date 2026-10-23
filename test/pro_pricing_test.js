import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import { parse } from 'yaml';
import { loadPricing, lifetimePrice } from '../assets/js/pro-pricing.js';

const pricing = parse(await readFile(new URL('../_data/pricing.yml', import.meta.url), 'utf8'));
const config = parse(await readFile(new URL('../_config.yml', import.meta.url), 'utf8'));

test('pricing follows the count boundary and rejects unavailable or invalid counts', async t => {
  const legacyPricing = { ...pricing, checkout_provider: 'revenuecat' };
  // Contract-faithful fake of the external count API, using real HTTP requests.
  const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/unavailable') { res.writeHead(502); res.end('{"error":"upstream_unavailable"}'); return; }
    res.end(JSON.stringify({ count: req.url === '/invalid' ? -1 : Number(req.url.slice(1)), updated: new Date().toISOString() }));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const endpoint = `http://127.0.0.1:${server.address().port}`;
  for (const [count, lifetime, monthly, tier] of [[1499, 69, 4.99, 0], [1500, 119, 7.99, 1], [6500, 119, 7.99, 1]]) {
    const result = await loadPricing({ ...legacyPricing, lifetime_offer: { ...pricing.lifetime_offer, enabled: false }, count_endpoint: `${endpoint}/${count}` });
    assert.equal(result.count, count);
    assert.equal(result.pricing.lifetime, lifetime);
    assert.equal(result.pricing.monthly, monthly);
    assert.equal(result.tier, tier);
    const offerResult = await loadPricing({ ...legacyPricing, lifetime_offer: { ...pricing.lifetime_offer, enabled: true }, count_endpoint: `${endpoint}/${count}` });
    assert.equal(offerResult.pricing.lifetime, 79.99);
    assert.equal(offerResult.pricing.monthly, monthly);
    assert.equal(offerResult.tier, tier);
  }
  await assert.rejects(loadPricing({ ...legacyPricing, count_endpoint: `${endpoint}/invalid` }));
  await assert.rejects(loadPricing({ ...legacyPricing, count_endpoint: `${endpoint}/unavailable` }));
});

test('the lifetime offer is available before the count loads and can be disabled', () => {
  assert.equal(lifetimePrice({ ...pricing, lifetime: '...', lifetime_offer: { ...pricing.lifetime_offer, enabled: true } }), 79.99);
  assert.equal(lifetimePrice({ lifetime: 119 }), 119);
  assert.equal(lifetimePrice({ ...pricing, lifetime: 119, lifetime_offer: { ...pricing.lifetime_offer, enabled: false } }), 119);
});

test('old and new purchase links retain the encoded email user ID', async () => {
  const context = { module: { exports: {} } };
  runInNewContext(await readFile(new URL('../assets/js/revenuecat-link.js', import.meta.url), 'utf8'), context);
  const email = 'buyer+pro@example.com';
  for (const [key, token] of [
    ['revenuecat_link_lifetime', 'avvnmcnfsgbmjaee'],
    ['revenuecat_link_monthly', 'dqcncujvkiumpwhk'],
    ['revenuecat_link_lifetime_119', 'qojryhrzrjfaihnq'],
    ['revenuecat_link_monthly_799', 'ttzwavolonbvapek'],
  ]) {
    assert.equal(context.module.exports.buildPurchaseUrl(config[key], email),
      `https://pay.rev.cat/${token}/buyer%2Bpro%40example.com?email=buyer%2Bpro%40example.com`);
  }
});

test('Stripe pricing works without a RevenueCat count and fails closed', async t => {
  const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url !== '/stripe/pricing') { res.writeHead(503); res.end('{}'); return; }
    res.end(JSON.stringify({ lifetime: 79.99, monthly: 7.99, lifetime_offer: { enabled: true, original_price: 119, amount_off: 39.01 } }));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const endpoint = `http://127.0.0.1:${server.address().port}`;
  const result = await loadPricing({ ...pricing, checkout_provider: 'stripe', stripe_endpoint: `${endpoint}/stripe`, count_endpoint: `${endpoint}/unavailable` });
  assert.equal(result.pricing.lifetime, 79.99);
  assert.equal(result.pricing.monthly, 7.99);
  assert.equal(result.count, null);
  await assert.rejects(loadPricing({ ...pricing, checkout_provider: 'stripe', stripe_endpoint: `${endpoint}/unavailable` }));
});
