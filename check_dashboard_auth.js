import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  // Set localStorage to simulate auth
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('auth-storage', JSON.stringify({
      state: {
        user: { id: '123', name: 'Test', email: 'test@test.com' },
        isAuthenticated: true
      }
    }));
  });
  
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
  const html = await page.$eval('#root', el => el.innerHTML);
  console.log('Dashboard HTML length:', html.length);
  
  await browser.close();
})();
