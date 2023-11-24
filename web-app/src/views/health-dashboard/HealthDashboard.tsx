import { motion as m } from 'framer-motion';
import React, { useEffect } from 'react';
import { InView } from 'react-intersection-observer';

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

    setTitle('Health');

    const [standData, setStandData] = React.useState<Stand[]>(SampleData.STAND_DATA);
    const [energyData, setEnergyData] = React.useState<EnergyBurned[]>(SampleData.ENERGY_DATA);

    useEffect(() => {
        setStandData(SampleData.STAND_DATA);
        setEnergyData(SampleData.ENERGY_DATA);
    }, []);

    return (
        <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .25}} exit={{ opacity: 0 }} className={`text-white w-full`}>
            <InView>
                {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                    <div ref={ ref } className={`mb-16 ${inView ? 'animate-fade-in' : 'animate-fade-out'}`}>
                        <h1 className='text-4xl mb-2'>Health Analytics</h1>
                        <p className='mt-3 text-slate-300 text-sm'>
                            This page is a dashboard for your health data. You can download your health data as a CSV from the Iphone app, Simple Health 
                            Export CSV (available on the App Store for the Iphone). This page currently only supports CSV files downloaded
                            from the Simple Health Export CSV app.
                            <br />
                            <br />
                            Avoid uploading CSV files that contain data that is not supported by this page. For example, if you upload a CSV file that
                            contains step data, the step data will not be displayed on this page. Additionally, avoid uploading CSV files that contain
                            a significant amount of data. For example, if you upload a CSV file that contains data for the past year, the page may crash
                            or become unresponsive. Support for large amounts of data will be added in the future.
                        </p>
                    </div>
                )}
            </InView>
            <InView>
                {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                    <div ref={ ref } className={`grid grid-cols-8 mb-16 ${inView ? 'animate-fade-in' : 'animate-fade-out'}`}>
                        <div className='col-span-3 mr-1'>
                            <h1 className='text-2xl mb-2'>Stand Data</h1>
                            <FileUploadForm<Stand> onSubmitHandler={ setStandData } fieldHeaderMapping={ StandDataMapping } idPrefix='stand-data' headerRowIndex={ 1 }/>
                            <p className='mt-3 text-slate-300 text-sm'>
                                View your stand data from your Apple Watch. Upload a CSV file containing your stand data using the CSV app,
                                Simple Health Export CSV, which can be downloaded from the App Store. The CSV file must contain the following columns:
                                startDate, endDate, unit, value.
                                <br />
                                <br />
                                Stand data is the amount of time you have stood up and moved around for at least one minute during the day. The stand data is
                                collected by the Apple Watch and is displayed in the Activity app on the Apple Watch and iPhone. The stand data is also
                                displayed in the Health app on the iPhone.
                            </p>
                        </div>
                        <div className='col-span-5'>
                            <StandChart standData={ standData } />
                        </div>
                    </div>
                )}
            </InView>
            <InView>
                {({ inView, ref }: { inView: boolean, ref: React.RefObject<HTMLDivElement> }) => (
                    <div ref={ ref } className={`grid grid-cols-8 mb-16 ${inView ? 'animate-fade-in' : 'animate-fade-out'}`}>
                        <div className='col-span-5 mr-1'>
                            <EnergyBurnedChart data={ energyData } />
                        </div>
                        <div className='col-span-3'>
                            <h1 className='text-2xl mb-2'>Energy Burned</h1>
                            <FileUploadForm<EnergyBurned> onSubmitHandler={ setEnergyData } fieldHeaderMapping={ EnergyBurnedDataMapping } idPrefix='energy-burned-data' headerRowIndex={ 1 }/>
                            <p className='mt-3 text-slate-300 text-sm'>
                                View your energy burned data from your Apple Watch. Upload a CSV file containing your energy burned data to view your
                                energy burned data using the CSV app, Simple Health Export CSV, which can be downloaded from the App Store. The CSV file
                                must contain the following columns: startDate, endDate, unit, value.
                                <br />
                                <br />
                                There are two types of energy burned data: active and resting. Using the above mentioned app, you can export active and
                                basal energy burned data. Basal energy burned is similar to resting energy burned. The difference between basal and resting
                                energy burned is that basal energy burned is the energy burned while you are resting and awake. Resting energy burned is the
                                energy burned while you are resting and asleep.
                            </p>
                        </div>
                    </div>
                )}
            </InView>
        </m.div>
    );
};


export default HealthDashboard;
