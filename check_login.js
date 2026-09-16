import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  const rootHtml = await page.$eval('#root', el => el.innerHTML);
  console.log('Login HTML length:', rootHtml.length);
  
  await page.goto('http://localhost:3000/signup', { waitUntil: 'networkidle0' });
  const signupHtml = await page.$eval('#root', el => el.innerHTML);
  console.log('Signup HTML length:', signupHtml.length);
  
  await browser.close();
})();
