const { $ } = require('@wdio/globals');
const Page = require('./page');

class Checkout extends Page {
    get checkoutButton() { return $('.checkout_button'); }
    get firstNameField() { return $('#first-name'); }
    get lastNameField() { return $('#last-name'); }
    get postalCodeField() { return $('#postal-code'); }
    get continueButton() { return $('.cart_button'); }
    get orderCompleteHeader() { return $('.complete-header'); }
    get finishButton() { return $('.cart_button'); } // Mendapatkan tombol "Finish"

    async completeCheckout(firstName, lastName, postalCode) {
        await this.checkoutButton.click();
        await this.firstNameField.setValue(firstName);
        await this.lastNameField.setValue(lastName);
        await this.postalCodeField.setValue(postalCode);
        await this.continueButton.click();
    }

    
    async clickFinish() {
        await this.finishButton.click();
    }

    async verifyOrderSuccess() {
        const orderCompleteText = await this.orderCompleteHeader.getText();
        expect(orderCompleteText).toEqual('Thank you for your order!');
    }

}

module.exports = new Checkout();
