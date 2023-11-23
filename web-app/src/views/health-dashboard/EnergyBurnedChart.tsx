import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { EnergyBurned } from 'src/interface/health/energy';
import { dateDiffInMilliseconds, millisecondsToMinutes } from 'src/utils/datetime';


/**
 * The props for the EnergyBurnedChart component.
 * 
 * @property data the energy burned data.
 */
interface Props {
    data: EnergyBurned[];
}


/**
 * The data structure for the area chart.
 * 
 * @property name the name of the data item.
 * @property caloriesBurned the amount of calories burned.
 * @property elapsedTime the elapsed time.
 */
interface ChartData {
    name: string;
    caloriesBurned: number;
    elapsedTime: number;
}


/**
 * Convert stand data to chart data.
 * 
 * @param standData the stand data to be converted to chart data.
 * @returns the chart data.
 */
const setupData = (data: EnergyBurned[]): ChartData[] => {
    const chartData: ChartData[] = [];

    let name: string = '';
    let totalcaloriesBurned: number = 0;
    let totalElapsedTime: number = 0;
    data.forEach((item: EnergyBurned) => {
        const elapsedTime: number = dateDiffInMilliseconds(item.startDatetime, item.endDatetime);

        if (millisecondsToMinutes(totalElapsedTime) >= 60) {
            const dataItem: ChartData = {
                name: name,
                caloriesBurned: totalcaloriesBurned,
                elapsedTime: millisecondsToMinutes(totalElapsedTime),
            };

            chartData.push(dataItem);

            totalcaloriesBurned = 0;
            totalElapsedTime = 0;
        } else {
            name = item.startDatetime;
            totalcaloriesBurned += typeof item.value === 'string' ? parseInt(item.value, 10) : item.value;
            totalElapsedTime += elapsedTime;
        }
    });

    if (totalElapsedTime > 0) {
        const dataItem: ChartData = {
            name: name,
            caloriesBurned: totalcaloriesBurned,
            elapsedTime: millisecondsToMinutes(totalElapsedTime),
        };

        chartData.push(dataItem);
    }

    return chartData;
};


function EnergyBurnedChart(props: Props): React.JSX.Element {

    return (
        <ResponsiveContainer height={ 400 } width={ '100%' }>
            <LineChart data={ setupData(props.data) } margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <XAxis dataKey="name"/>
                <YAxis label={{ value: "Energy Burned (Cal)", angle: -90 }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelClassName='text-slate-600' />
                <Line type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};


export default EnergyBurnedChart;
