import { motion as m } from 'framer-motion';
import React, { ReactElement } from 'react';

import { Spinner } from 'src/components/loading';
import { setTitle } from 'src/utils/display';


interface Props {}


interface State {}


class HealthDashboard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        setTitle('Health Dashboard');
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
                    Health Dashboard
                </div>
            </m.div>
        );
      }
};


export default HealthDashboard;
