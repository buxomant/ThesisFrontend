import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {StatisticsResponse} from 'scripts/models/response/statistics-response';

export class StatisticsRepo {

    public static statistics: KnockoutObservable<StatisticsResponse> = ko.observable();

    public static init() {
        StatisticsRepo.fetchStatistics()
            .then((statisticsResponse) => {
                this.statistics(statisticsResponse);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchStatistics(): Promise<StatisticsResponse> {
        const endpointPath = `statistics`;
        return networkClient.makeGetRequest<StatisticsResponse>(endpointPath);
    }
}