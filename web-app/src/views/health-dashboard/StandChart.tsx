import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { type Stand } from 'src/interface/health/stand';


/**
 * The props for the StandChart component.
 * 
 * @property standData the stand data.
 */
interface Props {
    standData: Stand[];
}


/**
 * The data structure for the area chart.
 * 
 * @property name the name of the data item.
 * @property standTime the stand time.
 * @property elapsedTime the elapsed time.
 */
interface AreaChartData {
    name: string;
    standTime: number;
    elapsedTime: number;
}


function StandChart(props: Props): React.JSX.Element {

    /**
     * Convert stand data to chart data.
     * 
     * @param standData the stand data to be converted to chart data.
     * @returns the chart data.
     */
    const setupData = (standData: Stand[]): AreaChartData[] => {
        const data: AreaChartData[] = [];
        standData.forEach((stand: Stand) => {
            const dataItem: AreaChartData = {
                name: stand.startDatetime,
                standTime: stand.value,
                elapsedTime: 5, // TODO: calculate elapsed time dynamically from startDatetime and endDatetime
            };
            data.push(dataItem);
        });
        return data;
    };

    return (
        <ResponsiveContainer height={ 400 } width={ '50%' }>
            <AreaChart data={ setupData(props.standData) } margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <defs>
                    <linearGradient id="colorElapsedTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorStandTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name"/>
                <YAxis label={{ value: "Stand Time (minutes)", angle: -90 }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip labelClassName='text-slate-600' />
                <Legend />
                <Area type="monotone" dataKey="standTime" stroke="#82ca9d" fillOpacity={ 1 } fill="url(#colorStandTime)" />
                <Area type="monotone" dataKey="elapsedTime" stroke="#8884d8" fillOpacity={ 1 } fill="url(#colorElapsedTime)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};


export default StandChart;