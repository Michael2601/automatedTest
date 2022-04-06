import { t, Selector } from 'testcafe';
import { ProductPanel } from '../panels/ProductPanel';
import { CssConstants } from '../constants/CssConstants';
import { Filters } from '../panels/base/BaseFilterPanel';
import { FilterPanel } from '../panels/FilterPanel';

export class ProductsPage {
    private _title = Selector('span[data-bind*="product.full_name"]');

    private async getProductsList(numOfProducts?: number) {
        const products = Selector(CssConstants.SCHEMA_PRODUCTS_ID);
        let allProductsTitle = [];
        const regex = /<(span) .*product\.full_name.*?>(.+)</g;
        const table = await t.eval(() => (<any>products()).innerHTML, {
            dependencies: { products }
        });
        let match: RegExpExecArray;

        while (match = regex.exec(table)) {
            allProductsTitle.push(new ProductPanel(match[2]));
        }
        return allProductsTitle.slice(0, numOfProducts === undefined ? allProductsTitle.length : numOfProducts);
    }

    private async getRandomProduct(randomFrom: number): Promise<ProductPanel> {
        let listForRandom = await this.getProductsList(randomFrom);
        let random = listForRandom[Math.floor(Math.random() * listForRandom.length)];
        while (true) {
            if (await random.isCompareCheck()) {
                if (randomFrom === 1)
                    throw new Error(
                        'No more Random From 1 element'
                    )
                random = listForRandom[Math.floor(Math.random() * listForRandom.length)];
            }
            else break;
        } return random;
    }

    public async addToCompareRandomProduct(fromRundomProducts: number) {
        let product = await this.getRandomProduct(fromRundomProducts);
        await product.addToCompare();
        return product;
    }

    public async OpenProduct(product: ProductPanel) {
        await product.clickName();
    }

    public async setFromField(filter: Filters, ...values: any[]) {
        let filterPanel = new FilterPanel(filter);
        let value: number = await this.getMin(...values);
        await filterPanel.setFromField(value);
    }

    public async setToField(filter: Filters, ...values: any[]) {
        let filterPanel = new FilterPanel(filter);
        let value: number = await this.getMax(...values);
        await filterPanel.setToField(value);
    }

    private createNumberArray(...values: string[]) {
        let arr = [];
        for (let i = 0; i < values.length; i++)
            arr.push(parseFloat(values[i]));
        return arr;
    }

    private async getMax(...values: any[]): Promise<number> {
        let arrN = this.createNumberArray(...values);
        return Math.max(...arrN);
    }

    private async getMin(...values: any[]): Promise<number> {
        let arr = this.createNumberArray(...values);
        return Math.min(...arr);
    }
}