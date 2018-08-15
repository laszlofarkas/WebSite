import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PublishingRoutingModule } from './publishing-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    PublishingRoutingModule
  ],
  declarations: [
    DashboardComponent,
    EditComponent
  ]
})
export class PublishingModule { }
