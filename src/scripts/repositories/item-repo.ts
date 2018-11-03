import * as ko from 'knockout';
import * as _ from 'lodash';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {ItemsResponse} from 'scripts/models/response/items-response';
import {Item} from 'scripts/models/item';
import {ItemResponse} from 'scripts/models/response/item-response';

export class ItemRepo {

    public static items: KnockoutObservableArray<Item> = ko.observableArray();

    public static init() {
        ItemRepo.fetchItems()
            .then((itemsResponse) => {
                const items: Item[] = _.chain(itemsResponse.items)
                    .map(Item.fromResponse)
                    .sortBy('itemId')
                    .value();
                ItemRepo.items(items);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchItems(): Promise<ItemsResponse> {
        const endpointPath = `items`;
        return networkClient.makeGetRequest<ItemsResponse>(endpointPath);
    }

    public static createItem(item: Item): Promise<ItemResponse> {
        const endpointPath = `item`;
        return networkClient.makePostRequest<ItemResponse>(endpointPath, item);
    }

    public static modifyItem(item: Item): Promise<ItemResponse> {
        const endpointPath = `item/${item.itemId}`;
        return networkClient.makePostRequest<ItemResponse>(endpointPath, item);
    }

    public static deleteItem(itemId: number) {
        const endpointPath = `item/${itemId}`;
        return networkClient.makeDeleteRequest(endpointPath);
    }
}