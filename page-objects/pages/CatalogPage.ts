import { Selector, t } from 'testcafe';
import { Categories } from "../enums/categories";
import { CssConstants } from '../constants/CssConstants';
import { SubCategories } from '../enums/subCategories';
import { MobilePhonesAndAccessoriesItems } from '../enums/catalog-items';

export class CatalogPage {
    private _categoryTitle = Selector(CssConstants.NAVIGATION_ITEM_TITLE);
    private _subCategoryTitle = Selector(CssConstants.SUB_NAVIGATION_ITEM_TITLE);
    private _itemTitle = Selector(CssConstants.ITEM_TITLE);

    private async selectCategory(categoryTitle: Categories) {
        await t.click(this._categoryTitle.withText(categoryTitle));
    }

    private async selectSubCategory(subCategoryTitle: SubCategories) {
        await t.click(this._subCategoryTitle.filterVisible().nth(subCategoryTitle));
    }

    private async selectItem(itemTitle: MobilePhonesAndAccessoriesItems) {
        await t.click(this._itemTitle.filterVisible().withText(itemTitle));
    }

    public async goToItem(categoryTitle: Categories, subCategoryTitle: SubCategories, itemTitle: MobilePhonesAndAccessoriesItems) {
        await this.selectCategory(categoryTitle);
        await this.selectSubCategory(subCategoryTitle);
        await this.selectItem(itemTitle);
    }

}