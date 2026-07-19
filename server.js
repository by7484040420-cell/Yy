// Remote Browser Streaming Server — Real Prototype
// User ke phone se, server pe chal rahe browser ko control karne ka core mechanism.
// Kaam kaise karta hai: server ek real browser chalata hai (Playwright se),
// har thodi der mein screenshot leta hai, use user ke phone pe bhejta hai.
// User jahan tap/type kare, wahi commands wapas server ko jaati hain,
// jo unhe real browser pe perform karta hai — bilkul jaisa phone se
// TeamViewer/remote-desktop use karte hain.

const http = require('http');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;
let browser, page;

async function startBrowser(startUrl) {
  browser = await chromium.launch();
  page = await browser.newPage({ viewport: { width: 480, height: 800 } });
  await page.goto(startUrl);
  console.log('✅ Remote browser session shuru hui:', startUrl);
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });
  res.end(JSON.stringify(data));
}
function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { resolve({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  if (req.method === 'OPTIONS') return sendJSON(res, 200, {});

  try {
    // ---- Get latest screenshot (frontend polls this repeatedly) ----
    if (parsed.pathname === '/screenshot' && req.method === 'GET') {
      if (!page) return sendJSON(res, 400, { error: 'Browser session shuru nahi hui' });
      const buf = await page.screenshot();
      res.writeHead(200, { 'Content-Type': 'image/png', 'Access-Control-Allow-Origin': '*' });
      return res.end(buf);
    }

    // ---- User tapped somewhere on the screen ----
    if (parsed.pathname === '/click' && req.method === 'POST') {
      const { x, y } = await readBody(req);
      await page.mouse.click(x, y);
      return sendJSON(res, 200, { ok: true });
    }

    // ---- User typed text (into whatever field is currently focused) ----
    if (parsed.pathname === '/type' && req.method === 'POST') {
      const { text } = await readBody(req);
      await page.keyboard.type(text);
      return sendJSON(res, 200, { ok: true });
    }

    // ---- Special keys like Tab, Enter, Backspace ----
    if (parsed.pathname === '/key' && req.method === 'POST') {
      const { key } = await readBody(req);
      await page.keyboard.press(key);
      return sendJSON(res, 200, { ok: true });
    }

    // ---- Serve the viewer frontend ----
    if (parsed.pathname === '/' || parsed.pathname === '/index.html') {
      const filePath = path.join(__dirname, 'viewer.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(fs.readFileSync(filePath));
    }

    sendJSON(res, 404, { error: 'Not found' });
  } catch (e) {
    sendJSON(res, 500, { error: e.message });
  }
});

const START_URL = process.argv[2] || 'file:///tmp/autofill-test/dummy-form.html';
startBrowser(START_URL).then(() => {
  server.listen(PORT, () => console.log(`Remote browser viewer: http://localhost:${PORT}`));
});
