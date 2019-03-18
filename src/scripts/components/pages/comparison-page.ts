import * as ko from 'knockout';
import * as _ from 'lodash';
import {SimilarityRepo} from 'scripts/repositories/similarity-repo';

const template = require('scripts/components/pages/comparison-page.html');

export class ViewModel {
    private pageSimilarities = SimilarityRepo.pageSimilarities;

    public selectedFirstWebsiteUrl = ko.observable('');
    public selectedSecondWebsiteUrl = ko.observable('');

    public uniqueFirstWebsiteUrls = ko.pureComputed(() =>
        _(this.pageSimilarities()).map((ps) => ps.firstWebsiteUrl).uniq().sortBy().value()
    );

    public uniqueSecondWebsiteUrls = ko.pureComputed(() =>
        _(this.pageSimilarities()).map((ps) => ps.secondWebsiteUrl).uniq().sortBy().value()
    );

    public selectFirstWebsite = (url) => {
        if (this.selectedFirstWebsiteUrl() === url) {
            this.selectedFirstWebsiteUrl('')
        } else {
            this.selectedFirstWebsiteUrl(url);
        }
    };

    public selectSecondWebsite = (url) => {
        if (this.selectedSecondWebsiteUrl() === url) {
            this.selectedSecondWebsiteUrl('')
        } else {
            this.selectedSecondWebsiteUrl(url);
        }
    };

    public isSelectedFirstWebsite = (url) => {
        return this.selectedFirstWebsiteUrl() === url;
    };

    public isSelectedSecondWebsite = (url) => {
        return this.selectedSecondWebsiteUrl() === url;
    };

    public filteredPageSimilarities = ko.pureComputed(() => {
        return _(this.pageSimilarities())
            .filter((ps) => {
                const matchesFirstSelectedUrl = this.selectedFirstWebsiteUrl() === ''
                    || ps.firstWebsiteUrl === this.selectedFirstWebsiteUrl();
                const matchesSecondSelectedUrl = this.selectedSecondWebsiteUrl() === ''
                    || ps.secondWebsiteUrl === this.selectedSecondWebsiteUrl();
                return matchesFirstSelectedUrl && matchesSecondSelectedUrl;
            })
            .orderBy((ps) => { return ps.firstWebsiteUrl.length + ps.secondWebsiteUrl.length}, 'desc') // qq not working
            .value();
    });
}

ko.components.register('comparison-page', {
    template: template,
    viewModel: ViewModel
});