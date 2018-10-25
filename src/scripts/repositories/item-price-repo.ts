// import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {ItemPricesResponse} from 'scripts/models/item-prices-response';
// import {ItemPrice} from 'scripts/models/item-price';

export class ItemPriceRepo {

    // public static itemPrices: KnockoutObservableArray<ItemPrice> = ko.observableArray();
    //
    // public static init() {
    //     ItemPriceRepo.fetchItemPrices()
    //         .then((itemPricesResponse) => ItemPriceRepo.itemPrices(itemPricesResponse.itemPrices))
    //         .catch(() => alert('wtf')); // qq implement error handling
    // }

    public static fetchItemPrices(itemId: number): Promise<ItemPricesResponse> {
        const endpointPath = `item-prices/${itemId}`;
        return networkClient.makeGetRequest<ItemPricesResponse>(endpointPath);
    }
}