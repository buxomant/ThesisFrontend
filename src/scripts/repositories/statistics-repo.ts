import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {CrawlerStatisticsResponse} from 'scripts/models/response/crawler-statistics-response';
import {WebsiteStatisticsResponse} from 'scripts/models/response/website-statistics-response';

export class StatisticsRepo {

    public static crawlerStatistics: KnockoutObservable<CrawlerStatisticsResponse> = ko.observable();
    public static websiteStatistics: KnockoutObservable<WebsiteStatisticsResponse> = ko.observable();

    public static init() {
        StatisticsRepo.fetchCrawlerStatistics()
            .then((statisticsResponse) => {
                this.crawlerStatistics(statisticsResponse);
            })
            .catch((error) => console.log(error)); // qq implement error handling
        StatisticsRepo.fetchWebsiteStatistics()
            .then((statisticsResponse) => {
                this.websiteStatistics(statisticsResponse);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchCrawlerStatistics(): Promise<CrawlerStatisticsResponse> {
        const endpointPath = `crawler-statistics`;
        return networkClient.makeGetRequest<CrawlerStatisticsResponse>(endpointPath);
    }

    public static fetchWebsiteStatistics(): Promise<WebsiteStatisticsResponse> {
        const endpointPath = `website-statistics`;
        return networkClient.makeGetRequest<WebsiteStatisticsResponse>(endpointPath);
    }
}