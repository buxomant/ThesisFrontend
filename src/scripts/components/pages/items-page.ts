import * as ko from 'knockout';
import 'scripts/components/controls/item-grid'
import {ItemRepo} from 'scripts/repositories/item-repo';

const template = require('scripts/components/pages/items-page.html');

export class ViewModel {
    public items = ItemRepo.items;
}

ko.components.register('items-page', {
    template: template,
    viewModel: ViewModel
});