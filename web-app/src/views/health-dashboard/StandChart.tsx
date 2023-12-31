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
    minDate: Date;
    maxDate: Date;
    period: string;
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


const getIndexByDate = (date: Date, standData: Stand[]): number => {
    let index = 0;
    for (let i = 0; i < standData.length; i++) {
        const stand = standData[i];
        const standDatetime = new Date(stand.startDatetime);

        if (standDatetime.getTime() <= date.getTime()) {
            index = i;
        } else {
            break;
        }
    }

    return index;
}


/**
 * Convert stand data to chart data.
 * 
 * @param standData the stand data to be converted to chart data.
 * @returns the chart data.
 */
const setupData = (standData: Stand[], minDate: Date, maxDate: Date, period: string): AreaChartData[] => {
    let minDatetime = minDate ? minDate : new Date(standData[0].startDatetime);
    let maxDatetime = maxDate ? maxDate : new Date(standData[standData.length - 1].startDatetime);

    const allDates: Date[] = getDatesBySplit(minDatetime, maxDatetime, period);
    const data: AreaChartData[] = [];

    const iMax = getIndexByDate(maxDatetime, standData);
    let i = getIndexByDate(minDatetime, standData);
    allDates.forEach((date: Date) => {
        let maxDatetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 59, 59, 999);
        if (period === 'day') {
            maxDatetime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        }

        let standTime = 0;
        const name = date.toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

        while (i < iMax) {
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
            elapsedTime: period === 'hour' ? 60 : 1440,
        };

        data.push(chartDataItem);
    });

    return data;
};


function StandChart(props: Props): React.JSX.Element {

    const data = setupData(props.standData, props.minDate, props.maxDate, props.period);

    return (
        <ResponsiveContainer height={ 400 } width={ '100%' }>
            <AreaChart data={ data } margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
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
