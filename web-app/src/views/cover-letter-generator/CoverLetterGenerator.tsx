import React, { ReactElement } from 'react';

import { Tab, TopNav } from 'src/components/navigation';
import { Spinner } from 'src/components/loading';
import CoverLetterGeneratorForm from './CoverLetterGeneratorForm';


interface Props {}


interface State {
    generatedCoverLetter: string;
    currentTab: Tab;
    generating: boolean;
}


class CoverLetterGenerator extends React.Component<Props, State> {

    /**
     * The tabs for the cover letter generator.
     */
    tabs: Tab[] = [
        { name: 'Cover Letter', id: 'cover-letter' },
    ]

    constructor(props: Props) {
        super(props);

        this.state = {
            generatedCoverLetter: '',
            currentTab: { name: 'Cover Letter', id: 'cover-letter' },

            generating: false,
        };

        this.setActiveTab = this.setActiveTab.bind(this);
        this.setGeneratedCoverLetter = this.setGeneratedCoverLetter.bind(this);
        this.setGenerating = this.setGenerating.bind(this);
    }

    /**
     * Generates the cover letter text display.
     * Default text is 'No cover letter generated.... yet!'
     * 
     * @returns The cover letter text display.
     */
    get generateCoverLetterTextDisplay(): ReactElement[] {
        if (this.state.generating) {
            return [<Spinner key='spinner' />];
        }

        const text: string = this.state.generatedCoverLetter || 'No cover letter generated.... yet!';
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
        console.log('setGenerating')
        this.setState({
            generating: generating,
        });
    }

    /**
     * Sets the generated cover letter.
     * 
     * @param generatedCoverLetter  The generated cover letter.
     */
    setGeneratedCoverLetter(generatedCoverLetter: string) {
        this.setState({
            generatedCoverLetter: generatedCoverLetter,
        });
    }

    render() {
        return (
          <div className="text-white w-full">
            <div className='grid lg:grid-cols-12'>
                <div className='col-span-5 lg:overflow-hidden flex'>
                    <div className='overflow-y-scroll no-scrollbar pr-5'>
                        <div className='flex flex-col container-height'>
                            <h1 className='sticky top-0 z-10 backdrop-blur uppercase text-2xl font-medium py-5'>
                                Cover Letter Generator
                            </h1>
                            <CoverLetterGeneratorForm generatingHandler={ this.setGenerating } generatedCoverLetterHandler={ this.setGeneratedCoverLetter }/>
                        </div>
                    </div>
                </div>
                <div className='col-span-7 lg:overflow-hidden'>
                    <div className='overflow-y-scroll no-scrollbar pl-5'>
                        <div className='flex flex-col container-height'>
                            <TopNav tabs={ this.tabs } activeTab={ this.state.currentTab } setActiveTab={ this.setActiveTab }></TopNav>

                            <div id={ this.tabs[0].id } className={`py-3 h-auto ${this.tabs[0].id === this.state.currentTab.id ? "visible" : "hidden"}`}>
                                { this.generateCoverLetterTextDisplay }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      }
};

export default CoverLetterGenerator;
