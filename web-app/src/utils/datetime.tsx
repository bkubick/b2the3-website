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


export { millisecondsToMinutes, dateDiffInMinutes, dateDiffInMilliseconds };
