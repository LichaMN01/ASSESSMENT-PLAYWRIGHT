import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AdminPage } from "../pages/AdminPage";
import { LeavePage } from "../pages/LeavePage";
import { MyInfoPage } from "../pages/MyInfoPage";
import { BuzzPage } from "../pages/BuzzPage";
import { PIMPage } from "../pages/PIMPage";
import * as fs from "fs";
import * as path from "path";
import { verify, Verify } from "crypto";

const data = JSON.parse(JSON.stringify(require("../Data/testData.json")));
let id: any

test.describe("Yaksha", () => {
    let loginPage: LoginPage;
    let myInfoPage: MyInfoPage;
    let adminPage: AdminPage;
    let leavePage: LeavePage;
    let buzzPage: BuzzPage;
    let pimPage: PIMPage;

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto("https://yakshahrm.makemylabs.in/orangehrm-5.7/web/index.php/auth/login", {
    waitUntil: "domcontentloaded",
  });
  loginPage = new LoginPage(page);
  myInfoPage = new MyInfoPage(page);
  adminPage = new AdminPage(page);
  leavePage = new LeavePage(page);
  buzzPage = new BuzzPage(page);
  pimPage = new PIMPage(page);
  await loginPage.performLogin();
});

test("TS-1: Verify 'Delete Post' Functionality", async ({ page }) => {
    await buzzPage.delete();
    await Verifydelete(page);
})

test("TS-2: Verify 'invalid' message on direct report search", async ({ page }) => {
  await pimPage.searchReport();
  await verifysearchReport(page);
});

test("TS-3 Verify Employee List could be retrieved", async ({ page }) => {
  await pimPage.getEmpList();
  await VerifyGetEmplist(page);
});

test("TS-4 Verify Employee List Search functionality", async ({ page }) => {
  
  await verifyVerEmp1(page);
  const id = await verifyVerEmp1(page);
  await pimPage.verifyEmp(id);
  await verifyVerEmp2(page);
});

test("TS-5 Verify Primary Colour of corporate branding could be changed", async ({ page }) => {
    await adminPage.primaryColor(); // returns the style string of the primary color
    await VerifyPrimaryColorStyle(page);
});

test("TS-6 verify client logo could not be uploaded", async ({ page }) => {
  await adminPage.companyLogo(); // perform upload
    await verifyCompanyLogo(page);
});

test("TS-7 Verify Language change Functionality", async ({ page }) => {
    await adminPage.changeLanguage(); // Perform language change
    await verifyChangeLanguage(page);
});

test("TS-8 Verify Required Field Error in Leaves", async ({ page }) => {
  await leavePage.verifyLeaveField(); // Trigger required field validation
  await verifyleaveField(page);
});

test("TS-9 Verify My info Download Functionality", async ({ page }) => {
  await myInfoPage.downloadInfo();    // Download the file and returns its name
  await verifyDownloadInfo(page);     // Verify the file was downloaded successfully
});

test("TS-10 Verify User details could be Updated", async ({ page }) => {
    await myInfoPage.verifyUser();          // Fill and save user details
    await assertUserDetailsUpdated(page);   // Assertion helper checks values
});

/*
-------------------------------------------- helper methods --------------------------------------------------
*/

// verify function for TS-1
async function Verifydelete(page: Page) {
    const deleteConfirmText = await page.locator("//p[@class='oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text']").first().textContent();
    const actualText = await page.locator("//p[contains(@class, 'toast-message') and text()='Successfully Deleted']").textContent();
    expect(deleteConfirmText).toContain(actualText);
}

// verify function for TS-2
async function verifysearchReport(page: Page) {
    const msg = await page.locator("span.oxd-input-group__message").innerText();
    expect(msg).toBe("Invalid");
}

// verify function for TS-3
async function VerifyGetEmplist(page: Page) {
    const actualEmplListElement = await page.locator("div.oxd-table-row");
    await expect(actualEmplListElement.first()).toBeVisible();
    const employeeCount = await actualEmplListElement.count();
    expect(employeeCount).toBeGreaterThan(1);
    console.log(`Employee list retrieved successfully: ${employeeCount}`);
}

// verify function for TS-4-1
async function verifyVerEmp1(page: Page) {
    await page.locator("//span[text()='PIM']").dblclick();
    await page.locator("//a[text()='Employee List']").dblclick();
    await page.waitForTimeout(10000);
    const list1 = await page
    .locator("div.oxd-table-body div.oxd-table-row div:nth-child(2)")
    .allInnerTexts();
    id = list1.find(text => text.trim() !== "") ?? "defaultId";
    console.log("ID OBTENIDO DE LA LISTA:", id);
    return id;
}

// verify function for TS-4-2
async function verifyVerEmp2(page: Page) {
      const employeeRow = page.locator(
        `//div[contains(@class,'oxd-table-body')]//div[contains(@class,'oxd-table-row')]`
    );

    await expect(employeeRow).toHaveCount(1);
    await expect(employeeRow).toContainText(id);

    console.log(`Empleado encontrado correctamente con ID: ${id}`);

}

// verify function for TS-5
async function VerifyPrimaryColorStyle(page: Page) {
  const actualStyle = await page.locator("//div[@class='oxd-color-input-preview']").first();
  if (actualStyle) {
    expectPrimaryColorStyle(await actualStyle.getAttribute("style") ?? ""); // assert en helper function
  } else {
    throw new Error("actualStyle is null");
  }
}

// verify function for TS-6
async function verifyCompanyLogo(page: Page) {
    const actualMessage = await page.locator("span.oxd-input-group__message").innerText();
    expect(actualMessage).toBe("Attachment Size Exceeded");
}

// verify function for TS-7
async function verifyChangeLanguage(page: Page) {
    const expectedLang = [
        "Chinese (Traditional, Taiwan) - 中文（繁體，台灣）"
    ];

    const actualLang = await page.locator("//div[@class='oxd-select-text-input']").nth(0).textContent();
    expect(actualLang?.trim()).toBe(expectedLang[0].trim()); // compara primer elemento
    expect(expectedLang[0]).not.toBe(""); // asegura que no esté vacío
    console.log(expectedLang[0]);

    // Reset back to English
    await page.locator("//div[@class='oxd-select-text oxd-select-text--active']").nth(0).click();
    await page.locator("//div[@role='listbox']//span[contains(normalize-space(.), 'English (United States)')]").click();
    await page.locator("//button[text()=' Save ' or text()=' 儲存 ']").click();
    await page.waitForTimeout(2000);
}

// verify function for TS-8
async function verifyleaveField(page: Page) {
  const errorMsg = await page.locator("//span[text()='Required']").allInnerTexts();
  expect(errorMsg).toContain("Required");
}

// verify function for TS-9
async function verifyDownloadInfo(page: Page) {
    const fileName = MyInfoPage.fileName;
    if (fileName === "sample_upload.pdf") {
        expect(true).toBeFalsy();
    }
    const fileExists = fs.existsSync(path.resolve(fileName));  // Check if the file exists in expected directory
    expect(fileExists).toBe(true);
}

// utils/assertHelpers.ts
async function assertSortedListDescending(actualList: string[]) {
  for (let i = 0; i < actualList.length - 1; i++) {
    if (actualList[i].localeCompare(actualList[i + 1]) < 0) {
      throw new Error(
        `List is not sorted in descending order at index ${i}: '${actualList[i]}' < '${actualList[i + 1]}'`
      );
    }
  }
}

function expectPrimaryColorStyle(actual: string) {
  const expected = "background-color: rgb(130, 97, 55); opacity: 1; cursor: pointer;";
  expect(actual.trim()).toBe(expected);
}

// verify function for TS-10
async function assertUserDetailsUpdated(page: Page) {
  await page.waitForTimeout(2000);
  await expect(page.locator('input[name="firstName"]')).toHaveValue(data.VerifyUser.firstName);
}

// utils/assertHelpers.ts
async function assertLanguage(page: Page, actualLang: string) {
  expect(actualLang.trim()).toBe("Chinese (Traditional, Taiwan) - 中文 (繁體, 台灣)");
}

async function assertLeaveAssignErrorMessage(page: Page, ErrorMsg: string) {
  const locator = page.locator("//span[text()='Required']").nth(0);
  await expect(locator).toHaveText(ErrorMsg);
}

async function assertSearchedEmpId(page: Page, expectedEmpId: string) {
  const empIdElement = await page.locator("//div[@role='row']/div[2]").textContent();
  expect(empIdElement?.trim()).toBe(expectedEmpId);
}

});

