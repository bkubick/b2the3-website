import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

import Logo from 'src/static/img/b_to_the_3_logo.svg';


interface Section {
    title: string;
    route: string;
}


interface Props {
    sections: Section[];
    classNames?: string;
}


function Header(props: Props) {
    // Finding Active Section
    const location = useLocation();
    const activeSection = props.sections.find((section: Section) => {
        if (location.pathname === '/' && section.route === '/') {
            return true;
        }
        
        if (location.pathname.startsWith(section.route) && section.route !== '/') {
            return true;
        } 
        return false;
    });

    if (!activeSection) {
        throw Error(`No active section found for route ${location.pathname}`);
    }

    // Generating Navbar Section Ids for positioning
    const navLinkSectionIds: Record<string, string> = {};
    props.sections.forEach((section: Section) => {
        navLinkSectionIds[section.title] = `nav-link-section-${section.title}`;
    });

    // Setting states
    const [localActiveSection, setLocalActiveSection] = useState<Section>(activeSection);
    const [startingSection, setStartingSection] = useState<Section>(activeSection);
    const [startingActiveCircleXPosition, setStartingActiveCircleXPosition] = useState<number>(0);
    const [currentActiveCircleXPosition, setCurrentActiveCircleXPosition] = useState<number>(0);

    /**
     * Gets the x position of the section.
     * 
     * @param section the section to get the x position of.
     * @returns the x position of the section.
     */
    const getNavbarSectionXPosition = (section: Section): number => {
        const sectionElement: HTMLElement | null = document.getElementById(navLinkSectionIds[section.title]);

        if (!sectionElement) {
            throw Error(`Navbar Section ${section} does not exist.`)
        }
        return sectionElement.offsetLeft;
    }

    /**
     * Calculates the x position of the circle.
     * 
     * @returns the x position of the circle.
     */
    const calculateNavbarXPosition = (): number => {
        return currentActiveCircleXPosition - startingActiveCircleXPosition; 
    }

    /**
     * Generates the nav item for the section.
     * 
     * @param section the section to generate the nav item for.
     * @returns the nav item for the section.
     */
    const navItem = (section: Section): React.JSX.Element => {
        if (activeSection.title === section.title && localActiveSection.title != activeSection.title) {
            setLocalActiveSection(section);
            setCurrentActiveCircleXPosition(getNavbarSectionXPosition(section));
        }

        const titleClass = 'leading-4 text-xs uppercase font-bold transition ease-in-out duration-150 hover:-translate-y-0.5 hover:scale-105';
        const circleClass = `h-2 w-2 bg-primary rounded-full inline-block duration-300`;
        const activeCircleStyle = {
            transitionDuration: '300ms',
            transform: `translateX(${calculateNavbarXPosition()}px)`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }

        return (
            <div key={section.title} className='mx-1 text-center'>
                <Link id={ navLinkSectionIds[section.title] } to={section.route} className={ titleClass }>
                    { section.title }
                </Link>
                {
                    section == startingSection ? (
                        <div id="active-nav-circle" className="leading-4" style={ activeCircleStyle }>
                            <span className={ circleClass }></span>
                        </div>
                    ) : ''
                }
            </div>
        )
    }

    // Setting Up position on page load
    useEffect(() => {
        const startingCircleXPosition: number = getNavbarSectionXPosition(activeSection);

        setStartingSection(activeSection);
        setStartingActiveCircleXPosition(startingCircleXPosition);
        setCurrentActiveCircleXPosition(startingCircleXPosition);
    }, [ props ]);

    // Rendering
    return (
        <div className={`py-6 top-0 backdrop-blur z-10 sticky ${ props.classNames ? props.classNames : '' }`}>
            <div className="text-white flex">
                <Logo className='logo'/>
                <div className='mx-5 flex my-2'>
                    { props.sections.map((section: Section) => {
                        return navItem(section);
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header;
