import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishingRoutingModule } from './publishing-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    PublishingRoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class PublishingModule { }
