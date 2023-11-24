import { ErrorMessage, Formik, Form, Field } from 'formik';
import React from 'react';

import { FileUploadField } from 'src/components/form/fields';
import { Error } from 'src/components/form/validation';
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
     * @param file   The form values.
     * @param actions   The form actions.
     */
    const onFileUpload = async (file?: File, form?: any): Promise<void> => {
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput: string = event.target?.result as string;
                try {
                    const parsedCSV = parseCSV<T>(csvOutput, props.fieldHeaderMapping, props.headerRowIndex, (i: number) => `${props.idPrefix}-${i}`);
                    props.onSubmitHandler(parsedCSV);
                }
                catch (error) {
                    if (form) {
                        form.setFieldError('file', Error('Invalid header rows. Please check the file and try again'));
                    }
                    console.log('File Upload Error: ', error);
                }
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
