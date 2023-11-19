import React from 'react';

import { User } from 'src/interface/portfolio/user';
import Github from 'src/static/img/icons/github.svg';
import LinkedIn from 'src/static/img/icons/linked-in.svg';
import Envelope from 'src/static/img/icons/envelope.svg';


interface Props {
    user: User;
    classNames?: string;
}


interface State {}


class SummaryFrame extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const socialMediaIconClassName: string = 'hover:scale-125 transition ease-in-out duration-300';
        return (
            <div className={ `py-10 ml-4 mr-12 flex flex-col justify-between ${ this.props.classNames }`}>
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
                        <a href="./Resume-BrandonKubick-Summary.pdf" target='_blank'>
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
                    <div className='text-slate-400 mb-4 text-xs'>
                        This was created by Branding Kubick, built using React, TypeScript, and Tailwind.
                        I want to point out that I am not a designer! This portfolio
                        is meant to showcase my experience through actual development!
                    </div>
                </div>
            </div>
        )
    }
}

export default SummaryFrame;
