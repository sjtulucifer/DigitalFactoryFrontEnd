import { Factory } from "./factory";
import { FactoryType } from "./factory-type";
import { Property } from "./property";

export class FactoryObject {
    constructor(
        public FactoryObjectId?: string,
        public FactoryObjectCode?: string,
        public FactoryObjectName?: string,
        public FactoryObjectDescription?: string,
        public FatherObject?: FactoryObject,
        public ObjectFactory?: Factory,
        public ObjectType?: FactoryType,
        public FactoryObjectProperties?: Property[],
        public FactoryObjectDocuments?: Document[],
    ) { }
}
