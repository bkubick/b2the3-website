/**
 * Interface for energy burned
 * 
 * @property id: string | number - unique identifier
 * @property startDatetime: string - start datetime
 * @property endDatetime: string - end datetime
 * @property unit: string - unit of measurement (kcal, Cal, etc.)
 * @property value: number - amount of energy burned during the time period
 */
interface EnergyBurned {
    id: string | number;
    startDatetime: string;
    endDatetime: string;
    unit: string;
    value: number;
}


export { type EnergyBurned };
