import { motion as m } from 'framer-motion';
import React from 'react';
import { Link } from "react-router-dom";

import CoverLetterGeneratorImg from 'src/static/img/pages/cover_letter_generator.png';
import StartupIdeaGeneratorImg from 'src/static/img/pages/startup_idea_generator.png';
import { setTitle } from 'src/utils/display';
import { preloadImages } from 'src/utils/loading';


interface ToolCard {
    title: string,
    description: string,
    link: string,
    image: string,
}


interface Props {}


interface State {}


class ToolMenu extends React.Component<Props, State> {

    toolCards: ToolCard[] = [
        {
            title: 'Cover Letter Generator',
            description: `
                A tool to generate a cover letter for a job application. This tool uses
                Chatbot technology to ask you questions about yourself and the job you are
                applying for. The answers to these questions are then used to generate a
                tailored cover letter with your information and the job information.
            `,
            link: '/tools/cover_letter_generator',
            image: CoverLetterGeneratorImg,
        },
        {
            title: 'Startup Idea Generator',
            description: `A tool to generate startup ideas. This tool uses Chatbot technology
                to ask you questions about yourself and your interests, along with details around
                the industry or startup idea you want to focus on. The answers to these questions
                are then used to generate a list of startup ideas for you.
            `,
            link: '/tools/startup_idea_generator',
            image: StartupIdeaGeneratorImg,
        },
    ];

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    /**
     * Adds a cursor follower listener when the component mounts.
     */
    componentDidMount(): void {
        setTitle('Tools')

        const images: string[] = this.toolCards.map((toolCard) => { if (toolCard.image) return toolCard.image; }) as string[];
        preloadImages(images);
    }

    /**
     * Renders a tool card.
     * @param toolCard The tool card to render.
     * @param index The index of the tool card.
     */
    renderToolCard(toolCard: ToolCard, index: number): React.JSX.Element {
        return (
            <div key={index} className='px-5 mb-8 w-full flex h-fit'>
                <Link to={toolCard.link} className='card p-12 text-white w-full'>
                    { toolCard.image ? <img src={toolCard.image} alt={toolCard.title} className='mt-4 w-8/12 mx-auto' /> : null}
                    <h2 className='text-2xl mb-2 text-center'>{toolCard.title}</h2>
                    <p className='text-xs text-justify'>{toolCard.description}</p>
                </Link>
            </div>
        )
    }

    render(): React.JSX.Element {
        return (
            <m.main initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .25}} exit={{ opacity: 0 }} className={`my-12 w-full flex`}>
                { this.toolCards.map((toolCard, index) => this.renderToolCard(toolCard, index)) }
            </m.main>
        )
    }
}


export default ToolMenu;
