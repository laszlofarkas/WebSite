import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const publishingRoutes: Routes = [
  { path: 'publishing', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(publishingRoutes)],
  exports: [RouterModule]
})
export class PublishingRoutingModule { }
