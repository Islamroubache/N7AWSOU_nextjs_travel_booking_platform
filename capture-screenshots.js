const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function captureScreenshots() {
  console.log('Starting screenshot capture...');
  const browser = await puppeteer.launch({ 
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: "new" 
  });
  const takeScreenshot = async (url, filename, selector) => {
    console.log(`Capturing ${filename}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    // Disable animations via CSS
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.addStyleTag({ content: `
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
      }
      .framer-motion-container, motion {
        opacity: 1 !important;
        transform: none !important;
      }
    ` });

    if (selector) {
      try {
        await page.waitForSelector(selector, { timeout: 10000 });
      } catch (e) {
        console.log(`Selector ${selector} timeout for ${filename}`);
      }
    }
    
    // Extra safety wait
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({ path: path.join(screenshotsDir, filename), fullPage: false });
    await page.close();
  };

  try {
    await takeScreenshot('http://localhost:3000', 'home.png', 'h1');
    await takeScreenshot('http://localhost:3000/offers', 'offers.png', 'h1');
    await takeScreenshot('http://localhost:3000/agencies', 'agencies.png', 'h1');
    await takeScreenshot('http://localhost:3000/login', 'login.png', 'input');

    console.log('Screenshots captured successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
