import * as ko from 'knockout';
import {NavigationService, Page} from 'scripts/services/navigation-service';

const template = require('scripts/components/controls/nav-bar.html');

export class ViewModel {
    public NavigationService = NavigationService;
    public Page = Page;
}

ko.components.register('nav-bar', {
    template: template,
    viewModel: ViewModel
});
