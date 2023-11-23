import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { EnergyBurned } from 'src/interface/health/energy';


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
    data.forEach((item: EnergyBurned) => {
        const dataItem: ChartData = {
            name: item.startDatetime,
            caloriesBurned: item.value,
            elapsedTime: 5, // TODO: calculate elapsed time dynamically from startDatetime and endDatetime
        };
        chartData.push(dataItem);
    });
    return chartData;
};


function EnergyBurnedChart(props: Props): React.JSX.Element {

    return (
        <ResponsiveContainer height={ 400 } width={ '50%' }>
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
