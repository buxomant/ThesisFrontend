import * as ko from 'knockout';
import {WebsiteContentType, WebsiteResponse, WebsiteType} from 'scripts/models/response/website-response';
import {WebsitesRepo} from 'scripts/repositories/websites-repo';
import {WebsiteRequest} from 'scripts/models/request/website-request';

export class Website {
    public websiteId: number;
    public url: string;
    public type: KnockoutObservable<string>;
    public contentType: KnockoutObservable<string>;
    public fetchEveryNumberOfHours: KnockoutObservable<number>;

    constructor(websiteId: number, url: string, type: string, contentType: string, fetchEveryNumberOfHours: number) {
        this.websiteId = websiteId;
        this.url = url;
        this.type = ko.observable(type);
        this.contentType = ko.observable(contentType);
        this.fetchEveryNumberOfHours = ko.observable(fetchEveryNumberOfHours);
    }

    public isLoading = ko.observable(false);

    public isInteresting = (): boolean => {
        return this.contentType() === WebsiteContentType.NEWS
            && this.type() === WebsiteType.DOMESTIC
            && this.fetchEveryNumberOfHours() === 1;
    };

    public toggleInteresting = (): void => {
        const type = this.type() === WebsiteType.FOREIGN
            ? WebsiteType.DOMESTIC
            : this.type();
        const contentType = this.contentType() === WebsiteContentType.NEWS
            ? WebsiteContentType.UNCATEGORIZED
            : WebsiteContentType.NEWS;
        const fetchEveryNumberOfHours = this.fetchEveryNumberOfHours() === 1
            ? 8760
            : 1;
        const websiteRequest: WebsiteRequest = {
            url: this.url,
            type: type,
            contentType: contentType,
            fetchEveryNumberOfHours: fetchEveryNumberOfHours
        };

        this.isLoading(true);
        WebsitesRepo.updateWebsite(this.websiteId, websiteRequest)
            .then(() => {
                this.type(type);
                this.contentType(contentType);
                this.fetchEveryNumberOfHours(fetchEveryNumberOfHours);
            })
            .done(() => {
                this.isLoading(false);
            });
    };

    public static fromResponse(websiteResponse: WebsiteResponse): Website {
        return new Website(
            websiteResponse.websiteId,
            websiteResponse.url,
            websiteResponse.type,
            websiteResponse.contentType,
            websiteResponse.fetchEveryNumberOfHours
        );
    }
}