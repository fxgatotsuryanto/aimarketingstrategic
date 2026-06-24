"""
Helper: scan blog/ folder, rebuild the posts grid in index.html.
Run after writing a new .html post file.
"""
import os, re
from pathlib import Path
from datetime import datetime

BLOG_DIR = Path(__file__).parent
INDEX_FILE = BLOG_DIR / "index.html"

SKIP = {"index.html", "_template.html"}

def extract_meta(filepath):
    html = filepath.read_text(encoding="utf-8")
    def meta(name, attr="content"):
        m = re.search(rf'<meta[^>]+(?:name|property)="{re.escape(name)}"[^>]+{attr}="([^"]+)"', html)
        if not m:
            m = re.search(rf'<meta[^>]+{attr}="([^"]+)"[^>]+(?:name|property)="{re.escape(name)}"', html)
        return m.group(1) if m else ""

    title_m = re.search(r'<title>(.+?) — AI Marketing Strategic</title>', html)
    title = title_m.group(1) if title_m else filepath.stem

    cat_m = re.search(r'<div class="post-cat">([^<]+)</div>', html)
    category = cat_m.group(1).strip() if cat_m else "Artikel"

    date_m = re.search(r'"datePublished":\s*"(\d{4}-\d{2}-\d{2})', html)
    date_str = date_m.group(1) if date_m else "2026-01-01"

    desc = meta("description")
    read_m = re.search(r'(\d+) menit baca', html)
    read_time = read_m.group(1) if read_m else "5"

    return {
        "title": title,
        "slug": filepath.stem,
        "category": category,
        "date": date_str,
        "excerpt": desc[:160] + "..." if len(desc) > 160 else desc,
        "read_time": read_time,
    }

def date_sort_key(meta):
    try:
        return datetime.strptime(meta["date"], "%Y-%m-%d")
    except:
        return datetime.min

def format_date_id(date_str):
    try:
        d = datetime.strptime(date_str, "%Y-%m-%d")
        months = ["","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"]
        return f"{d.day} {months[d.month]} {d.year}"
    except:
        return date_str

def build_card(m):
    return f"""    <article class="blog-card">
      <div class="blog-card-body">
        <div class="blog-card-cat">{m['category']}</div>
        <h3 class="blog-card-title"><a href="/blog/{m['slug']}.html">{m['title']}</a></h3>
        <p class="blog-card-excerpt">{m['excerpt']}</p>
        <div class="blog-card-meta">
          <span>{format_date_id(m['date'])}</span>
          <span>·</span>
          <span>{m['read_time']} menit baca</span>
        </div>
        <a href="/blog/{m['slug']}.html" class="blog-card-read">
          Baca Artikel
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>"""

def main():
    posts = []
    for f in BLOG_DIR.glob("*.html"):
        if f.name in SKIP:
            continue
        try:
            posts.append(extract_meta(f))
        except Exception as e:
            print(f"Skip {f.name}: {e}")

    posts.sort(key=date_sort_key, reverse=True)

    if posts:
        cards_html = "\n".join(build_card(p) for p in posts)
    else:
        cards_html = """    <div class="blog-empty">
      <h3>Artikel segera hadir</h3>
      <p>Kami sedang menyiapkan konten berkualitas untuk kamu.</p>
    </div>"""

    index_html = INDEX_FILE.read_text(encoding="utf-8")
    # Replace everything between <!-- POSTS_PLACEHOLDER --> or existing cards
    new_html = re.sub(
        r'<!-- POSTS_PLACEHOLDER -->.*?(?=\s*</div>\s*</section>)',
        cards_html,
        index_html,
        flags=re.DOTALL
    )
    if new_html == index_html:
        # Fallback: replace grid contents
        new_html = re.sub(
            r'(<div class="blog-grid" id="blog-grid">).*?(</div>\s*</section>)',
            rf'\g<1>\n{cards_html}\n  \g<2>',
            index_html,
            flags=re.DOTALL
        )

    INDEX_FILE.write_text(new_html, encoding="utf-8")
    print(f"Index updated: {len(posts)} posts")
    for p in posts[:5]:
        print(f"  - [{p['date']}] {p['title'][:55]}")

if __name__ == "__main__":
    main()
