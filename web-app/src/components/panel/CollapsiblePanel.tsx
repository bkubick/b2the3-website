import React, { useEffect, useRef, useState } from 'react';

interface ChildrenProps {
    icon?: React.ReactNode;
    header: React.ReactNode;
    body: React.ReactNode;
}

/**
 * A collapsible panel that can be toggled open and closed.
 * 
 * @param children.icon The icon to display next to the header.
 * @param children.header The header of the panel.
 * @param children.body The body of the panel.
 * @returns the collapsible panel.
 */
const CollapsiblePanel = ({children}: { children: ChildrenProps }) => {
    // Toggle the panel
    const [isOpen, setIsOpen] = useState(false);
    const togglePanel = () => setIsOpen(!isOpen);

    // Update height of the body when the panel is opened or closed
    const bodyRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        if (isOpen) setHeight(bodyRef.current?.getBoundingClientRect().height || 0);
        else setHeight(0);
    }, [isOpen]);

    // Render the panel
    return (
        <div className={`cursor-pointer grid grid-flow-col grid-cols-[auto_1fr] ${isOpen ? 'open' : ''}`} onClick={togglePanel}>
            {children.icon ? <div>{children.icon}</div> : null}
            <div>
                <div>{children.header}</div>
                <div className='overflow-hidden transition-height ease-in-out duration-200' style={{ height }}>
                    <div ref={bodyRef}>
                        <div className='p-1'>{children.body}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CollapsiblePanel;
