import { EnergyBurned } from 'src/interface/health/energy';
import { Stand } from 'src/interface/health/stand';


const STAND_DATA: Stand[] = [
    {
        id: 'stand-data-1',
        startDatetime: '2023-11-01 00:00:00',
        endDatetime: '2023-11-01 00:05:00',
        unit: 'min',
        value: 3,
    },
    {
        id: 'stand-data-2',
        startDatetime: '2023-11-01 00:05:00',
        endDatetime: '2023-11-01 00:10:00',
        unit: 'min',
        value: 4,
    },
    {
        id: 'stand-data-3',
        startDatetime: '2023-11-01 00:10:00',
        endDatetime: '2023-11-01 00:15:00',
        unit: 'min',
        value: 1,
    },
    {
        id: 'stand-data-4',
        startDatetime: '2023-11-01 00:15:00',
        endDatetime: '2023-11-01 00:20:00',
        unit: 'min',
        value: 4,
    },
    {
        id: 'stand-data-5',
        startDatetime: '2023-11-01 00:20:00',
        endDatetime: '2023-11-01 00:25:00',
        unit: 'min',
        value: 2,
    },
    {
        id: 'stand-data-6',
        startDatetime: '2023-11-01 00:25:00',
        endDatetime: '2023-11-01 00:30:00',
        unit: 'min',
        value: 1,
    },
    {
        id: 'stand-data-7',
        startDatetime: '2023-11-01 00:30:00',
        endDatetime: '2023-11-01 00:35:00',
        unit: 'min',
        value: 5,
    },
    {
        id: 'stand-data-8',
        startDatetime: '2023-11-01 00:35:00',
        endDatetime: '2023-11-01 00:40:00',
        unit: 'min',
        value: 3,
    },
    {
        id: 'stand-data-9',
        startDatetime: '2023-11-01 00:40:00',
        endDatetime: '2023-11-01 00:45:00',
        unit: 'min',
        value: 4,
    },
];


const ENERGY_DATA: EnergyBurned[] = [
    {
        id: 'energy-data-1',
        startDatetime: '2023-11-01 00:00:00',
        endDatetime: '2023-11-01 00:00:03',
        unit: 'kcal',
        value: 0.21,
    },
    {
        id: 'energy-data-2',
        startDatetime: '2023-11-01 00:00:03',
        endDatetime: '2023-11-01 00:00:05',
        unit: 'kcal',
        value: 0.45,
    },
    {
        id: 'energy-data-3',
        startDatetime: '2023-11-01 00:00:05',
        endDatetime: '2023-11-01 00:00:08',
        unit: 'kcal',
        value: 0.12,
    },
    {
        id: 'energy-data-4',
        startDatetime: '2023-11-01 00:00:08',
        endDatetime: '2023-11-01 00:00:010',
        unit: 'kcal',
        value: 0.51,
    },
    {
        id: 'energy-data-5',
        startDatetime: '2023-11-01 00:00:10',
        endDatetime: '2023-11-01 00:00:13',
        unit: 'kcal',
        value: 0.32,
    },
    {
        id: 'energy-data-6',
        startDatetime: '2023-11-01 00:00:13',
        endDatetime: '2023-11-01 00:00:15',
        unit: 'kcal',
        value: 0.11,
    },
    {
        id: 'energy-data-7',
        startDatetime: '2023-11-01 00:00:15',
        endDatetime: '2023-11-01 00:00:18',
        unit: 'kcal',
        value: 0.61,
    },
    {
        id: 'energy-data-8',
        startDatetime: '2023-11-01 00:00:18',
        endDatetime: '2023-11-01 00:00:20',
        unit: 'kcal',
        value: 0.41,
    },
    {
        id: 'energy-data-9',
        startDatetime: '2023-11-01 00:00:20',
        endDatetime: '2023-11-01 00:00:23',
        unit: 'kcal',
        value: 0.52,
    },
]


export { STAND_DATA, ENERGY_DATA };
