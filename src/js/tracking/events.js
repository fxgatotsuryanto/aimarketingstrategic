/* =============================================
   events.js — Auto Event Bindings
   AI Marketing Strategic
   Vanilla JS — event delegation throughout
   ============================================= */

import {
  trackPageView,
  trackViewContent,
  trackLead,
  trackContact,
  trackSchedule,
  trackDownload,
  trackSearch,
} from './meta.js';

/* ─── Helpers ─────────────────────────────────── */

/**
 * Get the current page path for context.
 * @returns {string}
 */
function currentPage() {
  return window.location.pathname;
}

/**
 * Extract trimmed text from an element.
 * @param {Element} el
 * @returns {string}
 */
function textOf(el) {
  return (el.textContent || '').trim();
}

/**
 * Find the closest ancestor with a data attribute.
 * @param {Element} el
 * @param {string} attr
 * @returns {string|null}
 */
function closestData(el, attr) {
  var match = el.closest('[' + attr + ']');
  return match ? match.getAttribute(attr) : null;
}

/* ─── 1. Auto PageView ───────────────────────── */

export function initAutoPageView() {
  trackPageView();
}

/* ─── 2. CTA Buttons ─────────────────────────── */

/**
 * Fires ViewContent when an element with data-track="cta" is clicked.
 * Uses event delegation on document.
 */
export function initCTATracking() {
  document.addEventListener('click', function (e) {
    var target = e.target;
    var cta = target.closest('[data-track="cta"]');
    if (!cta) return;

    trackViewContent('CTA Click', {
      button_text: textOf(cta),
      page: currentPage(),
      section: closestData(cta, 'data-section') || '',
    });
  });
}

/* ─── 3. WhatsApp Links ──────────────────────── */

/**
 * Fires Contact when a WhatsApp link is clicked.
 * Handles both wa.me and api.whatsapp.com links.
 */
export function initWhatsAppTracking() {
  document.addEventListener('click', function (e) {
    var target = e.target;
    var link = target.closest('a[href*="wa.me"], a[href*="api.whatsapp"]');
    if (!link) return;

    trackContact('whatsapp', textOf(link));
  });
}

/* ─── 4. Contact Form ────────────────────────── */

/**
 * Fires Lead on successful form submission.
 * Listens for forms with data-track="form" or existing lead-form.
 * Assumes a success indicator (URL hash, hidden input, or class).
 */
export function initFormTracking() {
  document.addEventListener('submit', function (e) {
    var form = e.target;
    var isTracked = form.matches('[data-track="form"], #lead-form, .lead-form');
    if (!isTracked) return;

    // Give the form handler time to process, then fire Lead.
    // Use a small delay so the form's own validation/submit runs first.
    requestAnimationFrame(function () {
      trackLead(
        form.getAttribute('data-source') || 'Landing Page',
        form.getAttribute('data-form-name') || form.id || 'Consultation'
      );
    });
  });
}

/* ─── 5. Download Links ──────────────────────── */

/**
 * Fires ViewContent + Download when a download link is clicked.
 * Detects: .pdf, .doc, .docx, .zip
 */
export function initDownloadTracking() {
  document.addEventListener('click', function (e) {
    var target = e.target;
    var link = target.closest('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    trackViewContent('Download', { file_name: href });
    trackDownload(href);
  });
}

/* ─── 6. Demo / Book / Schedule Buttons ──────── */

/**
 * Fires Schedule when a button/link containing "Demo", "Book", or "Schedule" is clicked.
 * Uses event delegation and text-content matching.
 */
export function initBookingTracking() {
  document.addEventListener('click', function (e) {
    var target = e.target;

    // Only match button-like elements with trigger text
    var btn = target.closest('button, a, [role="button"]');
    if (!btn) return;

    var txt = textOf(btn).toLowerCase();
    var isBooking = txt.includes('demo') || txt.includes('book') || txt.includes('schedule');
    if (!isBooking) return;

    // Avoid double-firing with CTA tracking (data-track takes priority there)
    if (btn.closest('[data-track="cta"]')) return;

    trackSchedule(
      txt.includes('demo') ? 'Demo' : 'Consultation',
      closestData(btn, 'data-plan') || ''
    );
  });
}

/* ─── 7. Service Cards ───────────────────────── */

/**
 * Fires ViewContent when a service card is clicked.
 * Service cards must have data-track="service".
 */
export function initServiceCardTracking() {
  document.addEventListener('click', function (e) {
    var target = e.target;
    var card = target.closest('[data-track="service"]');
    if (!card) return;

    trackViewContent('Service Card', {
      service_name: closestData(card, 'data-service') || textOf(card).slice(0, 120),
    });
  });
}

/* ─── 8. Pricing Buttons ─────────────────────── */

/**
 * Fires ViewContent when a pricing/plan button is clicked.
 * Pricing buttons must have data-track="pricing".
 */
export function initPricingTracking() {
  document.addEventListener('click', function (e) {
    var target = e.target;
    var btn = target.closest('[data-track="pricing"]');
    if (!btn) return;

    trackViewContent('Pricing Click', {
      plan_name: closestData(btn, 'data-plan') || textOf(btn),
    });
  });
}

/* ─── 9. Success / Thank-you Page ────────────── */

/**
 * Fires Lead if the current URL contains "/thank-you" or "/success".
 */
export function initSuccessPageTracking() {
  var path = currentPage().toLowerCase();
  if (path.includes('/thank-you') || path.includes('/success')) {
    trackLead('Website', 'Success Page');
  }
}

/* ─── 10. Initialize All ─────────────────────── */

/**
 * Call once to bind all event listeners.
 */
export function initAllTracking() {
  initAutoPageView();
  initCTATracking();
  initWhatsAppTracking();
  initFormTracking();
  initDownloadTracking();
  initBookingTracking();
  initServiceCardTracking();
  initPricingTracking();
  initSuccessPageTracking();
}