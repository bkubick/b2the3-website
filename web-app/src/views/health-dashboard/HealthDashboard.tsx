import { motion as m } from 'framer-motion';
import React from 'react';

import { setTitle } from 'src/utils/display';
import StandChart from './StandChart';
import EnergyBurnedChart from './EnergyBurnedChart';
import * as SampleData from './sample-data';


function HealthDashboard(): React.JSX.Element {

    setTitle('Health Dashboard');

    return (
        <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .25}} exit={{ opacity: 0 }} className={`text-white w-full`}>
            <StandChart standData={SampleData.STAND_DATA} />
            <EnergyBurnedChart data={SampleData.ENERGY_DATA} />
        </m.div>
    );
};


export default HealthDashboard;
