/**
 * This module contains functions for date and time manipulation.
 */


/**
 * Convert milliseconds to minutes.
 * 
 * @param milliseconds number of milliseconds to convert to minutes.
 * @returns the number of minutes.
 */
const millisecondsToMinutes = (milliseconds: number): number => {
    return Math.floor(milliseconds / 60000);
}


/**
 * Calculate the difference between two dates in minutes.
 * 
 * @param date1 the first date.
 * @param date2 the second date.
 * @returns the number of milliseconds.
 */
const dateDiffInMinutes = (date1: string, date2: string): number => {
    const diffInMilliseconds: number = Math.abs(Date.parse(date2) - Date.parse(date1));
    return millisecondsToMinutes(diffInMilliseconds);
}


/**
 * Calculate the difference between two dates in milliseconds.
 * 
 * @param date1 the first date.
 * @param date2 the second date.
 * @returns the number of milliseconds.
 */
const dateDiffInMilliseconds = (date1: string, date2: string): number => {
    return Math.abs(Date.parse(date2) - Date.parse(date1));
}


/**
 * Get dates by split.
 * 
 * @param minDatetime the starting date and time.
 * @param maxDatetime the ending date and time.
 * @param split the split type (hour or day).
 * @returns 
 */
const getDatesBySplit = (minDatetime: Date, maxDatetime: Date, split: string = 'hour'): Date[] => {
    const dates: Date[] = [];

    const minHour = minDatetime.getHours();
    const minDatetimeHour = new Date(minDatetime.getFullYear(),
                                     minDatetime.getMonth(),
                                     minDatetime.getDate(),
                                     minHour, 0, 0, 0);

    let splitMilliseconds: number;
    if (split === 'hour') {
        splitMilliseconds = 3600000;
    } else if (split === 'day') {
        splitMilliseconds = 86400000;
    } else {
        throw new Error(`Invalid split: ${split}`);
    }

    for (let i = minDatetimeHour.getTime(); i <= maxDatetime.getTime(); i += splitMilliseconds) {
        dates.push(new Date(i));
    }

    return dates;
}


export { millisecondsToMinutes, dateDiffInMinutes, dateDiffInMilliseconds, getDatesBySplit };
