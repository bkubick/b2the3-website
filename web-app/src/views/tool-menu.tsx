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
                <Link to='/portfolio'>
                    <div className='card'>
                        Personal Portfolio
                    </div>
                </Link>
                <Link to='/cover_letter_generator'>
                    <div className='card'>
                        Cover Letter Generator
                    </div>
                </Link>
                <Link to='/startup_idea_generator'>
                    <div className='card'>
                        Startup Idea Generator
                    </div>
                </Link>
            </div>
        )
    }
}


export default ToolMenu;
