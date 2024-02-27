const LoginPage = require("../pageobjects/login.page");
const HomePage = require("../pageobjects/home.page");
const DetailPage = require("../pageobjects/detail.product");
const AddCart = require("../pageobjects/add.cart");
const Checkout = require("../pageobjects/checkout");

describe("Swag Labs", () => {
  // Positive cases
  describe("Positive Cases", () => {
    it("should login with standard_user credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(
        process.env.USERNAME_STANDARD_USER,
        process.env.PASSWORD_SAUCEDEMO
      );
      await HomePage.validateHomePage();
    });

    it("should navigate to detail page after selecting a product", async () => {
      await DetailPage.open();
      await DetailPage.validateDetailPage();
    });

    it("should add product to cart", async () => {
      await DetailPage.open();
      await DetailPage.validateDetailPage();
      await AddCart.addProductToCart();
    });

    it("should complete checkout process successfully", async () => {
      await DetailPage.open();
      await DetailPage.validateDetailPage();
      await AddCart.addProductToCart();
      await Checkout.completeCheckout('John', 'Doe', '12345');
      await Checkout.clickFinish();
      await Checkout.verifyOrderSuccess();
    });
  });

  // Negative cases
  describe("Negative Cases", () => {
    it("should not complete checkout process with incomplete details", async () => {
      await DetailPage.open();
      await DetailPage.validateDetailPage();
      await AddCart.addProductToCart();
      await Checkout.completeCheckout("John", "", "12345");
    });

    it("should get error with wrong password credential", async () => {
      await LoginPage.open();
      await LoginPage.login(
        process.env.USERNAME_STANDARD_USER,
        process.env.PASSWORD_SAUCEDEMO_WRONG
      );
      await LoginPage.validatePasswordError();
    });

    it("should get login error with locked_out_user credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(
        process.env.USERNAME_LOCKED_OUT_USER,
        process.env.PASSWORD_SAUCEDEMO
      );
      await LoginPage.validateLockedOutUserError();
    });
  });

  // Login with other users
  describe("Login with Other Users", () => {
    it("should login with problem_user credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(
        process.env.USERNAME_PROBLEM_USER,
        process.env.PASSWORD_SAUCEDEMO
      );
      await HomePage.validateHomePage();
    });

    it("should login with error_user credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(
        process.env.USERNAME_error_user,
        process.env.PASSWORD_SAUCEDEMO
      );
      await HomePage.validateHomePage();
    });

    it("should login with visual_user credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(
        process.env.USERNAME_visual_user,
        process.env.PASSWORD_SAUCEDEMO
      );
      await HomePage.validateHomePage();
    });
  });
});
