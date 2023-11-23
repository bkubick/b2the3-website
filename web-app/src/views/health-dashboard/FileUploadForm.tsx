import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { FileUploadField } from 'src/components/form/fields';
import { Required } from 'src/components/form/validation';
import { parseCSV } from 'src/utils/files';


interface FormValues {
    file: File | null;
}


interface HealthData {
    id: string;
    start: string;
    end: string;
    unit: string;
    val: string;
}


const HealthDataMapping: Record<string, keyof HealthData> = {
    id: 'id',
    startDate: 'start',
    endDate: 'end',
    unit: 'unit',
    value: 'val',
};


interface Props {
    onSubmitHandler: (data: HealthData[]) => void;
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
                const parsedCSV = parseCSV<HealthData>(csvOutput, HealthDataMapping, 1, (i: number) => `health-data-${i}`);
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
