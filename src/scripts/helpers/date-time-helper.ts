import {Moment} from 'moment';

export const DATE_TIME_FORMAT = 'D MMM Y - HH:mm';
export const DATE_FORMAT = 'D MMM Y';
export const TIME_FORMAT = 'HH:mm';

export function getDateTimeForDisplay(dateTime: Moment) {
    return dateTime.format(DATE_TIME_FORMAT);
}

export function getDateForDisplay(dateTime: Moment) {
    return dateTime.format(DATE_FORMAT);
}

export function getTimeForDisplay(dateTime: Moment) {
    return dateTime.format(TIME_FORMAT);
}