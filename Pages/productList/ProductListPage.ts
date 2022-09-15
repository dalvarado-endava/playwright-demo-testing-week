import { Locator, Page } from "@playwright/test";
import { ProductType } from "../../helpers/ProductType";
import { SortOptions } from "../../helpers/SortOptions";

export class ProductListPage {
  readonly page: Page;
  readonly addToCartBackpack: Locator;
  readonly addToCartShirt: Locator;
  readonly addToCartJacket: Locator;
  readonly filterSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBackpack = page.locator("#add-to-cart-sauce-labs-backpack");
    this.addToCartShirt = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt");
    this.addToCartJacket = page.locator(
      "#add-to-cart-sauce-labs-fleece-jacket"
    );
    this.filterSelect = page.locator("[data-test='product_sort_container']");
  }

  async addToCart(product: ProductType) {
    switch (product) {
      case ProductType.BACKPACK:
        await this.addToCartBackpack.click();
        break;

      case ProductType.SHIRT:
        await this.addToCartShirt.click();
        break;

      case ProductType.JACKET:
        await this.addToCartJacket.click();
        break;
      default:
        break;
    }
  }

  async sortProducts(filter: SortOptions) {
    switch (filter) {
      case SortOptions.AZ:
        await this.filterSelect.selectOption("az");
        break;
      case SortOptions.ZA:
        await this.filterSelect.selectOption("za");
        break;
      case SortOptions.LOHI:
        await this.filterSelect.selectOption("lohi");
        break;
      case SortOptions.HILO:
        await this.filterSelect.selectOption("hilo");
        break;

      default:
        break;
    }
  }
}
