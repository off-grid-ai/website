// Click tracking (downloads, installers, GitHub stars, CTAs) and the page-view beacon run site-wide
// from _includes/site-tracking.html, verbatim from the old default layout. Pages that track their
// own CTA clicks pass `ownCta` to opt out of the generic cta_click, as before (window.__ctaTracked).
export function installClickTracking({ ownCta } = {}) {
  if (ownCta) window.__ctaTracked = true;
  return () => { if (ownCta) window.__ctaTracked = false; };
}
