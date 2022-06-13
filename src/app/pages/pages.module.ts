import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NzTableModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzDropDownModule,
    NzDividerModule,
    NzSkeletonModule,
    NzSpaceModule,
    NzModalModule,
    NzNotificationModule,
  ],
  exports:[
    PagesComponent,
  ],
})
export class PagesModule { }
