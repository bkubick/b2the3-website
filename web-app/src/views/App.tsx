import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { addCursorFollowerListener } from 'src/utils/followers';
import RoutesWithAnimation from './RoutesWithAnimation';

import Header from './Header';

interface Section {
    title: string;
    route: string;
}


interface Props {}


interface State {}


class App extends React.Component<Props, State> {

    sections: Section[] = [
        {title: 'home', route: '/'},
        {title: 'tools', route: '/tools'},
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
                <BrowserRouter>
                    <Header sections={ this.sections } />
                    <div className='mx-auto flex container-height'>
                        <RoutesWithAnimation />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
