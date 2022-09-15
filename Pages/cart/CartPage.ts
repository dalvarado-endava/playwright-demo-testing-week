import { expect, Locator, Page } from "@playwright/test";
import { ButtonType } from "../../helpers/ButtonType";
import { ProductType } from "../../helpers/ProductType";

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly backpackProduct: Locator;
  readonly shirtProduct: Locator;
  readonly jacketProduct: Locator;
  readonly removeBackpackProduct: Locator;
  readonly removeShirtProduct: Locator;
  readonly removeJacketProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator("#continue-shopping");
    this.checkoutButton = page.locator("#checkout");
    this.backpackProduct = page.locator("#item_4_title_link");
    this.shirtProduct = page.locator("#item_1_title_link");
    this.jacketProduct = page.locator("#item_5_title_link");
    this.removeBackpackProduct = page.locator("#remove-sauce-labs-backpack");
    this.removeJacketProduct = page.locator("#remove-sauce-labs-fleece-jacket");
    this.removeShirtProduct = page.locator("#remove-sauce-labs-bolt-t-shirt");
  }

  async clickOnButton(button: ButtonType) {
    if (button == ButtonType.CHECKOUT) {
      await this.checkoutButton.click();
    }
    if (button == ButtonType.CONTINUE_SHOPPING) {
      await this.continueShoppingButton.click();
    }
  }

  async assertItemVisible(product: ProductType) {
    switch (product) {
      case ProductType.BACKPACK:
        await expect(this.backpackProduct).toBeVisible();
        break;

      case ProductType.SHIRT:
        await expect(this.shirtProduct).toBeVisible();
        break;

      case ProductType.JACKET:
        await expect(this.jacketProduct).toBeVisible();
        break;

      default:
        break;
    }
  }
  async removeProduct(product: ProductType) {
    switch (product) {
      case ProductType.BACKPACK:
        await this.removeBackpackProduct.click();
        break;

      case ProductType.SHIRT:
        await this.removeShirtProduct.click();
        break;

      case ProductType.JACKET:
        await this.removeJacketProduct.click();
        break;

      default:
        break;
    }
  }
  async assertItemNotVisible(product: ProductType) {
    switch (product) {
      case ProductType.BACKPACK:
        await expect(this.backpackProduct).not.toBeVisible();
        break;

      case ProductType.SHIRT:
        await expect(this.shirtProduct).not.toBeVisible();
        break;

      case ProductType.JACKET:
        await expect(this.jacketProduct).not.toBeVisible();
        break;

      default:
        break;
    }
  }
}
