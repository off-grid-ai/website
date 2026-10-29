// PostHog through our own domain (e.getoffgridai.co): tracker blockers drop requests to *.posthog.com, and Off Grid's
// privacy-minded buyers often run one, so sales reached Stripe with no visit in PostHog. Same events, same project;
// the site's api_host points here (site.posthog_host in _config.yml).
const API_HOST = 'us.i.posthog.com';
const ASSET_HOST = 'us-assets.i.posthog.com';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname + url.search;
    if (url.pathname.startsWith('/static/')) {
      // The SDK itself: cached at the edge, so page loads do not wait on PostHog.
      let response = await caches.default.match(request);
      if (!response) {
        response = await fetch(`https://${ASSET_HOST}${path}`);
        ctx.waitUntil(caches.default.put(request, response.clone()));
      }
      return response;
    }
    const forwarded = new Request(`https://${API_HOST}${path}`, request);
    forwarded.headers.delete('cookie');
    // PostHog locates the visitor from this header; without it every visit would place at Cloudflare's edge.
    const ip = request.headers.get('cf-connecting-ip');
    if (ip) forwarded.headers.set('x-forwarded-for', ip);
    return fetch(forwarded);
  },
};
