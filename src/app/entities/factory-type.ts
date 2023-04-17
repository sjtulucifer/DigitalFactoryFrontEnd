import { DocumentType } from "./document-type";
import { FactoryObject } from "./factory-object";
import { Property } from "./property";

export class FactoryType {
    constructor(
        public FactoryTypeId?: string,
        public FactoryTypeCode?: string,
        public FactoryTypeName?: string,
        public FactoryTypeDescription?: string,
        public FatherType?: FactoryType,
        public FactoryTypeProperties?: Property[],
        public DocumentTypes?: DocumentType,
        public FactoryObjects?: FactoryObject,
    ) { }
}
