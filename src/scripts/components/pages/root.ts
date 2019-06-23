import * as ko from 'knockout';
import {NavigationService, Page} from 'scripts/services/navigation-service';
import 'scripts/components/pages/statistics-page'
import 'scripts/components/pages/websites-page'
import 'scripts/components/pages/graph-page'
import 'scripts/components/pages/comparison-page'
import 'scripts/components/pages/spinner-page'
import 'scripts/components/pages/error-page'
import 'scripts/components/controls/nav-bar'

const template = require('scripts/components/pages/root.html');

export class ViewModel {
    public currentPage = NavigationService.currentPage;
    public Page = Page;
}

ko.components.register('root', {
    template: template,
    viewModel: ViewModel
});