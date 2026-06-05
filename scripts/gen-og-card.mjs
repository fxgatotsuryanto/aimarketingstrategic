import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../static/images');
mkdirSync(outDir, { recursive: true });

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;font-family:'Space Grotesk',sans-serif;background:#0B2A4A;display:flex;align-items:center;justify-content:center;overflow:hidden}
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
.card{width:100%;height:100%;padding:64px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative}
.glow{position:absolute;top:-120px;right:-80px;width:500px;height:500px;background:radial-gradient(circle,rgba(245,124,0,.25) 0%,transparent 70%);pointer-events:none}
.glow2{position:absolute;bottom:-100px;left:-60px;width:400px;height:400px;background:radial-gradient(circle,rgba(32,182,158,.15) 0%,transparent 70%);pointer-events:none}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,124,0,.15);border:1px solid rgba(245,124,0,.4);border-radius:100px;padding:6px 16px;margin-bottom:24px}
.badge-dot{width:8px;height:8px;background:#F57C00;border-radius:50%}
.badge-text{font-size:13px;font-weight:600;color:#F57C00;letter-spacing:.1em;text-transform:uppercase}
h1{font-family:'Orbitron',sans-serif;font-size:52px;font-weight:900;color:#fff;line-height:1.1;margin-bottom:20px;letter-spacing:.03em}
h1 span{color:#F57C00}
.sub{font-size:22px;color:rgba(255,255,255,.65);line-height:1.5;max-width:640px}
.bottom{display:flex;align-items:center;justify-content:space-between}
.pills{display:flex;gap:12px}
.pill{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:10px 20px;color:rgba(255,255,255,.8);font-size:15px;font-weight:600}
.pill strong{color:#F57C00}
.logo-text{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.15em;text-transform:uppercase}
</style>
</head>
<body>
<div class="card">
  <div class="glow"></div>
  <div class="glow2"></div>
  <div>
    <div class="badge"><div class="badge-dot"></div><span class="badge-text">AI Marketing Strategic</span></div>
    <h1>Sistem AI Bisnis<br><span>Done-for-You</span></h1>
    <p class="sub">Frontliner chat, follow-up otomatis, dan dashboard owner — terhubung ke WhatsApp. Setup 3 hari.</p>
  </div>
  <div class="bottom">
    <div class="pills">
      <div class="pill">Mulai <strong>Rp 1 juta</strong></div>
      <div class="pill">Infra <strong>Rp 100rb/bln</strong></div>
      <div class="pill">≈ <strong>Rp 3.300/hari</strong></div>
    </div>
    <div class="logo-text">aimarketingstrategic.com</div>
  </div>
</div>
</body>
</html>`;

const browser = await puppeteer.launch({
  args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'],
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
const screenshot = await page.screenshot({ type: 'png' });
await browser.close();

const outPath = path.join(outDir, 'og-card.png');
writeFileSync(outPath, screenshot);
console.log('OG card saved to', outPath);
