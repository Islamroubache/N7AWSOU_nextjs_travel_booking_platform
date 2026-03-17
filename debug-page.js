const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: "new" 
  });
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGE ERROR STR:', err.toString()));
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
  });
  await page.goto('http://localhost:3000/offers', { waitUntil: 'networkidle0' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log('PAGE TEXT:', text);
  await browser.close();
})();
