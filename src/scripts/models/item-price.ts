import * as moment from 'moment';
import {Moment} from 'moment';
import {ItemPriceResponse} from 'scripts/models/response/item-price-response';
import {getDateTimeForDisplay} from 'scripts/helpers/date-time-helper';

export class ItemPrice {
    public itemPriceId: number;
    public itemId: number;
    public price: number;
    public timeChecked: Moment;

    private static readonly PRICE_BAR_HEIGHT_IN_PX = 450;

    constructor(itemPriceId: number, itemId: number, price: number, timeChecked: Moment) {
        this.itemPriceId = itemPriceId;
        this.itemId = itemId;
        this.price = price;
        this.timeChecked = timeChecked;
    }

    public getDateTimeChecked() {
        return getDateTimeForDisplay(this.timeChecked);
    }

    public getBarWidth(maxPrice: number) {
        return (this.price / maxPrice) * ItemPrice.PRICE_BAR_HEIGHT_IN_PX;
    }
    
    public static fromResponse(itemPriceResponse: ItemPriceResponse): ItemPrice {
        return new ItemPrice(
            itemPriceResponse.itemPriceId,
            itemPriceResponse.itemId,
            itemPriceResponse.price,
            moment(itemPriceResponse.timeChecked)
        );
    }
}