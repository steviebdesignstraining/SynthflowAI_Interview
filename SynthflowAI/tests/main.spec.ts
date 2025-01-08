import { test } from '@playwright/test';
import homePage from "../pages/homePage";
import loginPage from "../pages/loginPage";
require('dotenv').config({ path: './env/.env' });

test.describe.serial("Synthflow AI Login and Assistant Tests", () => {
  // test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ page, context }) => {
    const url = process.env.URL as string;

    if (!url) {
      throw new Error('URL is not defined in the .env file.');
    }

    console.log('Clearing cookies...');
    await context.clearCookies(); // Clears all cookies in the browser context

    console.log('Navigating to:', url); // Debugging log.
    
    await page.goto(url); // Navigate to the base URL before each test.
    const homePageMain = new homePage(page);
    await homePageMain.popupCookies();
  });

  test('Successful login with valid credentials', async ({ page }) => {
    const homePageMain = new homePage(page);
    const loginPageMain = new loginPage(page);
    const assistantHeader = page.getByText('Create New Assistant',);
    await homePageMain.clickLogin();
    await loginPageMain.enterValidCredentials(page); // Uses index 0 by default
    await assistantHeader.isVisible({ timeout: 10000 });
});

  test.only('Invalid email format', async ({ page }) => {
    const homePageMain = new homePage(page);
    const loginPageMain = new loginPage(page);

    await homePageMain.clickLogin();
    await loginPageMain.enterInvalidEmail(page)
  });

  test.only('Incorrect password', async ({ page }) => {
    const homePageMain = new homePage(page);
    const loginPageMain = new loginPage(page);

    await homePageMain.clickLogin();
    await loginPageMain.enterInvalidPassword(page)
  });

  test.only('Create an assistants ', async ({ page }) => {
    const homePageMain = new homePage(page);
    const loginPageMain = new loginPage(page);

    await homePageMain.clickLogin();
    await loginPageMain.enterValidCredentials(page); // Uses index 0 by default
    await loginPageMain.createNewAssistant(page); // Uses index 0 by default
  });

  test('Change assistant voice', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' })
  });

  test('Delete assistant', async ({ page }) => {
    const homePageMain = new homePage(page);
    const loginPageMain = new loginPage(page);

    await homePageMain.clickLogin();
    await loginPageMain.enterValidCredentials(page); // Uses index 0 by default
    await loginPageMain.deleteAssistant(page); // Uses index 0 by default
  });
});
