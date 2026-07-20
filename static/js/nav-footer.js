/* ========================================
   nav-footer.js — Shared Navigation & Footer
   Edit SATU file ini untuk update menu SEMUA halaman
   ======================================== */

(function() {
  'use strict';

  // ─── DATA ────────────────────────────────────────────
  var NAV_LINKS = [
    { href: '/index.html',          label: 'Beranda' },
    { href: '/demo.html',          label: 'Demo' },
    { href: '/hasil.html',          label: 'Hasil' },
    { href: '/harga.html',          label: 'Harga' },
    { href: '/tentang.html',        label: 'Tentang' },
    { href: '/kontak.html',         label: 'Kontak' },
    { href: '/produk/follow-up-playbook.html', label: 'Playbook' },
    { href: '/blog/',               label: 'Blog' }
  ];

  var FOOTER_LINKS = [
    { href: '/index.html',          label: 'Beranda' },
    { href: '/demo.html',          label: 'Demo' },
    { href: '/hasil.html',          label: 'Hasil Nyata' },
    { href: '/harga.html',          label: 'Harga & Paket' },
    { href: '/tentang.html',        label: 'Tentang Kami' },
    { href: '/produk/follow-up-playbook.html', label: 'Playbook WA' },
    { href: '/kontak.html',         label: 'Kontak' }
  ];

  // ─── BUILD NAVBAR ────────────────────────────────────
  function buildNav() {
    var nav = document.createElement('nav');
    nav.id = 'navbar';

    var inner = document.createElement('div');
    inner.className = 'nav-inner';

    // Logo
    var logo = document.createElement('a');
    logo.className = 'nav-logo';
    logo.href = '/index.html';
    logo.innerHTML = '<img src="https://aimarketingstrategic.com/images/logo%20aims.png" alt="AI Marketing Strategic" height="44">';
    inner.appendChild(logo);

    // Desktop links
    var links = document.createElement('div');
    links.className = 'nav-links';
    NAV_LINKS.forEach(function(item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      links.appendChild(a);
    });
    inner.appendChild(links);

    // CTA button
    var cta = document.createElement('button');
    cta.className = 'nav-cta';
    cta.onclick = function() { trackLead(); openChat(); };
    cta.textContent = 'Demo Gratis';
    inner.appendChild(cta);

    // Hamburger
    var ham = document.createElement('button');
    ham.className = 'hamburger';
    ham.onclick = toggleMenu;
    ham.setAttribute('aria-label', 'Menu');
    ham.innerHTML = '<svg id="ham-icon" class="icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    inner.appendChild(ham);

    nav.appendChild(inner);
    return nav;
  }

  // ─── BUILD MOBILE MENU ───────────────────────────────
  function buildMobileMenu() {
    var overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.onclick = closeMenu;

    var menu = document.createElement('div');
    menu.id = 'mobile-menu';

    NAV_LINKS.forEach(function(item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.onclick = closeMenu;
      menu.appendChild(a);
    });

    var wrap = document.createElement('div');
    wrap.className = 'menu-cta-wrap';
    var btn = document.createElement('button');
    btn.className = 'menu-cta-btn';
    btn.onclick = function() { trackLead(); openChat(); closeMenu(); };
    btn.textContent = 'Konsultasi Gratis';
    wrap.appendChild(btn);
    menu.appendChild(wrap);

    // Return both as fragment
    var frag = document.createDocumentFragment();
    frag.appendChild(overlay);
    frag.appendChild(menu);
    return frag;
  }

  // ─── BUILD FOOTER ────────────────────────────────────
  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';

    var inner = document.createElement('div');
    inner.className = 'footer-inner';

    // Brand
    var brand = document.createElement('div');
    brand.innerHTML = '<img src="https://aimarketingstrategic.com/images/logo%20aims.png" alt="AI Marketing Strategic" height="36"><p class="footer-tagline">AI Automation untuk UMKM Indonesia</p>';
    inner.appendChild(brand);

    // Menu links
    var menuDiv = document.createElement('div');
    var menuTitle = document.createElement('p');
    menuTitle.className = 'footer-col-title';
    menuTitle.textContent = 'Menu';
    menuDiv.appendChild(menuTitle);

    var ul = document.createElement('ul');
    ul.className = 'footer-links';
    FOOTER_LINKS.forEach(function(item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      ul.appendChild(li);
    });
    menuDiv.appendChild(ul);
    inner.appendChild(menuDiv);

    // Contact
    var contact = document.createElement('div');
    contact.innerHTML = 
      '<p class="footer-col-title">Kontak</p>' +
      '<div style="margin-bottom:24px">' +
        '<p class="footer-contact-label">WhatsApp Business</p>' +
        '<a href="https://wa.me/6281907552758" target="_blank" rel="noopener noreferrer" class="footer-phone">0819-0755-2758</a>' +
      '</div>' +
      '<p class="footer-hours">🕒 Senin - Sabtu (09.00 - 17.00)</p>';
    inner.appendChild(contact);

    footer.appendChild(inner);

    // Bottom bar
    var bottom = document.createElement('div');
    bottom.className = 'footer-bottom';
    bottom.innerHTML = 
      '<p class="footer-copy">© 2026 aimarketingstrategic.com</p>' +
      '<div class="footer-legal">' +
        '<a href="/privacy-policy.html" target="_blank" rel="noopener" style="font-family:\'Orbitron\',sans-serif;font-size:10px;color:rgba(191,219,254,.25);letter-spacing:.3em;text-transform:uppercase;text-decoration:none;transition:color .2s" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'rgba(191,219,254,.25)\'">Privacy</a>' +
        '<button onclick="openModal(\'terms-modal\')" style="font-family:\'Orbitron\',sans-serif;font-size:10px;color:rgba(191,219,254,.25);letter-spacing:.3em;text-transform:uppercase;background:none;border:none;cursor:pointer;transition:color .2s" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'rgba(191,219,254,.25)\'">Terms</button>' +
      '</div>';
    footer.appendChild(bottom);

    return footer;
  }

  // ─── REPLACE PLACEHOLDERS ────────────────────────────
  var navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.replaceWith(buildNav());

  var mobileTarget = document.getElementById('mobile-placeholder');
  if (mobileTarget) mobileTarget.replaceWith(buildMobileMenu());

  var footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.replaceWith(buildFooter());

})();