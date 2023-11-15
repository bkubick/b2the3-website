import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { BreadCrumb } from './types';


interface Props {
    crumbs: BreadCrumb[];
}

/**
 * Generates the BreadCrumbs component.
 * 
 * @param props the props for the BreadCrumbs component.
 * @returns the generated BreadCrumbs component.
 */
function BreadCrumbs(props: Props): React.JSX.Element {
    return (
        <div id='bread-crumbs' className='flex justify-center'>
            { props.crumbs.map((crumb, index) => {
                return (
                    <div key={ index } className='flex items-center'>
                        <Link to={ crumb.route } className='text-gray-400 text-sm'>
                            { crumb.title }
                        </Link>
                        { index !== props.crumbs.length - 1 && <span className='text-gray-400 text-sm mx-2'> <FontAwesomeIcon icon={ faChevronRight }/> </span> }
                    </div>
                )
            }) }
        </div>
    )
};


export default BreadCrumbs;
