import React from 'react';
import { Link, useLocation } from "react-router-dom";

import Logo from 'src/static/img/b_to_the_3_logo.svg';


interface Section {
    title: string;
    route: string;
}


interface Props {
    sections: Section[];
    activeSection: Section;
    classNames?: string;
}


interface State {
    localActiveSection: Section;
    startingActiveCircleXPosition: number;
    currentActiveCircleXPosition: number;
}


class Header extends React.Component<Props, State> {
    navLinkSectionIds: Record<string, string> = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            startingActiveCircleXPosition: 0,
            currentActiveCircleXPosition: 0,
            localActiveSection: this.props.activeSection,
        };

        this.props.sections.forEach((section: Section) => {
            this.navLinkSectionIds[section.title] = `nav-link-section-${section.title}`;
        });
    }

    componentDidMount(): void {
        this.addResizeWindowListener();

        const circleStartingXPos: number = this.getNavbarSectionXPosition(this.props.sections[0]);
        const currentActiveCircleXPos: number = this.getNavbarSectionXPosition(this.props.activeSection);
        this.setState({
            startingActiveCircleXPosition: circleStartingXPos,
            currentActiveCircleXPosition: currentActiveCircleXPos,
        });
    }

    addResizeWindowListener(): void {
        window.addEventListener('resize', () => {
            this.setState({
                startingActiveCircleXPosition: this.getNavbarSectionXPosition(this.props.sections[0]),
                currentActiveCircleXPosition: this.getNavbarSectionXPosition(this.props.activeSection),
            });
        });
    }

    getNavbarSectionXPosition(section: Section): number {
        const sectionElement: HTMLElement | null = document.getElementById(this.navLinkSectionIds[section.title]);

        if (!sectionElement) {
            throw Error(`Navbar Section ${section} does not exist.`)
        }
        return sectionElement.offsetLeft;
    }

    calculateNavbarXPosition(): number {
        return this.state.currentActiveCircleXPosition - this.state.startingActiveCircleXPosition; 
    }

    navItem(section: Section): React.JSX.Element {
        if (this.props.activeSection.title === section.title && this.state.localActiveSection.title != this.props.activeSection.title) {
            this.setState({
                localActiveSection: section,
                currentActiveCircleXPosition: this.getNavbarSectionXPosition(section),
            });
        }

        const titleClass = 'leading-4 text-xs uppercase font-bold transition ease-in-out duration-150 hover:-translate-y-0.5 hover:scale-105';
        const circleClass = `h-2 w-2 bg-primary rounded-full inline-block duration-300`;
        const activeCircleStyle = {
            transitionDuration: '300ms',
            transform: `translateX(${this.calculateNavbarXPosition()}px)`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }

        return (
            <div key={section.title} className='mx-1 text-center'>
                <Link id={ this.navLinkSectionIds[section.title] } to={section.route} className={ titleClass }>
                    { section.title }
                </Link>
                {
                    section == this.props.sections[0] ? (
                        <div id="active-nav-circle" className="leading-4" style={ activeCircleStyle }>
                            <span className={ circleClass }></span>
                        </div>
                    ) : ''
                }

            </div>
        )
    }

    render() {
        return (
            <div className={`py-6 top-0 backdrop-blur z-10 sticky ${ this.props.classNames ? this.props.classNames : '' }`}>
                <div className="text-white flex">
                    <Logo className='logo'/>
                    <div className='mx-5 flex my-2'>
                        { this.props.sections.map((section: Section) => {
                            return this.navItem(section);
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const HeaderWrapper = (props: Props) => {
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

    return (
        <Header {...props} activeSection={ activeSection }/>
    )
}

export default HeaderWrapper;
