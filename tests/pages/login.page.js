import { Page, Locator } from '@playwright/test';

export class PetStoreLoginPage {
  constructor(page) {
    this.page = page;
    this.url = `/login`;
    this.emailInput = page.locator("input[type='email']");
    this.passwordInput = page.locator("input[type='password']");
    this.submitBtn = page.locator("button[type='submit'], button:has-text('Iniciar')");
    this.visibilityToggle = page.locator("button[type='button']");
  }

  async navigate() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.first().click();
  }

  isLoaded() {
    return this.page.url().includes('/login');
  }
}
