import * as ko from 'knockout';

export enum Page {
    STATISTICS,
    ITEMS
}

export class NavigationService {
    public static currentPage: KnockoutObservable<Page> = ko.observable<Page>(Page.STATISTICS);
}
