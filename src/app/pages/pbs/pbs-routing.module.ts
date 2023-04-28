import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PBSComponent } from './pbs.component';
import { MeasurementListComponent } from './measurement/measurement-list/measurement-list.component';
import { MeasurementDetailComponent } from './measurement/measurement-detail/measurement-detail.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { FactoryTypeTreeComponent } from './factory-type/factory-type-tree/factory-type-tree.component';
import { FactoryTypeDetailComponent } from './factory-type/factory-type-detail/factory-type-detail.component';
import { FactoryListComponent } from './factory/factory-list/factory-list.component';
import { FactoryDetailComponent } from './factory/factory-detail/factory-detail.component';
import { FactoryObjectTreeComponent } from './factory-object/factory-object-tree/factory-object-tree.component';
import { FactoryObjectDetailComponent } from './factory-object/factory-object-detail/factory-object-detail.component';

const routes: Routes = [{
    path: '',
    component: PBSComponent,
    children: [{
      path: 'measurement',
      children: [
        {
          path: 'measurementList',
          component: MeasurementListComponent,
        }, 
        {
          path: 'measurementDetail/:id',
          component: MeasurementDetailComponent,
        },
        {
          path: '',
          redirectTo: 'measurementList',
          pathMatch: 'full',
        }],
    },
    {
      path: 'property',
      children: [
        {
          path: 'propertyList',
          component: PropertyListComponent,
        }, 
        {
          path: 'propertyDetail/:id',
          component: PropertyDetailComponent,
        },
        {
          path: '',
          redirectTo: 'propertyList',
          pathMatch: 'full',
        }],
    },
    
    {
      path: 'factoryType',
      children: [
        {
          path: 'factoryTypeTree',
          component: FactoryTypeTreeComponent,
        },
        {
          path: 'factoryTypeDetail/:id',
          component: FactoryTypeDetailComponent,
        },
        {
          path: '',
          redirectTo: 'factoryTypeTree',
          pathMatch: 'full',
        }],
    },
    
    {
      path: 'factory',
      children: [
        {
          path: 'factoryList',
          component: FactoryListComponent,
        },
        {
          path: 'factoryDetail/:id',
          component: FactoryDetailComponent,
        },
        {
          path: '',
          redirectTo: 'factoryList',
          pathMatch: 'full',
        }],
    },
    {
      path: 'factoryObject',
      children: [
        {
          path: 'factoryObjectTree',
          component: FactoryObjectTreeComponent,
        },
        {
          path: 'factoryObjectDetail/:id',
          component: FactoryObjectDetailComponent,
        },
        {
          path: '',
          redirectTo: 'factoryObjectTree',
          pathMatch: 'full',
        }],
    }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PBSRoutingModule { }
