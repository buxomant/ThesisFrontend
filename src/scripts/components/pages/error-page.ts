import * as ko from 'knockout';

const template = require('scripts/components/pages/error-page.html');

export class ViewModel {
    public errorMessage: KnockoutObservable<string>;

    constructor(params) {
        this.errorMessage = params.errorMessage;
    }
}

ko.components.register('error-page', {
    template: template,
    viewModel: ViewModel
});
