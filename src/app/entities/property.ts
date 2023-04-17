import { Measurement } from "./measurement";

export class Property {
    constructor(
        public PropertyId?: string,
        public PropertyCode?: string,
        public PropertyName?: string,
        public PropertyEName?: string,
        public PropertyDescription?: string,
        public PropertyCategory?: string,
        public PropertyDType?: string,
        public PropertyValue?: string,
        public PropertyMeasurement?: Measurement,
    ) { }
}
