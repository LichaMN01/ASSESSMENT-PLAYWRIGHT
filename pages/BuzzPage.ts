import { expect, type Locator, type Page } from '@playwright/test';

export class BuzzPage {
  private readonly buzzLink: Locator;
 
  private readonly buzzPost: Locator;
  private readonly postMenuButton: Locator;
  private readonly deletepostButton: Locator;
  private readonly yesDeleteButton: Locator;
  private readonly deleteDialog: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.buzzLink = page.getByRole('link', { name: 'Buzz' });
    this.buzzPost = page.locator(".orangehrm-buzz-post").first();
    this.postMenuButton = this.buzzPost.locator(".orangehrm-buzz-post-header-config button");
    this.deletepostButton = page.getByText("Delete Post", { exact: true });
    this.deleteDialog = page.locator(".orangehrm-dialog-popup");
    this.yesDeleteButton = this.deleteDialog.locator(
    "button.oxd-button--label-danger");
    
  }

  async delete(): Promise<void> {

    await this.buzzLink.dblclick();
   // await expect(this.page).toHaveURL(/buzz/); // Verify that the URL contains "buzz"
    await this.buzzPost.waitFor({ state: "visible" });
    await this.postMenuButton.click();
    await this.deletepostButton.click();
    
     // Esperar a que aparezca el popup
   // await expect(this.deleteDialog).toBeVisible();

     // Buscar botón Yes, Delete
    await expect(this.yesDeleteButton).toBeVisible();

    await this.yesDeleteButton.click();



  }

  

}
