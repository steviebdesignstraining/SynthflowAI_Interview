import { Page, expect, Locator } from "@playwright/test";
// import { url } from "inspector";


// const formDetails = JSON.parse(JSON.stringify(testData[0])); //  // Use the first object in the array

export default class homePage {
  constructor(public page: Page) {
    this.page = page;
  }

  async popupCookies() {
    const acceptButtonSelector = this.page.getByRole('button', { name: 'ACCEPT ALL' })
    await acceptButtonSelector.isVisible({ timeout: 5000 }); // Adjust timeout as needed
    await acceptButtonSelector.click()
  }

  async clickLogin() {
    await this.page.getByRole('link', { name: 'Login' }).click({ timeout: 10000 });
    const headerTitle = this.page.getByText('Create account')
    await expect(headerTitle).toHaveText('Create account', { timeout: 60000 }); //revisit timeout
    headerTitle.waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'Log in' }).click({ timeout: 5000 });
    // const LoginTitle = this.page.toHaveText('Create account')
    // await expect(LoginTitle).toHaveText('Log in to your account', { timeout: 60000 }); //revisit timeout
  }

}