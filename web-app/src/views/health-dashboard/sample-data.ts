import { EnergyBurned } from 'src/interface/health/energy';
import { Stand } from 'src/interface/health/stand';
import { getDatesBySplit } from 'src/utils/datetime';

const SAMPLE_DATES = getDatesBySplit(new Date('2023-10-01 00:00:00'), new Date('2023-10-07 20:45:00'), 'hour');


const STAND_DATA: Stand[] = [];
for (let i = 0; i < SAMPLE_DATES.length; i++) {
    STAND_DATA.push({
        id: `stand-data-${i}`,
        startDatetime: SAMPLE_DATES[i].toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        endDatetime: SAMPLE_DATES[i].toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        unit: 'count',
        value: Math.random() * 60,
    });
}


const ENERGY_DATA: EnergyBurned[] = [];
for (let i = 0; i < SAMPLE_DATES.length; i++) {
    ENERGY_DATA.push({
        id: `energy-data-${i}`,
        startDatetime: SAMPLE_DATES[i].toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        endDatetime: SAMPLE_DATES[i].toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        unit: 'kcal',
        value: Math.random() * 100,
    });
}

export { STAND_DATA, ENERGY_DATA };
