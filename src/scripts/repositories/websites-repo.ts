import * as ko from 'knockout';
import * as _ from 'lodash';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {WebsitesResponse} from 'scripts/models/response/websites-response';
import {WebsiteRequest} from 'scripts/models/request/website-request';
import {Website} from 'scripts/models/website';

export class WebsitesRepo {

    public static websites: KnockoutObservableArray<Website> = ko.observableArray();

    public static init() {
        WebsitesRepo.fetchWebsites()
            .then((websitesResponse: WebsitesResponse) => {
                const websites: Website[] = _.map(websitesResponse.websites, (website) => Website.fromResponse(website));
                this.websites(websites);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchWebsites(): Promise<WebsitesResponse> {
        const endpointPath = `websites`;
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
}
