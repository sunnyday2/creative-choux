import { Page, Locator } from '@playwright/test';


export class PetStoreHomePage {
  constructor(page) {
    this.page = page;
    this.url = `/`;
  }

  async navigate() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickComprarAhora() {
    await this.page.locator("button:has-text('Comprar')").first().click();
  }

  async clickVerOfertas() {
    await this.page.locator("button:has-text('Ofertas')").first().click();
  }

  async isLoaded() {
    const title = await this.page.title();
    return title.includes('Pet Store');
  }
}
