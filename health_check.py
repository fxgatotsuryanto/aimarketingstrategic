import re, os, sys

static_dir = 'E:\\ams-site\\static'
pages = ['index.html', 'hasil.html', 'harga.html', 'tentang.html', 'kontak.html']
all_ok = True

for page in pages:
    path = os.path.join(static_dir, page)
    if not os.path.exists(path):
        print(f"[MISSING] {page} — file not found!")
        all_ok = False
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    lines = html.splitlines()
    size = len(html)
    
    # Tag balance
    section_open = len(re.findall(r'<section[\s>]', html))
    section_close = len(re.findall(r'</section>', html))
    div_open = len(re.findall(r'<div[\s>]', html))
    div_close = len(re.findall(r'</div>', html))
    a_open = len(re.findall(r'<a[\s>]', html))
    a_close = len(re.findall(r'</a>', html))
    button_open = len(re.findall(r'<button[\s>]', html))
    button_close = len(re.findall(r'</button>', html))
    
    # WA link
    wa_correct = '6281907552758' in html
    wa_old = '6281907552758' not in html
    wa_any = any(x in html for x in ['wa.me/', 'whatsapp.com/'])
    
    # Year check
    has_2026 = '2026' in html
    has_2025 = '2025' in html
    has_2024 = '2024' in html
    
    # Meta
    has_meta_desc = 'name="description"' in html or "name='description'" in html
    has_og_title = 'og:title' in html
    has_og_desc = 'og:description' in html
    has_viewport = 'viewport' in html
    
    # Internal links check (basic)
    internal_links = re.findall(r'href=["\'](https?://aimarketingstrategic\.com[^"\']*|/[^"\']*)["\']', html)
    broken = [l for l in internal_links if l.startswith('/') and not l.startswith('//')]
    
    # Issues
    issues = []
    if section_open != section_close:
        issues.append(f"section: {section_open} open / {section_close} close")
        all_ok = False
    if div_open != div_close:
        issues.append(f"div: {div_open} open / {div_close} close")
        all_ok = False
    if a_open != a_close:
        issues.append(f"a: {a_open} open / {a_close} close")
        all_ok = False
    if button_open != button_close:
        issues.append(f"button: {button_open} open / {button_close} close")
        all_ok = False
    if not wa_correct:
        issues.append("WA number WRONG or missing!")
        all_ok = False
    if not has_viewport:
        issues.append("MISSING viewport meta")
        all_ok = False
    if not has_meta_desc:
        issues.append("MISSING meta description")
        all_ok = False
    if not has_og_title or not has_og_desc:
        issues.append("MISSING OG tags")
        all_ok = False
    if has_2024:
        issues.append("Has stale 2024 year")
        all_ok = False
    if has_2025 and not has_2026:
        issues.append("Has 2025 but NOT 2026 (stale year)")
        all_ok = False
    
    status = "OK" if not issues else "ISSUES"
    print(f"\n[{status}] {page} ({size}B, {len(lines)} lines)")
    print(f"  Tags: section={section_open}/{section_close} div={div_open}/{div_close} a={a_open}/{a_close} button={button_open}/{button_close}")
    print(f"  WA: {'✓' if wa_correct else '✗'} | Viewport: {'✓' if has_viewport else '✗'} | Meta: {'✓' if has_meta_desc else '✗'} | OG: {'✓' if has_og_title and has_og_desc else '✗'}")
    print(f"  Year: {'2026' if has_2026 else 'NO-2026'} {'2025' if has_2025 else ''} {'2024' if has_2024 else ''}")
    if issues:
        print(f"  ISSUES: {'; '.join(issues)}")

if all_ok:
    print("\n✅ ALL PAGES HEALTHY — no issues found")
else:
    print(f"\n❌ ISSUES FOUND — see above")