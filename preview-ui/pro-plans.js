// Off Grid AI Pro with Boost: every Pro feature plus Boost minutes each month, in three sizes, paid monthly or
// yearly (two months free). The plan ids are the ones the license worker sells (license-worker src/boost.ts).
// Every plan has every Pro feature; the sizes differ only in Boost minutes.
export const PRO_SIZES = [
  { name: 'Pro', minutes: 300, monthly: 19.99, yearly: 199, for: 'Everything Pro does, on your phone and computer.' },
  { name: 'Pro Plus', minutes: 900, monthly: 49.99, yearly: 499, for: 'For people who run big models every day.', recommended: true },
  { name: 'Pro Max', minutes: 2100, monthly: 99.99, yearly: 999, for: 'For heavy use: voice, video and long jobs.' },
];
export const yearlySaving = (size) => Math.round((size.monthly * 12 - size.yearly) * 100) / 100;
export const planId = (size, yearly) => `pro-${size.minutes}${yearly ? '-yearly' : ''}`;
export const MONTHLY_FROM = PRO_SIZES[0].monthly;
export const YEARLY_FROM = PRO_SIZES[0].yearly;
export const minutesText = (size) => `${size.minutes.toLocaleString('en-US')} Boost minutes a month`;

// Founding price: Pro starts today and Boost goes live at launch. Each month paid before then banks its minutes,
// up to BANK_MONTHS of them. If launch slips, subscribers get back what they paid above the Pro-only price.
export const BOOST_LAUNCH = 'January 2027';
export const BANK_MONTHS = 3;
export const PRO_ONLY_MONTHLY = 7.99;
export const BOOST_TOPUP = { from: 10, minutes: 150 };
