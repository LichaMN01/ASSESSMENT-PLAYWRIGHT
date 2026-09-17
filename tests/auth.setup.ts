import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
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

  await page.context().storageState({ path: authFile });
});