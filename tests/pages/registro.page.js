import { Page, Locator } from '@playwright/test';


export class PetStoreRegistroPage {
  constructor(page) {
    this.page = page;
    this.url = `/registro`;
    this.nameInput = page.locator("input[type='text']");
    this.emailInput = page.locator("input[type='email']");
    this.passwordInput = page.locator("input[type='password']").first();
    this.confirmPasswordInput = page.locator("input[type='password']").nth(1);
    this.termsCheckbox = page.locator("input[type='checkbox']");
    this.submitBtn = page.locator("button[type='submit'], button:has-text('Crear Cuenta')");
  }

  async navigate() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async register(name, email, password, confirm) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirm);
    await this.termsCheckbox.check();
    await this.submitBtn.first().click();
  }

  isLoaded() {
    return this.page.url().includes('/registro');
  }

  async logout() {
    const logoutButton = this.page.locator("button:has-text('Salir')");
    await logoutButton.click();
  }
}
