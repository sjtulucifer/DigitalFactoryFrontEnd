import { DocumentType } from "./document-type";
import { Factory } from "./factory";
import { FactoryObject } from "./factory-object";

export class Document {
    constructor(
        public DocumentId?: string,
        public DocumentCode?: string,
        public DocumentName?: string,
        public DocumentTitle?: string,
        public DocumentPublishDate?: Date,
        public DocumentVersion?: string,
        public DocumentEType?: string,
        public DocumentEAddress?: string,
        public AuthorCompany?: string,
        public DocumentFactory?: Factory,
        public DocumentType?: DocumentType,
        public FactoryObjects?: FactoryObject[],
    ) { }
}
