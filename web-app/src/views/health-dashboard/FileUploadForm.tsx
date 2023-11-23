import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { FileUploadField } from 'src/components/form/fields';
import { Required } from 'src/components/form/validation';
import { type Stand } from 'src/interface/health/stand';
import { parseCSV } from 'src/utils/files';


interface FormValues {
    file: File | null;
}


const StandDataMapping: Record<string, keyof Stand> = {
    id: 'id',
    startDate: 'startDatetime',
    endDate: 'endDatetime',
    unit: 'unit',
    value: 'value',
};


interface Props {
    onSubmitHandler: (data: Stand[]) => void;
}


function FileUploadForm(props: Props): React.JSX.Element {

    const INITIAL_FORM_VALUES: FormValues = {
        file: null,
    }

    const fileReader = new FileReader();

    /**
     * Form submission handler.
     * 
     * @param values   The form values.
     * @param actions   The form actions.
     */
    const onSubmit = async (values: FormValues, actions: any): Promise<void> => {
        const file = values.file;
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput: string = event.target?.result as string;
                const parsedCSV = parseCSV<Stand>(csvOutput, StandDataMapping, 1, (i: number) => `stand-data-${i}`);
                props.onSubmitHandler(parsedCSV);
                console.log(parsedCSV);
            };

            fileReader.readAsText(file);
        }
    }


    return (
        <Formik initialValues={ INITIAL_FORM_VALUES } onSubmit={ onSubmit }>
            <Form className='w-full'>
                <Field name="file" label="Upload CSV" component={ FileUploadField } validate={ Required }/>
                <ErrorMessage name="file"/>

                <button className='btn-sm btn-primary-outline' type="submit">Submit</button>
            </Form>
        </Formik>
    );
}


export default FileUploadForm;
