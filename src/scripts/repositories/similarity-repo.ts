import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {PageSimilarityResponse} from 'scripts/models/response/page-similarity-response';
import {PageSimilaritiesResponse} from "../models/response/page-similarities-response";

export class SimilarityRepo {

    public static pageSimilarities: KnockoutObservableArray<PageSimilarityResponse> = ko.observableArray();

    public static init() {
        SimilarityRepo.fetchCrawlerStatistics()
            .then((pageSimilaritiesResponse) => {
                this.pageSimilarities(pageSimilaritiesResponse.pageSimilarities);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchCrawlerStatistics(): Promise<PageSimilaritiesResponse> {
        const endpointPath = `similar-pages`;
        return networkClient.makeGetRequest<PageSimilaritiesResponse>(endpointPath);
    }
}