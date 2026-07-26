/* =============================================
   main.js — AI Marketing Strategic
   Consolidated site-wide JavaScript
   Merge of nav-footer.js + script.js + enhancements
   ============================================= */

(function () {
  'use strict';

    /* ─── Global CTA Helpers ─── */
    function trackLead() {
      if (typeof gtag === 'function') gtag('event', 'lead', { method: 'whatsapp' });
    }
    function openChat() {
      var overlay = document.getElementById('chat-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'chat-overlay';
        overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:16px';
        overlay.onclick = function(e) { if (e.target === this) closeChat(); };

        var modal = document.createElement('div');
        modal.style.cssText = 'background:#fff;border-radius:0;width:92%;max-width:440px;max-height:90vh;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35);height:100%;min-height:500px';

        var header = document.createElement('div');
        header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#0B2A4A;color:#fff';
        header.innerHTML = '<span style="font-family:Orbitron,sans-serif;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">AI Assessment Gratis</span><button id="chat-close-btn" style="width:28px;height:28px;border-radius:4px;border:none;background:rgba(255,255,255,.1);color:#fff;font-size:14px;cursor:pointer;line-height:1">X</button>';
        header.querySelector('#chat-close-btn').onclick = closeChat;

        var iframe = document.createElement('iframe');
        iframe.src = 'https://ai.newton.co.id/webhook/f263072c-d9fd-47e0-82e5-a85af72df984/chat';
        iframe.allow = 'microphone';
        iframe.style.cssText = 'width:100%;height:calc(100% - 44px);border:none;display:block';

        modal.appendChild(header);
        modal.appendChild(iframe);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') closeChat();
        });

        var style = document.createElement('style');
        style.textContent = '@keyframes chatFadeIn{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}';
        document.head.appendChild(style);
      }
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeChat() {
      var overlay = document.getElementById('chat-overlay');
      if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    }

  /* =============================================
     NAVIGATION — Data & Builders (React-style dark)
     Injects into #nav-placeholder, #mobile-placeholder,
     #footer-placeholder on page load
     ============================================= */

  var NAV_LINKS = [
    { href: '/harga.html',      label: 'Paket Solusi' },
    { href: '/tentang.html',    label: 'Cara Kerja' },
    { href: '/hasil.html',      label: 'Hasil Klien' },
    { href: '/blog/',           label: 'Panduan Gratis' }
  ];

  var FOOTER_LINKS = [
    { href: '/harga.html',      label: 'Paket Solusi' },
    { href: '/tentang.html',    label: 'Cara Kerja' },
    { href: '/hasil.html',      label: 'Hasil Klien' },
    { href: '/blog/',           label: 'Panduan Gratis' }
  ];

  /** Build the fixed top navigation bar — Dark navy with logo image */
  function buildNav() {
    var header = document.createElement('header');
    header.className = 'site-header';

    var inner = document.createElement('div');
    inner.className = 'header-inner';

    // Logo — image only
        var logo = document.createElement('a');
        logo.className = 'header-logo';
        logo.href = '/';
        logo.innerHTML =
          '<img src="https://aimarketingstrategic.com/images/logo%20aims.png" alt="AI Marketing Strategic" height="36">';
    inner.appendChild(logo);

    // Desktop nav links
    var nav = document.createElement('div');
    nav.className = 'header-nav';
    NAV_LINKS.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'header-link';
      a.href = item.href;
      a.textContent = item.label;
      nav.appendChild(a);
    });
    inner.appendChild(nav);

    // Actions container
    var actions = document.createElement('div');
    actions.className = 'header-actions';

    // CTA button
    var cta = document.createElement('button');
    cta.className = 'header-cta';
    cta.onclick = function () { trackLead(); openChat(); };
    cta.textContent = 'AI Assessment Gratis';
    actions.appendChild(cta);

    // Hamburger
    var ham = document.createElement('button');
    ham.className = 'header-hamburger';
    ham.onclick = toggleMenu;
    ham.setAttribute('aria-label', 'Menu');
    ham.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    actions.appendChild(ham);

    inner.appendChild(actions);
    header.appendChild(inner);
    return header;
  }

  /** Build the mobile popup menu — Dark style matching header */
  function buildMobileMenu() {
    var overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    overlay.className = 'menu-overlay';
    overlay.onclick = closeMenu;

    var menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'menu-popup';

    NAV_LINKS.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.onclick = closeMenu;
      a.style.cssText = 'display:block;padding:14px 0;font-size:14px;font-weight:500;color:rgba(255,255,255,0.8);border-bottom:1px solid rgba(255,255,255,0.06);text-decoration:none;transition:color 0.2s';
      a.onmouseover = function () { a.style.color = '#F57C00'; };
      a.onmouseout = function () { a.style.color = 'rgba(255,255,255,0.8)'; };
      menu.appendChild(a);
    });

    // CTA in mobile menu
    var cta = document.createElement('button');
    cta.className = 'menu-cta-btn';
    cta.onclick = function () { trackLead(); openChat(); closeMenu(); };
    cta.textContent = 'AI Assessment Gratis';
    menu.appendChild(cta);

    overlay.appendChild(menu);
    return overlay;
  }

  /** Toggle mobile menu */
  function toggleMenu() {
    var menu = document.getElementById('mobile-menu');
    var ov = document.getElementById('mobile-overlay');
    if (!menu) {
      var built = buildMobileMenu();
      document.body.appendChild(built);
      ov = document.getElementById('mobile-overlay');
      menu = document.getElementById('mobile-menu');
    }
    var open = !menu.classList.contains('active');
    menu.classList.toggle('active', open);
    ov.style.display = open ? 'flex' : 'none';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function closeMenu() {
    var menu = document.getElementById('mobile-menu');
    var ov = document.getElementById('mobile-overlay');
    if (menu) menu.classList.remove('active');
    if (ov) ov.style.display = 'none';
    document.body.style.overflow = '';
  }

  /** Build footer — Dark navy, matches header */
  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';

    var inner = document.createElement('div');
    inner.className = 'footer-inner';

    // Brand
    var brand = document.createElement('div');
    brand.className = 'footer-brand';
    brand.innerHTML =
      '<div class="footer-brand-name">AI Marketing Strategic</div>' +
      '<div class="footer-brand-sub">AI Automation untuk UMKM Indonesia — Chatbot WhatsApp, Follow-up Otomatis, Booking System</div>';
    inner.appendChild(brand);

    // Links columns
    var links = document.createElement('div');
    links.className = 'footer-links';
    FOOTER_LINKS.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      links.appendChild(a);
    });
    inner.appendChild(links);

    // Contact
    var contact = document.createElement('div');
    contact.className = 'footer-contact';
    contact.innerHTML =
      '<div class="footer-contact-label">Hubungi Kami</div>' +
      '<a class="footer-phone" href="https://wa.me/6281907552758?text=Halo%2C%20saya%20tertarik%20dengan%20AI%20automation%20AMS">+62 819-0755-2758</a>' +
      '<div class="footer-hours">Senin – Minggu · 09:00 – 21:00 WIB</div>';
    inner.appendChild(contact);

    footer.appendChild(inner);

    // Copyright bar
    var bar = document.createElement('div');
    bar.className = 'footer-bar';
    bar.innerHTML =
      '<div class="footer-copy">© ' + new Date().getFullYear() + ' AI Marketing Strategic. All rights reserved.</div>' +
      '<div class="footer-legal">' +
        '<a href="/privacy-policy.html">Privacy</a>' +
        '<span>·</span>' +
        '<a href="/terms.html">Terms</a>' +
      '</div>';
    footer.appendChild(bar);

    return footer;
  }

  /** Inject nav, mobile menu, footer into placeholders */
  function injectLayout() {
    var navPh = document.getElementById('nav-placeholder');
    if (navPh && !navPh.querySelector('header')) navPh.appendChild(buildNav());

    var mobPh = document.getElementById('mobile-placeholder');
    if (mobPh && !mobPh.querySelector('.menu-overlay')) mobPh.appendChild(buildMobileMenu());

    var ftPh = document.getElementById('footer-placeholder');
    if (ftPh && !ftPh.querySelector('footer')) ftPh.appendChild(buildFooter());
  }

  /** Sticky nav background on scroll */
  function initStickyNav() {
    window.addEventListener('scroll', function () {
      var hdr = document.querySelector('.site-header');
      if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /** Reveal-on-scroll animation */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (els.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      els.forEach(function (el) { obs.observe(el); });
    }
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { injectLayout(); initStickyNav(); initReveal(); });
  } else {
    injectLayout(); initStickyNav(); initReveal();
  }
})();