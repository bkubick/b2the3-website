import React from 'react';
import { Outlet } from "react-router-dom";

import { addCursorFollowerListener } from 'src/utils/followers';


interface Props {}


interface State {}


class App extends React.Component<Props, State> {

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
                <Outlet />
            </div>
        )
    }
}

export default App;
