import { Page, expect } from "@playwright/test";
import FormActions from "../sections/loginForm.section";

export default class homePage {
  constructor(public page: Page) {
    this.page = page;
  }

  async enterValidCredentials(page: Page) {
    // Fill with the second object in the array
    const form0 = new FormActions(page, 0); // index 0 refers to the first object
    await form0.enterFormDetails();
    await this.page.getByRole('button', { name: 'Continue' }).click({ timeout: 200000 });
    // const requestDeliveryForm = this.page.waitForRequest(request =>
    //   request.url() === 'https://fine-tuner.ai/widget_2/1736287635790x380020836909711360?campaign=' && request.method() === 'POST',
    // );
    console.log('Entering valid login details');
  }

  async enterInvalidEmail(page: Page) {
    // Fill with the second object in the array
    const form0 = new FormActions(page, 1); // index 1 refers to the second object
    await form0.enterFormDetails();
    const continueButton = this.page.getByRole('button', { name: 'Continue' })
    await expect(continueButton).toBeTruthy();
    console.log('Entered invalid email details.');
  }

  async enterInvalidPassword(page: Page) {
    // Fill with the second object in the array
    const form0 = new FormActions(page, 2); // index 1 refers to the second object
    await form0.enterFormDetails();
    const continueButton = this.page.getByRole('button', { name: 'Continue' })
    await expect(continueButton).toBeTruthy();
    console.log('Entered invalid password details.');
  }

  async createNewAssistant(page: Page) {
    await this.page.locator('#prevent-select > div > div:nth-child(2) > div > div > div > .clickable-element').first().click();
    await this.page.getByText('Choose type of assistant').isVisible();
    await this.page.locator('div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > .clickable-element').first().click();
    await this.page.getByText('Configure').isVisible();
    const assistantNameChange = "Test Assistant";
    await this.page.getByPlaceholder('Max. 40 characters').fill(assistantNameChange);
    await this.page.getByRole('button', { name: 'Back to Assistants' }).click();
    await this.page.getByText(assistantNameChange).isVisible();
  }

  async deleteAssistant(page: Page) {
    await this.page.getByText('My Outbound Assistant').isVisible();
    await this.page.locator('.clickable-element bubble-element Group csziaR bubble-r-container flex row').click();
    this.page.getByText('Configure').first()
    const deleteAssistant = this.page.getByRole('button', { name: 'Delete' })
    await deleteAssistant.scrollIntoViewIfNeeded();
    await deleteAssistant.isVisible();
    await deleteAssistant.click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.getByRole('button', { name: 'Permanently delete' }).click();
    const assistantNameChange = "Test Assistant";
    await this.page.getByText("My Outbound Assistant").isVisible();
  }
}