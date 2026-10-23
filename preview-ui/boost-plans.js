// Planned Boost plans, shared by /boost/ and /pro/ until Boost has a checkout. Boost time is billed by the
// millisecond of model work; every plan includes Pro.
export const BOOST_PLANS = [
  { id: '19.99', price: 19.99, minutes: 300 },
  { id: '49.99', price: 49.99, minutes: 900 },
  { id: '99.99', price: 99.99, minutes: 2100 },
];
export const BOOST_TOPUP = { from: 10, minutes: 150 };
export const boostLabel = (p) => `$${p.price} · ${p.minutes.toLocaleString('en-US')} minutes`;
