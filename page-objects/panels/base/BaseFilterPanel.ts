import { Selector } from 'testcafe';
import { CssConstants } from '../../constants/CssConstants';

export enum Filters{
CATALOG_ONLINER = 0,
CITY,
DELIVERY,
SPECIAL_PRICE,
MANUFACTURER,
MINIMAL_PRICE,
SHOPS,
EXISTS,
START_DATE,
OS,
SCREEN_SIZE
}

export abstract class BaseFilterPanel {
    private _basePanel = Selector(CssConstants.SCHEMA_FILTER_ID);
    private _basefilters = this._basePanel.find(CssConstants.FIELDSET);
    private _filter: Selector;

    private _inputFields = CssConstants.SCHEMA_FILTER_GROUP;
    private _fromField = 'input[data-bind*="!facet.value.to"], select[data-bind*="from"]';
    private _toField = 'input[data-bind*="!facet.value.from"], select[data-bind*="to"]';

    constructor(filter: Filters) {
        this._filter = this._basefilters.nth(filter);
    }

    private getInputFields() {
        return this._filter.find(this._inputFields);
    }

    protected getFromInput() {
        return this.getInputFields().find(this._fromField);
    }

    protected getToInput() {
        return this.getInputFields().find(this._toField);
    }
}