import React from 'react';
import { Link } from "react-router-dom";

import { addCursorFollowerListener } from 'src/utils/followers';


interface Props {}


interface State {}


class ToolMenu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    /**
     * Adds a cursor follower listener when the component mounts.
     */
    componentDidMount(): void {
        addCursorFollowerListener();
    }

    render() {
        return (
            <div id='app' className='container mx-auto h-screen flex'>
                <Link to='/portfolio' className='card'>
                    Personal Portfolio
                </Link>
                <Link to='/cover_letter_generator' className='card'>
                    Cover Letter Generator
                </Link>
                <Link to='/startup_idea_generator' className='card'>
                    Startup Idea Generator
                </Link>
            </div>
        )
    }
}


export default ToolMenu;
