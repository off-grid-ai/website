// The review wall on the homepage. Every quote is verbatim (cuts marked …, one bracketed gloss).
// Public reviews (App Store, Google Play, Reddit, GitHub) show the author's public handle; quotes
// that were not posted publicly carry no name, only what the person said they do.
export const IOS_URL = 'https://apps.apple.com/us/app/off-grid-ai-private-local-ai/id6759299882';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=ai.offgridmobile';
export const PRODUCT_HUNT_URL = 'https://www.producthunt.com/products/off-grid-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-off-grid-ai';
// Product Hunt counts a launch day from 00:01 to 24:00 Pacific. Before it, people can only ask to be
// notified; on it, they can upvote; after it, the badge shows the result.
// Keep in step with _data/launch.yml, which drives the announcement bar.
export const PH_LAUNCH = { start: Date.parse('2026-10-27T07:01:00Z'), end: Date.parse('2026-10-28T07:00:00Z'), label: 'Oct 27' };
export const productHuntBadge = (theme) => `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1293302&theme=${theme}`;

// Checkable claims only: each links to where a visitor can see it for themselves.
export const EFF_URL = 'https://www.eff.org/pages/i-want-opt-out-ai-tools-or-training-made-big-tech';

// source: 'ios' | 'android' | 'reddit' | 'github' | 'slack' | 'email'
export const REVIEWS = [
  { source: 'ios', by: 'coreclears', title: 'awesome app', text: 'this is probably the greatest local AI app ive ever used BY FAR. … Pro is 100% worth it imo' },
  { source: 'email', role: 'Pro customer, tried every local AI app', text: 'I was trying every local AI tool I could find for my iPhone. Off Grid was the only one that worked reliably.' },
  { source: 'reddit', by: 'Top-Preference-1355', url: 'https://www.reddit.com/r/off_grid_ai/comments/1ukfil3/the_bet_im_making/ovhf7d1/', text: "I'm a pro user and I love it. I was just about to go buy a Mac for JUST this … You're amazing!" },
  { source: 'slack', role: 'Fractional exec at three companies', text: 'I consult as a fractional exec at three companies. OGAD and OGAM [Desktop and Mobile] take notes, transcribe meetings and keep track of tim spent working on projects for each client.' },
  { source: 'android', by: 'Nathaniel Boyd', text: "I am updating my review from 3 to 5 stars. … the non-mac desktop app works so that as long as I am at my office or VPN'd to it, the conversations fully auto sync." },
  { source: 'email', role: 'Android user', text: 'Great work on the app; it is the best tool I have found for on-device AI.' },
  { source: 'github', by: 'hardbrocklife', url: 'https://github.com/orgs/off-grid-ai/discussions/303', text: 'Everything just worked. … Very impressed that I can install the app, download a model, and start chatting in less than 5 min' },
  { source: 'ios', by: 'Gazta', title: 'The best Edge AI for my iPhone XR', text: 'Hosting llama from my MacMini works perfectly ! … this is the only app that seems to allow local Edge AI to work on my 7 year old iPhone XR' },
  { source: 'email', role: 'Submariner, Pro', text: "I really like your app, I think it's fantastic to use for long times without the internet and I have the pro key." },
  { source: 'slack', text: 'I really think this is the best local LLM chat app for iOS by far! The huggingface connection is unbeatable!' },
  { source: 'ios', by: 'Admiral Tolwyn', title: 'Great app', text: 'It is a really interesting implementation which shows what is possible with an on device LM. The source code is a gold mine as well.' },
  { source: 'email', role: 'Doctor, runs medical clinics', text: 'I already paid for your product and think it’s great' },
  { source: 'reddit', by: 'LightweightSuperHero', url: 'https://www.reddit.com/r/off_grid_ai/comments/1uq468w/completely_ondevice_offline_real_time_speech_to/owctzxn/', text: "I like that the pre-trained model works when I'm on an international flight" },
  { source: 'ios', by: 'Keslok', title: 'Works very well', text: 'Insanely good App for it to be completely free' },
  { source: 'email', role: '30-year IT veteran', text: 'I primarily use it for three things. A) Learning how to use my metal lathe and helping me plan projects for the lathe and for blacksmithing. … I love the app.' },
  { source: 'android', by: 'Jason Schwartzenburg', text: 'Works fantastic, to remotely connect to my PC running ollama, local models!' },
  { source: 'github', by: 'sj-dev-afk', url: 'https://github.com/off-grid-ai/OGAM/discussions/303#discussioncomment-16675769', text: 'Excellent work guys! The install and setup was flawless and got to use a model in less than 2 mins, thank you so much!' },
  { source: 'ios', by: 'Jivak99', title: 'So good', text: 'Probably the first app I’d go out of my way to tell people to get' },
  { source: 'slack', text: 'Off grid has become my go to for sure. … The knowledge base is amazing and a personal favorite.' },
  { source: 'ios', by: 'ucguy4u', title: 'Clean Local AI. Works Well', text: 'Local AI works fast and feels private because processing stays on device.' },
  { source: 'ios', by: 'Johnnypotato', title: 'Great app!', text: 'This is the one! I deleted the others! Hands down!' },
];

// The short row under the hero: one line each, cut from the quotes above (same sources, still verbatim).
export const HERO_REVIEWS = [
  { source: 'ios', by: 'coreclears', text: '…the greatest local AI app ive ever used BY FAR.' },
  { source: 'email', role: 'Pro customer', text: 'Off Grid was the only one that worked reliably.' },
  { source: 'github', by: 'hardbrocklife', text: 'Everything just worked.' },
  { source: 'ios', by: 'Keslok', text: 'Insanely good App for it to be completely free' },
  { source: 'reddit', by: 'Top-Preference-1355', text: 'I was just about to go buy a Mac for JUST this' },
  { source: 'email', role: 'Android user', text: '…it is the best tool I have found for on-device AI.' },
  { source: 'ios', by: 'Johnnypotato', text: 'This is the one! I deleted the others!' },
  { source: 'ios', by: 'Admiral Tolwyn', text: 'The source code is a gold mine as well.' },
];
