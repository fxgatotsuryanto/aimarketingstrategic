/* =============================================
   meta.js — Core Meta Pixel Event Functions
   AI Marketing Strategic
   Vanilla JS — no dependencies
   ============================================= */

/**
 * Debug logger — only fires when ?debugTracking=true is in URL.
 * @param {string} eventName
 * @param {object} [data]
 */
function debugLog(eventName, data) {
  if (window.location.search.includes('debugTracking=true')) {
    console.log(
      '%c[Meta] %c' + eventName,
      'color:#1877F2;font-weight:700',
      'color:#333;font-weight:400',
      data || ''
    );
  }
}

/* ─── guard ───────────────────────────────────── */

/**
 * Check if fbq is loaded before firing.
 * @returns {boolean}
 */
function fbqReady() {
  const ready = typeof window.fbq === 'function';
  if (!ready) {
    debugLog('(fbq not loaded — skipped)', { event: arguments.callee?.name || 'unknown' });
  }
  return ready;
}

/* ─── Event helpers ──────────────────────────── */

/**
 * Track a standard Meta Pixel event with params.
 * @param {string} event  — standard event name (PageView, Lead, etc.)
 * @param {object} [params] — optional parameters object
 */
function fireEvent(event, params) {
  if (!fbqReady()) return;
  window.fbq('track', event, params || {});
  debugLog(event, params || {});
}

/**
 * Track a custom Meta Pixel event.
 * @param {string} event — custom event name
 * @param {object} [params]
 */
function fireCustomEvent(event, params) {
  if (!fbqReady()) return;
  window.fbq('trackCustom', event, params || {});
  debugLog('Custom:' + event, params || {});
}

/* ─── Public API ─────────────────────────────── */

/**
 * PageView — fires automatically on DOMContentLoaded.
 * Call manually for SPA route changes.
 */
export function trackPageView() {
  fireEvent('PageView');
}

/**
 * ViewContent — general content/view tracking.
 * @param {string} contentName
 * @param {object} [extra]
 */
export function trackViewContent(contentName, extra) {
  fireEvent('ViewContent', Object.assign(
    { content_name: contentName },
    extra || {}
  ));
}

/**
 * Lead — qualified lead event (form submit, assessment, etc.)
 * @param {string} source  — e.g. "Landing Page", "Blog", "WhatsApp"
 * @param {string} [formName]
 */
export function trackLead(source, formName) {
  fireEvent('Lead', {
    source: source || 'unknown',
    form_name: formName || '',
  });
}

/**
 * Contact — WhatsApp click, phone call, email.
 * @param {string} method   — e.g. "whatsapp", "phone", "email"
 * @param {string} [label]  — button text or context
 */
export function trackContact(method, label) {
  fireEvent('Contact', {
    method: method || 'unknown',
    button_text: label || '',
  });
}

/**
 * Schedule — demo / consultation booking.
 * @param {string} service   — e.g. "AI Assessment", "Demo"
 * @param {string} [plan]
 */
export function trackSchedule(service, plan) {
  fireEvent('Schedule', {
    service_name: service || 'unknown',
    plan_name: plan || '',
  });
}

/**
 * Purchase — completed transaction (use via completePurchase helper).
 * @param {number} value
 * @param {string} currency  — default "IDR"
 * @param {string} [plan]
 */
export function trackPurchase(value, currency, plan) {
  fireEvent('Purchase', {
    value: value || 0,
    currency: currency || 'IDR',
    plan_name: plan || '',
  });
}

/**
 * Download — PDF, DOC, ZIP, etc.
 * @param {string} file
 */
export function trackDownload(file) {
  fireEvent('Download', {
    file_name: file || 'unknown',
  });
}

/**
 * Search — internal site search.
 * @param {string} keyword
 */
export function trackSearch(keyword) {
  fireEvent('Search', {
    search_string: keyword || '',
  });
}

/**
 * trackCustom — fire any custom event name with arbitrary data.
 * @param {string} name
 * @param {object} data
 */
export function trackCustom(name, data) {
  if (!name) return;
  fireCustomEvent(name, data || {});
}

/* ─── Convenience helpers ────────────────────── */

/**
 * completePurchase — shorthand that fires Purchase with IDR currency.
 * @param {number} value
 * @param {string} [plan]
 */
export function completePurchase(value, plan) {
  trackPurchase(value, 'IDR', plan);
}
