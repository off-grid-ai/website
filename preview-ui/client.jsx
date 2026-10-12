import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import PreviewPage from './page.jsx';

const root = document.getElementById('offgrid-home-root');
const pricing = JSON.parse(document.getElementById('offgrid-home-pricing').textContent);
// Paint the server-rendered hero before starting React hydration.
const hydrate = () => requestAnimationFrame(() => requestAnimationFrame(() => {
  hydrateRoot(root, <PreviewPage pricing={pricing} />);
}));
// Measurements need the full scene CSS, while critical CSS paints the hero.
const styles = document.querySelector('[data-home-styles]');
if (!styles || styles.sheet) hydrate();
else styles.addEventListener('load', hydrate, { once: true });
