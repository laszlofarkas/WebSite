import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReachRoutingModule } from './reach-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ReachRoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class ReachModule { }
