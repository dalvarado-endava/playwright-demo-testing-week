import { test } from "@playwright/test";
import { CartPage } from "../Pages/cart/CartPage";
import { HeaderComponent } from "../Pages/components/HeaderComponent";
import { LoginPage } from "../Pages/login/LoginPage";
import { ProductListPage } from "../Pages/productList/ProductListPage";

import loginData from "../data/loginData.json";
import { ProductType } from "../helpers/ProductType";
import { ButtonType } from "../helpers/ButtonType";

test.describe("Add to cart", () => {
  let loginPage: LoginPage;
  let headerComponent: HeaderComponent;
  let productListPage: ProductListPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerComponent = new HeaderComponent(page);
    productListPage = new ProductListPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigateLoginPage();
    await loginPage.fillUsername(loginData.username);
    await loginPage.fillPassword(loginData.password);
    await loginPage.submitLogin();
  });

  test("Should show products on cart when added", async ({ page }) => {
    await productListPage.addToCart(ProductType.BACKPACK);
    await productListPage.addToCart(ProductType.JACKET);
    await headerComponent.clickButton(ButtonType.CART);
    await headerComponent.assertTitleText("Your Cart");
    await cartPage.assertItemVisible(ProductType.BACKPACK);
    await cartPage.assertItemVisible(ProductType.JACKET);
  });
  test("Should remove products from cart", async ({ page }) => {
    await productListPage.addToCart(ProductType.BACKPACK);
    await productListPage.addToCart(ProductType.SHIRT);
    await headerComponent.clickButton(ButtonType.CART);
    await cartPage.assertItemVisible(ProductType.BACKPACK);
    await cartPage.assertItemVisible(ProductType.SHIRT);
    await cartPage.removeProduct(ProductType.BACKPACK);
    await cartPage.assertItemNotVisible(ProductType.BACKPACK);
  });
});
