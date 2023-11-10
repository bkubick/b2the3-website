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
            <div className='mx-auto flex align-middle justify-between mt-12'>
                <div className='px-5'>
                    <Link to='/tools/cover_letter_generator' className='card text-white'>
                        Cover Letter Generator
                    </Link>
                </div>
                <div className='px-5'>
                    <Link to='/tools/startup_idea_generator' className='card text-white'>
                        Startup Idea Generator
                    </Link>
                </div>
            </div>
        )
    }
}


export default ToolMenu;
