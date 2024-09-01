import React from 'react';


interface Props {
    text: string;
    textColor?: string;
    borderColor?: string;
}


/**
 * Render function for the pill component.
 * 
 * @param props the props for the pill component.
 * @returns the pill component.
 */
function Pill(props: Props): React.JSX.Element {
    const borderColorClass = props.borderColor ? `border-${props.borderColor}` : 'border-primary';
    const textColorClass = props.textColor ? `text-${props.textColor}` : 'text-primary';

    return (
        <span className={`border-1 rounded-full px-4 py-1 text-xxs mx-1 mb-1 ${borderColorClass} ${textColorClass}`}>
            {props.text}
        </span>
    );
}


export default Pill;
