# AI Auto-Trade — Status Landing Page

## LIVE sekarang (sub-path main site)
URL aktif: https://aimarketingstrategic.com/auto-trade/
- HTTP 200 ✅ (verifikasi curl)
- Title: "AI Auto-Trade — Sistem Trading Otomatis XAUUSD (Emas) | AI Marketing Strategic"
- File: E:\ams-site\static\auto-trade\index.html
- Tag balance bersih (div/section/details/table/tr all OK)
- Deploy: git commit d859956 → GitHub Actions → FTP cPanel (mutlak 1-3 menit)

## Cara aktifkan SUBDOMAIN auto-trade.aimarketingstrategic.com
Subdomain BELUM aktif di DNS (curl balas 000). Untuk menyalakan di cPanel (Rumahweb):

1. Login cPanel di https://aimarketingstrategic.com/cpanel
2. Menu **Domains → Subdomains**
3. Subdomain: `auto-trade`, domain: `aimarketingstrategic.com`
4. Document Root: arahkan ke `public_html/auto-trade` (lookup, nanti sesuaikan)
5. Create — cPanel otomatis buat folder + DNS record `auto-trade.aimarketingstrategic.com → A`

Setelah DNS propagate (beberapa menit s/d beberapa jam), isi yang sama di
`static/auto-trade/index.html` akan live di subdomain karena path relatifnya sama
(css/js via `/css/...` — root).

Catatan: jika cPanel membuat folder public_html/auto-trade terpisah dari repo,
isi file index.html yang sama ke folder itu (atau salin isi static/auto-trade).

## Konten (jujur, tanpa janji profit)
- Hero: autopilot XAUUSD, multi-strategi, auto risk mgmt, LBD
- Fitur, arsitektur (MT5, teknikal, risk, LBD, telemetri)
- Tabel disiplin risiko (risk %, daily loss, BE, partial, cooldown, SL-eval)
- Cara penerapan, untuk siapa, FAQ
- Disclaimer risiko penuh (Bappebti, bukan ajakan/jaminan) + CTA ke WA

## Catatan Owl
Konten sengaja TANPA klaim profit karena sistem ini belum terbukti profitable
(sedang rugi). Menjual "robot ajaib yang dijamin cuan" = menyesatkan & melanggar
aturan Bappebti. Halaman ini menjual teknologi & disiplin risiko yang transparan.
