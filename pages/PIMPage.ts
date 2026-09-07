import { expect, Locator, type Page } from '@playwright/test';

export class PIMPage {
  private readonly PIMLink: Locator;
  private readonly PimReportLink: Locator;
  private readonly seachReportInput: Locator;
  private readonly seachReportButton: Locator;
  private readonly PimEmpLink: Locator;
  private readonly EmpList: Locator;
  private readonly searchEmpIdinput: Locator;
  private readonly searchEmpButton: Locator;

  constructor(readonly page: Page) {

    this.page = page;
    this.PIMLink = page.getByRole('link', { name: 'PIM' });
    this.PimReportLink = page.getByText("Reports");
    this.seachReportInput = page.locator("//input[@placeholder='Type for hints...']");
    this.seachReportButton = page.locator("//button[@type='submit']");
    this.PimEmpLink = page.getByText("Employee List");
    this.EmpList = page.locator('a.oxd-table orangehrm-employee-list');
    this.searchEmpIdinput = page.locator('.oxd-input-group:has-text("Employee Id") input');
   // this.searchEmpIdinput = page.locator("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]//input");
    this.searchEmpButton = page.locator("//button[@type='submit']");
  }

  async verifyEmp(id: string): Promise<void> {
  //  console.log("ID RECIBIDO EN verifyEmp:", id);

   // await expect(this.searchEmpIdinput).toBeVisible();
    await this.searchEmpIdinput.fill(id);
    await this.searchEmpButton.click();

  //  console.log(
    //    "VALOR INGRESADO EN INPUT:",
        await this.searchEmpIdinput.inputValue()
   // );
  } 

  async getEmpList(): Promise<void> {
 // await expect(this.PIMLink).toBeVisible();
  await this.PIMLink.dblclick();
 // await this.page.waitForTimeout(1000);   
  await this.PimEmpLink.dblclick();
  await this.page.waitForTimeout(10000);
 // await expect(this.page).toHaveURL(/viewEmployeeList/);
  }


  async searchReport(): Promise<void> {
    
  //  await expect(this.PIMLink).toBeVisible();
    await this.PIMLink.dblclick();
 //   await this.page.waitForTimeout(1000); // Wait for 1 second to ensure the page has loaded
 //   await expect(this.page).toHaveURL(/pim/); // Verify that the URL contains "pim"
    await this.PimReportLink.dblclick();
 //   await this.page.waitForTimeout(1000);
 //   await expect(this.page).toHaveURL(/viewDefinedPredefinedReports/); // Verify that the URL contains "viewEmployeeList"
    await this.seachReportInput.fill('invalid');
    await this.seachReportButton.dblclick();
  }


}
