import { motion as m } from 'framer-motion';
import React, { useEffect } from 'react';

import { EnergyBurned } from 'src/interface/health/energy';
import { Stand } from 'src/interface/health/stand';
import { setTitle } from 'src/utils/display';
import ChartFilterForm from './ChartFilterForm';
import FileUploadForm from './FileUploadForm';
import StandChart from './StandChart';
import EnergyBurnedChart from './EnergyBurnedChart';
import * as SampleData from './sample-data';


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
    // Set the title of the page.
    setTitle('Health');

    // Declare the state variables.
    const [standData, setStandData] = React.useState<Stand[]>(SampleData.STAND_DATA);
    const [energyData, setEnergyData] = React.useState<EnergyBurned[]>(SampleData.ENERGY_DATA);
    const [standMinDatetime, setStandMinDatetime] = React.useState<Date>(new Date(standData[0].startDatetime));
    const [standMaxDatetime, setStandMaxDatetime] = React.useState<Date>(new Date(standData[standData.length - 1].startDatetime));
    const [standMinShownDatetime, setStandMinShownDatetime] = React.useState<Date>(new Date(standData[0].startDatetime));
    const [standMaxShownDatetime, setStandMaxShownDatetime] = React.useState<Date>(new Date(standData[standData.length - 1].startDatetime));
    const [energyMinDatetime, setEnergyMinDatetime] = React.useState<Date>(new Date(energyData[0].startDatetime));
    const [energyMaxDatetime, setEnergyMaxDatetime] = React.useState<Date>(new Date(energyData[energyData.length - 1].startDatetime));
    const [energyMinShownDatetime, setEnergyMinShownDatetime] = React.useState<Date>(new Date(energyData[0].startDatetime));
    const [energyMaxShownDatetime, setEnergyMaxShownDatetime] = React.useState<Date>(new Date(energyData[energyData.length - 1].startDatetime));
    const [standPeriod, setStandPeriod] = React.useState<string>('hour');
    const [energyPeriod, setEnergyPeriod] = React.useState<string>('hour');

    // Set the stand data and energy data to the sample data.
    useEffect(() => {
        setStandData(SampleData.STAND_DATA);
        setEnergyData(SampleData.ENERGY_DATA);
    }, []);

    /**
     * Generate a function that sets the data, minimum date, maximum date, minimum shown date,
     * and maximum shown date based on the data array.
     * 
     * @param dataSetter the function to set the data
     * @param minDatetimeSetter the function to set the minimum date
     * @param maxDatetimeSetter the function to set the maximum date
     * @param minShownDatetimeSetter the function to set the minimum shown date
     * @param maxShownDatetimeSetter the function to set the maximum shown date
     * @returns the function that sets the data, minimum date, maximum date, minimum shown date,
     *          and maximum shown date.
     */
    const dataUploadFunctionGenerator = (dataSetter: (data: any[])=>void,
                                         minDatetimeSetter: (date: Date)=>void,
                                         maxDatetimeSetter: (date: Date)=>void,
                                         minShownDatetimeSetter: (date: Date)=>void,
                                         maxShownDatetimeSetter: (date: Date)=>void) => {
        return (data: any[]) => {
            dataSetter(data);
            minDatetimeSetter(new Date(data[0].startDatetime));
            maxDatetimeSetter(new Date(data[data.length - 1].startDatetime));
            minShownDatetimeSetter(new Date(data[0].startDatetime));
            maxShownDatetimeSetter(new Date(data[data.length - 1].startDatetime));
        }
    }

    /**
     * Generate a function that sets the minimum and maximum dates based on the dates array.
     * 
     * @param minSetter the function to set the minimum date
     * @param maxSetter the function to set the maximum date
     * @returns the function that sets the minimum and maximum dates.
     */
    const dateChangeFunctionGenerator = (minSetter: (date: Date)=>void, maxSetter: (date: Date)=>void) => {
        return (dates: Date[]) => {
            minSetter(dates[0]);
            maxSetter(dates[1]);
        }
    }

    /**
     * Generate a function that sets the period based on the period string.
     * 
     * @param setter the function to set the period
     * @returns the function that sets the period.
     */
    const periodChangeFunctionGenerator = (setter: (period: string)=>void) => {
        return (period: string) => {
            if (period.endsWith('daily')) {
                setter('day');
            } else {
                setter('hour');
            }
        }
    }

    // Return the JSX element.
    return (
        <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .25}} exit={{ opacity: 0 }} className={`text-white w-full`}>
            <div className='pt-16 pb-44'>
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
            <div className='grid grid-cols-8 pb-44'>
                <div className='col-span-3 mr-1'>
                    <h1 className='text-2xl mb-2'>Stand Data</h1>
                    <div className='mb-4'>
                        <FileUploadForm<Stand>
                            onSubmitHandler={ dataUploadFunctionGenerator(setStandData, setStandMinDatetime, setStandMaxDatetime, setStandMinShownDatetime, setStandMaxShownDatetime) }
                            fieldHeaderMapping={ StandDataMapping }
                            idPrefix='stand-data'
                            headerRowIndex={ 1 }
                        />
                    </div>
                    <ChartFilterForm onDatesChange={ dateChangeFunctionGenerator(setStandMinShownDatetime, setStandMaxShownDatetime) } onPeriodChange={ periodChangeFunctionGenerator(setStandPeriod) } minDate={ standMinDatetime } maxDate={ standMaxDatetime } formId='stand-time'/>
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
                    <StandChart standData={ standData } minDate={ standMinShownDatetime } maxDate={ standMaxShownDatetime } period={ standPeriod }/>
                </div>
            </div>
            <div className='grid grid-cols-8 pb-32'>
                <div className='col-span-5 mr-1'>
                    <EnergyBurnedChart data={ energyData } minDate={ energyMinShownDatetime } maxDate={ energyMaxShownDatetime } period={ energyPeriod }/>
                </div>
                <div className='col-span-3'>
                    <h1 className='text-2xl mb-2'>Energy Burned</h1>
                    <div className='mb-4'>
                        <FileUploadForm<EnergyBurned>
                            onSubmitHandler={ dataUploadFunctionGenerator(setEnergyData, setEnergyMinDatetime, setEnergyMaxDatetime, setEnergyMinShownDatetime, setEnergyMaxShownDatetime) }
                            fieldHeaderMapping={ EnergyBurnedDataMapping }
                            idPrefix='energy-burned-data'
                            headerRowIndex={ 1 }
                        />
                    </div>
                    <ChartFilterForm onDatesChange={ dateChangeFunctionGenerator(setEnergyMinShownDatetime, setEnergyMaxShownDatetime) } onPeriodChange={ periodChangeFunctionGenerator(setEnergyPeriod) } minDate={ energyMinDatetime } maxDate={ energyMaxDatetime } formId='energy-burned'/>
                    <p className='mt-3 text-slate-300 text-sm pl-2'>
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
        </m.div>
    );
};


export default HealthDashboard;
