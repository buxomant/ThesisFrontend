import * as ko from 'knockout';
import * as _ from 'lodash';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {WebsitesResponse} from 'scripts/models/response/websites-response';
import {WebsiteToWebsitesResponse} from 'scripts/models/response/website-to-websites-response';
import {WebsiteToWebsiteResponse} from 'scripts/models/response/website-to-website-response';
import {WebsiteRequest} from 'scripts/models/request/website-request';
import {Website} from 'scripts/models/website';

export class WebsitesRepo {

    public static websites: KnockoutObservableArray<Website> = ko.observableArray();
    public static domesticNewsWebsites: KnockoutObservableArray<Website> = ko.observableArray();
    public static websiteToWebsites: KnockoutObservableArray<WebsiteToWebsiteResponse> = ko.observableArray();

    public static isLoading = ko.observable(false);
    public static isError = ko.observable(false);
    public static errorMessage = ko.observable('');

    public static init() {
        this.isLoading(true);
        WebsitesRepo.fetchWebsites()
            .then((websitesResponse: WebsitesResponse) => {
                const websites: Website[] = _.map(websitesResponse.websites, (website) => Website.fromResponse(website));
                this.websites(websites);
            })
            .catch((error) => {
                console.log(error);
                this.isError(true);
                this.errorMessage(JSON.stringify(error));
            })
            .finally(() => this.isLoading(false));
        WebsitesRepo.fetchWebsitesByWebsiteTypeAndContentType('DOMESTIC', 'NEWS')
            .then((websitesResponse: WebsitesResponse) => {
                const websites: Website[] = _.map(websitesResponse.websites, (website) => Website.fromResponse(website));
                this.domesticNewsWebsites(websites);
            })
            .catch((error) => console.log(error));
        WebsitesRepo.fetchWebsiteToWebsiteLinks()
            .then((websiteToWebsitesResponse: WebsiteToWebsitesResponse) => {
                this.websiteToWebsites(websiteToWebsitesResponse.websiteToWebsites);
            })
            .catch((error) => console.log(error));
    }

    public static fetchWebsites(): Promise<WebsitesResponse> {
        const endpointPath = `websites`;
        return networkClient.makeGetRequest<WebsitesResponse>(endpointPath);
    }

    public static fetchWebsitesByWebsiteTypeAndContentType(websiteType: string, contentType: string): Promise<WebsitesResponse> {
        const endpointPath = `websites/website-type/${websiteType}/content-type/${contentType}`;
        return networkClient.makeGetRequest<WebsitesResponse>(endpointPath);
    }
    
    public static updateWebsite(websiteId: number, websiteRequest: WebsiteRequest): Promise<void> {
        const endpointPath = `website/${websiteId}`;
        return networkClient.makePostRequest(endpointPath, websiteRequest);
    }

    public static deleteWebsite(websiteId: number): Promise<void> {
        const endpointPath = `website/${websiteId}`;
        return networkClient.makeDeleteRequest(endpointPath);
    }

    public static fetchWebsiteToWebsiteLinks(): Promise<WebsiteToWebsitesResponse> {
        const websiteType = 'DOMESTIC';
        const contentType = 'NEWS';
        const endpointPath = `website-to-website/website-type/${websiteType}/content-type/${contentType}`;
        return networkClient.makeGetRequest<WebsiteToWebsitesResponse>(endpointPath);
    }
}
