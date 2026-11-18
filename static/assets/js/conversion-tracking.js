/* AMS conversion tracking — GA4 events + UTM attribution.
   Additive: tidak mengubah tracking Meta (tracking.js). */
(function () {
  "use strict";
  window.__amsEvents = window.__amsEvents || [];

  function utm() {
    var p;
    try { p = new URLSearchParams(window.location.search); } catch (e) { return {}; }
    return {
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || ""
    };
  }

  function fire(name, params) {
    var payload = Object.assign({}, params || {}, utm());
    try { if (typeof window.gtag === "function") window.gtag("event", name, payload); } catch (e) {}
    try { window.__amsEvents.push({ name: name, params: payload, t: Date.now() }); } catch (e) {}
  }

  function closest(el, sel) {
    try { return el && el.closest ? el.closest(sel) : null; } catch (e) { return null; }
  }

  document.addEventListener("click", function (e) {
    var a = closest(e.target, 'a[href*="wa.me"], a[href*="api.whatsapp"]');
    if (a) fire("whatsapp_click", { link_text: (a.textContent || "").trim().slice(0, 60) });
    var d = closest(e.target, 'a[href*="demo"]');
    if (d) fire("demo_click", { href: (d.getAttribute("href") || "").slice(0, 80) });
  }, true);

  document.addEventListener("submit", function (e) {
    var f = e.target;
    fire("form_submit", { form_id: (f && f.id) || "" });
  }, true);

  window.__amsUTM = utm();
})();