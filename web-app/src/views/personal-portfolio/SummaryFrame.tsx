import React from 'react';

import { User } from 'src/interface/user';
import Logo from 'src/static/img/b_to_the_3_logo.svg';
import Github from 'src/static/img/github.svg';
import LinkedIn from 'src/static/img/linked-in.svg';
import Envelope from 'src/static/img/envelope.svg';


interface Props {
    user: User;
    sections: string[];
    activeSection: string;
    classNames: string;
}


interface State {
    localActiveSection: string;
    startingActiveCircleXPosition: number;
    currentActiveCircleXPosition: number;
}


class SummaryFrame extends React.Component<Props, State> {
    navLinkSectionIds: Record<string, string> = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            startingActiveCircleXPosition: 0,
            currentActiveCircleXPosition: 0,
            localActiveSection: this.props.activeSection,
        };

        this.props.sections.forEach((section: string) => {
            this.navLinkSectionIds[section] = `nav-link-section-${section}`;
        });
    }

    componentDidMount(): void {
        this.addResizeWindowListener();

        const circleStartingXPos: number = this.getNavbarSectionXPosition(this.props.sections[0]);
        this.setState({
            startingActiveCircleXPosition: circleStartingXPos,
            currentActiveCircleXPosition: circleStartingXPos,
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

    getNavbarSectionXPosition(section: string): number {
        const sectionElement: HTMLElement | null = document.getElementById(this.navLinkSectionIds[section]);
        
        if (!sectionElement) {
            throw Error(`Navbar Section ${section} does not exist.`)
        }
        return sectionElement.offsetLeft;
    }

    calculateNavbarXPosition(): number {
        return this.state.currentActiveCircleXPosition - this.state.startingActiveCircleXPosition; 
    }

    navItem(section: string): React.JSX.Element {
        if (this.props.activeSection === section && this.state.localActiveSection != this.props.activeSection) {
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
            <div key={section} className='mx-1 text-center'>
                <a id={ this.navLinkSectionIds[section] } href={`#${section}`}>
                    <div className={ titleClass }>
                        { section }
                    </div>
                </a>
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
        const socialMediaIconClassName: string = 'hover:scale-125 transition ease-in-out duration-300';
        return (
            <div className={ `py-10 mx-12 flex flex-col justify-between ${ this.props.classNames }`}>
                <div className='mb-4'>
                    <div className="text-white flex">
                        <Logo className='logo'/>
                        <div className='mx-5 flex my-2'>
                            { this.props.sections.map((section: string) => {
                                return this.navItem(section);
                            })}
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <div>
                        <div className='uppercase text-white mb-2 text-4xl'>
                            { `${this.props.user.summaryDetails.firstName} ${this.props.user.summaryDetails.lastName}` }
                        </div>
                        <div className='text-slate-300 mb-8 text-2xl'>
                            { this.props.user.summaryDetails.tagline }
                        </div>
                        <div className='text-slate-400 mb-8 text-base'>
                            { this.props.user.summaryDetails.summary }
                        </div>
                    </div>
                    <div>
                        <a href="/personal-portfolio/Resume-BrandonKubick.pdf" target='_blank'>
                            <div className='btn btn-primary-outline cursor-pointer'>Resume</div>
                        </a>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='flex mb-4 items-center'>
                        <a href={`mailto:${this.props.user.contactInfo.email}`} target='_blank'>
                            <Envelope className={socialMediaIconClassName} />
                        </a>
                        <a className='ml-6' href={this.props.user.contactInfo.github} target='_blank'>
                            <Github className={socialMediaIconClassName}/>
                        </a>
                        <a className='ml-6' href={this.props.user.contactInfo.linkedIn} target='_blank'>
                            <LinkedIn className={socialMediaIconClassName}/>
                        </a>
                    </div>
                    <div className='text-slate-400 mb-4'>
                        This was created by Branding Kubick, built using React, TypeScript, and TailWind.
                        I want to point out that I am not a designer! This portfolio
                        is meant to showcase my experience through actual development!
                    </div>
                </div>
            </div>
        )
    }
}

export default SummaryFrame;
