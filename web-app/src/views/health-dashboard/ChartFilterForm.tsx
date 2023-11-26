import { ErrorMessage, Formik, Form, Field } from 'formik';
import React from 'react';

import { DatePickerField, fieldTypes, RadioGroup } from 'src/components/form/fields';


/**
 * Interface for the form values.
 * 
 * @property {any} [key: string] The key for the form value.
 * 
 * The key is the field name of the form for the prefix of the field names
 * listed below:
 * - date1: the first date.
 * - date2: the second date.
 * - period: the period.
 */
interface FormValues {
    [key: string]: any;
}


interface Props {
    formId: string;
    minDate?: Date;
    maxDate?: Date;
    onDatesChange: (dates: Date[]) => void;
    onPeriodChange: (period: string) => void;
}


function ChartFilterForm(props: Props): React.JSX.Element {
    // Declare the form id and the field names due to this form used in multiple places.
    const formId = props.formId;

    const PERIOD_OPTIONS: fieldTypes.Option[] = [
        { label: 'Hourly', value: `${formId}-hourly` },
        { label: 'Daily', value: `${formId}-daily` },
    ]

    const date1FieldName = `${formId}-date1`;
    const date2FieldName = `${formId}-date2`;
    const periodFieldName = `${formId}-period`;

    const INITIAL_FORM_VALUES: FormValues = {};
    INITIAL_FORM_VALUES[date1FieldName] = null;
    INITIAL_FORM_VALUES[date2FieldName] = null;
    INITIAL_FORM_VALUES[periodFieldName] = PERIOD_OPTIONS[0].value;

    const onDateChange = (fieldName: string, date: Date, form?: any) => {
        const date1 = fieldName === date1FieldName ? date : form.values[date1FieldName];
        const date2 = fieldName === date2FieldName ? date : form.values[date2FieldName];
        props.onDatesChange([date1, date2]);
    }

    const onPeriodChange = (value: string) => {
        props.onPeriodChange(value);
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
                    <Form className='w-full' id={ formId }>
                        <div className='flex'>
                            <Field name={ date1FieldName } className='w-28 mr-2' component={ DatePickerField } minDate={ props.minDate } maxDate={ values[date2FieldName] } onDateChange={ onDateChange }/>
                            <Field name={ date2FieldName } className='w-28' component={ DatePickerField } minDate={ values[date1FieldName] } maxDate={ props.maxDate } onDateChange={ onDateChange } />

                            <div className='ml-4'>
                                <Field name={ periodFieldName } className="flex" options={ PERIOD_OPTIONS } component={ RadioGroup } onOptionChange={ onPeriodChange } />
                            </div>
                        </div>
                        <ErrorMessage name={ date1FieldName } />
                    </Form>
                )
            }}
        </Formik>
    );
}


export default ChartFilterForm;
