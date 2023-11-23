import React from "react";


/**
 * Interface for text fields.
 * 
 * @property {string} name The name of the field.
 * @property {string} value The value of the field.
 * @property {(event: React.ChangeEvent<any>) => void} onChange The change handler for the field.
 * @property {(event: React.FocusEvent<any>) => void} onBlur The blur handler for the field.
 */
interface FileUpload {
    name: string;
    value?: File;
    onChange: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
}


/**
 * Interface for field props used in the formik form.
 * 
 * @property {FileUpload} field The field.
 * @property {string} className The class name for the field.
 * @property {(value: string | undefined) => string | undefined} validate The validation function for the field.
 */
interface FileUploadFieldArgs {
    field: FileUpload;
    form: any;
    label?: string;
    className?: string;
    validate?: (value: string | undefined) => string | undefined;
}


const FileUploadField = ({ field, ...props }: FileUploadFieldArgs) => {
    const onChangeHandler = (event: React.ChangeEvent<any>) => {
        props.form.setFieldValue(field.name, event.currentTarget.files[0]);
    };

    const className = 'w-full rounded-lg px-2 py-1 bg-transparent text-white font-mono text-xs border-gray-400 cursor-pointer border-2 text-center' + (props.className ? props.className : '');

    return (
        <label className={ className }>
            { props.label || 'Choose a file' }
            <input type="file" className={ className } name={ field.name } onChange={ onChangeHandler }/>
        </label>
    );
}


export { FileUploadField };
