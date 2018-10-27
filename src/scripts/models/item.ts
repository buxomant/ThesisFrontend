import {ItemResponse} from 'scripts/models/response/item-response';

export class Item {
    public itemId: number;
    public name: string;
    public url: string;

    constructor(itemId: number, name: string, url: string) {
        this.itemId = itemId;
        this.name = name;
        this.url = url;
    }

    public isSelected(selectedItem: Item) {
        return selectedItem && this.itemId === selectedItem.itemId;
    }

    public static fromResponse(itemResponse: ItemResponse): Item {
        return new Item(
            itemResponse.itemId,
            itemResponse.name,
            itemResponse.url
        );
    }
}