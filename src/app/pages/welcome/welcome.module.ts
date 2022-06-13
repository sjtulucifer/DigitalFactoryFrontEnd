import { NgModule } from '@angular/core';
import { PagesModule } from '../pages.module';


import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    PagesModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
