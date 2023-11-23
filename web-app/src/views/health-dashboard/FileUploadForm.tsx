import { ErrorMessage, Formik, Form, Field } from 'formik';
import React from 'react';

import { FileUploadField } from 'src/components/form/fields';
import { parseCSV } from 'src/utils/files';


interface FormValues {
    file: File | null;
}


interface Props<T> {
    fieldHeaderMapping: Record<string, keyof T>;
    headerRowIndex: number;
    idPrefix: string;
    onSubmitHandler: (data: T[]) => void;
}


function FileUploadForm<T>(props: Props<T>): React.JSX.Element {

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
    const onFileUpload = async (values: File): Promise<void> => {
        console.log('onFileUpload: ', values);
        const file = values;
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput: string = event.target?.result as string;
                const parsedCSV = parseCSV<T>(csvOutput, props.fieldHeaderMapping, props.headerRowIndex, (i: number) => `${props.idPrefix}-${i}`);
                props.onSubmitHandler(parsedCSV);
            };

            fileReader.readAsText(file);
        }
    }

    return (
        <Formik initialValues={ INITIAL_FORM_VALUES } onSubmit={ () => {} }>
            <Form className='w-full'>
                <Field name="file" label="Upload CSV" component={ FileUploadField } onFileUpload={ onFileUpload }/>
                <ErrorMessage name="file"/>
            </Form>
        </Formik>
    );
}


export default FileUploadForm;
