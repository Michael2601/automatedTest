import { Selector, t } from 'testcafe';
import { CssConstants } from '../constants/CssConstants';
import { BaseProductPanel } from './base/BaseProductPanel';

export class ProductPanel extends BaseProductPanel {
    private _productName: string;
    private _basePanel: Selector;

    private _title = 'span[data-bind*="product.full_name"]';
    private _description = 'span[data-bind*="product.description"]';
    private _minPrice = 'span[data-bind*="minPrice"]';
    private _checkbox = 'input[type="checkbox"]';

    constructor(productName: string) {
        super();
        this._productName = productName;
    }

    private get basePanel() {
        return this._basePanel = Selector(this._title).withText(this._productName).parent(CssConstants.SCHEMA_PRODUCT);
    }

    private async getDescription() {
        return await this.basePanel().find(this._description).textContent;
    }

    private async minPrice() {
        return await (this.basePanel().find(CssConstants.SCHEMA_PRODUCT_PRICE).find(this._minPrice)).textContent;
    }

    public getProductName() {
        return this._productName;
    }

    public getCompareChecbox() {
        return this.basePanel().find(this._checkbox).nth(0);
    }

    async getMinPrice() {
        var price = (await this.minPrice()).replace(',', '.');
        return parseFloat(price);
    }

    async getAditionalInfo() {
        let regex = /(\w+)\D+(.+)\s\D(.+)\).+ОЗУ\s(\d+).+флэш-память\s(\d+)/g;
        let text = await this.getDescription();
        let matches = regex.exec(text);
        return {
            os: matches[1],
            screenSize: matches[2],
            screenDimension: matches[3],
            ram: matches[4],
            memory: matches[5]
        }
    }

    public async addToCompare() {
        await t.click(this.getCompareChecbox());
    }

    public async isCompareCheck() {
        return await this.getCompareChecbox().checked;
    }

    public async clickName() {
        await t.click(this._basePanel.find(this._title));
    }

    public async isVisible() {
        return await this.basePanel().find(this._description).exists;
    }
}