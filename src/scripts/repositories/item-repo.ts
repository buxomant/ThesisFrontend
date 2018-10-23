import * as ko from 'knockout';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {ItemsResponse} from 'scripts/models/items-response';
import {Item} from 'scripts/models/item';

export class ItemRepo {

    public static items: KnockoutObservableArray<Item> = ko.observableArray();

    public static init() {
        ItemRepo.fetchItems()
            .then((itemsResponse) => ItemRepo.items(itemsResponse.items))
            .catch(() => alert('wtf')); // qq implement error handling
    }

    public static fetchItems(): Promise<ItemsResponse> {
        const endpointPath = `items`;
        return networkClient.makeGetRequest<ItemsResponse>(endpointPath);
    }
}