/**
 * Module for file related utility functions.
 */


// The type of the function that sets the id of the object.
type IdSetter = (index: number) => string;


/**
 * Parse CSV file to an array of objects.
 * 
 * @param text the CSV file as a string.
 * @param fieldHeaderMapping the mapping of the object fields to the CSV header names.
 * @param headerRowIndex the index of the row containing the header names.
 * @param idSetter the function that sets the id of the object.
 * @returns the CSV file as an array of objects.
 */
function parseCSV<T>(text: string,
                     fieldHeaderMapping: Record<string, keyof T>,
                     headerRowIndex: number = 0,
                     idSetter: IdSetter | undefined = undefined): T[] {
    const regexSplit: RegExp = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

    const allTextLines = text.split(/\r\n|\n/);
    const headers = allTextLines[headerRowIndex].split(regexSplit);
    const rows = allTextLines.slice(headerRowIndex + 1, -1);
    const headerMappingKeys = Object.keys(fieldHeaderMapping);

    if (!headers.includes('id') && headerMappingKeys.includes('id')) {
        headers.push('id');
    }

    const array = rows.map((row: string, rowIndex: number) => {
        const values = row.split(regexSplit);
        const obj: T = headers.reduce((model: any, header: string, index: number) => {
            if (headerMappingKeys.includes(header)) {
                if (header === 'id' && idSetter) {
                    model[fieldHeaderMapping[header as keyof typeof fieldHeaderMapping]] = idSetter(rowIndex);
                } else {
                    model[fieldHeaderMapping[header as keyof typeof fieldHeaderMapping]] = values[index];
                }
            }

            return model;
        }, {});

        return obj;
    });

    return array;
}


export { parseCSV };
