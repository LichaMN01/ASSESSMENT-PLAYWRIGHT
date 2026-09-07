import { type Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { Locator } from '@playwright/test';

export class LeavePage {

 private readonly LeaveLink: Locator;
 private readonly assignLeaveLink: Locator;
 private readonly assignButton: Locator;


  constructor(readonly page: Page) {
    this.page = page;
    this.LeaveLink = page.getByRole('link', { name: 'Leave' });
    this.assignLeaveLink = page.getByText("Assign Leave");
    this.assignButton = page.getByText("Assign", { exact: true });

  }

  async verifyLeaveField(): Promise<void> {

//  await expect(this.LeaveLink).toBeVisible();
    await this.LeaveLink.click();
//  await expect(this.page).toHaveURL(/viewLeaveList/);
//  await expect(this.assignLeaveLink).toBeVisible();
    await this.assignLeaveLink.click();
//  await expect(this.page).toHaveURL(/assignLeave/);
//  await expect(this.assignButton).toBeVisible();
    await this.assignButton.click(); 

  }
}
