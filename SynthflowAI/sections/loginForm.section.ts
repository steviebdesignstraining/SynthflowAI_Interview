import { Page } from "@playwright/test";
import testData from "../testData/loginData.json";

export default class FormActions {
    page: Page;
    loginDetails: any;

    constructor(page: Page, index: number = 0) {
        this.page = page;
        this.loginDetails = testData[index]; // Use the object at the specified index in the array
    }

    // Form Field Selectors and Actions
    emailField = () => this.page.getByRole('textbox', { name: 'example@example.com' }); // Update selector to match actual input name
    passwordField = () => this.page.getByRole('textbox', { name: '********' }); // Update selector to match actual input name

    // Actions
    public async enterFormDetails() {
        await this.emailField().fill(this.loginDetails.emailAddress); // Fill email field with data from JSON
        await this.passwordField().fill(this.loginDetails.password); // Fill password field with data from JSON 
    }
}
