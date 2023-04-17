import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PBSRoutingModule } from './pbs-routing.module';
import { MeasurementComponent } from './measurement/measurement.component';
import { PropertyComponent } from './property/property.component';
import { FactoryTypeComponent } from './factory-type/factory-type.component';
import { FactoryObjectComponent } from './factory-object/factory-object.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentComponent } from './document/document.component';
import { FactoryComponent } from './factory/factory.component';
import { PBSComponent } from './pbs.component';
import { PagesModule } from "../pages.module";
import { MeasurementListComponent } from './measurement/measurement-list/measurement-list.component';
import { MeasurementDetailComponent } from './measurement/measurement-detail/measurement-detail.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FactoryTypeTreeComponent } from './factory-type/factory-type-tree/factory-type-tree.component';
import { FactoryTypeDetailComponent } from './factory-type/factory-type-detail/factory-type-detail.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@NgModule({
    declarations: [
        MeasurementComponent,
        PropertyComponent,
        FactoryTypeComponent,
        FactoryObjectComponent,
        DocumentTypeComponent,
        DocumentComponent,
        FactoryComponent,
        PBSComponent,
        MeasurementListComponent,
        MeasurementDetailComponent,
        PropertyListComponent,
        PropertyDetailComponent,
        FactoryTypeTreeComponent,
        FactoryTypeDetailComponent
    ],
    imports: [
        CommonModule,
        PBSRoutingModule,
        PagesModule,
        NzTableModule,
        NzButtonModule,
        NzDividerModule,
        NzPopconfirmModule,
        NzModalModule,
        NzFormModule,
        FormsModule,
        ReactiveFormsModule,
        NzCardModule,
        NzTabsModule,
        NzSelectModule,
        NzTreeModule,
        NzInputModule,
        NzGridModule,
        NzSpaceModule,
        NzTreeSelectModule
    ]
})
export class PBSModule { }
