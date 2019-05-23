import * as ko from 'knockout';

const template = require('scripts/components/pages/spinner-page.html');

export class ViewModel {
}

ko.components.register('spinner-page', {
    template: template,
    viewModel: ViewModel
});
