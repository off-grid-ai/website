// Pro monthly: every Pro feature plus Boost minutes each month, billed by the millisecond of model work.
// Pro lifetime has no Boost minutes; anyone can add them with a top-up. Shared by /pro, /boost and the
// product pages until Pro monthly has a checkout.
export const PRO_MONTHLY = [
  { id: 'pro-300', price: 19.99, minutes: 300 },
  { id: 'pro-900', price: 49.99, minutes: 900 },
  { id: 'pro-2100', price: 99.99, minutes: 2100 },
];
// Pro monthly sells now at a founding price; Boost minutes start at launch. Each month paid before launch banks
// that month's minutes (up to BANK_MONTHS of them), and the price stays locked while the subscription lasts.
export const BOOST_LAUNCH = 'January 2027';
export const BANK_MONTHS = 3;
// The Pro-only monthly price; if Boost slips past launch, founding subscribers get back what they paid above it.
export const PRO_ONLY_MONTHLY = 7.99;
export const BOOST_TOPUP = { from: 10, minutes: 150 };
export const MONTHLY_FROM = PRO_MONTHLY[0].price;
export const minutesLabel = (p) => `${p.minutes.toLocaleString('en-US')} Boost minutes`;
export const monthlyLabel = (p) => `$${p.price}/month · ${minutesLabel(p)}`;
