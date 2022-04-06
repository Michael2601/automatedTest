import { Selector } from 'testcafe';
import { CssConstants } from '../../constants/CssConstants';

export abstract class BaseProductPanel {
    private _allProductsPanel = Selector(`${CssConstants.SCHEMA_RESULTS}${CssConstants.SCHEMA_GRID}`);

    private _allProducts = this._allProductsPanel.find(CssConstants.SCHEMA_PRODUCTS_ID);
    private _sortDropDown = this._allProductsPanel.find(CssConstants.SCHEMA_ORDER);

    get allProducts() {
        return this._allProducts;
    }

    get sortDropDown() {
        return this._sortDropDown;
    }
}