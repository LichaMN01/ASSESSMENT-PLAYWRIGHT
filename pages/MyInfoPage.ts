import { type Page } from '@playwright/test';
import { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class MyInfoPage {
  static fileName = '';
private readonly myInfoLink: Locator;
private readonly downloadButton: Locator;
private readonly firstName: Locator;
private readonly middleName: Locator;
private readonly lastName: Locator;
private readonly saveButton: Locator;


  constructor(readonly page: Page) {
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
    this.downloadButton = page.locator('button.oxd-icon-button:has(i.bi-download)');
    this.saveButton = page.getByText("Save", { exact: true }).first();
    this.firstName = page.getByPlaceholder('First Name');   
    this.middleName = page.getByPlaceholder('Middle Name');
    this.lastName = page.getByPlaceholder('Last Name');
  }

  async downloadInfo(): Promise<void> {
//  await expect(this.myInfoLink).toBeVisible();
    await this.myInfoLink.click();
//  await expect(this.page).toHaveURL(/viewPersonalDetails\/empNumber\/1/);
    await this.downloadButton.scrollIntoViewIfNeeded();
//  await expect(this.downloadButton).toBeVisible();
    await this.downloadButton.click();
  }
  async verifyUser(): Promise<void> {

//  await expect(this.myInfoLink).toBeVisible();
  await this.myInfoLink.click();
//  await expect(this.page).toHaveURL(/viewPersonalDetails\/empNumber\/1/);
//  await expect(this.firstName).toBeVisible();
  await this.firstName.fill("Lisandro");
//  await expect(this.middleName).toBeVisible();
  await this.middleName.fill("Manuel");
//  await expect(this.lastName).toBeVisible();
  await this.lastName.fill  ("Nunzio");
  await this.saveButton.scrollIntoViewIfNeeded();
//  await expect(this.saveButton).toBeVisible();
  await this.saveButton.click();
  await this.page.reload();



  }
}
