import React from 'react';
import { InView } from 'react-intersection-observer';

import { CollapsiblePanel } from 'src/components/panel';
import Pill from 'src/components/pill';
import { Education } from 'src/interface/portfolio/education';
import { Project } from 'src/interface/portfolio/project';
import { ProfessionalSkill, Technology } from 'src/interface/portfolio/skill';
import { User } from 'src/interface/portfolio/user';
import { WorkExperience } from 'src/interface/portfolio/work-experience';
import StartEndData from 'src/interface/portfolio/StartEndDate';
import * as DisplayUtil from 'src/utils/display';
import UpRight from 'src/static/img/icons/up-right.svg';


interface Props {
    user: User,
    education: Education[],
    projects: Project[],
    workExperiences: WorkExperience[],
}


interface State {
    educationCardLimit: number;
    workExperienceCardLimit: number;
    projectCardLimit: number;
}


class DetailsFrame extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            educationCardLimit: 3,
            workExperienceCardLimit: 10,
            projectCardLimit: 10
        }
    }

    getDateDisplay(startEndData: StartEndData): string {
        const startMonthName = DisplayUtil.getMonthByNumber(startEndData.startMonth, true);
        var dateDisplay: string = `${startMonthName} ${startEndData.startYear}`;
        if (startEndData.endMonth && startEndData.endYear) {
            const endMonthName = DisplayUtil.getMonthByNumber(startEndData.endMonth, true);
            dateDisplay += ` - ${endMonthName} ${startEndData.endYear}`;
        } else {
            dateDisplay += ' - current';
        }
        return dateDisplay;
    }

    workExperienceCard(workExperience: WorkExperience): React.JSX.Element {
        return (
            <InView key={ workExperience.company.name + workExperience.jobTitle }>
                {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                    <div ref={ ref } className={ `card p-2 mb-6 ${inView ? 'animate-fade-in' : ''}`}>
                        <div className='grid grid-flow-col auto-cols-auto'>
                            <img className='col-auto h-12 mr-4 rounded' src={ workExperience.company.img } alt={ workExperience.company.img }/>
                            <div>
                                <div>
                                    <div className='text-lg text-slate-300'>
                                        { workExperience.company.name } - { workExperience.jobTitle }
                                    </div>
                                    <div className='mb-2 uppercase text-xs text-slate-300 pl-6'>
                                        { this.getDateDisplay(workExperience) }
                                    </div>
                                </div>
                                <ul className='list-disc pl-6 mb-4 text-sm'>
                                    {
                                        workExperience.details.map((detail: string) => {
                                            return <li>{ detail }</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='mb-2 flex flex-wrap'>
                            {
                                workExperience.technologies.map((technology: Technology, index: number) => {
                                    return  <Pill key={ `work-experience-technology-${index}` } text={ technology } />
                                })
                            }
                            {
                                workExperience.professionalSkills.map((skill: ProfessionalSkill, index: number) => {
                                    return <Pill key={ `work-experience-professional-skill-${index}` } text={ skill } />
                                })
                            }
                        </div>
                    </div>
                )}
            </InView>
        )
    }

    educationCard(education: Education): React.JSX.Element {
        return (
            <InView key={education.courses + education.degree}>
                {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                    <div ref={ ref } className={ `card p-2 mb-6 ${inView ? 'animate-fade-in' : ''}`}>
                        <CollapsiblePanel>
                            {{
                                icon: <img className='h-12 mr-4 rounded' src={ education.school.img } alt={ education.school.name }/>,
                                header: (
                                    <div>
                                        <div className='text-lg text-slate-300'>
                                            { education.school.name } - { education.degree }
                                        </div>
                                        <div className='pl-6 uppercase text-xs text-slate-300'>
                                            { this.getDateDisplay(education) }  (GPA: { education.gpa.toFixed(2) })
                                        </div>
                                    </div>
                                ),
                                body: (
                                    <ul className={ 'mt-4 list-disc pl-6 text-sm' }>
                                        {
                                            education.details.map((detail: string) => {
                                                return <li>{ detail }</li>
                                            })
                                        }
                                    </ul>
                                )
                            }}
                        </CollapsiblePanel>
                    </div>
                )}
            </InView>
        )
    }

    projectCard(project: Project): React.JSX.Element {
        return (
            <InView key={ project.title }>
                {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                    <div ref={ ref } className={ `card p-2 mb-6 ${inView ? 'animate-fade-in' : ''}`}>
                        <CollapsiblePanel>
                        {{
                            icon: project.img ? <img className='h-12 mr-4 rounded' src={ project.img } alt={ project.title }/> : '',
                            header: (
                                <div>
                                    <div className='text-lg text-slate-300 flex items-center'>
                                        { project.title }
                                        <span className='ml-4'>
                                            {
                                                project.link ? <a href={ project.link } target='_blank'><UpRight className='fill-slate-300 hover:fill-slate-100'/></a> : ''
                                            }
                                        </span>
                                    </div>
                                    <div className='mb-2 pl-6 uppercase text-xs text-slate-300'>
                                        { this.getDateDisplay(project) }
                                    </div>
                                </div>
                            ),
                            body: (
                                <ul className='list-disc pl-6 mb-4 text-sm'>
                                    {
                                        project.details.map((detail: string) => {
                                            return <li>{ detail }</li>
                                        })
                                    }
                                </ul>
                            )
                        }}
                        </CollapsiblePanel>
                        <div className='mb-2 flex flex-wrap'>
                            {
                                project.technologies.map((technology: Technology, index: number) => {
                                    return <Pill key={ `project-technology-${index}` } text={ technology } />
                                })
                            }
                        </div>
                    </div>
                )}
            </InView>
        )
    }

    getWorkExperienceCards(): React.JSX.Element[] {
        var htmlCards: React.JSX.Element[] = [];
        const numCards = this.state.workExperienceCardLimit > this.props.workExperiences.length ? this.props.workExperiences.length : this.state.workExperienceCardLimit;
        for (let i = 0; i < numCards; i++) {
            htmlCards.push(this.workExperienceCard(this.props.workExperiences[i]));
        }

        return htmlCards;
    }

    getEducationCards(): React.JSX.Element[] {
        var htmlCards: React.JSX.Element[] = [];
        const numCards = this.state.educationCardLimit > this.props.education.length ? this.props.education.length : this.state.educationCardLimit;
        for (let i = 0; i < numCards; i++) {
            htmlCards.push(this.educationCard(this.props.education[i]));
        }

        return htmlCards;
    }

    getProjectCards(): React.JSX.Element[] {
        var htmlCards: React.JSX.Element[] = [];
        const numCards = this.state.projectCardLimit > this.props.projects.length ? this.props.projects.length : this.state.projectCardLimit;
        for (let i = 0; i < numCards; i++) {
            htmlCards.push(this.projectCard(this.props.projects[i]));
        }

        return htmlCards;
    }

    render(): React.JSX.Element {
        return (
            <div className="ml-12 mr-4">
                <InView key="about-me">
                    {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                        <div ref={ ref } id="about" className={`section mb-20 ${inView ? 'animate-fade-in' : ''}`}>
                            <div className='sticky top-0 backdrop-blur z-10 uppercase py-2 text-xl text-white mb-4'>
                                About Me
                            </div>
                            <div className='text-slate-400' dangerouslySetInnerHTML={ DisplayUtil.createMarkup(this.props.user.about) }>
                            </div>
                        </div>
                    )}
                </InView>
                <div id="experience" className='section mb-20'>
                    <InView key="experiences">
                        {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                            <div ref={ ref } className={`sticky top-0 backdrop-blur z-10 uppercase text-xl py-2 text-white mb-4 ${inView ? 'animate-fade-in' : ''}`}>
                                Work Experience
                            </div>
                        )}
                    </InView>
                    <div className='text-slate-400'>
                        { 
                            this.getWorkExperienceCards()
                        }
                    </div>
                </div>
                <div id="background" className='section mb-20'>
                    <InView key="background-skills-education">
                        {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                            <div ref={ ref } className={`sticky top-0 backdrop-blur z-10 uppercase text-xl py-2 text-white mb-4 ${inView ? 'animate-fade-in' : ''}`}>
                                Skills & Education
                            </div>
                        )}
                    </InView>
                    <div className='text-slate-400'>
                        {
                            this.getEducationCards()
                        }
                    </div>
                </div>
                <div id="personal" className='section mb-20'>
                    <InView key="personal-projects-interests">
                        {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                            <div ref={ ref } className={`sticky top-0 backdrop-blur z-10 uppercase text-xl py-2 text-white mb-4 ${inView ? 'animate-fade-in' : ''}`}>
                                Personal Projects
                            </div>
                        )}
                    </InView>
                    <div className='text-slate-400'>
                        { 
                            this.getProjectCards()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsFrame;
