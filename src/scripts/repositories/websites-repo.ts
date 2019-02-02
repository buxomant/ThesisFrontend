import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {WebsitesResponse} from 'scripts/models/response/websites-response';
import {WebsiteResponse} from 'scripts/models/response/website-response';

export class WebsitesRepo {

    public static websites: KnockoutObservableArray<WebsiteResponse> = ko.observableArray();

    public static init() {
        WebsitesRepo.fetchWebsites()
            .then((websitesResponse: WebsitesResponse) => {
                this.websites(websitesResponse.websites);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchWebsites(): Promise<WebsitesResponse> {
        const endpointPath = `websites`;
        return networkClient.makeGetRequest<WebsitesResponse>(endpointPath);
    }
}
