import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(readonly page: Page) {}

  async performLogin(username = 'Admin', password = 'Admin@1234'): Promise<void> {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
   // await expect(this.page).toHaveURL(/dashboard/);
  }
}
