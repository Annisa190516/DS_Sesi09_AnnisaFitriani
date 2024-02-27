const { $ } = require('@wdio/globals');
const Page = require('./page');

class AddCart extends Page {
    get addToCartButton() { return $('.shopping_cart_link'); }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

    async open() {
        return super.open('/cart.html');
    }
}

module.exports = new AddCart();
