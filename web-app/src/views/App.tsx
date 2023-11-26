import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";

import { addCursorFollowerListener } from 'src/utils/listeners';
import RoutesWithAnimation from './RoutesWithAnimation';

import Header from './Header';

interface Section {
    title: string;
    route: string;
}


/**
 * The main component of the application.
 * 
 * @returns The main component of the application.
 */
function App(): React.JSX.Element {

    const sections: Section[] = [
        {title: 'home', route: '/'},
        {title: 'health', route: '/health'},
        {title: 'tools', route: '/tools'},
    ];

    /**
     * Adds a cursor follower listener when the component mounts.
     */
    useEffect(() => {
        addCursorFollowerListener();
    }, []);

    return (
        <div id='app' className='container mx-auto h-screen w-full overflow-scroll no-scrollbar'>
            <BrowserRouter>
                <Header sections={ sections } />
                <div className='mx-auto flex container-height'>
                    <RoutesWithAnimation />
                </div>
            </BrowserRouter>
        </div>
    )
}


export default App;
