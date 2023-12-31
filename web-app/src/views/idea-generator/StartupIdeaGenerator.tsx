import { motion as m } from 'framer-motion';
import React, { ReactElement } from 'react';

import IdeaGeneratorForm from './IdeaGeneratorForm';
import { Tab, TopNav } from 'src/components/navigation';
import { Spinner } from 'src/components/loading';
import { setTitle } from 'src/utils/display';


interface Props {}


/**
 * The state for the startup idea generator.
 * 
 * @property generatedStartupIdea   The generated startup idea.
 * @property currentTab   The current tab.
 * @property generating   Whether or not the startup idea is being generated.
 */
interface State {
    generatedStartupIdea: string;
    currentTab: Tab;
    generating: boolean;
}


/**
 * The startup idea generator.
 */
class StartupIdeaGenerator extends React.Component<Props, State> {

    /**
     * The tabs for the startup idea generator.
     */
    tabs: Tab[] = [
        { name: 'Startup Idea', id: 'startup-idea' },
    ]

    constructor(props: Props) {
        super(props);

        this.state = {
            generatedStartupIdea: '',
            currentTab: this.tabs[0],
            generating: false,
        };

        this.setActiveTab = this.setActiveTab.bind(this);
        this.setGenerating = this.setGenerating.bind(this);
        this.setGeneratedStartupIdea = this.setGeneratedStartupIdea.bind(this);
    }

    componentDidMount() {
        setTitle('Startup Idea Generator');
    }

    /**
     * Generates the startup idea text display.
     * Default text is 'No startup idea generated.... yet!'
     * 
     * @returns The startup idea text display.
     */
    get generateStartupIdeaTextDisplay(): ReactElement[] {
        if (this.state.generating) {
            return [<Spinner key='spinner' />];
        }

        const text: string = this.state.generatedStartupIdea || 'No startup idea generated.... yet!';
        return text.split(/\n/).map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>);
    }

    /**
     * Sets the active tab.
     * 
     * @param tab The tab to set as active.
     */
    setActiveTab(tab: Tab) {
        this.setState({
            currentTab: tab,
        });
    }

    /**
     * Sets the generating state.
     * This is used to hide/display the loading spinner.
     */
    setGenerating(generating: boolean) {
        this.setState({
            generating: generating,
        });
    }

    /**
     * Sets the generated startup idea.
     * 
     * @param generatedStartupIdea  The generated startup idea.
     */
    setGeneratedStartupIdea(generatedStartupIdea: string) {
        this.setState({
            generatedStartupIdea: generatedStartupIdea,
        });
    }

    /**
     * The render method for the startup idea generator.
     * 
     * @returns The startup idea generator.
     */
    render(): ReactElement {
        return (
            <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .25}} exit={{ opacity: 0 }} className={`text-white w-full`}>
                <div className='grid lg:grid-cols-12'>
                    <div className={`col-span-5 lg:overflow-hidden`}>
                        <div className='overflow-y-scroll no-scrollbar pr-5'>
                            <div className='container-height'>
                                <h1 className='sticky top-0 z-10 backdrop-blur uppercase text-2xl font-medium py-5'>
                                    Startup Idea Generator
                                </h1>
                                <IdeaGeneratorForm generatingHandler={ this.setGenerating } generatedStartupIdeaHandler={ this.setGeneratedStartupIdea }/>
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-7 lg:overflow-hidden`}>
                        <div className='overflow-y-scroll no-scrollbar pl-5'>
                            <div className='container-height'>
                                <TopNav tabs={ this.tabs } activeTab={ this.state.currentTab } setActiveTab={ this.setActiveTab }></TopNav>

                                <div id={ this.tabs[0].id } className={`py-3 h-auto ${this.tabs[0].id === this.state.currentTab.id ? "visible" : "hidden"}`}>
                                    { this.generateStartupIdeaTextDisplay }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </m.div>
        );
      }
};


export default StartupIdeaGenerator;
