const test = require('node:test');
const assert = require('node:assert/strict');

const RevenueCatLink = require('../assets/js/revenuecat-link.js');

test('OGAP checkout keeps the customer identity and selects the hardware package', () => {
  const url = RevenueCatLink.buildPurchaseUrl(
    'mvayfyykkdodnvxw',
    'Existing.Pro+buyer@example.com',
    { packageId: 'pkgeb8bddbc1f9' },
  );
  const parsed = new URL(url);

  assert.equal(parsed.origin, 'https://pay.rev.cat');
  assert.equal(
    decodeURIComponent(parsed.pathname),
    '/mvayfyykkdodnvxw/Existing.Pro+buyer@example.com',
  );
  assert.equal(parsed.searchParams.get('email'), 'Existing.Pro+buyer@example.com');
  assert.equal(parsed.searchParams.get('package_id'), 'pkgeb8bddbc1f9');
});

test('a package cannot be selected without a valid customer email', () => {
  assert.equal(
    RevenueCatLink.buildPurchaseUrl('mvayfyykkdodnvxw', 'invalid', {
      packageId: 'pkgeb8bddbc1f9',
    }),
    null,
  );
});
