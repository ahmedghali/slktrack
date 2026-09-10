import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../../playbook/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const BASE_URL = 'http://localhost:3000';

async function capture() {
  console.log('Launching Chrome browser for high-resolution captures...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  const waitReady = async (ms = 1500) => {
    await page.waitForTimeout(ms);
  };

  console.log('1. Capturing Landing page...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await waitReady(2000);
  await page.screenshot({ path: path.join(outputDir, '01_landing_hero.png') });

  console.log('2. Capturing Login page...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await waitReady(1200);
  await page.screenshot({ path: path.join(outputDir, '02_login_screen.png') });

  console.log('Logging in as Supervisor...');
  const supervisorBtn = await page.$('button:has-text("Supervisor")');
  if (supervisorBtn) {
    await supervisorBtn.click();
  } else {
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) await submitBtn.click();
  }
  await page.waitForURL('**/dashboard', { timeout: 8000 });
  await waitReady(2000);

  console.log('3. Capturing Dashboard (Light Mode)...');
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('slktrack_theme', 'light');
  });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '03_dashboard_light.png') });

  console.log('4. Capturing Dashboard (Dark Mode)...');
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('slktrack_theme', 'dark');
  });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '04_dashboard_dark.png') });

  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('slktrack_theme', 'light');
  });

  console.log('5. Capturing Equipment Inventory...');
  await page.goto(`${BASE_URL}/equipment`, { waitUntil: 'networkidle' });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '05_equipment_table.png') });

  console.log('6. Capturing Equipment Detail (PT-001 with full history)...');
  await page.goto(`${BASE_URL}/equipment/PT-001`, { waitUntil: 'networkidle' });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '06_equipment_detail.png') });

  console.log('7. Capturing Jobs Management...');
  await page.goto(`${BASE_URL}/jobs`, { waitUntil: 'networkidle' });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '07_jobs_management.png') });

  console.log('8. Capturing Tool String Builder...');
  await page.goto(`${BASE_URL}/tool-strings`, { waitUntil: 'networkidle' });
  await waitReady(2000);
  await page.screenshot({ path: path.join(outputDir, '08_toolstring_builder.png') });

  console.log('9. Capturing QR Scanner...');
  await page.goto(`${BASE_URL}/scan`, { waitUntil: 'networkidle' });
  await waitReady(1200);
  try {
    const simBtn = await page.$('button:has-text("Simulate Scan"), button:has-text("Simulate")');
    if (simBtn) {
      await simBtn.click();
      await waitReady(1000);
    }
  } catch (e) {
    console.log('Simulate scan note:', e.message);
  }
  await page.screenshot({ path: path.join(outputDir, '09_qr_scanner.png') });

  console.log('10. Capturing Missing Equipment Registry...');
  await page.goto(`${BASE_URL}/missing`, { waitUntil: 'networkidle' });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '10_missing_equipment.png') });

  console.log('11. Capturing Reports...');
  await page.goto(`${BASE_URL}/reports`, { waitUntil: 'networkidle' });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '11_reports_export.png') });

  console.log('12. Capturing Analytics...');
  await page.goto(`${BASE_URL}/analytics`, { waitUntil: 'networkidle' });
  await waitReady(2000);
  await page.screenshot({ path: path.join(outputDir, '12_analytics.png') });

  console.log('13. Capturing Regional Chief Console...');
  // Navigate to login to quick-login as Regional Chief
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await waitReady(800);
  const chiefBtn = await page.$('button:has-text("Regional Chief")');
  if (chiefBtn) {
    await chiefBtn.click();
    await page.waitForURL('**/dashboard', { timeout: 8000 });
  }
  await page.goto(`${BASE_URL}/regional-chief`, { waitUntil: 'networkidle' });
  await waitReady(1500);
  await page.screenshot({ path: path.join(outputDir, '13_regional_chief.png') });

  await browser.close();
  console.log('SUCCESS: All 13 authenticated high-resolution screenshots saved to', outputDir);
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
