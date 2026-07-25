/* =============================================
   main.js — AI Marketing Strategic
   Consolidated site-wide JavaScript
   Merge of nav-footer.js + script.js + enhancements
   ============================================= */

(function () {
  'use strict';

  /* =============================================
     NAVIGATION — Data & Builders (React-style dark)
     Injects into #nav-placeholder, #mobile-placeholder,
     #footer-placeholder on page load
     ============================================= */

  var NAV_LINKS = [
    { href: '/harga.html',      label: 'Produk' },
    { href: '/tentang.html',    label: 'Tentang' },
    { href: '/hasil.html',      label: 'Hasil' },
    { href: '/blog/',           label: 'Blog' }
  ];

  var FOOTER_LINKS = [
    { href: '/harga.html',      label: 'Produk' },
    { href: '/tentang.html',    label: 'Tentang' },
    { href: '/hasil.html',      label: 'Hasil Nyata' },
    { href: '/blog/',           label: 'Blog' }
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

    var cta = document.createElement('button');
    cta.onclick = function () { trackLead(); openChat(); closeMenu(); };
    cta.textContent = 'AI Assessment Gratis';
    cta.style.cssText = 'width:100%;padding:14px;margin-top:16px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;font-weight:600;border-radius:10px;background:#F57C00;color:#fff';

    menu.appendChild(cta);

    var frag = document.createDocumentFragment();
    frag.appendChild(overlay);
    frag.appendChild(menu);
    return frag;
  }

  /** Build the site footer — Dark navy style */
  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';

    var inner = document.createElement('div');
    inner.className = 'footer-inner';

    // Brand column
    var brandDiv = document.createElement('div');
    brandDiv.innerHTML =
      '<img src="https://aimarketingstrategic.com/images/logo%20aims.png" alt="AI Marketing Strategic" height="48" style="margin-bottom:12px">' +
      '<p class="footer-desc">AI Business Operating System untuk UMKM Indonesia. Bukan chatbot biasa — sistem AI yang mengoperasikan WhatsApp, follow-up, CRM, dan dashboard bisnis Anda 24/7.</p>';
    inner.appendChild(brandDiv);

    // Menu column
    var menuDiv = document.createElement('div');
    menuDiv.innerHTML = '<div class="footer-col-title">Menu</div>';
    var menuUl = document.createElement('ul');
    menuUl.className = 'footer-links';
    FOOTER_LINKS.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      menuUl.appendChild(li);
    });
    menuDiv.appendChild(menuUl);
    inner.appendChild(menuDiv);

    // Produk column
    var produkDiv = document.createElement('div');
    produkDiv.innerHTML =
      '<div class="footer-col-title">Produk</div>' +
      '<ul class="footer-links">' +
        '<li><a href="/tools/">AI Tools</a></li>' +
        '<li><a href="/tools/ai-readiness-assessment.html">AI Readiness</a></li>' +
        '<li><a href="/tools/follow-up-playbook.html">Playbook Follow Up</a></li>' +
        '<li><a href="/tools/sop-kit-umkm.html">UMKM Kit</a></li>' +
      '</ul>';
    inner.appendChild(produkDiv);

    // Kontak column
    var kontakDiv = document.createElement('div');
    kontakDiv.innerHTML =
      '<div class="footer-col-title">Kontak</div>' +
      '<ul class="footer-links">' +
        '<li><a href="https://wa.me/6281907552758">0819-0755-2758</a></li>' +
        '<li><a href="mailto:hallo@aimarketingstrategic.com">hallo@aimarketingstrategic.com</a></li>' +
        '<li><a href="/kontak.html">Konsultasi Gratis</a></li>' +
      '</ul>';
    inner.appendChild(kontakDiv);

    footer.appendChild(inner);

    // Bottom bar
    var bottom = document.createElement('div');
    bottom.className = 'footer-bottom';
    bottom.innerHTML =
      '<p class="footer-copy">&copy; 2026 aimarketingstrategic.com</p>' +
      '<div style="display:flex;gap:24px">' +
        '<a href="/privacy-policy.html" style="font-size:11px;color:rgba(255,255,255,0.35);text-decoration:none">Privacy</a>' +
        '<button onclick="openModal(\'terms-modal\')" style="font-size:11px;color:rgba(255,255,255,0.35);background:none;border:none;cursor:pointer">Terms</button>' +
      '</div>';
    footer.appendChild(bottom);

    return footer;
  }

  // -- Inject into placeholders -- //
  var navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.replaceWith(buildNav());

  var mobileTarget = document.getElementById('mobile-placeholder');
  if (mobileTarget) mobileTarget.replaceWith(buildMobileMenu());

  var footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.replaceWith(buildFooter());

})();


/* =============================================
   MOBILE MENU — Toggle / Close (Light popup)
   ============================================= */

function toggleMenu() {
  var menu = document.getElementById('mobile-menu');
  var overlay = document.getElementById('mobile-overlay');
  if (menu) menu.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function closeMenu() {
  var menu = document.getElementById('mobile-menu');
  var overlay = document.getElementById('mobile-overlay');
  if (menu) menu.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}


/* =============================================
   SCROLL — Top, To Element, Smooth Anchors
   ============================================= */

function scrollTop(e) {
  if (e) e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navTo(e, id) {
  if (e) e.preventDefault();
  var el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}


/* =============================================
   MODALS — Open / Close / Overlay
   ============================================= */

function openModal(id) {
  var el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openChat() {
  openModal('chat-modal');
}


/* =============================================
   FORM HANDLING — Lead Form + Validation
   ============================================= */

/**
 * Fire GA4 and Facebook Pixel tracking events.
 * Called from CTA clicks and form submissions.
 */
function trackLead() {
  try {
    if (typeof fbq === 'function') fbq('track', 'Lead');
    if (typeof gtag === 'function') gtag('event', 'generate_lead', { event_category: 'CTA' });
  } catch (e) {
    // Silently fail — tracking is non-critical
  }
}

/**
 * Validate the lead form before submission.
 * Returns an array of error messages.  Empty = valid.
 */
function validateLeadForm() {
  var errors = [];
  var nama = document.getElementById('lf-nama');
  var wa   = document.getElementById('lf-wa');
  var kebutuhan = document.getElementById('lf-kebutuhan');

  // Nama — required, min 2 chars
  if (!nama || !nama.value.trim() || nama.value.trim().length < 2) {
    errors.push('Nama harus diisi (minimal 2 karakter)');
  }

  // WA — required, Indonesian mobile number
  if (!wa || !wa.value.trim()) {
    errors.push('Nomor WhatsApp harus diisi');
  } else {
    var waClean = wa.value.trim().replace(/\s+/g, '');
    if (!/^08\d{8,12}$/.test(waClean) && !/^628\d{8,12}$/.test(waClean)) {
      errors.push('Nomor WhatsApp tidak valid (mulai dengan 08, min 10 digit)');
    }
  }

  // Kebutuhan — must select an option with non-empty value
  if (!kebutuhan || !kebutuhan.value) {
    errors.push('Pilih kebutuhan bisnis Anda');
  }

  return errors;
}

/**
 * Submit lead form — validate, track, send via WA deep-link.
 */
function submitLeadForm(e) {
  e.preventDefault();

  // Validate
  var errors = validateLeadForm();
  if (errors.length > 0) {
    // Show first error
    var errEl = document.getElementById('form-error');
    if (errEl) {
      errEl.textContent = errors[0];
      errEl.style.display = 'block';
    }
    return;
  }

  // Hide any prior error
  var errEl = document.getElementById('form-error');
  if (errEl) errEl.style.display = 'none';

  var btn = document.getElementById('formBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Mengirim…';
  }

  var nama      = document.getElementById('lf-nama').value.trim();
  var wa        = document.getElementById('lf-wa').value.trim();
  var kebutuhan = document.getElementById('lf-kebutuhan').value;
  var bisnis    = document.getElementById('lf-bisnis') ? document.getElementById('lf-bisnis').value.trim() : '';

  // Fire tracking
  trackLead();
  try {
    if (typeof fbq === 'function') fbq('track', 'Contact');
  } catch (_) {}

  // Send via WhatsApp deep-link (works always, no server needed)
  var pesan = encodeURIComponent(
    'Halo, saya ' + nama + ' ingin info sistem AI.\n' +
    'Kebutuhan: ' + kebutuhan +
    (bisnis ? '\nBisnis: ' + bisnis : '') +
    '\nNo WA: ' + wa
  );

  // Show success state immediately, open WA in background
  var wrap = document.getElementById('form-wrap');
  if (wrap) wrap.style.display = 'none';

  var success = document.getElementById('form-success');
  if (success) success.style.display = 'block';

  setTimeout(function () {
    window.open('https://wa.me/6281907552758?text=' + pesan, '_blank');
  }, 600);
}


/* =============================================
   DEMO SIMULATOR — Interactive WhatsApp Demo
   ============================================= */

var SCENARIOS = {
  properti: {
    botName: 'AI Frontliner — Properti',
    messages: [
      { type: 'user', text: 'Halo, saya lihat iklan rumah di Antapani. Harganya berapa?' },
      { type: 'typing', delay: 800 },
      { type: 'bot', text: '👋 Halo! Selamat datang.\n\nUntuk info harga terkini, boleh saya tanya dulu:\n1️⃣ Budget yang disiapkan?\n2️⃣ Untuk keluarga berapa orang?\n\nSaya carikan unit yang paling sesuai!' },
      { type: 'user', text: 'Budget 500 juta, untuk 4 orang', delay: 1200 },
      { type: 'typing', delay: 1000 },
      { type: 'bot', text: '✅ Ada 2 unit cocok untuk Anda:\n\n🏡 Tipe 36/72 — Rp 485 juta\n• 2 kamar tidur, KPR BTN ready\n\n🏡 Tipe 45/90 — Rp 520 juta\n• 3 kamar tidur, cocok 2 anak\n\nMau saya kirim brosur lengkapnya?' },
      { type: 'user', text: 'Mau dong!', delay: 1000 },
      { type: 'typing', delay: 600 },
      { type: 'bot', text: '📄 Brosur terkirim!\n\nAgen kami akan hubungi Anda dalam 10 menit untuk jadwal survey gratis 🏠' }
    ]
  },
  klinik: {
    botName: 'AI Frontliner — Klinik',
    messages: [
      { type: 'user', text: 'Dok, bisa konsultasi gigi hari ini?' },
      { type: 'typing', delay: 700 },
      { type: 'bot', text: '👋 Halo! Selamat datang di Klinik.\n\nUntuk jadwal konsultasi gigi, ada slot tersedia:\n\n⏰ Hari ini: 14.00 & 16.30 WIB\n⏰ Besok: 09.00, 11.00, 15.00 WIB\n\nJam berapa yang paling nyaman?' },
      { type: 'user', text: 'Jam 14.00 bisa', delay: 1000 },
      { type: 'typing', delay: 800 },
      { type: 'bot', text: '✅ Slot 14.00 hari ini dikonfirmasi!\n\nBoleh saya catat:\n1️⃣ Nama lengkap?\n2️⃣ Keluhan utama?\n\nReminder otomatis akan dikirim 1 jam sebelumnya 🦷' },
      { type: 'user', text: 'Andi, sakit gigi geraham kiri', delay: 1200 },
      { type: 'typing', delay: 600 },
      { type: 'bot', text: '📋 Tercatat!\n\nAndi — Konsultasi gigi 14.00 hari ini.\nDokter: drg. Sarah\n\nSampai jumpa! 😊' }
    ]
  },
  toko: {
    botName: 'AI Frontliner — Toko Online',
    messages: [
      { type: 'user', text: 'Kak, sepatu size 42 masih ada stok?' },
      { type: 'typing', delay: 600 },
      { type: 'bot', text: '👟 Halo! Terima kasih udah mampir!\n\nUntuk size 42, masih tersedia:\n✅ Putih — 3 pcs\n✅ Hitam — 1 pcs (hampir habis!)\n❌ Navy — habis\n\nMau yang warna apa?' },
      { type: 'user', text: 'Yang hitam masih ada? Berapa harganya?', delay: 1000 },
      { type: 'typing', delay: 700 },
      { type: 'bot', text: '🔥 Hitam size 42 masih 1 pcs!\n\nHarga: Rp 285.000\n(Sudah termasuk ongkir Jabodetabek)\n\nMau langsung order? Nanti saya buatkan link pembayaran 🛒' },
      { type: 'user', text: 'Iya mau order sekarang', delay: 900 },
      { type: 'typing', delay: 500 },
      { type: 'bot', text: '✅ Siap! Stok sudah dicadangkan.\n\n📦 Kirim link order ke WhatsApp ini ya.\nEstimasi pengiriman: 1-2 hari kerja 🚀' }
    ]
  },
  b2b: {
    botName: 'AI Frontliner — B2B',
    messages: [
      { type: 'user', text: 'Halo, kami butuh jasa cleaning kantor. Bisa survey dulu?' },
      { type: 'typing', delay: 800 },
      { type: 'bot', text: '👋 Halo! Terima kasih telah menghubungi kami.\n\nUntuk layanan cleaning kantor, boleh info:\n1️⃣ Luas area (m²)?\n2️⃣ Kota/lokasi kantor?\n3️⃣ Frekuensi: harian/mingguan/bulanan?' },
      { type: 'user', text: 'Sekitar 500m2, di Bandung, mingguan', delay: 1200 },
      { type: 'typing', delay: 900 },
      { type: 'bot', text: '📊 Estimasi untuk kebutuhan Anda:\n\n✅ Area 500m² — Bandung\n✅ Cleaning mingguan (4x/bulan)\n💰 Estimasi: Rp 1,8 – 2,2 juta/bulan\n\nMau jadwalkan survey gratis untuk penawaran pasti?' },
      { type: 'user', text: 'Bisa, kapan bisa survey?', delay: 1000 },
      { type: 'typing', delay: 600 },
      { type: 'bot', text: '📅 Tim survey tersedia:\n• Besok: 10.00 atau 14.00 WIB\n• Lusa: 09.00 atau 13.00 WIB\n\nSlot mana yang cocok? Konfirmasi sekarang sebelum penuh ✅' }
    ]
  }
};

var currentIndustry = 'properti';
var isPlaying = false;
var demoTimeouts = [];

function selectIndustry(btn) {
  document.querySelectorAll('.ind-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  currentIndustry = btn.dataset.ind;
  var nameEl = document.getElementById('bot-name');
  if (nameEl) nameEl.textContent = SCENARIOS[currentIndustry].botName;
  resetDemo();
}

function resetDemo() {
  demoTimeouts.forEach(clearTimeout);
  demoTimeouts = [];
  isPlaying = false;
  var chat = document.getElementById('phone-chat');
  if (chat) {
    chat.innerHTML = '<div class="typing-bubble" id="typing-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  }
  var btn = document.getElementById('demo-run-btn');
  if (btn) {
    btn.disabled = false;
    btn.textContent = '▶ Mulai Simulasi';
  }
}

function runDemo() {
  if (isPlaying) return;
  resetDemo();
  isPlaying = true;
  var btn = document.getElementById('demo-run-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏸ Sedang Berjalan...';
  }
  var msgs = SCENARIOS[currentIndustry].messages;
  var delay = 0;

  msgs.forEach(function (msg, i) {
    if (msg.type === 'typing') {
      var d = delay;
      demoTimeouts.push(setTimeout(function () {
        var tb = document.getElementById('typing-bubble');
        if (tb) tb.classList.add('show');
        scrollChat();
      }, d));
      delay += msg.delay || 800;
      demoTimeouts.push(setTimeout(function () {
        var tb = document.getElementById('typing-bubble');
        if (tb) tb.classList.remove('show');
      }, delay));
    } else {
      var d2 = delay + (i === 0 ? 0 : 1200);
      delay = d2;
      // Capture msg in closure via IIFE
      (function (m, d) {
        demoTimeouts.push(setTimeout(function () {
          addMessage(m.type, m.text);
        }, d));
      })(msg, d2);
    }
  });

  demoTimeouts.push(setTimeout(function () {
    isPlaying = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = '↺ Putar Ulang';
    }
  }, delay + 1500));
}

function addMessage(type, text) {
  var chat = document.getElementById('phone-chat');
  if (!chat) return;
  var typing = document.getElementById('typing-bubble');
  var div = document.createElement('div');
  div.className = 'chat-msg ' + (type === 'bot' ? 'bot' : 'user');
  div.innerHTML = '<div>' + text.replace(/\n/g, '<br>') + '</div><div class="chat-time">Selesai</div>';
  chat.insertBefore(div, typing);
  scrollChat();
}

function scrollChat() {
  var c = document.getElementById('phone-chat');
  if (c) {
    setTimeout(function () { c.scrollTop = c.scrollHeight; }, 50);
  }
}


/* =============================================
   SCROLL ANIMATIONS — IntersectionObserver
   Triggers fade-up for .fade-up, .stagger-*
   and .reveal elements when they enter viewport
   ============================================= */

(function initScrollAnimations() {
  var animEls = document.querySelectorAll('.fade-up, .stagger-1, .stagger-2, .stagger-3, .stagger-4, .reveal');
  if (animEls.length === 0) return;

  // Pause CSS animations until observed
  animEls.forEach(function (el) {
    el.style.animationPlayState = 'paused';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animEls.forEach(function (el) {
    observer.observe(el);
  });
})();


/* =============================================
   SMOOTH SCROLL — Anchor Links
   Intercepts same-page anchor clicks for
   smooth scrolling via scrollIntoView
   ============================================= */

(function initSmoothAnchors() {
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href^="#"]');
    if (!target) return;

    var id = target.getAttribute('href').slice(1); // strip '#'
    if (!id) return;

    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();


/* =============================================
   EVENT LISTENERS — Modals, Scroll-to-top
   ============================================= */

// -- Close modals on overlay click -- //
document.querySelectorAll('.modal-overlay').forEach(function (m) {
  m.addEventListener('click', function (e) {
    if (e.target === m) {
      m.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// -- Scroll-to-top button visibility -- //
(function initScrollTopBtn() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });
})();


/* =============================================
   CLOSE MOBILE MENU ON OUTSIDE CLICK
   Fallback for pages with inline mobile menus
   ============================================= */

document.addEventListener('click', function (e) {
  var menu = document.getElementById('mobile-menu');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target) && !e.target.closest('.header-hamburger')) {
    closeMenu();
  }
});