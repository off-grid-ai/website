import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import PreviewPage from './page.jsx';

const root = document.getElementById('offgrid-home-root');
const pricing = JSON.parse(document.getElementById('offgrid-home-pricing').textContent);
// Paint the server-rendered hero before starting React hydration.
requestAnimationFrame(() => requestAnimationFrame(() => {
  hydrateRoot(root, <PreviewPage pricing={pricing} />);
}));
