import re, os, sys

static_dir = r"C:\Users\USER\Desktop\ams-site\static"
html_files = ['index.html', 'hasil.html', 'harga.html', 'tentang.html', 'kontak.html']

for f in html_files:
    print(f"=== {f} ===")
    path = os.path.join(static_dir, f)
    content = open(path, 'r', encoding='utf-8').read()
    
    # Tag balance check
    for tag in ['section', 'div', 'a', 'button', 'details', 'summary']:
        opens = len(re.findall(rf'<{tag}[^>]*>', content))
        closes = len(re.findall(rf'</{tag}>', content))
        if opens != closes:
            print(f'  {tag}: open={opens} close={closes} diff={opens-closes}')
    
    # WA links
    wa_links = re.findall(r'wa\.me/[^"\'\s>]+', content)
    for link in wa_links:
        if '6281907552758' not in link:
            print(f'  WA LINK ISSUE: {link}')
    
    # Meta tags
    for meta in ['<title>', 'name="description"', 'property="og:title"', 'property="og:description"', 'property="og:image"', 'property="og:url"', 'rel="canonical"']:
        if meta not in content:
            print(f'  META MISSING: {meta}')
    
    # Internal links
    links = re.findall(r'href="(/[^"\'#]*)', content)
    for link in links:
        clean = link.split('?')[0].split('#')[0]
        if clean == '/':
            continue
        if clean.endswith('/'):
            check = os.path.join(static_dir, clean.lstrip('/'), 'index.html')
        elif clean.endswith('.html'):
            check = os.path.join(static_dir, clean.lstrip('/'))
        else:
            check = os.path.join(static_dir, clean.lstrip('/'))
            if not os.path.exists(check):
                check = os.path.join(static_dir, clean.lstrip('/'), 'index.html')
        if not os.path.exists(check):
            print(f'  BROKEN INTERNAL LINK: {link}')
    
    # Check year in footer
    if '2026' not in content:
        print(f'  YEAR CHECK: 2026 not found in footer')
    
    # Check for alt text on images
    imgs = re.findall(r'<img[^>]*>', content)
    for img in imgs:
        if 'alt=' not in img:
            print(f'  MISSING ALT: {img[:100]}')
    
    print()