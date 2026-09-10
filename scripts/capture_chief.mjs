import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../../playbook/images/13_regional_chief.png');

async function run() {
  console.log('Launching browser for Chief...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const chiefBtn = await page.$('button:has-text("Regional Chief")');
  if (chiefBtn) {
    console.log('Clicking Regional Chief quick login...');
    await chiefBtn.click();
    await page.waitForURL('**/dashboard', { timeout: 8000 });
  }
  
  console.log('Navigating to /regional-chief...');
  await page.goto('http://localhost:3000/regional-chief', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: outputPath });
  console.log('Screenshot saved to', outputPath);
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
