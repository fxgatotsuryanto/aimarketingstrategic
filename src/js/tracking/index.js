/* =============================================
   index.js — Tracking Entry Point
   AI Marketing Strategic
   Vanilla JS — call startTracking() to init
   ============================================= */

import { initAllTracking } from './events.js';

/**
 * Boot the entire tracking system.
 * Safe to call multiple times — will warn in debug
 * but will not double-bind event listeners (events.js
 * uses event delegation, so rebinding is harmless).
 *
 * Import from your app's entry point:
 *
 *   import { startTracking } from './js/tracking/index.js';
 *   startTracking();
 *
 * Or load as a module script directly in HTML:
 *
 *   <script type="module" src="/src/js/tracking/index.js"></script>
 *
 * In that case it auto-initialises on DOMContentLoaded.
 */

export function startTracking() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAllTracking();
    });
  } else {
    initAllTracking();
  }
}

/* ─── Auto-init when loaded as module script ── */
startTracking();