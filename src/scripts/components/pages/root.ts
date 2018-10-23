import * as ko from 'knockout';
import {NavigationService, Page} from 'scripts/services/navigation-service';
import 'scripts/components/pages/items-page'

const template = require('scripts/components/pages/root.html');

export class ViewModel {
    public currentPage = NavigationService.currentPage;
    public Page = Page;
}

ko.components.register('root', {
    template: template,
    viewModel: ViewModel
});