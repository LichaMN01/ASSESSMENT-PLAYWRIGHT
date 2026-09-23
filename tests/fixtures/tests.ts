import { test as base, expect, BrowserContext } from "@playwright/test";

type Fixtures = {
  sharedContext: BrowserContext;
};

export const test = base.extend<Fixtures>({
  sharedContext: [
    async ({ browser }, use) => {
      const context = await browser.newContext({
        storageState: "playwright/.auth/user.json",
      });

      await use(context);

      await context.close();
    },
    { scope: "worker" },
  ],

  page: async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();

    await use(page);

    await page.close();
  },
});

export { expect };