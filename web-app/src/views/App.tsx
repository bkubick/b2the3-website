import React from 'react';
import { Outlet } from "react-router-dom";

import { addCursorFollowerListener } from 'src/utils/followers';

import Header from './Header';


interface Props {}


interface State {}


class App extends React.Component<Props, State> {

    sections: string[] = [
        'home',
        'tools',
    ];

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
            <div id='app' className='container mx-auto h-screen w-full'>
                <Header sections={ this.sections } activeSection='home'/>
                <div className='mx-auto flex container-height'>
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default App;
