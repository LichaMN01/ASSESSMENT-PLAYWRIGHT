import { chromium } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

async function globalSetup() {
  const browser = await chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto(
    'https://yakshahrm.makemylabs.in/orangehrm-5.7/web/index.php/auth/login',
    {
      waitUntil: 'commit',
      timeout: 60000,
    }
  );

  const loginPage = new LoginPage(page);

  await loginPage.performLogin();

  await page.waitForURL(/dashboard/, { timeout: 60000 });

  await context.storageState({
    path: 'playwright/.auth/user.json',
  });

  await browser.close();
}

export default globalSetup;