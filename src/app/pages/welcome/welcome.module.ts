import { NgModule } from '@angular/core';
import { PagesModule } from '../pages.module';


import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    PagesModule,
    NzTableModule,
    CommonModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
