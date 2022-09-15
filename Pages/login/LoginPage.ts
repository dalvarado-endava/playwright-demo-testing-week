import { Page, expect, Locator } from "@playwright/test";
import baseData from "../../data/baseData.json";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateLoginPage() {
    await this.page.goto(baseData.baseUrl);
  }

  async fillUsername(username: string) {
    await this.username.fill(username);
  }
  async fillPassword(password: string) {
    await this.password.fill(password);
  }
  async submitLogin() {
    await this.loginButton.click();
  }

  async assertUsername() {
    await expect(this.username).not.toBeEmpty();
  }

  async assertPassword() {
    await expect(this.username).not.toBeEmpty();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText("Epic sadface");
  }
}
