import { test } from "@playwright/test";
import { LoginPage } from "../Pages/login/LoginPage";
import loginData from "../data/secret/loginData.json";
import { HeaderComponent } from "../Pages/components/HeaderComponent";

test.describe("Login", () => {
  let loginPage: LoginPage;
  let headerComponent: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateLoginPage();
    headerComponent = new HeaderComponent(page);
  });

  test("Should see the product list page when using valid crendentials", async ({
    page,
  }) => {
    await loginPage.fillUsername(loginData.username);
    await loginPage.fillPassword(loginData.password);
    await loginPage.assertUsername();
    await loginPage.assertPassword();
    await loginPage.submitLogin();
    await headerComponent.assertTitleText("Products");
  });

  test("Should show error message when using invalid credentials", async ({
    page,
  }) => {
    await loginPage.fillUsername(loginData.invalidUsername);
    await loginPage.fillPassword(loginData.password);
    await loginPage.assertUsername();
    await loginPage.assertPassword();
    await loginPage.submitLogin();
    await loginPage.assertErrorMessage();
  });
});
