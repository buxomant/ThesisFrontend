import * as ko from 'knockout';
import {Item} from 'scripts/models/item';
import {ItemRepo} from 'scripts/repositories/item-repo'

const template = require('scripts/components/pages/root.html');

export class ViewModel {

    public allItems: KnockoutObservableArray<Item> = ko.observableArray();

    public constructor() {
        this.getAllItems();
    }

    private getAllItems() {
        ItemRepo.getItems()
            .then((items) => this.allItems(items))
            .catch(() => alert('wtf')); // qq implement error handling
    }
}

ko.components.register('root', {
    template: template,
    viewModel: ViewModel
});