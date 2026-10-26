// The review wall on the homepage. Quotes are verbatim (cuts marked …), picked from 5-star App Store
// and Google Play reviews (Argus: facts.json stores), and from praise in the Slack community and support
// email. Store reviews link to the public listing and show the reviewer's public handle; Slack and
// email quotes carry no name.
export const IOS_URL = 'https://apps.apple.com/us/app/off-grid-ai-private-local-ai/id6759299882';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=ai.offgridmobile';
export const PRODUCT_HUNT_URL = 'https://www.producthunt.com/products/off-grid-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-off-grid-ai';
export const productHuntBadge = (theme) => `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1293302&theme=${theme}`;

// Checkable claims only: each links to where a visitor can see it for themselves.
export const EFF_URL = 'https://www.eff.org/pages/i-want-opt-out-ai-tools-or-training-made-big-tech';

// source: 'ios' | 'android' | 'slack' | 'email'
export const REVIEWS = [
  { source: 'ios', by: 'coreclears', title: 'awesome app', text: 'this is probably the greatest local AI app ive ever used BY FAR. … Pro is 100% worth it imo' },
  { source: 'android', by: 'Nathaniel Boyd', text: "I am updating my review from 3 to 5 stars. … the non-mac desktop app works so that as long as I am at my office or VPN'd to it, the conversations fully auto sync." },
  { source: 'slack', text: 'I really think this is the best local LLM chat app for iOS by far! The huggingface connection is unbeatable!' },
  { source: 'ios', by: 'Gazta', title: 'The best Edge AI for my iPhone XR', text: 'Hosting llama from my MacMini works perfectly ! … this is the only app that seems to allow local Edge AI to work on my 7 year old iPhone XR' },
  { source: 'email', role: 'Doctor, runs medical clinics', text: 'I already paid for your product and think it’s great' },
  { source: 'android', by: 'Jason Schwartzenburg', text: 'Works fantastic, to remotely connect to my PC running ollama, local models!' },
  { source: 'ios', by: 'Keslok', title: 'Works very well', text: 'Insanely good App for it to be completely free' },
  { source: 'slack', text: 'Off grid has become my go to for sure. … The knowledge base is amazing and a personal favorite.' },
  { source: 'ios', by: 'Admiral Tolwyn', title: 'Great app', text: 'It is a really interesting implementation which shows what is possible with an on device LM. The source code is a gold mine as well.' },
  { source: 'ios', by: 'Jivak99', title: 'So good', text: 'Probably the first app I’d go out of my way to tell people to get' },
  { source: 'ios', by: 'ucguy4u', title: 'Clean Local AI. Works Well', text: 'Local AI works fast and feels private because processing stays on device.' },
  { source: 'ios', by: 'Johnnypotato', title: 'Great app!', text: 'This is the one! I deleted the others! Hands down!' },
  { source: 'slack', text: 'I love the remote server option! Works great!' },
  { source: 'ios', by: 'pagecoy', title: 'Works really well', text: 'I’m using an iPhone Xr. Works really well. Starred u guys on github too:)' },
];
