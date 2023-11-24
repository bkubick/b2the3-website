import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Stand } from 'src/interface/health/stand';
import { getDatesBySplit } from 'src/utils/datetime';


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


/**
 * Convert stand data to chart data.
 * 
 * @param standData the stand data to be converted to chart data.
 * @returns the chart data.
 */
const setupData = (standData: Stand[]): AreaChartData[] => {
    let minDatetime = new Date(standData[0].startDatetime);
    let maxDatetime = new Date(standData[standData.length - 1].startDatetime);

    const allHourDates: Date[] = getDatesBySplit(minDatetime, maxDatetime, 'hour');
    const data: AreaChartData[] = [];

    let i = 0;
    allHourDates.forEach((date: Date) => {
        const maxDatetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 59, 59, 999);

        let standTime = 0;
        const name = date.toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        while (i < standData.length) {
            const stand = standData[i];
            const standDatetime = new Date(stand.startDatetime);

            if (standDatetime.getTime() <= maxDatetime.getTime()) {
                const value: number = typeof stand.value === 'string' ? parseInt(stand.value, 10) : stand.value;
                standTime += value;
                i++;
            } else {
                break;
            }
        }

        const chartDataItem: AreaChartData = {
            name: name,
            standTime: standTime,
            elapsedTime: 60,
        };

        data.push(chartDataItem);
    });

    return data;
};


function StandChart(props: Props): React.JSX.Element {

    return (
        <ResponsiveContainer height={ 400 } width={ '100%' }>
            <AreaChart data={ setupData(props.standData) } margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
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
                <YAxis label={{ value: "Stand Time (minutes)", angle: -90, position: 'insideBottomLeft' }} />
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
