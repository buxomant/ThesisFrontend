import * as ko from 'knockout';
import {Item} from 'scripts/models/item';
import {ItemRepo} from 'scripts/repositories/item-repo';
import {ItemPriceRepo} from 'scripts/repositories/item-price-repo';

const template = require('scripts/components/controls/item-grid.html');

export class ViewModel {

    public items = ItemRepo.items;

    public selectedItem: KnockoutObservable<Item> = ko.observable();
    public showNewItemBox: KnockoutObservable<boolean> = ko.observable(false);
    public newItemName: KnockoutObservable<string> = ko.observable('');
    public newItemUrl: KnockoutObservable<string> = ko.observable('');

    public openUrl(this: Item) {
        window.open(this.url);
    }

    public itemClicked = (item: Item) => {
        this.toggleSelectedItem(item);
    };

    public toggleNewItemBox = () => this.showNewItemBox(!this.showNewItemBox());

    public submitNewItemEntry = () => {
        if (this.newItemName() !== '' && this.newItemUrl() !== '') {
            const newItem = new Item(null, this.newItemName(), this.newItemUrl());
            ItemRepo.createItem(newItem).then(() => {
                ItemRepo.init();
                this.toggleNewItemBox();
            });
        }
    };

    public cancelNewItemEntry = () => {
        this.toggleNewItemBox();
        this.newItemName('');
        this.newItemUrl('');
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