import React from 'react';


interface Props {
    text: string;
}


function Pill(props: Props): React.JSX.Element {
  return (
    <span className="border-2 rounded-full px-4 py-1 text-xs mx-1 mb-1 text-primary border-primary">
        {props.text}
    </span>
  );
}


export default Pill;
