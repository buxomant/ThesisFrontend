import * as ko from 'knockout';

export enum Page {
    ITEMS
}

export class NavigationService {
    public static currentPage: KnockoutObservable<Page> = ko.observable<Page>(Page.ITEMS);

    public static openItemsPage() {
        NavigationService.currentPage(Page.ITEMS);
    }
}
