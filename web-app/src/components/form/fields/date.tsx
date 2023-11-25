import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";


/**
 * The field to render.
 * 
 * @property name   The name of the field.
 * @property value   The value of the field.
 * @property onChange   The change handler for the field.
 * @property onBlur   The blur handler for the field.
 */
interface Field {
    name: string;
    value?: any;
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
}


/**
 * Date field component.
 * 
 * @property field   The field to render.
 * @property className   The class name to add to the container.
 * @returns The element to render.
 */
interface DateFieldProps {
    field: Field;
    form: any;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    onDateChange?: (name: string, value: Date, form?: any) => void;
}


function DatePickerField(props: DateFieldProps): React.JSX.Element {

    const getStartingDate = (): Date => {
        let startingDate = new Date();
        if (props.field.value) {
            startingDate = new Date(props.field.value);
        } else if (props.minDate && !props.maxDate) {
            startingDate = new Date(props.minDate);
        } else if (!props.minDate && props.maxDate) {
            startingDate = new Date(props.maxDate);
        } else if (props.minDate && props.maxDate) {
            startingDate = new Date(props.minDate);
        }

        return startingDate;
    }

    const [startDate, setStartDate] = useState<Date | undefined>(getStartingDate());
    const [field, state, helpers] = useField(props.field.name);

    // Sync the value with the formik field.
    useEffect(() => {
        helpers.setValue(startDate);
    }, [startDate]);

    const onChange = (date: Date) => {
        helpers.setValue(date);
        setStartDate(date);

        if (props.onDateChange) {
            props.onDateChange(props.field.name, date, props.form);
        }
    }

    /*
    useEffect((): void => {        
        if(props.minDate !== undefined) {
           setStartDate(props.minDate);
           helpers.setValue(props.minDate);
        } else if(props.maxDate !== undefined) {
            setStartDate(props.maxDate);
            helpers.setValue(props.maxDate);
        }
    }, [props.minDate, props.maxDate]);
    */

    const fieldClassName: string = `bg-transparent text-white font-mono text-xs rounded-lg p-1 border-gray-400 cursor-pointer border-2 text-center ${props.className}`

    return (
        <DatePicker
            className={ fieldClassName }
            value={ state?.value }
            selected={ startDate }
            minDate={ props?.minDate }
            maxDate={ props?.maxDate }
            onChange={ onChange } />
    );
};


export { DatePickerField };
