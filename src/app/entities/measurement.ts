import { Property } from "./property";

export class Measurement {
    constructor(
        public MeasurementId?: string,
        public MeasurementCode?: string,
        public MeasurementName?: string,
        public MeasurementUnitName?: string,
        public MeasurementDescription?: string,
        public MeasurementProperties?: Property[],
    ) { }
}