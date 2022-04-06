import { Selector, t } from 'testcafe';
import { CssConstants } from '../constants/CssConstants';
import { BaseFilterPanel, Filters } from './base/BaseFilterPanel';

export class FilterPanel extends BaseFilterPanel {
    private _filterName: string;

    constructor(filter: Filters) {
        super(filter);
    }

    public async setFromField(text: number | string) {
        let input = this.getFromInput();
        if (input.hasChildNodes) {
            await t.click(input);
            await t.click(input.find('option').withText(text.toString()));
        }
        else
            await t.typeText(input, text.toString());
    }

    public async setToField(text: number | string) {
        let input = this.getFromInput();
        if (input.hasChildNodes) {
            await t.click(input);
            await t.click(input.find('option').withText(text.toString()));
        }
        else
            await t.typeText(input, text.toString());
    }
}