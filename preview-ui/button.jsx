import React from 'react';
import SmoothButton from '@smoothui-upstream/smooth-button';

// SmoothUI's button, intact, joined to the alive layer. build.mjs aliases '@smoothui/smooth-button'
// here, so every page and every SmoothUI component that uses it gets the library's button motion
// (alive.css: hover lift, press give, pointer light, sheen, click ring). The library reads two
// attributes: data-slot="button" and data-variant. A site primary action (data-site-button="primary")
// is the library's "default" variant, which carries the breathing emerald halo.
export default function Button({ variant, ...props }) {
  const site = props['data-site-button'];
  const tone = site === 'primary' ? 'default' : site === 'secondary' ? (variant === 'ghost' ? 'ghost' : 'outline') : (variant || 'default');
  // data-size mirrors the SmoothUI size so site CSS can size touch targets per size (page.css).
  return <SmoothButton data-slot="button" data-variant={tone} data-size={props.size || 'default'} variant={variant} {...props} />;
}
export { smoothButtonVariants } from '@smoothui-upstream/smooth-button';
