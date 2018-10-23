import {Promise} from 'q';
import {Item} from 'scripts/models/item';
import * as networkClient from 'scripts/clients/network-client';

export class ItemRepo {
    public static getItems(): Promise<Item[]> {
        const endpointPath = `items`;
        return networkClient.makeGetRequest<Item[]>(endpointPath);
    }
}