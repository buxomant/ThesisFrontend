import * as ko from 'knockout';
import * as _ from 'lodash';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {ItemPricesResponse} from 'scripts/models/response/item-prices-response';
import {ItemPrice} from 'scripts/models/item-price';

export class ItemPriceRepo {

    public static selectedItemPrices: KnockoutObservableArray<ItemPrice> = ko.observableArray();
    public static isLoading: KnockoutObservable<boolean> = ko.observable(false);

    public static updateSelectedItemPrices(itemId: number) {
        ItemPriceRepo.isLoading(true);
        ItemPriceRepo.fetchItemPrices(itemId)
            .then((response: ItemPricesResponse) => {
                const itemPrices: ItemPrice[] = _.map(response.itemPrices, ItemPrice.fromResponse);
                ItemPriceRepo.selectedItemPrices(itemPrices);
                ItemPriceRepo.isLoading(false);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static discardItemPrices() {
        ItemPriceRepo.selectedItemPrices([]);
    }

    public static fetchItemPrices(itemId: number): Promise<ItemPricesResponse> {
        const endpointPath = `item-prices/${itemId}`;
        return networkClient.makeGetRequest<ItemPricesResponse>(endpointPath);
    }
}