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
    onFileUpload?: (value: File) => void;
}


const FileUploadField = ({ field, ...props }: FileUploadFieldArgs) => {
    const onChangeHandler = (event: React.ChangeEvent<any>) => {
        if (props.onFileUpload) {
            props.onFileUpload(event.currentTarget.files[0]);
        }

        props.form.setFieldValue(field.name, event.currentTarget.files[0]);
    };

    const className = 'w-28 rounded px-2 py-1 bg-transparent text-white font-mono text-xs border-gray-400 cursor-pointer border-2 text-center' + (props.className ? props.className : '');

    return (
        <div className="border-gray-400 border-1 rounded-lg p-2 border-dashed flex">
            <label className={ className }>
                { props.label || 'Choose a file' }
                <input type="file" className={ className } name={ field.name } onChange={ onChangeHandler }/>
            </label>
            { <div className="text-gray-400 text-sm pl-2 flex items-center truncate text-ellipsis">{ field.value ? field.value.name : 'No File Uploaded' }</div> }
        </div>
    );
}


export { FileUploadField };
