import * as ko from 'knockout';
import {Item} from "scripts/models/item";

const template = require('scripts/components/controls/item-grid.html');

export class ViewModel {

    public items: KnockoutObservableArray<Item>;

    public constructor(params: Params) {
        this.items = params.items;
    }
}

interface Params {
    items: KnockoutObservableArray<Item>;
}

ko.components.register('item-grid', {
    template: template,
    viewModel: ViewModel
});