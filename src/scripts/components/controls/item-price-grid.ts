import * as ko from 'knockout';
import * as _ from 'lodash';
import {ItemPriceRepo} from 'scripts/repositories/item-price-repo';
import {ItemPrice} from 'scripts/models/item-price';

const template = require('scripts/components/controls/item-price-grid.html');

export class ViewModel {
    public selectedItemPrices = ItemPriceRepo.selectedItemPrices;

    public minPrice = ko.pureComputed(() =>
        _.chain(this.selectedItemPrices())
            .map((itemPrice: ItemPrice) => itemPrice.price)
            .min()
            .value()
    );

    public maxPrice = ko.pureComputed(() =>
        _.chain(this.selectedItemPrices())
            .map((itemPrice: ItemPrice) => itemPrice.price)
            .max()
            .value()
    );
}

ko.components.register('item-price-grid', {
    template: template,
    viewModel: ViewModel
});