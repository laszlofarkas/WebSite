import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PublishingRoutingModule } from './publishing-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    PublishingRoutingModule,
    HttpClientModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class PublishingModule { }
