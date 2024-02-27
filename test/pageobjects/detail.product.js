const { $ } = require('@wdio/globals');
const Page = require('./page');

class DetailProduct extends Page {
    get productTitle() { return $('.inventory_details_name'); }

    async validateDetailPage() {
        expect(browser).toHaveUrlContaining('/inventory-item.html');
        expect(await this.productTitle.isExisting()).toBe(true);
    }

    async open() {
        return super.open('/inventory-item.html?id=4');
    }
}

module.exports = new DetailProduct();
