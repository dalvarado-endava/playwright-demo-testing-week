import { expect, Locator, Page } from "@playwright/test";
import { ButtonType } from "../../helpers/ButtonType";
import { MenuItem } from "../../helpers/MenuItem";

export class HeaderComponent {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly cartButton: Locator;
  readonly sidebarProducts: Locator;
  readonly sidebarAbout: Locator;
  readonly sidebarLogout: Locator;
  readonly sidebarReset: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.cartButton = page.locator("#shopping_cart_container");
    this.sidebarProducts = page.locator("#inventory_sidebar_link");
    this.sidebarAbout = page.locator("#about_sidebar_link");
    this.sidebarLogout = page.locator("#logout_sidebar_link");
    this.sidebarReset = page.locator("#reset_sidebar_link");
    this.pageTitle = page.locator(".title");
  }

  async clickButton(button: ButtonType) {
    if (button == ButtonType.MENU) {
      await this.menuButton.click();
    }
    if (button == ButtonType.CART) {
      await this.cartButton.click();
    }
  }

  async clickMenuItem(item: MenuItem) {
    switch (item) {
      case MenuItem.PRODUCTS:
        await this.sidebarProducts.click();
        break;
      case MenuItem.ABOUT:
        await this.sidebarAbout.click();
        break;
      case MenuItem.LOGOUT:
        await this.sidebarLogout.click();
        break;
      case MenuItem.RESET:
        await this.sidebarReset.click();
        break;

      default:
        break;
    }
  }

  async assertTitleText(text: string) {
    await expect(this.pageTitle).toContainText(text);
  }
}
