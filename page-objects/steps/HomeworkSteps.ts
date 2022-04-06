import { Selector, t } from 'testcafe';

import { CatalogPage } from '../pages/CatalogPage';
import { ProductsPage } from '../pages/ProductsPage';

import { Categories } from '../enums/categories';
import { SubCategories } from '../enums/subCategories';
import { MobilePhonesAndAccessoriesItems } from '../enums/catalog-items';

import { CssConstants } from '../constants/CssConstants';
import { ProductPanel } from '../panels/ProductPanel';
import { Filters } from '../panels/base/BaseFilterPanel';

export class HomeworkSteps {
    private static _headerTitle = Selector(CssConstants.SCHEMA_HEADER_TITLE);
    private static _compareContainer = `div[class="${CssConstants.N_COMPARE_CONTAINER}"]`;

    static async openMobileCatalog() {
        await new CatalogPage().goToItem(Categories.ELECTRONIC, SubCategories.MOBILES_AND_ACCESSORIES, MobilePhonesAndAccessoriesItems.MOBILE_PHONES);
    }

    static async checkOpenMobileCatalog() {
        await t.expect(await this._headerTitle.innerText).eql(MobilePhonesAndAccessoriesItems.MOBILE_PHONES,
            `Check catalog page ${MobilePhonesAndAccessoriesItems.MOBILE_PHONES} opened`);
    }

    static async addRandomProductToCompare(randomElements: number) {
        let product = await new ProductsPage().addToCompareRandomProduct(randomElements);
        return product;
    }

    static async checkCompareLink() {
        await t.expect(Selector(this._compareContainer).exists).ok('Check that the compare link exists');
    }

    static async checkCompareCheckbox(...product: ProductPanel[]) {
        for (let i = 0; i < product.length; i++)
            await t.expect(await product[i].isCompareCheck())
                .ok(`Check compare checkbox checked for ${product[i].getProductName()}`)
    }

    static async setPrice(...products: ProductPanel[]) {
        let arrS = [];
        for (let i = 0; i < products.length; i++)
            arrS.push(await products[i].getMinPrice());
        await new ProductsPage().setFromField(Filters.MINIMAL_PRICE, ...arrS);
        await new ProductsPage().setToField(Filters.MINIMAL_PRICE, ...arrS);
    }

    static async setScreenSize(...products: ProductPanel[]) {
        let arrS = [];
        for (let i = 0; i < products.length; i++)
            arrS.push((await products[i].getAditionalInfo()).screenSize);
        await new ProductsPage().setFromField(Filters.SCREEN_SIZE, ...arrS);
        await new ProductsPage().setToField(Filters.SCREEN_SIZE, ...arrS);
    }

    static async checkProductDisplay(...products: ProductPanel[]) {
        for (let i = 0; i < products.length; i++)
            await t.expect(await products[i].isVisible()).ok(`Check that the product: ${products[i]} is visible`);
    }

    static async clickProduct(product: ProductPanel) {
        await new ProductsPage().OpenProduct(product);
    }

    static async checkProductInfo(productA: any, productB: any, isEql = true) {

    }

    static async clickCompareLink() {

    }
}