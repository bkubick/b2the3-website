/**
 * This module contains utility functions for displaying various things.
 */
import React, { ReactElement } from 'react';


const monthNameByNumber: Record<number, string> = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};


/**
 * Splits the text into lines and wraps each line in <br/> tags.
 * 
 * @param text the text to split into lines and wrap in <br/> tags.
 * @returns the react elements with the text split into lines and wrapped in <br/> tags.
 */
function splitLines(text: string): ReactElement[] {
    return text.split(/\n/).map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>)
}


/**
 * Returns the month name for the given month number.
 * 
 * @param month the month number.
 * @param shortHand whether to return the short-hand version of the month name.
 * @returns the month name for the given month number.
 */
function getMonthByNumber(month: number, shortHand: boolean = false): string {
    var monthName: string = monthNameByNumber[month];

    if (shortHand) {
        monthName = monthName.substring(0, 3);
    }

    return monthName;
}


/**
 * Creates a markup object for dangerously setting the inner HTML of a react
 * element.
 * 
 * @param value the value to set the inner HTML to.
 * @returns the markup object for dangerously setting the inner HTML of a react
 * element.
 */
function createMarkup(value: string) {
    return {__html: value};
}


/**
 * Sets the title of the page.
 * 
 * @param title the title of the page.
 */
function setTitle(title?: string, defaultTitle?: string): void {
    if (!defaultTitle) {
        defaultTitle = 'B2the3';
    }

    console.log('title', `${defaultTitle} | ${title}`)

    if (!title) {
        document.title = defaultTitle;
    } else {
        document.title = `${defaultTitle} | ${title}`;
    }
}


export {
    createMarkup,
    getMonthByNumber,
    setTitle,
    splitLines,
};
