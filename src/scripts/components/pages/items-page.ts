import * as ko from 'knockout';
import 'scripts/components/controls/item-grid'
import 'scripts/components/controls/item-price-grid'

const template = require('scripts/components/pages/items-page.html');

export class ViewModel {

}

ko.components.register('items-page', {
    template: template,
    viewModel: ViewModel
});