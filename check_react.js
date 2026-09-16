import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const rootHtml = await page.$eval('#root', el => el.innerHTML);
  console.log('Root HTML length:', rootHtml.length);
  if (rootHtml.length < 50) {
     console.log('Root content:', rootHtml);
     // Try to look for Vite error overlay
     try {
       const overlay = await page.evaluate(() => document.querySelector('vite-error-overlay')?.shadowRoot?.innerHTML);
       if (overlay) console.log('Vite Overlay:', overlay.substring(0, 500));
     } catch(e) {}
  }
  await browser.close();
})();
