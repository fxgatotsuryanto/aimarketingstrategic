
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

// Meta Pixel Event Tracking (vanilla JS)
import { startTracking } from './src/js/tracking/index.js';
startTracking();

// GA4 Analytics
const GA_MEASUREMENT_ID = 'G-HPCDWE0YDD'; // Replace with actual GA4 ID

// Initialize GA4
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

// Event tracking helpers
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Use hydrateRoot when the server has pre-rendered content, createRoot otherwise
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
