import * as ko from 'knockout';
import {Item} from 'scripts/models/item';
import {ItemRepo} from 'scripts/repositories/item-repo';
import {ItemPriceRepo} from 'scripts/repositories/item-price-repo';

const template = require('scripts/components/controls/item-grid.html');

export class ViewModel {

    public items = ItemRepo.items;

    public selectedItem: KnockoutObservable<Item> = ko.observable();

    public openUrl(this: Item) {
        window.open(this.url);
    }

    public itemClicked = (item: Item) => {
        this.toggleSelectedItem(item);
    };

    private toggleSelectedItem(item: Item) {
        if (!this.selectedItem() || this.selectedItem().itemId !== item.itemId) {
            this.selectedItem(item);
            ItemPriceRepo.updateSelectedItemPrices(item.itemId);
        } else {
            this.selectedItem(null);
            ItemPriceRepo.discardItemPrices();
        }
    }
}

ko.components.register('item-grid', {
    template: template,
    viewModel: ViewModel
});