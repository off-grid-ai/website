// Off Grid AI Pro with Boost: every Pro feature plus Boost minutes each month, in three sizes, paid monthly or
// yearly (two months free). The plan ids are the ones the license worker sells (license-worker src/boost.ts).
export const PRO_SIZES = [
  { minutes: 300, monthly: 19.99, yearly: 199 },
  { minutes: 900, monthly: 49.99, yearly: 499 },
  { minutes: 2100, monthly: 99.99, yearly: 999 },
];
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
