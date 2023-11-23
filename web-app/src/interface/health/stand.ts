/**
 * Stand interface
 * 
 * @property id: string | number - unique identifier
 * @property startDatetime: string - start datetime
 * @property endDatetime: string - end datetime
 * @property unit: string - unit of measurement (min, hour, day, etc.)
 * @property value: number - amount of time spent standing during the time period
 */
interface Stand {
    id: string | number;
    startDatetime: string;
    endDatetime: string;
    unit: string;
    value: number;
}


export { type Stand }
