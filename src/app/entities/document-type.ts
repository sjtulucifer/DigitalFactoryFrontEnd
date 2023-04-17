import { FactoryType } from "./factory-type";

export class DocumentType {
    constructor(
        public DocumentTypeId?: string,
        public DocumentTypeCode?: string,
        public DocumentTypeName?: string,
        public DocumentTypeDescription?: string,
        public DocumentTypeCategory?: string,
        public DocumentTypeMajor?: string,
        public DocumentTypeInfoFrom?: string,
        public FactoryTypes?: FactoryType[],
    ) { }
}
