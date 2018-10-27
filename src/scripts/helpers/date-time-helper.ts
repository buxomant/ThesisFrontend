import {Moment} from 'moment';

export const DATE_FORMAT = 'D MMM Y';
export const TIME_FORMAT = 'HH:mm';

export function getDateForDisplay(dateTime: Moment) {
    return dateTime.format(DATE_FORMAT);
}

export function getTimeForDisplay(dateTime: Moment) {
    return dateTime.format(TIME_FORMAT);
}