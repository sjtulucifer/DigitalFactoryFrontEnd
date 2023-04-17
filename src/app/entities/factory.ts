import { Document } from "./document";
import { FactoryObject } from "./factory-object";

export class Factory {
    constructor(
        public FactoryId?: string,
        public FactoryCode?: string,
        public FactoryName?: string,
        public FactroyDescription?: string,
        public Documents?: Document[],
        public FactoryObjects?: FactoryObject[],
    ) { }
}
