import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { EditComponent } from './edit.component';

const publishingRoutes: Routes = [
  { path: 'publishing', component: DashboardComponent },
  { path: 'publishing/edit/:id', component: EditComponent },
  { path: 'publishing/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(publishingRoutes)],
  exports: [RouterModule]
})
export class PublishingRoutingModule { }
