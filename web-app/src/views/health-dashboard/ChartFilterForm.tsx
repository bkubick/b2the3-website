import { ErrorMessage, Formik, Form, Field } from 'formik';
import React from 'react';

import { DatePickerField } from 'src/components/form/fields';


interface FormValues {
    date1: Date | null;
    date2: Date | null;
}


interface Props {
    minDate?: Date;
    maxDate?: Date;
    onDatesChange: (dates: Date[]) => void;
}


function ChartFilterForm(props: Props): React.JSX.Element {

    const INITIAL_FORM_VALUES: FormValues = {
        date1: null,
        date2: null,
    };

    const onDateChange = (fieldName: string, date: Date, form?: any) => {
        const date1 = fieldName === 'date1' ? date : form.values.date1;
        const date2 = fieldName === 'date2' ? date : form.values.date2;
        props.onDatesChange([date1, date2]);
    }

    return (
        <Formik initialValues={ INITIAL_FORM_VALUES } onSubmit={ () => {} }>
            {({
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
            }) => {
                return (
                    <Form className='w-full'>
                        <div className='flex'>
                            <Field name="date1" className='w-28 mr-2' component={ DatePickerField } minDate={ props.minDate } maxDate={ values.date2 } onDateChange={ onDateChange }/>
                            <Field name="date2" className='w-28' component={ DatePickerField } minDate={ values.date1 } maxDate={ props.maxDate } onDateChange={ onDateChange } />
                        </div>
                        <ErrorMessage name="date1" />
                    </Form>
                )
            }}
        </Formik>
    );
}


export default ChartFilterForm;
