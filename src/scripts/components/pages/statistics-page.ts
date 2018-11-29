import * as ko from 'knockout';
import {StatisticsRepo} from 'scripts/repositories/statistics-repo';

const template = require('scripts/components/pages/statistics-page.html');

export class ViewModel {
    public statistics = StatisticsRepo.statistics;
}

ko.components.register('statistics-page', {
    template: template,
    viewModel: ViewModel
});