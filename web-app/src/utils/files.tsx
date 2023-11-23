/**
 * Module for file related utility functions.
 */


/**
 * Parse CSV file to an array of objects.
 * 
 * @param text the CSV file as a string.
 * @param fieldHeaderMapping the mapping of the object fields to the CSV header names.
 * @param headerRowIndex the index of the row containing the header names.
 * @returns the CSV file as an array of objects.
 */
function parseCSV<T>(text: string, fieldHeaderMapping: Record<string, keyof T>, headerRowIndex: number = 0): T[] {
    const regexSplit: RegExp = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

    const allTextLines = text.split(/\r\n|\n/);
    const headers = allTextLines[headerRowIndex].split(regexSplit);
    const rows = allTextLines.slice(headerRowIndex + 1, -1);
    const headerMappingKeys = Object.keys(fieldHeaderMapping);

    const array = rows.map(row => {
        const values = row.split(regexSplit);
        const obj: T = headers.reduce((model: any, header: string, index: number) => {
            if (headerMappingKeys.includes(header)) {
                model[fieldHeaderMapping[header as keyof typeof fieldHeaderMapping]] = values[index];
            }

            return model;
        }, {});

        return obj;
    });

    return array;
}


export { parseCSV };
