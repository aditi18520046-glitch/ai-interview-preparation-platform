import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
  const html = await page.$eval('#root', el => el.innerHTML);
  console.log('Dashboard HTML length:', html.length);
  
  await browser.close();
})();
