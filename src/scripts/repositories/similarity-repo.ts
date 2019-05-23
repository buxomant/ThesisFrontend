import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {PageSimilarityResponse} from 'scripts/models/response/page-similarity-response';
import {PageSimilaritiesResponse} from "../models/response/page-similarities-response";

export class SimilarityRepo {

    public static pageSimilarities: KnockoutObservableArray<PageSimilarityResponse> = ko.observableArray();

    public static isLoading = ko.observable(false);
    public static isError = ko.observable(false);
    public static errorMessage = ko.observable('');

    public static init() {
        this.isLoading(true);
        SimilarityRepo.fetchCrawlerStatistics()
            .then((pageSimilaritiesResponse) => {
                this.pageSimilarities(pageSimilaritiesResponse.pageSimilarities);
            })
            .catch((error) => {
                this.isError(true);
                this.errorMessage(JSON.stringify(error));
                console.log(error);
            })
            .finally(() => this.isLoading(false));
    }

    public static fetchCrawlerStatistics(): Promise<PageSimilaritiesResponse> {
        const endpointPath = `similar-pages`;
        return networkClient.makeGetRequest<PageSimilaritiesResponse>(endpointPath);
    }
}