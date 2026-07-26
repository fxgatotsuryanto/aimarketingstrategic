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
      cta.textContent = 'AI Assessment Gratis';
      cta.onclick = function () { trackLead(); openChat(); closeMenu(); };
      menu.appendChild(cta);

      overlay.appendChild(menu);
      return overlay;
    }

    function toggleMenu() {
      var overlay = document.getElementById('mobile-overlay');
      var menu = document.getElementById('mobile-menu');
      if (overlay && menu) {
        overlay.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
      }
    }

    function closeMenu() {
      var overlay = document.getElementById('mobile-overlay');
      var menu = document.getElementById('mobile-menu');
      if (overlay && menu) {
        overlay.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    /** Build the footer — matches _includes/footer.html */
    function buildFooter() {
      var footer = document.createElement('footer');
      footer.className = 'site-footer';
      footer.setAttribute('role', 'contentinfo');

      footer.innerHTML =
        '<div class="footer-inner">' +
          '<div class="footer-brand">' +
            '<a href="/" class="footer-logo" aria-label="AI Revenue Activation - Home">' +
              '<span class="logo-text">AI Revenue<span class="logo-accent">Activation</span></span>' +
            '</a>' +
            '<p class="footer-tagline">AI Revenue Activation membantu UMKM Indonesia mengaktifkan revenue otomatis: AI Marketing menangkap leads, AI Sales menjalankan follow-up, AI Operations memantau performa.</p>' +
            '<div class="footer-social">' +
              '<a href="https://www.linkedin.com/company/aimarketingstrategic" target="_blank" rel="noopener" aria-label="LinkedIn">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' +
              '</a>' +
              '<a href="https://www.youtube.com/@AIMarketingStrategic" target="_blank" rel="noopener" aria-label="YouTube">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
              '</a>' +
              '<a href="https://wa.me/6281907552758" target="_blank" rel="noopener" aria-label="WhatsApp">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.793-1.653-2.059-.173-.265-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.471.099-.174.05-.369-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.273-.272.198-1.002.826-1.118.917-.117.09-.0.08-.387.114-.52.062-.118-.025-.272-.109-.426-.098-.174-.734-.684-1.238-1.38-.504-.694-.608-.78-.684-.93-.075-.149.302-.302.377-.325.273-.075 3.049-.913 3.296-.97 2.46-.57 3.074-1.897 3.45-2.004.376-.108.654-.173.873.064.22.238.24.325.355.63.075.197.198.377.378.426.18.05.35.05.387-.01.099-.197.324-.77.499-1.118.354-.705 1.124-2.284 1.536-3.202.273-.605.41-.873.499-.989.099-.117.148-.316.05-.426-.098-.133-.368-.437-.617-.592-.235-.149-.52-.174-.645-.16-.133.013-.175.098-.297.272l-.446.624c-.592.878-1.238 1.55-1.313 1.686-.074.117-1.277 1.782-1.572 2.003-.296.223-.471.324-.546.35-.074.027-.149.025-.198-.025z"/></svg>' +
              '</a>' +
            '</div>' +
          '</div>' +

          '<nav class="footer-nav" aria-label="Menu utama">' +
            '<h3 class="footer-title">Menu</h3>' +
            '<ul class="footer-links">' +
              '<li><a href="/index.html">Beranda</a></li>' +
              '<li><a href="/ai-marketing.html">AI Marketing</a></li>' +
              '<li><a href="/ai-sales.html">AI Sales</a></li>' +
              '<li><a href="/ai-operations.html">AI Operations</a></li>' +
              '<li><a href="/harga.html">Harga</a></li>' +
              '<li><a href="/hasil.html">Studi Kasus</a></li>' +
              '<li><a href="/blog/">Blog</a></li>' +
            '</ul>' +
          '</nav>' +

          '<nav class="footer-nav" aria-label="Produk">' +
            '<h3 class="footer-title">Produk</h3>' +
            '<ul class="footer-links">' +
              '<li><a href="/harga.html#starter">AI Frontliner (Starter)</a></li>' +
              '<li><a href="/harga.html#growth">AI Marketing + Sales</a></li>' +
              '<li><a href="/harga.html#scale">Full AI Team</a></li>' +
              '<li><a href="/demo.html">Coba Demo</a></li>' +
              '<li><a href="/produk/follow-up-playbook.html">Playbook Follow-Up WA</a></li>' +
            '</ul>' +
          '</nav>' +

          '<div class="footer-contact">' +
            '<h3 class="footer-title">Kontak</h3>' +
            '<ul class="footer-links">' +
              '<li><a href="https://wa.me/6281907552758" target="_blank" rel="noopener">WhatsApp: 0819-0755-2758</a></li>' +
              '<li><a href="mailto:hallo@aimarketingstrategic.com">hallo@aimarketingstrategic.com</a></li>' +
              '<li><a href="/kontak.html">Form Konsultasi</a></li>' +
            '</ul>' +
            '<p class="footer-address">Indonesia 🇮🇩</p>' +
          '</div>' +
        '</div>' +

        '<div class="footer-bottom">' +
          '<p class="footer-copyright">&copy; ' + new Date().getFullYear() + ' AI Revenue Activation. Hak cipta dilindungi.</p>' +
          '<div class="footer-legal">' +
            '<a href="/privacy-policy.html">Kebijakan Privasi</a>' +
            '<a href="/terms.html">Syarat & Ketentuan</a>' +
          '</div>' +
        '</div>' +
      '</div>';
      return footer;
    }

    /* =============================================
       Initialize on DOM ready
       ============================================= */
    document.addEventListener('DOMContentLoaded', function () {
      // Nav
      var navPh = document.getElementById('nav-placeholder');
      var mobPh = document.getElementById('mobile-placeholder');
      var ftrPh = document.getElementById('footer-placeholder');
      if (navPh) navPh.appendChild(buildNav());
      if (mobPh) mobPh.appendChild(buildMobileMenu());
      if (ftrPh) ftrPh.appendChild(buildFooter());

      // Sticky nav background
      var hdr = document.querySelector('.site-header');
      if (hdr) {
        window.addEventListener('scroll', function () {
          hdr.classList.toggle('scrolled', window.scrollY > 60);
        });
      }

      // Reveal animations
      (function () {
        var els = document.querySelectorAll('.reveal');
        if (els.length) {
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
            });
          }, { threshold: 0.15 });
          els.forEach(function (el) { obs.observe(el); });
        }
      })();

      // Auto-play hero video
      var vid = document.querySelector('.hero-video video');
      if (vid) { vid.muted = true; vid.playsInline = true; vid.play().catch(function () {}); }
    });
})();