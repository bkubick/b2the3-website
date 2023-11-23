import { motion as m } from 'framer-motion';
import React, { useEffect } from 'react';

import { Stand } from 'src/interface/health/stand';
import { setTitle } from 'src/utils/display';
import FileUploadForm from './FileUploadForm';
import StandChart from './StandChart';
import EnergyBurnedChart from './EnergyBurnedChart';
import * as SampleData from './sample-data';
import { EnergyBurned } from 'src/interface/health/energy';


const StandDataMapping: Record<string, keyof Stand> = {
    id: 'id',
    startDate: 'startDatetime',
    endDate: 'endDatetime',
    unit: 'unit',
    value: 'value',
};


const EnergyBurnedDataMapping: Record<string, keyof EnergyBurned> = {
    id: 'id',
    startDate: 'startDatetime',
    endDate: 'endDatetime',
    unit: 'unit',
    value: 'value',
};


function HealthDashboard(): React.JSX.Element {

    setTitle('Health Dashboard');

    const [standData, setStandData] = React.useState<Stand[]>(SampleData.STAND_DATA);
    const [energyData, setEnergyData] = React.useState<EnergyBurned[]>(SampleData.ENERGY_DATA);

    useEffect(() => {
        setStandData(SampleData.STAND_DATA);
        setEnergyData(SampleData.ENERGY_DATA);
    }, []);

    return (
        <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .25}} exit={{ opacity: 0 }} className={`text-white w-full`}>
            <div className='grid grid-cols-8 mb-4'>
                <div className='col-span-3'>
                    <h1 className='text-2xl font-bold mb-2'>Stand Data</h1>
                    <FileUploadForm<Stand> onSubmitHandler={ setStandData } fieldHeaderMapping={ StandDataMapping } idPrefix='stand-data' headerRowIndex={ 1 }/>
                </div>
                <div className='col-span-5'>
                    <StandChart standData={ standData } />
                </div>
            </div>
            <div className='grid grid-cols-8 mb-4'>
                <div className='col-span-5'>
                    <EnergyBurnedChart data={ energyData } />
                </div>
                <div className='col-span-3'>
                <h1 className='text-2xl font-bold mb-2'>Energy Burned</h1>
                    <FileUploadForm<EnergyBurned> onSubmitHandler={ setEnergyData } fieldHeaderMapping={ EnergyBurnedDataMapping } idPrefix='energy-burned-data' headerRowIndex={ 1 }/>
                </div>
            </div>
        </m.div>
    );
};


export default HealthDashboard;
