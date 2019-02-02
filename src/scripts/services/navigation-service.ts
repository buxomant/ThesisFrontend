import * as ko from 'knockout';

export enum Page {
    STATISTICS,
    WEBSITES,
    ITEMS
}

export class NavigationService {
    public static currentPage: KnockoutObservable<Page> = ko.observable<Page>(Page.WEBSITES);

    public static openStatisticsPage() {
        NavigationService.currentPage(Page.STATISTICS);
    }

    public static openWebsitesPage() {
        NavigationService.currentPage(Page.WEBSITES);
    }
}
