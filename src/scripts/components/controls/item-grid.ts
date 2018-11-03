import * as ko from 'knockout';
import {Item} from 'scripts/models/item';
import {ItemRepo} from 'scripts/repositories/item-repo';
import {ItemPriceRepo} from 'scripts/repositories/item-price-repo';

const template = require('scripts/components/controls/item-grid.html');

export class ViewModel {

    public items = ItemRepo.items;

    public selectedItem: KnockoutObservable<Item> = ko.observable();
    public showNewItemBox: KnockoutObservable<boolean> = ko.observable(false);
    public newItemId: KnockoutObservable<number> = ko.observable();
    public newItemName: KnockoutObservable<string> = ko.observable('');
    public newItemUrl: KnockoutObservable<string> = ko.observable('');

    public openUrl(this: Item) {
        window.open(this.url);
    }

    public itemClicked = (item: Item) => {
        this.selectItem(item);
    };

    public toggleItemEntryBox = () => this.showNewItemBox(!this.showNewItemBox());

    public submitItemEntry = () => {
        if (this.newItemName() !== '' && this.newItemUrl() !== '') {
            if (!this.newItemId()) {
                const newItem = new Item(null, this.newItemName(), this.newItemUrl());
                ItemRepo.createItem(newItem).then(() => {
                    ItemRepo.init();
                    this.toggleItemEntryBox();
                });
            } else {
                const modifiedItem = new Item(this.newItemId(), this.newItemName(), this.newItemUrl());
                ItemRepo.modifyItem(modifiedItem).then(() => {
                    ItemRepo.init();
                    this.toggleItemEntryBox();
                });
            }
        }
    };

    public cancelItemEntry = () => {
        this.toggleItemEntryBox();
        this.newItemName('');
        this.newItemUrl('');
    };

    public deleteItem = () => {
        if (this.selectedItem()) {
            ItemRepo.deleteItem(this.selectedItem().itemId).then(() => {
                this.selectedItem(null);
                ItemRepo.init();
            });
        }
    };

    public modifyItem = () => {
        if (this.selectedItem()) {
            this.newItemId(this.selectedItem().itemId);
            this.newItemName(this.selectedItem().name);
            this.newItemUrl(this.selectedItem().url);
            this.toggleItemEntryBox();
        }
    };

    private selectItem(item: Item) {
        this.selectedItem(item);
        ItemPriceRepo.updateSelectedItemPrices(item.itemId);
    }
}

ko.components.register('item-grid', {
    template: template,
    viewModel: ViewModel
});