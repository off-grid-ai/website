import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import PreviewPage from './page.jsx';

const root = document.getElementById('offgrid-home-root');
const pricing = JSON.parse(document.getElementById('offgrid-home-pricing').textContent);
hydrateRoot(root, <PreviewPage pricing={pricing} />);
