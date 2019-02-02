import * as ko from 'knockout';
import * as _ from 'lodash';
import {WebsitesRepo} from 'scripts/repositories/websites-repo';

const template = require('scripts/components/pages/websites-page.html');

export class ViewModel {
    public websites = WebsitesRepo.websites;

    public websiteGridEntriesPerPage: KnockoutObservable<number> = ko.observable(25);
    public websiteGridPage: KnockoutObservable<number> = ko.observable(1);

    public websiteGridNoOfPages = ko.pureComputed(() => {
        return Math.floor(this.websites().length / this.websiteGridEntriesPerPage()) + 1;
    });

    public websitesToDisplay = ko.pureComputed(() => {
        const start = (this.websiteGridPage() - 1) * this.websiteGridEntriesPerPage() + 1;
        const end = this.websiteGridPage() * this.websiteGridEntriesPerPage();
        return _.slice(this.websites(), start, end)
    });
}

ko.components.register('websites-page', {
    template: template,
    viewModel: ViewModel
});
