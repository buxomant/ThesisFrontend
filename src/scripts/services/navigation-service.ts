import * as ko from 'knockout';

export enum Page {
    STATISTICS,
    WEBSITES,
    GRAPH,
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

    public static openGraphPage() {
        NavigationService.currentPage(Page.GRAPH);
    }
}
