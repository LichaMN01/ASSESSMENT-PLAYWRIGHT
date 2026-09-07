import { type Locator, type Page } from '@playwright/test';

export class AdminPage {

private readonly adminLink: Locator;
private readonly corporateBrandingLink: Locator;
private readonly primaryColorLink: Locator;
private readonly hexInput: Locator;
private readonly publishButton: Locator;
private readonly clientLogoBrowser: Locator;
private readonly configurationLink: Locator;
private readonly localizationLink: Locator;
private readonly languageDropdown: Locator;
private readonly saveLanguageButton: Locator;


  constructor(readonly page: Page) {

    this.page = page;
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.corporateBrandingLink = page.getByText("Corporate Branding", { exact: true });
    this.primaryColorLink = page.locator("div.oxd-color-input.oxd-color-input--active").first();
    this.hexInput = page.locator('.oxd-color-picker input').last();
    this.publishButton = page.getByText("Publish", { exact: true });
    this.clientLogoBrowser = page.locator('input[type="file"]').first();
    this.configurationLink = page.getByText("Configuration", { exact: true });
    this.localizationLink = page.getByText("Localization", { exact: true });
    this.languageDropdown = page.locator("i.oxd-select-text--arrow").first();
    this.saveLanguageButton = page.getByText("Save", { exact: true });

  }
  

  async primaryColor(): Promise<void> {

    await this.adminLink.click();
//  await(this.page).waitForURL(/admin/); // Esperar a que la URL contenga "admin"
    await this.corporateBrandingLink.click();
//  await(this.page).waitForURL(/addTheme/); // Esperar a que la URL contenga "addTheme"
//  await this.primaryColorLink.waitFor({ state: "visible" }); // Esperar a que el elemento sea visible
    await this.primaryColorLink.click();
//  await this.hexInput.waitFor({ state: "visible" }); // Esperar a que el elemento sea visible
    await this.hexInput.fill("#826137");
//    await this.publishButton.waitFor({ state: "visible" }); // Esperar a que el elemento sea visible
    await this.publishButton.click();
//  await this.page.waitForTimeout(2000); // Esperar 2 segundos para que se aplique el cambio
  

  }
  async companyLogo(): Promise<void> {

   await this.adminLink.click();
//   await(this.page).waitForURL(/admin/);
   await this.corporateBrandingLink.click();
//   await(this.page).waitForURL(/addTheme/);
   await this.clientLogoBrowser.setInputFiles("tests/fixtures/file_example_JPG_2500kB.jpg"); // Cambia la ruta al archivo que deseas subir
//  
// await this.page.waitForTimeout(2000); // Esperar 2 segundos para que se aplique el cambio


  }


  async changeLanguage(): Promise<void> {

   await this.adminLink.click();
// await(this.page).waitForURL(/admin/);
   await this.configurationLink.click();   
// await(this.page).waitForTimeout(1000);
// await this.localizationLink.waitFor({ state: "visible" });
   await this.localizationLink.click();
// await this.languageDropdown.waitFor({ state: "visible" });
   await this.languageDropdown.click();
// await this.page.getByText("Chinese (Traditional, Taiwan)", { exact: false }).waitFor({ state: "visible" });
   await this.page.getByText("Chinese (Traditional, Taiwan)", { exact: false }).click();
// await this.page.waitForTimeout(2000);
   

  }
}
