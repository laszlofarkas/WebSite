import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const reachRoutes: Routes = [
  { path: 'reach', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(reachRoutes)],
  exports: [RouterModule]
})
export class ReachRoutingModule { }
