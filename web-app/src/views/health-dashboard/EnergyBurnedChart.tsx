import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { EnergyBurned } from 'src/interface/health/energy';
import { getDatesBySplit } from 'src/utils/datetime';


/**
 * The props for the EnergyBurnedChart component.
 * 
 * @property data the energy burned data.
 */
interface Props {
    data: EnergyBurned[];
    minDate: Date;
    maxDate: Date;
    period: string;
}


/**
 * The data structure for the area chart.
 * 
 * @property name the name of the data item.
 * @property caloriesBurned the amount of calories burned.
 */
interface ChartData {
    name: string;
    caloriesBurned: number;
}


const getIndexByDate = (date: Date, energyBurnedData: EnergyBurned[]): number => {
    let index = 0;
    for (let i = 0; i < energyBurnedData.length; i++) {
        const energyBurned = energyBurnedData[i];
        const energyBurnedDatetime = new Date(energyBurned.startDatetime);

        if (energyBurnedDatetime.getTime() <= date.getTime()) {
            index = i;
        } else {
            break;
        }
    }

    return index;
}


/**
 * Convert enery data to chart data.
 * 
 * @param energyData the enery data to be converted to chart data.
 * @param minDate the minimum date.
 * @param maxDate the maximum date.
 * @returns the chart data.
 */
const setupData = (energyData: EnergyBurned[], minDate?: Date, maxDate?: Date, period?: string): ChartData[] => {
    let minDatetime = minDate ? minDate : new Date(energyData[0].startDatetime);
    let maxDatetime = maxDate ? maxDate : new Date(energyData[energyData.length - 1].startDatetime);

    const allHourDates: Date[] = getDatesBySplit(minDatetime, maxDatetime, period);
    const data: ChartData[] = [];

    const iMax = getIndexByDate(maxDatetime, energyData);
    let i = getIndexByDate(minDatetime, energyData);

    allHourDates.forEach((date: Date) => {
        let maxDatetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 59, 59, 999);
        if (period === 'day') {
            maxDatetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        }

        let burned = 0;
        const name = date.toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        while (i < iMax) {
            const stand = energyData[i];
            const standDatetime = new Date(stand.startDatetime);

            if (standDatetime.getTime() <= maxDatetime.getTime()) {
                const value: number = typeof stand.value === 'string' ? parseInt(stand.value, 10) : stand.value;
                burned += value;
                i++;
            } else {
                break;
            }
        }

        const chartDataItem: ChartData = {
            name: name,
            caloriesBurned: Math.round(burned),
        };

        data.push(chartDataItem);
    });

    return data;
};


function EnergyBurnedChart(props: Props): React.JSX.Element {
    const data = setupData(props.data, props.minDate, props.maxDate, props.period);

    return (
        <ResponsiveContainer height={ 400 } width={ '100%' }>
            <LineChart data={ data } margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
                <XAxis dataKey="name"/>
                <YAxis label={{ value: "Energy Burned (Cal)", angle: -90, position: 'insideBottomLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelClassName='text-slate-600' />
                <Line type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};


export default EnergyBurnedChart;
