# Meta Pixel Event Tracking — AI Marketing Strategic

Centralized, declarative event tracking system powered by Meta Pixel (Facebook Pixel).
Zero hardcoded `fbq()` calls — everything goes through a reusable vanilla‑JS module.

---

## Quick Start

### 1. Meta Pixel Init (already in place)

The Pixel base code (`fbq('init', '1032082533057403')`) is inlined in `<head>` of every page:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){ ... }(...);
fbq('init', '1032082533057403');
</script>
```

> The old `fbq('track', 'PageView')` has been removed from the init block — the
> tracking module fires `PageView` on `DOMContentLoaded` instead (more reliable).

### 2. Tracking Module

| File | Purpose |
|---|---|
| `src/js/tracking/meta.js` | Core event functions (`trackPageView`, `trackLead`, …) |
| `src/js/tracking/events.js` | Automatic DOM event bindings (delegation) |
| `src/js/tracking/index.js` | Entry point — auto‑initialises on load |

### 3. How It Loads

**Static pages** (`static/*.html`, `static/blog/*.html`):

```html
<script src="/assets/js/tracking.js" defer></script>
```

**React app** (root `index.html` via `index.tsx`):

```typescript
import { startTracking } from './src/js/tracking/index.js';
startTracking();
```

The module auto‑fires `PageView` and binds all listeners once.
No manual setup needed.

---

## Tracked Events

### Auto‑detected (just works)

| Event | Fires When | Trigger |
|---|---|---|
| `PageView` | Every page load (DOMContentLoaded) | Automatic |
| `ViewContent` | Click on `[data-track="cta"]` | `data-track="cta"` |
| `ViewContent` | Click on service card | `data-track="service"` + `data-service` |
| `ViewContent` | Click on pricing/plan button | `data-track="pricing"` + `data-plan` |
| `ViewContent` + `Download` | Click on `.pdf` / `.doc` / `.docx` / `.zip` link | Automatic (href match) |
| `Contact` | Click on `wa.me` or `api.whatsapp` link | Automatic (href match) |
| `Lead` | Form submit on `[data-track="form"]`, `#lead-form`, `.lead-form` | Automatic (submit event) |
| `Lead` | URL contains `/thank-you` or `/success` | Automatic (path check) |
| `Schedule` | Click on button/link containing "Demo", "Book", or "Schedule" text | Automatic (text match) |

### Programmatic (call from JS)

| Function | Fires | Usage |
|---|---|---|
| `trackPageView()` | `PageView` | SPA route changes |
| `trackViewContent(name, extra)` | `ViewContent` | Any content view |
| `trackLead(source, formName)` | `Lead` | Form submit, assessment |
| `trackContact(method, label)` | `Contact` | WhatsApp, phone, email |
| `trackSchedule(service, plan)` | `Schedule` | Demo / consultation booking |
| `trackPurchase(value, currency, plan)` | `Purchase` | Completed transaction |
| `trackDownload(file)` | `Download` | File download |
| `trackSearch(keyword)` | `Search` | Site search |
| `trackCustom(name, data)` | `trackCustom` | Arbitrary custom event |
| `completePurchase(value, plan)` | `Purchase` (IDR) | Shorthand for `trackPurchase` |

---

## Adding a New Trackable Element

### Option A — Declarative (attribute)

Add `data-track` + optional context attributes to any HTML element:

```html
<button data-track="cta" data-section="hero">
  Mulai Trial
</button>
```

| Attribute | Event | Extra Params |
|---|---|---|
| `data-track="cta"` | `ViewContent` | `button_text`, `page`, `section` (from `data-section`) |
| `data-track="service"` | `ViewContent` | `service_name` (from `data-service`) |
| `data-track="pricing"` | `ViewContent` | `plan_name` (from `data-plan`) |
| `data-track="form"` | `Lead` | `source` (from `data-source`), `form_name` (from `data-form-name`) |

Example — service card:

```html
<div data-track="service" data-service="AI Frontliner">
  <h3>AI Frontliner</h3>
  <p>Menangkap leads 24/7 via WhatsApp.</p>
</div>
```

Example — pricing button:

```html
<button data-track="pricing" data-plan="Starter">
  Pilih Paket Starter
</button>
```

Example — tracked form:

```html
<form data-track="form" data-source="Blog" data-form-name="Free Assessment">
  …
</form>
```

### Option B — Programmatic (JavaScript)

Import the module and call the function directly:

```javascript
import { trackLead, trackCustom } from './js/tracking/meta.js';

// After form submission
trackLead('Landing Page', 'Consultation');

// Custom event
trackCustom('VideoPlayed', { video_name: 'Tutorial AI', duration: 120 });
```

On static pages (where imports aren't available), use the global:

```javascript
// window.AIMSTracking is exposed when loaded via <script> tag
window.AIMSTracking.trackLead('Popup', 'Free Assessment');
```

---

## Debug Mode

Append `?debugTracking=true` to any URL to see every event logged in the console:

```
[Meta] PageView
[Meta] ViewContent  {button_text: "Mulai Trial", page: "/index.html", section: "hero"}
[Meta] Contact      {method: "whatsapp", button_text: "Hubungi Kami"}
```

No browser extension needed — works on any device.

---

## File Reference

```
src/
├── js/
│   └── tracking/
│       ├── meta.js        # Core event functions (exported)
│       ├── events.js      # DOM auto‑bindings (event delegation)
│       └── index.js       # Entry point — auto‑init on load
├── tracking.html          # Vite entry for standalone build
static/
├── assets/
│   └── js/
│       └── tracking.js    # Built IIFE bundle (2.86 kB gzipped)
vite.tracking.config.ts    # Separate Vite config for standalone build
TRACKING.md                # ← this file
```

---

## Safety & Performance

- **No errors if fbq missing** — every function checks `typeof window.fbq === 'function'` first
- **Event delegation** — one listener per event type on `document`, not per element
- **No duplicates** — delegation pattern prevents double‑binding
- **No wasted DOM queries** — minimal querying, `closest()` for context
- **Lightweight** — 2.86 kB total (1.15 kB gzipped)

---

## Example: Adding a New Auto‑Detection

To track, say, email links (`mailto:`), edit `events.js`:

```javascript
// in events.js — add a new init function
export function initEmailTracking() {
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    trackContact('email', link.getAttribute('href').replace('mailto:', ''));
  });
}

// then register it in initAllTracking()
export function initAllTracking() {
  // … existing inits …
  initEmailTracking();  // <-- add here
}
```

Rebuild the standalone bundle:

```bash
npm run build:tracking
```