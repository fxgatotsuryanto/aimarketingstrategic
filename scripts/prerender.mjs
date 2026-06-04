import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

function createStaticServer(dir, port) {
  return new Promise((resolve, reject) => {
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript',
      '.mjs': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.mp4': 'video/mp4',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
    };

    const server = createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);

      if (!existsSync(filePath) || filePath === dir) {
        filePath = path.join(dir, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

const PORT = 4173;

console.log('Starting pre-render server...');
const server = await createStaticServer(distDir, PORT);

console.log('Launching headless browser...');
const browser = await puppeteer.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ],
  headless: true,
});

const page = await browser.newPage();

// Suppress console errors from the page to keep output clean
page.on('console', (msg) => {
  if (msg.type() === 'error') return;
});

console.log('Rendering page...');
await page.goto(`http://127.0.0.1:${PORT}/`, {
  waitUntil: 'networkidle0',
  timeout: 60000,
});

// Wait for React to mount its root content
await page.waitForSelector('#root > *', { timeout: 15000 });

// Additional wait for animations/deferred renders
await new Promise((r) => setTimeout(r, 2000));

const html = await page.content();

await browser.close();
server.close();

writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
console.log('Pre-rendering complete. dist/index.html updated with server-rendered HTML.');
