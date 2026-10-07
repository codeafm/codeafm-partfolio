import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { applyMetadata } from './seo.js';

const pathname = window.location.pathname;
const root = document.getElementById('root');
const app = <React.StrictMode><App pathname={pathname} /></React.StrictMode>;
applyMetadata(pathname);
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
